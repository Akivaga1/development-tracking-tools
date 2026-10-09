from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ContactViewSet, DealViewSet, InventoryItemViewSet, TeamViewSet, TeamMemberViewSet, BusinessGoalViewSet

app_name = 'organizational'

router = DefaultRouter()
router.register('contacts',       ContactViewSet,       basename='contact')
router.register('deals',          DealViewSet,          basename='deal')
router.register('inventory',      InventoryItemViewSet, basename='inventory')
router.register('teams',          TeamViewSet,          basename='team')
router.register('team-members',   TeamMemberViewSet,    basename='team-member')
router.register('business-goals', BusinessGoalViewSet,  basename='business-goal')

urlpatterns = [path('', include(router.urls))]
