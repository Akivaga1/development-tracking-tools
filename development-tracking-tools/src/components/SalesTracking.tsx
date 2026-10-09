import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, DollarSign, TrendingUp, Users, Target, Calendar, Award, ShoppingCart, Phone } from 'lucide-react';

interface SalesTrackingProps {
  onBack: () => void;
}

const salesData = [
  {
    id: 1,
    salesperson: 'John Smith',
    revenue: 125000,
    target: 120000,
    deals: 15,
    conversionRate: 68,
    quarter: 'Q1 2025',
    status: 'Exceeded'
  },
  {
    id: 2,
    salesperson: 'Sarah Johnson',
    revenue: 98000,
    target: 100000,
    deals: 12,
    conversionRate: 72,
    quarter: 'Q1 2025',
    status: 'Near Target'
  },
  {
    id: 3,
    salesperson: 'Mike Chen',
    revenue: 87000,
    target: 90000,
    deals: 10,
    conversionRate: 65,
    quarter: 'Q1 2025',
    status: 'Near Target'
  },
  {
    id: 4,
    salesperson: 'Lisa Garcia',
    revenue: 110000,
    target: 95000,
    deals: 18,
    conversionRate: 75,
    quarter: 'Q1 2025',
    status: 'Exceeded'
  }
];

const salesMetrics = {
  totalRevenue: 420000,
  targetRevenue: 405000,
  totalDeals: 55,
  avgConversionRate: 70,
  topPerformer: 'John Smith',
  growthRate: 15.2
};

const recentDeals = [
  { id: 1, client: 'TechCorp Inc.', amount: 25000, stage: 'Closed Won', salesperson: 'John Smith', date: '2025-01-15' },
  { id: 2, client: 'StartupXYZ', amount: 15000, stage: 'Negotiation', salesperson: 'Sarah Johnson', date: '2025-01-14' },
  { id: 3, client: 'Enterprise Ltd.', amount: 45000, stage: 'Proposal', salesperson: 'Mike Chen', date: '2025-01-13' },
  { id: 4, client: 'GrowthCo', amount: 32000, stage: 'Closed Won', salesperson: 'Lisa Garcia', date: '2025-01-12' }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Exceeded':
      return <Badge className="bg-accent-bright text-primary">Exceeded</Badge>;
    case 'On Target':
      return <Badge className="bg-primary text-primary-foreground">On Target</Badge>;
    case 'Near Target':
      return <Badge className="bg-secondary-accent text-primary">Near Target</Badge>;
    case 'Below Target':
      return <Badge className="bg-destructive text-destructive-foreground">Below Target</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const getStageBadge = (stage: string) => {
  switch (stage) {
    case 'Closed Won':
      return <Badge className="bg-accent-bright text-primary">Closed Won</Badge>;
    case 'Negotiation':
      return <Badge className="bg-secondary-accent text-primary">Negotiation</Badge>;
    case 'Proposal':
      return <Badge className="bg-primary text-primary-foreground">Proposal</Badge>;
    case 'Qualified':
      return <Badge variant="outline">Qualified</Badge>;
    default:
      return <Badge variant="secondary">{stage}</Badge>;
  }
};

export function SalesTracking({ onBack }: SalesTrackingProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('Q1 2025');

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
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-growth bg-clip-text text-transparent">
                  Sales Tracking
                </h1>
                <p className="text-sm text-muted-foreground">Monitor sales performance and revenue metrics</p>
              </div>
            </div>
            <Badge className="bg-gradient-primary text-white">Real-time Updates</Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Sales Overview Cards */}
        <div className="mb-8 animate-fade-in">
          <h2 className="text-lg font-semibold mb-4 text-foreground">Sales Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Total Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">${salesMetrics.totalRevenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground mt-1">vs ${salesMetrics.targetRevenue.toLocaleString()} target</p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Total Deals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{salesMetrics.totalDeals}</div>
                <p className="text-xs text-muted-foreground mt-1">Closed this quarter</p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                  <Target className="w-4 h-4 mr-2" />
                  Conversion Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{salesMetrics.avgConversionRate}%</div>
                <p className="text-xs text-muted-foreground mt-1">Average across team</p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Growth Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-accent-bright">+{salesMetrics.growthRate}%</div>
                <p className="text-xs text-muted-foreground mt-1">Quarter over quarter</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sales Team Performance */}
        <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Sales Team Performance</h3>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Q1 2025">Q1 2025</SelectItem>
                <SelectItem value="Q4 2024">Q4 2024</SelectItem>
                <SelectItem value="Q3 2024">Q3 2024</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card className="border-border/50">
            <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Salesperson</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Target</TableHead>
                    <TableHead>Deals Closed</TableHead>
                    <TableHead>Conversion Rate</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salesData.map((person) => (
                    <TableRow key={person.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                            <span className="text-white text-xs font-medium">
                              {person.salesperson.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <span>{person.salesperson}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">${person.revenue.toLocaleString()}</TableCell>
                      <TableCell>${person.target.toLocaleString()}</TableCell>
                      <TableCell>{person.deals}</TableCell>
                      <TableCell>{person.conversionRate}%</TableCell>
                      <TableCell>{getStatusBadge(person.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Recent Deals */}
        <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-lg font-semibold mb-4 text-foreground">Recent Deals</h3>
          <Card className="border-border/50">
            <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Stage</TableHead>
                    <TableHead>Salesperson</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentDeals.map((deal) => (
                    <TableRow key={deal.id}>
                      <TableCell className="font-medium">{deal.client}</TableCell>
                      <TableCell className="font-semibold">${deal.amount.toLocaleString()}</TableCell>
                      <TableCell>{getStageBadge(deal.stage)}</TableCell>
                      <TableCell>{deal.salesperson}</TableCell>
                      <TableCell className="text-muted-foreground">{deal.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Performance Highlights */}
        <div className="mt-8 animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <h3 className="text-lg font-semibold mb-4 text-foreground">Performance Highlights</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-foreground flex items-center">
                  <Award className="w-5 h-5 mr-2 text-accent-bright" />
                  Top Performer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium text-foreground">{salesMetrics.topPerformer}</p>
                <p className="text-sm text-muted-foreground">125% of target achieved</p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-foreground flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-primary" />
                  Best Conversion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium text-foreground">Lisa Garcia</p>
                <p className="text-sm text-muted-foreground">75% conversion rate</p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-foreground flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-secondary-accent" />
                  This Month
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium text-foreground">18 Deals Closed</p>
                <p className="text-sm text-muted-foreground">$245,000 revenue</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}