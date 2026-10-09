import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  ArrowLeft, 
  MapPin, 
  Users, 
  Target, 
  TrendingUp, 
  Plus,
  Edit,
  BarChart3,
  Calendar,
  MessageSquare,
  ChevronDown,
  ChevronRight,
  Download,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Brain,
  Globe,
  UserCheck,
  Megaphone,
  GraduationCap,
  Settings,
  Star,
  Trophy,
  Shield,
  Briefcase,
  PieChart,
  Activity,
  Database,
  Map
} from 'lucide-react';

interface PoliticalStrategyDashboardProps {
  onBack: () => void;
}

const strategyModules = [
  {
    id: 'strategic-planning',
    title: 'Strategic Planning Roadmap',
    icon: Target,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    progress: 75,
    status: 'active',
    subModules: [
      { name: 'IEBC Voter Register Analysis', status: 'completed', cost: 150000 },
      { name: 'Geographic & Social Voting Clusters', status: 'in-progress', cost: 200000 },
      { name: 'Historical Voting Trend Analysis', status: 'pending', cost: 100000 },
      { name: 'Party Preference Scoring', status: 'pending', cost: 80000 },
      { name: 'Campaign Vision Alignment', status: 'pending', cost: 50000 }
    ]
  },
  {
    id: 'feasibility-study',
    title: 'Feasibility Study & Voter Assessment',
    icon: BarChart3,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    progress: 60,
    status: 'active',
    subModules: [
      { name: 'Voter Needs Analysis', status: 'completed', cost: 120000 },
      { name: 'Political Environment Mapping', status: 'in-progress', cost: 180000 },
      { name: 'Risk & Opportunity Heatmaps', status: 'pending', cost: 150000 },
      { name: 'Community Issue Profiling', status: 'pending', cost: 100000 },
      { name: 'Gender & Youth Assessment', status: 'pending', cost: 80000 }
    ]
  },
  {
    id: 'voter-segmentation',
    title: 'Voter Segmentation Module',
    icon: Users,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    progress: 45,
    status: 'active',
    subModules: [
      { name: 'Demographic Segmentation', status: 'in-progress', cost: 100000 },
      { name: 'Psychographic Analysis', status: 'pending', cost: 120000 },
      { name: 'Political Behavior Mapping', status: 'pending', cost: 140000 },
      { name: 'Engagement Strategy Builder', status: 'pending', cost: 90000 }
    ]
  },
  {
    id: 'campaign-framework',
    title: 'Campaign Framework Development',
    icon: Briefcase,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    progress: 30,
    status: 'pending',
    subModules: [
      { name: 'Manifesto Drafting & Storage', status: 'pending', cost: 200000 },
      { name: 'Branding Kit Development', status: 'pending', cost: 150000 },
      { name: 'Messaging Matrix Creation', status: 'pending', cost: 100000 },
      { name: 'Media & Marketing Plan', status: 'pending', cost: 180000 },
      { name: 'Event Planning Tools', status: 'pending', cost: 120000 },
      { name: 'Grassroots Mobilization', status: 'pending', cost: 160000 },
      { name: 'Fundraising Strategy', status: 'pending', cost: 140000 }
    ]
  },
  {
    id: 'team-training',
    title: 'Campaign Team Training Hub',
    icon: GraduationCap,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    progress: 20,
    status: 'pending',
    subModules: [
      { name: 'Staff & Volunteer Onboarding', status: 'pending', cost: 80000 },
      { name: 'Public Speaking Coaching', status: 'pending', cost: 100000 },
      { name: 'Social Media Management', status: 'pending', cost: 60000 },
      { name: 'Door-to-Door Coordination', status: 'pending', cost: 70000 },
      { name: 'Voter Outreach Playbook', status: 'pending', cost: 50000 },
      { name: 'Crisis Management Templates', status: 'pending', cost: 90000 }
    ]
  },
  {
    id: 'schedule-mobilization',
    title: 'Schedule Alignment & Mobilization',
    icon: Calendar,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    progress: 15,
    status: 'pending',
    subModules: [
      { name: 'Campaign Timeline & Gantt Chart', status: 'pending', cost: 120000 },
      { name: 'Event & Media Scheduler', status: 'pending', cost: 80000 },
      { name: 'Digital Publishing Calendar', status: 'pending', cost: 60000 },
      { name: 'Volunteer Shift Management', status: 'pending', cost: 90000 },
      { name: 'Fundraising Timeline', status: 'pending', cost: 70000 }
    ]
  },
  {
    id: 'post-election',
    title: 'Post-Election Implementation',
    icon: Trophy,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    progress: 0,
    status: 'pending',
    subModules: [
      { name: 'Governance Transition Checklist', status: 'pending', cost: 150000 },
      { name: 'Cabinet/Team Structuring', status: 'pending', cost: 100000 },
      { name: 'Community Outreach Planner', status: 'pending', cost: 120000 },
      { name: 'Stakeholder Communication', status: 'pending', cost: 80000 },
      { name: 'Legislative Action Roadmap', status: 'pending', cost: 180000 }
    ]
  }
];

