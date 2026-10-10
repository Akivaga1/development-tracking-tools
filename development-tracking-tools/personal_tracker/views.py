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


from rest_framework.views import APIView
from rest_framework import status


class VoiceToneAnalysisView(APIView):
    """
    POST /api/v1/personal/voice-analysis/
    Analyze voice pitch (Hz), volume (dB), and tempo (WPM) to calculate emotional valence,
    stress score, and recommend targeted wellness routines (e.g., 4-7-8 breathing).
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            pitch = float(request.data.get('pitch', 185.0))      # Hz
            volume = float(request.data.get('volume', -24.0))    # dB
            tempo = float(request.data.get('tempo', 135.0))      # WPM
        except (ValueError, TypeError):
            pitch, volume, tempo = 185.0, -24.0, 135.0

        stress_score = 0.0
        if tempo > 150:
            stress_score += min(35.0, (tempo - 150) * 1.5)
        if pitch > 210:
            stress_score += min(35.0, (pitch - 210) * 0.8)
        if volume > -15:
            stress_score += min(30.0, (volume + 15) * 2.0)

        stress_quotient = min(100.0, max(5.0, round(stress_score + 15.0, 1)))

        if stress_quotient > 60:
            emotion = 'Stressed / Agitated'
            valence = 'negative'
            recommendation = 'Gentle recommendation: Take a 3-minute 4-7-8 breathing break to bring your autonomic nervous system back to baseline.'
            action_type = 'breathing_exercise'
        elif tempo < 115 and volume < -28:
            emotion = 'Fatigued / Low Energy'
            valence = 'neutral-low'
            recommendation = 'Gentle recommendation: Step away from screens for a short walk and hydrate.'
            action_type = 'gentle_movement'
        elif 120 <= tempo <= 145 and stress_quotient <= 40:
            emotion = 'Calm & Flowing'
            valence = 'positive'
            recommendation = 'You are in an optimal flow zone. Great time to tackle priority SMART goals.'
            action_type = 'focus_session'
        else:
            emotion = 'Steady & Mindful'
            valence = 'positive'
            recommendation = 'Steady baseline observed. Keep monitoring your daily reflections.'
            action_type = 'reflection'

        return Response({
            'status': 'success',
            'voice_metrics': {
                'pitch_hz': pitch,
                'volume_db': volume,
                'tempo_wpm': tempo,
            },
            'stress_quotient': stress_quotient,
            'emotion_detected': emotion,
            'valence': valence,
            'recommendation': recommendation,
            'action_type': action_type,
            'timestamp': timezone.now().isoformat(),
        })

