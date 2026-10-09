import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, TrendingUp, Lightbulb, Building2, Users, Target, Heart, BookOpen, BarChart3, Smile, CheckCircle2, Calendar, Plus, Vote, MonitorSpeaker, Brain } from 'lucide-react';
interface TrackerModule {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
  stats?: {
    label: string;
    value: string;
    trend?: 'up' | 'down' | 'stable';
  };
  isActive: boolean;
  tier: 'Basic' | 'Plus' | 'Pro' | 'Enterprise' | 'Organizational' | 'Civic';
}
const trackerModules: TrackerModule[] = [{
  id: 'pdt',
  title: 'Personal Development',
  description: 'Track mood, habits, and personal growth milestones',
  icon: User,
  gradient: 'bg-gradient-growth',
  stats: {
    label: 'Streak',
    value: '12 days',
    trend: 'up'
  },
  isActive: true,
  tier: 'Basic'
}, {
  id: 'cdt',
  title: 'Career Development',
  description: 'Professional growth, skill building, and innovation management',
  icon: TrendingUp,
  gradient: 'bg-gradient-primary',
  stats: {
    label: 'Skills & Ideas',
    value: '8 active, 23 tracked',
    trend: 'up'
  },
  isActive: true,
  tier: 'Plus'
}, {
  id: 'odt',
  title: 'Organizational Tools',
  description: 'Team dashboards, remote management, KPIs, and organizational health',
  icon: Building2,
  gradient: 'bg-gradient-hero',
  stats: {
    label: 'Teams',
    value: '5 active, 4 remote',
    trend: 'up'
  },
  isActive: true,
  tier: 'Enterprise'
}, {
  id: 'elective-leadership-suite',
  title: 'Elective Leadership Suite',
  description: 'Tools for leadership development, strategic planning, and public engagement—designed for leaders from all walks of life.',
  icon: Vote,
  gradient: 'bg-gradient-wellness',
  stats: {
    label: 'Civic',
    value: '2 active strategies',
    trend: 'stable'
  },
  isActive: true,
  tier: 'Civic'
}];
const quickActions = [
  {
    icon: Smile,
    label: 'Log Mood',
    action: 'mood',
    description: 'Track your daily emotional state',
    color: 'text-yellow-500'
  },
  {
    icon: Target,
    label: 'Add Goal',
    action: 'goal',
    description: 'Set a new personal or career goal',
    color: 'text-blue-500'
  },
  {
    icon: CheckCircle2,
    label: 'Complete Habit',
    action: 'habit',
    description: 'Mark a daily habit as done',
    color: 'text-green-500'
  },
  {
    icon: BookOpen,
    label: 'Journal Entry',
    action: 'journal',
    description: 'Write about your day',
    color: 'text-purple-500'
  },
  {
    icon: Brain,
    label: 'Innovation Idea',
    action: 'innovation',
    description: 'Capture a new idea or insight',
    color: 'text-orange-500'
  },
  {
    icon: Users,
    label: 'Team Check-in',
    action: 'team',
    description: 'Review team performance',
    color: 'text-indigo-500'
  },
  {
    icon: BarChart3,
    label: 'View Analytics',
    action: 'analytics',
    description: 'See your progress reports',
    color: 'text-emerald-500'
  },
  {
    icon: Calendar,
    label: 'Schedule Planning',
    action: 'schedule',
    description: 'Plan your upcoming tasks',
    color: 'text-rose-500'
  }
];
interface DTTDashboardProps {
  onNavigate?: (view: string) => void;
}
export function DTTDashboard({
  onNavigate
}: DTTDashboardProps) {
  const handleModuleClick = (moduleId: string) => {
    if (onNavigate) {
      onNavigate(moduleId);
    }
  };
  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'mood':
      case 'habit':
      case 'goal':
      case 'journal':
        if (onNavigate) {
          onNavigate('pdt');
        }
        break;
      case 'innovation':
        if (onNavigate) {
          onNavigate('innovation-tracker');
        }
        break;
      case 'team':
      case 'analytics':
        if (onNavigate) {
          onNavigate('odt');
        }
        break;
      case 'schedule':
        // Could integrate with calendar functionality
        console.log(`Executing quick action: ${action}`);
        break;
      default:
        console.log(`Executing quick action: ${action}`);
    }
  };
  return <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center p-1 py-0 my-0 mx-[15px] px-[4px] bg-zinc-100">
                <img src="/dt-tools-logo.png" alt="DT Tools Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                  DT Tools
                </h1>
                <p className="text-sm text-muted-foreground">Development Tracking Tools</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="secondary">Basic Plan</Badge>
              <Button variant="hero" size="sm">
                <Plus className="w-4 h-4 mr-1" />
                Upgrade
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h2 className="text-3xl font-semibold mb-2 text-foreground">Hello, Brian! 👋</h2>
          <p className="text-muted-foreground text-lg">
            Ready to continue your growth journey? Here's your development overview.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8 animate-slide-up">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {quickActions.map(action => (
              <Card 
                key={action.action} 
                className="cursor-pointer hover:shadow-medium transition-all duration-300 transform hover:scale-105 border-border/50 group" 
                onClick={() => handleQuickAction(action.action)}
              >
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 mx-auto mb-2 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <action.icon className={`w-6 h-6 ${action.color} group-hover:text-white transition-colors duration-300`} />
                  </div>
                  <p className="text-sm font-medium text-foreground mb-1">{action.label}</p>
                  <p className="text-xs text-muted-foreground leading-tight">{action.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tracker Modules */}
        <div className="mb-8 animate-slide-up" style={{
        animationDelay: '0.2s'
      }}>
          <h3 className="text-lg font-semibold mb-4 text-foreground">Development Trackers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trackerModules.map(module => <Card key={module.id} className={`cursor-pointer transition-all duration-300 hover:shadow-strong transform hover:scale-105 border-border/50 ${!module.isActive ? 'opacity-60' : ''}`} onClick={() => module.isActive && handleModuleClick(module.id)}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 ${module.gradient} rounded-lg flex items-center justify-center shadow-medium`}>
                        <module.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-foreground">{module.title}</CardTitle>
                        <Badge variant={module.isActive ? "default" : "secondary"} className="text-xs mt-1 rounded-sm bg-violet-800 text-white">
                          {module.tier}
                        </Badge>
                      </div>
                    </div>
                    {!module.isActive && <Button variant="outline" size="sm">
                        Unlock
                      </Button>}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground mb-3">
                    {module.description}
                  </CardDescription>
                  {module.stats && module.isActive && <div className="flex items-center justify-between pt-2 border-t border-border/50">
                      <span className="text-sm text-muted-foreground">{module.stats.label}</span>
                      <div className="flex items-center space-x-1">
                        <span className="font-medium text-foreground">{module.stats.value}</span>
                        {module.stats.trend === 'up' && <TrendingUp className="w-4 h-4 text-secondary-accent" />}
                      </div>
                    </div>}
                </CardContent>
              </Card>)}
          </div>
        </div>

        {/* Today's Summary */}
        <div className="animate-slide-up" style={{
        animationDelay: '0.4s'
      }}>
          <h3 className="text-lg font-semibold mb-4 text-foreground">Today's Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-foreground flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-secondary-accent" />
                  Wellness Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">8.2/10</div>
                <p className="text-sm text-muted-foreground">Above average</p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-foreground flex items-center">
                  <Target className="w-5 h-5 mr-2 text-accent-bright" />
                  Goals Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">67%</div>
                <p className="text-sm text-muted-foreground">3 of 5 completed</p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-foreground flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-primary" />
                  Active Streak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">12 days</div>
                <p className="text-sm text-muted-foreground">Personal best!</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>;
}