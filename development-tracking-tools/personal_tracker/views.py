from rest_framework import viewsets, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from django_filters.rest_framework import DjangoFilterBackend

from .models import PersonalGoal, Habit, HabitLog, KPI, DailyEntry
from .serializers import PersonalGoalSerializer, HabitSerializer, HabitLogSerializer, KPISerializer, DailyEntrySerializer


class UserOwnedMixin:
    """Restrict queryset to authenticated user's own records."""
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class PersonalGoalViewSet(UserOwnedMixin, viewsets.ModelViewSet):
    queryset = PersonalGoal.objects.all()
    serializer_class = PersonalGoalSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'priority', 'status']
    search_fields = ['title', 'description']
    ordering_fields = ['target_date', 'priority', 'progress', 'created_at']


class HabitViewSet(UserOwnedMixin, viewsets.ModelViewSet):
    queryset = Habit.objects.all()
    serializer_class = HabitSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['frequency', 'is_active']
    search_fields = ['name']

    @action(detail=True, methods=['post'], url_path='log')
    def log(self, request, pk=None):
        """POST /api/v1/personal/habits/{id}/log/ — Log a habit completion."""
        habit = self.get_object()
        date = request.data.get('date', timezone.now().date().isoformat())
        count = request.data.get('count', 1)
        note = request.data.get('note', '')
        log, created = HabitLog.objects.update_or_create(
            habit=habit, date=date,
            defaults={'count': count, 'note': note},
        )
        return Response(HabitLogSerializer(log).data)


class HabitLogViewSet(UserOwnedMixin, viewsets.ModelViewSet):
    serializer_class = HabitLogSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['habit', 'date']
    ordering_fields = ['date']

    def get_queryset(self):
        return HabitLog.objects.filter(habit__user=self.request.user)

    def perform_create(self, serializer):
        serializer.save()


class KPIViewSet(UserOwnedMixin, viewsets.ModelViewSet):
    queryset = KPI.objects.all()
    serializer_class = KPISerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['unit', 'frequency', 'is_active']
    search_fields = ['name', 'description']

    @action(detail=False, methods=['get'], url_path='summary')
    def summary(self, request):
        """GET /api/v1/personal/kpis/summary/ — On-track vs off-track KPIs."""
        kpis = self.get_queryset()
        on_track = [k for k in kpis if float(k.current_value) >= float(k.target_value) * 0.7]
        return Response({
            'total': kpis.count(),
            'on_track': len(on_track),
            'needs_attention': kpis.count() - len(on_track),
        })


class DailyEntryViewSet(UserOwnedMixin, viewsets.ModelViewSet):
    queryset = DailyEntry.objects.all()
    serializer_class = DailyEntrySerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['date', 'mood']
    ordering_fields = ['date']
