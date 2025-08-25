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
  Battery, 
  Settings, 
  TrendingUp, 
  CheckCircle, 
  XCircle,
  AlertTriangle,
  Target,
  Users,
  DollarSign,
  BarChart3
} from 'lucide-react';

export function BOPInteractiveArticle() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedEquipment, setSelectedEquipment] = useState("pv-modules");
  const [expandedChallenge, setExpandedChallenge] = useState(null);
  const [expandedSolution, setExpandedSolution] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);

  const equipmentData = {
    'pv-modules': {
      title: 'PV Modules',
      icon: <Zap className="h-6 w-6" />,
      description: 'Photovoltaic modules are the primary energy conversion components in solar farms.',
      specifications: {
        'Power Output': '400-600W per module',
        'Efficiency': '20-22%',
        'Warranty': '25 years performance',
        'Temperature Coefficient': '-0.35%/°C',
        'Dimensions': '2m x 1m x 35mm'
      },
      scopeItems: [
        { 
          title: 'Module supply and delivery',
          details: 'The PV Supplier is responsible for the timely and safe delivery of the PV modules to the project site, ensuring they arrive in good condition and meet all specified quality standards.'
        },
        { 
          title: 'Quality testing and certification',
          details: 'The PV Supplier must provide all necessary quality testing documentation and certifications for the modules, verifying their performance and compliance with international standards.'
        },
        { 
          title: 'Mounting system compatibility',
          details: 'The PV Supplier is responsible for ensuring that the provided modules are fully compatible with the mounting systems specified by the BOP EPC Contractor, including providing any necessary technical data and support.'
        },
        { 
          title: 'Performance monitoring integration',
          details: 'The PV Supplier must provide all necessary data and support to enable the seamless integration of the PV modules with the project-wide performance monitoring system.'
        },
        { 
          title: 'Warranty management',
          details: 'The PV Supplier is responsible for managing all warranty claims related to the PV modules, including providing replacements or repairs as needed.'
        }
      ]
    },
    'inverters': {
      title: 'Inverters',
      icon: <Settings className="h-6 w-6" />,
      description: 'Power conversion systems that transform DC electricity from PV modules to AC electricity.',
      specifications: {
        'Power Rating': '1-3.5MW per unit',
        'Efficiency': '98.5-99%',
        'Input Voltage': '1000-1500V DC',
        'Output Voltage': '400-690V AC',
        'Protection Rating': 'IP65'
      },
      scopeItems: [
        { 
          title: 'Inverter supply and installation',
          details: 'The BOP EPC Contractor is responsible for the supply, installation, and commissioning of the inverters, ensuring they are correctly integrated into the overall system.'
        },
        { 
          title: 'Grid connection and synchronization',
          details: 'The BOP EPC Contractor is responsible for all aspects of grid connection and synchronization, including obtaining necessary approvals and ensuring compliance with local utility requirements.'
        },
        { 
          title: 'SCADA system integration',
          details: 'The BOP EPC Contractor is responsible for integrating the inverters with the SCADA system, enabling centralized monitoring and control of the solar farm.'
        },
        { 
          title: 'Maintenance and monitoring',
          details: 'The BOP EPC Contractor is responsible for ongoing maintenance and monitoring of the inverters, ensuring they operate at peak performance.'
        },
        { 
          title: 'Performance optimization',
          details: 'The BOP EPC Contractor is responsible for optimizing the performance of the inverters, including firmware updates and parameter adjustments.'
        }
      ]
    },
    'mv-transformers': {
      title: 'MV Transformers',
      icon: <Battery className="h-6 w-6" />,
      description: 'Medium voltage transformers step up electricity for efficient transmission.',
      specifications: {
        'Power Rating': '2-5MVA',
        'Primary Voltage': '690V',
        'Secondary Voltage': '33kV',
        'Efficiency': '99.2%',
        'Cooling': 'ONAN/ONAF'
      },
      scopeItems: [
        { 
          title: 'Transformer supply and delivery',
          details: 'The BOP EPC Contractor is responsible for the procurement, delivery, and inspection of MV transformers, ensuring they meet project specifications and quality standards.'
        },
        { 
          title: 'Foundation and installation',
          details: 'The BOP EPC Contractor is responsible for designing and constructing the foundations for the MV transformers, as well as their safe and proper installation on site.'
        },
        { 
          title: 'Protection system integration',
          details: 'The BOP EPC Contractor is responsible for integrating the MV transformers with the overall electrical protection system of the solar farm, including relays and circuit breakers.'
        },
        { 
          title: 'Testing and commissioning',
          details: 'The BOP EPC Contractor is responsible for conducting comprehensive testing and commissioning of the MV transformers to ensure their operational readiness and compliance with performance requirements.'
        },
        { 
          title: 'Maintenance planning',
          details: 'The BOP EPC Contractor is responsible for developing and implementing a maintenance plan for the MV transformers to ensure their long-term reliability and performance.'
        }
      ]
    }
  };

  const scopeMatrix = [
    {
      activity: 'Design & Engineering',
      owner: 'Input',
      bopEpc: 'Execute',
      pvSupplier: 'N/A',
      responsibility: 'Overall system design and specifications',
      riskLevel: 'Medium',
      details: 'The BOP EPC Contractor is responsible for the overall system design and engineering, ensuring that all components are integrated correctly and meet the project\'s performance requirements. The Owner provides input and approves the final design.'
    },
    {
      activity: 'PV Module Procurement',
      owner: 'Execute',
      bopEpc: 'N/A',
      pvSupplier: 'Supply',
      responsibility: 'Direct procurement of PV modules',
      riskLevel: 'Low',
      details: 'The Owner is responsible for the direct procurement of PV modules from the PV Supplier. This allows the Owner to have more control over the quality and cost of the modules.'
    },
    {
      activity: 'BOP Equipment Procurement',
      owner: 'N/A',
      bopEpc: 'Execute',
      pvSupplier: 'N/A',
      responsibility: 'Procurement of all other Balance of Plant equipment',
      riskLevel: 'Medium',
      details: 'The BOP EPC Contractor is responsible for the procurement of all other Balance of Plant (BOP) equipment, such as inverters, transformers, and switchgear.'
    },
    {
      activity: 'Site Preparation',
      owner: 'Approve',
      bopEpc: 'Execute',
      pvSupplier: 'N/A',
      responsibility: 'Civil works and infrastructure',
      riskLevel: 'Medium',
      details: 'The BOP EPC Contractor is responsible for all civil works and infrastructure, including site grading, road construction, and foundation installation. The Owner approves the site preparation plan.'
    },
    {
      activity: 'Installation & Construction',
      owner: 'Supervise',
      bopEpc: 'Execute',
      pvSupplier: 'Support',
      responsibility: 'Physical installation of equipment',
      riskLevel: 'High',
      details: 'The BOP EPC Contractor is responsible for the physical installation of all equipment, including the PV modules. The Owner supervises the installation process, and the PV Supplier provides support as needed.'
    },
    {
      activity: 'Testing & Commissioning',
      owner: 'Approve',
      bopEpc: 'Execute',
      pvSupplier: 'Support',
      responsibility: 'System testing and performance validation',
      riskLevel: 'High',
      details: 'The BOP EPC Contractor is responsible for system testing and performance validation. The Owner approves the testing and commissioning plan, and the PV Supplier provides support as needed.'
    },
    {
      activity: 'Grid Connection',
      owner: 'Coordinate',
      bopEpc: 'Execute',
      pvSupplier: 'N/A',
      responsibility: 'Utility interconnection and synchronization',
      riskLevel: 'High',
      details: 'The BOP EPC Contractor is responsible for the utility interconnection and synchronization. The Owner coordinates with the utility company.'
    },
    {
      activity: 'Performance Guarantee',
      owner: 'Owner',
      bopEpc: 'Execute',
      pvSupplier: 'N/A',
      responsibility: 'Guaranteeing the overall performance of the solar farm',
      riskLevel: 'High',
      details: 'The BOP EPC Contractor is responsible for guaranteeing the overall performance of the solar farm. The Owner holds the performance guarantee.'
    },
    {
      activity: 'PV Module Warranty',
      owner: 'Owner',
      bopEpc: 'N/A',
      pvSupplier: 'Provide',
      responsibility: 'Warranty for PV modules',
      riskLevel: 'Low',
      details: 'The PV Supplier is responsible for providing the warranty for the PV modules. The Owner holds the warranty.'
    },
    {
      activity: 'BOP Equipment Warranty',
      owner: 'Owner',
      bopEpc: 'Provide',
      pvSupplier: 'N/A',
      responsibility: 'Warranty for all other Balance of Plant equipment',
      riskLevel: 'Medium',
      details: 'The BOP EPC Contractor is responsible for providing the warranty for all other Balance of Plant (BOP) equipment. The Owner holds the warranty.'
    }
  ];

  const projectResults = [
    {
      metric: 'BOP Cost Reduction',
      value: '20%',
      description: 'Achieved through strategic package design',
      icon: <DollarSign className="h-5 w-5 text-green-600" />
    },
    {
      metric: 'Interface Issues',
      value: '40%',
      description: 'Fewer coordination problems',
      icon: <CheckCircle className="h-5 w-5 text-green-600" />
    },
    {
      metric: 'On-time Delivery',
      value: '100%',
      description: 'All projects delivered on schedule',
      icon: <Target className="h-5 w-5 text-green-600" />
    },
    {
      metric: 'Performance Improvement',
      value: '15%',
      description: 'Better performance guarantees',
      icon: <TrendingUp className="h-5 w-5 text-green-600" />
    }
  ];

  const getRiskColor = (level) => {
    switch (level) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Button asChild variant="ghost" className="mb-6 p-0 h-auto">
            <Link to="/blog" className="flex items-center text-primary hover:text-primary/80">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>

          {/* Hero Section */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Renewable Energy
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6">
              Easiest FIM and BOP Package Strategy of Solar Project
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Balance of Plant (BOP) management is where average PMs fail and experts excel. 
              Discover how strategic package design led to 20% cost reduction and 100% on-time delivery.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                August 2025
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                15 min read
              </div>
            </div>
          </div>
            
          {/* Interactive Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-12">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="equipment">Equipment</TabsTrigger>
              <TabsTrigger value="scope-matrix">Scope Matrix</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-orange-600" />
                      The Challenge
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      In large-scale solar projects, traditional procurement strategies often present a dilemma:
                    </p>
                    <ul className="space-y-2">
                      {[
                        {
                          key: "single-epc",
                          title: "Single EPC: While seemingly simple, a single EPC (Engineering, Procurement, and Construction) contractor can lead to higher costs due to lack of competitive bidding for individual components.",
                          details: "Opting for a single EPC contractor often means sacrificing competitive pricing for individual components. Without multiple bids, the EPC has less incentive to secure the best deals, leading to higher overall project costs. This approach also centralizes risk, making the project more vulnerable to the EPC's performance."
                        },
                        {
                          key: "multiple-packages",
                          title: "Multiple Packages: Breaking down the project into numerous smaller packages can introduce significant management overhead, coordination challenges, and increased risk of interface issues.",
                          details: "While multiple packages might seem to offer more control, they dramatically increase the complexity of project management. Each package requires its own contracts, timelines, and interfaces, leading to a proliferation of coordination points. This complexity often results in delays, cost overruns, and disputes over responsibility."
                        },
                        {
                          key: "unclear-responsibility",
                          title: "Unclear Responsibility: With many contractors, pinpointing accountability for delays or defects becomes difficult, leading to finger-pointing and project stagnation.",
                          details: "When numerous contractors are involved, the lines of responsibility can become blurred. If an issue arises, it's often difficult to determine which party is accountable, leading to 'finger-pointing' and prolonged resolution times. This lack of clear accountability can severely impact project progress and budget."
                        },
                        {
                          key: "performance-gaps",
                          title: "Performance Gaps: Ensuring consistent performance across diverse suppliers and contractors is a major hurdle, often resulting in unmet project targets.",
                          details: "Integrating components from various suppliers and managing different contractors makes it challenging to ensure a cohesive and optimally performing system. Discrepancies in equipment specifications, installation quality, or operational procedures can lead to performance shortfalls, impacting the solar farm's efficiency and energy output."                        }
                      ].map((item) => (
                        <li key={item.key}>
                          <div
                            className="flex items-center gap-2 cursor-pointer hover:text-red-700 transition-colors"
                            onClick={() => setExpandedChallenge(expandedChallenge === item.key ? null : item.key)}
                          >
                            <XCircle className="h-4 w-4 text-red-500" />
                            {item.title}
                          </div>
                          {expandedChallenge === item.key && (
                            <p className="text-muted-foreground mt-2 ml-6 text-sm italic">
                              {item.details}
                            </p>
                          )}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      The Solution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Our innovative approach, the <strong>Optimized BOP Package with Free-Issue PV Modules</strong>, offers a balanced solution:
                    </p>
                    <ul className="space-y-2">
                      {[
                        {
                          key: "cost-effectiveness",
                          title: "Cost-Effectiveness: By directly procuring PV modules (free-issue), you leverage bulk purchasing power and avoid EPC markups, significantly reducing overall project costs.",
                          details: "Free-issuing PV modules allows for direct negotiation with manufacturers, bypassing the EPC contractor's markup and enabling bulk discounts. This strategy ensures you get the best possible price for the most significant component of your solar farm, leading to substantial cost savings."
                        },
                        {
                          key: "streamlined-management",
                          title: "Streamlined Management: Consolidating the remaining Balance of Plant (BOP) components into a single, optimized package simplifies project management, reducing the number of interfaces from 50+ to a manageable few.",
                          details: "Instead of managing dozens of individual contracts and suppliers for BOP components, our optimized package approach bundles these into a cohesive unit. This drastically reduces the number of interfaces, simplifying coordination, minimizing administrative burden, and allowing for more efficient project oversight."
                        },
                        {
                          key: "clear-accountability",
                          title: "Clear Accountability: With fewer, larger packages, responsibility for each segment is clearly defined, minimizing finger-pointing and ensuring timely issue resolution.",
                          details: "By reducing the number of contractual interfaces, accountability becomes crystal clear. Each package supplier is responsible for a larger, more defined scope, making it easier to identify and resolve issues quickly. This fosters a more collaborative environment and reduces disputes."
                        },
                        {
                          key: "integrated-performance",
                          title: "Integrated Performance: This strategy allows for integrated performance guarantees across the entire BOP package, ensuring all components work seamlessly together to meet project targets.",
                          details: "Our optimized BOP package ensures that all components are designed and supplied to work together seamlessly. This integrated approach allows for comprehensive performance guarantees across the entire BOP system, mitigating risks associated with mismatched components and ensuring the solar farm achieves its intended energy output and efficiency."
                        }
                      ].map((item) => (
                        <li key={item.key}>
                          <div
                            className="flex items-center gap-2 cursor-pointer hover:text-green-700 transition-colors"
                            onClick={() => setExpandedSolution(expandedSolution === item.key ? null : item.key)}
                          >
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            {item.title}
                          </div>
                          {expandedSolution === item.key && (
                            <p className="text-muted-foreground mt-2 ml-6 text-sm italic">
                              {item.details}
                            </p>
                          )}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Solar Farm Image */}
              <div className="text-center">
                <img 
                  src="/images/solar_farm_sunset.jpg" 
                  alt="Modern Solar Farm with PV Modules"
                  className="w-full max-w-4xl mx-auto rounded-lg shadow-lg"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Modern solar farm showcasing strategic BOP package implementation
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Understand the Package Strategies with free issue of PV Modules</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                  <p>
                    The Balance of Plant (BOP) encompasses all components of a solar power plant except the PV modules themselves. 
                    This includes inverters, transformers, electrical infrastructure, mounting systems, monitoring equipment, 
                    and civil works. The key to successful BOP management lies in strategic package design that optimizes 
                    interfaces, responsibilities, and risk allocation.
                  </p>
                  <p>
                    Our approach focuses on creating clear package boundaries that minimize coordination complexity while 
                    maximizing accountability. By carefully defining scope matrices and responsibility assignments, we've 
                    transformed chaotic multi-contractor projects into streamlined, efficient operations.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Equipment Tab */}
            <TabsContent value="equipment" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {Object.entries(equipmentData).map(([key, equipment]) => (
                  <Card 
                    key={key}
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedEquipment === key ? 'ring-2 ring-primary' : 'hover:shadow-md'
                    }`}
                    onClick={() => setSelectedEquipment(key)}
                  >
                    <CardHeader className="text-center">
                      <div className="flex justify-center mb-2">
                        {equipment.icon}
                      </div>
                      <CardTitle className="text-lg">{equipment.title}</CardTitle>
                    </CardHeader>
                  </Card>
                ))}
              </div>

              {/* Equipment Details */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {equipmentData[selectedEquipment].icon}
                      {equipmentData[selectedEquipment].title} Specifications
                    </CardTitle>
                    <CardDescription>
                      {equipmentData[selectedEquipment].description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Object.entries(equipmentData[selectedEquipment].specifications).map(([spec, value]) => (
                        <div key={spec} className="flex justify-between items-center py-2 border-b border-border">
                          <span className="font-medium">{spec}</span>
                          <span className="text-muted-foreground">{value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Scope Responsibilities</CardTitle>
                    <CardDescription>
                      Key activities and deliverables for {equipmentData[selectedEquipment].title.toLowerCase()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {equipmentData[selectedEquipment].scopeItems.map((item, index) => (
                        <li key={index}>
                          <div
                            className="flex items-center gap-2 cursor-pointer hover:text-blue-700 transition-colors"
                            onClick={() => setExpandedRow(expandedRow === index ? null : index)}
                          >
                            <ArrowRight className={`h-4 w-4 transition-transform ${expandedRow === index ? 'rotate-90' : ''}`} />
                            {item.title}
                          </div>
                          {expandedRow === index && (
                            <p className="text-muted-foreground mt-2 ml-6 text-sm italic">
                              {item.details}
                            </p>
                          )}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Equipment Images */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <img 
                    src="/images/solar_farm_sunset.jpg" 
                    alt="PV Modules Installation"
                    className="w-full rounded-lg shadow-md mb-2"
                  />
                  <p className="text-sm text-muted-foreground">PV Modules Array</p>
                </div>
                <div className="text-center">
                  <img 
                    src="/images/solar_inverters.png" 
                    alt="Solar Inverters"
                    className="w-full rounded-lg shadow-md mb-2"
                  />
                  <p className="text-sm text-muted-foreground">Inverter Systems</p>
                </div>
                <div className="text-center">
                  <img 
                    src="/images/solar_mv_transformer.png" 
                    alt="MV Transformer"
                    className="w-full rounded-lg shadow-md mb-2"
                  />
                  <p className="text-sm text-muted-foreground">MV Transformer</p>
                </div>
              </div>
            </TabsContent>

            {/* Scope Matrix Tab */}
            <TabsContent value="scope-matrix" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Responsibility Matrix
                  </CardTitle>
                  <CardDescription>
                    Clear definition of roles and responsibilities across project stakeholders
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="p-2 font-semibold text-left">Activity</th>
                          <th className="p-2 font-semibold text-left">Owner</th>
                          <th className="p-2 font-semibold text-left">BOP EPC</th>
                          <th className="p-2 font-semibold text-left">PV Supplier</th>
                          <th className="p-2 font-semibold text-left">Key Responsibility</th>
                          <th className="p-2 font-semibold text-left">Risk Level</th>
                        </tr>
                      </thead>
                      <tbody>
                        {scopeMatrix.map((row, index) => (
                          <React.Fragment key={index}>
                            <tr 
                              className="border-b hover:bg-muted/50 cursor-pointer"
                              onClick={() => setExpandedRow(expandedRow === index ? null : index)}
                            >
                              <td className="p-3 font-medium">{row.activity}</td>
                              <td className="p-3 text-center">
                                <Badge variant={row.owner === 'N/A' ? 'secondary' : 'default'}>
                                  {row.owner}
                                </Badge>
                              </td>
                              <td className="p-3 text-center">
                                <Badge variant={row.bopEpc === 'N/A' ? 'secondary' : 'default'}>
                                  {row.bopEpc}
                                </Badge>
                              </td>
                              <td className="p-3 text-center">
                                <Badge variant={row.pvSupplier === 'N/A' ? 'secondary' : 'default'}>
                                  {row.pvSupplier}
                                </Badge>
                              </td>
                              <td className="p-3">{row.responsibility}</td>
                              <td className="p-3 text-center">
                                <Badge className={`${getRiskColor(row.riskLevel)} w-20 justify-center`}>
                                  {row.riskLevel}
                                </Badge>
                              </td>
                            </tr>
                            {expandedRow === index && (
                              <tr>
                                <td colSpan="6" className="p-3 bg-muted/30 text-muted-foreground text-sm italic">
                                  <p><strong>Detailed Responsibility:</strong> {row.responsibility}</p>
                                  {row.activity === 'Design & Engineering' && <p>BOP EPC takes the lead on overall system design and specifications, with Owner providing critical input.</p>}
                                  {row.activity === 'PV Module Procurement' && <p>Owner directly procures PV modules to leverage bulk purchasing power, with PV Supplier responsible for supply.</p>}
                                  {row.activity === 'BOP Equipment Procurement' && <p>BOP EPC handles the procurement of all other Balance of Plant equipment, ensuring seamless integration.</p>}
                                  {row.activity === 'Performance Guarantee' && <p>BOP EPC is responsible for guaranteeing the overall performance of the solar farm, ensuring all components work together efficiently.</p>}
                                  {row.activity === 'PV Module Warranty' && <p>PV Supplier provides the warranty for PV modules, while Owner manages the process.</p>}
                                  {/* Add more detailed explanations for other activities as needed */}
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-green-600">Low Risk</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Well-defined activities with clear ownership and established processes.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-yellow-600">Medium Risk</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Activities requiring coordination between multiple parties with some complexity.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-red-600">High Risk</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Complex activities with multiple interfaces and potential for delays or issues.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Results Tab */}
            <TabsContent value="results" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Results from our 200MW Solar Portfolio</h2>
                <p className="text-xl text-muted-foreground">
                  Strategic BOP package design delivered measurable improvements across all key metrics
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {projectResults.map((result, index) => (
                  <Card key={index} className="text-center">
                    <CardHeader>
                      <div className="flex justify-center mb-2">
                        {result.icon}
                      </div>
                      <CardTitle className="text-3xl font-bold text-primary">
                        {result.value}
                      </CardTitle>
                      <CardDescription className="font-semibold">
                        {result.metric}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {result.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Key Success Factors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Strategic Planning</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Early stakeholder alignment on package boundaries</li>
                        <li>• Clear interface definition documents</li>
                        <li>• Risk-based responsibility allocation</li>
                        <li>• Performance guarantee integration</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Execution Excellence</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Regular coordination meetings</li>
                        <li>• Proactive issue identification and resolution</li>
                        <li>• Continuous performance monitoring</li>
                        <li>• Lessons learned documentation</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    How do you handle BOP complexity in your projects?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    The key to successful BOP management lies in understanding where to draw package boundaries. 
                    Strategic package design isn't just about cost optimization—it's about creating clear accountability, 
                    reducing interfaces, and ensuring project success.
                  </p>
                  <p className="text-muted-foreground">
                    Share your experiences and challenges in the comments below. What strategies have worked 
                    best for your solar projects?
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Call to Action */}
          <Card className="mt-12 bg-gradient-to-r from-primary/10 to-secondary/10">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Solar Portfolio?</h3>
              <p className="text-muted-foreground mb-6">
                Learn more about strategic BOP package design and how it can benefit your renewable energy projects.
              </p>
              <Button size="lg" className="mr-4">
                Contact Our Experts
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                Download Case Study
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

