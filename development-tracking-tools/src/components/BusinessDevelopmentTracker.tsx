import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import {
  ArrowLeft,
  TrendingUp,
  Users,
  Package,
  DollarSign,
  Target,
  Brain,
  BarChart3,
  Activity,
  Mic,
  MicOff,
  Wifi,
  WifiOff,
  Sparkles,
  CheckCircle2,
  ListTodo,
} from 'lucide-react';
import { CRMModule } from './CRMModule';
import { FinanceTracker } from './FinanceTracker';
import { BusinessGoalsTracker } from './BusinessGoalsTracker';
import { InventoryManagement } from './InventoryManagement';
import { useToast } from '@/hooks/use-toast';

interface BusinessDevelopmentTrackerProps {
  onBack: () => void;
}

type ActiveView = 'dashboard' | 'crm' | 'finance' | 'goals' | 'inventory' | 'tasks';

const businessModules = [
  {
    id: 'crm',
    title: 'CRM Pipeline',
    description: 'Customer relationship management and deals pipeline tracking',
    icon: Users,
    gradient: 'bg-gradient-primary',
    stats: { label: 'Active Clients', value: '247', trend: 'up' },
  },
  {
    id: 'inventory',
    title: 'Inventory & Stock',
    description: 'Track and manage products, stock levels, suppliers and reorder alerts',
    icon: Package,
    gradient: 'bg-gradient-growth',
    stats: { label: 'Total Items', value: '2,847', trend: 'up' },
  },
  {
    id: 'finance',
    title: 'Finance & Sales',
    description: 'Income, expenses, profit margins and cash flow tracking',
    icon: DollarSign,
    gradient: 'bg-gradient-hero',
    stats: { label: 'Monthly Revenue', value: '$84.2K', trend: 'up' },
  },
  {
    id: 'goals',
    title: 'Business Goals',
    description: 'Strategic OKRs, sales quotas and quarterly performance tracking',
    icon: Target,
    gradient: 'bg-gradient-wellness',
    stats: { label: 'Goals Met', value: '18/24', trend: 'stable' },
  },
];

const kpiCards = [
  { title: 'Total Revenue', value: '$324.8K', change: '+12.5%', icon: DollarSign, color: 'text-emerald-600' },
  { title: 'Active Clients', value: '247', change: '+8.2%', icon: Users, color: 'text-primary' },
  { title: 'Conversion Rate', value: '34.2%', change: '+2.1%', icon: TrendingUp, color: 'text-sky-600' },
  { title: 'Growth Rate', value: '18.7%', change: '+3.4%', icon: Activity, color: 'text-emerald-600' },
];

