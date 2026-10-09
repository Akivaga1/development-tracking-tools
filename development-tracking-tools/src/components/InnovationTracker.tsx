import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Lightbulb, Plus, Search, Filter, Star, Clock, Users, TrendingUp, CheckCircle, AlertCircle, Zap } from 'lucide-react';

interface InnovationTrackerProps {
  onBack: () => void;
}

const ideas = [
  {
    id: '1',
    title: 'Mobile App Optimization',
    description: 'Improve app loading time by implementing lazy loading and code splitting techniques',
    category: 'Technology',
    status: 'approved',
    priority: 'high',
    submittedDate: '2025-01-15',
    implementationDate: '2025-02-01',
    impact: 'High',
    votes: 23,
    author: 'You',
    tags: ['mobile', 'performance', 'optimization']
  },
  {
    id: '2',
    title: 'Customer Feedback Dashboard',
    description: 'Create a real-time dashboard to track and analyze customer feedback across all channels',
    category: 'Product',
    status: 'in-review',
    priority: 'medium',
    submittedDate: '2025-01-20',
    impact: 'Medium',
    votes: 18,
    author: 'Sarah Chen',
    tags: ['dashboard', 'feedback', 'analytics']
  },
  {
    id: '3',
    title: 'AI-Powered Documentation',
    description: 'Implement AI to automatically generate and update technical documentation',
    category: 'AI/ML',
    status: 'brainstorming',
    priority: 'low',
    submittedDate: '2025-01-22',
    impact: 'High',
    votes: 31,
    author: 'Mike Johnson',
    tags: ['ai', 'documentation', 'automation']
  },
  {
    id: '4',
    title: 'Green Energy Initiative',
    description: 'Transition office spaces to renewable energy sources and implement energy-saving measures',
    category: 'Sustainability',
    status: 'approved',
    priority: 'high',
    submittedDate: '2025-01-10',
    implementationDate: '2025-03-01',
    impact: 'High',
    votes: 45,
    author: 'Emma Wilson',
    tags: ['sustainability', 'energy', 'environment']
  }
];

const categories = ['All', 'Technology', 'Product', 'AI/ML', 'Sustainability', 'Process'];
const statuses = ['All', 'brainstorming', 'in-review', 'approved', 'implemented'];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'approved': return 'bg-green-100 text-green-800 border-green-200';
    case 'in-review': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'implemented': return 'bg-blue-100 text-blue-800 border-blue-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getPriorityIcon = (priority: string) => {
  switch (priority) {
    case 'high': return <AlertCircle className="w-4 h-4 text-red-500" />;
    case 'medium': return <Clock className="w-4 h-4 text-yellow-500" />;
    default: return <CheckCircle className="w-4 h-4 text-green-500" />;
  }
};

export function InnovationTracker({ onBack }: InnovationTrackerProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredIdeas = ideas.filter(idea => {
    const matchesCategory = selectedCategory === 'All' || idea.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || idea.status === selectedStatus;
    const matchesSearch = idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         idea.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const stats = [
    {
      title: 'Total Ideas',
      value: ideas.length.toString(),
      description: 'Submitted this quarter',
      icon: Lightbulb,
      color: 'text-primary'
    },
    {
      title: 'Approved',
      value: ideas.filter(i => i.status === 'approved').length.toString(),
      description: 'Ready for implementation',
      icon: CheckCircle,
      color: 'text-green-500'
    },
    {
      title: 'High Impact',
      value: ideas.filter(i => i.impact === 'High').length.toString(),
      description: 'Game-changing ideas',
      icon: Zap,
      color: 'text-amber-500'
    }
  ];

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
              <div className="w-10 h-10 rounded-lg bg-gradient-growth flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                  Innovation Tracker
                </h1>
                <p className="text-sm text-muted-foreground">Manage ideas and track innovation projects</p>
              </div>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-primary text-white hover:opacity-90">
                  <Plus className="w-4 h-4 mr-2" />
                  Submit Idea
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Submit New Innovation Idea</DialogTitle>
                  <DialogDescription>
                    Share your innovative ideas to help improve our organization
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Title</label>
                    <Input placeholder="Brief, descriptive title for your idea" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Description</label>
                    <Textarea 
                      placeholder="Detailed description of your innovation idea" 
                      className="mt-1 min-h-[100px]" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground">Category</label>
                      <select className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>Technology</option>
                        <option>Product</option>
                        <option>AI/ML</option>
                        <option>Sustainability</option>
                        <option>Process</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Expected Impact</label>
                      <select className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button className="bg-gradient-primary text-white hover:opacity-90">
                      Submit Idea
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Stats */}
        <div className="mb-8 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
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
        </div>

        {/* Filters */}
        <div className="mb-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search ideas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                {statuses.map(status => <option key={status} value={status}>{status}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Ideas Grid */}
        <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredIdeas.map((idea) => (
              <Card key={idea.id} className="border-border/50 hover:shadow-strong transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {getPriorityIcon(idea.priority)}
                        <CardTitle className="text-lg text-foreground">{idea.title}</CardTitle>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {idea.category}
                        </Badge>
                        <Badge className={`text-xs ${getStatusColor(idea.status)}`}>
                          {idea.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground mb-4">
                    {idea.description}
                  </CardDescription>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {idea.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4" />
                        <span>{idea.votes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{idea.author}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{idea.submittedDate}</span>
                    </div>
                  </div>
                  
                  {idea.implementationDate && (
                    <div className="mt-2 p-2 bg-green-50 dark:bg-green-900/20 rounded-md">
                      <p className="text-xs text-green-700 dark:text-green-300">
                        Implementation scheduled: {idea.implementationDate}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}