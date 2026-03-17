from django.core.management.base import BaseCommand

from octofit_tracker.models import Activity, LeaderboardEntry, Team, UserProfile, Workout


class Command(BaseCommand):
    help = "octofit_db 데이터베이스에 테스트 데이터를 입력합니다."

    def handle(self, *args, **options):
        Activity.objects.all().delete()
        Workout.objects.all().delete()
        LeaderboardEntry.objects.all().delete()
        UserProfile.objects.all().delete()
        Team.objects.all().delete()

        marvel = Team.objects.create(name="Marvel Team", city="New York")
        dc = Team.objects.create(name="DC Team", city="Gotham")

        users = [
            UserProfile(name="Spider-Man", email="spiderman@octofit.io", team=marvel, power_level=92),
            UserProfile(name="Iron Man", email="ironman@octofit.io", team=marvel, power_level=95),
            UserProfile(name="Wonder Woman", email="wonderwoman@octofit.io", team=dc, power_level=97),
            UserProfile(name="Batman", email="batman@octofit.io", team=dc, power_level=90),
        ]
        UserProfile.objects.bulk_create(users)

        saved_users = {u.name: u for u in UserProfile.objects.select_related("team").all()}

        Activity.objects.bulk_create(
            [
                Activity(user=saved_users["Spider-Man"], activity_type="HIIT", duration_minutes=45, calories_burned=540),
                Activity(user=saved_users["Iron Man"], activity_type="Strength", duration_minutes=60, calories_burned=620),
                Activity(user=saved_users["Wonder Woman"], activity_type="Cardio", duration_minutes=50, calories_burned=580),
                Activity(user=saved_users["Batman"], activity_type="Cycling", duration_minutes=40, calories_burned=460),
            ]
        )

        LeaderboardEntry.objects.bulk_create(
            [
                LeaderboardEntry(user=saved_users["Wonder Woman"], score=970, rank=1),
                LeaderboardEntry(user=saved_users["Iron Man"], score=950, rank=2),
                LeaderboardEntry(user=saved_users["Spider-Man"], score=920, rank=3),
                LeaderboardEntry(user=saved_users["Batman"], score=900, rank=4),
            ]
        )

        Workout.objects.bulk_create(
            [
                Workout(user=saved_users["Spider-Man"], recommendation="Plyometric agility circuit", level="advanced"),
                Workout(user=saved_users["Iron Man"], recommendation="Upper-body power complex", level="advanced"),
                Workout(user=saved_users["Wonder Woman"], recommendation="Hybrid endurance challenge", level="advanced"),
                Workout(user=saved_users["Batman"], recommendation="Functional mobility and core", level="intermediate"),
            ]
        )

        self.stdout.write(self.style.SUCCESS("octofit_db 테스트 데이터 적재 완료"))
