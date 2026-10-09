from rest_framework import serializers
from .models import CareerGoal, Skill, InnovationIdea, ExecutiveLearning


class CareerGoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = CareerGoal
        fields = '__all__'
        read_only_fields = ['id', 'user', 'created_at', 'updated_at']


class SkillSerializer(serializers.ModelSerializer):
    gap = serializers.SerializerMethodField()

    class Meta:
        model = Skill
        fields = '__all__'
        read_only_fields = ['id', 'user', 'created_at', 'updated_at']

    def get_gap(self, obj):
        return max(0, obj.target_level - obj.current_level)


class InnovationIdeaSerializer(serializers.ModelSerializer):
    class Meta:
        model = InnovationIdea
        fields = '__all__'
        read_only_fields = ['id', 'user', 'votes', 'created_at', 'updated_at']


class ExecutiveLearningSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExecutiveLearning
        fields = '__all__'
        read_only_fields = ['id', 'user', 'created_at']
