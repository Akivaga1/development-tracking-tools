import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Target, TrendingUp, Calendar, CheckCircle2, Clock, AlertCircle, Plus } from 'lucide-react';

interface BusinessGoalsTrackerProps {
  onBack: () => void;
}

const goals = [
  {
    id: 1,
    title: 'Increase Monthly Revenue by 25%',
    description: 'Grow MRR from $260K to $325K through new client acquisition',
    category: 'Revenue',
    progress: 76,
    target: '$325,000',
    current: '$247,000',
    deadline: '2024-06-30',
    status: 'on-track',
    priority: 'high'
  },
  {
    id: 2,
    title: 'Expand Customer Base to 300 Active Clients',
    description: 'Strategic outreach and marketing campaigns',
    category: 'Growth',
    progress: 82,
    target: '300',
    current: '247',
    deadline: '2024-05-31',
    status: 'on-track',
    priority: 'high'
  },
  {
    id: 3,
    title: 'Reduce Customer Churn to Below 5%',
    description: 'Improve retention through enhanced customer success',
    category: 'Retention',
    progress: 45,
    target: '< 5%',
    current: '7.2%',
    deadline: '2024-08-31',
    status: 'at-risk',
    priority: 'medium'
  },
  {
    id: 4,
    title: 'Launch 3 New Product Features',
    description: 'Complete development and deployment of premium features',
    category: 'Product',
    progress: 67,
    target: '3 features',
    current: '2 completed',
    deadline: '2024-07-15',
    status: 'on-track',
    priority: 'high'
  },
  {
    id: 5,
    title: 'Achieve 95% Customer Satisfaction Score',
    description: 'Improve support and product quality',
    category: 'Customer Success',
    progress: 89,
    target: '95%',
    current: '92%',
    deadline: '2024-06-30',
    status: 'on-track',
    priority: 'medium'
  },
  {
    id: 6,
    title: 'Optimize Operational Costs by 15%',
    description: 'Streamline processes and reduce unnecessary expenses',
    category: 'Operations',
    progress: 34,
    target: '15% reduction',
    current: '5.1% saved',
    deadline: '2024-09-30',
    status: 'behind',
    priority: 'medium'
  }
];

const milestones = [
  { date: 'Q1 2024', title: 'Achieved $250K MRR', status: 'completed', icon: CheckCircle2, color: 'text-green-500' },
  { date: 'Q2 2024', title: 'Launch Premium Tier', status: 'in-progress', icon: Clock, color: 'text-blue-500' },
  { date: 'Q3 2024', title: 'Expand to European Market', status: 'upcoming', icon: AlertCircle, color: 'text-orange-500' },
  { date: 'Q4 2024', title: 'Reach 500 Enterprise Clients', status: 'upcoming', icon: AlertCircle, color: 'text-orange-500' }
];

const performanceMetrics = [
  { label: 'Goals Completed', value: '18/24', percentage: 75, color: 'bg-green-500' },
  { label: 'On Track', value: '14', percentage: 58, color: 'bg-blue-500' },
  { label: 'At Risk', value: '4', percentage: 17, color: 'bg-yellow-500' },
  { label: 'Behind Schedule', value: '2', percentage: 8, color: 'bg-red-500' }
];

export function BusinessGoalsTracker({ onBack }: BusinessGoalsTrackerProps) {
  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; className: string }> = {
      'on-track': { label: 'On Track', className: 'bg-green-600 text-white' },
      'at-risk': { label: 'At Risk', className: 'bg-yellow-600 text-white' },
      'behind': { label: 'Behind', className: 'bg-red-600 text-white' }
    };
    const variant = variants[status] || variants['on-track'];
    return <Badge className={variant.className}>{variant.label}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, string> = {
      'high': 'border-red-500 text-red-600',
      'medium': 'border-yellow-500 text-yellow-600',
      'low': 'border-blue-500 text-blue-600'
    };
    return <Badge variant="outline" className={variants[priority]}>{priority}</Badge>;
  };

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
              <div className="w-10 h-10 rounded-lg bg-gradient-hero flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                  Business Goals & Performance Tracker
                </h1>
                <p className="text-sm text-muted-foreground">SMART goals and strategic performance tracking</p>
              </div>
            </div>
            <Button className="bg-gradient-hero text-white">
              <Plus className="w-4 h-4 mr-2" />
              New Goal
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {performanceMetrics.map((metric) => (
            <Card key={metric.label} className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">{metric.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground mb-2">{metric.value}</div>
                <Progress value={metric.percentage} className="h-2" />
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="goals" className="space-y-6">
          <TabsList>
            <TabsTrigger value="goals">Active Goals</TabsTrigger>
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Active Goals View */}
          <TabsContent value="goals" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {goals.map((goal) => (
                <Card key={goal.id} className="border-border/50 hover:shadow-medium transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-bold text-foreground">{goal.title}</h3>
                          {getStatusBadge(goal.status)}
                          {getPriorityBadge(goal.priority)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">{goal.description}</p>
                        <div className="flex items-center space-x-6 text-sm">
                          <div className="flex items-center space-x-2">
                            <Target className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Target: <strong className="text-foreground">{goal.target}</strong></span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <TrendingUp className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Current: <strong className="text-foreground">{goal.current}</strong></span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Due: <strong className="text-foreground">{goal.deadline}</strong></span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-bold text-foreground">{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} className="h-3" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Milestones View */}
          <TabsContent value="milestones" className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Strategic Milestones</CardTitle>
                <CardDescription>Key achievements and upcoming targets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {milestones.map((milestone, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        milestone.status === 'completed' ? 'bg-green-500/20' :
                        milestone.status === 'in-progress' ? 'bg-blue-500/20' : 'bg-orange-500/20'
                      }`}>
                        <milestone.icon className={`w-5 h-5 ${milestone.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-foreground">{milestone.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {milestone.date}
                          </Badge>
                        </div>
                        <Badge className={
                          milestone.status === 'completed' ? 'bg-green-600 text-white' :
                          milestone.status === 'in-progress' ? 'bg-blue-600 text-white' : 'bg-orange-600 text-white'
                        }>
                          {milestone.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics View */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>Goal Completion Rate</CardTitle>
                  <CardDescription>Overall performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-foreground mb-2">75%</div>
                  <p className="text-sm text-muted-foreground mb-4">18 out of 24 goals completed</p>
                  <Progress value={75} className="h-3" />
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>Average Time to Complete</CardTitle>
                  <CardDescription>Goal completion efficiency</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-foreground mb-2">87 days</div>
                  <p className="text-sm text-green-500">12% faster than previous quarter</p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Category Performance</CardTitle>
                <CardDescription>Goal achievement by business area</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Revenue', 'Growth', 'Retention', 'Product', 'Operations'].map((category, index) => {
                    const value = [85, 78, 92, 67, 73][index];
                    return (
                      <div key={category}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-foreground">{category}</span>
                          <span className="text-sm font-bold text-foreground">{value}%</span>
                        </div>
                        <Progress value={value} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
