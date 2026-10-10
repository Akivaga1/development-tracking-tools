from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    PersonalGoalViewSet,
    HabitViewSet,
    HabitLogViewSet,
    KPIViewSet,
    DailyEntryViewSet,
    VoiceToneAnalysisView,
)

app_name = 'personal_tracker'

router = DefaultRouter()
router.register('goals',        PersonalGoalViewSet, basename='personal-goal')
router.register('habits',       HabitViewSet,        basename='habit')
router.register('habit-logs',   HabitLogViewSet,     basename='habit-log')
router.register('kpis',         KPIViewSet,          basename='kpi')
router.register('daily-entries',DailyEntryViewSet,   basename='daily-entry')

urlpatterns = [
    path('voice-analysis/', VoiceToneAnalysisView.as_view(), name='voice-analysis'),
    path('', include(router.urls)),
]

