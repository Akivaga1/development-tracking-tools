import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Brain, Heart, AlertTriangle, Clock, Battery, Thermometer, Activity, TrendingUp, TrendingDown, Users, Calendar, Plus, Eye, BarChart3, LineChart } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface BurnoutTrackingProps {
  onBack: () => void;
}

const burnoutData = [
  {
    id: 1,
    employee: 'John Smith',
    department: 'Development',
    burnoutScore: 85,
    riskLevel: 'Low',
    workHours: 42,
    stressLevel: 3,
    satisfaction: 8,
    lastAssessment: '2025-01-15',
    trend: 'stable',
    recentActivities: ['Completed wellness survey', 'Attended team building event'],
    notes: 'Maintaining healthy work-life balance'
  },
  {
    id: 2,
    employee: 'Sarah Johnson',
    department: 'Design',
    burnoutScore: 72,
    riskLevel: 'Medium',
    workHours: 45,
    stressLevel: 6,
    satisfaction: 7,
    lastAssessment: '2025-01-14',
    trend: 'declining',
    recentActivities: ['Reported increased workload', 'Missed last wellness check-in'],
    notes: 'Monitor workload and schedule 1-on-1'
  },
  {
    id: 3,
    employee: 'Mike Chen',
    department: 'Sales',
    burnoutScore: 45,
    riskLevel: 'High',
    workHours: 52,
    stressLevel: 8,
    satisfaction: 4,
    lastAssessment: '2025-01-13',
    trend: 'declining',
    recentActivities: ['Working overtime frequently', 'Expressed dissatisfaction in survey'],
    notes: 'Urgent: Schedule intervention meeting'
  },
  {
    id: 4,
    employee: 'Lisa Garcia',
    department: 'Marketing',
    burnoutScore: 78,
    riskLevel: 'Low',
    workHours: 38,
    stressLevel: 4,
    satisfaction: 8,
    lastAssessment: '2025-01-12',
    trend: 'improving',
    recentActivities: ['Using flexible work arrangements', 'Positive feedback from team'],
    notes: 'Excellent work-life balance'
  },
  {
    id: 5,
    employee: 'David Wilson',
    department: 'Development',
    burnoutScore: 68,
    riskLevel: 'Medium',
    workHours: 46,
    stressLevel: 5,
    satisfaction: 6,
    lastAssessment: '2025-01-11',
    trend: 'stable',
    recentActivities: ['Participated in wellness workshop', 'Regular check-ins'],
    notes: 'Stable but requires monitoring'
  },
  {
    id: 6,
    employee: 'Emma Thompson',
    department: 'HR',
    burnoutScore: 82,
    riskLevel: 'Low',
    workHours: 40,
    stressLevel: 3,
    satisfaction: 9,
    lastAssessment: '2025-01-10',
    trend: 'improving',
    recentActivities: ['Implemented wellness initiatives', 'High satisfaction scores'],
    notes: 'Excellent wellness champion'
  },
  {
    id: 7,
    employee: 'James Brown',
    department: 'Sales',
    burnoutScore: 55,
    riskLevel: 'High',
    workHours: 50,
    stressLevel: 7,
    satisfaction: 5,
    lastAssessment: '2025-01-09',
    trend: 'declining',
    recentActivities: ['High stress indicators', 'Decreased productivity'],
    notes: 'Needs immediate support'
  },
  {
    id: 8,
    employee: 'Olivia Martinez',
    department: 'Design',
    burnoutScore: 75,
    riskLevel: 'Low',
    workHours: 41,
    stressLevel: 4,
    satisfaction: 7,
    lastAssessment: '2025-01-08',
    trend: 'stable',
    recentActivities: ['Regular breaks', 'Positive team dynamics'],
    notes: 'Good balance maintained'
  }
];

const wellnessMetrics = {
  averageBurnoutScore: 70,
  highRiskEmployees: 2,
  mediumRiskEmployees: 2,
  lowRiskEmployees: 4,
  averageWorkHours: 44,
  averageStressLevel: 5.0,
  averageSatisfaction: 6.8,
  totalEmployees: 8,
  improvingTrend: 2,
  decliningTrend: 3,
  stableTrend: 3
};

const interventionHistory = [
  {
    id: 1,
    employee: 'Mike Chen',
    date: '2025-01-10',
    type: 'One-on-One Meeting',
    outcome: 'Discussed workload, agreed to redistribute tasks',
    status: 'In Progress'
  },
  {
    id: 2,
    employee: 'Sarah Johnson',
    date: '2025-01-08',
    type: 'Wellness Workshop',
    outcome: 'Attended stress management session',
    status: 'Completed'
  },
  {
    id: 3,
    employee: 'James Brown',
    date: '2025-01-05',
    type: 'Workload Review',
    outcome: 'Identified excessive overtime, reducing hours',
    status: 'In Progress'
  }
];

