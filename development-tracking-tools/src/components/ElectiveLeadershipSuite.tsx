import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Vote, Users, Target, TrendingUp, Calendar, BarChart3, MessageSquare, FileText, CheckCircle } from 'lucide-react';
import { CampaignTracker } from './CampaignTracker';

interface ElectiveLeadershipSuiteProps {
  onBack: () => void;
  onNavigate: (view: string) => void;
}

const leadershipModules = [
  {
    id: 'campaign-tracker',
    title: 'Campaign Tracker',
    description: 'Comprehensive campaign management and voter engagement tools',
    icon: Vote,
    gradient: 'bg-gradient-primary',
    stats: {
      label: 'Active Campaigns',
      value: '2',
      trend: 'up' as const
    }
  },
  {
    id: 'political-strategy',
    title: 'Political Strategy',
    description: 'Strategic planning and political analysis tools for effective leadership',
    icon: Target,
    gradient: 'bg-gradient-hero',
    stats: {
      label: 'Strategies',
      value: '5 active',
      trend: 'stable' as const
    }
  },
  {
    id: 'executive-class',
    title: 'Executive Class',
    description: 'Advanced governance tools for board members and parastatal leaders',
    icon: Users,
    gradient: 'bg-gradient-wellness',
    stats: {
      label: 'Governance Tools',
      value: '4 active',
      trend: 'up' as const
    }
  }
];

const quickStats = [
  {
    title: 'Public Engagement',
    value: '85%',
    description: 'Positive feedback',
    icon: Users,
    color: 'text-secondary-accent'
  },
  {
    title: 'Strategic Goals',
    value: '3/5',
    description: 'Completed this quarter',
    icon: CheckCircle,
    color: 'text-accent-bright'
  },
  {
    title: 'Community Reach',
    value: '12.5K',
    description: 'Active supporters',
    icon: BarChart3,
    color: 'text-primary'
  }
];

export function ElectiveLeadershipSuite({ onBack, onNavigate }: ElectiveLeadershipSuiteProps) {
  const [activeView, setActiveView] = useState<'main' | 'campaign-tracker'>('main');

  if (activeView === 'campaign-tracker') {
    return <CampaignTracker onBack={() => setActiveView('main')} />;
  }

  const handleModuleClick = (moduleId: string) => {
    if (moduleId === 'campaign-tracker') {
      setActiveView('campaign-tracker');
    } else if (moduleId === 'political-strategy') {
      onNavigate('political-strategy');
    } else if (moduleId === 'executive-class') {
      onNavigate('executive-class');
    }
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
                Back to Dashboard
              </Button>
              <div className="w-10 h-10 rounded-lg bg-gradient-wellness flex items-center justify-center">
                <Vote className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                  Elective Leadership Suite
                </h1>
                <p className="text-sm text-muted-foreground">Strategic leadership and public engagement tools</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-violet-800 text-white">Civic</Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Quick Stats */}
        <div className="mb-8 animate-fade-in">
          <h2 className="text-lg font-semibold mb-4 text-foreground">Leadership Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickStats.map((stat, index) => (
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

        {/* Leadership Modules */}
        <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-lg font-semibold mb-4 text-foreground">Leadership Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {leadershipModules.map((module) => (
              <Card 
                key={module.id} 
                className="cursor-pointer transition-all duration-300 hover:shadow-strong transform hover:scale-105 border-border/50"
                onClick={() => handleModuleClick(module.id)}
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

        {/* Recent Activity */}
        <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-lg font-semibold mb-4 text-foreground">Recent Activity</h3>
          <Card className="border-border/50">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Community forum engagement increased by 15%</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-hero rounded-full flex items-center justify-center">
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Strategic plan Q1 review completed</p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-wellness rounded-full flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Town hall meeting scheduled for next week</p>
                    <p className="text-xs text-muted-foreground">3 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}