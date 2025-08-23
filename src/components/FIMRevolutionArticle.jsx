import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Calculator, TrendingUp, CheckCircle, XCircle, DollarSign, Clock, Target, BarChart3 } from 'lucide-react';

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
    const markupSavings = (componentCost * contractorMarkup) / 100;
    const totalSavings = (markupSavings / projectValue) * 100;
    return {
      markupSavings: markupSavings.toFixed(1),
      totalSavings: totalSavings.toFixed(1),
      absoluteSavings: (projectValue * totalSavings / 100).toFixed(1)
    };
  };

  const savings = calculateSavings();

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl">
        <h1 className="text-4xl md:text-6xl font-bold">
          The FIM Revolution
        </h1>
        <p className="text-xl md:text-2xl opacity-90">
          Project Management Excellence for Renewable Energy
        </p>
        <Badge className="bg-white text-blue-600 text-lg px-4 py-2">
          Advanced Procurement Strategy Series
        </Badge>
      </div>

      {/* Problem Statement */}
      <Card className="border-l-4 border-l-red-500">
        <CardHeader>
          <CardTitle className="text-2xl text-red-600">
            The $2 Billion Problem Most PMs Don't See
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg">
            In renewable energy projects, 70% of cost overruns stem from procurement inefficiencies. 
            Traditional approaches leave project managers blind to supply chain costs, quality issues, 
            and delivery risks that can derail multi-million dollar investments.
          </p>
          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="font-semibold text-red-800 mb-2">Industry Reality Check:</h4>
            <ul className="space-y-2 text-red-700">
              <li>• Average cost overrun: 23% on renewable energy projects</li>
              <li>• Quality issues discovered post-installation: 40% of projects</li>
              <li>• Supply chain delays: 60% of projects experience 2+ month delays</li>
              <li>• Contractor markup on components: 15-25% industry average</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Comparison Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-l-4 border-l-red-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <XCircle className="w-6 h-6" />
              Traditional Approach
            </CardTitle>
            <Badge variant="destructive">Outdated</Badge>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {[
                "Contractor supplies all materials",
                "Limited quality control",
                "Higher markup costs",
                "Supply chain black box",
                "Reduced standardization"
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
              FIM Approach
            </CardTitle>
            <Badge className="bg-green-100 text-green-800">Advanced</Badge>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {[
                "Project employer procures critical components",
                "Direct supplier relationships",
                "Bulk purchasing power",
                "Quality control at source",
                "Standardization across projects"
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

      {/* Results Section */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Real Results from Our 500MW Wind Project
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
        </CardContent>
      </Card>

      {/* Interactive Calculator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-6 h-6" />
            FIM Savings Calculator
          </CardTitle>
          <p className="text-gray-600">Calculate potential savings for your project</p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Project Value ($ Million): {calculatorValues.projectValue}
                </label>
                <input
                  type="range"
                  min="10"
                  max="1000"
                  value={calculatorValues.projectValue}
                  onChange={(e) => setCalculatorValues({...calculatorValues, projectValue: parseInt(e.target.value)})}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Component Cost (% of project): {calculatorValues.componentCost}%
                </label>
                <input
                  type="range"
                  min="30"
                  max="80"
                  value={calculatorValues.componentCost}
                  onChange={(e) => setCalculatorValues({...calculatorValues, componentCost: parseInt(e.target.value)})}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Contractor Markup (%): {calculatorValues.contractorMarkup}%
                </label>
                <input
                  type="range"
                  min="5"
                  max="30"
                  value={calculatorValues.contractorMarkup}
                  onChange={(e) => setCalculatorValues({...calculatorValues, contractorMarkup: parseInt(e.target.value)})}
                  className="w-full"
                />
              </div>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-4">Potential FIM Savings</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Markup Savings:</span>
                  <span className="font-bold">${savings.markupSavings}M</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Project Savings:</span>
                  <span className="font-bold text-green-600">{savings.totalSavings}%</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span>Absolute Savings:</span>
                  <span className="font-bold text-green-600">${savings.absoluteSavings}M</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Case Study Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Real-World Case Studies</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="wind" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="wind">Offshore Wind</TabsTrigger>
              <TabsTrigger value="solar">Solar Farm</TabsTrigger>
              <TabsTrigger value="storage">Battery Storage</TabsTrigger>
            </TabsList>
            
            <TabsContent value="wind" className="space-y-4">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-bold text-blue-800 mb-2">North Sea Wind Farm - 500MW</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold mb-2">Challenge:</h5>
                    <p className="text-sm">Complex supply chain for turbines, foundations, and cables with multiple contractors adding markups.</p>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-2">FIM Solution:</h5>
                    <p className="text-sm">Direct procurement of turbines and major components, contractor responsible for installation only.</p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                  <div className="bg-white p-3 rounded">
                    <div className="font-bold text-green-600">$50M</div>
                    <div className="text-xs">Cost Savings</div>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <div className="font-bold text-blue-600">3 months</div>
                    <div className="text-xs">Time Saved</div>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <div className="font-bold text-purple-600">Zero</div>
                    <div className="text-xs">Quality Issues</div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="solar" className="space-y-4">
              <div className="bg-yellow-50 p-6 rounded-lg">
                <h4 className="font-bold text-yellow-800 mb-2">Desert Solar Complex - 200MW</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold mb-2">Challenge:</h5>
                    <p className="text-sm">Standardization across multiple phases with different contractors and varying panel specifications.</p>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-2">FIM Solution:</h5>
                    <p className="text-sm">Bulk procurement of standardized panels, inverters, and mounting systems across all phases.</p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                  <div className="bg-white p-3 rounded">
                    <div className="font-bold text-green-600">$25M</div>
                    <div className="text-xs">Cost Savings</div>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <div className="font-bold text-blue-600">18%</div>
                    <div className="text-xs">Efficiency Gain</div>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <div className="font-bold text-purple-600">100%</div>
                    <div className="text-xs">Standardization</div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="storage" className="space-y-4">
              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="font-bold text-purple-800 mb-2">Grid-Scale Battery Storage - 100MWh</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold mb-2">Challenge:</h5>
                    <p className="text-sm">Rapidly evolving battery technology with high contractor risk premiums and limited warranty coverage.</p>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-2">FIM Solution:</h5>
                    <p className="text-sm">Direct battery procurement with manufacturer warranty, contractor handles integration and commissioning.</p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                  <div className="bg-white p-3 rounded">
                    <div className="font-bold text-green-600">$15M</div>
                    <div className="text-xs">Cost Savings</div>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <div className="font-bold text-blue-600">10 years</div>
                    <div className="text-xs">Warranty</div>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <div className="font-bold text-purple-600">95%</div>
                    <div className="text-xs">Performance</div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Implementation Guide */}
      <Card>
        <CardHeader>
          <CardTitle>FIM Implementation Roadmap</CardTitle>
          <p className="text-gray-600">Your step-by-step guide to implementing Free-Issue Material strategy</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[
              {
                phase: "Phase 1: Assessment & Planning",
                duration: "2-4 weeks",
                tasks: [
                  "Analyze project component breakdown",
                  "Identify critical components for FIM",
                  "Assess supplier market and capabilities",
                  "Develop procurement timeline"
                ]
              },
              {
                phase: "Phase 2: Supplier Selection",
                duration: "4-6 weeks", 
                tasks: [
                  "Issue RFQs to qualified suppliers",
                  "Evaluate technical and commercial proposals",
                  "Conduct supplier audits and due diligence",
                  "Negotiate framework agreements"
                ]
              },
              {
                phase: "Phase 3: Contract Integration",
                duration: "2-3 weeks",
                tasks: [
                  "Modify EPC contracts for FIM approach",
                  "Define interface responsibilities",
                  "Establish quality control procedures",
                  "Set up logistics and delivery protocols"
                ]
              },
              {
                phase: "Phase 4: Execution & Monitoring",
                duration: "Project duration",
                tasks: [
                  "Monitor supplier performance and delivery",
                  "Coordinate with EPC contractor",
                  "Manage quality inspections",
                  "Track cost and schedule performance"
                ]
              }
            ].map((phase, index) => (
              <div key={index} className="border-l-4 border-l-blue-500 pl-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-blue-800">{phase.phase}</h4>
                  <Badge variant="outline">{phase.duration}</Badge>
                </div>
                <ul className="space-y-1 text-sm">
                  {phase.tasks.map((task, taskIndex) => (
                    <li key={taskIndex} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="text-center py-8">
          <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Project Management?</h3>
          <p className="text-lg mb-6 opacity-90">
            Join the FIM Revolution and unlock advanced procurement strategies for your renewable energy projects.
          </p>
          <div className="space-y-4">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Download FIM Implementation Guide
            </Button>
            <div className="text-sm opacity-75">
              Get the complete toolkit with templates, checklists, and case studies
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FIMRevolutionArticle;

