import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Building2, Users, Monitor, BarChart3, TrendingUp, Calendar, Target, CheckCircle, AlertTriangle, Clock, DollarSign, Brain, Package } from 'lucide-react';
import { DTTRemote } from './DTTRemote';
import { TeamDashboards } from './TeamDashboards';
import { KPITracking } from './KPITracking';
import { SalesTracking } from './SalesTracking';
import { BurnoutTracking } from './BurnoutTracking';
import { BusinessDevelopmentTracker } from './BusinessDevelopmentTracker';
import { FootballManagement } from './FootballManagement';

interface OrganizationalToolsProps {
  onBack: () => void;
}

type ActiveView = 'main' | 'team-dashboards' | 'dtt-remote' | 'kpi-tracking' | 'sales-tracking' | 'burnout-tracking' | 'business-development' | 'football-management';

const organizationalModules = [
  {
    id: 'football-management',
    title: 'Football Management',
    description: 'Players, academy, club finances, match analysis and board reporting',
    icon: Target,
    gradient: 'bg-gradient-growth',
    stats: { label: 'Club Operations', value: '10 areas', trend: 'stable' as const }
  },
  {
    id: 'team-dashboards',
    title: 'Team Dashboards',
    description: 'Comprehensive team performance tracking and analytics',
    icon: BarChart3,
    gradient: 'bg-gradient-primary',
    stats: {
      label: 'Active Teams',
      value: '5',
      trend: 'up' as const
    }
  },
  {
    id: 'dtt-remote',
    title: 'DTT Remote',
    description: 'Remote team management and collaboration tools',
    icon: Monitor,
    gradient: 'bg-gradient-hero',
    stats: {
      label: 'Remote Teams',
      value: '4 active',
      trend: 'stable' as const
    }
  },
  {
    id: 'kpi-tracking',
    title: 'KPI Tracking',
    description: 'Key performance indicators and organizational metrics',
    icon: Target,
    gradient: 'bg-gradient-growth',
    stats: {
      label: 'KPIs',
      value: '12 tracked',
      trend: 'up' as const
    }
  },
  {
    id: 'sales-tracking',
    title: 'Sales Tracking',
    description: 'Monitor sales performance and revenue metrics',
    icon: DollarSign,
    gradient: 'bg-gradient-growth',
    stats: {
      label: 'Sales Revenue',
      value: '$420K',
      trend: 'up' as const
    }
  },
  {
    id: 'burnout-tracking',
    title: 'Burnout Tracking',
    description: 'Monitor employee wellness and prevent burnout',
    icon: Brain,
    gradient: 'bg-gradient-wellness',
    stats: {
      label: 'Wellness Score',
      value: '81/100',
      trend: 'stable' as const
    }
  },
  {
    id: 'business-development',
    title: 'Business Development Tracker',
    description: 'Comprehensive business growth and performance management',
    icon: TrendingUp,
    gradient: 'bg-gradient-growth',
    stats: {
      label: 'Revenue Growth',
      value: '+18.7%',
      trend: 'up' as const
    }
  }
];

const organizationalStats = [
  {
    title: 'Team Health Score',
    value: '87%',
    description: 'Overall satisfaction',
    icon: Users,
    color: 'text-secondary-accent'
  },
  {
    title: 'Project Completion',
    value: '92%',
    description: 'On-time delivery',
    icon: CheckCircle,
    color: 'text-accent-bright'
  },
  {
    title: 'Resource Utilization',
    value: '78%',
    description: 'Optimal efficiency',
    icon: TrendingUp,
    color: 'text-primary'
  }
];

const recentAlerts = [
  {
    type: 'warning',
    message: 'Team Alpha productivity dropped 10% this week',
    time: '2 hours ago',
    icon: AlertTriangle,
    color: 'text-yellow-500'
  },
  {
    type: 'success',
    message: 'Remote team Beta exceeded quarterly goals',
    time: '1 day ago',
    icon: CheckCircle,
    color: 'text-green-500'
  },
  {
    type: 'info',
    message: 'Monthly team review meetings scheduled',
    time: '2 days ago',
    icon: Calendar,
    color: 'text-blue-500'
  }
];

export function OrganizationalTools({ onBack }: OrganizationalToolsProps) {
  const [activeView, setActiveView] = useState<ActiveView>('main');

  const handleModuleClick = (moduleId: string) => {
    setActiveView(moduleId as ActiveView);
  };

  const handleBackToMain = () => {
    setActiveView('main');
  };

  // Render specific component based on active view
  if (activeView === 'football-management') {
    return <FootballManagement onBack={handleBackToMain} />;
  }
  if (activeView === 'team-dashboards') {
    return <TeamDashboards onBack={handleBackToMain} />;
  }
  if (activeView === 'dtt-remote') {
    return <DTTRemote onBack={handleBackToMain} />;
  }
  if (activeView === 'kpi-tracking') {
    return <KPITracking onBack={handleBackToMain} />;
  }
  if (activeView === 'sales-tracking') {
    return <SalesTracking onBack={handleBackToMain} />;
  }
  if (activeView === 'burnout-tracking') {
    return <BurnoutTracking onBack={handleBackToMain} />;
  }
  if (activeView === 'business-development') {
    return <BusinessDevelopmentTracker onBack={handleBackToMain} />;
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
                Back to Dashboard
              </Button>
              <div className="w-10 h-10 rounded-lg bg-gradient-hero flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                  Organizational Tools
                </h1>
                <p className="text-sm text-muted-foreground">Team management and organizational health</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-violet-800 text-white">Enterprise</Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Organizational Stats */}
        <div className="mb-8 animate-fade-in">
          <h2 className="text-lg font-semibold mb-4 text-foreground">Organizational Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {organizationalStats.map((stat, index) => (
              <Card key={stat.title} className="border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base text-foreground flex items-center">
                    <stat.icon className={`w-5 h-5 mr-2 ${stat.color}`} />
                    {stat.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <p className="text-sm text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Management Tools */}
        <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-lg font-semibold mb-4 text-foreground">Management Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {organizationalModules.map((module) => (
              <Card 
                key={module.id} 
                className="cursor-pointer transition-all duration-300 hover:shadow-strong transform hover:scale-105 border-border/50"
                onClick={() => handleModuleClick(module.id)}
                role="button"
                tabIndex={0}
                aria-label={`Open ${module.title}`}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    handleModuleClick(module.id);
                  }
                }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 ${module.gradient} rounded-lg flex items-center justify-center shadow-medium`}>
                        <module.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-foreground">{module.title}</CardTitle>
                        <Badge variant="default" className="text-xs mt-1 rounded-sm bg-violet-800 text-white">
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
                      {module.stats.trend === 'up' && <TrendingUp className="w-4 h-4 text-secondary-accent" />}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Alerts & Updates */}
        <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-lg font-semibold mb-4 text-foreground">Recent Alerts & Updates</h3>
          <Card className="border-border/50">
            <CardContent className="p-6">
              <div className="space-y-4">
                {recentAlerts.map((alert, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center`}>
                      <alert.icon className={`w-4 h-4 ${alert.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{alert.message}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">{alert.time}</p>
                      </div>
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