import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Users, Search, Phone, Mail, Calendar, DollarSign, TrendingUp, AlertCircle, CheckCircle2, Clock } from 'lucide-react';

interface CRMModuleProps {
  onBack: () => void;
}

const customers = [
  { id: 1, name: 'Acme Corporation', contact: 'John Smith', email: 'john@acme.com', phone: '+1234567890', status: 'active', value: '$45,000', stage: 'negotiation', lastContact: '2 days ago' },
  { id: 2, name: 'TechStart Inc', contact: 'Sarah Johnson', email: 'sarah@techstart.com', phone: '+1234567891', status: 'lead', value: '$12,500', stage: 'qualified', lastContact: '1 week ago' },
  { id: 3, name: 'Global Solutions', contact: 'Mike Chen', email: 'mike@global.com', phone: '+1234567892', status: 'active', value: '$78,300', stage: 'closed-won', lastContact: 'Today' },
  { id: 4, name: 'Innovation Labs', contact: 'Emma Davis', email: 'emma@innovate.com', phone: '+1234567893', status: 'lead', value: '$23,400', stage: 'proposal', lastContact: '3 days ago' },
  { id: 5, name: 'Enterprise Co', contact: 'David Wilson', email: 'david@enterprise.com', phone: '+1234567894', status: 'partner', value: '$156,000', stage: 'closed-won', lastContact: 'Yesterday' }
];

const activities = [
  { id: 1, type: 'call', customer: 'Acme Corporation', note: 'Discussed Q4 requirements', date: '2 days ago', outcome: 'positive' },
  { id: 2, type: 'meeting', customer: 'Global Solutions', note: 'Contract renewal meeting', date: 'Today', outcome: 'positive' },
  { id: 3, type: 'email', customer: 'TechStart Inc', note: 'Sent proposal documentation', date: '1 week ago', outcome: 'pending' },
  { id: 4, type: 'call', customer: 'Innovation Labs', note: 'Follow-up on pricing', date: '3 days ago', outcome: 'positive' }
];

const pipelineStages = [
  { name: 'Leads', count: 34, value: '$127K', color: 'bg-blue-500' },
  { name: 'Qualified', count: 18, value: '$245K', color: 'bg-purple-500' },
  { name: 'Proposal', count: 12, value: '$187K', color: 'bg-orange-500' },
  { name: 'Negotiation', count: 8, value: '$312K', color: 'bg-yellow-500' },
  { name: 'Closed Won', count: 42, value: '$1.2M', color: 'bg-green-500' }
];

export function CRMModule({ onBack }: CRMModuleProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      'active': 'bg-green-600 text-white',
      'lead': 'bg-blue-600 text-white',
      'partner': 'bg-purple-600 text-white'
    };
    return variants[status] || 'bg-gray-600 text-white';
  };

  const getStageIcon = (stage: string) => {
    if (stage === 'closed-won') return <CheckCircle2 className="w-4 h-4 text-green-500" />;
    if (stage === 'negotiation') return <Clock className="w-4 h-4 text-yellow-500" />;
    return <AlertCircle className="w-4 h-4 text-blue-500" />;
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
                Back to Business Development
              </Button>
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  CRM - Customer Relationship Management
                </h1>
                <p className="text-sm text-muted-foreground">Manage customers, deals, and relationships</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-blue-600 text-white">247 Active Clients</Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="pipeline" className="space-y-6">
          <TabsList>
            <TabsTrigger value="pipeline">Sales Pipeline</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
          </TabsList>

          {/* Pipeline View */}
          <TabsContent value="pipeline" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {pipelineStages.map((stage) => (
                <Card key={stage.name} className="border-border/50">
                  <CardHeader className="pb-3">
                    <div className={`w-full h-1 rounded-full ${stage.color} mb-2`}></div>
                    <CardTitle className="text-sm font-medium">{stage.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">{stage.count}</div>
                    <p className="text-sm text-muted-foreground">{stage.value} total</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Pipeline Analytics</CardTitle>
                <CardDescription>Deal progression and conversion insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-accent/10 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                      <span className="font-medium">Average Deal Size</span>
                    </div>
                    <span className="text-xl font-bold text-foreground">$18,750</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-accent/10 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-500" />
                      <span className="font-medium">Conversion Rate</span>
                    </div>
                    <span className="text-xl font-bold text-foreground">34.2%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Customers View */}
          <TabsContent value="customers" className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button className="bg-gradient-primary text-white">Add Customer</Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {customers.map((customer) => (
                <Card key={customer.id} className="border-border/50 hover:shadow-medium transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-bold text-foreground">{customer.name}</h3>
                          <Badge className={getStatusBadge(customer.status)}>
                            {customer.status}
                          </Badge>
                          {getStageIcon(customer.stage)}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                          <div className="flex items-center space-x-2 text-sm">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{customer.contact}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <Mail className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{customer.email}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <Phone className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{customer.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{customer.lastContact}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2 mb-2">
                          <DollarSign className="w-5 h-5 text-green-500" />
                          <span className="text-xl font-bold text-foreground">{customer.value}</span>
                        </div>
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Activities View */}
          <TabsContent value="activities" className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Track all customer interactions and follow-ups</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-4 p-4 bg-accent/10 rounded-lg hover:bg-accent/20 transition-colors">
                      <div className="w-10 h-10 bg-gradient-hero rounded-full flex items-center justify-center">
                        {activity.type === 'call' && <Phone className="w-5 h-5 text-white" />}
                        {activity.type === 'meeting' && <Calendar className="w-5 h-5 text-white" />}
                        {activity.type === 'email' && <Mail className="w-5 h-5 text-white" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-foreground">{activity.customer}</h4>
                          <span className="text-sm text-muted-foreground">{activity.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{activity.note}</p>
                        <Badge variant="outline" className="mt-2 text-xs">
                          {activity.outcome}
                        </Badge>
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
