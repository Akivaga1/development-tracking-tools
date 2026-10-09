"""
Burnout Tracking models — stress levels, workload, recovery activities, assessments.
"""
import uuid
from django.db import models
from django.conf import settings


class BurnoutAssessment(models.Model):
    """Periodic burnout assessment based on Maslach Burnout Inventory."""
    RISK_LEVEL_CHOICES = [
        ('low', 'Low Risk'), ('moderate', 'Moderate Risk'),
        ('high', 'High Risk'), ('critical', 'Critical'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='burnout_assessments')
    date = models.DateField()
    # Core burnout dimensions (0–10 each)
    emotional_exhaustion = models.PositiveSmallIntegerField(default=0)
    depersonalization = models.PositiveSmallIntegerField(default=0)
    personal_accomplishment = models.PositiveSmallIntegerField(default=10)  # Higher = better
    # Lifestyle factors
    work_hours_per_week = models.DecimalField(max_digits=4, decimal_places=1, null=True, blank=True)
    sleep_hours_per_night = models.DecimalField(max_digits=3, decimal_places=1, null=True, blank=True)
    exercise_days_per_week = models.PositiveSmallIntegerField(null=True, blank=True)
    # Overall scores
    overall_score = models.PositiveSmallIntegerField(default=0)  # Computed: 0–30
    risk_level = models.CharField(max_length=10, choices=RISK_LEVEL_CHOICES, default='low')
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'burnout_assessments'
        ordering = ['-date']
        unique_together = [('user', 'date')]

    def __str__(self):
        return f'{self.user.email} — Burnout assessment {self.date}'

    def compute_score(self):
        """Higher emotional_exhaustion + depersonalization = more burnout risk."""
        self.overall_score = self.emotional_exhaustion + self.depersonalization + (10 - self.personal_accomplishment)
        if self.overall_score <= 8:
            self.risk_level = 'low'
        elif self.overall_score <= 16:
            self.risk_level = 'moderate'
        elif self.overall_score <= 24:
            self.risk_level = 'high'
        else:
            self.risk_level = 'critical'

    def save(self, *args, **kwargs):
        self.compute_score()
        super().save(*args, **kwargs)


class WorkloadEntry(models.Model):
    """Daily workload and stress log."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='workload_entries')
    date = models.DateField()
    hours_worked = models.DecimalField(max_digits=4, decimal_places=1, default=8)
    stress_level = models.PositiveSmallIntegerField(default=5)  # 1–10
    focus_score = models.PositiveSmallIntegerField(null=True, blank=True)  # 1–10
    meetings_count = models.PositiveSmallIntegerField(default=0)
    tasks_completed = models.PositiveSmallIntegerField(default=0)
    tasks_pending = models.PositiveSmallIntegerField(default=0)
    main_stressors = models.JSONField(default=list, blank=True)
    highlights = models.TextField(blank=True)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'workload_entries'
        ordering = ['-date']
        unique_together = [('user', 'date')]

    def __str__(self):
        return f'{self.user.email} — Workload {self.date}'


class RecoveryActivity(models.Model):
    CATEGORY_CHOICES = [
        ('exercise', 'Exercise'), ('meditation', 'Meditation/Mindfulness'),
        ('social', 'Social Connection'), ('nature', 'Nature/Outdoors'),
        ('hobby', 'Hobby'), ('rest', 'Rest/Sleep'), ('therapy', 'Therapy/Counseling'),
        ('vacation', 'Vacation/Time Off'), ('other', 'Other'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='recovery_activities')
    name = models.CharField(max_length=200)
    category = models.CharField(max_length=15, choices=CATEGORY_CHOICES, default='other')
    description = models.TextField(blank=True)
    frequency = models.CharField(max_length=10, choices=[('daily', 'Daily'), ('weekly', 'Weekly'),
                                                           ('monthly', 'Monthly'), ('as_needed', 'As Needed')],
                                  default='weekly')
    duration_minutes = models.PositiveIntegerField(null=True, blank=True)
    effectiveness_rating = models.PositiveSmallIntegerField(null=True, blank=True)  # 1–5
    is_active = models.BooleanField(default=True)
    last_performed = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'recovery_activities'
        ordering = ['category', 'name']

    def __str__(self):
        return f'{self.name} ({self.category})'


class BurnoutAlert(models.Model):
    SEVERITY_CHOICES = [('info', 'Info'), ('warning', 'Warning'), ('danger', 'Danger')]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='burnout_alerts')
    message = models.TextField()
    severity = models.CharField(max_length=10, choices=SEVERITY_CHOICES, default='info')
    is_read = models.BooleanField(default=False)
    triggered_by = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'burnout_alerts'
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.severity.upper()} alert for {self.user.email}'
