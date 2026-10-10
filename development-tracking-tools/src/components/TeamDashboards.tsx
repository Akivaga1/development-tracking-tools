import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  ArrowLeft,
  Users,
  TrendingUp,
  Target,
  Award,
  Clock,
  Brain,
  Heart,
  Activity,
  Layers,
  Sparkles,
  KeyRound,
  ShieldCheck,
  Plus,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TeamDashboardsProps {
  onBack: () => void;
}

const teamData = [
  {
    id: 1,
    name: 'Engineering & DevOps',
    members: 14,
    performance: 94,
    satisfaction: 88,
    burnoutRisk: 'Low',
    completedProjects: 18,
    avgWorkHours: 41,
    wellnessScore: 86,
  },
  {
    id: 2,
    name: 'Product & Design',
    members: 8,
    performance: 91,
    satisfaction: 93,
    burnoutRisk: 'Low',
    completedProjects: 11,
    avgWorkHours: 39,
    wellnessScore: 89,
  },
  {
    id: 3,
    name: 'Growth & Marketing',
    members: 10,
    performance: 89,
    satisfaction: 85,
    burnoutRisk: 'Medium',
    completedProjects: 14,
    avgWorkHours: 43,
    wellnessScore: 79,
  },
  {
    id: 4,
    name: 'Client Success & CRM',
    members: 9,
    performance: 96,
    satisfaction: 84,
    burnoutRisk: 'Medium',
    completedProjects: 22,
    avgWorkHours: 42,
    wellnessScore: 81,
  },
];

const teamMembers = [
  { name: 'Dr. Brian Akivaga', role: 'Chief Technical Lead', performance: 98, satisfaction: 94, burnoutRisk: 'Low', team: 'Engineering & DevOps' },
  { name: 'Sarah Chebet', role: 'Senior Product Designer', performance: 92, satisfaction: 95, burnoutRisk: 'Low', team: 'Product & Design' },
  { name: 'Tabitha Muthoni', role: 'Strategic Partnerships Lead', performance: 95, satisfaction: 88, burnoutRisk: 'Medium', team: 'Growth & Marketing' },
  { name: 'Stephanie Sella', role: 'Accounts & Client Retention', performance: 94, satisfaction: 86, burnoutRisk: 'Medium', team: 'Client Success & CRM' },
];

