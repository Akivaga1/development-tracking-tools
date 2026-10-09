from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FootballClubViewSet, PlayerViewSet, MatchViewSet

app_name = 'football'

router = DefaultRouter()
router.register('clubs',   FootballClubViewSet, basename='club')
router.register('players', PlayerViewSet,       basename='player')
router.register('matches', MatchViewSet,        basename='match')

urlpatterns = [
    path('', include(router.urls)),
]
