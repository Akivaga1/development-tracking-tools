import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  User,
  TrendingUp,
  Building2,
  Target,
  Heart,
  BookOpen,
  BarChart3,
  Smile,
  CheckCircle2,
  Calendar,
  Plus,
  Vote,
  Crown,
  Kanban,
  Users2,
  Sparkles,
  Mic,
  Monitor,
  Briefcase,
  Wifi,
  WifiOff,
} from 'lucide-react';
import { SubscriptionModal } from './SubscriptionModal';
import { useToast } from '@/hooks/use-toast';

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
  tier: 'Basic' | 'Pro' | 'Enterprise' | 'Civic';
}

const trackerModules: TrackerModule[] = [
  {
    id: 'pdt',
    title: 'Personal Tracker (PDT Journal)',
    description: 'Daily mood log (emoji & voice pitch/volume/tempo), SMART goals, habits & 4-7-8 breathing recovery.',
    icon: User,
    gradient: 'from-blue-600 to-cyan-500',
    stats: {
      label: 'Habit Streak',
      value: '14 days',
      trend: 'up',
    },
    isActive: true,
    tier: 'Basic',
  },
  {
    id: 'cdt',
    title: 'Professional & Innovation Trackers',
    description: 'Career growth pathways, skill development matrix, innovation idea pipelines and PDF summaries.',
    icon: TrendingUp,
    gradient: 'from-blue-700 to-indigo-600',
    stats: {
      label: 'Skills & Ideas',
      value: '8 active, 23 logged',
      trend: 'up',
    },
    isActive: true,
    tier: 'Pro',
  },
  {
    id: 'odt',
    title: 'Organizational Suite & Remote Tools',
    description: 'Team dashboards, OKR planning, culture heatmaps, bulk licensing, DTT Remote and Football Management.',
    icon: Building2,
    gradient: 'from-slate-800 to-blue-900',
    stats: {
      label: 'Active Teams',
      value: '5 Teams, 41 Remote',
      trend: 'up',
    },
    isActive: true,
    tier: 'Enterprise',
  },
  {
    id: 'elective-leadership-suite',
    title: 'Elective Leadership & Civic Strategy',
    description: 'Political strategy, campaign metrics, voter influence heatmaps, and executive civic governance.',
    icon: Vote,
    gradient: 'from-sky-700 to-blue-800',
    stats: {
      label: 'Campaign Strategy',
      value: '3 Active Areas',
      trend: 'stable',
    },
    isActive: true,
    tier: 'Civic',
  },
  {
    id: 'executive-class',
    title: 'Executive Panel & Decision Deck',
    description: 'Vision mapping, cross-enterprise KPIs, executive wellness check-ins, and "Decision Deck" scenario planning.',
    icon: Crown,
    gradient: 'from-blue-900 to-slate-900',
    stats: {
      label: 'Decision Deck',
      value: '4 Scenarios Modeled',
      trend: 'up',
    },
    isActive: true,
    tier: 'Civic',
  },
  {
    id: 'project-manager',
    title: 'Integrated Project Manager',
    description: '10 PMBOK key areas: Scope, Schedule, Cost (EVM), Quality, Resources, Comms, Risk, Procurement & Stakeholders.',
    icon: Kanban,
    gradient: 'from-blue-600 to-sky-600',
    stats: {
      label: '10 Key Areas',
      value: 'Healthy (CPI 1.12)',
      trend: 'up',
    },
    isActive: true,
    tier: 'Enterprise',
  },
  {
    id: 'business-development',
    title: 'Business Management Tracker',
    description: 'Small to large business tasks, CRM pipelines, sales tracking, inventory and hands-free AI voice input.',
    icon: Briefcase,
    gradient: 'from-cyan-600 to-blue-700',
    stats: {
      label: 'Sales Revenue',
      value: '$324.8K (+18.7%)',
      trend: 'up',
    },
    isActive: true,
    tier: 'Enterprise',
  },
  {
    id: 'community-coaching',
    title: 'Community & Coaching Tools',
    description: 'Group journaling, shared cohort projects, peer coaching pods and FaithFlow spiritual wellness rhythm.',
    icon: Users2,
    gradient: 'from-emerald-600 to-teal-700',
    stats: {
      label: 'FaithFlow Streak',
      value: '19 Days Active',
      trend: 'up',
    },
    isActive: true,
    tier: 'Basic',
  },
];

