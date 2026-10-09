from rest_framework import viewsets, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Sum
from django_filters.rest_framework import DjangoFilterBackend

from .models import Contact, Deal, InventoryItem, Team, TeamMember, BusinessGoal
from .serializers import (
    ContactSerializer, DealSerializer, InventoryItemSerializer,
    TeamSerializer, TeamMemberSerializer, BusinessGoalSerializer,
)


class UserOwnedMixin:
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ContactViewSet(UserOwnedMixin, viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['stage']
    search_fields = ['name', 'company', 'email']
    ordering_fields = ['name', 'stage', 'value', 'last_contacted']


class DealViewSet(UserOwnedMixin, viewsets.ModelViewSet):
    queryset = Deal.objects.all()
    serializer_class = DealSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['stage', 'contact']
    search_fields = ['title']
    ordering_fields = ['value', 'probability', 'expected_close']

    @action(detail=False, methods=['get'], url_path='pipeline-summary')
    def pipeline_summary(self, request):
        """GET /api/v1/organizational/deals/pipeline-summary/"""
        qs = self.get_queryset()
        summary = {}
        for stage, _ in Deal.STAGE_CHOICES:
            stage_deals = qs.filter(stage=stage)
            summary[stage] = {
                'count': stage_deals.count(),
                'total_value': float(stage_deals.aggregate(v=Sum('value'))['v'] or 0),
            }
        return Response(summary)


class InventoryItemViewSet(UserOwnedMixin, viewsets.ModelViewSet):
    queryset = InventoryItem.objects.all()
    serializer_class = InventoryItemSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'supplier']
    search_fields = ['name', 'sku', 'supplier']
    ordering_fields = ['name', 'quantity', 'unit_cost']

    @action(detail=False, methods=['get'], url_path='low-stock')
    def low_stock(self, request):
        """GET /api/v1/organizational/inventory/low-stock/ — Items at or below reorder point."""
        items = [i for i in self.get_queryset() if i.is_low_stock]
        return Response(InventoryItemSerializer(items, many=True).data)


class TeamViewSet(viewsets.ModelViewSet):
    serializer_class = TeamSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'department']

    def get_queryset(self):
        return Team.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class TeamMemberViewSet(viewsets.ModelViewSet):
    serializer_class = TeamMemberSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['team', 'role']
    search_fields = ['name', 'email']

    def get_queryset(self):
        return TeamMember.objects.filter(team__owner=self.request.user)


class BusinessGoalViewSet(UserOwnedMixin, viewsets.ModelViewSet):
    queryset = BusinessGoal.objects.all()
    serializer_class = BusinessGoalSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'quarter', 'year']
    search_fields = ['title', 'description']
    ordering_fields = ['year', 'quarter', 'progress']
