import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Target, TrendingUp, Calendar, Plus, CheckCircle, Clock, AlertCircle, Trophy, Lightbulb, Users, BookOpen } from 'lucide-react';

interface CareerGoalsProps {
  onBack: () => void;
}

const careerGoals = [
  {
    id: 1,
    title: 'Become Senior Full-Stack Developer',
    description: 'Advance to senior developer role with full-stack expertise and team leadership responsibilities',
    category: 'Career Advancement',
    priority: 'High',
    status: 'In Progress',
    progress: 75,
    deadline: '2024-12-31',
    milestones: [
      { name: 'Complete React Advanced Course', completed: true, date: '2024-01-15' },
      { name: 'Build 3 Full-Stack Projects', completed: true, date: '2024-02-28' },
      { name: 'Get AWS Certification', completed: false, date: '2024-06-30' },
      { name: 'Lead a Development Team', completed: false, date: '2024-10-15' }
    ],
    skills: ['React', 'Node.js', 'AWS', 'Leadership'],
    estimatedCompletion: '8 months'
  },
  {
    id: 2,
    title: 'Launch Tech Startup',
    description: 'Start my own technology company focused on AI-powered productivity tools',
    category: 'Entrepreneurship',
    priority: 'High',
    status: 'Planning',
    progress: 25,
    deadline: '2025-06-30',
    milestones: [
      { name: 'Market Research & Validation', completed: true, date: '2025-01-30' },
      { name: 'Build MVP Product', completed: false, date: '2025-08-15' },
      { name: 'Secure Initial Funding', completed: false, date: '2025-11-30' },
      { name: 'Launch Beta Version', completed: false, date: '2025-03-15' }
    ],
    skills: ['Business Strategy', 'Product Management', 'Fundraising'],
    estimatedCompletion: '18 months'
  },
  {
    id: 3,
    title: 'Earn MBA Degree',
    description: 'Complete Master of Business Administration to enhance business and leadership skills',
    category: 'Education',
    priority: 'Medium',
    status: 'In Progress',
    progress: 60,
    deadline: '2025-05-30',
    milestones: [
      { name: 'Complete Application Process', completed: true, date: '2024-12-15' },
      { name: 'Finish Year 1 Coursework', completed: true, date: '2025-05-30' },
      { name: 'Complete Internship', completed: false, date: '2025-08-30' },
      { name: 'Finish Capstone Project', completed: false, date: '2025-04-15' }
    ],
    skills: ['Strategic Thinking', 'Finance', 'Marketing', 'Operations'],
    estimatedCompletion: '15 months'
  },
  {
    id: 4,
    title: 'Publish Technical Blog',
    description: 'Build personal brand by consistently publishing high-quality technical content',
    category: 'Personal Branding',
    priority: 'Medium',
    status: 'Active',
    progress: 40,
    deadline: '2024-12-31',
    milestones: [
      { name: 'Set up Blog Platform', completed: true, date: '2024-01-01' },
      { name: 'Publish 10 Articles', completed: true, date: '2024-03-15' },
      { name: 'Reach 1000 Subscribers', completed: false, date: '2024-09-30' },
      { name: 'Guest Post on Major Platforms', completed: false, date: '2024-11-30' }
    ],
    skills: ['Technical Writing', 'Content Marketing', 'SEO'],
    estimatedCompletion: '10 months'
  },
  {
    id: 5,
    title: 'Master Machine Learning',
    description: 'Develop deep expertise in machine learning and AI technologies',
    category: 'Skill Development',
    priority: 'Medium',
    status: 'Planning',
    progress: 15,
    deadline: '2025-03-31',
    milestones: [
      { name: 'Complete ML Fundamentals Course', completed: false, date: '2025-06-30' },
      { name: 'Build 5 ML Projects', completed: false, date: '2025-10-31' },
      { name: 'Get Google ML Certification', completed: false, date: '2025-12-31' },
      { name: 'Contribute to Open Source ML Project', completed: false, date: '2025-02-28' }
    ],
    skills: ['Python', 'TensorFlow', 'Statistics', 'Data Analysis'],
    estimatedCompletion: '15 months'
  }
];

const goalTemplates = [
  {
    category: 'Career Advancement',
    title: 'Get Promoted to [Position]',
    description: 'Advance to the next level in your career with increased responsibilities',
    suggestedMilestones: ['Identify required skills', 'Complete relevant training', 'Take on leadership projects', 'Build relationships with stakeholders']
  },
  {
    category: 'Skill Development',
    title: 'Master [Technology/Skill]',
    description: 'Develop deep expertise in a specific technology or skill area',
    suggestedMilestones: ['Complete online courses', 'Build practice projects', 'Get certified', 'Apply skills in real projects']
  },
  {
    category: 'Entrepreneurship',
    title: 'Launch Side Business',
    description: 'Start and grow a profitable side business or consulting practice',
    suggestedMilestones: ['Validate business idea', 'Build MVP', 'Acquire first customers', 'Scale operations']
  },
  {
    category: 'Education',
    title: 'Complete Advanced Degree',
    description: 'Earn an advanced degree to enhance career prospects',
    suggestedMilestones: ['Research programs', 'Complete applications', 'Secure funding', 'Graduate successfully']
  }
];

