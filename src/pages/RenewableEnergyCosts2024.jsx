import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  ArrowLeft,
  Zap, 
  TrendingDown, 
  TrendingUp, 
  BarChart3,
  DollarSign,
  Wind,
  Sun,
  Droplets,
  Mountain,
  Flame,
  Battery
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

export function RenewableEnergyCosts2024() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedTechnology, setSelectedTechnology] = useState("solar-pv");

  // Data from IRENA 2024 report
  const renewableData = [
    {
      technology: "Solar PV",
      id: "solar-pv",
      icon: <Sun className="h-6 w-6" />,
      color: "#f59e0b",
      total_installed_cost: {
        "2010": 5283,
        "2024": 691,
        "change_percent": -87
      },
      capacity_factor: {
        "2010": 15,
        "2023": 17,
        "change_percent": 13
      },
      lcoe: {
        "2010": 0.417,
        "2024": 0.043,
        "change_percent": -90
      }
    },
    {
      technology: "Onshore Wind",
      id: "onshore-wind",
      icon: <Wind className="h-6 w-6" />,
      color: "#10b981",
      total_installed_cost: {
        "2010": 2324,
        "2024": 1041,
        "change_percent": -55
      },
      capacity_factor: {
        "2010": 27,
        "2023": 34,
        "change_percent": 26
      },
      lcoe: {
        "2010": 0.113,
        "2024": 0.034,
        "change_percent": -70
      }
    },
    {
      technology: "Offshore Wind",
      id: "offshore-wind",
      icon: <Wind className="h-6 w-6" />,
      color: "#3b82f6",
      total_installed_cost: {
        "2010": 5518,
        "2024": 2852,
        "change_percent": -48
      },
      capacity_factor: {
        "2010": 38,
        "2023": 42,
        "change_percent": 11
      },
      lcoe: {
        "2010": 0.208,
        "2024": 0.079,
        "change_percent": -62
      }
    },
    {
      technology: "CSP",
      id: "csp",
      icon: <Sun className="h-6 w-6" />,
      color: "#f97316",
      total_installed_cost: {
        "2010": 10703,
        "2024": 3677,
        "change_percent": -66
      },
      capacity_factor: {
        "2010": 30,
        "2023": 41,
        "change_percent": 37
      },
      lcoe: {
        "2010": 0.402,
        "2024": 0.092,
        "change_percent": -77
      }
    },
    {
      technology: "Hydropower",
      id: "hydropower",
      icon: <Droplets className="h-6 w-6" />,
      color: "#06b6d4",
      total_installed_cost: {
        "2010": 1494,
        "2024": 2267,
        "change_percent": 52
      },
      capacity_factor: {
        "2010": 44,
        "2023": 48,
        "change_percent": 9
      },
      lcoe: {
        "2010": 0.044,
        "2024": 0.057,
        "change_percent": 30
      }
    },
    {
      technology: "Geothermal",
      id: "geothermal",
      icon: <Mountain className="h-6 w-6" />,
      color: "#8b5cf6",
      total_installed_cost: {
        "2010": 3083,
        "2024": 4015,
        "change_percent": 30
      },
      capacity_factor: {
        "2010": 87,
        "2023": 88,
        "change_percent": 1
      },
      lcoe: {
        "2010": 0.055,
        "2024": 0.060,
        "change_percent": 9
      }
    }
  ];

  const selectedTech = renewableData.find(tech => tech.id === selectedTechnology);

  const lcoeChartData = renewableData.map(tech => ({
    name: tech.technology,
    "2010": tech.lcoe["2010"],
    "2024": tech.lcoe["2024"],
    change: tech.lcoe.change_percent
  }));

  const costChartData = renewableData.map(tech => ({
    name: tech.technology,
    "2010": tech.total_installed_cost["2010"],
    "2024": tech.total_installed_cost["2024"],
    change: tech.total_installed_cost.change_percent
  }));

  const capacityFactorData = renewableData.map(tech => ({
    name: tech.technology,
    "2010": tech.capacity_factor["2010"],
    "2023": tech.capacity_factor["2023"],
    change: tech.capacity_factor.change_percent
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/blog" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                December 2024
              </Badge>
              <Badge variant="secondary" className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                15 min read
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Article Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Renewable Power Generation Cost in 2024
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            An interactive analysis of the latest cost trends in renewable energy technologies based on IRENA's comprehensive 2024 report
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <span>Source: IRENA (International Renewable Energy Agency)</span>
            <span>•</span>
            <span>Data Year: 2024</span>
          </div>
        </div>

        {/* Interactive Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="technologies">Technologies</TabsTrigger>
            <TabsTrigger value="trends">Cost Trends</TabsTrigger>
            <TabsTrigger value="insights">Key Insights</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Biggest Cost Reduction</CardTitle>
                  <TrendingDown className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">Solar PV</div>
                  <p className="text-xs text-muted-foreground">90% LCOE reduction since 2010</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Most Competitive</CardTitle>
                  <DollarSign className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">Onshore Wind</div>
                  <p className="text-xs text-muted-foreground">$0.034/kWh in 2024</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Highest Capacity Factor</CardTitle>
                  <Battery className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">Geothermal</div>
                  <p className="text-xs text-muted-foreground">88% capacity factor</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Levelized Cost of Electricity (LCOE) Comparison</CardTitle>
                <CardDescription>Cost per kWh in USD (2024)</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={lcoeChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value.toFixed(3)}/kWh`, '']} />
                    <Legend />
                    <Bar dataKey="2010" fill="#94a3b8" name="2010" />
                    <Bar dataKey="2024" fill="#3b82f6" name="2024" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Technologies Tab */}
          <TabsContent value="technologies" className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {renewableData.map((tech) => (
                <Button
                  key={tech.id}
                  variant={selectedTechnology === tech.id ? "default" : "outline"}
                  className="h-auto p-4 flex flex-col items-center space-y-2"
                  onClick={() => setSelectedTechnology(tech.id)}
                >
                  <div style={{ color: tech.color }}>
                    {tech.icon}
                  </div>
                  <span className="text-xs text-center">{tech.technology}</span>
                </Button>
              ))}
            </div>

            {selectedTech && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <div style={{ color: selectedTech.color }}>
                        {selectedTech.icon}
                      </div>
                      <span>{selectedTech.technology} Overview</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-2">Total Installed Cost</h4>
                      <div className="flex items-center justify-between">
                        <span>2010: ${selectedTech.total_installed_cost["2010"]?.toLocaleString()}/kW</span>
                        <span>2024: ${selectedTech.total_installed_cost["2024"]?.toLocaleString()}/kW</span>
                      </div>
                      <div className="flex items-center mt-1">
                        {selectedTech.total_installed_cost.change_percent < 0 ? (
                          <TrendingDown className="h-4 w-4 text-green-600 mr-1" />
                        ) : (
                          <TrendingUp className="h-4 w-4 text-red-600 mr-1" />
                        )}
                        <span className={selectedTech.total_installed_cost.change_percent < 0 ? "text-green-600" : "text-red-600"}>
                          {Math.abs(selectedTech.total_installed_cost.change_percent)}% 
                          {selectedTech.total_installed_cost.change_percent < 0 ? " decrease" : " increase"}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Capacity Factor</h4>
                      <div className="flex items-center justify-between">
                        <span>2010: {selectedTech.capacity_factor["2010"]}%</span>
                        <span>2023: {selectedTech.capacity_factor["2023"]}%</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                        <span className="text-green-600">
                          {selectedTech.capacity_factor.change_percent}% increase
                        </span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">LCOE (Levelized Cost of Electricity)</h4>
                      <div className="flex items-center justify-between">
                        <span>2010: ${selectedTech.lcoe["2010"]?.toFixed(3)}/kWh</span>
                        <span>2024: ${selectedTech.lcoe["2024"]?.toFixed(3)}/kWh</span>
                      </div>
                      <div className="flex items-center mt-1">
                        {selectedTech.lcoe.change_percent < 0 ? (
                          <TrendingDown className="h-4 w-4 text-green-600 mr-1" />
                        ) : (
                          <TrendingUp className="h-4 w-4 text-red-600 mr-1" />
                        )}
                        <span className={selectedTech.lcoe.change_percent < 0 ? "text-green-600" : "text-red-600"}>
                          {Math.abs(selectedTech.lcoe.change_percent)}% 
                          {selectedTech.lcoe.change_percent < 0 ? " decrease" : " increase"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Technology Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Cost Competitiveness</span>
                          <span>{selectedTech.lcoe["2024"] < 0.05 ? "Excellent" : selectedTech.lcoe["2024"] < 0.08 ? "Good" : "Moderate"}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${Math.max(10, 100 - (selectedTech.lcoe["2024"] * 1000))}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Capacity Factor</span>
                          <span>{selectedTech.capacity_factor["2023"]}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${selectedTech.capacity_factor["2023"]}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Cost Reduction (2010-2024)</span>
                          <span>{Math.abs(selectedTech.total_installed_cost.change_percent)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-600 h-2 rounded-full" 
                            style={{ width: `${Math.min(100, Math.abs(selectedTech.total_installed_cost.change_percent))}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          {/* Trends Tab */}
          <TabsContent value="trends" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Total Installed Cost Trends (2010 vs 2024)</CardTitle>
                <CardDescription>Cost in USD per kW</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={costChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value?.toLocaleString()}/kW`, '']} />
                    <Legend />
                    <Bar dataKey="2010" fill="#94a3b8" name="2010" />
                    <Bar dataKey="2024" fill="#f59e0b" name="2024" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Capacity Factor Evolution</CardTitle>
                <CardDescription>Percentage of maximum possible output</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={capacityFactorData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}%`, '']} />
                    <Legend />
                    <Bar dataKey="2010" fill="#94a3b8" name="2010" />
                    <Bar dataKey="2023" fill="#10b981" name="2023" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600">Major Cost Reductions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Solar PV</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">-90% LCOE</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>CSP</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">-77% LCOE</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Onshore Wind</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">-70% LCOE</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Offshore Wind</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">-62% LCOE</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-600">Technology Leaders</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold">Lowest LCOE (2024)</h4>
                    <p className="text-sm text-gray-600">Onshore Wind: $0.034/kWh</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Highest Capacity Factor</h4>
                    <p className="text-sm text-gray-600">Geothermal: 88%</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Fastest Growing</h4>
                    <p className="text-sm text-gray-600">Solar PV: 87% cost reduction</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Key Takeaways</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <p>Solar PV has experienced the most dramatic cost reduction, with LCOE falling by 90% since 2010, making it one of the most competitive renewable technologies.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                  <p>Onshore wind now offers the lowest LCOE at $0.034/kWh, representing a 70% decrease from 2010 levels.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                  <p>Geothermal energy maintains the highest capacity factor at 88%, providing consistent baseload power generation.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                  <p>Offshore wind has seen significant improvements in both cost reduction (-62% LCOE) and capacity factor increases (+11%).</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                  <p>Hydropower and geothermal show cost increases, primarily due to resource constraints and site-specific challenges.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            This analysis is based on data from the International Renewable Energy Agency (IRENA) 2024 report on renewable power generation costs.
          </p>
          <Link to="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>
    </div>
  );
}

