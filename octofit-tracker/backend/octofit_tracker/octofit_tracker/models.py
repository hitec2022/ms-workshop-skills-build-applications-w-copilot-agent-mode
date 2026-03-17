from django.db import models


class Team(models.Model):
    name = models.CharField(max_length=100, unique=True)
    city = models.CharField(max_length=100, blank=True)

    class Meta:
        db_table = "teams"

    def __str__(self):
        return self.name


class UserProfile(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name="users")
    power_level = models.PositiveIntegerField(default=0)

    class Meta:
        db_table = "users"

    def __str__(self):
        return self.name


class Activity(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="activities")
    activity_type = models.CharField(max_length=50)
    duration_minutes = models.PositiveIntegerField()
    calories_burned = models.PositiveIntegerField(default=0)
    recorded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "activities"
        ordering = ["-recorded_at"]

    def __str__(self):
        return f"{self.user.name} - {self.activity_type}"


class LeaderboardEntry(models.Model):
    user = models.OneToOneField(UserProfile, on_delete=models.CASCADE, related_name="leaderboard_entry")
    score = models.PositiveIntegerField(default=0)
    rank = models.PositiveIntegerField(default=0)

    class Meta:
        db_table = "leaderboard"
        ordering = ["rank"]

    def __str__(self):
        return f"#{self.rank} {self.user.name}"


class Workout(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="workouts")
    recommendation = models.CharField(max_length=200)
    level = models.CharField(max_length=50, default="beginner")

    class Meta:
        db_table = "workouts"

    def __str__(self):
        return f"{self.user.name} - {self.level}"
