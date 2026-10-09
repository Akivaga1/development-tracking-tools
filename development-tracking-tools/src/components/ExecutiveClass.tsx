import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Users, 
  Target, 
  BarChart3, 
  FileText, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  AlertCircle,
  Crown,
  Building,
  Gavel,
  Calendar,
  MessageSquare,
  Vote,
  Download
} from 'lucide-react';
import { useAccessibility } from '@/hooks/useAccessibility';

interface ExecutiveClassProps {
  onBack: () => void;
}

const executiveModules = [
  {
    id: 'board-governance',
    title: 'Board Governance',
    description: 'Meeting management, decision tracking, and board member coordination',
    icon: Gavel,
    gradient: 'bg-gradient-primary',
    stats: {
      label: 'Active Boards',
      value: '3',
      trend: 'stable' as const
    }
  },
  {
    id: 'strategic-planning',
    title: 'Strategic Planning',
    description: 'Long-term goal setting, KPI tracking, and strategic initiative management',
    icon: Target,
    gradient: 'bg-gradient-hero',
    stats: {
      label: 'Strategic Goals',
      value: '8/12',
      trend: 'up' as const
    }
  },
  {
    id: 'parastatal-management',
    title: 'Parastatal Management',
    description: 'Oversight tools for government agencies and public sector organizations',
    icon: Building,
    gradient: 'bg-gradient-wellness',
    stats: {
      label: 'Organizations',
      value: '5 active',
      trend: 'up' as const
    }
  },
  {
    id: 'executive-reporting',
    title: 'Executive Reporting',
    description: 'Comprehensive reporting and analytics for leadership decision-making',
    icon: BarChart3,
    gradient: 'bg-gradient-growth',
    stats: {
      label: 'Reports',
      value: '12 monthly',
      trend: 'stable' as const
    }
  }
];

const executiveStats = [
  {
    title: 'Strategic Completion',
    value: '73%',
    description: 'Goals on track',
    icon: Target,
    color: 'text-primary'
  },
  {
    title: 'Board Decisions',
    value: '24',
    description: 'This quarter',
    icon: Vote,
    color: 'text-secondary-accent'
  },
  {
    title: 'Stakeholder Engagement',
    value: '92%',
    description: 'Satisfaction rate',
    icon: Users,
    color: 'text-accent-bright'
  },
  {
    title: 'Compliance Score',
    value: '98%',
    description: 'Regulatory adherence',
    icon: CheckCircle,
    color: 'text-green-500'
  }
];

const recentDecisions = [
  {
    id: '1',
    title: 'Budget Allocation for Q2 2025',
    status: 'approved',
    priority: 'high',
    date: '2025-01-10',
    followUp: '2025-01-25'
  },
  {
    id: '2',
    title: 'Strategic Partnership with Tech Consortium',
    status: 'pending',
    priority: 'medium',
    date: '2025-01-08',
    followUp: '2025-01-22'
  },
  {
    id: '3',
    title: 'Digital Transformation Initiative',
    status: 'in-progress',
    priority: 'high',
    date: '2025-01-05',
    followUp: '2025-02-01'
  }
];

const upcomingMeetings = [
  {
    id: '1',
    title: 'Board of Directors Meeting',
    date: '2025-01-20',
    time: '09:00 AM',
    attendees: 8,
    type: 'board'
  },
  {
    id: '2',
    title: 'Strategic Planning Session',
    date: '2025-01-22',
    time: '02:00 PM',
    attendees: 12,
    type: 'planning'
  },
  {
    id: '3',
    title: 'Stakeholder Review',
    date: '2025-01-25',
    time: '10:30 AM',
    attendees: 15,
    type: 'review'
  }
];

