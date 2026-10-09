"""
Career Development models — skills, career goals, innovation ideas, executive learning.
"""
import uuid
from django.db import models
from django.conf import settings


class CareerGoal(models.Model):
    TIMEFRAME_CHOICES = [
        ('short', 'Short-term (0–6 months)'),
        ('medium', 'Medium-term (6–24 months)'),
        ('long', 'Long-term (2–5 years)'),
        ('vision', 'Vision (5+ years)'),
    ]
    STATUS_CHOICES = [
        ('active', 'Active'), ('achieved', 'Achieved'),
        ('paused', 'Paused'), ('abandoned', 'Abandoned'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='career_goals')
    title = models.CharField(max_length=300)
    description = models.TextField(blank=True)
    timeframe = models.CharField(max_length=10, choices=TIMEFRAME_CHOICES, default='medium')
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='active')
    target_date = models.DateField(null=True, blank=True)
    progress = models.PositiveIntegerField(default=0)  # 0–100 %
    actions = models.JSONField(default=list, blank=True)
    resources = models.JSONField(default=list, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'career_goals'
        ordering = ['timeframe', '-created_at']

    def __str__(self):
        return self.title


class Skill(models.Model):
    CATEGORY_CHOICES = [
        ('technical', 'Technical'), ('soft', 'Soft Skills'),
        ('leadership', 'Leadership'), ('language', 'Language'),
        ('industry', 'Industry Knowledge'), ('tool', 'Tool/Software'),
    ]
    LEVEL_CHOICES = [
        (1, 'Beginner'), (2, 'Novice'), (3, 'Intermediate'),
        (4, 'Advanced'), (5, 'Expert'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='skills')
    name = models.CharField(max_length=200)
    category = models.CharField(max_length=15, choices=CATEGORY_CHOICES, default='technical')
    current_level = models.PositiveSmallIntegerField(choices=LEVEL_CHOICES, default=1)
    target_level = models.PositiveSmallIntegerField(choices=LEVEL_CHOICES, default=3)
    priority = models.CharField(max_length=10, choices=[('low', 'Low'), ('medium', 'Medium'), ('high', 'High')],
                                 default='medium')
    learning_resources = models.JSONField(default=list, blank=True)
    progress_notes = models.TextField(blank=True)
    is_certified = models.BooleanField(default=False)
    certification_name = models.CharField(max_length=200, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'skills'
        ordering = ['-priority', 'name']

    def __str__(self):
        return f'{self.name} (Level {self.current_level})'


class InnovationIdea(models.Model):
    STATUS_CHOICES = [
        ('idea', 'Idea'), ('researching', 'Researching'), ('prototyping', 'Prototyping'),
        ('testing', 'Testing'), ('launched', 'Launched'), ('archived', 'Archived'),
    ]
    IMPACT_CHOICES = [('low', 'Low'), ('medium', 'Medium'), ('high', 'High'), ('disruptive', 'Disruptive')]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='innovation_ideas')
    title = models.CharField(max_length=300)
    description = models.TextField()
    problem_statement = models.TextField(blank=True)
    proposed_solution = models.TextField(blank=True)
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='idea')
    impact_potential = models.CharField(max_length=15, choices=IMPACT_CHOICES, default='medium')
    tags = models.JSONField(default=list, blank=True)
    attachments = models.JSONField(default=list, blank=True)
    votes = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'innovation_ideas'
        ordering = ['-created_at']

    def __str__(self):
        return self.title


class ExecutiveLearning(models.Model):
    TYPE_CHOICES = [
        ('book', 'Book'), ('course', 'Course'), ('seminar', 'Seminar'),
        ('podcast', 'Podcast'), ('article', 'Article'), ('mentoring', 'Mentoring'),
        ('workshop', 'Workshop'), ('other', 'Other'),
    ]
    STATUS_CHOICES = [('planned', 'Planned'), ('in_progress', 'In Progress'), ('completed', 'Completed')]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='executive_learning')
    title = models.CharField(max_length=300)
    author_or_provider = models.CharField(max_length=200, blank=True)
    learning_type = models.CharField(max_length=15, choices=TYPE_CHOICES, default='book')
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='planned')
    key_takeaways = models.TextField(blank=True)
    rating = models.PositiveSmallIntegerField(null=True, blank=True)  # 1–5
    date_completed = models.DateField(null=True, blank=True)
    time_invested_hours = models.DecimalField(max_digits=6, decimal_places=1, null=True, blank=True)
    tags = models.JSONField(default=list, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'executive_learning'
        ordering = ['-created_at']

    def __str__(self):
        return self.title
