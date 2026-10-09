import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Monitor, BarChart3, FolderOpen, CheckSquare, Clock, Users, Target, TrendingUp, CheckCircle, AlertCircle, Calendar } from 'lucide-react';

interface DTTRemoteProps {
  onBack: () => void;
}

// Mock data for DTT Remote
const mockProjects = [
  { id: 1, name: 'Website Redesign', status: 'In Progress', deadline: '2025-01-15', members: ['John', 'Sarah'] },
  { id: 2, name: 'Mobile App Development', status: 'Planning', deadline: '2025-02-28', members: ['Mike', 'Lisa'] },
  { id: 3, name: 'API Integration', status: 'Completed', deadline: '2025-01-10', members: ['David', 'Emma'] }
];

const mockTasks = [
  { id: 1, name: 'Design Homepage Layout', assignedTo: 'Sarah Johnson', status: 'Completed', dueDate: '2025-01-12' },
  { id: 2, name: 'Implement User Authentication', assignedTo: 'Mike Chen', status: 'In Progress', dueDate: '2025-01-18' },
  { id: 3, name: 'Database Optimization', assignedTo: 'David Wilson', status: 'Pending', dueDate: '2025-01-20' },
  { id: 4, name: 'Mobile UI Testing', assignedTo: 'Lisa Garcia', status: 'In Progress', dueDate: '2025-01-25' }
];

const mockTimesheets = [
  { id: 1, employeeName: 'John Smith', status: 'Pending', hoursLogged: 40 },
  { id: 2, employeeName: 'Sarah Johnson', status: 'Approved', hoursLogged: 38 },
  { id: 3, employeeName: 'Mike Chen', status: 'Pending', hoursLogged: 42 },
  { id: 4, employeeName: 'Lisa Garcia', status: 'Approved', hoursLogged: 35 }
];

const mockProductivityData = [
  { employee: 'John Smith', completedTasks: 8, idleTime: '2h 30m' },
  { employee: 'Sarah Johnson', completedTasks: 12, idleTime: '1h 15m' },
  { employee: 'Mike Chen', completedTasks: 10, idleTime: '3h 45m' },
  { employee: 'Lisa Garcia', completedTasks: 9, idleTime: '2h 10m' }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Completed':
    case 'Approved':
      return <Badge className="bg-accent-bright text-primary">Completed</Badge>;
    case 'In Progress':
      return <Badge className="bg-primary text-primary-foreground">In Progress</Badge>;
    case 'Pending':
      return <Badge variant="outline" className="border-muted-foreground text-muted-foreground">Pending</Badge>;
    case 'Planning':
      return <Badge className="bg-gradient-growth text-primary">Planning</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export function DTTRemote({ onBack }: DTTRemoteProps) {
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleApproveTimesheet = (id: number) => {
    // In a real app, this would update the database
    console.log(`Approved timesheet ${id}`);
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
              <div className="w-10 h-10 rounded-lg bg-gradient-hero flex items-center justify-center">
                <Monitor className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                  DTT Remote
                </h1>
                <p className="text-sm text-muted-foreground">Executive Tool for Remote Team Management</p>
              </div>
            </div>
            <Badge className="bg-gradient-primary text-white">Real-time Sync</Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <FolderOpen className="w-4 h-4" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex items-center gap-2">
              <CheckSquare className="w-4 h-4" />
              Tasks
            </TabsTrigger>
            <TabsTrigger value="timesheets" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Timesheets
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6 mt-6">
            {/* KPI Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-foreground">12</div>
                    <FolderOpen className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">+2 from last month</p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Completed Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-foreground">89</div>
                    <CheckCircle className="w-8 h-8 text-accent-bright" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">+15 this week</p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Active Employees</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-foreground">24</div>
                    <Users className="w-8 h-8 text-secondary-accent" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">All online</p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Timesheets to Approve</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-foreground">7</div>
                    <AlertCircle className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Pending review</p>
                </CardContent>
              </Card>
            </div>

            {/* Team Productivity Report */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">Team Productivity Report</CardTitle>
                <CardDescription>Real-time productivity tracking across all team members</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Completed Tasks</TableHead>
                      <TableHead>Idle Time</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockProductivityData.map((employee, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{employee.employee}</TableCell>
                        <TableCell>{employee.completedTasks}</TableCell>
                        <TableCell>{employee.idleTime}</TableCell>
                        <TableCell>
                          <Badge className="bg-accent-bright text-primary">Active</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6 mt-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">All Projects</CardTitle>
                <CardDescription>Ongoing projects with status and deadlines</CardDescription>
              </CardHeader>
              <CardContent>
                {mockProjects.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Project Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Deadline</TableHead>
                        <TableHead>Team Members</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockProjects.map((project) => (
                        <TableRow key={project.id}>
                          <TableCell className="font-medium">{project.name}</TableCell>
                          <TableCell>{getStatusBadge(project.status)}</TableCell>
                          <TableCell>{project.deadline}</TableCell>
                          <TableCell>{project.members.join(', ')}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8">
                    <FolderOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No projects found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6 mt-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">All Tasks</CardTitle>
                <CardDescription>Task assignments with status and due dates</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task Name</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Due Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockTasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell className="font-medium">{task.name}</TableCell>
                        <TableCell>{task.assignedTo}</TableCell>
                        <TableCell>{getStatusBadge(task.status)}</TableCell>
                        <TableCell>{task.dueDate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timesheets" className="space-y-6 mt-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">Timesheet Management</CardTitle>
                <CardDescription>Review and approve employee timesheets</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee Name</TableHead>
                      <TableHead>Hours Logged</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockTimesheets.map((timesheet) => (
                      <TableRow key={timesheet.id}>
                        <TableCell className="font-medium">{timesheet.employeeName}</TableCell>
                        <TableCell>{timesheet.hoursLogged}h</TableCell>
                        <TableCell>{getStatusBadge(timesheet.status)}</TableCell>
                        <TableCell>
                          {timesheet.status === 'Pending' && (
                            <Button 
                              size="sm" 
                              onClick={() => handleApproveTimesheet(timesheet.id)}
                              className="bg-accent-bright text-primary hover:bg-accent-bright/90"
                            >
                              Approve
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}