export function ExecutiveClass({ onBack }: ExecutiveClassProps) {
  const { announceToScreenReader } = useAccessibility();
  const [activeTab, setActiveTab] = useState('overview');

  const [activeModule, setActiveModule] = useState<string | null>(null);

  const handleModuleClick = (moduleId: string) => {
    announceToScreenReader(`Navigating to ${moduleId} module`);
    setActiveModule(moduleId);
    console.log(`Navigate to ${moduleId}`);
  };

  const handleBackToMain = () => {
    setActiveModule(null);
  };

  // Render specific module based on activeModule
  if (activeModule === 'board-governance') {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={handleBackToMain}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Executive Class
              </Button>
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Gavel className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                  Board Governance
                </h1>
                <p className="text-sm text-muted-foreground">
                  Meeting management and board member coordination
                </p>
              </div>
            </div>
          </div>
        </header>
        <main className="container mx-auto px-6 py-8">
          <div className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Board Members</CardTitle>
                <CardDescription>Active board composition and roles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Chairperson - Dr. Jane Smith', 'Vice Chair - Prof. Michael Johnson', 'Treasurer - Sarah Williams', 'Secretary - David Brown', 'Member - Dr. Lisa Anderson'].map((member, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                      <span className="font-medium text-foreground">{member}</span>
                      <Badge variant="outline">Active</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Meeting Schedule</CardTitle>
                <CardDescription>Upcoming board meetings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { title: 'Regular Board Meeting', date: '2025-02-05', time: '10:00 AM' },
                    { title: 'Finance Committee', date: '2025-02-12', time: '2:00 PM' },
                    { title: 'Strategic Planning Session', date: '2025-02-20', time: '9:00 AM' }
                  ].map((meeting, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">{meeting.title}</p>
                        <p className="text-sm text-muted-foreground">{meeting.date} at {meeting.time}</p>
                      </div>
                      <Button variant="outline" size="sm">View Agenda</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  if (activeModule === 'strategic-planning') {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={handleBackToMain}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Executive Class
              </Button>
              <div className="w-10 h-10 rounded-lg bg-gradient-hero flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                  Strategic Planning
                </h1>
                <p className="text-sm text-muted-foreground">
                  Long-term goal setting and strategic initiative management
                </p>
              </div>
            </div>
          </div>
        </header>
        <main className="container mx-auto px-6 py-8">
          <div className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Strategic Goals Progress</CardTitle>
                <CardDescription>Annual strategic objectives tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    { goal: 'Digital Transformation Initiative', progress: 65, target: '2025-12-31' },
                    { goal: 'Market Expansion - East Region', progress: 45, target: '2025-09-30' },
                    { goal: 'Sustainability Program Launch', progress: 80, target: '2025-06-30' },
                    { goal: 'Employee Development Program', progress: 55, target: '2025-11-30' }
                  ].map((item, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-foreground">{item.goal}</span>
                        <Badge variant="outline">Target: {item.target}</Badge>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Progress value={item.progress} className="flex-1 h-3" />
                        <span className="text-sm font-medium text-foreground w-12">{item.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>Key Initiatives</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {['AI Integration Project', 'Customer Success Platform', 'Supply Chain Optimization', 'Talent Acquisition Drive'].map((initiative, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                        <span className="text-sm text-foreground">{initiative}</span>
                        <CheckCircle className="w-4 h-4 text-secondary-accent" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>Resource Allocation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { department: 'Technology', budget: '$2.5M' },
                      { department: 'Operations', budget: '$1.8M' },
                      { department: 'Marketing', budget: '$1.2M' },
                      { department: 'HR', budget: '$0.9M' }
                    ].map((dept, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <span className="text-sm font-medium text-foreground">{dept.department}</span>
                        <span className="text-sm text-muted-foreground">{dept.budget}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (activeModule === 'parastatal-management') {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={handleBackToMain}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Executive Class
              </Button>
              <div className="w-10 h-10 rounded-lg bg-gradient-wellness flex items-center justify-center">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                  Parastatal Management
                </h1>
                <p className="text-sm text-muted-foreground">
                  Oversight for government agencies and public sector organizations
                </p>
              </div>
            </div>
          </div>
        </header>
        <main className="container mx-auto px-6 py-8">
          <div className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Active Organizations</CardTitle>
                <CardDescription>Public sector entities under oversight</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'National Infrastructure Agency', status: 'Compliant', performance: 88 },
                    { name: 'Public Health Services Board', status: 'Under Review', performance: 75 },
                    { name: 'Education Development Council', status: 'Compliant', performance: 92 },
                    { name: 'Environmental Protection Agency', status: 'Compliant', performance: 85 },
                    { name: 'Transport Regulatory Authority', status: 'Action Required', performance: 68 }
                  ].map((org, idx) => (
                    <div key={idx} className="p-4 border border-border/50 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-foreground">{org.name}</h4>
                        <Badge variant={org.status === 'Compliant' ? 'default' : org.status === 'Under Review' ? 'secondary' : 'destructive'}>
                          {org.status}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Performance Score</span>
                          <span className="font-medium text-foreground">{org.performance}%</span>
                        </div>
                        <Progress value={org.performance} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-base">Compliance Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">82%</div>
                  <p className="text-sm text-muted-foreground">Meeting standards</p>
                </CardContent>
              </Card>
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-base">Budget Utilization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">$48.2M</div>
                  <p className="text-sm text-muted-foreground">of $52M allocated</p>
                </CardContent>
              </Card>
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-base">Pending Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">7</div>
                  <p className="text-sm text-muted-foreground">Quarterly assessments</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (activeModule === 'executive-reporting') {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={handleBackToMain}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Executive Class
              </Button>
              <div className="w-10 h-10 rounded-lg bg-gradient-growth flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                  Executive Reporting
                </h1>
                <p className="text-sm text-muted-foreground">
                  Comprehensive reporting and analytics for leadership
                </p>
              </div>
            </div>
          </div>
        </header>
        <main className="container mx-auto px-6 py-8">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>Monthly Executive Summary</CardTitle>
                  <CardDescription>January 2025 Performance Overview</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm text-foreground">Revenue Growth</span>
                      <span className="font-semibold text-green-500">+18.5%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm text-foreground">Operational Efficiency</span>
                      <span className="font-semibold text-secondary-accent">94.2%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm text-foreground">Employee Satisfaction</span>
                      <span className="font-semibold text-accent-bright">4.6/5.0</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm text-foreground">Strategic Goals Met</span>
                      <span className="font-semibold text-foreground">8/12</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>Available Reports</CardTitle>
                  <CardDescription>Generate and download executive reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      'Quarterly Financial Report',
                      'Board Meeting Minutes',
                      'Strategic Initiative Status',
                      'Stakeholder Analysis',
                      'Risk Assessment Summary',
                      'Compliance Report'
                    ].map((report, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-foreground">{report}</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Key Performance Indicators</CardTitle>
                <CardDescription>Real-time executive KPI dashboard</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Market Share', value: '32.4%', trend: 'up' },
                    { label: 'Customer Retention', value: '89.2%', trend: 'up' },
                    { label: 'Net Promoter Score', value: '68', trend: 'stable' },
                    { label: 'ROI', value: '24.8%', trend: 'up' }
                  ].map((kpi, idx) => (
                    <div key={idx} className="p-4 bg-muted/30 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground mb-1">{kpi.label}</p>
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-2xl font-bold text-foreground">{kpi.value}</span>
                        {kpi.trend === 'up' && <TrendingUp className="w-5 h-5 text-secondary-accent" />}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-500';
      case 'pending': return 'text-yellow-500';
      case 'in-progress': return 'text-blue-500';
      default: return 'text-muted-foreground';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': return <Badge variant="destructive">High</Badge>;
      case 'medium': return <Badge variant="secondary">Medium</Badge>;
      case 'low': return <Badge variant="outline">Low</Badge>;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onBack}
                aria-label="Return to Elective Leadership Suite"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Leadership Suite
              </Button>
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                  Executive Class
                </h1>
                <p className="text-sm text-muted-foreground">
                  Strategic leadership and governance tools
                </p>
              </div>
            </div>
            <Badge variant="default" className="bg-violet-800 text-white">
              Executive
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8" tabIndex={-1}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList 
            className="grid w-full grid-cols-4 mb-8"
            role="tablist"
            aria-label="Executive dashboard sections"
          >
            <TabsTrigger value="overview" className="flex items-center">
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="decisions" className="flex items-center">
              <Vote className="w-4 h-4 mr-2" />
              Decisions
            </TabsTrigger>
            <TabsTrigger value="meetings" className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Meetings
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Executive Stats */}
            <section aria-labelledby="stats-heading">
              <h2 id="stats-heading" className="text-lg font-semibold mb-4 text-foreground">
                Executive Dashboard
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {executiveStats.map((stat, index) => (
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
            </section>

            {/* Executive Modules */}
            <section aria-labelledby="modules-heading">
              <h3 id="modules-heading" className="text-lg font-semibold mb-4 text-foreground">
                Executive Tools
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {executiveModules.map((module) => (
                  <Card 
                    key={module.id} 
                    className="cursor-pointer transition-all duration-300 hover:shadow-strong transform hover:scale-105 border-border/50"
                    onClick={() => handleModuleClick(module.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleModuleClick(module.id);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`${module.title}: ${module.description}`}
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
            </section>
          </TabsContent>

          <TabsContent value="decisions" className="space-y-6">
            <section aria-labelledby="decisions-heading">
              <h2 id="decisions-heading" className="text-lg font-semibold mb-4 text-foreground">
                Decision Tracking & Follow-up
              </h2>
              <div className="space-y-4">
                {recentDecisions.map((decision) => (
                  <Card key={decision.id} className="border-border/50">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground mb-2">{decision.title}</h4>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>Date: {decision.date}</span>
                            <span>Follow-up: {decision.followUp}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getPriorityBadge(decision.priority)}
                          <Badge 
                            variant="outline" 
                            className={getStatusColor(decision.status)}
                          >
                            {decision.status}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </TabsContent>

          <TabsContent value="meetings" className="space-y-6">
            <section aria-labelledby="meetings-heading">
              <h2 id="meetings-heading" className="text-lg font-semibold mb-4 text-foreground">
                Upcoming Meetings & Approvals
              </h2>
              <div className="space-y-4">
                {upcomingMeetings.map((meeting) => (
                  <Card key={meeting.id} className="border-border/50">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">{meeting.title}</h4>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span>{meeting.date} at {meeting.time}</span>
                              <span>{meeting.attendees} attendees</span>
                            </div>
                          </div>
                        </div>
                        <Badge variant="secondary" className="capitalize">
                          {meeting.type}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <section aria-labelledby="reports-heading">
              <h2 id="reports-heading" className="text-lg font-semibold mb-4 text-foreground">
                Executive Reports & Analytics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2" />
                      Performance Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Strategic Goals</span>
                          <span>73%</span>
                        </div>
                        <Progress value={73} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Operational Efficiency</span>
                          <span>85%</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Stakeholder Satisfaction</span>
                          <span>92%</span>
                        </div>
                        <Progress value={92} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      Recent Reports
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Q4 Performance Review</span>
                        <Badge variant="outline">Ready</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Board Meeting Minutes</span>
                        <Badge variant="outline">Draft</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Strategic Plan Update</span>
                        <Badge variant="outline">In Progress</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}