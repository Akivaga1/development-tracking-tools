from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import CareerGoal, Skill, InnovationIdea, ExecutiveLearning
from .serializers import CareerGoalSerializer, SkillSerializer, InnovationIdeaSerializer, ExecutiveLearningSerializer


class UserOwnedMixin:
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CareerGoalViewSet(UserOwnedMixin, viewsets.ModelViewSet):
    queryset = CareerGoal.objects.all()
    serializer_class = CareerGoalSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['timeframe', 'status']
    search_fields = ['title', 'description']
    ordering_fields = ['target_date', 'progress', 'created_at']


class SkillViewSet(UserOwnedMixin, viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'priority', 'is_certified']
    search_fields = ['name']
    ordering_fields = ['current_level', 'target_level', 'priority']


class InnovationIdeaViewSet(UserOwnedMixin, viewsets.ModelViewSet):
    queryset = InnovationIdea.objects.all()
    serializer_class = InnovationIdeaSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'impact_potential']
    search_fields = ['title', 'description', 'problem_statement']
    ordering_fields = ['votes', 'created_at']


class ExecutiveLearningViewSet(UserOwnedMixin, viewsets.ModelViewSet):
    queryset = ExecutiveLearning.objects.all()
    serializer_class = ExecutiveLearningSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['learning_type', 'status']
    search_fields = ['title', 'author_or_provider']
    ordering_fields = ['date_completed', 'rating', 'created_at']
