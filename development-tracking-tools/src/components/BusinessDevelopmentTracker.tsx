import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, TrendingUp, Users, Package, DollarSign, Target, Brain, BarChart3, Activity } from 'lucide-react';
import { CRMModule } from './CRMModule';
import { FinanceTracker } from './FinanceTracker';
import { BusinessGoalsTracker } from './BusinessGoalsTracker';
import { InventoryManagement } from './InventoryManagement';

interface BusinessDevelopmentTrackerProps {
  onBack: () => void;
}

type ActiveView = 'dashboard' | 'crm' | 'finance' | 'goals' | 'inventory';

const businessModules = [
  {
    id: 'crm',
    title: 'CRM',
    description: 'Customer relationship management and pipeline tracking',
    icon: Users,
    gradient: 'bg-gradient-primary',
    stats: { label: 'Active Clients', value: '247', trend: 'up' }
  },
  {
    id: 'inventory',
    title: 'Inventory Management',
    description: 'Track and manage products, stock, and suppliers',
    icon: Package,
    gradient: 'bg-gradient-primary',
    stats: { label: 'Total Items', value: '2,847', trend: 'up' }
  },
  {
    id: 'finance',
    title: 'Finance & Sales',
    description: 'Income, expenses, and profit analytics',
    icon: DollarSign,
    gradient: 'bg-gradient-growth',
    stats: { label: 'Monthly Revenue', value: '$84.2K', trend: 'up' }
  },
  {
    id: 'goals',
    title: 'Business Goals',
    description: 'SMART goals and performance tracking',
    icon: Target,
    gradient: 'bg-gradient-hero',
    stats: { label: 'Goals Met', value: '18/24', trend: 'stable' }
  }
];

const kpiCards = [
  { title: 'Total Revenue', value: '$324.8K', change: '+12.5%', icon: DollarSign, color: 'text-green-500' },
  { title: 'Active Clients', value: '247', change: '+8.2%', icon: Users, color: 'text-blue-500' },
  { title: 'Conversion Rate', value: '34.2%', change: '+2.1%', icon: TrendingUp, color: 'text-purple-500' },
  { title: 'Growth Rate', value: '18.7%', change: '+3.4%', icon: Activity, color: 'text-orange-500' }
];

const aiInsights = [
  { type: 'success', message: 'Top performing product: Premium Package (+45% sales this month)', icon: Package },
  { type: 'warning', message: '12 clients haven\'t engaged in 30+ days - consider re-engagement campaign', icon: Users },
  { type: 'info', message: 'Predicted Q4 growth: 23% based on current trajectory', icon: TrendingUp },
  { type: 'success', message: 'Inventory optimization saved $3.2K this month', icon: Brain }
];

export function BusinessDevelopmentTracker({ onBack }: BusinessDevelopmentTrackerProps) {
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');

  if (activeView === 'crm') {
    return <CRMModule onBack={() => setActiveView('dashboard')} />;
  }
  if (activeView === 'inventory') {
    return <InventoryManagement onBack={() => setActiveView('dashboard')} />;
  }
  if (activeView === 'finance') {
    return <FinanceTracker onBack={() => setActiveView('dashboard')} />;
  }
  if (activeView === 'goals') {
    return <BusinessGoalsTracker onBack={() => setActiveView('dashboard')} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Organizational Tools
              </Button>
              <div className="w-10 h-10 rounded-lg bg-gradient-growth flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-growth bg-clip-text text-transparent">
                  Business Development Tracker
                </h1>
                <p className="text-sm text-muted-foreground">Comprehensive business growth & performance management</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-600 text-white">Active</Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* KPI Overview */}
        <div className="mb-8 animate-fade-in">
          <h2 className="text-lg font-semibold mb-4 text-foreground">Business Performance KPIs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpiCards.map((kpi) => (
              <Card key={kpi.title} className="border-border/50">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
                    <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{kpi.value}</div>
                  <p className="text-xs text-green-500 mt-1">{kpi.change} from last month</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Business Modules */}
        <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-lg font-semibold mb-4 text-foreground">Business Development Modules</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businessModules.map((module) => (
              <Card 
                key={module.id}
                className="cursor-pointer transition-all duration-300 hover:shadow-strong transform hover:scale-105 border-border/50"
                onClick={() => setActiveView(module.id as ActiveView)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 ${module.gradient} rounded-lg flex items-center justify-center shadow-medium`}>
                        <module.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-foreground">{module.title}</CardTitle>
                        <Badge variant="default" className="text-xs mt-1 rounded-sm bg-green-600 text-white">
                          Active
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground mb-3">
                    {module.description}
                  </CardDescription>
                  <div className="flex items-center justify-between pt-2 border-t border-border/50">
                    <span className="text-sm text-muted-foreground">{module.stats.label}</span>
                    <div className="flex items-center space-x-1">
                      <span className="font-medium text-foreground">{module.stats.value}</span>
                      {module.stats.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* AI-Powered Insights */}
        <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center">
            <Brain className="w-5 h-5 mr-2 text-primary" />
            AI-Powered Business Insights
          </h3>
          <Card className="border-border/50">
            <CardContent className="p-6">
              <div className="space-y-4">
                {aiInsights.map((insight, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors">
                    <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <insight.icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{insight.message}</p>
                      <Badge variant="outline" className="text-xs mt-2">
                        {insight.type === 'success' ? 'Opportunity' : insight.type === 'warning' ? 'Action Required' : 'Insight'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
