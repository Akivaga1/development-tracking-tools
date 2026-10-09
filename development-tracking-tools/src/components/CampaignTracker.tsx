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
  Vote, 
  DollarSign, 
  Users, 
  Calendar, 
  MapPin, 
  Target, 
  TrendingUp, 
  Plus,
  Edit,
  BarChart3,
  Phone,
  Mail,
  MessageSquare,
  ChevronDown,
  ChevronRight,
  Bell,
  Download,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  PieChart
} from 'lucide-react';

interface CampaignTrackerProps {
  onBack: () => void;
}

const predefinedTasks = [
  {
    id: 1,
    name: "Strategic Plan",
    description: "Roadmap, voter register analysis, party dynamics",
    estimatedCost: 700000,
    actualCost: 0,
    status: "pending",
    dueDate: "2025-09-15",
    assignedRole: "Strategy Team"
  },
  {
    id: 2,
    name: "Schedule Alignment & Mobilization",
    description: "Activity scheduling, event coordination, digital content planning",
    estimatedCost: 125000,
    actualCost: 0,
    status: "pending",
    dueDate: "2025-09-30",
    assignedRole: "Operations Team"
  },
  {
    id: 3,
    name: "Community Outreach & Mobilization",
    description: "Barazas, door-to-door visits, churches",
    estimatedCost: 325000,
    actualCost: 0,
    status: "pending",
    dueDate: "2025-10-15",
    assignedRole: "Outreach Team"
  },
  {
    id: 4,
    name: "Transport & Logistics",
    description: "Fuel, meals, accommodation, PA systems",
    estimatedCost: 300000,
    actualCost: 0,
    status: "pending",
    dueDate: "2025-10-30",
    assignedRole: "Logistics Team"
  },
  {
    id: 5,
    name: "Digital & Media Campaigns",
    description: "WhatsApp, social media, boosted posts",
    estimatedCost: 175000,
    actualCost: 0,
    status: "pending",
    dueDate: "2025-10-20",
    assignedRole: "Media Team"
  },
  {
    id: 6,
    name: "Polling Agents & Election Day Operations",
    description: "Recruitment, training, support logistics",
    estimatedCost: 275000,
    actualCost: 0,
    status: "pending",
    dueDate: "2025-11-01",
    assignedRole: "Election Team"
  },
  {
    id: 7,
    name: "Post-Election Implementation",
    description: "100-day plan, office setup, community outreach",
    estimatedCost: 150000,
    actualCost: 0,
    status: "pending",
    dueDate: "2025-12-15",
    assignedRole: "Implementation Team"
  }
];

const campaignData = {
  overview: {
    name: "Community Leadership 2025",
    status: "Active",
    startDate: "2025-01-15",
    electionDate: "2025-11-05",
    daysRemaining: 98
  }
};

