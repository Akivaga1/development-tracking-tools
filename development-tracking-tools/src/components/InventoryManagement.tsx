import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  ArrowLeft, 
  Package, 
  Warehouse, 
  TrendingDown, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  BarChart3,
  Download
} from 'lucide-react';
import { useAccessibility } from '@/hooks/useAccessibility';

interface InventoryManagementProps {
  onBack: () => void;
}

const inventoryStats = [
  {
    title: 'Total Items',
    value: '2,847',
    description: 'In stock',
    icon: Package,
    color: 'text-primary',
    change: '+12%'
  },
  {
    title: 'Low Stock Items',
    value: '34',
    description: 'Need reorder',
    icon: AlertTriangle,
    color: 'text-yellow-500',
    change: '+5'
  },
  {
    title: 'Out of Stock',
    value: '8',
    description: 'Immediate action',
    icon: TrendingDown,
    color: 'text-destructive',
    change: '-2'
  },
  {
    title: 'Inventory Value',
    value: '$842K',
    description: 'Total worth',
    icon: BarChart3,
    color: 'text-secondary-accent',
    change: '+8%'
  }
];

const inventoryItems = [
  {
    id: '1',
    name: 'Office Chairs (Ergonomic)',
    category: 'Furniture',
    sku: 'FUR-CH-001',
    quantity: 45,
    minStock: 20,
    location: 'Warehouse A',
    unit: 'units',
    unitPrice: 250,
    lastUpdated: '2025-01-15',
    status: 'healthy'
  },
  {
    id: '2',
    name: 'Laptop Computers (Dell)',
    category: 'Electronics',
    sku: 'ELEC-LAP-002',
    quantity: 12,
    minStock: 15,
    location: 'Storage Room B',
    unit: 'units',
    unitPrice: 1200,
    lastUpdated: '2025-01-14',
    status: 'low'
  },
  {
    id: '3',
    name: 'Printer Paper (A4)',
    category: 'Office Supplies',
    sku: 'SUP-PAP-003',
    quantity: 0,
    minStock: 50,
    location: 'Supply Closet',
    unit: 'reams',
    unitPrice: 5,
    lastUpdated: '2025-01-10',
    status: 'out'
  },
  {
    id: '4',
    name: 'Whiteboard Markers',
    category: 'Office Supplies',
    sku: 'SUP-MAR-004',
    quantity: 120,
    minStock: 30,
    location: 'Supply Closet',
    unit: 'boxes',
    unitPrice: 12,
    lastUpdated: '2025-01-16',
    status: 'healthy'
  },
  {
    id: '5',
    name: 'Conference Tables',
    category: 'Furniture',
    sku: 'FUR-TAB-005',
    quantity: 8,
    minStock: 5,
    location: 'Warehouse A',
    unit: 'units',
    unitPrice: 850,
    lastUpdated: '2025-01-12',
    status: 'healthy'
  },
  {
    id: '6',
    name: 'Network Cables (Cat6)',
    category: 'IT Equipment',
    sku: 'IT-CAB-006',
    quantity: 18,
    minStock: 25,
    location: 'IT Storage',
    unit: 'boxes',
    unitPrice: 45,
    lastUpdated: '2025-01-13',
    status: 'low'
  }
];

const stockMovements = [
  {
    id: '1',
    item: 'Office Chairs (Ergonomic)',
    type: 'in',
    quantity: 15,
    date: '2025-01-15',
    user: 'Sarah Johnson',
    notes: 'New shipment received'
  },
  {
    id: '2',
    item: 'Laptop Computers (Dell)',
    type: 'out',
    quantity: 5,
    date: '2025-01-14',
    user: 'Michael Chen',
    notes: 'Deployed to new employees'
  },
  {
    id: '3',
    item: 'Printer Paper (A4)',
    type: 'out',
    quantity: 30,
    date: '2025-01-10',
    user: 'Emily Davis',
    notes: 'Monthly distribution'
  },
  {
    id: '4',
    item: 'Whiteboard Markers',
    type: 'in',
    quantity: 40,
    date: '2025-01-16',
    user: 'Robert Wilson',
    notes: 'Restocking order'
  }
];

