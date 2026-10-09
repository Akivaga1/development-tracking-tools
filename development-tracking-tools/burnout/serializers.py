from rest_framework import serializers
from .models import BurnoutAssessment, WorkloadEntry, RecoveryActivity, BurnoutAlert


class BurnoutAssessmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = BurnoutAssessment
        fields = '__all__'
        read_only_fields = ['id', 'user', 'overall_score', 'risk_level', 'created_at']


class WorkloadEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkloadEntry
        fields = '__all__'
        read_only_fields = ['id', 'user', 'created_at', 'updated_at']


class RecoveryActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = RecoveryActivity
        fields = '__all__'
        read_only_fields = ['id', 'user', 'created_at']


class BurnoutAlertSerializer(serializers.ModelSerializer):
    class Meta:
        model = BurnoutAlert
        fields = '__all__'
        read_only_fields = ['id', 'user', 'created_at']
