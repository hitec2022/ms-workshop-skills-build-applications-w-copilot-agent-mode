from rest_framework import serializers

from .models import Activity, LeaderboardEntry, Team, UserProfile, Workout


class TeamSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)

    class Meta:
        model = Team
        fields = ["id", "name", "city"]


class UserProfileSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    team_id = serializers.CharField(source="team.id", read_only=True)
    team_name = serializers.CharField(source="team.name", read_only=True)

    class Meta:
        model = UserProfile
        fields = ["id", "name", "email", "team", "team_id", "team_name", "power_level"]


class ActivitySerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    user_id = serializers.CharField(source="user.id", read_only=True)
    user_name = serializers.CharField(source="user.name", read_only=True)

    class Meta:
        model = Activity
        fields = [
            "id",
            "user",
            "user_id",
            "user_name",
            "activity_type",
            "duration_minutes",
            "calories_burned",
            "recorded_at",
        ]


class LeaderboardSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    user_id = serializers.CharField(source="user.id", read_only=True)
    user_name = serializers.CharField(source="user.name", read_only=True)

    class Meta:
        model = LeaderboardEntry
        fields = ["id", "user", "user_id", "user_name", "score", "rank"]


class WorkoutSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    user_id = serializers.CharField(source="user.id", read_only=True)
    user_name = serializers.CharField(source="user.name", read_only=True)

    class Meta:
        model = Workout
        fields = ["id", "user", "user_id", "user_name", "recommendation", "level"]
