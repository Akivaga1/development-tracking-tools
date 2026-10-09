"""
Personal Tracker models — goals, habits, KPIs, daily entries.
"""
import uuid
from django.db import models
from django.conf import settings


class PersonalGoal(models.Model):
    PRIORITY_CHOICES = [('low', 'Low'), ('medium', 'Medium'), ('high', 'High'), ('critical', 'Critical')]
    STATUS_CHOICES = [('not_started', 'Not Started'), ('in_progress', 'In Progress'),
                      ('completed', 'Completed'), ('paused', 'Paused'), ('cancelled', 'Cancelled')]
    CATEGORY_CHOICES = [
        ('health', 'Health'), ('finance', 'Finance'), ('career', 'Career'),
        ('relationships', 'Relationships'), ('learning', 'Learning'), ('personal', 'Personal'),
        ('spiritual', 'Spiritual'), ('other', 'Other'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='personal_goals')
    title = models.CharField(max_length=300)
    description = models.TextField(blank=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='personal')
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='medium')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='not_started')
    target_date = models.DateField(null=True, blank=True)
    progress = models.PositiveIntegerField(default=0)  # 0–100 %
    milestones = models.JSONField(default=list, blank=True)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'personal_goals'
        ordering = ['-created_at']

    def __str__(self):
        return self.title


class Habit(models.Model):
    FREQUENCY_CHOICES = [('daily', 'Daily'), ('weekly', 'Weekly'), ('monthly', 'Monthly')]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='habits')
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    frequency = models.CharField(max_length=10, choices=FREQUENCY_CHOICES, default='daily')
    target_count = models.PositiveIntegerField(default=1)
    current_streak = models.PositiveIntegerField(default=0)
    longest_streak = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    color = models.CharField(max_length=7, default='#6366f1')
    icon = models.CharField(max_length=50, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'habits'
        ordering = ['name']

    def __str__(self):
        return f'{self.user.email} — {self.name}'


class HabitLog(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    habit = models.ForeignKey(Habit, on_delete=models.CASCADE, related_name='logs')
    date = models.DateField()
    count = models.PositiveIntegerField(default=1)
    note = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'habit_logs'
        unique_together = [('habit', 'date')]
        ordering = ['-date']


class KPI(models.Model):
    UNIT_CHOICES = [
        ('number', 'Number'), ('percentage', '%'), ('currency', 'Currency'),
        ('hours', 'Hours'), ('days', 'Days'), ('custom', 'Custom'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='kpis')
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    unit = models.CharField(max_length=15, choices=UNIT_CHOICES, default='number')
    custom_unit = models.CharField(max_length=30, blank=True)
    target_value = models.DecimalField(max_digits=15, decimal_places=4)
    current_value = models.DecimalField(max_digits=15, decimal_places=4, default=0)
    frequency = models.CharField(max_length=10, choices=[('daily', 'Daily'), ('weekly', 'Weekly'),
                                                          ('monthly', 'Monthly'), ('yearly', 'Yearly')],
                                  default='monthly')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'kpis'
        ordering = ['name']

    def __str__(self):
        return self.name

    @property
    def progress_percentage(self):
        if self.target_value == 0:
            return 0
        return round((float(self.current_value) / float(self.target_value)) * 100, 1)


class DailyEntry(models.Model):
    MOOD_CHOICES = [(1, '😞'), (2, '😐'), (3, '🙂'), (4, '😊'), (5, '🤩')]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='daily_entries')
    date = models.DateField()
    mood = models.PositiveSmallIntegerField(choices=MOOD_CHOICES, null=True, blank=True)
    energy_level = models.PositiveSmallIntegerField(null=True, blank=True)  # 1–10
    gratitude = models.TextField(blank=True)
    wins = models.TextField(blank=True)
    challenges = models.TextField(blank=True)
    tomorrow_focus = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'daily_entries'
        unique_together = [('user', 'date')]
        ordering = ['-date']

    def __str__(self):
        return f'{self.user.email} — {self.date}'
