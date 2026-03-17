from rest_framework import viewsets

from .models import Activity, LeaderboardEntry, Team, UserProfile, Workout
from .serializers import (
    ActivitySerializer,
    LeaderboardSerializer,
    TeamSerializer,
    UserProfileSerializer,
    WorkoutSerializer,
)


class UserViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.select_related("team").all().order_by("id")
    serializer_class = UserProfileSerializer


class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all().order_by("id")
    serializer_class = TeamSerializer


class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.select_related("user").all().order_by("id")
    serializer_class = ActivitySerializer


class LeaderboardViewSet(viewsets.ModelViewSet):
    queryset = LeaderboardEntry.objects.select_related("user").all().order_by("rank")
    serializer_class = LeaderboardSerializer


class WorkoutViewSet(viewsets.ModelViewSet):
    queryset = Workout.objects.select_related("user").all().order_by("id")
    serializer_class = WorkoutSerializer