export function CampaignTracker({ onBack }: CampaignTrackerProps) {
  const [activePhase, setActivePhase] = useState('pre-election');
  const [tasks, setTasks] = useState(predefinedTasks);
  const [surveys, setSurveys] = useState<any[]>([]);
  const [newSurvey, setNewSurvey] = useState('');
  const [filterRole, setFilterRole] = useState('All Roles');
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [expandedTasks, setExpandedTasks] = useState<{ [key: number]: boolean }>({});

  const [newTask, setNewTask] = useState({
    name: '',
    description: '',
    estimatedCost: 0,
    actualCost: 0,
    status: 'pending',
    dueDate: '',
    assignedRole: ''
  });

  const totalEstimatedCost = tasks.reduce((sum, task) => sum + task.estimatedCost, 0);
  const totalActualCost = tasks.reduce((sum, task) => sum + task.actualCost, 0);

  const filteredTasks = filterRole === 'All Roles' 
    ? tasks 
    : tasks.filter(task => task.assignedRole === filterRole);

  const roles = ['All Roles', ...Array.from(new Set(tasks.map(task => task.assignedRole)))];

  const handleAddSurvey = () => {
    if (newSurvey.trim()) {
      setSurveys([...surveys, {
        id: Date.now(),
        question: newSurvey,
        responses: 0,
        createdAt: new Date().toISOString()
      }]);
      setNewSurvey('');
    }
  };

  const handleAddTask = () => {
    if (newTask.name && newTask.description) {
      setTasks([...tasks, {
        ...newTask,
        id: Date.now()
      }]);
      setNewTask({
        name: '',
        description: '',
        estimatedCost: 0,
        actualCost: 0,
        status: 'pending',
        dueDate: '',
        assignedRole: ''
      });
      setShowAddTaskModal(false);
    }
  };

  const addAllPredefinedTasks = () => {
    setTasks(predefinedTasks);
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

  const toggleTaskExpansion = (taskId: number) => {
    setExpandedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
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
                Back to Leadership Suite
              </Button>
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Vote className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Campaign Command Dashboard
                </h1>
                <p className="text-sm text-muted-foreground">Comprehensive campaign management and tracking</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Badge variant="secondary" className="bg-primary text-primary-foreground">
                {campaignData.overview.daysRemaining} days to election
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs value={activePhase} onValueChange={setActivePhase} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pre-election">Pre-Election</TabsTrigger>
            <TabsTrigger value="election-day">Election Day</TabsTrigger>
            <TabsTrigger value="post-election">Post-Election</TabsTrigger>
          </TabsList>

          {/* Pre-Election Phase */}
          <TabsContent value="pre-election" className="space-y-6">
            {/* Campaign Summary Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-primary" />
                    Total Estimated Cost
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    KES {totalEstimatedCost.toLocaleString()}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center">
                    <PieChart className="w-5 h-5 mr-2 text-secondary-accent" />
                    Total Actual Cost
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    KES {totalActualCost.toLocaleString()}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Filter by Role</CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={filterRole} onValueChange={setFilterRole}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map(role => (
                        <SelectItem key={role} value={role}>{role}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            </div>

            {/* Voter Sentiment & Feedback Loop */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Voter Sentiment & Feedback Loop
                  </span>
                  <Button onClick={handleAddSurvey}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Survey
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter survey question (e.g. How do you feel about policy X?)"
                    value={newSurvey}
                    onChange={(e) => setNewSurvey(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleAddSurvey}>Add Survey</Button>
                </div>
                
                <div className="space-y-3">
                  {surveys.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      No active survey. Create one above
                    </p>
                  ) : (
                    surveys.map(survey => (
                      <Card key={survey.id} className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{survey.question}</p>
                            <p className="text-sm text-muted-foreground">
                              {survey.responses} responses
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            View Results
                          </Button>
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Task Management & Performance Loop */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Task Management & Performance Loop
                  </span>
                  <div className="space-x-2">
                    <Button variant="outline" onClick={addAllPredefinedTasks}>
                      Add All Predefined DTT Components
                    </Button>
                    <Dialog open={showAddTaskModal} onOpenChange={setShowAddTaskModal}>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="w-4 h-4 mr-2" />
                          Add New Task
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>Add New Task</DialogTitle>
                          <DialogDescription>
                            Create a new campaign task with details and assignments.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="task-name">Task Name</Label>
                              <Input
                                id="task-name"
                                value={newTask.name}
                                onChange={(e) => setNewTask({...newTask, name: e.target.value})}
                                placeholder="e.g. Conduct door-to-door in Sector A"
                              />
                            </div>
                            <div>
                              <Label htmlFor="assigned-role">Assigned Role</Label>
                              <Select value={newTask.assignedRole} onValueChange={(value) => setNewTask({...newTask, assignedRole: value})}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Strategy Team">Strategy Team</SelectItem>
                                  <SelectItem value="Operations Team">Operations Team</SelectItem>
                                  <SelectItem value="Outreach Team">Outreach Team</SelectItem>
                                  <SelectItem value="Logistics Team">Logistics Team</SelectItem>
                                  <SelectItem value="Media Team">Media Team</SelectItem>
                                  <SelectItem value="Election Team">Election Team</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                              id="description"
                              value={newTask.description}
                              onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                              placeholder="Task description and requirements"
                            />
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <Label htmlFor="estimated-cost">Estimated Cost (KES)</Label>
                              <Input
                                id="estimated-cost"
                                type="number"
                                value={newTask.estimatedCost}
                                onChange={(e) => setNewTask({...newTask, estimatedCost: Number(e.target.value)})}
                              />
                            </div>
                            <div>
                              <Label htmlFor="actual-cost">Actual Cost (KES)</Label>
                              <Input
                                id="actual-cost"
                                type="number"
                                value={newTask.actualCost}
                                onChange={(e) => setNewTask({...newTask, actualCost: Number(e.target.value)})}
                              />
                            </div>
                            <div>
                              <Label htmlFor="due-date">Due Date</Label>
                              <Input
                                id="due-date"
                                type="date"
                                value={newTask.dueDate}
                                onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="status">Status</Label>
                            <Select value={newTask.status} onValueChange={(value) => setNewTask({...newTask, status: value})}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="in-progress">In Progress</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setShowAddTaskModal(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleAddTask}>
                            Add Task
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredTasks.map(task => (
                    <Collapsible 
                      key={task.id}
                      open={expandedTasks[task.id]}
                      onOpenChange={() => toggleTaskExpansion(task.id)}
                    >
                      <Card className="border-border/30">
                        <CollapsibleTrigger asChild>
                          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                {expandedTasks[task.id] ? 
                                  <ChevronDown className="w-4 h-4" /> : 
                                  <ChevronRight className="w-4 h-4" />
                                }
                                <div>
                                  <CardTitle className="text-lg">{task.name}</CardTitle>
                                  <CardDescription className="flex items-center mt-1">
                                    {getStatusIcon(task.status)}
                                    <span className="ml-2 capitalize">{task.status}</span>
                                    <span className="ml-4">Due: {task.dueDate}</span>
                                  </CardDescription>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-semibold">
                                  KES {task.estimatedCost.toLocaleString()}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {task.assignedRole}
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <CardContent className="pt-0">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-4 bg-muted/20 rounded-lg">
                              <div>
                                <Label className="text-sm font-medium">Description</Label>
                                <p className="mt-1 text-sm">{task.description}</p>
                              </div>
                              <div className="space-y-3">
                                <div className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">Estimated Cost:</span>
                                  <span className="font-medium">KES {task.estimatedCost.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">Actual Cost:</span>
                                  <span className="font-medium">KES {task.actualCost.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">Status:</span>
                                  <Badge variant="outline" className="capitalize">
                                    {task.status}
                                  </Badge>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">Assigned Role:</span>
                                  <span className="font-medium">{task.assignedRole}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-end mt-4 space-x-2">
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4 mr-2" />
                                Edit Task
                              </Button>
                              <Button variant="outline" size="sm">
                                <FileText className="w-4 h-4 mr-2" />
                                View Details
                              </Button>
                            </div>
                          </CardContent>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Election Day Phase */}
          <TabsContent value="election-day" className="space-y-6">
            <div className="text-center py-16">
              <Vote className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-bold mb-2">Election Day Operations</h2>
              <p className="text-muted-foreground mb-6">
                Real-time monitoring and coordination for election day activities
              </p>
              <Button size="lg">
                <Bell className="w-4 h-4 mr-2" />
                Launch Election Day Dashboard
              </Button>
            </div>
          </TabsContent>

          {/* Post-Election Phase */}
          <TabsContent value="post-election" className="space-y-6">
            <div className="text-center py-16">
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
              <h2 className="text-2xl font-bold mb-2">Post-Election Implementation</h2>
              <p className="text-muted-foreground mb-6">
                100-day plan execution and community engagement tracking
              </p>
              <Button size="lg">
                <Target className="w-4 h-4 mr-2" />
                Start Implementation Phase
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}