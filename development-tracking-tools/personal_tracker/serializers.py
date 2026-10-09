from rest_framework import serializers
from .models import PersonalGoal, Habit, HabitLog, KPI, DailyEntry


class PersonalGoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonalGoal
        fields = '__all__'
        read_only_fields = ['id', 'user', 'created_at', 'updated_at']


class HabitLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = HabitLog
        fields = '__all__'
        read_only_fields = ['id', 'created_at']


class HabitSerializer(serializers.ModelSerializer):
    logs = HabitLogSerializer(many=True, read_only=True)

    class Meta:
        model = Habit
        fields = '__all__'
        read_only_fields = ['id', 'user', 'current_streak', 'longest_streak', 'created_at', 'updated_at']


class KPISerializer(serializers.ModelSerializer):
    progress_percentage = serializers.ReadOnlyField()

    class Meta:
        model = KPI
        fields = '__all__'
        read_only_fields = ['id', 'user', 'created_at', 'updated_at']


class DailyEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyEntry
        fields = '__all__'
        read_only_fields = ['id', 'user', 'created_at', 'updated_at']
