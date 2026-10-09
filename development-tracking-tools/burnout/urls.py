from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BurnoutAssessmentViewSet, WorkloadEntryViewSet, RecoveryActivityViewSet, BurnoutAlertViewSet

app_name = 'burnout'

router = DefaultRouter()
router.register('assessments',  BurnoutAssessmentViewSet, basename='burnout-assessment')
router.register('workload',     WorkloadEntryViewSet,     basename='workload-entry')
router.register('recovery',     RecoveryActivityViewSet,  basename='recovery-activity')
router.register('alerts',       BurnoutAlertViewSet,      basename='burnout-alert')

urlpatterns = [path('', include(router.urls))]