export function CareerGoals({ onBack }: CareerGoalsProps) {
  const [selectedGoal, setSelectedGoal] = useState<number | null>(null);
  const [showCreateGoal, setShowCreateGoal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Planning': return 'bg-yellow-100 text-yellow-800';
      case 'On Hold': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Career Advancement': return Trophy;
      case 'Skill Development': return BookOpen;
      case 'Education': return BookOpen;
      case 'Personal Branding': return Users;
      case 'Entrepreneurship': return Lightbulb;
      default: return Target;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateDaysRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
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
                Back to Career Development
              </Button>
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                  Career Goals
                </h1>
                <p className="text-sm text-muted-foreground">Set, track, and achieve your professional milestones</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-violet-800 text-white">
                {careerGoals.length} Active Goals
              </Badge>
              <Dialog open={showCreateGoal} onOpenChange={setShowCreateGoal}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    New Goal
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Career Goal</DialogTitle>
                    <DialogDescription>
                      Set a new professional goal with milestones and tracking
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="title">Goal Title</Label>
                        <Input id="title" placeholder="Enter goal title" />
                      </div>
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="career">Career Advancement</SelectItem>
                            <SelectItem value="skill">Skill Development</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="entrepreneurship">Entrepreneurship</SelectItem>
                            <SelectItem value="branding">Personal Branding</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea id="description" placeholder="Describe your goal in detail" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="priority">Priority</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="deadline">Target Deadline</Label>
                        <Input id="deadline" type="date" />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setShowCreateGoal(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => setShowCreateGoal(false)}>
                        Create Goal
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="active">Active Goals</TabsTrigger>
            <TabsTrigger value="planning">Planning</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          {/* Active Goals Tab */}
          <TabsContent value="active" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {careerGoals
                .filter(goal => goal.status === 'In Progress' || goal.status === 'Active')
                .map((goal) => {
                const CategoryIcon = getCategoryIcon(goal.category);
                const daysRemaining = calculateDaysRemaining(goal.deadline);
                
                return (
                  <Card 
                    key={goal.id} 
                    className="cursor-pointer hover:shadow-strong transition-all duration-300"
                    onClick={() => setSelectedGoal(selectedGoal === goal.id ? null : goal.id)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                            <CategoryIcon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{goal.title}</CardTitle>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="outline" className={getStatusColor(goal.status)}>
                                {goal.status}
                              </Badge>
                              <Badge variant="outline" className={getPriorityColor(goal.priority)}>
                                {goal.priority}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{goal.progress}%</p>
                          <p className="text-xs text-muted-foreground">Complete</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <CardDescription>{goal.description}</CardDescription>
                      
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Progress</span>
                          <span className="text-sm">{goal.progress}%</span>
                        </div>
                        <Progress value={goal.progress} className="h-2" />
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(goal.deadline)}
                        </div>
                        <div className={`flex items-center ${daysRemaining < 30 ? 'text-red-500' : 'text-muted-foreground'}`}>
                          <Clock className="w-4 h-4 mr-1" />
                          {daysRemaining > 0 ? `${daysRemaining} days left` : 'Overdue'}
                        </div>
                      </div>

                      {selectedGoal === goal.id && (
                        <div className="mt-4 pt-4 border-t space-y-3">
                          <h4 className="font-medium">Milestones</h4>
                          <div className="space-y-2">
                            {goal.milestones.map((milestone, index) => (
                              <div key={index} className="flex items-center space-x-3">
                                {milestone.completed ? (
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                ) : (
                                  <div className="w-4 h-4 border-2 border-gray-300 rounded-full" />
                                )}
                                <div className="flex-1">
                                  <p className={`text-sm ${milestone.completed ? 'line-through text-muted-foreground' : ''}`}>
                                    {milestone.name}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {milestone.completed ? `Completed ${formatDate(milestone.date)}` : `Due ${formatDate(milestone.date)}`}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="pt-2">
                            <p className="text-sm font-medium mb-2">Required Skills</p>
                            <div className="flex flex-wrap gap-1">
                              {goal.skills.map((skill) => (
                                <Badge key={skill} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Planning Tab */}
          <TabsContent value="planning" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {careerGoals
                .filter(goal => goal.status === 'Planning')
                .map((goal) => {
                const CategoryIcon = getCategoryIcon(goal.category);
                
                return (
                  <Card key={goal.id} className="hover:shadow-strong transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                            <CategoryIcon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{goal.title}</CardTitle>
                            <Badge variant="outline" className={getStatusColor(goal.status)}>
                              {goal.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Est. {goal.estimatedCompletion}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <CardDescription>{goal.description}</CardDescription>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-1" />
                          Target: {formatDate(goal.deadline)}
                        </div>
                        <Button variant="outline" size="sm">
                          Start Planning
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Completed Tab */}
          <TabsContent value="completed" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Completed Goals</CardTitle>
                <CardDescription>
                  Celebrate your achievements and track your professional growth
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No completed goals yet.</p>
                  <p className="text-sm text-muted-foreground">Your achievements will appear here once you complete your goals.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {goalTemplates.map((template, index) => {
                const CategoryIcon = getCategoryIcon(template.category);
                
                return (
                  <Card key={index} className="hover:shadow-strong transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                          <CategoryIcon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{template.title}</CardTitle>
                          <Badge variant="secondary">{template.category}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <CardDescription>{template.description}</CardDescription>
                      
                      <div>
                        <p className="text-sm font-medium mb-2">Suggested Milestones:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {template.suggestedMilestones.map((milestone, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 flex-shrink-0" />
                              {milestone}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <Button className="w-full" onClick={() => setShowCreateGoal(true)}>
                        Use This Template
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}