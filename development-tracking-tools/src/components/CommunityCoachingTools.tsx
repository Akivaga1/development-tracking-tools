import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  ArrowLeft,
  Users2,
  BookOpen,
  Share2,
  Sparkles,
  Heart,
  MessageCircle,
  Plus,
  Compass,
  CheckCircle2,
  Clock,
  Send,
  Calendar,
  Flame,
  UserCheck,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CommunityCoachingToolsProps {
  onBack: () => void;
}

export function CommunityCoachingTools({ onBack }: CommunityCoachingToolsProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('group-journaling');

  // Group Journaling state
  const [journalEntries, setJournalEntries] = useState([
    {
      id: 1,
      author: 'Amina Mwangi',
      cohort: 'Leadership Cohort 2026',
      time: '3 hours ago',
      title: 'Embracing vulnerability in team retro meetings',
      content:
        'Today our group explored how psychological safety unlocks real innovation. When leaders acknowledge what they do not know, team members step up with bold solutions.',
      reflections: 7,
      reactions: 14,
      tag: 'Leadership Growth',
    },
    {
      id: 2,
      author: 'David Ochieng',
      cohort: 'Social Impact Lab',
      time: 'Yesterday',
      title: 'Micro-habits in community outreach',
      content:
        'Consistency over intensity. Instead of monthly massive drives, we ran 15-minute daily mentor check-ins with local youth leaders. The attendance rate jumped from 40% to 92%.',
      reflections: 12,
      reactions: 23,
      tag: 'Community',
    },
  ]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');

  // Shared Projects state
  const sharedProjects = [
    {
      id: 'SP-1',
      title: 'Civic Youth Digital Mentorship Initiative',
      leads: ['Faith K.', 'John M.'],
      progress: 74,
      nextMilestone: 'Curriculum Pilot Workshop (Nov 15)',
      membersCount: 18,
      status: 'On Track',
    },
    {
      id: 'SP-2',
      title: 'Community Clean Energy Cooperative',
      leads: ['Samson T.'],
      progress: 45,
      nextMilestone: 'Stakeholder Charter Signoff (Dec 01)',
      membersCount: 26,
      status: 'In Review',
    },
  ];

  // FaithFlow Wellness Tracker state
  const [faithMinutes, setFaithMinutes] = useState(15);
  const [faithStreak, setFaithStreak] = useState(19);
  const [devotionCompleted, setDevotionCompleted] = useState(true);
  const [prayerFocus, setPrayerFocus] = useState('Gratitude, clarity of vision, and resilience for our teams.');

  const handlePostJournal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle || !newPostContent) return;
    const newEntry = {
      id: Date.now(),
      author: 'You (Current User)',
      cohort: 'Leadership Cohort 2026',
      time: 'Just now',
      title: newPostTitle,
      content: newPostContent,
      reflections: 0,
      reactions: 1,
      tag: 'Reflection',
    };
    setJournalEntries([newEntry, ...journalEntries]);
    setNewPostTitle('');
    setNewPostContent('');
    toast({
      title: 'Reflection Shared',
      description: 'Your entry has been shared with your coaching circle.',
    });
  };

  const toggleDevotion = () => {
    setDevotionCompleted(!devotionCompleted);
    if (!devotionCompleted) {
      setFaithStreak(faithStreak + 1);
      toast({
        title: 'FaithFlow Checked-In',
        description: `Streak updated to ${faithStreak + 1} days! Keep cultivating peace and mindfulness.`,
      });
    }
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
                Back to Dashboard
              </Button>
              <div className="w-10 h-10 rounded-lg bg-gradient-wellness flex items-center justify-center text-white shadow-soft">
                <Users2 className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold font-heading text-foreground">
                  Community & Coaching Tools
                </h1>
                <p className="text-sm text-muted-foreground">
                  Collaborative growth through group journaling, shared projects, coaching circles & FaithFlow wellness
                </p>
              </div>
            </div>
            <Badge className="bg-primary text-white">Cohort Sync Active</Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-xl mb-6">
            <TabsTrigger value="group-journaling" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Group Journaling
            </TabsTrigger>
            <TabsTrigger value="shared-projects" className="flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Shared Projects
            </TabsTrigger>
            <TabsTrigger value="faith-flow" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              FaithFlow Wellness
            </TabsTrigger>
          </TabsList>

          {/* Tab 1: Group Journaling */}
          <TabsContent value="group-journaling" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Feed Column */}
              <div className="lg:col-span-2 space-y-4">
                {/* Create post box */}
                <Card className="border-border/60 shadow-soft">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-heading">Share a Cohort Reflection</CardTitle>
                    <CardDescription>Post to your group journal for shared accountability</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePostJournal} className="space-y-3">
                      <Input
                        placeholder="Reflection title (e.g. Key takeaway from this week's sprint)"
                        value={newPostTitle}
                        onChange={(e) => setNewPostTitle(e.target.value)}
                        className="text-sm"
                      />
                      <Textarea
                        placeholder="What insights, challenges or triumphs shaped your growth today?"
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        rows={3}
                        className="text-sm resize-none"
                      />
                      <div className="flex justify-between items-center pt-1">
                        <span className="text-xs text-muted-foreground">Encrypted peer journal</span>
                        <Button type="submit" size="sm" className="bg-primary hover:bg-primary-glow text-white">
                          <Send className="w-3.5 h-3.5 mr-1.5" /> Post Reflection
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>

                {/* Journal Feed */}
                <div className="space-y-4">
                  {journalEntries.map((entry) => (
                    <Card key={entry.id} className="border-border/60 shadow-soft hover:shadow-medium transition-all">
                      <CardContent className="p-5">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs">
                              {entry.author.charAt(0)}
                            </div>
                            <div>
                              <span className="font-semibold text-sm text-foreground block">{entry.author}</span>
                              <span className="text-[11px] text-muted-foreground">
                                {entry.cohort} • {entry.time}
                              </span>
                            </div>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {entry.tag}
                          </Badge>
                        </div>

                        <h4 className="font-bold text-base text-foreground mb-1.5 font-heading">
                          {entry.title}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                          {entry.content}
                        </p>

                        <div className="flex items-center gap-4 text-xs text-muted-foreground pt-3 border-t border-border/40">
                          <button className="flex items-center gap-1 hover:text-primary transition-colors">
                            <Heart className="w-4 h-4 text-rose-500" />
                            {entry.reactions} Encouragements
                          </button>
                          <button className="flex items-center gap-1 hover:text-primary transition-colors">
                            <MessageCircle className="w-4 h-4" />
                            {entry.reflections} Reflections
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Sidebar Column */}
              <div className="space-y-4">
                <Card className="border-border/60 shadow-soft bg-gradient-to-br from-card to-secondary/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-heading">Weekly Cohort Prompt</CardTitle>
                    <CardDescription>Curated for peer leadership cohorts</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <blockquote className="text-sm italic text-foreground border-l-2 border-primary pl-3">
                      "Where did you notice tension this week, and what did it teach you about your boundary thresholds?"
                    </blockquote>
                    <p className="text-xs text-muted-foreground">
                      Over 84% of your cohort members have logged their response.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border/60 shadow-soft">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-heading">Active Coaching Circles</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-xs">
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-secondary/50 border border-border/40">
                      <div>
                        <div className="font-semibold text-foreground">Peer Circle Alpha</div>
                        <span className="text-muted-foreground">Next Meet: Thursday 18:00</span>
                      </div>
                      <Badge className="bg-emerald-600 text-white">4/4 Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-secondary/50 border border-border/40">
                      <div>
                        <div className="font-semibold text-foreground">Civic Leaders Pod</div>
                        <span className="text-muted-foreground">Next Meet: Monday 08:30</span>
                      </div>
                      <Badge className="bg-primary text-white">6 Members</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Tab 2: Shared Projects */}
          <TabsContent value="shared-projects" className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-lg font-bold font-heading text-foreground">Collaborative Development Projects</h3>
                <p className="text-sm text-muted-foreground">Shared deliverables, milestone tracking and community impact</p>
              </div>
              <Button size="sm" className="bg-primary hover:bg-primary-glow text-white">
                <Plus className="w-4 h-4 mr-1.5" /> Start Shared Project
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sharedProjects.map((proj) => (
                <Card key={proj.id} className="border-border/60 shadow-soft hover:shadow-medium transition-all">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs font-mono text-primary font-semibold">{proj.id}</span>
                        <CardTitle className="text-base font-heading mt-0.5">{proj.title}</CardTitle>
                      </div>
                      <Badge variant="outline" className="border-primary/40 text-primary">
                        {proj.status}
                      </Badge>
                    </div>
                    <CardDescription className="text-xs">
                      Project Leads: {proj.leads.join(', ')} • {proj.membersCount} Contributors
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-muted-foreground">Milestone Progress</span>
                        <span className="font-bold text-foreground">{proj.progress}%</span>
                      </div>
                      <Progress value={proj.progress} className="h-2" />
                    </div>

                    <div className="p-3 rounded-lg bg-secondary/40 border border-border/40 text-xs">
                      <span className="text-muted-foreground block mb-0.5">Upcoming Deliverable:</span>
                      <span className="font-semibold text-foreground flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-primary" />
                        {proj.nextMilestone}
                      </span>
                    </div>

                    <div className="flex justify-end gap-2 pt-2 border-t border-border/40">
                      <Button variant="outline" size="sm" className="text-xs">
                        View Workstream
                      </Button>
                      <Button size="sm" className="text-xs bg-primary hover:bg-primary-glow text-white">
                        Contribute Update
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tab 3: FaithFlow Wellness */}
          <TabsContent value="faith-flow" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Daily Tracker */}
              <Card className="border-border/60 shadow-soft md:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-emerald-600" />
                        <CardTitle className="text-lg font-heading">FaithFlow Daily Wellness</CardTitle>
                      </div>
                      <CardDescription>
                        Cultivate spiritual resilience, intentional pauses, and gratitude routines
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 text-xs font-bold">
                      <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
                      {faithStreak} Day Streak
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-sky-500/10 border border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-sm text-foreground">Today's Reflection & Devotion</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        15 minutes dedicated to prayer, meditation & inner centering.
                      </p>
                    </div>
                    <Button
                      onClick={toggleDevotion}
                      className={devotionCompleted ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-primary text-white'}
                      size="sm"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-1.5" />
                      {devotionCompleted ? 'Completed Today' : 'Mark Complete'}
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-foreground block">
                      Daily Intention / Prayer Focus
                    </label>
                    <Input
                      value={prayerFocus}
                      onChange={(e) => setPrayerFocus(e.target.value)}
                      placeholder="Set your daily intention or prayer request..."
                      className="text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-3 rounded-lg border border-border/50 bg-card text-center">
                      <span className="text-xs text-muted-foreground block">Mindful Minutes</span>
                      <span className="text-xl font-bold text-primary font-heading">{faithMinutes}m</span>
                    </div>
                    <div className="p-3 rounded-lg border border-border/50 bg-card text-center">
                      <span className="text-xs text-muted-foreground block">Gratitude Entries</span>
                      <span className="text-xl font-bold text-emerald-600 font-heading">3 Logged</span>
                    </div>
                    <div className="p-3 rounded-lg border border-border/50 bg-card text-center">
                      <span className="text-xs text-muted-foreground block">Peace Index</span>
                      <span className="text-xl font-bold text-foreground font-heading">8.9 / 10</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Devotional Rhythm & Guidance */}
              <Card className="border-border/60 shadow-soft">
                <CardHeader>
                  <CardTitle className="text-base font-heading">Spiritual Rhythm Guide</CardTitle>
                  <CardDescription>Grounding practices for stress reduction</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-xs">
                  <div className="p-3 rounded-lg bg-secondary/50 border border-border/40 space-y-1">
                    <span className="font-semibold text-foreground block">Morning Stillness (5m)</span>
                    <p className="text-muted-foreground">
                      Breathe deeply, acknowledge three blessings, and release anxiety before entering the day.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50 border border-border/40 space-y-1">
                    <span className="font-semibold text-foreground block">Midday Alignment (5m)</span>
                    <p className="text-muted-foreground">
                      Step away from digital noise; recenter perspective on mission, compassion, and patience.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50 border border-border/40 space-y-1">
                    <span className="font-semibold text-foreground block">Evening Examen (5m)</span>
                    <p className="text-muted-foreground">
                      Review moments of clarity vs frustration. Close with peaceful rest and surrender.
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
