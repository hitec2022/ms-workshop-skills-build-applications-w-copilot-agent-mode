from django.contrib import admin

from .models import Activity, LeaderboardEntry, Team, UserProfile, Workout


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "city")
    search_fields = ("name", "city")


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "email", "team", "power_level")
    list_filter = ("team",)
    search_fields = ("name", "email")


@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "activity_type", "duration_minutes", "calories_burned", "recorded_at")
    list_filter = ("activity_type",)
    search_fields = ("user__name",)


@admin.register(LeaderboardEntry)
class LeaderboardEntryAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "score", "rank")
    ordering = ("rank",)


@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "recommendation", "level")
    list_filter = ("level",)
    search_fields = ("user__name", "recommendation")
