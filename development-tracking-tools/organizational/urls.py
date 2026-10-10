from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ContactViewSet, DealViewSet, InventoryItemViewSet,
    TeamViewSet, TeamMemberViewSet, BusinessGoalViewSet,
    ObjectiveViewSet, KeyResultViewSet,
    RemoteTimesheetViewSet,
    CommunityGroupViewSet, GroupJournalEntryViewSet, FaithFlowStreakViewSet,
)

app_name = 'organizational'

router = DefaultRouter()
router.register('contacts',         ContactViewSet,         basename='contact')
router.register('deals',            DealViewSet,            basename='deal')
router.register('inventory',        InventoryItemViewSet,   basename='inventory')
router.register('teams',            TeamViewSet,            basename='team')
router.register('team-members',     TeamMemberViewSet,      basename='team-member')
router.register('business-goals',   BusinessGoalViewSet,    basename='business-goal')
router.register('okr/objectives',   ObjectiveViewSet,       basename='objective')
router.register('okr/key-results',  KeyResultViewSet,       basename='key-result')
router.register('remote/timesheets',RemoteTimesheetViewSet, basename='remote-timesheet')
router.register('community/groups', CommunityGroupViewSet,  basename='community-group')
router.register('community/journal',GroupJournalEntryViewSet, basename='group-journal')
router.register('community/faithflow', FaithFlowStreakViewSet, basename='faithflow-streak')

urlpatterns = [path('', include(router.urls))]

