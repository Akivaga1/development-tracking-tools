import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowLeft,
  Kanban,
  Calendar,
  DollarSign,
  CheckCircle2,
  Users,
  MessageSquare,
  AlertTriangle,
  ShoppingBag,
  HeartHandshake,
  Layers,
  Plus,
  Clock,
  TrendingUp,
  FileText,
  Search,
  Filter,
} from 'lucide-react';

interface IntegratedProjectManagerProps {
  onBack: () => void;
}

export function IntegratedProjectManager({ onBack }: IntegratedProjectManagerProps) {
  const [activeArea, setActiveArea] = useState('integration');

  // Key Area 1: Integration
  const [projectHealth, setProjectHealth] = useState({
    name: 'Enterprise Cloud Migration & Sync Pipeline',
    status: 'Healthy',
    progress: 68,
    budgetUtilization: 62,
    scheduleVariance: '+3 days ahead',
    openRisks: 4,
  });

  // Key Area 2: Scope
  const scopeDeliverables = [
    { id: 'SC-1', title: 'Data Ingestion & Multi-Tenant Architecture', wbs: '1.1', status: 'Completed', progress: 100 },
    { id: 'SC-2', title: 'Real-time WebSocket & Offline Sync Engine', wbs: '1.2', status: 'In Progress', progress: 75 },
    { id: 'SC-3', title: 'OpenAI Mood Tone & Pitch Fusion Module', wbs: '1.3', status: 'In Progress', progress: 60 },
    { id: 'SC-4', title: 'Cross-Platform Mobile Android & iOS Bundle', wbs: '1.4', status: 'Pending', progress: 20 },
  ];

  // Key Area 3: Schedule
  const scheduleMilestones = [
    { title: 'Project Charter & Kickoff', date: 'Oct 01, 2025', status: 'Completed', owner: 'Executive Board' },
    { title: 'Architecture Signoff & Sprint 1', date: 'Nov 15, 2025', status: 'Completed', owner: 'Tech Lead' },
    { title: 'Beta Testing & Emerging Market Offline Drill', date: 'Jan 20, 2026', status: 'Active', owner: 'QA & DevOps' },
    { title: 'Production Go-Live & Multi-Cloud Deployment', date: 'Mar 30, 2026', status: 'Scheduled', owner: 'Steering Comm.' },
  ];

  // Key Area 4: Cost (EVM)
  const costMetrics = {
    budget: '$180,000',
    plannedValue: '$122,400',
    earnedValue: '$124,500',
    actualCost: '$111,600',
    cpi: '1.12 (Under Budget)',
    spi: '1.02 (Ahead of Schedule)',
  };

  // Key Area 5: Quality
  const qualityChecks = [
    { metric: 'Automated Test Coverage', target: '>85%', current: '92.4%', status: 'Pass' },
    { metric: 'API Latency (p95)', target: '<180ms', current: '115ms', status: 'Pass' },
    { metric: 'Crash-free User Sessions', target: '>99.5%', current: '99.8%', status: 'Pass' },
    { metric: 'Accessibility WCAG 2.1 AA', target: '100% compliant', current: '98% compliant', status: 'Needs Review' },
  ];

  // Key Area 6: Resources
  const resourceAllocation = [
    { role: 'Solution Architect', allocated: '100%', hoursWeek: 40, status: 'Optimal' },
    { role: 'Senior Frontend Developers (3)', allocated: '95%', hoursWeek: 114, status: 'Optimal' },
    { role: 'Backend & Database Engineers (2)', allocated: '100%', hoursWeek: 80, status: 'Optimal' },
    { role: 'UI/UX & Accessibility Specialist', allocated: '70%', hoursWeek: 28, status: 'Available' },
  ];

  // Key Area 7: Communications
  const communicationsCadence = [
    { type: 'Daily Standup', cadence: 'Daily 09:00 UTC', audience: 'Engineering & Product', channel: 'Huddle & DTT Remote' },
    { type: 'Sprint Review & Demo', cadence: 'Bi-weekly (Fridays)', audience: 'Stakeholders & Leadership', channel: 'Executive Deck' },
    { type: 'Board Governance Briefing', cadence: 'Monthly 1st Mon', audience: 'Steering Committee', channel: 'PDF Summary' },
  ];

  // Key Area 8: Risk
  const riskRegister = [
    { id: 'RSK-01', risk: 'Emerging market offline latency in intermittent networks', impact: 'Medium', prob: 'High', mitigation: 'Local IndexedDB caching & delta sync queue' },
    { id: 'RSK-02', risk: 'Stripe & M-Pesa exchange rate volatility', impact: 'Low', prob: 'Medium', mitigation: 'Daily rate pegging & multi-currency escrow' },
    { id: 'RSK-03', risk: 'Voice tone API throughput limit during peak usage', impact: 'Medium', prob: 'Low', mitigation: 'Client-side Web Audio feature extraction fallback' },
  ];

  // Key Area 9: Procurement
  const procurementContracts = [
    { vendor: 'Safaricom Daraja API Services', service: 'M-Pesa STK Push Gateway', status: 'Active SLA', cost: '$1,200/mo' },
    { vendor: 'OpenAI Enterprise API', service: 'Sentiment & Tone Analysis', status: 'Active SLA', cost: 'Usage-based' },
    { vendor: 'AWS / Cloud Hosting', service: 'High Availability Multi-Region', status: 'Contracted', cost: '$3,400/mo' },
  ];

  // Key Area 10: Stakeholders
  const stakeholdersList = [
    { name: 'Executive Steering Council', role: 'Sponsors', influence: 'High', interest: 'High', engagement: 'Supportive' },
    { name: 'HR & People Operations Leads', role: 'Key Beneficiary', influence: 'High', interest: 'High', engagement: 'Champions' },
    { name: 'Remote Engineering & Field Teams', role: 'End Users', influence: 'Medium', interest: 'High', engagement: 'Active Feedback' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top Header */}
      <div className="border-b bg-card/60 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="w-10 h-10 rounded-lg bg-gradient-hero flex items-center justify-center text-white shadow-soft">
                <Kanban className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold font-heading text-foreground">
                  Integrated Project Manager
                </h1>
                <p className="text-sm text-muted-foreground">
                  Complete 10-Area PMBOK Dashboard: Scope, Schedule, Cost, Quality, Resources, Communications, Risk, Procurement, Stakeholders & Integration
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-primary text-primary font-medium">
                10 Key Areas Active
              </Badge>
              <Badge className="bg-emerald-600 text-white">Status: Healthy</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Project Header Overview Card */}
        <Card className="mb-8 border-border/70 shadow-soft bg-gradient-to-r from-card to-secondary/30">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">Active Portfolio</span>
                <h2 className="text-xl font-bold font-heading text-foreground mt-0.5">
                  {projectHealth.name}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Unified cross-platform tracking for web, Android/iOS, remote teams and offline synchronization.
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-3 bg-card border border-border/50 rounded-xl shadow-soft">
                  <span className="text-xs text-muted-foreground">Overall Progress</span>
                  <div className="text-lg font-bold text-primary font-heading">{projectHealth.progress}%</div>
                </div>
                <div className="p-3 bg-card border border-border/50 rounded-xl shadow-soft">
                  <span className="text-xs text-muted-foreground">Budget Burn</span>
                  <div className="text-lg font-bold text-foreground font-heading">{projectHealth.budgetUtilization}%</div>
                </div>
                <div className="p-3 bg-card border border-border/50 rounded-xl shadow-soft">
                  <span className="text-xs text-muted-foreground">Schedule Variance</span>
                  <div className="text-lg font-bold text-emerald-600 font-heading">{projectHealth.scheduleVariance}</div>
                </div>
                <div className="p-3 bg-card border border-border/50 rounded-xl shadow-soft">
                  <span className="text-xs text-muted-foreground">Active Risks</span>
                  <div className="text-lg font-bold text-amber-600 font-heading">{projectHealth.openRisks} Logged</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 10-Area Tabbed Dashboards */}
        <Tabs value={activeArea} onValueChange={setActiveArea} className="w-full">
          <TabsList className="flex flex-wrap w-full h-auto p-1.5 bg-secondary/60 gap-1 rounded-xl mb-6 border border-border/50">
            <TabsTrigger value="integration" className="flex items-center gap-1.5 text-xs py-2 px-3">
              <Layers className="w-3.5 h-3.5" />
              1. Integration
            </TabsTrigger>
            <TabsTrigger value="scope" className="flex items-center gap-1.5 text-xs py-2 px-3">
              <Kanban className="w-3.5 h-3.5" />
              2. Scope
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex items-center gap-1.5 text-xs py-2 px-3">
              <Calendar className="w-3.5 h-3.5" />
              3. Schedule
            </TabsTrigger>
            <TabsTrigger value="cost" className="flex items-center gap-1.5 text-xs py-2 px-3">
              <DollarSign className="w-3.5 h-3.5" />
              4. Cost (EVM)
            </TabsTrigger>
            <TabsTrigger value="quality" className="flex items-center gap-1.5 text-xs py-2 px-3">
              <CheckCircle2 className="w-3.5 h-3.5" />
              5. Quality
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-1.5 text-xs py-2 px-3">
              <Users className="w-3.5 h-3.5" />
              6. Resources
            </TabsTrigger>
            <TabsTrigger value="communications" className="flex items-center gap-1.5 text-xs py-2 px-3">
              <MessageSquare className="w-3.5 h-3.5" />
              7. Comms
            </TabsTrigger>
            <TabsTrigger value="risk" className="flex items-center gap-1.5 text-xs py-2 px-3">
              <AlertTriangle className="w-3.5 h-3.5" />
              8. Risk
            </TabsTrigger>
            <TabsTrigger value="procurement" className="flex items-center gap-1.5 text-xs py-2 px-3">
              <ShoppingBag className="w-3.5 h-3.5" />
              9. Procurement
            </TabsTrigger>
            <TabsTrigger value="stakeholders" className="flex items-center gap-1.5 text-xs py-2 px-3">
              <HeartHandshake className="w-3.5 h-3.5" />
              10. Stakeholders
            </TabsTrigger>
          </TabsList>

          {/* 1. Integration */}
          <TabsContent value="integration" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-border/60 shadow-soft">
                <CardHeader>
                  <CardTitle className="text-base font-heading">Project Charter Summary</CardTitle>
                  <CardDescription>Foundational mandate & scope boundary</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p className="text-muted-foreground leading-relaxed">
                    Deploy unified development tracking across mobile & web, integrating personal wellness journals with organizational KPI execution.
                  </p>
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-border/40">
                    <span className="text-muted-foreground">Sponsor:</span>
                    <span className="font-semibold text-foreground">Executive Board</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Charter Signed:</span>
                    <span className="font-semibold text-foreground">Active</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/60 shadow-soft">
                <CardHeader>
                  <CardTitle className="text-base font-heading">Change Control Log</CardTitle>
                  <CardDescription>Requested modifications & decisions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="p-2.5 rounded-lg bg-secondary/50 border border-border/40 text-xs">
                    <div className="font-semibold text-foreground">CR-04: M-Pesa STK Push Integration</div>
                    <span className="text-emerald-600 font-medium">Status: Approved & Deployed</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-secondary/50 border border-border/40 text-xs">
                    <div className="font-semibold text-foreground">CR-05: Pitch & Tempo Tone Analyzer</div>
                    <span className="text-primary font-medium">Status: Implemented in PDT</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/60 shadow-soft">
                <CardHeader>
                  <CardTitle className="text-base font-heading">Overall Integration Score</CardTitle>
                  <CardDescription>Holistic health index</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-center">
                  <div className="text-4xl font-extrabold text-primary font-heading">94 / 100</div>
                  <Progress value={94} className="h-2.5" />
                  <p className="text-xs text-muted-foreground">
                    All cross-functional dependencies aligned between Frontend, Backend APIs, and Offline Local Store.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 2. Scope */}
          <TabsContent value="scope" className="space-y-4">
            <Card className="border-border/60 shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base font-heading">Work Breakdown Structure (WBS) & Deliverables</CardTitle>
                  <CardDescription>Scope decomposition and verification status</CardDescription>
                </div>
                <Button size="sm" variant="outline" className="border-primary/40 text-primary">
                  <Plus className="w-4 h-4 mr-1" /> Add Deliverable
                </Button>
              </CardHeader>
              <CardContent>
                <div className="divide-y divide-border/40">
                  {scopeDeliverables.map((item) => (
                    <div key={item.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs font-mono">{item.wbs}</Badge>
                          <span className="font-medium text-foreground text-sm">{item.title}</span>
                        </div>
                        <span className="text-xs text-muted-foreground mt-0.5 block">Reference: {item.id}</span>
                      </div>
                      <div className="flex items-center gap-4 w-full sm:w-auto">
                        <div className="w-32">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-muted-foreground">{item.progress}%</span>
                          </div>
                          <Progress value={item.progress} className="h-1.5" />
                        </div>
                        <Badge variant={item.status === 'Completed' ? 'default' : 'secondary'} className="text-xs">
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 3. Schedule */}
          <TabsContent value="schedule" className="space-y-4">
            <Card className="border-border/60 shadow-soft">
              <CardHeader>
                <CardTitle className="text-base font-heading">Gantt Milestones & Critical Path</CardTitle>
                <CardDescription>Key milestone calendar with ownership tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative pl-6 border-l-2 border-primary/30 space-y-6">
                  {scheduleMilestones.map((m, idx) => (
                    <div key={idx} className="relative">
                      <div className={`absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 border-card ${
                        m.status === 'Completed' ? 'bg-primary' : m.status === 'Active' ? 'bg-amber-500 animate-pulse' : 'bg-muted-foreground/40'
                      }`} />
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl bg-secondary/30 border border-border/40">
                        <div>
                          <h4 className="font-semibold text-sm text-foreground">{m.title}</h4>
                          <span className="text-xs text-muted-foreground">Owner: {m.owner}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono text-muted-foreground">{m.date}</span>
                          <Badge variant={m.status === 'Completed' ? 'default' : 'outline'} className="text-xs">
                            {m.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 4. Cost */}
          <TabsContent value="cost" className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Card className="border-border/60 p-4">
                <span className="text-xs text-muted-foreground">Total Budgeted</span>
                <div className="text-2xl font-bold font-heading text-foreground">{costMetrics.budget}</div>
              </Card>
              <Card className="border-border/60 p-4">
                <span className="text-xs text-muted-foreground">Planned Value (PV)</span>
                <div className="text-2xl font-bold font-heading text-muted-foreground">{costMetrics.plannedValue}</div>
              </Card>
              <Card className="border-border/60 p-4">
                <span className="text-xs text-muted-foreground">Earned Value (EV)</span>
                <div className="text-2xl font-bold font-heading text-primary">{costMetrics.earnedValue}</div>
              </Card>
              <Card className="border-border/60 p-4">
                <span className="text-xs text-muted-foreground">Actual Cost (AC)</span>
                <div className="text-2xl font-bold font-heading text-foreground">{costMetrics.actualCost}</div>
              </Card>
              <Card className="border-border/60 p-4">
                <span className="text-xs text-muted-foreground">Cost Performance Index (CPI)</span>
                <div className="text-2xl font-bold font-heading text-emerald-600">{costMetrics.cpi}</div>
              </Card>
              <Card className="border-border/60 p-4">
                <span className="text-xs text-muted-foreground">Schedule Performance Index (SPI)</span>
                <div className="text-2xl font-bold font-heading text-emerald-600">{costMetrics.spi}</div>
              </Card>
            </div>
          </TabsContent>

          {/* 5. Quality */}
          <TabsContent value="quality" className="space-y-4">
            <Card className="border-border/60 shadow-soft">
              <CardHeader>
                <CardTitle className="text-base font-heading">Quality Assurance & Compliance Metrics</CardTitle>
                <CardDescription>Verification standards, test passing rates and SLAs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="divide-y divide-border/40">
                  {qualityChecks.map((qc, i) => (
                    <div key={i} className="py-3 flex items-center justify-between text-sm">
                      <div>
                        <span className="font-medium text-foreground">{qc.metric}</span>
                        <span className="text-xs text-muted-foreground block">Benchmark: {qc.target}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm font-semibold text-foreground">{qc.current}</span>
                        <Badge variant={qc.status === 'Pass' ? 'default' : 'secondary'} className="text-xs">
                          {qc.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 6. Resources */}
          <TabsContent value="resources" className="space-y-4">
            <Card className="border-border/60 shadow-soft">
              <CardHeader>
                <CardTitle className="text-base font-heading">Workload & Resource Utilization</CardTitle>
                <CardDescription>Team allocation across deliverables</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {resourceAllocation.map((res, i) => (
                    <div key={i} className="p-3 rounded-xl bg-secondary/30 border border-border/40">
                      <div className="flex items-center justify-between text-sm mb-1.5">
                        <span className="font-semibold text-foreground">{res.role}</span>
                        <span className="text-xs text-muted-foreground">{res.hoursWeek} hrs/week ({res.allocated})</span>
                      </div>
                      <Progress value={parseInt(res.allocated)} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 7. Communications */}
          <TabsContent value="communications" className="space-y-4">
            <Card className="border-border/60 shadow-soft">
              <CardHeader>
                <CardTitle className="text-base font-heading">Stakeholder Communications Cadence</CardTitle>
                <CardDescription>Cadence, channels, and reporting formats</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {communicationsCadence.map((c, i) => (
                    <div key={i} className="p-4 rounded-xl border border-border/50 bg-card shadow-soft space-y-2">
                      <Badge variant="outline" className="text-xs text-primary border-primary/40">{c.cadence}</Badge>
                      <h4 className="font-bold text-sm text-foreground">{c.type}</h4>
                      <p className="text-xs text-muted-foreground">Audience: {c.audience}</p>
                      <p className="text-xs text-primary font-medium">Channel: {c.channel}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 8. Risk */}
          <TabsContent value="risk" className="space-y-4">
            <Card className="border-border/60 shadow-soft">
              <CardHeader>
                <CardTitle className="text-base font-heading">Risk Register & Mitigation Strategies</CardTitle>
                <CardDescription>Continuous hazard assessment and contingency actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="divide-y divide-border/40">
                  {riskRegister.map((r) => (
                    <div key={r.id} className="py-3.5 space-y-1 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-foreground flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-amber-500" />
                          {r.risk}
                        </span>
                        <div className="flex gap-2">
                          <Badge variant="outline" className="text-xs">Impact: {r.impact}</Badge>
                          <Badge variant="secondary" className="text-xs">Prob: {r.prob}</Badge>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground pl-6">
                        <strong>Mitigation:</strong> {r.mitigation}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 9. Procurement */}
          <TabsContent value="procurement" className="space-y-4">
            <Card className="border-border/60 shadow-soft">
              <CardHeader>
                <CardTitle className="text-base font-heading">Vendor & Procurement Contracts</CardTitle>
                <CardDescription>Third-party service agreements and SLA monitoring</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="divide-y divide-border/40">
                  {procurementContracts.map((p, i) => (
                    <div key={i} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between text-sm gap-2">
                      <div>
                        <span className="font-bold text-foreground">{p.vendor}</span>
                        <span className="text-xs text-muted-foreground block">{p.service}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-medium text-foreground">{p.cost}</span>
                        <Badge className="bg-primary/10 text-primary border border-primary/20 text-xs">
                          {p.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 10. Stakeholders */}
          <TabsContent value="stakeholders" className="space-y-4">
            <Card className="border-border/60 shadow-soft">
              <CardHeader>
                <CardTitle className="text-base font-heading">Stakeholder Power / Interest Matrix</CardTitle>
                <CardDescription>Engagement index and sentiment tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {stakeholdersList.map((stk, i) => (
                    <div key={i} className="p-4 rounded-xl border border-border/50 bg-card shadow-soft space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-muted-foreground">{stk.role}</span>
                        <Badge variant="outline" className="text-xs text-emerald-600 border-emerald-500/30">
                          {stk.engagement}
                        </Badge>
                      </div>
                      <h4 className="font-bold text-sm text-foreground">{stk.name}</h4>
                      <div className="flex justify-between text-xs text-muted-foreground pt-1">
                        <span>Power: {stk.influence}</span>
                        <span>Interest: {stk.interest}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