const wellnessTrends = [
  { month: 'Aug', avgScore: 65, highRisk: 3 },
  { month: 'Sep', avgScore: 68, highRisk: 2 },
  { month: 'Oct', avgScore: 67, highRisk: 3 },
  { month: 'Nov', avgScore: 69, highRisk: 2 },
  { month: 'Dec', avgScore: 70, highRisk: 2 },
  { month: 'Jan', avgScore: 70, highRisk: 2 }
];

const getRiskBadge = (risk: string) => {
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

const getScoreColor = (score: number) => {
  if (score >= 75) return 'text-accent-bright';
  if (score >= 50) return 'text-secondary-accent';
  return 'text-destructive';
};

const departments = ['All', 'Development', 'Design', 'Sales', 'Marketing', 'HR'];

export function BurnoutTracking({ onBack }: BurnoutTrackingProps) {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('All');
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const filteredData = selectedDepartment === 'All' 
    ? burnoutData 
    : burnoutData.filter(emp => emp.department === selectedDepartment);

  const handleViewDetails = (employee: any) => {
    setSelectedEmployee(employee);
  };

  const handleAddIntervention = () => {
    toast({
      title: "Intervention Added",
      description: "New wellness intervention has been scheduled.",
    });
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'improving') return <TrendingUp className="w-4 h-4 text-accent-bright" />;
    if (trend === 'declining') return <TrendingDown className="w-4 h-4 text-destructive" />;
    return <Activity className="w-4 h-4 text-muted-foreground" />;
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
                Back to Organizational Tools
              </Button>
              <div className="w-10 h-10 rounded-lg bg-gradient-wellness flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-wellness bg-clip-text text-transparent">
                  Burnout Tracking
                </h1>
                <p className="text-sm text-muted-foreground">Monitor employee wellness and prevent burnout</p>
              </div>
            </div>
            <Badge className="bg-gradient-primary text-white">Wellness Monitor</Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="employees">Employees</TabsTrigger>
            <TabsTrigger value="interventions">Interventions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            {/* Wellness Overview Cards */}
            <div className="animate-fade-in">
              <h2 className="text-lg font-semibold mb-4 text-foreground">Wellness Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                  <Battery className="w-4 h-4 mr-2" />
                  Avg Burnout Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{wellnessMetrics.averageBurnoutScore}</div>
                <p className="text-xs text-muted-foreground mt-1">Out of 100 (wellness scale)</p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  High Risk
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-destructive">{wellnessMetrics.highRiskEmployees}</div>
                <p className="text-xs text-muted-foreground mt-1">Employees needing attention</p>
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
                <div className="text-3xl font-bold text-foreground">{wellnessMetrics.averageWorkHours}h</div>
                <p className="text-xs text-muted-foreground mt-1">Per week</p>
              </CardContent>
            </Card>

                <Card className="border-border/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                      <Heart className="w-4 h-4 mr-2" />
                      Satisfaction
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-foreground">{wellnessMetrics.averageSatisfaction}/10</div>
                    <p className="text-xs text-muted-foreground mt-1">Average rating</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Risk Distribution */}
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-lg font-semibold mb-4 text-foreground">Risk Distribution</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-foreground flex items-center">
                  <div className="w-3 h-3 bg-accent-bright rounded-full mr-2"></div>
                  Low Risk
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-accent-bright">{wellnessMetrics.lowRiskEmployees}</div>
                <p className="text-sm text-muted-foreground">Healthy work-life balance</p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-foreground flex items-center">
                  <div className="w-3 h-3 bg-secondary-accent rounded-full mr-2"></div>
                  Medium Risk
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-secondary-accent">{wellnessMetrics.mediumRiskEmployees}</div>
                <p className="text-sm text-muted-foreground">Monitor closely</p>
              </CardContent>
            </Card>

                <Card className="border-border/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold text-foreground flex items-center">
                      <div className="w-3 h-3 bg-destructive rounded-full mr-2"></div>
                      High Risk
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-destructive">{wellnessMetrics.highRiskEmployees}</div>
                    <p className="text-sm text-muted-foreground">Immediate intervention needed</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Trend Overview */}
            <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <h3 className="text-lg font-semibold mb-4 text-foreground">Wellness Trends</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-border/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold text-foreground flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-accent-bright" />
                      Improving
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-accent-bright">{wellnessMetrics.improvingTrend}</div>
                    <p className="text-sm text-muted-foreground">Employees showing improvement</p>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold text-foreground flex items-center">
                      <Activity className="w-5 h-5 mr-2 text-muted-foreground" />
                      Stable
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">{wellnessMetrics.stableTrend}</div>
                    <p className="text-sm text-muted-foreground">Maintaining current levels</p>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold text-foreground flex items-center">
                      <TrendingDown className="w-5 h-5 mr-2 text-destructive" />
                      Declining
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-destructive">{wellnessMetrics.decliningTrend}</div>
                    <p className="text-sm text-muted-foreground">Require attention</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Wellness Recommendations */}
            <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <h3 className="text-lg font-semibold mb-4 text-foreground">Wellness Recommendations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-border/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold text-foreground flex items-center">
                      <Activity className="w-5 h-5 mr-2 text-accent-bright" />
                      Immediate Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-foreground">• Schedule 1-on-1 with Mike Chen (high risk)</p>
                    <p className="text-sm text-foreground">• Schedule 1-on-1 with James Brown (high risk)</p>
                    <p className="text-sm text-foreground">• Review workload distribution for Sales team</p>
                    <p className="text-sm text-foreground">• Implement stress management workshops</p>
                    <p className="text-sm text-foreground">• Consider flexible work arrangements</p>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold text-foreground flex items-center">
                      <Heart className="w-5 h-5 mr-2 text-primary" />
                      Preventive Measures
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-foreground">• Regular wellness check-ins</p>
                    <p className="text-sm text-foreground">• Mental health support programs</p>
                    <p className="text-sm text-foreground">• Work-life balance initiatives</p>
                    <p className="text-sm text-foreground">• Team building activities</p>
                    <p className="text-sm text-foreground">• Anonymous feedback channels</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Employees Tab */}
          <TabsContent value="employees" className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Employee Wellness Details</h3>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Card className="border-border/50">
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Burnout Score</TableHead>
                      <TableHead>Risk Level</TableHead>
                      <TableHead>Trend</TableHead>
                      <TableHead>Work Hours</TableHead>
                      <TableHead>Stress</TableHead>
                      <TableHead>Satisfaction</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                              <span className="text-white text-xs font-medium">
                                {employee.employee.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <span>{employee.employee}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{employee.department}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <span className={`font-semibold ${getScoreColor(employee.burnoutScore)}`}>
                              {employee.burnoutScore}/100
                            </span>
                            <Progress value={employee.burnoutScore} className="h-1" />
                          </div>
                        </TableCell>
                        <TableCell>{getRiskBadge(employee.riskLevel)}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            {getTrendIcon(employee.trend)}
                            <span className="text-sm capitalize">{employee.trend}</span>
                          </div>
                        </TableCell>
                        <TableCell>{employee.workHours}h</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Thermometer className="w-4 h-4 text-muted-foreground" />
                            <span>{employee.stressLevel}/10</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Heart className="w-4 h-4 text-muted-foreground" />
                            <span>{employee.satisfaction}/10</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewDetails(employee)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Interventions Tab */}
          <TabsContent value="interventions" className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Wellness Interventions</h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-primary text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Intervention
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Schedule Wellness Intervention</DialogTitle>
                    <DialogDescription>
                      Create a new wellness intervention for an employee
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="employee">Employee</Label>
                      <Select>
                        <SelectTrigger id="employee">
                          <SelectValue placeholder="Select employee" />
                        </SelectTrigger>
                        <SelectContent>
                          {burnoutData.map((emp) => (
                            <SelectItem key={emp.id} value={emp.employee}>
                              {emp.employee}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="intervention-type">Intervention Type</Label>
                      <Select>
                        <SelectTrigger id="intervention-type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="one-on-one">One-on-One Meeting</SelectItem>
                          <SelectItem value="workshop">Wellness Workshop</SelectItem>
                          <SelectItem value="workload">Workload Review</SelectItem>
                          <SelectItem value="counseling">Counseling Session</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea
                        id="notes"
                        placeholder="Describe the intervention plan..."
                        rows={4}
                      />
                    </div>
                    <Button onClick={handleAddIntervention} className="w-full bg-gradient-primary text-white">
                      Schedule Intervention
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Card className="border-border/50">
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Outcome</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {interventionHistory.map((intervention) => (
                      <TableRow key={intervention.id}>
                        <TableCell className="font-medium">{intervention.employee}</TableCell>
                        <TableCell>{intervention.date}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{intervention.type}</Badge>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{intervention.outcome}</TableCell>
                        <TableCell>
                          <Badge className={intervention.status === 'Completed' ? 'bg-accent-bright text-primary' : 'bg-secondary-accent text-primary'}>
                            {intervention.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-base font-semibold text-foreground flex items-center">
                    <LineChart className="w-5 h-5 mr-2 text-primary" />
                    Wellness Trend (Last 6 Months)
                  </CardTitle>
                  <CardDescription>Average burnout score over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {wellnessTrends.map((trend, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">{trend.month}</span>
                        <div className="flex items-center space-x-4">
                          <div className="w-48">
                            <Progress value={trend.avgScore} className="h-2" />
                          </div>
                          <span className="text-sm font-semibold text-foreground w-12">{trend.avgScore}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-base font-semibold text-foreground flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-destructive" />
                    High Risk Trends
                  </CardTitle>
                  <CardDescription>High-risk employees over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {wellnessTrends.map((trend, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">{trend.month}</span>
                        <div className="flex items-center space-x-4">
                          <div className="w-48">
                            <Progress value={trend.highRisk * 25} className="h-2" />
                          </div>
                          <span className="text-sm font-semibold text-destructive w-12">{trend.highRisk}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Department Analysis */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base font-semibold text-foreground">Department Analysis</CardTitle>
                <CardDescription>Wellness metrics by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {departments.filter(d => d !== 'All').map((dept) => {
                    const deptData = burnoutData.filter(emp => emp.department === dept);
                    const avgScore = deptData.length > 0 
                      ? Math.round(deptData.reduce((sum, emp) => sum + emp.burnoutScore, 0) / deptData.length)
                      : 0;
                    const highRisk = deptData.filter(emp => emp.riskLevel === 'High').length;

                    return (
                      <div key={dept} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{dept}</Badge>
                            <span className="text-sm text-muted-foreground">
                              {deptData.length} employees
                            </span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span className="text-sm font-medium">Avg: {avgScore}/100</span>
                            {highRisk > 0 && (
                              <span className="text-sm text-destructive font-medium">
                                {highRisk} high risk
                              </span>
                            )}
                          </div>
                        </div>
                        <Progress value={avgScore} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Key Insights */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base font-semibold text-foreground flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-primary" />
                  Key Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-lg bg-accent/30 border border-border/50">
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">Sales Department Alert:</span> Highest concentration of high-risk employees (2 out of 2). Immediate review recommended.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-accent/30 border border-border/50">
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">Positive Trend:</span> Overall wellness score has improved by 7.7% over the past 6 months.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-accent/30 border border-border/50">
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">Work Hours:</span> Average work hours (44h/week) are slightly above recommended. Consider workload rebalancing.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Employee Details Dialog */}
        {selectedEmployee && (
          <Dialog open={!!selectedEmployee} onOpenChange={() => setSelectedEmployee(null)}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                    <span className="text-white font-medium">
                      {selectedEmployee.employee.split(' ').map((n: string) => n[0]).join('')}
                    </span>
                  </div>
                  <span>{selectedEmployee.employee}</span>
                </DialogTitle>
                <DialogDescription>
                  Detailed wellness profile and history
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Department</Label>
                    <Badge variant="outline">{selectedEmployee.department}</Badge>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Risk Level</Label>
                    {getRiskBadge(selectedEmployee.riskLevel)}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Burnout Score</Label>
                    <div className="space-y-1">
                      <span className={`text-2xl font-bold ${getScoreColor(selectedEmployee.burnoutScore)}`}>
                        {selectedEmployee.burnoutScore}/100
                      </span>
                      <Progress value={selectedEmployee.burnoutScore} className="h-2" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Trend</Label>
                    <div className="flex items-center space-x-2">
                      {getTrendIcon(selectedEmployee.trend)}
                      <span className="font-medium capitalize">{selectedEmployee.trend}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-muted-foreground">Work Hours</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{selectedEmployee.workHours}h</div>
                      <p className="text-xs text-muted-foreground">per week</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-muted-foreground">Stress Level</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{selectedEmployee.stressLevel}/10</div>
                      <Progress value={selectedEmployee.stressLevel * 10} className="h-1 mt-2" />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-muted-foreground">Satisfaction</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{selectedEmployee.satisfaction}/10</div>
                      <Progress value={selectedEmployee.satisfaction * 10} className="h-1 mt-2" />
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-2">
                  <Label>Recent Activities</Label>
                  <div className="space-y-2">
                    {selectedEmployee.recentActivities.map((activity: string, index: number) => (
                      <div key={index} className="flex items-start space-x-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                        <span className="text-foreground">{activity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Notes</Label>
                  <div className="p-3 rounded-lg bg-muted text-sm text-foreground">
                    {selectedEmployee.notes}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button className="flex-1 bg-gradient-primary text-white">
                    Schedule Intervention
                  </Button>
                  <Button variant="outline" className="flex-1">
                    View Full History
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}