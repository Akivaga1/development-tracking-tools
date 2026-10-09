import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Smile, 
  Meh, 
  Frown, 
  Target, 
  CheckCircle2, 
  Circle,
  TrendingUp,
  BookOpen,
  Calendar,
  Plus,
  ArrowLeft
} from 'lucide-react';

interface MoodEntry {
  emoji: string;
  label: string;
  value: number;
}

interface Goal {
  id: string;
  title: string;
  progress: number;
  target: number;
  category: string;
  deadline: string;
}

interface Habit {
  id: string;
  title: string;
  completed: boolean;
  streak: number;
}

const moodOptions: MoodEntry[] = [
  { emoji: '😊', label: 'Great', value: 5 },
  { emoji: '🙂', label: 'Good', value: 4 },
  { emoji: '😐', label: 'Okay', value: 3 },
  { emoji: '😔', label: 'Low', value: 2 },
  { emoji: '😞', label: 'Difficult', value: 1 }
];

const mockGoals: Goal[] = [
  {
    id: '1',
    title: 'Read 24 books this year',
    progress: 16,
    target: 24,
    category: 'Learning',
    deadline: '2025-12-31'
  },
  {
    id: '2',
    title: 'Exercise 150 minutes weekly',
    progress: 120,
    target: 150,
    category: 'Health',
    deadline: 'Weekly'
  },
  {
    id: '3',
    title: 'Learn Spanish basics',
    progress: 35,
    target: 100,
    category: 'Skill',
    deadline: '2025-06-30'
  }
];

const mockHabits: Habit[] = [
  { id: '1', title: 'Morning meditation', completed: true, streak: 12 },
  { id: '2', title: 'Drink 8 glasses of water', completed: false, streak: 8 },
  { id: '3', title: 'Write in journal', completed: true, streak: 5 },
  { id: '4', title: 'Take vitamins', completed: false, streak: 15 }
];

interface PersonalTrackerProps {
  onBack: () => void;
}

export function PersonalTracker({ onBack }: PersonalTrackerProps) {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [habits, setHabits] = useState(mockHabits);

  const toggleHabit = (habitId: string) => {
    setHabits(habits.map(habit => 
      habit.id === habitId 
        ? { ...habit, completed: !habit.completed }
        : habit
    ));
  };

  const getProgressColor = (progress: number, target: number) => {
    const percentage = (progress / target) * 100;
    if (percentage >= 90) return 'bg-secondary-accent';
    if (percentage >= 70) return 'bg-accent-bright';
    return 'bg-primary';
  };

  const completedHabits = habits.filter(h => h.completed).length;
  const totalHabits = habits.length;
  const habitProgress = (completedHabits / totalHabits) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="w-10 h-10 bg-gradient-growth rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Personal Development Tracker</h1>
              <p className="text-sm text-muted-foreground">Track your daily progress and growth</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Daily Check-in */}
        <div className="mb-8 animate-fade-in">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Daily Check-in</h2>
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg text-foreground">How are you feeling today?</CardTitle>
              <CardDescription>Track your daily mood to identify patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4 mb-4">
                {moodOptions.map((mood) => (
                  <button
                    key={mood.value}
                    onClick={() => setSelectedMood(mood.value)}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 hover:scale-110 ${
                      selectedMood === mood.value
                        ? 'border-primary shadow-medium bg-accent'
                        : 'border-border hover:border-accent-bright'
                    }`}
                  >
                    <div className="text-2xl mb-1">{mood.emoji}</div>
                    <div className="text-xs text-muted-foreground">{mood.label}</div>
                  </button>
                ))}
              </div>
              {selectedMood && (
                <div className="p-3 bg-accent rounded-lg">
                  <p className="text-sm text-accent-foreground">
                    Mood logged! Your 7-day average is trending positive 📈
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Today's Habits */}
        <div className="mb-8 animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">Today's Habits</h2>
            <Badge variant="secondary">
              {completedHabits}/{totalHabits} completed
            </Badge>
          </div>
          
          <Card className="border-border/50 mb-4">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Daily Progress</span>
                <span className="text-sm text-muted-foreground">{Math.round(habitProgress)}%</span>
              </div>
              <Progress value={habitProgress} className="h-2" />
            </CardContent>
          </Card>

          <div className="grid gap-3">
            {habits.map((habit) => (
              <Card 
                key={habit.id}
                className={`cursor-pointer transition-all duration-300 border-border/50 ${
                  habit.completed 
                    ? 'bg-accent/20 border-secondary-accent/30' 
                    : 'hover:shadow-soft'
                }`}
                onClick={() => toggleHabit(habit.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {habit.completed ? (
                        <CheckCircle2 className="w-6 h-6 text-secondary-accent" />
                      ) : (
                        <Circle className="w-6 h-6 text-muted-foreground" />
                      )}
                      <div>
                        <p className={`font-medium ${
                          habit.completed 
                            ? 'text-secondary-accent' 
                            : 'text-foreground'
                        }`}>
                          {habit.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {habit.streak} day streak
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Streak</div>
                      <div className="font-bold text-foreground">{habit.streak}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Goals Progress */}
        <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">Goals Progress</h2>
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-1" />
              Add Goal
            </Button>
          </div>
          
          <div className="grid gap-4">
            {mockGoals.map((goal) => {
              const percentage = (goal.progress / goal.target) * 100;
              return (
                <Card key={goal.id} className="border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-foreground mb-1">{goal.title}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {goal.category}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Progress</div>
                        <div className="font-bold text-foreground">
                          {goal.progress}/{goal.target}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-muted-foreground">
                          {Math.round(percentage)}% complete
                        </span>
                        <span className="text-sm text-muted-foreground">
                          Due: {goal.deadline}
                        </span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                    
                    {percentage >= 90 && (
                      <div className="flex items-center text-secondary-accent text-sm">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        Almost there! Keep it up!
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-xl font-semibold mb-4 text-foreground">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Card className="cursor-pointer hover:shadow-medium transition-all duration-300 transform hover:scale-105 border-border/50">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 mx-auto mb-2 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium text-foreground mb-1">Journal Entry</p>
                <p className="text-xs text-muted-foreground">Write about your day</p>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-medium transition-all duration-300 transform hover:scale-105 border-border/50">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 mx-auto mb-2 bg-gradient-growth rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium text-foreground mb-1">Add Goal</p>
                <p className="text-xs text-muted-foreground">Set a new objective</p>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-medium transition-all duration-300 transform hover:scale-105 border-border/50">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 mx-auto mb-2 bg-gradient-hero rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium text-foreground mb-1">View Timeline</p>
                <p className="text-xs text-muted-foreground">See progress history</p>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-medium transition-all duration-300 transform hover:scale-105 border-border/50">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 mx-auto mb-2 bg-gradient-wellness rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium text-foreground mb-1">Analytics</p>
                <p className="text-xs text-muted-foreground">View detailed stats</p>
              </CardContent>
            </Card>
            
            <Card 
              className="cursor-pointer hover:shadow-medium transition-all duration-300 transform hover:scale-105 border-border/50"
              onClick={() => setSelectedMood(selectedMood ? null : 4)}
            >
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 mx-auto mb-2 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <Smile className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium text-foreground mb-1">Quick Mood</p>
                <p className="text-xs text-muted-foreground">Log feeling now</p>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-medium transition-all duration-300 transform hover:scale-105 border-border/50">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 mx-auto mb-2 bg-green-500 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium text-foreground mb-1">Quick Check</p>
                <p className="text-xs text-muted-foreground">Mark habits done</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}