const quickActions = [
  {
    icon: Smile,
    label: 'Log Mood',
    action: 'mood',
    description: 'Daily emotional state',
    color: 'text-amber-500',
  },
  {
    icon: Mic,
    label: 'Voice Tone',
    action: 'voice',
    description: 'Pitch & tempo check',
    color: 'text-primary',
  },
  {
    icon: Target,
    label: 'SMART Goal',
    action: 'goal',
    description: 'Set milestone target',
    color: 'text-blue-600',
  },
  {
    icon: CheckCircle2,
    label: 'Habit Done',
    action: 'habit',
    description: 'Streak progression',
    color: 'text-emerald-600',
  },
  {
    icon: Sparkles,
    label: 'FaithFlow',
    action: 'faithflow',
    description: 'Mindful pause',
    color: 'text-teal-600',
  },
  {
    icon: Kanban,
    label: 'PM 10-Area',
    action: 'project',
    description: 'Project manager',
    color: 'text-sky-600',
  },
  {
    icon: Monitor,
    label: 'DTT Remote',
    action: 'remote',
    description: 'Timesheets & tasks',
    color: 'text-indigo-600',
  },
  {
    icon: Crown,
    label: 'Decision Deck',
    action: 'deck',
    description: 'Scenario planning',
    color: 'text-purple-600',
  },
];

interface DTTDashboardProps {
  onNavigate?: (view: string) => void;
}