export function InventoryManagement({ onBack }: InventoryManagementProps) {
  const { announceToScreenReader } = useAccessibility();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'healthy':
        return <Badge className="bg-green-500 text-white">In Stock</Badge>;
      case 'low':
        return <Badge variant="secondary" className="bg-yellow-500 text-white">Low Stock</Badge>;
      case 'out':
        return <Badge variant="destructive">Out of Stock</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getStockLevel = (quantity: number, minStock: number) => {
    const percentage = (quantity / (minStock * 2)) * 100;
    return Math.min(percentage, 100);
  };

  const filteredItems = inventoryItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onBack}
                aria-label="Return to Organizational Tools"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Organizational Tools
              </Button>
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Warehouse className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                  Inventory Management
                </h1>
                <p className="text-sm text-muted-foreground">
                  Track and manage organizational assets
                </p>
              </div>
            </div>
            <Badge variant="default" className="bg-violet-800 text-white">
              Enterprise
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8" tabIndex={-1}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList 
            className="grid w-full grid-cols-4 mb-8"
            role="tablist"
            aria-label="Inventory management sections"
          >
            <TabsTrigger value="overview" className="flex items-center">
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="items" className="flex items-center">
              <Package className="w-4 h-4 mr-2" />
              Items
            </TabsTrigger>
            <TabsTrigger value="movements" className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              Movements
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Inventory Stats */}
            <section aria-labelledby="stats-heading">
              <h2 id="stats-heading" className="text-lg font-semibold mb-4 text-foreground">
                Inventory Status
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {inventoryStats.map((stat) => (
                  <Card key={stat.title} className="border-border/50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base text-foreground flex items-center">
                        <stat.icon className={`w-5 h-5 mr-2 ${stat.color}`} />
                        {stat.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-baseline justify-between">
                        <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                        <Badge variant="outline" className="text-xs">
                          {stat.change}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{stat.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Quick Actions */}
            <section aria-labelledby="actions-heading">
              <h3 id="actions-heading" className="text-lg font-semibold mb-4 text-foreground">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button className="h-auto py-6 flex flex-col items-center space-y-2">
                  <Plus className="w-6 h-6" />
                  <span>Add New Item</span>
                </Button>
                <Button variant="outline" className="h-auto py-6 flex flex-col items-center space-y-2">
                  <Download className="w-6 h-6" />
                  <span>Export Report</span>
                </Button>
                <Button variant="outline" className="h-auto py-6 flex flex-col items-center space-y-2">
                  <AlertTriangle className="w-6 h-6" />
                  <span>View Alerts</span>
                </Button>
              </div>
            </section>
          </TabsContent>

          <TabsContent value="items" className="space-y-6">
            {/* Search and Filters */}
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, SKU, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            </div>

            {/* Inventory Items Table */}
            <section aria-labelledby="items-heading">
              <h2 id="items-heading" className="text-lg font-semibold mb-4 text-foreground">
                Inventory Items ({filteredItems.length})
              </h2>
              <div className="space-y-4">
                {filteredItems.map((item) => (
                  <Card key={item.id} className="border-border/50">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <h4 className="font-semibold text-foreground">{item.name}</h4>
                            {getStatusBadge(item.status)}
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">SKU</p>
                              <p className="font-medium text-foreground">{item.sku}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Category</p>
                              <p className="font-medium text-foreground">{item.category}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Location</p>
                              <p className="font-medium text-foreground">{item.location}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Unit Price</p>
                              <p className="font-medium text-foreground">${item.unitPrice}</p>
                            </div>
                          </div>
                          <div className="mt-4">
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-muted-foreground">Stock Level</span>
                              <span className="font-medium text-foreground">
                                {item.quantity} / {item.minStock * 2} {item.unit}
                              </span>
                            </div>
                            <Progress value={getStockLevel(item.quantity, item.minStock)} className="h-2" />
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </TabsContent>

          <TabsContent value="movements" className="space-y-6">
            <section aria-labelledby="movements-heading">
              <h2 id="movements-heading" className="text-lg font-semibold mb-4 text-foreground">
                Recent Stock Movements
              </h2>
              <div className="space-y-4">
                {stockMovements.map((movement) => (
                  <Card key={movement.id} className="border-border/50">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            movement.type === 'in' ? 'bg-green-500/10' : 'bg-orange-500/10'
                          }`}>
                            {movement.type === 'in' ? (
                              <TrendingUp className="w-6 h-6 text-green-500" />
                            ) : (
                              <TrendingDown className="w-6 h-6 text-orange-500" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">{movement.item}</h4>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                              <span>{movement.type === 'in' ? 'Received' : 'Issued'}: {movement.quantity} units</span>
                              <span>•</span>
                              <span>{movement.date}</span>
                              <span>•</span>
                              <span>by {movement.user}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{movement.notes}</p>
                          </div>
                        </div>
                        <Badge variant={movement.type === 'in' ? 'default' : 'secondary'}>
                          {movement.type === 'in' ? 'Stock In' : 'Stock Out'}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <section aria-labelledby="reports-heading">
              <h2 id="reports-heading" className="text-lg font-semibold mb-4 text-foreground">
                Inventory Reports
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2" />
                      Stock Valuation Report
                    </CardTitle>
                    <CardDescription>
                      Total inventory value by category
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Furniture</span>
                        <span className="font-medium text-foreground">$48,250</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Electronics</span>
                        <span className="font-medium text-foreground">$14,400</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Office Supplies</span>
                        <span className="font-medium text-foreground">$1,440</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">IT Equipment</span>
                        <span className="font-medium text-foreground">$810</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download Report
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      Reorder Report
                    </CardTitle>
                    <CardDescription>
                      Items requiring restock
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Critical (Out of Stock)</span>
                        <Badge variant="destructive">8 items</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Low Stock</span>
                        <Badge variant="secondary" className="bg-yellow-500 text-white">34 items</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Recommended Orders</span>
                        <span className="font-medium text-foreground">42 items</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Generate Purchase Orders
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
