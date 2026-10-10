import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Smile,
  Target,
  CheckCircle2,
  Circle,
  TrendingUp,
  BookOpen,
  Calendar,
  Plus,
  ArrowLeft,
  Mic,
  MicOff,
  Wind,
  Sparkles,
  Heart,
  Activity,
  BarChart2,
  Play,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MoodEntry {
  emoji: string;
  label: string;
  value: number;
}

interface SmartGoal {
  id: string;
  title: string;
  progress: number;
  target: number;
  category: string;
  deadline: string;
  specific: string;
  measurable: string;
  achievable: string;
  relevant: string;
  timeBound: string;
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
  { emoji: '😞', label: 'Difficult', value: 1 },
];

const mockGoals: SmartGoal[] = [
  {
    id: '1',
    title: 'Executive AI & Data Literacy Mastery',
    progress: 18,
    target: 24,
    category: 'Professional',
    deadline: '2026-03-31',
    specific: 'Complete weekly modules on data-driven decision frameworks',
    measurable: '24 core case studies analyzed',
    achievable: '2 hours scheduled every Tuesday morning',
    relevant: 'Crucial for organizational scale',
    timeBound: 'Q1 completion',
  },
  {
    id: '2',
    title: 'Consistent Zone 2 Cardio & VO2 Max Work',
    progress: 135,
    target: 150,
    category: 'Health',
    deadline: 'Weekly',
    specific: 'Maintain 150 mins aerobic training per week',
    measurable: 'Heart rate telemetry logged via smartwatch',
    achievable: '30 mins per session, 5 days/wk',
    relevant: 'Lowers stress and prevents executive burnout',
    timeBound: 'Sunday weekly review',
  },
  {
    id: '3',
    title: 'Daily Reflective Journaling',
    progress: 26,
    target: 30,
    category: 'Mindfulness',
    deadline: 'Monthly',
    specific: 'Write evening prompts evaluating decisions & gratitude',
    measurable: '30 days continuous logs',
    achievable: '5 mins before bed',
    relevant: 'Fosters high emotional intelligence',
    timeBound: 'End of month audit',
  },
];

const mockHabits: Habit[] = [
  { id: '1', title: 'Morning hydration & meditation (10m)', completed: true, streak: 14 },
  { id: '2', title: 'Review top 3 strategic priorities', completed: true, streak: 9 },
  { id: '3', title: 'Midday screen-break & breathing exercise', completed: false, streak: 6 },
  { id: '4', title: 'Evening PDT journal reflection', completed: false, streak: 12 },
];

interface PersonalTrackerProps {
  onBack: () => void;
}