export function DTTDashboard({ onNavigate }: DTTDashboardProps) {
  const { toast } = useToast();
  const [subscriptionOpen, setSubscriptionOpen] = useState(false);
  const [selectedUpgradeTier, setSelectedUpgradeTier] = useState<'Basic' | 'Pro' | 'Enterprise' | 'Civic'>('Pro');
  const [isOfflineSync, setIsOfflineSync] = useState(false);

  const handleModuleClick = (moduleId: string) => {
    if (onNavigate) {
      onNavigate(moduleId);
    }
  };

  const handleQuickAction = (action: string) => {
    if (!onNavigate) return;
    switch (action) {
      case 'mood':
      case 'voice':
      case 'goal':
      case 'habit':
        onNavigate('pdt');
        break;
      case 'faithflow':
        onNavigate('community-coaching');
        break;
      case 'project':
        onNavigate('project-manager');
        break;
      case 'remote':
        onNavigate('dtt-remote');
        break;
      case 'deck':
        onNavigate('executive-class');
        break;
      default:
        console.log(`Action: ${action}`);
    }
  };

  const openSubscriptionModal = (tier: 'Basic' | 'Pro' | 'Enterprise' | 'Civic' = 'Pro') => {
    setSelectedUpgradeTier(tier);
    setSubscriptionOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Header */}
      <header className="border-b bg-card/70 backdrop-blur-md sticky top-0 z-50 shadow-soft">
        <div className="container mx-auto px-6 py-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-soft">
                <span className="text-white font-extrabold font-heading text-lg tracking-tight">DTT</span>
              </div>
              <div>
                <h1 className="text-xl font-bold font-heading text-foreground tracking-tight flex items-center gap-1.5">
                  Development Tracking Tools
                  <Badge variant="outline" className="border-primary/40 text-primary text-[10px] py-0 hidden sm:inline-flex">
                    v2.5
                  </Badge>
                </h1>
                <p className="text-xs text-muted-foreground">
                  Personal • Professional • Organizational • Civic • Executive
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* Emerging Markets Offline Sync Toggle */}
              <button
                type="button"
                onClick={() => {
                  setIsOfflineSync(!isOfflineSync);
                  toast({
                    title: !isOfflineSync ? 'Offline Mode Active' : 'Real-Time Cloud Sync Connected',
                    description: !isOfflineSync
                      ? 'Local data stored in encrypted offline queue. Ideal for intermittent networks.'
                      : 'Syncing local changes with Django REST API backend.',
                  });
                }}
                className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                  isOfflineSync
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-600'
                    : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600'
                }`}
              >
                {isOfflineSync ? (
                  <>
                    <WifiOff className="w-3.5 h-3.5" />
                    <span>Offline Queue Ready</span>
                  </>
                ) : (
                  <>
                    <Wifi className="w-3.5 h-3.5" />
                    <span>Real-time Cloud Sync</span>
                  </>
                )}
              </button>

              <Badge
                variant="secondary"
                className="cursor-pointer hover:bg-secondary/80 border border-border/60 text-xs px-2.5 py-1"
                onClick={() => openSubscriptionModal('Basic')}
              >
                Basic (Free)
              </Badge>

              <Button
                onClick={() => openSubscriptionModal('Pro')}
                size="sm"
                className="bg-primary hover:bg-primary-glow text-white shadow-soft transition-all duration-200"
              >
                <Plus className="w-4 h-4 mr-1.5" />
                Upgrade Plan
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-card via-card to-primary/[0.04] border border-border/70 shadow-soft">
          <div>
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">Unified Development Platform</span>
            <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-foreground mt-0.5">
              Welcome back, Leader 👋
            </h2>
            <p className="text-muted-foreground text-sm max-w-2xl mt-1">
              Seamlessly monitor personal emotional habits, professional skill pipelines, remote teams, and civic strategy in one integrated ecosystem.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start md:self-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => openSubscriptionModal('Civic')}
              className="text-xs border-primary/30 text-primary"
            >
              Explore Civic Tier
            </Button>
            <Button
              size="sm"
              onClick={() => openSubscriptionModal('Enterprise')}
              className="text-xs bg-slate-900 text-white hover:bg-slate-800"
            >
              Enterprise Quote
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-bold font-heading text-foreground">Action Shortcuts</h3>
            <span className="text-xs text-muted-foreground">1-Click Telemetry & Logging</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {quickActions.map((action) => (
              <Card
                key={action.action}
                className="cursor-pointer hover:shadow-medium transition-all duration-200 transform hover:-translate-y-1 border-border/60 group bg-card"
                onClick={() => handleQuickAction(action.action)}
              >
                <CardContent className="p-3.5 text-center">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-secondary/80 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <action.icon className={`w-5 h-5 ${action.color} group-hover:scale-110 transition-transform`} />
                  </div>
                  <p className="text-xs font-bold text-foreground mb-0.5">{action.label}</p>
                  <p className="text-[10px] text-muted-foreground leading-tight">{action.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Modular Development Trackers Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold font-heading text-foreground">Development Trackers & Suites</h3>
              <p className="text-xs text-muted-foreground">Modular tools tailored to personal, organizational, and executive growth</p>
            </div>
            <span className="text-xs text-muted-foreground">8 Modules Active</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {trackerModules.map((module) => (
              <Card
                key={module.id}
                className="cursor-pointer transition-all duration-200 hover:shadow-strong transform hover:-translate-y-1 border-border/70 bg-card flex flex-col justify-between"
                onClick={() => handleModuleClick(module.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-11 h-11 bg-gradient-to-br ${module.gradient} rounded-xl flex items-center justify-center text-white shadow-soft`}>
                        <module.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <CardTitle className="text-base font-bold font-heading text-foreground leading-snug">
                          {module.title}
                        </CardTitle>
                        <Badge
                          variant="secondary"
                          className={`text-[10px] mt-1 font-semibold ${
                            module.tier === 'Basic'
                              ? 'bg-slate-100 text-slate-700'
                              : module.tier === 'Pro'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : module.tier === 'Civic'
                              ? 'bg-sky-50 text-sky-800 border-sky-200'
                              : 'bg-indigo-50 text-indigo-800 border-indigo-200'
                          }`}
                        >
                          {module.tier} Plan
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <CardDescription className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                    {module.description}
                  </CardDescription>

                  {module.stats && (
                    <div className="flex items-center justify-between pt-2.5 border-t border-border/40 text-xs">
                      <span className="text-muted-foreground">{module.stats.label}</span>
                      <div className="flex items-center space-x-1 font-semibold text-foreground">
                        <span>{module.stats.value}</span>
                        {module.stats.trend === 'up' && <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Live Synthesis Overview */}
        <div>
          <h3 className="text-base font-bold font-heading mb-3 text-foreground">Executive Overview Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Card className="border-border/60 shadow-soft">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-foreground flex items-center">
                  <Heart className="w-4 h-4 mr-2 text-rose-500" />
                  Emotional & Mental Wellness
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold font-heading text-foreground">8.4 / 10</div>
                <p className="text-xs text-muted-foreground mt-0.5">Calculated via Mood & Voice Tone biomarkers</p>
              </CardContent>
            </Card>

            <Card className="border-border/60 shadow-soft">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-foreground flex items-center">
                  <Target className="w-4 h-4 mr-2 text-primary" />
                  Quarterly OKR & Goal Velocity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold font-heading text-foreground">78% Complete</div>
                <p className="text-xs text-muted-foreground mt-0.5">18 personal & team key results achieved</p>
              </CardContent>
            </Card>

            <Card className="border-border/60 shadow-soft">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-foreground flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-emerald-600" />
                  Continuous Growth Streak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold font-heading text-emerald-600">14 Days Active</div>
                <p className="text-xs text-muted-foreground mt-0.5">Real-time multi-device cloud synchronization</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Subscription & Payment Checkout Modal */}
      <SubscriptionModal
        open={subscriptionOpen}
        onOpenChange={setSubscriptionOpen}
        defaultTier={selectedUpgradeTier}
      />
    </div>
  );
}