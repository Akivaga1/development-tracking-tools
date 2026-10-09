"""
Custom management command: python manage.py seed_data
Seeds the database with demo data for development/testing.
"""
import random
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import timedelta

User = get_user_model()


class Command(BaseCommand):
    help = 'Seeds the database with demo data'

    def handle(self, *args, **options):
        self.stdout.write('🌱 Seeding database...')

        # Create superuser
        if not User.objects.filter(email='admin@reflect-evolve.com').exists():
            User.objects.create_superuser(
                email='admin@reflect-evolve.com',
                password='Admin1234!',
                full_name='Admin User',
            )
            self.stdout.write(self.style.SUCCESS('✓ Superuser created: admin@reflect-evolve.com / Admin1234!'))

        # Create demo user
        demo_user, created = User.objects.get_or_create(
            email='demo@reflect-evolve.com',
            defaults={'full_name': 'Demo User', 'is_email_verified': True},
        )
        if created:
            demo_user.set_password('Demo1234!')
            demo_user.save()
            self.stdout.write(self.style.SUCCESS('✓ Demo user created: demo@reflect-evolve.com / Demo1234!'))

        # Seed football
        from football.models import FootballClub, Player, Match
        if not FootballClub.objects.filter(owner=demo_user).exists():
            club = FootballClub.objects.create(
                owner=demo_user,
                name='Reflect United FC',
                league='premier_league',
                league_position='5th',
                stadium='Evolution Park',
                founded_year=2020,
                budget=50_000_000,
            )
            positions = ['GK', 'CB', 'LB', 'RB', 'CM', 'CAM', 'LW', 'RW', 'ST']
            for i, pos in enumerate(positions):
                Player.objects.create(
                    club=club, name=f'Player {i+1}', position=pos,
                    nationality='International', age=24 + i, jersey_number=i+1,
                    market_value=1_000_000 * (i + 1),
                )
            for i in range(5):
                Match.objects.create(
                    club=club,
                    opponent=f'Opponent {i+1} FC',
                    match_date=timezone.now() - timedelta(days=7 * i),
                    home_score=random.randint(0, 4),
                    away_score=random.randint(0, 3),
                    result=random.choice(['W', 'D', 'L']),
                    competition='league',
                    is_home=i % 2 == 0,
                )
            self.stdout.write(self.style.SUCCESS('✓ Football data seeded'))

        # Seed personal tracker
        from personal_tracker.models import PersonalGoal, Habit, KPI, DailyEntry
        if not PersonalGoal.objects.filter(user=demo_user).exists():
            goals_data = [
                {'title': 'Run a marathon', 'category': 'health', 'priority': 'high', 'progress': 35},
                {'title': 'Save $10,000', 'category': 'finance', 'priority': 'medium', 'progress': 60},
                {'title': 'Learn Python', 'category': 'learning', 'priority': 'high', 'progress': 80},
            ]
            for g in goals_data:
                PersonalGoal.objects.create(user=demo_user, status='in_progress', **g)

            habits_data = ['Morning Meditation', 'Evening Walk', 'Read 30 mins', 'Cold Shower']
            for name in habits_data:
                Habit.objects.create(
                    user=demo_user, name=name, frequency='daily',
                    current_streak=random.randint(1, 21),
                )

            KPI.objects.create(
                user=demo_user, name='Monthly Revenue', unit='currency',
                target_value=5000, current_value=3750, frequency='monthly',
            )

            for i in range(7):
                DailyEntry.objects.create(
                    user=demo_user,
                    date=(timezone.now() - timedelta(days=i)).date(),
                    mood=random.randint(3, 5),
                    energy_level=random.randint(6, 10),
                    gratitude='Grateful for another day',
                    wins='Completed my tasks',
                )
            self.stdout.write(self.style.SUCCESS('✓ Personal tracker data seeded'))

        # Seed burnout
        from burnout.models import BurnoutAssessment, WorkloadEntry
        if not BurnoutAssessment.objects.filter(user=demo_user).exists():
            for i in range(4):
                BurnoutAssessment.objects.create(
                    user=demo_user,
                    date=(timezone.now() - timedelta(weeks=i)).date(),
                    emotional_exhaustion=random.randint(2, 6),
                    depersonalization=random.randint(1, 4),
                    personal_accomplishment=random.randint(6, 10),
                    work_hours_per_week=45,
                    sleep_hours_per_night=7.0,
                )
            for i in range(7):
                WorkloadEntry.objects.create(
                    user=demo_user,
                    date=(timezone.now() - timedelta(days=i)).date(),
                    hours_worked=random.uniform(7, 10),
                    stress_level=random.randint(3, 7),
                    tasks_completed=random.randint(3, 8),
                    tasks_pending=random.randint(1, 4),
                )
            self.stdout.write(self.style.SUCCESS('✓ Burnout data seeded'))

        self.stdout.write(self.style.SUCCESS('\n✅ Database seeded successfully!'))
        self.stdout.write('  Login: demo@reflect-evolve.com / Demo1234!')
        self.stdout.write('  Admin: admin@reflect-evolve.com / Admin1234!')
