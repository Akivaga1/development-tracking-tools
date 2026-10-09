from django.contrib import admin
from .models import FootballClub, Player, Match


@admin.register(FootballClub)
class FootballClubAdmin(admin.ModelAdmin):
    list_display = ['name', 'owner', 'league', 'league_position', 'revision', 'created_at']
    list_filter = ['league']
    search_fields = ['name', 'owner__email']
    readonly_fields = ['revision', 'created_at', 'updated_at']


@admin.register(Player)
class PlayerAdmin(admin.ModelAdmin):
    list_display = ['name', 'club', 'position', 'status', 'age', 'jersey_number']
    list_filter = ['position', 'status', 'nationality']
    search_fields = ['name', 'nationality', 'club__name']


@admin.register(Match)
class MatchAdmin(admin.ModelAdmin):
    list_display = ['club', 'opponent', 'match_date', 'result', 'competition', 'is_home']
    list_filter = ['result', 'competition', 'is_home']
    search_fields = ['opponent', 'club__name']
