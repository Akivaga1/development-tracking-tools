import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, BookOpen, TrendingUp, Clock, Award, Star, Play, CheckCircle, Target, Users, Brain, Code } from 'lucide-react';

interface SkillDevelopmentProps {
  onBack: () => void;
}

const skillCategories = [
  {
    id: 'technical',
    name: 'Technical Skills',
    icon: Code,
    color: 'text-blue-500',
    skills: [
      { name: 'JavaScript', level: 85, category: 'Programming', trend: 'up', hours: 120 },
      { name: 'React', level: 75, category: 'Frontend', trend: 'up', hours: 95 },
      { name: 'Python', level: 60, category: 'Programming', trend: 'stable', hours: 80 },
      { name: 'SQL', level: 70, category: 'Database', trend: 'up', hours: 60 }
    ]
  },
  {
    id: 'leadership',
    name: 'Leadership',
    icon: Users,
    color: 'text-green-500',
    skills: [
      { name: 'Team Management', level: 80, category: 'Management', trend: 'up', hours: 50 },
      { name: 'Strategic Thinking', level: 65, category: 'Strategy', trend: 'up', hours: 40 },
      { name: 'Public Speaking', level: 55, category: 'Communication', trend: 'stable', hours: 30 },
      { name: 'Conflict Resolution', level: 70, category: 'Management', trend: 'up', hours: 35 }
    ]
  },
  {
    id: 'creative',
    name: 'Creative',
    icon: Brain,
    color: 'text-purple-500',
    skills: [
      { name: 'Design Thinking', level: 75, category: 'Innovation', trend: 'up', hours: 45 },
      { name: 'UI/UX Design', level: 60, category: 'Design', trend: 'up', hours: 55 },
      { name: 'Creative Writing', level: 70, category: 'Communication', trend: 'stable', hours: 25 },
      { name: 'Problem Solving', level: 85, category: 'Analysis', trend: 'up', hours: 90 }
    ]
  }
];

const learningPaths = [
  {
    id: 'fullstack',
    title: 'Full-Stack Developer',
    description: 'Complete journey from frontend to backend development',
    duration: '6 months',
    difficulty: 'Intermediate',
    progress: 65,
    modules: 12,
    completed: 8,
    skills: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
    status: 'In Progress'
  },
  {
    id: 'leadership',
    title: 'Leadership Excellence',
    description: 'Develop essential leadership and management skills',
    duration: '4 months',
    difficulty: 'Advanced',
    progress: 30,
    modules: 8,
    completed: 2,
    skills: ['Team Management', 'Strategic Planning', 'Communication'],
    status: 'In Progress'
  },
  {
    id: 'innovation',
    title: 'Innovation & Creativity',
    description: 'Master creative thinking and innovation methodologies',
    duration: '3 months',
    difficulty: 'Beginner',
    progress: 90,
    modules: 6,
    completed: 5,
    skills: ['Design Thinking', 'Creative Problem Solving', 'Ideation'],
    status: 'Almost Complete'
  }
];

const upcomingCertifications = [
  {
    name: 'AWS Solutions Architect',
    provider: 'Amazon Web Services',
    examDate: '2024-03-15',
    preparationProgress: 45,
    estimatedHours: 80
  },
  {
    name: 'Certified Scrum Master',
    provider: 'Scrum Alliance',
    examDate: '2024-04-20',
    preparationProgress: 20,
    estimatedHours: 40
  },
  {
    name: 'Google Analytics Certified',
    provider: 'Google',
    examDate: '2024-02-28',
    preparationProgress: 75,
    estimatedHours: 25
  }
];

const skillRecommendations = [
  {
    skill: 'TypeScript',
    reason: 'Based on your JavaScript proficiency',
    difficulty: 'Intermediate',
    estimatedTime: '2 weeks',
    priority: 'High'
  },
  {
    skill: 'Docker',
    reason: 'Complements your full-stack development path',
    difficulty: 'Intermediate',
    estimatedTime: '3 weeks',
    priority: 'Medium'
  },
  {
    skill: 'Data Visualization',
    reason: 'Enhances your analytics capabilities',
    difficulty: 'Beginner',
    estimatedTime: '4 weeks',
    priority: 'Medium'
  }
];

