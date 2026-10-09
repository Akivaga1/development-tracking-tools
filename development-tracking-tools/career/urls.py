from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CareerGoalViewSet, SkillViewSet, InnovationIdeaViewSet, ExecutiveLearningViewSet

app_name = 'career'

router = DefaultRouter()
router.register('goals',             CareerGoalViewSet,       basename='career-goal')
router.register('skills',            SkillViewSet,            basename='skill')
router.register('innovation-ideas',  InnovationIdeaViewSet,   basename='innovation-idea')
router.register('executive-learning',ExecutiveLearningViewSet,basename='executive-learning')

urlpatterns = [path('', include(router.urls))]
