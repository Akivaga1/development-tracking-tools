from rest_framework import viewsets, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Sum, Count
from django_filters.rest_framework import DjangoFilterBackend

from .models import FinancialAccount, Transaction, Budget, FinancialGoal
from .serializers import FinancialAccountSerializer, TransactionSerializer, BudgetSerializer, FinancialGoalSerializer


class UserOwnedMixin:
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class FinancialAccountViewSet(UserOwnedMixin, viewsets.ModelViewSet):
    queryset = FinancialAccount.objects.all()
    serializer_class = FinancialAccountSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['account_type', 'currency', 'is_active']
    search_fields = ['name', 'institution']


class TransactionViewSet(UserOwnedMixin, viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['transaction_type', 'category', 'account', 'is_recurring']
    search_fields = ['description', 'reference']
    ordering_fields = ['date', 'amount']

    @action(detail=False, methods=['get'], url_path='summary')
    def summary(self, request):
        """GET /api/v1/finance/transactions/summary/ — income vs expense totals."""
        qs = self.get_queryset()
        income = qs.filter(transaction_type='income').aggregate(total=Sum('amount'))['total'] or 0
        expense = qs.filter(transaction_type='expense').aggregate(total=Sum('amount'))['total'] or 0
        by_category = list(
            qs.values('category').annotate(total=Sum('amount'), count=Count('id')).order_by('-total')
        )
        return Response({
            'total_income': float(income),
            'total_expense': float(expense),
            'net': float(income) - float(expense),
            'by_category': by_category,
        })


class BudgetViewSet(UserOwnedMixin, viewsets.ModelViewSet):
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category', 'period', 'month', 'year']


class FinancialGoalViewSet(UserOwnedMixin, viewsets.ModelViewSet):
    queryset = FinancialGoal.objects.all()
    serializer_class = FinancialGoalSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['currency', 'is_achieved']
    search_fields = ['title']
    ordering_fields = ['deadline', 'target_amount']
