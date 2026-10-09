import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, DollarSign, TrendingUp, TrendingDown, Calendar, Download, PieChart, BarChart3 } from 'lucide-react';

interface FinanceTrackerProps {
  onBack: () => void;
}

const financialSummary = {
  totalRevenue: '$324,850',
  totalExpenses: '$187,420',
  netProfit: '$137,430',
  profitMargin: '42.3%'
};

const recentTransactions = [
  { id: 1, type: 'income', description: 'Payment from Acme Corporation', amount: '$45,000', date: '2024-03-15', category: 'Sales' },
  { id: 2, type: 'expense', description: 'Office Supplies Purchase', amount: '$2,450', date: '2024-03-14', category: 'Operations' },
  { id: 3, type: 'income', description: 'Subscription Renewal - Enterprise Co', amount: '$12,800', date: '2024-03-13', category: 'Recurring' },
  { id: 4, type: 'expense', description: 'Marketing Campaign', amount: '$8,500', date: '2024-03-12', category: 'Marketing' },
  { id: 5, type: 'income', description: 'Consulting Services - TechStart Inc', amount: '$6,200', date: '2024-03-11', category: 'Services' }
];

const expenseCategories = [
  { name: 'Salaries', amount: '$85,000', percentage: 45, color: 'bg-blue-500' },
  { name: 'Operations', amount: '$42,500', percentage: 23, color: 'bg-purple-500' },
  { name: 'Marketing', amount: '$28,400', percentage: 15, color: 'bg-orange-500' },
  { name: 'Technology', amount: '$18,900', percentage: 10, color: 'bg-green-500' },
  { name: 'Other', amount: '$12,620', percentage: 7, color: 'bg-gray-500' }
];

const salesTrends = [
  { month: 'Jan', revenue: 245000, expenses: 165000 },
  { month: 'Feb', revenue: 278000, expenses: 172000 },
  { month: 'Mar', revenue: 324850, expenses: 187420 }
];

export function FinanceTracker({ onBack }: FinanceTrackerProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Business Development
              </Button>
              <div className="w-10 h-10 rounded-lg bg-gradient-growth flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-growth bg-clip-text text-transparent">
                  Finance & Sales Tracker
                </h1>
                <p className="text-sm text-muted-foreground">Income, expenses, and profit analytics</p>
              </div>
            </div>
            <Button className="bg-gradient-growth text-white">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Financial Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{financialSummary.totalRevenue}</div>
              <div className="flex items-center text-xs text-green-500 mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12.5% from last month
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{financialSummary.totalExpenses}</div>
              <div className="flex items-center text-xs text-red-500 mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +8.9% from last month
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Net Profit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{financialSummary.netProfit}</div>
              <div className="flex items-center text-xs text-green-500 mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +17.3% from last month
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Profit Margin</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{financialSummary.profitMargin}</div>
              <div className="flex items-center text-xs text-green-500 mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +2.1% from last month
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="transactions" className="space-y-6">
          <TabsList>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="expenses">Expense Breakdown</TabsTrigger>
            <TabsTrigger value="trends">Sales Trends</TabsTrigger>
          </TabsList>

          {/* Transactions View */}
          <TabsContent value="transactions" className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>All income and expense transactions</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    Filter Date
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 bg-accent/10 rounded-lg hover:bg-accent/20 transition-colors">
                      <div className="flex items-center space-x-4 flex-1">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.type === 'income' ? 'bg-green-500/20' : 'bg-red-500/20'
                        }`}>
                          {transaction.type === 'income' ? (
                            <TrendingUp className="w-5 h-5 text-green-500" />
                          ) : (
                            <TrendingDown className="w-5 h-5 text-red-500" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">{transaction.description}</h4>
                          <div className="flex items-center space-x-3 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {transaction.category}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{transaction.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className={`text-lg font-bold ${
                        transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'}{transaction.amount}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Expense Breakdown View */}
          <TabsContent value="expenses" className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Expense Breakdown by Category</CardTitle>
                <CardDescription>Monthly expense distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {expenseCategories.map((category) => (
                    <div key={category.name}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-foreground">{category.name}</span>
                        <span className="text-sm text-muted-foreground">{category.amount}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex-1 h-3 bg-accent/20 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${category.color} rounded-full transition-all duration-500`}
                            style={{ width: `${category.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-foreground w-12">{category.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sales Trends View */}
          <TabsContent value="trends" className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Revenue vs Expenses Trend</CardTitle>
                <CardDescription>3-month financial performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {salesTrends.map((trend) => (
                    <div key={trend.month} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-foreground">{trend.month} 2024</span>
                        <span className="text-sm text-muted-foreground">
                          Profit: ${(trend.revenue - trend.expenses).toLocaleString()}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-muted-foreground">Revenue</span>
                            <span className="font-medium text-green-600">${trend.revenue.toLocaleString()}</span>
                          </div>
                          <div className="h-2 bg-accent/20 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: '100%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-muted-foreground">Expenses</span>
                            <span className="font-medium text-red-600">${trend.expenses.toLocaleString()}</span>
                          </div>
                          <div className="h-2 bg-accent/20 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-red-500 rounded-full" 
                              style={{ width: `${(trend.expenses / trend.revenue) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
