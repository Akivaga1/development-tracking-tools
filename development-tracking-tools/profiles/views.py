from rest_framework import generics, permissions
from .models import Profile
from .serializers import ProfileSerializer


class ProfileView(generics.RetrieveUpdateAPIView):
    """
    GET  /api/v1/profiles/me/ — get current user's profile
    PUT/PATCH /api/v1/profiles/me/ — update profile
    """
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        profile, _ = Profile.objects.get_or_create(user=self.request.user)
        return profile