export function PoliticalStrategyDashboard({ onBack }: PoliticalStrategyDashboardProps) {
  const [selectedModule, setSelectedModule] = useState('strategic-planning');
  const [expandedCards, setExpandedCards] = useState<{ [key: string]: boolean }>({});
  const [showAnalytics, setShowAnalytics] = useState(false);

  const currentModule = strategyModules.find(m => m.id === selectedModule);
  const totalEstimatedCost = strategyModules.reduce((sum, module) => 
    sum + module.subModules.reduce((subSum, sub) => subSum + sub.cost, 0), 0
  );
  const completedModules = strategyModules.filter(m => m.progress === 100).length;
  const overallProgress = strategyModules.reduce((sum, m) => sum + m.progress, 0) / strategyModules.length;

  const toggleCardExpansion = (cardId: string) => {
    setExpandedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: 'bg-green-100 text-green-800',
      'in-progress': 'bg-yellow-100 text-yellow-800',
      pending: 'bg-gray-100 text-gray-800',
      active: 'bg-blue-100 text-blue-800'
    };
    return variants[status as keyof typeof variants] || variants.pending;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-800">
                  Political Strategy Plan Dashboard
                </h1>
                <p className="text-sm text-slate-600">DTT Framework - Data-Driven Campaign Strategy</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" onClick={() => setShowAnalytics(true)}>
                <Activity className="w-4 h-4 mr-2" />
                Analytics
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Plan
              </Button>
              <Badge className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1">
                {completedModules}/7 Modules Complete
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/70 backdrop-blur border-slate-200 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center text-slate-700">
                <PieChart className="w-5 h-5 mr-2 text-blue-600" />
                Overall Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-800 mb-2">
                {Math.round(overallProgress)}%
              </div>
              <Progress value={overallProgress} className="h-2" />
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur border-slate-200 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center text-slate-700">
                <Database className="w-5 h-5 mr-2 text-green-600" />
                Total Investment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-800">
                KES {(totalEstimatedCost / 1000000).toFixed(1)}M
              </div>
              <p className="text-sm text-slate-600">Estimated budget</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur border-slate-200 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center text-slate-700">
                <Target className="w-5 h-5 mr-2 text-amber-600" />
                Active Modules
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-800">
                {strategyModules.filter(m => m.status === 'active').length}
              </div>
              <p className="text-sm text-slate-600">Currently running</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur border-slate-200 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center text-slate-700">
                <Shield className="w-5 h-5 mr-2 text-purple-600" />
                Risk Level
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                Low
              </div>
              <p className="text-sm text-slate-600">Current assessment</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Module Navigation */}
          <div className="lg:col-span-1">
            <Card className="bg-white/80 backdrop-blur border-slate-200 shadow-lg sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg text-slate-800">Strategy Modules</CardTitle>
                <CardDescription>Select a module to view details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {strategyModules.map((module) => {
                  const Icon = module.icon;
                  return (
                    <Button
                      key={module.id}
                      variant={selectedModule === module.id ? "default" : "ghost"}
                      className={`w-full justify-start h-auto p-4 ${
                        selectedModule === module.id 
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg' 
                          : 'hover:bg-slate-100'
                      }`}
                      onClick={() => setSelectedModule(module.id)}
                    >
                      <div className="flex items-center space-x-3 w-full">
                        <Icon className={`w-5 h-5 ${selectedModule === module.id ? 'text-white' : module.color}`} />
                        <div className="flex-1 text-left">
                          <div className="font-medium text-sm leading-tight">{module.title}</div>
                          <div className="flex items-center mt-1 space-x-2">
                            <Progress 
                              value={module.progress} 
                              className={`h-1.5 w-16 ${selectedModule === module.id ? '[&>div]:bg-white/80' : ''}`}
                            />
                            <span className={`text-xs ${selectedModule === module.id ? 'text-white/80' : 'text-slate-500'}`}>
                              {module.progress}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </Button>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Module Details */}
          <div className="lg:col-span-3">
            {currentModule && (
              <div className="space-y-6">
                {/* Module Header */}
                <Card className="bg-white/80 backdrop-blur border-slate-200 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-16 h-16 rounded-2xl ${currentModule.bgColor} flex items-center justify-center shadow-lg`}>
                          <currentModule.icon className={`w-8 h-8 ${currentModule.color}`} />
                        </div>
                        <div>
                          <CardTitle className="text-2xl text-slate-800">{currentModule.title}</CardTitle>
                          <CardDescription className="text-slate-600 mt-1">
                            {currentModule.subModules.length} components • KES {currentModule.subModules.reduce((sum, sub) => sum + sub.cost, 0).toLocaleString()} budget
                          </CardDescription>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-slate-800">{currentModule.progress}%</div>
                        <Badge className={getStatusBadge(currentModule.status)}>
                          {currentModule.status.replace('-', ' ')}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                {/* Sub-modules */}
                <div className="space-y-4">
                  {currentModule.subModules.map((subModule, index) => (
                    <Collapsible 
                      key={index}
                      open={expandedCards[`${currentModule.id}-${index}`]}
                      onOpenChange={() => toggleCardExpansion(`${currentModule.id}-${index}`)}
                    >
                      <Card className="bg-white/80 backdrop-blur border-slate-200 shadow-lg hover:shadow-xl transition-all duration-200">
                        <CollapsibleTrigger asChild>
                          <CardHeader className="cursor-pointer hover:bg-slate-50/80 transition-colors">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                  {expandedCards[`${currentModule.id}-${index}`] ? 
                                    <ChevronDown className="w-5 h-5 text-slate-400" /> : 
                                    <ChevronRight className="w-5 h-5 text-slate-400" />
                                  }
                                  {getStatusIcon(subModule.status)}
                                </div>
                                <div>
                                  <CardTitle className="text-lg text-slate-800">{subModule.name}</CardTitle>
                                  <CardDescription className="flex items-center mt-1 space-x-4">
                                    <Badge className={getStatusBadge(subModule.status)}>
                                      {subModule.status.replace('-', ' ')}
                                    </Badge>
                                    <span className="text-slate-600">KES {subModule.cost.toLocaleString()}</span>
                                  </CardDescription>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button variant="outline" size="sm" onClick={(e) => e.stopPropagation()}>
                                  <Edit className="w-4 h-4 mr-2" />
                                  Configure
                                </Button>
                                <Button size="sm" onClick={(e) => e.stopPropagation()}>
                                  <Plus className="w-4 h-4 mr-2" />
                                  Start
                                </Button>
                              </div>
                            </div>
                          </CardHeader>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <CardContent className="pt-0">
                            <div className="bg-slate-50/80 rounded-xl p-6 space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <Label className="text-sm font-semibold text-slate-700">Timeline</Label>
                                  <div className="mt-2 space-y-2">
                                    <div className="flex justify-between text-sm">
                                      <span className="text-slate-600">Start Date:</span>
                                      <span className="font-medium">2025-08-15</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-slate-600">Duration:</span>
                                      <span className="font-medium">4-6 weeks</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-slate-600">Priority:</span>
                                      <Badge variant="outline" className="text-xs">High</Badge>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <Label className="text-sm font-semibold text-slate-700">Resources</Label>
                                  <div className="mt-2 space-y-2">
                                    <div className="flex justify-between text-sm">
                                      <span className="text-slate-600">Budget:</span>
                                      <span className="font-medium">KES {subModule.cost.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-slate-600">Team Size:</span>
                                      <span className="font-medium">3-5 members</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-slate-600">Dependencies:</span>
                                      <span className="font-medium text-amber-600">2 modules</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <Label className="text-sm font-semibold text-slate-700">Key Deliverables</Label>
                                <ul className="mt-2 space-y-1 text-sm text-slate-600">
                                  <li>• Comprehensive analysis report with actionable insights</li>
                                  <li>• Data visualization dashboard for ongoing monitoring</li>
                                  <li>• Strategic recommendations and implementation roadmap</li>
                                </ul>
                              </div>
                            </div>
                          </CardContent>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Analytics Modal */}
      <Dialog open={showAnalytics} onOpenChange={setShowAnalytics}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Strategy Analytics Dashboard
            </DialogTitle>
            <DialogDescription>
              Real-time insights and performance metrics for your political strategy
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-6 py-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Module Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {strategyModules.slice(0, 4).map((module) => (
                    <div key={module.id} className="flex items-center justify-between">
                      <span className="text-sm">{module.title}</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={module.progress} className="w-16 h-2" />
                        <span className="text-xs text-slate-600">{module.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Budget Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Total Budget:</span>
                    <span className="font-semibold">KES {(totalEstimatedCost / 1000000).toFixed(1)}M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Allocated:</span>
                    <span className="font-semibold text-green-600">KES 2.1M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Remaining:</span>
                    <span className="font-semibold text-blue-600">KES {((totalEstimatedCost - 2100000) / 1000000).toFixed(1)}M</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}