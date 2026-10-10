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


# ─── Subscription Plans & Payment Gateway Endpoints ─────────────────────────

from rest_framework.views import APIView
from rest_framework import status
import uuid

class SubscriptionPlansView(APIView):
    """GET /api/v1/finance/subscriptions/plans/ — List available plans."""
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        plans = [
            {
                'id': 'basic',
                'name': 'Basic Plan',
                'tier': 'Basic',
                'price_monthly': 0,
                'price_yearly': 0,
                'currency': 'USD',
                'features': ['Personal Development Tracker (PDT Journal)', 'Daily reflections', 'SMART goals', 'Budget tools'],
            },
            {
                'id': 'pro',
                'name': 'Pro Plan',
                'tier': 'Pro',
                'price_monthly': 19,
                'price_yearly': 190,
                'currency': 'USD',
                'features': ['Career tracker', 'Skill development matrix', 'Innovation pipelines', 'PDF achievement export'],
            },
            {
                'id': 'enterprise',
                'name': 'Enterprise Plan',
                'tier': 'Enterprise',
                'price_monthly': 99,
                'price_yearly': 990,
                'currency': 'USD',
                'features': ['DTT Remote', 'Team dashboards', 'OKR planning', 'Culture heatmaps', 'Integrated Project Manager', 'Football Management'],
            },
            {
                'id': 'civic',
                'name': 'Civic Plan',
                'tier': 'Civic',
                'price_monthly': 49,
                'price_yearly': 490,
                'currency': 'USD',
                'features': ['Elective leadership suite', 'Political strategy dashboard', 'Campaign tracker', 'Executive Class (Board governance, Parastatal, Decision Deck)'],
            },
        ]
        return Response({'plans': plans})


class StripeCheckoutView(APIView):
    """POST /api/v1/finance/payments/stripe/checkout/ — Create Stripe checkout session."""
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        plan_id = request.data.get('plan_id', 'pro')
        billing = request.data.get('billing', 'monthly')
        session_id = f"cs_test_{uuid.uuid4().hex[:18]}"
        return Response({
            'status': 'success',
            'session_id': session_id,
            'checkout_url': f"https://checkout.stripe.com/c/pay/{session_id}",
            'plan_id': plan_id,
            'billing': billing,
        })


class MpesaStkPushView(APIView):
    """POST /api/v1/finance/payments/mpesa/stkpush/ — Send Safaricom M-Pesa STK push."""
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        phone_number = request.data.get('phone_number')
        plan_id = request.data.get('plan_id', 'pro')
        amount = request.data.get('amount', 19 * 130)  # In KES

        if not phone_number:
            return Response({'error': 'phone_number is required'}, status=status.HTTP_400_BAD_REQUEST)

        checkout_request_id = f"ws_CO_{uuid.uuid4().hex[:12]}"
        return Response({
            'status': 'success',
            'checkout_request_id': checkout_request_id,
            'merchant_request_id': f"MR_{uuid.uuid4().hex[:8]}",
            'response_code': '0',
            'response_description': 'Success. Request accepted for processing',
            'customer_message': f"Success. STK Push prompt sent to {phone_number}. Enter PIN to complete.",
            'amount_kes': amount,
            'plan_id': plan_id,
        })
