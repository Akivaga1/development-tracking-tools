from rest_framework import serializers
from .models import Campaign, CampaignActivity, PoliticalContact


class CampaignActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = CampaignActivity
        fields = '__all__'
        read_only_fields = ['id', 'created_at']


class CampaignSerializer(serializers.ModelSerializer):
    activities_count = serializers.SerializerMethodField()
    budget_remaining = serializers.SerializerMethodField()

    class Meta:
        model = Campaign
        fields = '__all__'
        read_only_fields = ['id', 'user', 'created_at', 'updated_at']

    def get_activities_count(self, obj):
        return obj.activities.count()

    def get_budget_remaining(self, obj):
        if obj.budget:
            return float(obj.budget) - float(obj.budget_spent)
        return None


class PoliticalContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = PoliticalContact
        fields = '__all__'
        read_only_fields = ['id', 'user', 'created_at']
