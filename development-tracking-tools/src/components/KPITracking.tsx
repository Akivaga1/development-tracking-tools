import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Target, TrendingUp, TrendingDown, Minus, BarChart3, DollarSign, Users, Clock } from 'lucide-react';

interface KPITrackingProps {
  onBack: () => void;
}

const kpiData = [
  {
    id: 1,
    name: 'Revenue Growth',
    value: '24.5%',
    target: '20%',
    status: 'above',
    category: 'Financial',
    trend: 'up',
    lastUpdated: '2025-01-15',
    icon: DollarSign
  },
  {
    id: 2,
    name: 'Customer Acquisition Cost',
    value: '$127',
    target: '$150',
    status: 'above',
    category: 'Marketing',
    trend: 'down',
    lastUpdated: '2025-01-14',
    icon: Users
  },
  {
    id: 3,
    name: 'Employee Productivity',
    value: '87%',
    target: '85%',
    status: 'above',
    category: 'HR',
    trend: 'up',
    lastUpdated: '2025-01-15',
    icon: BarChart3
  },
  {
    id: 4,
    name: 'Project Delivery Time',
    value: '14 days',
    target: '15 days',
    status: 'above',
    category: 'Operations',
    trend: 'down',
    lastUpdated: '2025-01-13',
    icon: Clock
  },
  {
    id: 5,
    name: 'Customer Satisfaction',
    value: '4.2/5',
    target: '4.0/5',
    status: 'above',
    category: 'Customer',
    trend: 'up',
    lastUpdated: '2025-01-15',
    icon: Target
  },
  {
    id: 6,
    name: 'Team Retention Rate',
    value: '94%',
    target: '90%',
    status: 'above',
    category: 'HR',
    trend: 'stable',
    lastUpdated: '2025-01-12',
    icon: Users
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'above':
      return <Badge className="bg-accent-bright text-primary">Above Target</Badge>;
    case 'on':
      return <Badge className="bg-primary text-primary-foreground">On Target</Badge>;
    case 'below':
      return <Badge className="bg-destructive text-destructive-foreground">Below Target</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case 'up':
      return <TrendingUp className="w-4 h-4 text-accent-bright" />;
    case 'down':
      return <TrendingDown className="w-4 h-4 text-destructive" />;
    case 'stable':
      return <Minus className="w-4 h-4 text-muted-foreground" />;
    default:
      return null;
  }
};

const categories = ['All', 'Financial', 'Marketing', 'HR', 'Operations', 'Customer'];

export function KPITracking({ onBack }: KPITrackingProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredKPIs = selectedCategory === 'All' 
    ? kpiData 
    : kpiData.filter(kpi => kpi.category === selectedCategory);

  const summaryStats = {
    totalKPIs: kpiData.length,
    aboveTarget: kpiData.filter(kpi => kpi.status === 'above').length,
    onTarget: kpiData.filter(kpi => kpi.status === 'on').length,
    belowTarget: kpiData.filter(kpi => kpi.status === 'below').length
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
                Back to Organizational Tools
              </Button>
              <div className="w-10 h-10 rounded-lg bg-gradient-growth flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-growth bg-clip-text text-transparent">
                  KPI Tracking
                </h1>
                <p className="text-sm text-muted-foreground">Key performance indicators and organizational metrics</p>
              </div>
            </div>
            <Badge className="bg-gradient-primary text-white">Live Data</Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Summary Cards */}
        <div className="mb-8 animate-fade-in">
          <h2 className="text-lg font-semibold mb-4 text-foreground">KPI Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total KPIs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{summaryStats.totalKPIs}</div>
                <p className="text-xs text-muted-foreground mt-1">Tracked metrics</p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Above Target</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-accent-bright">{summaryStats.aboveTarget}</div>
                <p className="text-xs text-muted-foreground mt-1">Exceeding goals</p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">On Target</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{summaryStats.onTarget}</div>
                <p className="text-xs text-muted-foreground mt-1">Meeting goals</p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Below Target</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-destructive">{summaryStats.belowTarget}</div>
                <p className="text-xs text-muted-foreground mt-1">Needs attention</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* KPI Details */}
        <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">KPI Details</h3>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Card className="border-border/50">
            <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>KPI Name</TableHead>
                    <TableHead>Current Value</TableHead>
                    <TableHead>Target</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Trend</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Last Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredKPIs.map((kpi) => (
                    <TableRow key={kpi.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          <kpi.icon className="w-4 h-4 text-primary" />
                          <span>{kpi.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">{kpi.value}</TableCell>
                      <TableCell>{kpi.target}</TableCell>
                      <TableCell>{getStatusBadge(kpi.status)}</TableCell>
                      <TableCell>{getTrendIcon(kpi.trend)}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{kpi.category}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{kpi.lastUpdated}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Category Performance */}
        <div className="mt-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-lg font-semibold mb-4 text-foreground">Performance by Category</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.slice(1).map((category) => {
              const categoryKPIs = kpiData.filter(kpi => kpi.category === category);
              const aboveTarget = categoryKPIs.filter(kpi => kpi.status === 'above').length;
              const performance = categoryKPIs.length > 0 ? Math.round((aboveTarget / categoryKPIs.length) * 100) : 0;
              
              return (
                <Card key={category} className="border-border/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold text-foreground">{category}</CardTitle>
                    <CardDescription>{categoryKPIs.length} KPIs tracked</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-foreground">{performance}%</span>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Performance</p>
                        <p className="text-xs text-muted-foreground">{aboveTarget}/{categoryKPIs.length} above target</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}