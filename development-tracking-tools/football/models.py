"""
Football Management models — clubs, players, matches, and stats.
"""
import uuid
from django.db import models
from django.conf import settings


class FootballClub(models.Model):
    LEAGUE_CHOICES = [
        ('premier_league', 'Premier League'),
        ('la_liga', 'La Liga'),
        ('serie_a', 'Serie A'),
        ('bundesliga', 'Bundesliga'),
        ('ligue_1', 'Ligue 1'),
        ('championship', 'Championship'),
        ('other', 'Other'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='football_clubs',
    )
    name = models.CharField(max_length=200)
    league = models.CharField(max_length=50, choices=LEAGUE_CHOICES, default='other')
    league_position = models.CharField(max_length=100, blank=True)
    stadium = models.CharField(max_length=200, blank=True)
    founded_year = models.PositiveIntegerField(null=True, blank=True)
    budget = models.DecimalField(max_digits=15, decimal_places=2, null=True, blank=True)
    records = models.JSONField(default=dict, blank=True)
    revision = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'football_clubs'
        ordering = ['name']

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if self.pk:
            self.revision += 1
        super().save(*args, **kwargs)


class Player(models.Model):
    POSITION_CHOICES = [
        ('GK', 'Goalkeeper'), ('CB', 'Centre-Back'), ('LB', 'Left-Back'),
        ('RB', 'Right-Back'), ('CDM', 'Defensive Mid'), ('CM', 'Central Mid'),
        ('CAM', 'Attacking Mid'), ('LW', 'Left Wing'), ('RW', 'Right Wing'),
        ('ST', 'Striker'), ('CF', 'Centre Forward'),
    ]
    STATUS_CHOICES = [
        ('active', 'Active'), ('injured', 'Injured'), ('suspended', 'Suspended'),
        ('on_loan', 'On Loan'), ('transfer', 'Transfer Listed'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    club = models.ForeignKey(FootballClub, on_delete=models.CASCADE, related_name='players')
    name = models.CharField(max_length=200)
    position = models.CharField(max_length=10, choices=POSITION_CHOICES)
    nationality = models.CharField(max_length=100, blank=True)
    age = models.PositiveIntegerField(null=True, blank=True)
    jersey_number = models.PositiveIntegerField(null=True, blank=True)
    market_value = models.DecimalField(max_digits=15, decimal_places=2, null=True, blank=True)
    salary = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    contract_until = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    stats = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'football_players'
        ordering = ['position', 'name']
        unique_together = [('club', 'jersey_number')]

    def __str__(self):
        return f'{self.name} ({self.club.name})'


class Match(models.Model):
    RESULT_CHOICES = [('W', 'Win'), ('D', 'Draw'), ('L', 'Loss'), ('P', 'Pending')]
    COMPETITION_CHOICES = [
        ('league', 'League'), ('cup', 'Cup'), ('champions_league', 'Champions League'),
        ('europa_league', 'Europa League'), ('friendly', 'Friendly'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    club = models.ForeignKey(FootballClub, on_delete=models.CASCADE, related_name='matches')
    opponent = models.CharField(max_length=200)
    match_date = models.DateTimeField()
    home_score = models.PositiveIntegerField(null=True, blank=True)
    away_score = models.PositiveIntegerField(null=True, blank=True)
    is_home = models.BooleanField(default=True)
    competition = models.CharField(max_length=30, choices=COMPETITION_CHOICES, default='league')
    result = models.CharField(max_length=1, choices=RESULT_CHOICES, default='P')
    venue = models.CharField(max_length=200, blank=True)
    attendance = models.PositiveIntegerField(null=True, blank=True)
    notes = models.TextField(blank=True)
    stats = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'football_matches'
        ordering = ['-match_date']

    def __str__(self):
        return f'{self.club} vs {self.opponent} ({self.match_date.date()})'
