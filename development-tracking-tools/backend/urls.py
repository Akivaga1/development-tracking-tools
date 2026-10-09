"""
Root URL configuration for Reflect & Evolve DTT backend.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

# ─── Swagger / ReDoc schema view ────────────────────────────────────────────
schema_view = get_schema_view(
    openapi.Info(
        title="Reflect & Evolve DTT API",
        default_version='v1',
        description="""
        Complete REST API backend for the Reflect & Evolve Decision Tracking Tool (DTT).
        Covers authentication, user profiles, football management, personal tracking,
        career development, campaign management, organizational tools, finance, and burnout tracking.
        """,
        terms_of_service="https://reflect-evolve.com/terms/",
        contact=openapi.Contact(email="support@reflect-evolve.com"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    # Admin
    path('admin/', admin.site.urls),

    # API v1 routes
    path('api/v1/auth/',          include('accounts.urls')),
    path('api/v1/profiles/',      include('profiles.urls')),
    path('api/v1/football/',      include('football.urls')),
    path('api/v1/personal/',      include('personal_tracker.urls')),
    path('api/v1/career/',        include('career.urls')),
    path('api/v1/campaign/',      include('campaign.urls')),
    path('api/v1/organizational/',include('organizational.urls')),
    path('api/v1/finance/',       include('finance.urls')),
    path('api/v1/burnout/',       include('burnout.urls')),

    # API docs
    path('api/docs/',   schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('api/redoc/',  schema_view.with_ui('redoc', cache_timeout=0),   name='schema-redoc'),
    path('api/schema/', schema_view.without_ui(cache_timeout=0),         name='schema-json'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
