from rest_framework import serializers
from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email', read_only=True)
    full_name = serializers.CharField(source='user.full_name', read_only=True)

    class Meta:
        model = Profile
        fields = [
            'id', 'email', 'full_name', 'avatar_url', 'bio',
            'phone', 'location', 'website', 'linkedin', 'twitter',
            'preferences', 'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'email', 'full_name', 'created_at', 'updated_at']
