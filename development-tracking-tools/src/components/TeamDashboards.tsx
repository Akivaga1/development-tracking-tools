import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Users, TrendingUp, Target, Award, Clock, Brain, Heart, Activity } from 'lucide-react';

interface TeamDashboardsProps {
  onBack: () => void;
}

const teamData = [
  {
    id: 1,
    name: 'Development Team',
    members: 8,
    performance: 92,
    satisfaction: 87,
    burnoutRisk: 'Low',
    completedProjects: 12,
    avgWorkHours: 42,
    wellnessScore: 85
  },
  {
    id: 2,
    name: 'Marketing Team',
    members: 6,
    performance: 88,
    satisfaction: 91,
    burnoutRisk: 'Medium',
    completedProjects: 8,
    avgWorkHours: 38,
    wellnessScore: 78
  },
  {
    id: 3,
    name: 'Sales Team',
    members: 10,
    performance: 95,
    satisfaction: 83,
    burnoutRisk: 'High',
    completedProjects: 15,
    avgWorkHours: 45,
    wellnessScore: 72
  },
  {
    id: 4,
    name: 'Design Team',
    members: 5,
    performance: 89,
    satisfaction: 94,
    burnoutRisk: 'Low',
    completedProjects: 6,
    avgWorkHours: 40,
    wellnessScore: 88
  }
];

const teamMembers = [
  { name: 'John Smith', role: 'Lead Developer', performance: 94, satisfaction: 89, burnoutRisk: 'Low', team: 'Development Team' },
  { name: 'Sarah Johnson', role: 'UI/UX Designer', performance: 91, satisfaction: 95, burnoutRisk: 'Low', team: 'Design Team' },
  { name: 'Mike Chen', role: 'Sales Manager', performance: 97, satisfaction: 82, burnoutRisk: 'High', team: 'Sales Team' },
  { name: 'Lisa Garcia', role: 'Marketing Specialist', performance: 86, satisfaction: 88, burnoutRisk: 'Medium', team: 'Marketing Team' }
];

const getBurnoutBadge = (risk: string) => {
  switch (risk) {
    case 'Low':
      return <Badge className="bg-accent-bright text-primary">Low Risk</Badge>;
    case 'Medium':
      return <Badge className="bg-secondary-accent text-primary">Medium Risk</Badge>;
    case 'High':
      return <Badge className="bg-destructive text-destructive-foreground">High Risk</Badge>;
    default:
      return <Badge variant="secondary">{risk}</Badge>;
  }
};

export function TeamDashboards({ onBack }: TeamDashboardsProps) {
  const [selectedTeam, setSelectedTeam] = useState<string>('all');

  const filteredMembers = selectedTeam === 'all' 
    ? teamMembers 
    : teamMembers.filter(member => member.team === selectedTeam);

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
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Team Dashboards
                </h1>
                <p className="text-sm text-muted-foreground">Comprehensive team performance tracking and analytics</p>
              </div>
            </div>
            <Badge className="bg-gradient-growth text-primary">Analytics Active</Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Team Overview Cards */}
        <div className="mb-8 animate-fade-in">
          <h2 className="text-lg font-semibold mb-4 text-foreground">Team Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamData.map((team) => (
              <Card key={team.id} className="border-border/50 hover:shadow-medium transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold text-foreground flex items-center">
                    <Users className="w-5 h-5 mr-2 text-primary" />
                    {team.name}
                  </CardTitle>
                  <CardDescription>{team.members} members</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Performance</span>
                    <div className="flex items-center space-x-1">
                      <span className="font-medium text-foreground">{team.performance}%</span>
                      <TrendingUp className="w-4 h-4 text-accent-bright" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Satisfaction</span>
                    <span className="font-medium text-foreground">{team.satisfaction}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Burnout Risk</span>
                    {getBurnoutBadge(team.burnoutRisk)}
                  </div>
                  <div className="pt-2 border-t border-border/50">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Projects: {team.completedProjects}</span>
                      <span className="text-muted-foreground">Avg Hours: {team.avgWorkHours}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-lg font-semibold mb-4 text-foreground">Key Performance Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                  <Target className="w-4 h-4 mr-2" />
                  Overall Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">91%</div>
                <p className="text-xs text-muted-foreground mt-1">+5% from last quarter</p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                  <Heart className="w-4 h-4 mr-2" />
                  Team Satisfaction
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">89%</div>
                <p className="text-xs text-muted-foreground mt-1">+2% this month</p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Avg Work Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">41h</div>
                <p className="text-xs text-muted-foreground mt-1">Optimal range</p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                  <Brain className="w-4 h-4 mr-2" />
                  Wellness Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">81</div>
                <p className="text-xs text-muted-foreground mt-1">Good overall health</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Team Member Details */}
        <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Team Member Performance</h3>
            <Select value={selectedTeam} onValueChange={setSelectedTeam}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by team" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Teams</SelectItem>
                {teamData.map((team) => (
                  <SelectItem key={team.id} value={team.name}>{team.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Card className="border-border/50">
            <CardContent className="p-6">
              <div className="space-y-4">
                {filteredMembers.map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/30">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                        <span className="text-white font-medium text-sm">{member.name.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.role} • {member.team}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Performance</p>
                        <p className="font-medium text-foreground">{member.performance}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Satisfaction</p>
                        <p className="font-medium text-foreground">{member.satisfaction}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Burnout Risk</p>
                        {getBurnoutBadge(member.burnoutRisk)}
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