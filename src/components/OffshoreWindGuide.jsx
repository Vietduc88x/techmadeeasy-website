import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, Waves, Zap, Factory, TreePine, Fish, Bird, Calculator, Clock, DollarSign, Settings, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';

// Import images
const heroImg = '/images/blog/offshore-wind-hero.jpg';
const timelineImg = '/images/blog/development-timeline.png';
const foundationImg = '/images/blog/foundation-types.png';
const energyFlowImg = '/images/blog/energy-flow.png';

const OffshoreWindGuide = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [turbineCount, setTurbineCount] = useState([50]);
  const [turbinePower, setTurbinePower] = useState([15]);
  const [waterDepth, setWaterDepth] = useState([30]);
  const [distanceFromShore, setDistanceFromShore] = useState([20]);

  // Calculate project metrics based on parameters
  const calculateMetrics = () => {
    const totalCapacity = turbineCount[0] * turbinePower[0];
    const baseCost = totalCapacity * 3.5; // Base cost in million USD per MW
    const depthMultiplier = waterDepth[0] > 60 ? 1.8 : waterDepth[0] > 30 ? 1.3 : 1.0;
    const distanceMultiplier = 1 + (distanceFromShore[0] / 100);
    const totalCost = Math.round(baseCost * depthMultiplier * distanceMultiplier);
    const annualEnergy = Math.round(totalCapacity * 8760 * 0.45 / 1000); // GWh per year
    const homesSupplied = Math.round(annualEnergy * 1000 / 3.5); // Average home consumption 3.5 MWh/year
    
    return { totalCapacity, totalCost, annualEnergy, homesSupplied };
  };

  const sections = [
    { id: 'overview', title: 'Overview', icon: Wind },
    { id: 'timeline', title: 'Development Process', icon: Factory },
    { id: 'technology', title: 'Technology', icon: Zap },
    { id: 'environment', title: 'Environmental Impact', icon: TreePine },
    { id: 'calculator', title: 'Project Calculator', icon: Calculator }
  ];

  const foundationTypes = [
    {
      name: 'Monopile Foundation',
      depth: '0-30m',
      cost: 'Low',
      complexity: 'Simple',
      pros: ['Lower cost', 'Simple installation', 'Mature technology', 'Fast deployment'],
      cons: ['Depth limited', 'Noise impact during installation', 'Challenging in hard soils']
    },
    {
      name: 'Jacket Foundation',
      depth: '30-60m',
      cost: 'Medium',
      complexity: 'Complex',
      pros: ['Suitable for deeper waters', 'High stability', 'Good load bearing', 'Proven offshore technology'],
      cons: ['Higher cost', 'Complex installation', 'Requires specialized vessels', 'More fabrication time']
    },
    {
      name: 'Floating Foundation',
      depth: '60m+',
      cost: 'High',
      complexity: 'Very Complex',
      pros: ['No depth limitation', 'Minimal seabed impact', 'Access to high wind resources', 'Future potential'],
      cons: ['Emerging technology', 'Highest cost', 'Complex mooring systems', 'Maintenance challenges']
    }
  ];

  const developmentPhases = [
    {
      phase: 'Planning & Assessment',
      duration: '2-4 years',
      color: 'bg-blue-100 text-blue-800',
      activities: ['Site surveys', 'Wind resource assessment', 'Geotechnical surveys', 'Feasibility studies'],
      description: 'Initial site identification, resource assessment, and technical feasibility analysis.'
    },
    {
      phase: 'Environmental & Regulatory',
      duration: '3-7 years',
      color: 'bg-green-100 text-green-800',
      activities: ['Environmental impact assessment', 'Permitting process', 'Stakeholder consultation', 'Grid connection agreements'],
      description: 'Comprehensive environmental studies and regulatory approval processes.'
    },
    {
      phase: 'Design & Construction',
      duration: '2-3 years',
      color: 'bg-orange-100 text-orange-800',
      activities: ['Detailed engineering', 'Equipment procurement', 'Construction and installation', 'Grid infrastructure'],
      description: 'Final design, manufacturing, and installation of wind farm components.'
    },
    {
      phase: 'Operation & Maintenance',
      duration: '25-30 years',
      color: 'bg-purple-100 text-purple-800',
      activities: ['Commissioning', 'Commercial operation', 'Preventive maintenance', 'Performance monitoring'],
      description: 'Long-term operation with regular maintenance and performance optimization.'
    }
  ];

  const environmentalBenefits = [
    { icon: Wind, title: 'Clean Energy', value: '0 CO₂ emissions', description: 'During operation phase' },
    { icon: Fish, title: 'Marine Habitat', value: 'Artificial reef effect', description: 'Foundations create new habitats' },
    { icon: Waves, title: 'Ocean Impact', value: 'Minimal footprint', description: 'Less than 1% seabed coverage' },
    { icon: Bird, title: 'Wildlife Protection', value: 'Migration corridors', description: 'Designed to minimize bird impact' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Wind className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                Offshore Wind Farm: From Planning to Operation
              </h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              {sections.map((section) => {
                const IconComponent = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                      activeSection === section.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span>{section.title}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {activeSection === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Hero Section */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-green-600 text-white">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10 p-8 md:p-12">
                  <h2 className="text-4xl md:text-6xl font-bold mb-4">
                    The Future of Clean Energy
                  </h2>
                  <p className="text-xl md:text-2xl mb-8 max-w-2xl">
                    Explore the complete process of offshore wind farm development from initial planning to commercial operation
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Badge variant="secondary" className="text-lg px-4 py-2">
                      <Wind className="h-5 w-5 mr-2" />
                      Renewable Energy
                    </Badge>
                    <Badge variant="secondary" className="text-lg px-4 py-2">
                      <Waves className="h-5 w-5 mr-2" />
                      Marine Technology
                    </Badge>
                    <Badge variant="secondary" className="text-lg px-4 py-2">
                      <TreePine className="h-5 w-5 mr-2" />
                      Environmental Friendly
                    </Badge>
                  </div>
                </div>
                <div className="absolute right-0 top-0 h-full w-1/2 opacity-30">
                  <img
                    src={heroImg}
                    alt="Offshore Wind Farm"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              {/* Key Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="text-center">
                  <CardHeader>
                    <CardTitle className="text-3xl text-blue-600">15+ MW</CardTitle>
                    <CardDescription>Modern turbine capacity</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="text-center">
                  <CardHeader>
                    <CardTitle className="text-3xl text-green-600">25-30 years</CardTitle>
                    <CardDescription>Project lifespan</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="text-center">
                  <CardHeader>
                    <CardTitle className="text-3xl text-purple-600">1000+ MW</CardTitle>
                    <CardDescription>Large farm capacity</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="text-center">
                  <CardHeader>
                    <CardTitle className="text-3xl text-orange-600">7-15 years</CardTitle>
                    <CardDescription>Development timeline</CardDescription>
                  </CardHeader>
                </Card>
              </div>

              {/* Introduction */}
              <Card>
                <CardHeader>
                  <CardTitle>Introduction to Offshore Wind Energy</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    Offshore wind energy represents one of the most promising renewable energy technologies of our time, 
                    offering tremendous potential for clean electricity generation while meeting the growing demand for 
                    sustainable energy solutions.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    Developing offshore wind farms presents unique challenges distinct from onshore wind projects, 
                    from navigating complex marine environments and harsh weather conditions to coordinating with 
                    multiple stakeholders and regulatory agencies.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    This comprehensive guide explores the entire lifecycle of offshore wind farm development, 
                    from initial site assessment through decades of commercial operation, providing insights into 
                    the technologies, processes, and considerations that make these projects successful.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeSection === 'timeline' && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Factory className="h-6 w-6" />
                    <span>Offshore Wind Farm Development Process</span>
                  </CardTitle>
                  <CardDescription>
                    From initial planning to commercial operation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-8">
                    <img
                      src={timelineImg}
                      alt="Development Timeline"
                      className="w-full rounded-lg shadow-lg"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {developmentPhases.map((phase, index) => (
                      <Card key={index} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-center justify-between mb-2">
                            <Badge className={phase.color}>{phase.duration}</Badge>
                            <Clock className="h-4 w-4 text-gray-500" />
                          </div>
                          <CardTitle className="text-xl">{phase.phase}</CardTitle>
                          <CardDescription>{phase.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <h4 className="font-semibold mb-3">Key Activities:</h4>
                          <ul className="space-y-2 text-sm text-gray-600">
                            {phase.activities.map((activity, i) => (
                              <li key={i} className="flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                {activity}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Development Timeline Insights</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h4 className="font-semibold text-blue-700 mb-2">Critical Success Factors:</h4>
                        <ul className="space-y-1">
                          <li>• Early stakeholder engagement</li>
                          <li>• Comprehensive environmental studies</li>
                          <li>• Robust financing arrangements</li>
                          <li>• Experienced project team</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-700 mb-2">Risk Mitigation:</h4>
                        <ul className="space-y-1">
                          <li>• Weather window planning</li>
                          <li>• Supply chain management</li>
                          <li>• Regulatory compliance</li>
                          <li>• Technology selection</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeSection === 'technology' && (
            <motion.div
              key="technology"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <Tabs defaultValue="foundations" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="foundations">Foundation Types</TabsTrigger>
                  <TabsTrigger value="energy-flow">Energy Flow</TabsTrigger>
                  <TabsTrigger value="turbines">Turbine Technology</TabsTrigger>
                </TabsList>

                <TabsContent value="foundations" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Foundation Type Comparison</CardTitle>
                      <CardDescription>
                        Choosing the right foundation based on water depth and seabed conditions
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-8">
                        <img
                          src={foundationImg}
                          alt="Foundation Types"
                          className="w-full rounded-lg shadow-lg"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {foundationTypes.map((foundation, index) => (
                          <Card key={index} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                              <CardTitle className="text-lg">{foundation.name}</CardTitle>
                              <div className="flex space-x-2">
                                <Badge variant="outline">{foundation.depth}</Badge>
                                <Badge variant={foundation.cost === 'Low' ? 'default' : foundation.cost === 'Medium' ? 'secondary' : 'destructive'}>
                                  {foundation.cost} Cost
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-semibold text-green-600 mb-2">Advantages:</h4>
                                  <ul className="text-sm space-y-1">
                                    {foundation.pros.map((pro, i) => (
                                      <li key={i} className="flex items-start">
                                        <span className="text-green-500 mr-2">✓</span>
                                        {pro}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <h4 className="font-semibold text-red-600 mb-2">Challenges:</h4>
                                  <ul className="text-sm space-y-1">
                                    {foundation.cons.map((con, i) => (
                                      <li key={i} className="flex items-start">
                                        <span className="text-red-500 mr-2">✗</span>
                                        {con}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="energy-flow" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Energy Flow System</CardTitle>
                      <CardDescription>
                        From offshore wind to the national electrical grid
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-8">
                        <img
                          src={energyFlowImg}
                          alt="Energy Flow"
                          className="w-full rounded-lg shadow-lg"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                          {
                            step: '1',
                            title: 'Wind Capture',
                            description: 'Turbine blades capture kinetic energy from wind',
                            icon: Wind
                          },
                          {
                            step: '2',
                            title: 'Power Generation',
                            description: 'Generator converts mechanical energy to electricity',
                            icon: Zap
                          },
                          {
                            step: '3',
                            title: 'Transmission',
                            description: 'Offshore substation collects and transmits power',
                            icon: Settings
                          },
                          {
                            step: '4',
                            title: 'Grid Integration',
                            description: 'Onshore connection to electrical grid',
                            icon: MapPin
                          }
                        ].map((step, index) => {
                          const IconComponent = step.icon;
                          return (
                            <Card key={index} className="text-center">
                              <CardHeader>
                                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                                  <IconComponent className="h-6 w-6 text-blue-600" />
                                </div>
                                <CardTitle className="text-lg">Step {step.step}</CardTitle>
                                <CardDescription className="font-semibold">{step.title}</CardDescription>
                              </CardHeader>
                              <CardContent>
                                <p className="text-sm text-gray-600">{step.description}</p>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>

                      <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
                        <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <h4 className="font-semibold text-blue-700 mb-2">Voltage Levels:</h4>
                            <ul className="text-sm space-y-1">
                              <li>• Turbine: 33kV AC</li>
                              <li>• Array cables: 33kV AC</li>
                              <li>• Export cables: 220kV HVAC/HVDC</li>
                              <li>• Grid connection: 400kV</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-green-700 mb-2">Efficiency Factors:</h4>
                            <ul className="text-sm space-y-1">
                              <li>• Turbine efficiency: 45-50%</li>
                              <li>• Transmission losses: 2-5%</li>
                              <li>• Availability: 95-97%</li>
                              <li>• Capacity factor: 40-60%</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-purple-700 mb-2">Infrastructure:</h4>
                            <ul className="text-sm space-y-1">
                              <li>• Offshore substation</li>
                              <li>• Export cable system</li>
                              <li>• Onshore substation</li>
                              <li>• Grid connection point</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="turbines" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Modern Wind Turbine Technology</CardTitle>
                      <CardDescription>
                        Latest innovations in offshore wind turbine design
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-xl font-semibold mb-4">Turbine Specifications</h3>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                              <span className="font-medium">Rated Power:</span>
                              <span className="text-blue-600 font-semibold">15-20 MW</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                              <span className="font-medium">Rotor Diameter:</span>
                              <span className="text-blue-600 font-semibold">200-250 m</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                              <span className="font-medium">Hub Height:</span>
                              <span className="text-blue-600 font-semibold">150-200 m</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                              <span className="font-medium">Cut-in Wind Speed:</span>
                              <span className="text-blue-600 font-semibold">3-4 m/s</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                              <span className="font-medium">Rated Wind Speed:</span>
                              <span className="text-blue-600 font-semibold">12-15 m/s</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                              <span className="font-medium">Cut-out Wind Speed:</span>
                              <span className="text-blue-600 font-semibold">25-30 m/s</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-semibold mb-4">Key Innovations</h3>
                          <div className="space-y-4">
                            <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                              <h4 className="font-semibold text-blue-700">Advanced Blade Design</h4>
                              <p className="text-sm text-gray-600 mt-1">Optimized aerodynamics and materials for maximum energy capture</p>
                            </div>
                            <div className="p-4 border-l-4 border-green-500 bg-green-50">
                              <h4 className="font-semibold text-green-700">Direct Drive Generators</h4>
                              <p className="text-sm text-gray-600 mt-1">Reduced maintenance with fewer moving parts</p>
                            </div>
                            <div className="p-4 border-l-4 border-purple-500 bg-purple-50">
                              <h4 className="font-semibold text-purple-700">Smart Control Systems</h4>
                              <p className="text-sm text-gray-600 mt-1">AI-powered optimization for varying wind conditions</p>
                            </div>
                            <div className="p-4 border-l-4 border-orange-500 bg-orange-50">
                              <h4 className="font-semibold text-orange-700">Condition Monitoring</h4>
                              <p className="text-sm text-gray-600 mt-1">Predictive maintenance using IoT sensors</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          )}

          {activeSection === 'environment' && (
            <motion.div
              key="environment"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TreePine className="h-6 w-6" />
                    <span>Environmental Impact & Benefits</span>
                  </CardTitle>
                  <CardDescription>
                    Comprehensive assessment of offshore wind farm environmental effects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {environmentalBenefits.map((benefit, index) => {
                      const IconComponent = benefit.icon;
                      return (
                        <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                          <CardHeader>
                            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3">
                              <IconComponent className="h-8 w-8 text-green-600" />
                            </div>
                            <CardTitle className="text-lg">{benefit.title}</CardTitle>
                            <CardDescription className="font-semibold text-green-600">{benefit.value}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-gray-600">{benefit.description}</p>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>

                  <Tabs defaultValue="benefits" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="benefits">Environmental Benefits</TabsTrigger>
                      <TabsTrigger value="impacts">Potential Impacts</TabsTrigger>
                      <TabsTrigger value="mitigation">Mitigation Measures</TabsTrigger>
                    </TabsList>

                    <TabsContent value="benefits" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-green-700">Climate Benefits</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2 text-sm">
                              <li>• Zero operational CO₂ emissions</li>
                              <li>• Displaces fossil fuel generation</li>
                              <li>• Lifecycle emissions 90% lower than coal</li>
                              <li>• Contributes to net-zero targets</li>
                              <li>• Reduces air pollution</li>
                            </ul>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-blue-700">Marine Benefits</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2 text-sm">
                              <li>• Creates artificial reef habitats</li>
                              <li>• Exclusion zones protect marine life</li>
                              <li>• Reduces fishing pressure in areas</li>
                              <li>• Minimal seabed footprint</li>
                              <li>• No water consumption required</li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>

                    <TabsContent value="impacts" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-orange-700">Construction Phase</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2 text-sm">
                              <li>• Temporary noise from pile driving</li>
                              <li>• Vessel traffic increase</li>
                              <li>• Seabed disturbance during installation</li>
                              <li>• Temporary habitat displacement</li>
                              <li>• Cable laying impacts</li>
                            </ul>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-red-700">Operational Phase</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2 text-sm">
                              <li>• Potential bird and bat collisions</li>
                              <li>• Visual impact from shore</li>
                              <li>• Electromagnetic fields from cables</li>
                              <li>• Changes in local hydrodynamics</li>
                              <li>• Maintenance vessel traffic</li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>

                    <TabsContent value="mitigation" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-purple-700">Design Measures</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2 text-sm">
                              <li>• Turbine spacing for bird corridors</li>
                              <li>• Seasonal construction restrictions</li>
                              <li>• Low-noise foundation technologies</li>
                              <li>• Optimized cable routing</li>
                              <li>• Collision detection systems</li>
                            </ul>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-teal-700">Monitoring Programs</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2 text-sm">
                              <li>• Pre, during, and post-construction monitoring</li>
                              <li>• Bird and marine mammal surveys</li>
                              <li>• Benthic habitat assessments</li>
                              <li>• Noise level measurements</li>
                              <li>• Adaptive management protocols</li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeSection === 'calculator' && (
            <motion.div
              key="calculator"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calculator className="h-6 w-6" />
                    <span>Offshore Wind Farm Project Calculator</span>
                  </CardTitle>
                  <CardDescription>
                    Estimate project parameters and costs based on your specifications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Input Parameters */}
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold">Project Parameters</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Number of Turbines: {turbineCount[0]}
                          </label>
                          <Slider
                            value={turbineCount}
                            onValueChange={setTurbineCount}
                            max={200}
                            min={10}
                            step={5}
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>10</span>
                            <span>200</span>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Turbine Power (MW): {turbinePower[0]}
                          </label>
                          <Slider
                            value={turbinePower}
                            onValueChange={setTurbinePower}
                            max={25}
                            min={8}
                            step={1}
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>8 MW</span>
                            <span>25 MW</span>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Water Depth (m): {waterDepth[0]}
                          </label>
                          <Slider
                            value={waterDepth}
                            onValueChange={setWaterDepth}
                            max={100}
                            min={15}
                            step={5}
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>15m</span>
                            <span>100m</span>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Distance from Shore (km): {distanceFromShore[0]}
                          </label>
                          <Slider
                            value={distanceFromShore}
                            onValueChange={setDistanceFromShore}
                            max={100}
                            min={5}
                            step={5}
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>5km</span>
                            <span>100km</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Results */}
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold">Project Estimates</h3>
                      
                      <div className="grid grid-cols-1 gap-4">
                        <Card className="bg-blue-50">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center">
                              <Zap className="h-5 w-5 mr-2 text-blue-600" />
                              Total Capacity
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-3xl font-bold text-blue-600">
                              {calculateMetrics().totalCapacity} MW
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="bg-green-50">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center">
                              <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                              Estimated Cost
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-3xl font-bold text-green-600">
                              ${calculateMetrics().totalCost}M
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              ${(calculateMetrics().totalCost / calculateMetrics().totalCapacity).toFixed(1)}M per MW
                            </p>
                          </CardContent>
                        </Card>

                        <Card className="bg-purple-50">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center">
                              <Wind className="h-5 w-5 mr-2 text-purple-600" />
                              Annual Energy
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-3xl font-bold text-purple-600">
                              {calculateMetrics().annualEnergy} GWh
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="bg-orange-50">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center">
                              <Factory className="h-5 w-5 mr-2 text-orange-600" />
                              Homes Supplied
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-3xl font-bold text-orange-600">
                              {calculateMetrics().homesSupplied.toLocaleString()}
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold mb-2">Foundation Recommendation:</h4>
                        <p className="text-sm">
                          {waterDepth[0] <= 30 ? (
                            <span className="text-blue-600">Monopile Foundation - Most cost-effective for shallow waters</span>
                          ) : waterDepth[0] <= 60 ? (
                            <span className="text-green-600">Jacket Foundation - Suitable for medium depth waters</span>
                          ) : (
                            <span className="text-purple-600">Floating Foundation - Required for deep waters</span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Cost Breakdown Factors</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <h4 className="font-semibold text-blue-700 mb-2">Turbine & Installation (60-70%):</h4>
                        <ul className="space-y-1">
                          <li>• Wind turbine equipment</li>
                          <li>• Foundation structures</li>
                          <li>• Installation vessels</li>
                          <li>• Weather contingency</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-700 mb-2">Electrical System (20-25%):</h4>
                        <ul className="space-y-1">
                          <li>• Array cables</li>
                          <li>• Offshore substation</li>
                          <li>• Export cables</li>
                          <li>• Onshore substation</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-purple-700 mb-2">Development & Other (10-15%):</h4>
                        <ul className="space-y-1">
                          <li>• Development costs</li>
                          <li>• Project management</li>
                          <li>• Insurance</li>
                          <li>• Contingency</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default OffshoreWindGuide;

