from rest_framework import serializers
from .models import FootballClub, Player, Match


class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'updated_at']


class MatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = '__all__'
        read_only_fields = ['id', 'created_at']


class FootballClubSerializer(serializers.ModelSerializer):
    players_count = serializers.SerializerMethodField()
    matches_count = serializers.SerializerMethodField()

    class Meta:
        model = FootballClub
        fields = '__all__'
        read_only_fields = ['id', 'owner', 'revision', 'created_at', 'updated_at']

    def get_players_count(self, obj):
        return obj.players.count()

    def get_matches_count(self, obj):
        return obj.matches.count()


class FootballClubDetailSerializer(FootballClubSerializer):
    players = PlayerSerializer(many=True, read_only=True)
    matches = MatchSerializer(many=True, read_only=True)
