import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, TrendingUp, Lightbulb, BookOpen, Target, Award, BarChart3, Clock, CheckCircle, Star, Users } from 'lucide-react';

interface CareerDevelopmentProps {
  onBack: () => void;
  onNavigate?: (view: string) => void;
}

const careerModules = [
  {
    id: 'skill-tracking',
    title: 'Skill Development',
    description: 'Track and develop professional skills with personalized learning paths',
    icon: BookOpen,
    gradient: 'bg-gradient-primary',
    stats: {
      label: 'Skills in Progress',
      value: '8',
      trend: 'up' as const
    }
  },
  {
    id: 'innovation-tracker',
    title: 'Innovation Tracker',
    description: 'Manage ideas, track innovation projects, and measure creative impact',
    icon: Lightbulb,
    gradient: 'bg-gradient-growth',
    stats: {
      label: 'Active Ideas',
      value: '23 tracked',
      trend: 'up' as const
    }
  },
  {
    id: 'goal-management',
    title: 'Career Goals',
    description: 'Set, track, and achieve professional development milestones',
    icon: Target,
    gradient: 'bg-gradient-hero',
    stats: {
      label: 'Goals',
      value: '5 active',
      trend: 'stable' as const
    }
  }
];

const careerStats = [
  {
    title: 'Skill Progress',
    value: '75%',
    description: 'Overall advancement',
    icon: TrendingUp,
    color: 'text-secondary-accent'
  },
  {
    title: 'Certifications',
    value: '3',
    description: 'Completed this year',
    icon: Award,
    color: 'text-accent-bright'
  },
  {
    title: 'Innovation Score',
    value: '8.4/10',
    description: 'Creative impact rating',
    icon: Star,
    color: 'text-primary'
  }
];

const recentAchievements = [
  {
    title: 'JavaScript Advanced Certification',
    description: 'Completed advanced JavaScript course with 95% score',
    time: '2 days ago',
    icon: Award,
    color: 'text-yellow-500'
  },
  {
    title: 'Innovation Project Approved',
    description: 'Mobile app optimization idea selected for development',
    time: '1 week ago',
    icon: Lightbulb,
    color: 'text-blue-500'
  },
  {
    title: 'Leadership Workshop',
    description: 'Completed team leadership development program',
    time: '2 weeks ago',
    icon: Users,
    color: 'text-green-500'
  }
];

export function CareerDevelopment({ onBack, onNavigate }: CareerDevelopmentProps) {
  const handleModuleClick = (moduleId: string) => {
    if (onNavigate) {
      switch (moduleId) {
        case 'innovation-tracker':
          onNavigate('innovation-tracker');
          break;
        case 'skill-tracking':
          onNavigate('skill-development');
          break;
        case 'goal-management':
          onNavigate('career-goals');
          break;
      }
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
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                  Career Development
                </h1>
                <p className="text-sm text-muted-foreground">Professional growth and skill development</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  window.print();
                }}
                className="text-xs border-primary/40 text-primary"
              >
                <Award className="w-3.5 h-3.5 mr-1.5" />
                Export Achievements (PDF)
              </Button>
              <Badge variant="secondary" className="bg-primary text-white">Pro Tier</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Career Stats */}
        <div className="mb-8 animate-fade-in">
          <h2 className="text-lg font-semibold mb-4 text-foreground">Professional Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {careerStats.map((stat, index) => (
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

        {/* Development Modules */}
        <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-lg font-semibold mb-4 text-foreground">Development Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {careerModules.map((module) => (
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

        {/* Recent Achievements */}
        <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Recent Achievements & Certifications</h3>
            <span className="text-xs text-muted-foreground">Synchronized with LinkedIn & Portfolio</span>
          </div>
          <Card className="border-border/50 shadow-soft">
            <CardContent className="p-6">
              <div className="space-y-4">
                {recentAchievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center`}>
                      <achievement.icon className={`w-4 h-4 ${achievement.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{achievement.title}</p>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">{achievement.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Professional Journaling Prompts */}
        <div className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <h3 className="text-lg font-semibold mb-4 text-foreground">Professional & Innovation Journal Prompts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-border/50 p-4 bg-secondary/30">
              <strong className="text-sm text-foreground block mb-1">Career Vector Reflection</strong>
              <p className="text-xs text-muted-foreground leading-relaxed">
                "What capability did I leverage most effectively this week, and what high-value skill requires deliberate practice in the next quarter?"
              </p>
            </Card>
            <Card className="border-border/50 p-4 bg-secondary/30">
              <strong className="text-sm text-foreground block mb-1">Innovation Pipeline Trigger</strong>
              <p className="text-xs text-muted-foreground leading-relaxed">
                "What repetitive friction point in our workflow could be eliminated or automated through a creative systemic solution?"
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}