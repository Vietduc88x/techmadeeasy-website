import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Calculator, TrendingUp, CheckCircle, XCircle, DollarSign, Clock, Target, BarChart3, Lightbulb, Shield, Users, Award } from 'lucide-react';

const FIMRevolutionArticle = () => {
  const [animatedNumbers, setAnimatedNumbers] = useState({
    costReduction: 0,
    timeSaving: 0,
    qualityIssues: 0,
    warrantyImprovement: 0
  });

  const [calculatorValues, setCalculatorValues] = useState({
    projectValue: 100,
    componentCost: 60,
    contractorMarkup: 15,
    qualityIssues: 5
  });

  useEffect(() => {
    const animateNumbers = () => {
      const targets = { costReduction: 15, timeSaving: 3, qualityIssues: 0, warrantyImprovement: 25 };
      const duration = 2000;
      const steps = 60;
      const stepTime = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);

        setAnimatedNumbers({
          costReduction: Math.floor(targets.costReduction * easeOutQuart),
          timeSaving: Math.floor(targets.timeSaving * easeOutQuart),
          qualityIssues: Math.floor(targets.qualityIssues * easeOutQuart),
          warrantyImprovement: Math.floor(targets.warrantyImprovement * easeOutQuart)
        });

        if (currentStep >= steps) {
          clearInterval(timer);
          setAnimatedNumbers(targets);
        }
      }, stepTime);
    };

    const timer = setTimeout(animateNumbers, 1000);
    return () => clearTimeout(timer);
  }, []);

  const calculateSavings = () => {
    const { projectValue, componentCost, contractorMarkup } = calculatorValues;
    const markupSavings = (componentCost / 100) * projectValue * (contractorMarkup / 100);
    const totalSavings = (markupSavings / projectValue) * 100;
    return {
      markupSavings: markupSavings.toFixed(2),
      totalSavings: totalSavings.toFixed(2),
      absoluteSavings: markupSavings.toFixed(2)
    };
  };

  const savings = calculateSavings();

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Hero Section */}
      <div className="relative text-center space-y-6 py-16 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white rounded-3xl overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            The FIM Revolution
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 font-medium">
            Project Management Excellence for Renewable Energy
          </p>
          <div className="mt-6">
            <Badge className="bg-white/20 backdrop-blur-sm text-white text-lg px-6 py-3 border border-white/30 hover:bg-white/30 transition-all duration-300">
              Advanced Procurement Strategy Series
            </Badge>
          </div>
          <div className="mt-6 bg-red-500/90 backdrop-blur-sm text-white px-6 py-3 rounded-lg inline-block border border-red-400/50">
            <span className="font-bold">⚠️ Disclaimer:</span> The content is for educational purposes only, not technical & financial advice.
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-300/20 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-300/20 rounded-full blur-lg"></div>
      </div>

      {/* Why FIM is Critical for Renewable Energy */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-600">
            Why FIM is Critical for Renewable Energy: The CAPEX Advantage
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg">
            Renewable energy projects are uniquely positioned to benefit from Free-Issue Material (FIM) strategies due to their equipment-intensive nature. Unlike traditional construction projects, renewable energy developments allocate 60-80% of their total CAPEX to critical components such as turbines, solar panels, inverters, and battery systems. This high equipment cost ratio creates unprecedented opportunities for cost optimization through direct procurement strategies.
          </p>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-3">Equipment CAPEX Breakdown by Technology:</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-semibold text-blue-700 mb-2">Wind Projects:</h5>
                <ul className="space-y-1 text-blue-600 text-sm">
                  <li>• Turbines: <span className="font-bold">65-75%</span> of total CAPEX</li>
                  <li>• Foundations: <span className="font-bold">10-15%</span> of total CAPEX</li>
                  <li>• Electrical systems: <span className="font-bold">8-12%</span> of total CAPEX</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-blue-700 mb-2">Solar Projects:</h5>
                <ul className="space-y-1 text-blue-600 text-sm">
                  <li>• Solar modules: <span className="font-bold">40-50%</span> of total CAPEX</li>
                  <li>• Inverters: <span className="font-bold">15-20%</span> of total CAPEX</li>
                  <li>• Mounting systems: <span className="font-bold">10-15%</span> of total CAPEX</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Project Type Showcase */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <img src="/images/onshore_wind.png" alt="Onshore Wind Farm" className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h5 className="font-bold text-lg mb-2">Onshore Wind</h5>
                  <p className="text-sm text-gray-600 mb-2">Equipment represents 70-75% of total project cost. Direct turbine procurement can save $2-5M per 100MW project.</p>
                  <div className="flex justify-between text-xs">
                    <span className="text-blue-600 font-semibold">Turbine CAPEX: 70%</span>
                    <span className="text-green-600 font-semibold">FIM Savings: 12-18%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <img src="/images/offshore_wind.png" alt="Offshore Wind Farm" className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h5 className="font-bold text-lg mb-2">Offshore Wind</h5>
                  <p className="text-sm text-gray-600 mb-2">Higher equipment costs (65-70% of CAPEX) due to specialized marine turbines. FIM critical for cost control.</p>
                  <div className="flex justify-between text-xs">
                    <span className="text-blue-600 font-semibold">Equipment CAPEX: 68%</span>
                    <span className="text-green-600 font-semibold">FIM Savings: 15-22%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <img src="/images/solar_farm.png" alt="Solar Farm" className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h5 className="font-bold text-lg mb-2">Solar Farms</h5>
                  <p className="text-sm text-gray-600 mb-2">Module and inverter costs dominate (60-65% of CAPEX). Bulk procurement enables significant economies of scale.</p>
                  <div className="flex justify-between text-xs">
                    <span className="text-blue-600 font-semibold">Equipment CAPEX: 63%</span>
                    <span className="text-green-600 font-semibold">FIM Savings: 10-16%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <img src="/images/bess_project.png" alt="BESS Project" className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h5 className="font-bold text-lg mb-2">BESS Projects</h5>
                  <p className="text-sm text-gray-600 mb-2">Battery systems account for 75-80% of total cost. Direct procurement essential for warranty and performance guarantees.</p>
                  <div className="flex justify-between text-xs">
                    <span className="text-blue-600 font-semibold">Battery CAPEX: 78%</span>
                    <span className="text-green-600 font-semibold">FIM Savings: 18-25%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg mt-6">
            <h4 className="font-semibold text-gray-800 mb-3 text-xl">The FIM Advantage in Numbers:</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">$50M+</div>
                <div className="text-sm text-gray-600">Potential savings on 500MW wind project</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">15-25%</div>
                <div className="text-sm text-gray-600">Typical contractor markup on equipment</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">60-80%</div>
                <div className="text-sm text-gray-600">Equipment share of renewable CAPEX</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* What is FIM? */}
      <Card className="border-l-4 border-l-purple-500">
        <CardHeader>
          <CardTitle className="text-2xl text-purple-600">
            What is Free-Issue Material (FIM)?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg">
            Free-Issue Material (FIM) is a strategic procurement approach where the project owner directly purchases and supplies critical, high-value components to the EPC (Engineering, Procurement, and Construction) or BOP (Balance of Plant) contractor. Instead of the contractor sourcing all materials and marking them up, the owner leverages their purchasing power and expertise to secure key equipment directly from manufacturers.
          </p>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-800 mb-3">Key Principles of FIM:</h4>
            <ul className="space-y-2 text-purple-700">
              <li><span className="font-bold">Direct Procurement:</span> Owner establishes direct relationships with equipment manufacturers.</li>
              <li><span className="font-bold">Cost Optimization:</span> Eliminates contractor markups and leverages bulk purchasing power.</li>
              <li><span className="font-bold">Quality Control:</span> Owner has direct oversight of manufacturing and quality assurance.</li>
              <li><span className="font-bold">Supply Chain Transparency:</span> Full visibility into the origin and logistics of critical components.</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Procurement Strategy Comparison */}
      <Card className="border-l-4 border-l-teal-500">
        <CardHeader>
          <CardTitle className="text-2xl text-teal-600">
            Choosing Your Path: Procurement Strategy Comparison
          </CardTitle>
          <p className="text-gray-600">Understand the fundamental differences between traditional and advanced procurement models.</p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="single-epc" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="single-epc">Single EPC</TabsTrigger>
              <TabsTrigger value="fim">BOP with FIM</TabsTrigger>
            </TabsList>
            <TabsContent value="single-epc" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-red-600">Single EPC: The Traditional Turnkey</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>In a Single EPC contract, one contractor is responsible for the entire project from Engineering, Procurement, to Construction. The owner hands over the project and receives a complete, operational facility.</p>
                  <div className="bg-red-50 p-3 rounded-lg">
                    <h5 className="font-semibold text-red-800 mb-2">Pros:</h5>
                    <ul className="list-disc list-inside text-red-700 text-sm">
                      <li>Simplified project management for the owner.</li>
                      <li>Single point of responsibility.</li>
                      <li>Predictable lump-sum cost (often).</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg">
                    <h5 className="font-semibold text-red-800 mb-2">Cons:</h5>
                    <ul className="list-disc list-inside text-red-700 text-sm">
                      <li>High contractor markups on equipment.</li>
                      <li>Limited transparency and control over supply chain.</li>
                      <li>Potential for quality compromises to meet budget.</li>
                      <li>Owner loses direct relationship with manufacturers.</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="fim" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-green-600">BOP with FIM: The Optimized Approach</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>BOP with FIM (Free-Issue Material) is an advanced form of the BOP model, specifically emphasizing the strategic direct procurement of critical, high-value components by the owner. The owner not only procures but also manages the logistics and quality assurance of these materials, issuing them "free" to the contractor for installation.</p>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <h5 className="font-semibold text-green-800 mb-2">Pros:</h5>
                    <ul className="list-disc list-inside text-green-700 text-sm">
                      <li>Maximum cost savings by eliminating markups and leveraging bulk discounts.</li>
                      <li>Full control over equipment quality, specifications, and warranties.</li>
                      <li>Direct relationships with manufacturers for better support and innovation.</li>
                      <li>Enhanced supply chain transparency and risk mitigation.</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <h5 className="font-semibold text-green-800 mb-2">Cons:</h5>
                    <ul className="list-disc list-inside text-green-700 text-sm">
                      <li>Requires internal procurement expertise and resources.</li>
                      <li>Increased logistical and coordination responsibilities for the owner.</li>
                      <li>Higher initial workload for setup and supplier management.</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Comparison Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-l-4 border-l-red-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <XCircle className="w-6 h-6" />
              Traditional Approach: The Pitfalls
            </CardTitle>
            <Badge variant="destructive">Outdated & Risky</Badge>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {[
                "Contractor supplies all materials: Lack of transparency and control over sourcing.",
                "Limited quality control: Reliance on contractor's standards, often leading to compromises.",
                "Higher markup costs: Significant hidden profits for contractors on critical components.",
                "Supply chain black box: No visibility into origin, ethics, or reliability of suppliers.",
                "Reduced standardization: Inconsistent components across projects, complicating maintenance and future upgrades."
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <XCircle className="w-5 h-5 text-red-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-6 h-6" />
              The FIM Approach: Strategic Advantages
            </CardTitle>
            <Badge className="bg-green-100 text-green-800">Advanced & Optimized</Badge>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {[
                "Project employer procures critical components: Direct control over quality, cost, and delivery.",
                "Direct supplier relationships: Build long-term partnerships, negotiate better terms, and ensure ethical sourcing.",
                "Bulk purchasing power: Leverage economies of scale for significant cost reductions.",
                "Quality control at source: Implement rigorous inspection and testing protocols from manufacturing to delivery.",
                "Standardization across projects: Ensure consistency, simplify spare parts management, and improve operational efficiency."
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Benefits of FIM */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-blue-700">
            Beyond Savings: Holistic Benefits of FIM
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <Lightbulb className="w-10 h-10 mx-auto mb-3 text-yellow-500" />
              <h4 className="font-bold text-lg mb-1">Enhanced Innovation</h4>
              <p className="text-sm text-gray-600">Direct engagement with manufacturers fosters co-development and access to cutting-edge technologies.</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <Shield className="w-10 h-10 mx-auto mb-3 text-purple-500" />
              <h4 className="font-bold text-lg mb-1">Reduced Risk Exposure</h4>
              <p className="text-sm text-gray-600">Mitigate supply chain disruptions, quality failures, and contractual disputes by taking direct control.</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <Users className="w-10 h-10 mx-auto mb-3 text-teal-500" />
              <h4 className="font-bold text-lg mb-1">Improved Stakeholder Trust</h4>
              <p className="text-sm text-gray-600">Transparency in procurement builds confidence with investors, regulators, and local communities.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Real Results from Our 500MW Wind Project: A FIM Success Story
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: DollarSign, value: animatedNumbers.costReduction, suffix: "%", label: "Cost Reduction", detail: "($50M savings)" },
              { icon: Clock, value: animatedNumbers.timeSaving, suffix: " months", label: "Faster Delivery", detail: "" },
              { icon: Target, value: animatedNumbers.qualityIssues, suffix: "", label: "Quality Issues", detail: "on turbines" },
              { icon: TrendingUp, value: animatedNumbers.warrantyImprovement, suffix: "%", label: "Better Warranty", detail: "terms" }
            ].map((item, index) => (
              <div key={index} className="text-center p-4 bg-white rounded-lg shadow-sm">
                <item.icon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <div className="text-3xl font-bold text-gray-800">
                  {item.value}{item.suffix}
                </div>
                <div className="text-sm font-medium text-gray-600">{item.label}</div>
                {item.detail && <div className="text-xs text-gray-500">{item.detail}</div>}
              </div>
            ))}
          </div>
          <p className="text-center text-gray-700 mt-6 text-lg font-semibold">
            The secret to these results? Strategic component selection and proactive supplier management through FIM.
          </p>
        </CardContent>
      </Card>

      {/* Interactive Calculator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-6 h-6" />
            FIM Savings Calculator: Estimate Your Project's Potential
          </CardTitle>
          <p className="text-gray-600">Adjust the sliders to see the potential cost savings for your renewable energy project by adopting the FIM approach.</p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Total Project Value ($ Million): <span className="font-bold">${calculatorValues.projectValue}M</span>
                </label>
                <input
                  type="range"
                  min="10"
                  max="1000"
                  step="10"
                  value={calculatorValues.projectValue}
                  onChange={(e) => setCalculatorValues({...calculatorValues, projectValue: parseInt(e.target.value)})}
                  className="w-full accent-blue-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Critical Component Cost (% of project value): <span className="font-bold">{calculatorValues.componentCost}%</span>
                </label>
                <input
                  type="range"
                  min="30"
                  max="80"
                  step="5"
                  value={calculatorValues.componentCost}
                  onChange={(e) => setCalculatorValues({...calculatorValues, componentCost: parseInt(e.target.value)})}
                  className="w-full accent-blue-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Typical Contractor Markup (% on components): <span className="font-bold">{calculatorValues.contractorMarkup}%</span>
                </label>
                <input
                  type="range"
                  min="5"
                  max="30"
                  step="1"
                  value={calculatorValues.contractorMarkup}
                  onChange={(e) => setCalculatorValues({...calculatorValues, contractorMarkup: parseInt(e.target.value)})}
                  className="w-full accent-blue-600"
                />
              </div>
            </div>
            <div className="bg-green-50 p-6 rounded-lg flex flex-col justify-center">
              <h4 className="font-semibold text-green-800 mb-4 text-xl">Potential FIM Savings</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg">Estimated Markup Savings:</span>
                  <span className="font-bold text-2xl text-green-600">${savings.absoluteSavings}M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg">Equivalent Project Cost Reduction:</span>
                  <span className="font-bold text-2xl text-green-600">{savings.totalSavings}%</span>
                </div>
                <Progress value={parseFloat(savings.totalSavings)} className="w-full mt-4" />
                <p className="text-sm text-gray-600 mt-2">*This calculation provides an estimate. Actual savings may vary based on project specifics.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Case Study Tabs */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Real-World Case Studies: FIM in Action</CardTitle>
          <p className="text-gray-600 text-center">Explore how the FIM approach delivered tangible benefits across diverse renewable energy projects.</p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="wind" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-blue-100">
              <TabsTrigger value="wind" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Offshore Wind</TabsTrigger>
              <TabsTrigger value="solar" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Solar Farm</TabsTrigger>
              <TabsTrigger value="storage" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Battery Storage</TabsTrigger>
            </TabsList>
            
            <TabsContent value="wind" className="space-y-4 p-4 border border-blue-200 rounded-b-lg">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-bold text-blue-800 mb-2 text-xl">North Sea Wind Farm - 500MW: Mastering Complexity</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold mb-2 text-lg">Challenge:</h5>
                    <p className="text-base">Managing a highly complex supply chain for massive turbines, foundations, and subsea cables, with multiple EPC contractors each adding significant markups and creating interface risks.</p>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-2 text-lg">FIM Solution:</h5>
                    <p className="text-base">The project owner directly procured the wind turbines (WTGs) and major foundation components from global manufacturers. EPC contractors were then responsible for installation, reducing their scope and associated markups on these critical, high-value items. This allowed for direct quality oversight and strategic vendor relationships.</p>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                  <div className="bg-white p-3 rounded shadow-sm">
                    <div className="font-bold text-green-600 text-2xl">$50M</div>
                    <div className="text-sm">Direct Cost Savings</div>
                  </div>
                  <div className="bg-white p-3 rounded shadow-sm">
                    <div className="font-bold text-blue-600 text-2xl">3 months</div>
                    <div className="text-sm">Accelerated Delivery</div>
                  </div>
                  <div className="bg-white p-3 rounded shadow-sm">
                    <div className="font-bold text-purple-600 text-2xl">Zero</div>
                    <div className="text-sm">Turbine Quality Issues</div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4">*This case study highlights the power of FIM in large-scale, complex infrastructure projects.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="solar" className="space-y-4 p-4 border border-yellow-200 rounded-b-lg">
              <div className="bg-yellow-50 p-6 rounded-lg">
                <h4 className="font-bold text-yellow-800 mb-2 text-xl">Desert Solar Complex - 200MW: Ensuring Standardization & Efficiency</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold mb-2 text-lg">Challenge:</h5>
                    <p className="text-base">Achieving consistent quality and standardization across multiple construction phases, with different contractors and varying panel specifications, leading to potential long-term operational inefficiencies.</p>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-2 text-lg">FIM Solution:</h5>
                    <p className="text-base">The project owner implemented FIM for all solar panels, inverters, and major racking systems. By bulk procuring these standardized components directly from preferred manufacturers, the project ensured uniformity, simplified spare parts management, and optimized long-term performance across the entire complex.</p>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                  <div className="bg-white p-3 rounded shadow-sm">
                    <div className="font-bold text-green-600 text-2xl">$25M</div>
                    <div className="text-sm">Procurement Savings</div>
                  </div>
                  <div className="bg-white p-3 rounded shadow-sm">
                    <div className="font-bold text-blue-600 text-2xl">18%</div>
                    <div className="text-sm">Efficiency Gain</div>
                  </div>
                  <div className="bg-white p-3 rounded shadow-sm">
                    <div className="font-bold text-purple-600 text-2xl">100%</div>
                    <div className="text-sm">Component Standardization</div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4">*FIM enabled seamless integration and long-term operational excellence for this multi-phase solar project.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="storage" className="space-y-4 p-4 border border-purple-200 rounded-b-lg">
              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="font-bold text-purple-800 mb-2 text-xl">Grid-Scale Battery Storage - 100MWh: Mitigating Technology Risk</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold mb-2 text-lg">Challenge:</h5>
                    <p className="text-base">Rapidly evolving battery technology, high contractor risk premiums due to novelty, and limited manufacturer warranty coverage when procured indirectly.</p>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-2 text-lg">FIM Solution:</h5>
                    <p className="text-base">The project owner directly purchased the battery energy storage systems (BESS) from a leading global manufacturer. This direct relationship secured a 10-year performance warranty, significantly reduced technology risk, and ensured access to the latest battery chemistries, while contractors focused on balance-of-plant integration.</p>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                  <div className="bg-white p-3 rounded shadow-sm">
                    <div className="font-bold text-green-600 text-2xl">$15M</div>
                    <div className="text-sm">Cost Savings</div>
                  </div>
                  <div className="bg-white p-3 rounded shadow-sm">
                    <div className="font-bold text-blue-600 text-2xl">10 years</div>
                    <div className="text-sm">Direct Warranty</div>
                  </div>
                  <div className="bg-white p-3 rounded shadow-sm">
                    <div className="font-bold text-purple-600 text-2xl">95%</div>
                    <div className="text-sm">Performance Guarantee</div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4">*FIM proved crucial for de-risking investment in cutting-edge, high-value battery technology.</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* FIM Implementation Roadmap */}
      {/* FIM Implementation Roadmap */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-purple-700">
            FIM Implementation Roadmap: Your Path to Procurement Excellence
          </CardTitle>
          <p className="text-center text-gray-600">
            A structured, phased approach to successfully integrate Free-Issue Material strategy into your renewable energy projects.
          </p>
        </CardHeader>
        <CardContent>
          <div className="relative flex flex-col items-center py-8">
            {/* Phase 1 */}
            <div className="flex items-center w-full max-w-2xl mb-8">
              <div className="flex-shrink-0 w-1/3 text-right pr-4">
                <h4 className="font-bold text-lg text-purple-600">Phase 1: Strategic Assessment & Planning</h4>
              </div>
              <div className="flex-grow border-t-2 border-purple-400 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white rounded-full h-6 w-6 flex items-center justify-center text-sm font-bold">1</div>
              </div>
              <div className="flex-shrink-0 w-1/3 pl-4">
                <ul className="list-none space-y-1 text-sm text-gray-700">
                  <li><CheckCircle className="inline-block w-4 h-4 text-green-500 mr-1" /> Analyze project component breakdown and identify high-value, high-risk items suitable for FIM.</li>
                  <li><CheckCircle className="inline-block w-4 h-4 text-green-500 mr-1" /> Conduct a thorough market assessment of potential direct suppliers for identified components.</li>
                  <li><CheckCircle className="inline-block w-4 h-4 text-green-500 mr-1" /> Develop a detailed FIM procurement plan, including budget allocation, and risk mitigation strategies.</li>
                  <li><CheckCircle className="inline-block w-4 h-4 text-green-500 mr-1" /> Define clear roles and responsibilities for internal teams and external consultants.</li>
                </ul>
              </div>
            </div>

            {/* Connector */}
            <div className="w-0.5 h-16 bg-purple-400"></div>

            {/* Phase 2 */}
            <div className="flex items-center w-full max-w-2xl mb-8 flex-row-reverse">
              <div className="flex-shrink-0 w-1/3 text-left pl-4">
                <h4 className="font-bold text-lg text-purple-600">Phase 2: Supplier Engagement & Negotiation</h4>
              </div>
              <div className="flex-grow border-t-2 border-purple-400 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white rounded-full h-6 w-6 flex items-center justify-center text-sm font-bold">2</div>
              </div>
              <div className="flex-shrink-0 w-1/3 pr-4 text-right">
                <ul className="list-none space-y-1 text-sm text-gray-700">
                  <li><CheckCircle className="inline-block w-4 h-4 text-green-500 mr-1" /> Issue comprehensive Requests for Quotation (RFQs) to pre-qualified global manufacturers.</li>
                  <li><CheckCircle className="inline-block w-4 h-4 text-green-500 mr-1" /> Evaluate technical specifications, production capabilities, quality control processes, and commercial proposals.</li>
                  <li><CheckCircle className="inline-block w-4 h-4 text-green-500 mr-1" /> Conduct rigorous supplier audits and due diligence, including factory visits and reference checks.</li>
                  <li><CheckCircle className="inline-block w-4 h-4 text-green-500 mr-1" /> Negotiate favorable terms, pricing, warranty, and delivery schedules directly with selected suppliers.</li>
                </ul>
              </div>
            </div>

            {/* Connector */}
            <div className="w-0.5 h-16 bg-purple-400"></div>

            {/* Phase 3 */}
            <div className="flex items-center w-full max-w-2xl mb-8">
              <div className="flex-shrink-0 w-1/3 text-right pr-4">
                <h4 className="font-bold text-lg text-purple-600">Phase 3: Contract Integration & Logistics Setup</h4>
              </div>
              <div className="flex-grow border-t-2 border-purple-400 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white rounded-full h-6 w-6 flex items-center justify-center text-sm font-bold">3</div>
              </div>
              <div className="flex-shrink-0 w-1/3 pl-4">
                <ul className="list-none space-y-1 text-sm text-gray-700">
                  <li><CheckCircle className="inline-block w-4 h-4 text-green-500 mr-1" /> Modify existing EPC (Engineering, Procurement, and Construction) or Balance of Plant (BOP) contracts to clearly define FIM scope and responsibilities.</li>
                  <li><CheckCircle className="inline-block w-4 h-4 text-green-500 mr-1" /> Establish robust interface management protocols between direct suppliers, EPC contractors, and project teams.</li>
                  <li><CheckCircle className="inline-block w-4 h-4 text-green-500 mr-1" /> Set up comprehensive quality control and inspection procedures for FIM components at various stages (factory, port, site).</li>
                  <li><CheckCircle className="inline-block w-4 h-4 text-green-500 mr-1" /> Develop a detailed logistics and delivery plan, including transportation, insurance, and customs clearance.</li>
                </ul>
              </div>
            </div>

            {/* Connector */}
            <div className="w-0.5 h-16 bg-purple-400"></div>

            {/* Phase 4 */}
            <div className="flex items-center w-full max-w-2xl flex-row-reverse">
              <div className="flex-shrink-0 w-1/3 text-left pl-4">
                <h4 className="font-bold text-lg text-purple-600">Phase 4: Execution & Proactive Monitoring</h4>
              </div>
              <div className="flex-grow border-t-2 border-purple-400 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white rounded-full h-6 w-6 flex items-center justify-center text-sm font-bold">4</div>
              </div>
              <div className="flex-shrink-0 w-1/3 pr-4 text-right">
                <ul className="list-none space-y-1 text-sm text-gray-700">
                  <li><CheckCircle className="inline-block w-4 h-4 text-green-500 mr-1" /> Actively monitor supplier performance, production milestones, and delivery schedules.</li>
                  <li><CheckCircle className="inline-block w-4 h-4 text-green-500 mr-1" /> Coordinate closely with EPC contractors to ensure timely availability of FIM components at the construction site.</li>
                  <li><CheckCircle className="inline-block w-4 h-4 text-green-500 mr-1" /> Manage quality inspections and resolve any non-conformance issues promptly and directly with suppliers.</li>
                  <li><CheckCircle className="inline-block w-4 h-4 text-green-500 mr-1" /> Track cost savings, schedule improvements, and quality metrics to demonstrate the value of the FIM strategy.</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Author */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="text-center py-8">
          <h3 className="text-2xl font-bold mb-4">Have Questions or Need More Details?</h3>
          <p className="text-lg mb-6 opacity-90">
            For more in-depth information, technical insights, or to discuss specific project applications, please feel free to contact the author, Duc Hoang.
          </p>
          <div className="space-y-4">
            <a href="mailto:duchoang@example.com" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 px-8 bg-white text-blue-600 hover:bg-gray-100">
              <Users className="w-5 h-5 mr-2" />
              Contact Duc Hoang
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FIMRevolutionArticle;