export function PersonalTracker({ onBack }: PersonalTrackerProps) {
  const { toast } = useToast();
  const [selectedMood, setSelectedMood] = useState<number | null>(4);
  const [habits, setHabits] = useState(mockHabits);
  const [activeTab, setActiveTab] = useState('overview');

  // Voice Tone Analysis State
  const [isRecording, setIsRecording] = useState(false);
  const [voiceAnalyzed, setVoiceAnalyzed] = useState(false);
  const [voiceMetrics, setVoiceMetrics] = useState({
    pitchHz: 185,
    volumeDb: 64,
    tempoWpm: 128,
    stressQuotient: 'Low (18%)',
    sentiment: 'Calm & Confident',
    recommendation: 'Optimal cognitive state for high-stakes decision making.',
  });

  // SMART Goal Creation state
  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalCategory, setNewGoalCategory] = useState('Learning');
  const [newGoalTarget, setNewGoalTarget] = useState('10');

  // Interactive Breathing Exercise State (4-7-8 method)
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [breathSeconds, setBreathSeconds] = useState(4);

  useEffect(() => {
    let interval: any;
    if (isBreathingActive) {
      interval = setInterval(() => {
        setBreathSeconds((prev) => {
          if (prev > 1) return prev - 1;
          // Switch phase
          if (breathPhase === 'Inhale') {
            setBreathPhase('Hold');
            return 7;
          } else if (breathPhase === 'Hold') {
            setBreathPhase('Exhale');
            return 8;
          } else {
            setBreathPhase('Inhale');
            return 4;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isBreathingActive, breathPhase]);

  const toggleHabit = (habitId: string) => {
    setHabits(
      habits.map((habit) =>
        habit.id === habitId ? { ...habit, completed: !habit.completed, streak: habit.completed ? habit.streak - 1 : habit.streak + 1 } : habit
      )
    );
  };

  const handleStartVoiceAnalysis = () => {
    setIsRecording(true);
    setVoiceAnalyzed(false);
    toast({
      title: 'Voice Tone Analysis Started',
      description: 'Analyzing vocal pitch, volume dynamics, and tempo patterns...',
    });

    setTimeout(() => {
      setIsRecording(false);
      setVoiceAnalyzed(true);
      setVoiceMetrics({
        pitchHz: Math.floor(165 + Math.random() * 35),
        volumeDb: Math.floor(58 + Math.random() * 12),
        tempoWpm: Math.floor(115 + Math.random() * 25),
        stressQuotient: 'Moderate (28%)',
        sentiment: 'Focused with mild cadence urgency',
        recommendation: 'Take 2 minutes of 4-7-8 breathing to regulate autonomic nervous tone.',
      });
      toast({
        title: 'Voice Emotional Intelligence Extracted',
        description: 'Vocal pitch, volume & tempo mapped to emotional state.',
      });
    }, 2800);
  };

  const completedHabits = habits.filter((h) => h.completed).length;
  const totalHabits = habits.length;
  const habitProgress = (completedHabits / totalHabits) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/60 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="w-10 h-10 rounded-lg bg-gradient-growth flex items-center justify-center text-white shadow-soft">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold font-heading text-foreground">
                  Personal Development Tracker (PDT Journal)
                </h1>
                <p className="text-sm text-muted-foreground">
                  Daily mood logging, voice tone analysis, SMART goals, habit streaks & weekly insights
                </p>
              </div>
            </div>
            <Badge variant="outline" className="border-primary/40 text-primary font-medium">
              Basic Tier Active
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 max-w-xl mb-6">
            <TabsTrigger value="overview" className="flex items-center gap-1.5 text-xs">
              <Activity className="w-3.5 h-3.5" />
              Daily Check-in
            </TabsTrigger>
            <TabsTrigger value="voice-analysis" className="flex items-center gap-1.5 text-xs">
              <Mic className="w-3.5 h-3.5" />
              Voice Tone
            </TabsTrigger>
            <TabsTrigger value="smart-goals" className="flex items-center gap-1.5 text-xs">
              <Target className="w-3.5 h-3.5" />
              SMART Goals
            </TabsTrigger>
            <TabsTrigger value="wellness" className="flex items-center gap-1.5 text-xs">
              <Wind className="w-3.5 h-3.5" />
              Stress Relief
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: Overview & Daily Check-in */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: Mood & Habits */}
              <div className="lg:col-span-2 space-y-6">
                {/* Mood Logger */}
                <Card className="border-border/60 shadow-soft">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-heading text-foreground">How are you feeling today?</CardTitle>
                    <CardDescription>
                      Emoji check-in paired with emotional intelligence tracking
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-3 mb-4">
                      {moodOptions.map((mood) => (
                        <button
                          key={mood.value}
                          onClick={() => {
                            setSelectedMood(mood.value);
                            toast({
                              title: `Mood Logged: ${mood.label}`,
                              description: 'Your emotional state has been added to your 7-day trend.',
                            });
                          }}
                          className={`p-3.5 rounded-xl border transition-all duration-200 flex flex-col items-center flex-1 min-w-[70px] ${
                            selectedMood === mood.value
                              ? 'border-primary bg-primary/10 shadow-soft text-primary font-bold scale-105'
                              : 'border-border/60 hover:border-primary/40 bg-card text-foreground'
                          }`}
                        >
                          <span className="text-2xl mb-1">{mood.emoji}</span>
                          <span className="text-xs">{mood.label}</span>
                        </button>
                      ))}
                    </div>

                    {selectedMood && (
                      <div className="p-3.5 rounded-xl bg-secondary/50 border border-border/50 flex items-center justify-between text-xs">
                        <span className="text-foreground">
                          <strong>7-Day Mood Average:</strong> 4.3 / 5 (Trending Positive 📈)
                        </span>
                        <Badge variant="outline" className="border-primary/30 text-primary">
                          Emotional Stability: High
                        </Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Daily Habits */}
                <Card className="border-border/60 shadow-soft">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg font-heading text-foreground">Daily Habit Loops</CardTitle>
                        <CardDescription>Scientific habit loops & consistency streaks</CardDescription>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {completedHabits}/{totalHabits} Completed
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-muted-foreground">Today's Progress</span>
                        <span className="font-bold text-foreground">{Math.round(habitProgress)}%</span>
                      </div>
                      <Progress value={habitProgress} className="h-2" />
                    </div>

                    <div className="space-y-2.5">
                      {habits.map((habit) => (
                        <div
                          key={habit.id}
                          onClick={() => toggleHabit(habit.id)}
                          className={`p-3.5 rounded-xl border cursor-pointer transition-all duration-200 flex items-center justify-between ${
                            habit.completed
                              ? 'bg-primary/[0.04] border-primary/40'
                              : 'border-border/50 hover:border-primary/30 bg-card'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {habit.completed ? (
                              <CheckCircle2 className="w-5 h-5 text-primary" />
                            ) : (
                              <Circle className="w-5 h-5 text-muted-foreground/50" />
                            )}
                            <span
                              className={`text-sm ${
                                habit.completed ? 'line-through text-muted-foreground font-normal' : 'text-foreground font-medium'
                              }`}
                            >
                              {habit.title}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-xs font-semibold text-primary">
                            <span>🔥 {habit.streak}d</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column: Weekly Insights & Reflections */}
              <div className="space-y-6">
                <Card className="border-border/60 shadow-soft bg-gradient-to-br from-card to-secondary/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-heading">Weekly AI Insights</CardTitle>
                    <CardDescription>Patterns analyzed across mood & habits</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 text-xs leading-relaxed">
                    <div className="p-3 rounded-lg bg-card border border-border/40 shadow-soft">
                      <strong className="text-foreground block mb-0.5">Peak Energy Window</strong>
                      <span className="text-muted-foreground">
                        Your mood and habit completion peak on Tuesday and Thursday mornings between 08:30 and 11:00.
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-card border border-border/40 shadow-soft">
                      <strong className="text-foreground block mb-0.5">Stress Correlate</strong>
                      <span className="text-muted-foreground">
                        Days with &lt;15 mins break time show a 35% dip in evening reflection scores. Recommended: 5m breathing pause.
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Cognitive Journal Prompt */}
                <Card className="border-border/60 shadow-soft">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-heading">Evening Cognitive Reflection</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-xs text-muted-foreground italic">
                      "What is one tiny win you can celebrate today, and one belief you want to gently release?"
                    </p>
                    <Textarea
                      placeholder="Write your evening thoughts..."
                      rows={3}
                      className="text-xs resize-none"
                    />
                    <Button size="sm" className="w-full bg-primary hover:bg-primary-glow text-white text-xs">
                      Save Journal Entry
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* TAB 2: Voice Tone Analysis */}
          <TabsContent value="voice-analysis" className="space-y-6">
            <Card className="border-border/60 shadow-soft">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-heading">AI Voice Tone & Emotional Intelligence</CardTitle>
                    <CardDescription>
                      Analyze pitch (Hz), volume dynamics (dB), and speaking tempo (WPM) to assess nervous system stress and emotional state
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="border-primary text-primary">
                    AI Emotion Engine
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-6 rounded-2xl bg-secondary/30 border border-border/50 text-center space-y-4">
                  <div
                    className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center transition-all ${
                      isRecording
                        ? 'bg-rose-500 text-white animate-pulse shadow-strong'
                        : 'bg-primary/10 text-primary hover:bg-primary/20'
                    }`}
                  >
                    <Mic className="w-10 h-10" />
                  </div>

                  <div>
                    <h3 className="font-bold text-base text-foreground font-heading">
                      {isRecording ? 'Listening and Extracting Acoustic Features...' : 'Voice Tone Emotional Check-in'}
                    </h3>
                    <p className="text-xs text-muted-foreground max-w-md mx-auto mt-1">
                      Speak freely for 5 seconds about how your day is unfolding. The system measures acoustic biomarkers without recording speech content to protect privacy.
                    </p>
                  </div>

                  <Button
                    onClick={handleStartVoiceAnalysis}
                    disabled={isRecording}
                    className="bg-primary hover:bg-primary-glow text-white shadow-soft px-6"
                  >
                    {isRecording ? (
                      <>
                        <MicOff className="w-4 h-4 mr-2" />
                        Analyzing Audio Dynamics...
                      </>
                    ) : (
                      <>
                        <Mic className="w-4 h-4 mr-2" />
                        Record & Analyze Voice Tone
                      </>
                    )}
                  </Button>
                </div>

                {voiceAnalyzed && (
                  <div className="space-y-4 animate-fade-in">
                    <h4 className="text-sm font-bold text-foreground font-heading">Acoustic Biomarkers & Sentiment</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                      <div className="p-4 rounded-xl border border-border/50 bg-card">
                        <span className="text-xs text-muted-foreground block">Fundamental Pitch</span>
                        <span className="text-2xl font-bold text-primary font-heading">{voiceMetrics.pitchHz} Hz</span>
                        <span className="text-[11px] text-muted-foreground block mt-1">Healthy baseline</span>
                      </div>
                      <div className="p-4 rounded-xl border border-border/50 bg-card">
                        <span className="text-xs text-muted-foreground block">Voice Volume</span>
                        <span className="text-2xl font-bold text-foreground font-heading">{voiceMetrics.volumeDb} dB</span>
                        <span className="text-[11px] text-muted-foreground block mt-1">Balanced dynamics</span>
                      </div>
                      <div className="p-4 rounded-xl border border-border/50 bg-card">
                        <span className="text-xs text-muted-foreground block">Speaking Tempo</span>
                        <span className="text-2xl font-bold text-primary font-heading">{voiceMetrics.tempoWpm} WPM</span>
                        <span className="text-[11px] text-muted-foreground block mt-1">Normal articulation</span>
                      </div>
                      <div className="p-4 rounded-xl border border-border/50 bg-card">
                        <span className="text-xs text-muted-foreground block">Stress Quotient</span>
                        <span className="text-2xl font-bold text-emerald-600 font-heading">{voiceMetrics.stressQuotient}</span>
                        <span className="text-[11px] text-emerald-600 font-medium block mt-1">Regulated</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-primary/[0.04] border border-primary/20 space-y-1">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="font-bold text-sm text-foreground">AI Sentiment Assessment: {voiceMetrics.sentiment}</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed pl-6">
                        {voiceMetrics.recommendation}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 3: SMART Goals */}
          <TabsContent value="smart-goals" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold font-heading text-foreground">SMART Goals Framework</h3>
                <p className="text-sm text-muted-foreground">Specific • Measurable • Achievable • Relevant • Time-Bound</p>
              </div>
              <Button onClick={() => setIsAddingGoal(!isAddingGoal)} size="sm" className="bg-primary hover:bg-primary-glow text-white">
                <Plus className="w-4 h-4 mr-1.5" /> Set New SMART Goal
              </Button>
            </div>

            {isAddingGoal && (
              <Card className="border-primary/40 shadow-medium p-4 space-y-3 bg-card">
                <h4 className="font-bold text-sm text-foreground">Add SMART Goal</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input
                    placeholder="Goal Title (e.g. Complete AWS Cloud Practitioner)"
                    value={newGoalTitle}
                    onChange={(e) => setNewGoalTitle(e.target.value)}
                    className="text-sm"
                  />
                  <Input
                    placeholder="Category (e.g. Career, Health, Finance)"
                    value={newGoalCategory}
                    onChange={(e) => setNewGoalCategory(e.target.value)}
                    className="text-sm"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" onClick={() => setIsAddingGoal(false)}>Cancel</Button>
                  <Button
                    size="sm"
                    className="bg-primary text-white"
                    onClick={() => {
                      if (!newGoalTitle) return;
                      toast({
                        title: 'SMART Goal Added',
                        description: `Goal "${newGoalTitle}" saved to your personal dashboard.`,
                      });
                      setIsAddingGoal(false);
                      setNewGoalTitle('');
                    }}
                  >
                    Save Goal
                  </Button>
                </div>
              </Card>
            )}

            <div className="space-y-4">
              {mockGoals.map((goal) => {
                const percent = Math.min(100, Math.round((goal.progress / goal.target) * 100));
                return (
                  <Card key={goal.id} className="border-border/60 shadow-soft">
                    <CardContent className="p-5">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">{goal.category}</Badge>
                            <h4 className="font-bold text-base text-foreground font-heading">{goal.title}</h4>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">Due: {goal.deadline}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-bold text-primary font-heading">
                            {goal.progress} / {goal.target}
                          </span>
                          <span className="text-xs text-muted-foreground block">{percent}% Completed</span>
                        </div>
                      </div>

                      <Progress value={percent} className="h-2 mb-4" />

                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[11px] pt-3 border-t border-border/40">
                        <div><strong className="text-foreground block">Specific:</strong> <span className="text-muted-foreground">{goal.specific}</span></div>
                        <div><strong className="text-foreground block">Measurable:</strong> <span className="text-muted-foreground">{goal.measurable}</span></div>
                        <div><strong className="text-foreground block">Achievable:</strong> <span className="text-muted-foreground">{goal.achievable}</span></div>
                        <div><strong className="text-foreground block">Relevant:</strong> <span className="text-muted-foreground">{goal.relevant}</span></div>
                        <div><strong className="text-foreground block">Time-bound:</strong> <span className="text-muted-foreground">{goal.timeBound}</span></div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* TAB 4: Stress Relief & 4-7-8 Breathing Guide */}
          <TabsContent value="wellness" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Interactive Breathing Guide */}
              <Card className="border-border/60 shadow-soft text-center">
                <CardHeader>
                  <CardTitle className="text-lg font-heading">4-7-8 Breathing Exercise for Stress</CardTitle>
                  <CardDescription>
                    Clinically backed somatic regulation: Inhale 4s, Hold 7s, Exhale 8s
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Animated Circle */}
                  <div className="relative w-44 h-44 mx-auto flex items-center justify-center">
                    <div
                      className={`absolute inset-0 rounded-full border-4 border-primary/20 transition-all duration-1000 ${
                        isBreathingActive
                          ? breathPhase === 'Inhale'
                            ? 'scale-110 bg-primary/10 border-primary'
                            : breathPhase === 'Hold'
                            ? 'scale-110 bg-amber-500/10 border-amber-500'
                            : 'scale-90 bg-emerald-500/10 border-emerald-500'
                          : 'bg-secondary/40'
                      }`}
                    />
                    <div className="relative z-10">
                      <span className="text-xs uppercase tracking-wider font-bold text-muted-foreground block">
                        {breathPhase}
                      </span>
                      <span className="text-4xl font-extrabold font-heading text-foreground">
                        {breathSeconds}s
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-center gap-3">
                    <Button
                      onClick={() => setIsBreathingActive(!isBreathingActive)}
                      className={isBreathingActive ? 'bg-amber-600 hover:bg-amber-700 text-white' : 'bg-primary text-white'}
                    >
                      {isBreathingActive ? 'Pause Exercise' : 'Start 4-7-8 Breathing'}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsBreathingActive(false);
                        setBreathPhase('Inhale');
                        setBreathSeconds(4);
                      }}
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Stress Reduction Tips */}
              <Card className="border-border/60 shadow-soft">
                <CardHeader>
                  <CardTitle className="text-lg font-heading">Gentle Recommendations</CardTitle>
                  <CardDescription>Targeted somatic & cognitive recovery</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3.5 text-xs">
                  <div className="p-3 rounded-xl bg-secondary/50 border border-border/40 space-y-1">
                    <strong className="text-foreground text-sm block">Physiological Sigh</strong>
                    <p className="text-muted-foreground leading-relaxed">
                      Two quick inhales through the nose followed by a long exhale through the mouth resets alveolar lung pressure and drops heart rate within 3 cycles.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-secondary/50 border border-border/40 space-y-1">
                    <strong className="text-foreground text-sm block">Cognitive Reframe</strong>
                    <p className="text-muted-foreground leading-relaxed">
                      Ask: "Will this challenge matter in 6 months?" If not, expend only proportional cognitive energy today.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-secondary/50 border border-border/40 space-y-1">
                    <strong className="text-foreground text-sm block">20-20-20 Vision Rest</strong>
                    <p className="text-muted-foreground leading-relaxed">
                      Every 20 minutes of screen work, look at an object 20 feet away for 20 seconds to release optic strain.
                    </p>
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