export function TeamDashboards({ onBack }: TeamDashboardsProps) {
  const { toast } = useToast();
  const [selectedTeam, setSelectedTeam] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('dashboards');

  // OKR Planning State
  const okrs = [
    {
      id: 'OKR-1',
      objective: 'Scale cross-platform real-time sync with <150ms latency',
      department: 'Engineering',
      quarter: 'Q4 2025',
      progress: 82,
      keyResults: [
        { kr: 'Deploy Django/PostgreSQL WebSocket cluster', status: 'Done', progress: 100 },
        { kr: 'Benchmark 10,000 concurrent mobile & web sessions', status: 'In Progress', progress: 75 },
        { kr: 'Zero data collision in offline delta sync tests', status: 'In Progress', progress: 70 },
      ],
    },
    {
      id: 'OKR-2',
      objective: 'Elevate team psychological safety & engagement health',
      department: 'People Operations / HR',
      quarter: 'Q4 2025',
      progress: 90,
      keyResults: [
        { kr: 'Achieve >85% satisfaction in monthly pulse surveys', status: 'Done', progress: 95 },
        { kr: 'Introduce 100% participation in 4-7-8 wellness breaks', status: 'Done', progress: 90 },
        { kr: 'Zero high-burnout alerts escalated past 48 hours', status: 'Done', progress: 85 },
      ],
    },
    {
      id: 'OKR-3',
      objective: 'Expand enterprise bulk licensing in emerging markets',
      department: 'Growth',
      quarter: 'Q4 2025',
      progress: 68,
      keyResults: [
        { kr: 'Sign 12 organizational pilots with M-Pesa & Stripe', status: 'In Progress', progress: 75 },
        { kr: 'Deliver customized team culture heatmaps to all leads', status: 'In Progress', progress: 60 },
      ],
    },
  ];

  // Culture Heatmap Matrix (Departments vs Cultural Dimensions)
  const cultureMatrix = [
    { department: 'Engineering & DevOps', psychSafety: 91, collaboration: 89, workLife: 82, goalAlignment: 94 },
    { department: 'Product & Design', psychSafety: 95, collaboration: 93, workLife: 88, goalAlignment: 92 },
    { department: 'Growth & Marketing', psychSafety: 84, collaboration: 87, workLife: 78, goalAlignment: 90 },
    { department: 'Client Success & CRM', psychSafety: 86, collaboration: 88, workLife: 80, goalAlignment: 95 },
  ];

  // Bulk Licensing State
  const licensing = {
    totalSeats: 150,
    allocatedSeats: 128,
    activeThisWeek: 122,
    renewalDate: 'Nov 30, 2026',
    engagementScore: '92% Active',
  };

  const getHeatmapColor = (score: number) => {
    if (score >= 90) return 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30';
    if (score >= 80) return 'bg-primary/20 text-primary border-primary/30';
    if (score >= 70) return 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30';
    return 'bg-rose-500/20 text-rose-700 dark:text-rose-300 border-rose-500/30';
  };

  const filteredMembers =
    selectedTeam === 'all' ? teamMembers : teamMembers.filter((m) => m.team === selectedTeam);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/60 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Organizational Tools
              </Button>
              <div className="w-10 h-10 rounded-lg bg-gradient-hero flex items-center justify-center text-white shadow-soft">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold font-heading text-foreground">
                  Team Dashboards & HR Suite
                </h1>
                <p className="text-sm text-muted-foreground">
                  Team velocity, OKR planning, culture heatmaps & bulk licensing for engagement tracking
                </p>
              </div>
            </div>
            <Badge className="bg-primary text-white">Enterprise HR</Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl mb-6">
            <TabsTrigger value="dashboards" className="flex items-center gap-1.5 text-xs">
              <Activity className="w-3.5 h-3.5" />
              Team Velocity
            </TabsTrigger>
            <TabsTrigger value="okrs" className="flex items-center gap-1.5 text-xs">
              <Target className="w-3.5 h-3.5" />
              OKR Planning
            </TabsTrigger>
            <TabsTrigger value="culture-heatmap" className="flex items-center gap-1.5 text-xs">
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              Culture Heatmap
            </TabsTrigger>
            <TabsTrigger value="bulk-licensing" className="flex items-center gap-1.5 text-xs">
              <KeyRound className="w-3.5 h-3.5" />
              Bulk Licensing
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: Dashboards & Performance */}
          <TabsContent value="dashboards" className="space-y-6">
            {/* Top Team Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="border-border/60 shadow-soft">
                <CardContent className="p-4">
                  <span className="text-xs text-muted-foreground">Overall Performance</span>
                  <div className="text-2xl font-bold text-foreground font-heading">92.4%</div>
                  <span className="text-xs text-emerald-600 font-medium">+3.2% vs last month</span>
                </CardContent>
              </Card>
              <Card className="border-border/60 shadow-soft">
                <CardContent className="p-4">
                  <span className="text-xs text-muted-foreground">Team Satisfaction</span>
                  <div className="text-2xl font-bold text-primary font-heading">88.5%</div>
                  <span className="text-xs text-primary font-medium">Top quartile benchmark</span>
                </CardContent>
              </Card>
              <Card className="border-border/60 shadow-soft">
                <CardContent className="p-4">
                  <span className="text-xs text-muted-foreground">Burnout Prevention</span>
                  <div className="text-2xl font-bold text-emerald-600 font-heading">84.8 / 100</div>
                  <span className="text-xs text-muted-foreground">Low composite risk</span>
                </CardContent>
              </Card>
              <Card className="border-border/60 shadow-soft">
                <CardContent className="p-4">
                  <span className="text-xs text-muted-foreground">Active Workstreams</span>
                  <div className="text-2xl font-bold text-foreground font-heading">65 Delivered</div>
                  <span className="text-xs text-muted-foreground">41 remote members</span>
                </CardContent>
              </Card>
            </div>

            {/* Department Breakdowns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teamData.map((team) => (
                <Card key={team.id} className="border-border/60 shadow-soft hover:shadow-medium transition-all">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base font-heading text-foreground">{team.name}</CardTitle>
                      <Badge variant="secondary" className="text-xs">{team.members} Members</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Performance Score</span>
                        <span className="font-semibold text-foreground">{team.performance}%</span>
                      </div>
                      <Progress value={team.performance} className="h-2" />
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border/40 text-center text-xs">
                      <div>
                        <span className="text-muted-foreground block text-[11px]">Satisfaction</span>
                        <span className="font-bold text-foreground">{team.satisfaction}%</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block text-[11px]">Wellness</span>
                        <span className="font-bold text-emerald-600">{team.wellnessScore}/100</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block text-[11px]">Burnout Risk</span>
                        <Badge
                          variant="outline"
                          className={`text-[10px] ${
                            team.burnoutRisk === 'Low'
                              ? 'border-emerald-500 text-emerald-600'
                              : 'border-amber-500 text-amber-600'
                          }`}
                        >
                          {team.burnoutRisk}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Team Members List */}
            <Card className="border-border/60 shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div>
                  <CardTitle className="text-base font-heading">Key Team Members & Leaders</CardTitle>
                  <CardDescription>Individual contribution and satisfaction telemetry</CardDescription>
                </div>
                <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                  <SelectTrigger className="w-48 text-xs">
                    <SelectValue placeholder="Filter Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="Engineering & DevOps">Engineering & DevOps</SelectItem>
                    <SelectItem value="Product & Design">Product & Design</SelectItem>
                    <SelectItem value="Growth & Marketing">Growth & Marketing</SelectItem>
                    <SelectItem value="Client Success & CRM">Client Success & CRM</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent>
                <div className="divide-y divide-border/40">
                  {filteredMembers.map((m, idx) => (
                    <div key={idx} className="py-3 flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs">
                          {m.name.charAt(0)}
                        </div>
                        <div>
                          <span className="font-bold text-foreground text-sm block">{m.name}</span>
                          <span className="text-xs text-muted-foreground">{m.role} • {m.team}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <span className="text-xs font-semibold text-foreground block">{m.performance}% Score</span>
                          <span className="text-[11px] text-muted-foreground">Sat: {m.satisfaction}%</span>
                        </div>
                        <Badge
                          variant="outline"
                          className={m.burnoutRisk === 'Low' ? 'border-emerald-500 text-emerald-600 text-xs' : 'border-amber-500 text-amber-600 text-xs'}
                        >
                          {m.burnoutRisk} Risk
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 2: OKR Planning */}
          <TabsContent value="okrs" className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-lg font-bold font-heading text-foreground">Objectives & Key Results (OKRs)</h3>
                <p className="text-sm text-muted-foreground">Quarterly strategic alignment across teams</p>
              </div>
              <Button size="sm" className="bg-primary hover:bg-primary-glow text-white">
                <Plus className="w-4 h-4 mr-1.5" /> Define New OKR
              </Button>
            </div>

            <div className="space-y-4">
              {okrs.map((okr) => (
                <Card key={okr.id} className="border-border/60 shadow-soft">
                  <CardContent className="p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs font-mono">{okr.id}</Badge>
                          <Badge className="bg-primary/10 text-primary border border-primary/20 text-xs">{okr.department}</Badge>
                          <span className="text-xs text-muted-foreground">{okr.quarter}</span>
                        </div>
                        <h4 className="font-bold text-base font-heading text-foreground mt-1">
                          {okr.objective}
                        </h4>
                      </div>
                      <div className="text-right">
                        <span className="text-xl font-bold text-primary font-heading">{okr.progress}%</span>
                        <span className="text-xs text-muted-foreground block">Overall Target</span>
                      </div>
                    </div>

                    <Progress value={okr.progress} className="h-2 mb-4" />

                    <div className="space-y-2 pt-3 border-t border-border/40">
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">Key Results:</span>
                      {okr.keyResults.map((kr, i) => (
                        <div key={i} className="flex items-center justify-between text-xs p-2 rounded-lg bg-secondary/30">
                          <span className="text-foreground flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                            {kr.kr}
                          </span>
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-muted-foreground">{kr.progress}%</span>
                            <Badge variant={kr.status === 'Done' ? 'default' : 'secondary'} className="text-[10px]">
                              {kr.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* TAB 3: Culture Heatmap */}
          <TabsContent value="culture-heatmap" className="space-y-6">
            <Card className="border-border/60 shadow-soft">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base font-heading">Departmental Culture Heatmap</CardTitle>
                    <CardDescription>
                      Empirical index of psychological safety, cross-functional collaboration, work-life balance, and goal clarity
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="border-emerald-500/30 text-emerald-600">
                    Healthy Culture Baseline
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/60 text-xs text-muted-foreground">
                        <th className="text-left py-3 px-4 font-semibold">Department</th>
                        <th className="text-center py-3 px-4 font-semibold">Psychological Safety</th>
                        <th className="text-center py-3 px-4 font-semibold">Collaboration Index</th>
                        <th className="text-center py-3 px-4 font-semibold">Work-Life Harmony</th>
                        <th className="text-center py-3 px-4 font-semibold">Goal Alignment</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/40">
                      {cultureMatrix.map((row, i) => (
                        <tr key={i} className="hover:bg-secondary/20 transition-colors">
                          <td className="py-3 px-4 font-bold text-foreground">{row.department}</td>
                          <td className="py-3 px-4 text-center">
                            <span className={`inline-block px-3 py-1 rounded-lg border text-xs font-bold ${getHeatmapColor(row.psychSafety)}`}>
                              {row.psychSafety}%
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className={`inline-block px-3 py-1 rounded-lg border text-xs font-bold ${getHeatmapColor(row.collaboration)}`}>
                              {row.collaboration}%
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className={`inline-block px-3 py-1 rounded-lg border text-xs font-bold ${getHeatmapColor(row.workLife)}`}>
                              {row.workLife}%
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className={`inline-block px-3 py-1 rounded-lg border text-xs font-bold ${getHeatmapColor(row.goalAlignment)}`}>
                              {row.goalAlignment}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 mt-2 border-t border-border/40">
                  <span>Legend: 90%+ Optimal • 80-89% Regulated • 70-79% Needs Care • &lt;70% Critical Intervention</span>
                  <span>Evaluated via anonymous bi-weekly pulses</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 4: Bulk Licensing */}
          <TabsContent value="bulk-licensing" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-border/60 shadow-soft md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-base font-heading">Enterprise Seat & License Allocation</CardTitle>
                  <CardDescription>Multi-team license distribution and active engagement tracking</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-muted-foreground">Seats In Use</span>
                      <span className="font-bold text-foreground">
                        {licensing.allocatedSeats} / {licensing.totalSeats} ({Math.round((licensing.allocatedSeats / licensing.totalSeats) * 100)}%)
                      </span>
                    </div>
                    <Progress value={(licensing.allocatedSeats / licensing.totalSeats) * 100} className="h-2.5" />
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 rounded-xl border border-border/50 bg-secondary/30">
                      <span className="text-xs text-muted-foreground block">Active This Week</span>
                      <span className="text-2xl font-bold text-primary font-heading">{licensing.activeThisWeek}</span>
                    </div>
                    <div className="p-3 rounded-xl border border-border/50 bg-secondary/30">
                      <span className="text-xs text-muted-foreground block">Engagement Index</span>
                      <span className="text-2xl font-bold text-emerald-600 font-heading">{licensing.engagementScore}</span>
                    </div>
                    <div className="p-3 rounded-xl border border-border/50 bg-secondary/30">
                      <span className="text-xs text-muted-foreground block">Next License Renewal</span>
                      <span className="text-sm font-bold text-foreground font-heading mt-1 block">{licensing.renewalDate}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <span className="text-xs text-muted-foreground">Enterprise Bulk Tier • Stripe & M-Pesa Auto-Billing</span>
                    <Button
                      onClick={() =>
                        toast({
                          title: 'Seats Expansion Requested',
                          description: 'Support has been notified to increase your enterprise quota.',
                        })
                      }
                      size="sm"
                      className="bg-primary hover:bg-primary-glow text-white"
                    >
                      Add 25 Additional Seats
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/60 shadow-soft">
                <CardHeader>
                  <CardTitle className="text-base font-heading">Security & Governance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-xs leading-relaxed">
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Role-Based Access Control (RBAC) enforced across HR, Leads & Executives.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Single Sign-On (SSO) & Multi-Factor Authentication active.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>GDPR & Data Protection compliant session-scoped logs.</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}