export function BusinessDevelopmentTracker({ onBack }: BusinessDevelopmentTrackerProps) {
  const { toast } = useToast();
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);
  const [voiceLogInput, setVoiceLogInput] = useState('');
  const [isOfflineMode, setIsOfflineMode] = useState(false);

  // Business Tasks
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Dispatch batch invoice to Nairobi logistics client', due: 'Today', status: 'Done' },
    { id: 2, title: 'Review M-Pesa STK push reconciliation with finance', due: 'Today', status: 'In Progress' },
    { id: 3, title: 'Restock hardware telemetry units (reorder alert)', due: 'Tomorrow', status: 'Pending' },
    { id: 4, title: 'Q1 sales forecast sync with executive board', due: 'In 3 days', status: 'Pending' },
  ]);

  if (activeView === 'crm') {
    return <CRMModule onBack={() => setActiveView('dashboard')} />;
  }
  if (activeView === 'inventory') {
    return <InventoryManagement onBack={() => setActiveView('dashboard')} />;
  }
  if (activeView === 'finance') {
    return <FinanceTracker onBack={() => setActiveView('dashboard')} />;
  }
  if (activeView === 'goals') {
    return <BusinessGoalsTracker onBack={() => setActiveView('dashboard')} />;
  }

  const handleVoiceInput = () => {
    setIsVoiceRecording(true);
    toast({
      title: 'AI Voice Input Activated',
      description: 'Listening for business entry (sales, task, or client note)...',
    });

    setTimeout(() => {
      setIsVoiceRecording(false);
      setVoiceLogInput('Recorded sale: $1,450 for Enterprise Renewal (Auto-logged to CRM)');
      toast({
        title: 'Voice Entry Captured',
        description: 'Parsed transaction and queued for real-time synchronization.',
      });
    }, 2400);
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, status: t.status === 'Done' ? 'Pending' : 'Done' } : t))
    );
  };

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
              <div className="w-10 h-10 rounded-lg bg-gradient-growth flex items-center justify-center text-white shadow-soft">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold font-heading text-foreground">
                  Business Management Tracker
                </h1>
                <p className="text-sm text-muted-foreground">
                  Small to large enterprise management: Tasks, CRM, Sales, Inventory & AI Voice Input
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsOfflineMode(!isOfflineMode);
                  toast({
                    title: isOfflineMode ? 'Online Real-Time Sync Resumed' : 'Offline Mode Simulation Active',
                    description: isOfflineMode
                      ? 'Local changes synced with backend server.'
                      : 'Changes queued locally in IndexedDB cache for emerging market resilience.',
                  });
                }}
                className="text-xs"
              >
                {isOfflineMode ? (
                  <>
                    <WifiOff className="w-3.5 h-3.5 mr-1.5 text-amber-500" />
                    Offline Mode
                  </>
                ) : (
                  <>
                    <Wifi className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
                    Sync: Live
                  </>
                )}
              </Button>
              <Badge className="bg-primary text-white">Enterprise Tier</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Hands-Free AI Voice Input Box */}
        <Card className="border-primary/30 shadow-soft bg-gradient-to-r from-card to-primary/[0.04]">
          <CardContent className="p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div
                  onClick={handleVoiceInput}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center cursor-pointer transition-all ${
                    isVoiceRecording
                      ? 'bg-rose-500 text-white animate-pulse shadow-medium'
                      : 'bg-primary text-white hover:bg-primary-glow shadow-soft'
                  }`}
                >
                  {isVoiceRecording ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-foreground flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary" />
                    Hands-Free AI Voice Input (Offline Optimized)
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Log deals, record sales, or capture client notes hands-free in the field or factory floor.
                  </p>
                </div>
              </div>

              <div className="flex-1 max-w-md">
                <Input
                  value={voiceLogInput}
                  onChange={(e) => setVoiceLogInput(e.target.value)}
                  placeholder="Click mic or type: e.g. 'Sold 5 units to Client Alpha for $1,200'"
                  className="text-xs"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* KPI Overview */}
        <div>
          <h2 className="text-base font-bold font-heading mb-3 text-foreground">Business Performance KPIs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpiCards.map((kpi) => (
              <Card key={kpi.title} className="border-border/60 shadow-soft">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xs font-semibold text-muted-foreground">{kpi.title}</CardTitle>
                    <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-heading text-foreground">{kpi.value}</div>
                  <p className="text-xs text-emerald-600 mt-0.5 font-medium">{kpi.change} vs previous cycle</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Modules Grid */}
        <div>
          <h3 className="text-base font-bold font-heading mb-3 text-foreground">Integrated Business Modules</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {businessModules.map((module) => (
              <Card
                key={module.id}
                className="cursor-pointer transition-all duration-300 hover:shadow-strong transform hover:scale-[1.02] border-border/60"
                onClick={() => setActiveView(module.id as ActiveView)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 ${module.gradient} rounded-lg flex items-center justify-center text-white shadow-soft`}>
                        <module.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <CardTitle className="text-base font-heading text-foreground">{module.title}</CardTitle>
                        <Badge variant="outline" className="text-[10px] mt-0.5 border-primary/30 text-primary">
                          Integrated
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-xs text-muted-foreground mb-3 leading-relaxed">
                    {module.description}
                  </CardDescription>
                  <div className="flex items-center justify-between pt-2 border-t border-border/40 text-xs">
                    <span className="text-muted-foreground">{module.stats.label}</span>
                    <span className="font-bold text-foreground">{module.stats.value}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Split Section: AI Sales Forecasting & Operational Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AI Sales Forecasting */}
          <Card className="border-border/60 shadow-soft">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-heading flex items-center gap-2">
                    <Brain className="w-5 h-5 text-primary" />
                    AI Sales Forecasting
                  </CardTitle>
                  <CardDescription>Predictive revenue models based on CRM conversion signals</CardDescription>
                </div>
                <Badge className="bg-emerald-600 text-white text-xs">94.2% Model Accuracy</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-xl bg-secondary/40 border border-border/40 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Projected Q4 Revenue</span>
                  <span className="font-bold text-foreground text-sm">$412,000 (+23% Growth)</span>
                </div>
                <Progress value={78} className="h-2" />
                <span className="text-[11px] text-muted-foreground block">
                  Top growth driver: Enterprise bulk licenses & multi-location subscription retention.
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2 rounded-lg bg-card border border-border/40">
                  <span className="text-foreground">Pipeline Velocity</span>
                  <span className="font-bold text-primary">18.4 Days to Close</span>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-card border border-border/40">
                  <span className="text-foreground">Lead-to-Won Ratio</span>
                  <span className="font-bold text-emerald-600">34.2%</span>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-card border border-border/40">
                  <span className="text-foreground">Churn Probability (Next 30 Days)</span>
                  <span className="font-bold text-emerald-600">&lt;2.1% (Low)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Operational Tasks & Checklists */}
          <Card className="border-border/60 shadow-soft">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-heading flex items-center gap-2">
                    <ListTodo className="w-5 h-5 text-primary" />
                    Business Operations & Tasks
                  </CardTitle>
                  <CardDescription>Daily actionable checklist for operations team</CardDescription>
                </div>
                <span className="text-xs text-muted-foreground">
                  {tasks.filter((t) => t.status === 'Done').length}/{tasks.length} Completed
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-2.5">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-xs ${
                    task.status === 'Done'
                      ? 'bg-primary/[0.04] border-primary/30'
                      : 'bg-card border-border/50 hover:border-primary/30'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {task.status === 'Done' ? (
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-muted-foreground/40 shrink-0" />
                    )}
                    <span
                      className={task.status === 'Done' ? 'line-through text-muted-foreground' : 'text-foreground font-medium'}
                    >
                      {task.title}
                    </span>
                  </div>
                  <Badge variant="outline" className="text-[10px]">
                    {task.due}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
