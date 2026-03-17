from django.core.management import call_command
from django.test import TestCase
from rest_framework.test import APIClient

from .models import Activity, LeaderboardEntry, Team, UserProfile, Workout


class OctofitCollectionsApiTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        call_command("populate_db")

    def setUp(self):
        self.client = APIClient()

    def test_collections_are_populated(self):
        self.assertGreaterEqual(UserProfile.objects.count(), 4)
        self.assertGreaterEqual(Team.objects.count(), 2)
        self.assertGreaterEqual(Activity.objects.count(), 4)
        self.assertGreaterEqual(LeaderboardEntry.objects.count(), 4)
        self.assertGreaterEqual(Workout.objects.count(), 4)

    def test_api_users_endpoint(self):
        response = self.client.get("/api/users/")
        self.assertEqual(response.status_code, 200)
        self.assertGreaterEqual(len(response.json()), 1)

    def test_api_teams_endpoint(self):
        response = self.client.get("/api/teams/")
        self.assertEqual(response.status_code, 200)
        self.assertGreaterEqual(len(response.json()), 1)

    def test_api_activities_endpoint(self):
        response = self.client.get("/api/activities/")
        self.assertEqual(response.status_code, 200)
        self.assertGreaterEqual(len(response.json()), 1)

    def test_api_leaderboard_endpoint(self):
        response = self.client.get("/api/leaderboard/")
        self.assertEqual(response.status_code, 200)
        self.assertGreaterEqual(len(response.json()), 1)

    def test_api_workouts_endpoint(self):
        response = self.client.get("/api/workouts/")
        self.assertEqual(response.status_code, 200)
        self.assertGreaterEqual(len(response.json()), 1)
