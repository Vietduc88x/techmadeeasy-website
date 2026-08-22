import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArticleHeader } from '@/components/article/ArticleHeader';
import { ArticleEnding } from '@/components/article/ArticleEnding';
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
      <Helmet>
        <title>A Practical FIM and BOP Package Strategy for Solar Projects | Tech Made Easy</title>
        <meta name="description" content="An interactive guide to splitting owner-supplied equipment and balance-of-plant scope without losing control of the interfaces." />
        <link rel="canonical" href="https://techmadeeasy.info/blog/bop-interactive-article/" />
      </Helmet>
      <ArticleHeader
        slug="bop-interactive-article"
        title="A Practical FIM and BOP Package Strategy for Solar Projects"
        summary="An interactive guide to splitting owner-supplied equipment and balance-of-plant scope without losing control of the interfaces."
        kicker="Package strategy"
        format="Interactive guide"
      />
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
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
                      A workable split
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      One option is to free-issue the PV modules and keep the remaining balance-of-plant scope in a clearly defined package. It can work when the owner is equipped to manage the retained interfaces.
                    </p>
                    <ul className="space-y-2">
                      {[
                        {
                          key: "cost-effectiveness",
                          title: "Cost control: Direct module procurement may remove an EPC markup, but it also moves procurement, logistics and interface work to the owner.",
                          details: "Compare the supplier price with the owner's full retained cost: engineering, inspection, expediting, freight, customs, storage, preservation, financing, tax and schedule exposure."
                        },
                        {
                          key: "streamlined-management",
                          title: "Interface count: Keeping the remaining BOP scope together can reduce the number of contractual boundaries the project team must actively manage.",
                          details: "The benefit depends on where the boundary is drawn and whether design data, delivery, custody, installation and commissioning responsibilities are explicit."
                        },
                        {
                          key: "clear-accountability",
                          title: "Accountability: Fewer, larger packages can make responsibility easier to see, provided the handover points and acceptance evidence are named.",
                          details: "A larger package does not remove interface risk by itself. The responsibility matrix still needs an owner, required date and acceptance criteria for every handover."
                        },
                        {
                          key: "integrated-performance",
                          title: "Integrated performance: A BOP wrapper can consolidate performance obligations, while module compatibility and overall plant performance still need deliberate allocation.",
                          details: "State who owns the model, the input data, the tests and the remedy when equipment supplied under different contracts does not perform as one system."
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
                  A solar plant contains many physical and contractual interfaces beyond the modules.
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>How the package split works</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                  <p>
                    The Balance of Plant (BOP) encompasses all components of a solar power plant except the PV modules themselves. 
                    This includes inverters, transformers, electrical infrastructure, mounting systems, monitoring equipment, 
                    and civil works. The key to successful BOP management lies in strategic package design that optimizes 
                    interfaces, responsibilities, and risk allocation.
                  </p>
                  <p>
                    The practical work is to define each boundary before tender: design inputs, delivery point, custody,
                    installation, testing, performance responsibility and the evidence required to accept a handover. The
                    package split is useful only if the owner has the capability to manage what it retains.
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

        </div>
      </div>
      <ArticleEnding relatedPosts={[
        { slug: 'fim-vs-epc-decision-sheet', category: 'Contracts & Packages', title: 'FIM versus EPC: The One-Page Decision Sheet' },
        { slug: 'access-was-assumed', category: 'Preconstruction', title: 'Access Was Assumed' },
      ]} />
    </div>
  );
}

