from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CampaignViewSet, CampaignActivityViewSet, PoliticalContactViewSet

app_name = 'campaign'

router = DefaultRouter()
router.register('campaigns',  CampaignViewSet,         basename='campaign')
router.register('activities', CampaignActivityViewSet, basename='campaign-activity')
router.register('contacts',   PoliticalContactViewSet, basename='political-contact')

urlpatterns = [path('', include(router.urls))]
