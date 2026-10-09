from rest_framework import viewsets, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from .models import FootballClub, Player, Match
from .serializers import FootballClubSerializer, FootballClubDetailSerializer, PlayerSerializer, MatchSerializer


class IsOwner(permissions.BasePermission):
    """Object-level permission: only the owner can read/write."""
    def has_object_permission(self, request, view, obj):
        owner = getattr(obj, 'owner', None) or getattr(obj, 'club', None)
        if hasattr(owner, 'owner'):
            return owner.owner == request.user
        return owner == request.user


class FootballClubViewSet(viewsets.ModelViewSet):
    """
    CRUD for football clubs. Only the owner can manage their clubs.
    """
    permission_classes = [permissions.IsAuthenticated, IsOwner]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['league', 'league_position']
    search_fields = ['name', 'stadium']
    ordering_fields = ['name', 'created_at', 'league_position']

    def get_queryset(self):
        return FootballClub.objects.filter(owner=self.request.user).prefetch_related('players', 'matches')

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return FootballClubDetailSerializer
        return FootballClubSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    @action(detail=True, methods=['get'], url_path='stats')
    def stats(self, request, pk=None):
        """GET /api/v1/football/clubs/{id}/stats/ — Aggregated club stats."""
        club = self.get_object()
        matches = club.matches.all()
        wins = matches.filter(result='W').count()
        draws = matches.filter(result='D').count()
        losses = matches.filter(result='L').count()
        return Response({
            'club': club.name,
            'total_players': club.players.count(),
            'total_matches': matches.count(),
            'wins': wins,
            'draws': draws,
            'losses': losses,
            'win_rate': round(wins / matches.count() * 100, 1) if matches.count() else 0,
        })


class PlayerViewSet(viewsets.ModelViewSet):
    """CRUD for players under a club."""
    serializer_class = PlayerSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['club', 'position', 'status', 'nationality']
    search_fields = ['name', 'nationality']
    ordering_fields = ['name', 'age', 'market_value']

    def get_queryset(self):
        return Player.objects.filter(club__owner=self.request.user)


class MatchViewSet(viewsets.ModelViewSet):
    """CRUD for matches under a club."""
    serializer_class = MatchSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['club', 'result', 'competition', 'is_home']
    search_fields = ['opponent', 'venue']
    ordering_fields = ['match_date']

    def get_queryset(self):
        return Match.objects.filter(club__owner=self.request.user)
