from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    FinancialAccountViewSet,
    TransactionViewSet,
    BudgetViewSet,
    FinancialGoalViewSet,
    SubscriptionPlansView,
    StripeCheckoutView,
    MpesaStkPushView,
)

app_name = 'finance'

router = DefaultRouter()
router.register('accounts',     FinancialAccountViewSet, basename='financial-account')
router.register('transactions', TransactionViewSet,       basename='transaction')
router.register('budgets',      BudgetViewSet,            basename='budget')
router.register('goals',        FinancialGoalViewSet,     basename='financial-goal')

urlpatterns = [
    path('subscriptions/plans/', SubscriptionPlansView.as_view(), name='subscription-plans'),
    path('payments/stripe/checkout/', StripeCheckoutView.as_view(), name='stripe-checkout'),
    path('payments/mpesa/stkpush/', MpesaStkPushView.as_view(), name='mpesa-stkpush'),
    path('', include(router.urls)),
]

