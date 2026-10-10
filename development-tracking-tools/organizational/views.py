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


# ─── OKR Views ────────────────────────────────────────────────────────────────

from .models import Objective, KeyResult, RemoteTimesheet, CommunityGroup, GroupJournalEntry, FaithFlowStreak
from rest_framework import serializers as drf_serializers


class KeyResultSerializer(drf_serializers.ModelSerializer):
    class Meta:
        model = KeyResult
        fields = '__all__'


class ObjectiveSerializer(drf_serializers.ModelSerializer):
    key_results = KeyResultSerializer(many=True, read_only=True)

    class Meta:
        model = Objective
        fields = '__all__'
        read_only_fields = ['user']


class ObjectiveViewSet(UserOwnedMixin, viewsets.ModelViewSet):
    queryset = Objective.objects.all()
    serializer_class = ObjectiveSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'scope', 'quarter', 'year']
    search_fields = ['title', 'description']
    ordering_fields = ['year', 'quarter', 'overall_progress']

    @action(detail=False, methods=['get'], url_path='summary')
    def summary(self, request):
        qs = self.get_queryset()
        return Response({
            'total': qs.count(),
            'on_track': qs.filter(status='on_track').count(),
            'at_risk': qs.filter(status='at_risk').count(),
            'behind': qs.filter(status='behind').count(),
            'completed': qs.filter(status='completed').count(),
        })


class KeyResultViewSet(viewsets.ModelViewSet):
    serializer_class = KeyResultSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['objective', 'status']
    search_fields = ['description']

    def get_queryset(self):
        return KeyResult.objects.filter(objective__user=self.request.user)


# ─── DTT Remote Views ─────────────────────────────────────────────────────────

class RemoteTimesheetSerializer(drf_serializers.ModelSerializer):
    class Meta:
        model = RemoteTimesheet
        fields = '__all__'
        read_only_fields = ['user']


class RemoteTimesheetViewSet(UserOwnedMixin, viewsets.ModelViewSet):
    queryset = RemoteTimesheet.objects.all()
    serializer_class = RemoteTimesheetSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['date', 'team']
    ordering_fields = ['date', 'hours_logged', 'productivity_score']

    @action(detail=False, methods=['get'], url_path='weekly-summary')
    def weekly_summary(self, request):
        import datetime
        from django.utils import timezone
        from django.db.models import Avg, Sum
        week_ago = timezone.now().date() - datetime.timedelta(days=7)
        qs = self.get_queryset().filter(date__gte=week_ago)
        agg = qs.aggregate(
            total_hours=Sum('hours_logged'),
            avg_productivity=Avg('productivity_score'),
            entries=models.Count('id'),
        )
        return Response({k: round(float(v), 1) if v else 0 for k, v in agg.items()})


# ─── Community & Coaching Views ──────────────────────────────────────────────

class CommunityGroupSerializer(drf_serializers.ModelSerializer):
    class Meta:
        model = CommunityGroup
        fields = '__all__'
        read_only_fields = ['owner']


class GroupJournalEntrySerializer(drf_serializers.ModelSerializer):
    class Meta:
        model = GroupJournalEntry
        fields = '__all__'
        read_only_fields = ['author']


class FaithFlowStreakSerializer(drf_serializers.ModelSerializer):
    class Meta:
        model = FaithFlowStreak
        fields = '__all__'
        read_only_fields = ['user']


class CommunityGroupViewSet(viewsets.ModelViewSet):
    serializer_class = CommunityGroupSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['group_type', 'is_private']
    search_fields = ['name', 'description']

    def get_queryset(self):
        return CommunityGroup.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class GroupJournalEntryViewSet(viewsets.ModelViewSet):
    serializer_class = GroupJournalEntrySerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['group', 'mood', 'is_anonymous']
    ordering_fields = ['created_at']

    def get_queryset(self):
        return GroupJournalEntry.objects.filter(author=self.request.user)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class FaithFlowStreakViewSet(viewsets.ModelViewSet):
    serializer_class = FaithFlowStreakSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['date', 'devotional_completed']
    ordering_fields = ['date']

    def get_queryset(self):
        return FaithFlowStreak.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['get'], url_path='streak-count')
    def streak_count(self, request):
        from django.utils import timezone
        import datetime
        today = timezone.now().date()
        streak = 0
        current = today
        while self.get_queryset().filter(date=current, devotional_completed=True).exists():
            streak += 1
            current -= datetime.timedelta(days=1)
        return Response({'streak_days': streak, 'as_of': str(today)})

