from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Campaign, CampaignActivity, PoliticalContact
from .serializers import CampaignSerializer, CampaignActivitySerializer, PoliticalContactSerializer


class UserOwnedMixin:
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CampaignViewSet(UserOwnedMixin, viewsets.ModelViewSet):
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['campaign_type', 'status']
    search_fields = ['title', 'description']
    ordering_fields = ['start_date', 'end_date', 'created_at']


class CampaignActivityViewSet(viewsets.ModelViewSet):
    serializer_class = CampaignActivitySerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['campaign', 'activity_type']
    search_fields = ['title', 'description']
    ordering_fields = ['date', 'cost', 'reach']

    def get_queryset(self):
        return CampaignActivity.objects.filter(campaign__user=self.request.user)


class PoliticalContactViewSet(UserOwnedMixin, viewsets.ModelViewSet):
    queryset = PoliticalContact.objects.all()
    serializer_class = PoliticalContactSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['relationship', 'campaign']
    search_fields = ['name', 'email', 'constituency']
    ordering_fields = ['influence_score', 'name', 'last_contact']
