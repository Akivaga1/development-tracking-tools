"""
Organizational Tools models — CRM, Sales, Business Dev, Inventory, Teams.
"""
import uuid
from django.db import models
from django.conf import settings


# ─── CRM ─────────────────────────────────────────────────────────────────────

class Contact(models.Model):
    STAGE_CHOICES = [
        ('lead', 'Lead'), ('prospect', 'Prospect'), ('qualified', 'Qualified'),
        ('customer', 'Customer'), ('churned', 'Churned'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='crm_contacts')
    name = models.CharField(max_length=200)
    company = models.CharField(max_length=200, blank=True)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=30, blank=True)
    stage = models.CharField(max_length=15, choices=STAGE_CHOICES, default='lead')
    value = models.DecimalField(max_digits=15, decimal_places=2, null=True, blank=True)
    tags = models.JSONField(default=list, blank=True)
    notes = models.TextField(blank=True)
    last_contacted = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'crm_contacts'
        ordering = ['name']

    def __str__(self):
        return self.name


class Deal(models.Model):
    STAGE_CHOICES = [
        ('prospecting', 'Prospecting'), ('qualification', 'Qualification'),
        ('proposal', 'Proposal'), ('negotiation', 'Negotiation'),
        ('closed_won', 'Closed Won'), ('closed_lost', 'Closed Lost'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='deals')
    contact = models.ForeignKey(Contact, on_delete=models.SET_NULL, null=True, blank=True, related_name='deals')
    title = models.CharField(max_length=300)
    value = models.DecimalField(max_digits=15, decimal_places=2, default=0)
    stage = models.CharField(max_length=20, choices=STAGE_CHOICES, default='prospecting')
    probability = models.PositiveSmallIntegerField(default=0)  # 0–100 %
    expected_close = models.DateField(null=True, blank=True)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'deals'
        ordering = ['-created_at']

    def __str__(self):
        return self.title


# ─── Inventory ────────────────────────────────────────────────────────────────

class InventoryItem(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='inventory_items')
    name = models.CharField(max_length=200)
    sku = models.CharField(max_length=100, blank=True)
    category = models.CharField(max_length=100, blank=True)
    quantity = models.IntegerField(default=0)
    unit = models.CharField(max_length=30, blank=True)
    unit_cost = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    selling_price = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    reorder_point = models.IntegerField(default=0)
    supplier = models.CharField(max_length=200, blank=True)
    location = models.CharField(max_length=200, blank=True)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'inventory_items'
        ordering = ['category', 'name']

    def __str__(self):
        return f'{self.name} (qty: {self.quantity})'

    @property
    def is_low_stock(self):
        return self.quantity <= self.reorder_point

    @property
    def total_value(self):
        if self.unit_cost:
            return float(self.unit_cost) * self.quantity
        return 0


# ─── Teams ────────────────────────────────────────────────────────────────────

class Team(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='owned_teams')
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    department = models.CharField(max_length=100, blank=True)
    goals = models.JSONField(default=list, blank=True)
    metrics = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'teams'
        ordering = ['name']

    def __str__(self):
        return self.name


class TeamMember(models.Model):
    ROLE_CHOICES = [
        ('lead', 'Team Lead'), ('member', 'Member'),
        ('advisor', 'Advisor'), ('stakeholder', 'Stakeholder'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='members')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='team_memberships',
                              null=True, blank=True)
    name = models.CharField(max_length=200)  # For external members without accounts
    email = models.EmailField(blank=True)
    role = models.CharField(max_length=15, choices=ROLE_CHOICES, default='member')
    joined_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'team_members'
        ordering = ['role', 'name']

    def __str__(self):
        return f'{self.name} — {self.team.name}'


# ─── Business Goals ────────────────────────────────────────────────────────────

class BusinessGoal(models.Model):
    QUARTER_CHOICES = [(f'Q{i}', f'Q{i}') for i in range(1, 5)]
    STATUS_CHOICES = [
        ('on_track', 'On Track'), ('at_risk', 'At Risk'),
        ('behind', 'Behind'), ('completed', 'Completed'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='business_goals')
    title = models.CharField(max_length=300)
    description = models.TextField(blank=True)
    quarter = models.CharField(max_length=2, choices=QUARTER_CHOICES, blank=True)
    year = models.PositiveIntegerField(null=True, blank=True)
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='on_track')
    progress = models.PositiveIntegerField(default=0)
    key_results = models.JSONField(default=list, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'business_goals'
        ordering = ['year', 'quarter', 'title']

    def __str__(self):
        return self.title
