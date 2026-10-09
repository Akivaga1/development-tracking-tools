from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FinancialAccountViewSet, TransactionViewSet, BudgetViewSet, FinancialGoalViewSet

app_name = 'finance'

router = DefaultRouter()
router.register('accounts',     FinancialAccountViewSet, basename='financial-account')
router.register('transactions', TransactionViewSet,       basename='transaction')
router.register('budgets',      BudgetViewSet,            basename='budget')
router.register('goals',        FinancialGoalViewSet,     basename='financial-goal')

urlpatterns = [path('', include(router.urls))]
