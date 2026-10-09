"""
Campaign & Political Strategy models.
"""
import uuid
from django.db import models
from django.conf import settings


class Campaign(models.Model):
    TYPE_CHOICES = [
        ('political', 'Political'), ('marketing', 'Marketing'),
        ('awareness', 'Awareness'), ('fundraising', 'Fundraising'), ('other', 'Other'),
    ]
    STATUS_CHOICES = [
        ('planning', 'Planning'), ('active', 'Active'),
        ('paused', 'Paused'), ('completed', 'Completed'), ('cancelled', 'Cancelled'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='campaigns')
    title = models.CharField(max_length=300)
    description = models.TextField(blank=True)
    campaign_type = models.CharField(max_length=15, choices=TYPE_CHOICES, default='political')
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='planning')
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    budget = models.DecimalField(max_digits=15, decimal_places=2, null=True, blank=True)
    budget_spent = models.DecimalField(max_digits=15, decimal_places=2, default=0)
    target_audience = models.TextField(blank=True)
    key_messages = models.JSONField(default=list, blank=True)
    goals = models.JSONField(default=list, blank=True)
    metrics = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'campaigns'
        ordering = ['-created_at']

    def __str__(self):
        return self.title


class CampaignActivity(models.Model):
    ACTIVITY_CHOICES = [
        ('event', 'Event'), ('meeting', 'Meeting'), ('canvassing', 'Canvassing'),
        ('social_media', 'Social Media'), ('press', 'Press Release'),
        ('fundraiser', 'Fundraiser'), ('ad', 'Advertisement'), ('other', 'Other'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE, related_name='activities')
    title = models.CharField(max_length=300)
    activity_type = models.CharField(max_length=20, choices=ACTIVITY_CHOICES, default='event')
    description = models.TextField(blank=True)
    date = models.DateTimeField()
    location = models.CharField(max_length=300, blank=True)
    cost = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    reach = models.PositiveIntegerField(default=0)
    engagement = models.PositiveIntegerField(default=0)
    outcome = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'campaign_activities'
        ordering = ['-date']

    def __str__(self):
        return f'{self.campaign.title} — {self.title}'


class PoliticalContact(models.Model):
    RELATIONSHIP_CHOICES = [
        ('supporter', 'Supporter'), ('donor', 'Donor'), ('volunteer', 'Volunteer'),
        ('opponent', 'Opponent'), ('neutral', 'Neutral'), ('media', 'Media'), ('official', 'Official'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='political_contacts')
    campaign = models.ForeignKey(Campaign, on_delete=models.SET_NULL, null=True, blank=True, related_name='contacts')
    name = models.CharField(max_length=200)
    relationship = models.CharField(max_length=15, choices=RELATIONSHIP_CHOICES, default='neutral')
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=30, blank=True)
    constituency = models.CharField(max_length=200, blank=True)
    influence_score = models.PositiveSmallIntegerField(default=1)  # 1–10
    notes = models.TextField(blank=True)
    last_contact = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'political_contacts'
        ordering = ['name']

    def __str__(self):
        return self.name
