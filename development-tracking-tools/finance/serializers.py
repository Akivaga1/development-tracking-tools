from rest_framework import serializers
from .models import FinancialAccount, Transaction, Budget, FinancialGoal


class FinancialAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinancialAccount
        fields = '__all__'
        read_only_fields = ['id', 'user', 'created_at', 'updated_at']


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'
        read_only_fields = ['id', 'user', 'created_at', 'updated_at']


class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget
        fields = '__all__'
        read_only_fields = ['id', 'user', 'created_at', 'updated_at']


class FinancialGoalSerializer(serializers.ModelSerializer):
    progress_percentage = serializers.ReadOnlyField()

    class Meta:
        model = FinancialGoal
        fields = '__all__'
        read_only_fields = ['id', 'user', 'created_at', 'updated_at']
