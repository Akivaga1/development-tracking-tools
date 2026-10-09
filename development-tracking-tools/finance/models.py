"""
Finance Tracker models — transactions, budgets, accounts, expenses.
"""
import uuid
from django.db import models
from django.conf import settings


class FinancialAccount(models.Model):
    ACCOUNT_TYPE_CHOICES = [
        ('checking', 'Checking'), ('savings', 'Savings'),
        ('investment', 'Investment'), ('credit', 'Credit Card'),
        ('cash', 'Cash'), ('crypto', 'Crypto'), ('other', 'Other'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='financial_accounts')
    name = models.CharField(max_length=200)
    account_type = models.CharField(max_length=15, choices=ACCOUNT_TYPE_CHOICES, default='checking')
    balance = models.DecimalField(max_digits=15, decimal_places=2, default=0)
    currency = models.CharField(max_length=3, default='USD')
    institution = models.CharField(max_length=200, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'financial_accounts'
        ordering = ['name']

    def __str__(self):
        return f'{self.name} ({self.currency})'


class Transaction(models.Model):
    TYPE_CHOICES = [('income', 'Income'), ('expense', 'Expense'), ('transfer', 'Transfer')]
    CATEGORY_CHOICES = [
        ('salary', 'Salary'), ('freelance', 'Freelance'), ('investment', 'Investment Returns'),
        ('housing', 'Housing'), ('food', 'Food & Dining'), ('transport', 'Transport'),
        ('health', 'Health'), ('education', 'Education'), ('entertainment', 'Entertainment'),
        ('utilities', 'Utilities'), ('shopping', 'Shopping'), ('savings', 'Savings'),
        ('debt', 'Debt Payment'), ('tax', 'Tax'), ('other', 'Other'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='transactions')
    account = models.ForeignKey(FinancialAccount, on_delete=models.CASCADE, related_name='transactions',
                                 null=True, blank=True)
    transaction_type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='other')
    amount = models.DecimalField(max_digits=15, decimal_places=2)
    description = models.CharField(max_length=500, blank=True)
    date = models.DateField()
    reference = models.CharField(max_length=200, blank=True)
    tags = models.JSONField(default=list, blank=True)
    is_recurring = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'transactions'
        ordering = ['-date']

    def __str__(self):
        return f'{self.transaction_type.upper()} — {self.amount} on {self.date}'


class Budget(models.Model):
    PERIOD_CHOICES = [('weekly', 'Weekly'), ('monthly', 'Monthly'), ('yearly', 'Yearly')]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='budgets')
    category = models.CharField(max_length=20, choices=Transaction.CATEGORY_CHOICES)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    period = models.CharField(max_length=10, choices=PERIOD_CHOICES, default='monthly')
    month = models.PositiveSmallIntegerField(null=True, blank=True)  # 1–12
    year = models.PositiveIntegerField(null=True, blank=True)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'budgets'
        ordering = ['category']

    def __str__(self):
        return f'{self.category} — {self.amount} ({self.period})'


class FinancialGoal(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='financial_goals')
    title = models.CharField(max_length=300)
    target_amount = models.DecimalField(max_digits=15, decimal_places=2)
    current_amount = models.DecimalField(max_digits=15, decimal_places=2, default=0)
    currency = models.CharField(max_length=3, default='USD')
    deadline = models.DateField(null=True, blank=True)
    is_achieved = models.BooleanField(default=False)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'financial_goals'
        ordering = ['deadline']

    def __str__(self):
        return self.title

    @property
    def progress_percentage(self):
        if self.target_amount == 0:
            return 0
        return round((float(self.current_amount) / float(self.target_amount)) * 100, 1)
