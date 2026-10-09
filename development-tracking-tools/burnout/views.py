from rest_framework import viewsets, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Avg
from django_filters.rest_framework import DjangoFilterBackend

from .models import BurnoutAssessment, WorkloadEntry, RecoveryActivity, BurnoutAlert
from .serializers import (
    BurnoutAssessmentSerializer, WorkloadEntrySerializer,
    RecoveryActivitySerializer, BurnoutAlertSerializer,
)


class UserOwnedMixin:
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class BurnoutAssessmentViewSet(UserOwnedMixin, viewsets.ModelViewSet):
    queryset = BurnoutAssessment.objects.all()
    serializer_class = BurnoutAssessmentSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['risk_level', 'date']
    ordering_fields = ['date', 'overall_score']

    @action(detail=False, methods=['get'], url_path='trend')
    def trend(self, request):
        """GET /api/v1/burnout/assessments/trend/ — Last 12 assessments for charting."""
        assessments = self.get_queryset().order_by('-date')[:12]
        serializer = self.get_serializer(reversed(list(assessments)), many=True)
        avg = self.get_queryset().aggregate(avg=Avg('overall_score'))['avg']
        return Response({
            'data': serializer.data,
            'average_score': round(float(avg), 1) if avg else 0,
        })


class WorkloadEntryViewSet(UserOwnedMixin, viewsets.ModelViewSet):
    queryset = WorkloadEntry.objects.all()
    serializer_class = WorkloadEntrySerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['date']
    ordering_fields = ['date', 'stress_level', 'hours_worked']

    @action(detail=False, methods=['get'], url_path='weekly-avg')
    def weekly_avg(self, request):
        """GET /api/v1/burnout/workload/weekly-avg/ — Average stats last 7 days."""
        from django.utils import timezone
        import datetime
        week_ago = timezone.now().date() - datetime.timedelta(days=7)
        qs = self.get_queryset().filter(date__gte=week_ago)
        agg = qs.aggregate(
            avg_hours=Avg('hours_worked'),
            avg_stress=Avg('stress_level'),
            avg_tasks=Avg('tasks_completed'),
        )
        return Response({k: round(float(v), 1) if v else 0 for k, v in agg.items()})


class RecoveryActivityViewSet(UserOwnedMixin, viewsets.ModelViewSet):
    queryset = RecoveryActivity.objects.all()
    serializer_class = RecoveryActivitySerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['category', 'frequency', 'is_active']
    search_fields = ['name', 'description']


class BurnoutAlertViewSet(UserOwnedMixin, viewsets.ModelViewSet):
    queryset = BurnoutAlert.objects.all()
    serializer_class = BurnoutAlertSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['severity', 'is_read']

    @action(detail=False, methods=['post'], url_path='mark-all-read')
    def mark_all_read(self, request):
        """POST /api/v1/burnout/alerts/mark-all-read/ — Mark all alerts as read."""
        count = self.get_queryset().filter(is_read=False).update(is_read=True)
        return Response({'marked_read': count})