export function SkillDevelopment({ onBack }: SkillDevelopmentProps) {
  const [activeCategory, setActiveCategory] = useState('technical');

  const getSkillColor = (level: number) => {
    if (level >= 80) return 'bg-green-500';
    if (level >= 60) return 'bg-blue-500';
    if (level >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
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
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                  Skill Development
                </h1>
                <p className="text-sm text-muted-foreground">Track and develop your professional skills</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-violet-800 text-white">Active Learning</Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="skills" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="skills">Skills Overview</TabsTrigger>
            <TabsTrigger value="paths">Learning Paths</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          {/* Skills Overview Tab */}
          <TabsContent value="skills" className="space-y-6">
            {/* Skill Categories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {skillCategories.map((category) => (
                <Card 
                  key={category.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-strong ${
                    activeCategory === category.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center text-lg">
                      <category.icon className={`w-5 h-5 mr-2 ${category.color}`} />
                      {category.name}
                    </CardTitle>
                    <CardDescription>
                      {category.skills.length} skills tracked
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {category.skills.slice(0, 2).map((skill) => (
                        <div key={skill.name} className="flex items-center justify-between">
                          <span className="text-sm">{skill.name}</span>
                          <span className="text-sm font-medium">{skill.level}%</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Detailed Skills View */}
            {activeCategory && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {skillCategories.find(cat => cat.id === activeCategory)?.name} Skills
                  </CardTitle>
                  <CardDescription>
                    Detailed breakdown of your skill levels and progress
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {skillCategories
                      .find(cat => cat.id === activeCategory)
                      ?.skills.map((skill) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium">{skill.name}</h4>
                            <Badge variant="outline" className="text-xs">
                              {skill.category}
                            </Badge>
                            {skill.trend === 'up' && (
                              <TrendingUp className="w-4 h-4 text-green-500" />
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-muted-foreground">
                              {skill.hours}h practiced
                            </span>
                            <span className="font-bold">{skill.level}%</span>
                          </div>
                        </div>
                        <Progress value={skill.level} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Learning Paths Tab */}
          <TabsContent value="paths" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {learningPaths.map((path) => (
                <Card key={path.id} className="hover:shadow-strong transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{path.title}</CardTitle>
                      <Badge 
                        variant="outline" 
                        className={getDifficultyColor(path.difficulty)}
                      >
                        {path.difficulty}
                      </Badge>
                    </div>
                    <CardDescription>{path.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {path.duration}
                      </span>
                      <span>{path.completed}/{path.modules} modules</span>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm">{path.progress}%</span>
                      </div>
                      <Progress value={path.progress} className="h-2" />
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {path.skills.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {path.skills.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{path.skills.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <Button className="w-full" size="sm">
                      <Play className="w-4 h-4 mr-2" />
                      Continue Learning
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Certifications Tab */}
          <TabsContent value="certifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Certifications</CardTitle>
                <CardDescription>
                  Track your certification preparation and exam schedules
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {upcomingCertifications.map((cert, index) => (
                    <div key={index} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{cert.name}</h4>
                          <p className="text-sm text-muted-foreground">{cert.provider}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{cert.examDate}</p>
                          <p className="text-xs text-muted-foreground">Exam Date</p>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">Preparation Progress</span>
                          <span className="text-sm">{cert.preparationProgress}%</span>
                        </div>
                        <Progress value={cert.preparationProgress} className="h-2" />
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Estimated study time: {cert.estimatedHours}h</span>
                        <Button variant="outline" size="sm">
                          Study Plan
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Recommendations Tab */}
          <TabsContent value="recommendations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Skill Recommendations</CardTitle>
                <CardDescription>
                  AI-powered suggestions based on your current skills and career goals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skillRecommendations.map((rec, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{rec.skill}</h4>
                        <div className="flex space-x-2">
                          <Badge 
                            variant="outline" 
                            className={getPriorityColor(rec.priority)}
                          >
                            {rec.priority} Priority
                          </Badge>
                          <Badge 
                            variant="outline"
                            className={getDifficultyColor(rec.difficulty)}
                          >
                            {rec.difficulty}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{rec.reason}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">
                          <Clock className="w-4 h-4 inline mr-1" />
                          {rec.estimatedTime}
                        </span>
                        <Button variant="outline" size="sm">
                          <Target className="w-4 h-4 mr-2" />
                          Add to Goals
                        </Button>
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