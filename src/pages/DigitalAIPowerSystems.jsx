import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Calendar,
  Clock,
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Zap,
  Globe,
  Brain,
  Shield,
  Users,
  BarChart3,
  Cpu,
  Wifi,
  Eye,
  Target,
  ChevronDown,
  ChevronUp,
  Activity,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  Monitor,
  Server,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  LineChart,
  Line,
} from 'recharts';

// ─── DATA ────────────────────────────────────────────────────────────────────

const DIGITAL_PROJECTS_BY_REGION = [
  { region: 'North America & Europe', projects: 154, color: '#00d4aa' },
  { region: 'Asia-Pacific', projects: 42, color: '#f39c12' },
  { region: 'Latin America', projects: 8, color: '#3b82f6' },
  { region: 'Middle East & Africa', projects: 3, color: '#e74c3c' },
  { region: 'Multinational', projects: 3, color: '#8b5cf6' },
];

const DIGITAL_PROJECTS_GROWTH = [
  { year: '2017', total: 22, northAm: 5, europe: 4, asia: 1, other: 12 },
  { year: '2018', total: 53, northAm: 12, europe: 21, asia: 8, other: 12 },
  { year: '2019', total: 94, northAm: 27, europe: 32, asia: 27, other: 8 },
  { year: '2020', total: 103, northAm: 24, europe: 33, asia: 33, other: 13 },
  { year: '2021', total: 102, northAm: 27, europe: 25, asia: 36, other: 14 },
  { year: '2022', total: 154, northAm: 64, europe: 38, asia: 26, other: 26 },
  { year: '2023', total: 210, northAm: 94, europe: 60, asia: 42, other: 14 },
];

const TECH_AREA_BREAKDOWN = [
  { name: 'Grid Control', value: 29, color: '#3b82f6' },
  { name: 'Analytics Software', value: 27, color: '#10b981' },
  { name: 'Sensors/Edge', value: 17, color: '#f59e0b' },
  { name: 'Cloud/Data', value: 9, color: '#8b5cf6' },
  { name: 'Automation', value: 8, color: '#ec4899' },
  { name: 'Cyber Security', value: 6, color: '#ef4444' },
  { name: 'Communications', value: 4, color: '#64748b' },
];

const BARRIERS_DATA = [
  { barrier: 'Workforce Skills', critical: 60, medium: 37, low: 4 },
  { barrier: 'Cyber Security', critical: 56, medium: 40, low: 4 },
  { barrier: 'Regulatory Uncertainty', critical: 54, medium: 46, low: 0 },
  { barrier: 'Financial Incentives', critical: 53, medium: 45, low: 2 },
  { barrier: 'Infrastructure Readiness', critical: 47, medium: 42, low: 11 },
  { barrier: 'Stakeholder Trust', critical: 33, medium: 61, low: 5 },
  { barrier: 'Data Scarcity', critical: 44, medium: 49, low: 7 },
];

const DATA_BARRIERS = [
  { barrier: 'Data Availability', critical: 55, medium: 40, low: 5 },
  { barrier: 'Data Quality', critical: 47, medium: 49, low: 4 },
  { barrier: 'Data Accessibility', critical: 47, medium: 49, low: 4 },
  { barrier: 'Interoperability', critical: 43, medium: 55, low: 2 },
  { barrier: 'Data Timeliness', critical: 38, medium: 55, low: 7 },
  { barrier: 'Legal/Governance', critical: 62, medium: 36, low: 2 },
  { barrier: 'Institutional Capacity', critical: 47, medium: 47, low: 5 },
];

const USE_CASE_TIMELINE = [
  { useCase: 'Granular monitoring', shortTerm: 47, longTerm: 53 },
  { useCase: 'AI-based forecasting', shortTerm: 41, longTerm: 59 },
  { useCase: 'Power flow optimisation', shortTerm: 43, longTerm: 57 },
  { useCase: 'Risk assessment AI', shortTerm: 38, longTerm: 62 },
  { useCase: 'Smart consumer devices', shortTerm: 41, longTerm: 59 },
  { useCase: 'Data sharing', shortTerm: 43, longTerm: 57 },
];

const VALUE_CLUSTERS = [
  { cluster: 'Monitoring', description: 'Smart sensors, DLR, digital twins, SCADA, PMUs', icon: Eye, color: '#3b82f6', benefit: 'Foundation of all digital solutions' },
  { cluster: 'Forecasting', description: 'AI demand prediction, VRE forecasts, predictive maintenance', icon: Brain, color: '#10b981', benefit: '45% more accurate predictions' },
  { cluster: 'Optimisation', description: 'FACTS, dynamic voltage, optimal power flows, DER aggregation', icon: Target, color: '#f59e0b', benefit: 'Maximise existing grid capacity' },
  { cluster: 'End-User Automation', description: 'Smart appliances, V2G, demand response, HEMS', icon: Zap, color: '#8b5cf6', benefit: '70% consumers get more control' },
  { cluster: 'Transparency', description: 'Data exchange, carbon credits, digital permitting, GOs', icon: Globe, color: '#ec4899', benefit: 'Enable innovation ecosystem' },
];

const GLOBAL_PRIORITIES = [
  { priority: 'Policy Alignment', critical: 75, medium: 23, low: 2 },
  { priority: 'New Investment Models (EMDE)', critical: 78, medium: 20, low: 2 },
  { priority: 'Ethical Guidelines', critical: 73, medium: 25, low: 2 },
  { priority: 'Cross-border Data Governance', critical: 63, medium: 36, low: 2 },
  { priority: 'Cyber Security Coordination', critical: 71, medium: 29, low: 0 },
];

const KEY_STATS = [
  { label: 'Electricity Share by 2050', value: '52%', sub: 'of final energy consumption', icon: Zap, color: 'amber' },
  { label: 'RE Capacity Additions 2024', value: '92.5%', sub: 'of all new capacity', icon: TrendingUp, color: 'green' },
  { label: 'AI Forecast Improvement', value: '45%', sub: 'more accurate than traditional', icon: Brain, color: 'blue' },
  { label: 'Outage Reduction (FLISR)', value: '50%', sub: 'shorter outage duration', icon: Shield, color: 'purple' },
  { label: 'Denmark AI Savings', value: '$9M/yr', sub: 'operating reserve costs cut 10-15%', icon: TrendingDown, color: 'cyan' },
  { label: 'Skills Gap Barrier', value: '60%', sub: 'say workforce is #1 barrier', icon: Users, color: 'red' },
];

const MEME_IMAGES = [
  { id: 1, src: '/images/irena-digital-ai/01_80_20_data_cleaning.png', title: '80% Data Cleaning', caption: 'Practitioners spend 80% of their time finding, cleaning, and organising data' },
  { id: 2, src: '/images/irena-digital-ai/02_digital_divide_10x.png', title: 'The 10x Digital Divide', caption: '10x more digital energy projects in the West than the developing world' },
  { id: 3, src: '/images/irena-digital-ai/03_domino_electricity_52pct.png', title: 'The Domino Effect', caption: 'Electricity grows from 20% to 52% of all energy by 2050' },
  { id: 4, src: '/images/irena-digital-ai/04_denmark_iceberg_9M.png', title: 'Denmark\'s Hidden AI', caption: 'AI-enhanced wind forecasting saves $9M/year for customers' },
  { id: 5, src: '/images/irena-digital-ai/05_4hours_vs_4seconds.png', title: '4 Hours vs 4 Seconds', caption: 'Automated FLISR restores power in seconds, not hours' },
  { id: 6, src: '/images/irena-digital-ai/06_hiring_parody.png', title: 'The Hiring Problem', caption: '60% of leaders say skill shortage is the #1 barrier' },
  { id: 7, src: '/images/irena-digital-ai/07_strategy_vs_reality.png', title: 'Strategy vs Reality', caption: '66% have a strategy, most don\'t expect results within 3 years' },
  { id: 8, src: '/images/irena-digital-ai/08_brain_expansion_forecasting.png', title: 'Forecasting Evolution', caption: 'AI ensemble forecasts are 45% more accurate than traditional methods' },
  { id: 9, src: '/images/irena-digital-ai/09_comfort_myth_dead.png', title: 'The Comfort Myth Is Dead', caption: '70% of US consumers get MORE comfort AND lower bills' },
  { id: 10, src: '/images/irena-digital-ai/10_quantum_vs_classical.png', title: 'Quantum Is Coming', caption: 'Post-2030: quantum will solve millions of grid scenarios simultaneously' },
];

// ─── HELPER COMPONENTS ───────────────────────────────────────────────────────

function StatCard({ label, value, sub, icon: Icon, color = 'blue' }) {
  const colorMap = {
    blue: 'text-blue-600', green: 'text-green-600', amber: 'text-amber-600',
    red: 'text-red-600', purple: 'text-purple-600', cyan: 'text-cyan-600',
  };
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{label}</CardTitle>
        <Icon className={`h-4 w-4 ${colorMap[color]}`} />
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${colorMap[color]}`}>{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{sub}</p>
      </CardContent>
    </Card>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 shadow-lg rounded-lg p-3 text-sm">
      <p className="font-semibold text-gray-900 mb-1">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-gray-600">{entry.name}:</span>
          <span className="font-medium">{entry.value}%</span>
        </p>
      ))}
    </div>
  );
}

function CustomTooltipNum({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 shadow-lg rounded-lg p-3 text-sm">
      <p className="font-semibold text-gray-900 mb-1">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-gray-600">{entry.name}:</span>
          <span className="font-medium">{entry.value}</span>
        </p>
      ))}
    </div>
  );
}

function InsightCard({ icon: Icon, title, stat, description, color = '#3b82f6' }) {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-l-4" style={{ borderLeftColor: color }}>
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <div className="rounded-full p-2 shrink-0" style={{ backgroundColor: `${color}15` }}>
            <Icon className="h-5 w-5" style={{ color }} />
          </div>
          <div>
            <h3 className="font-bold text-lg mb-1">{title}</h3>
            <p className="text-2xl font-bold mb-2" style={{ color }}>{stat}</p>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function MemeGallery({ memes }) {
  const [selectedMeme, setSelectedMeme] = useState(null);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {memes.map((meme) => (
          <Card
            key={meme.id}
            className="hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group"
            onClick={() => setSelectedMeme(meme)}
          >
            <div className="relative overflow-hidden">
              <img
                src={meme.src}
                alt={meme.title}
                className="w-full h-auto group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <CardContent className="pt-4">
              <h3 className="font-bold text-base mb-1">{meme.title}</h3>
              <p className="text-sm text-muted-foreground">{meme.caption}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      {selectedMeme && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedMeme(null)}
        >
          <div className="max-w-4xl max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <img src={selectedMeme.src} alt={selectedMeme.title} className="w-full h-auto rounded-lg" />
            <div className="bg-white rounded-b-lg p-4 text-center">
              <h3 className="font-bold text-lg">{selectedMeme.title}</h3>
              <p className="text-gray-600">{selectedMeme.caption}</p>
              <Button variant="outline" className="mt-3" onClick={() => setSelectedMeme(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export function DigitalAIPowerSystems() {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedBarrier, setExpandedBarrier] = useState(null);

  return (
    <>
      <Helmet>
        <title>Digitalisation & AI for Power Systems: IRENA 2025 Interactive Analysis | Tech Made Easy</title>
        <meta name="description" content="An interactive deep-dive into IRENA's 2025 report on how AI, digital twins, smart grids, and automation are transforming power systems globally. Key data, insights, and memes for the energy transition." />
        <link rel="canonical" href="https://techmadeeasy.info/blog/digitalisation-ai-power-systems" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Digitalisation & AI for Power Systems: IRENA 2025 Interactive Analysis" />
        <meta property="og:description" content="How AI and digitalisation are reshaping global power systems. Interactive charts, key stats, and data-driven memes from the IRENA G7 report." />
        <meta property="og:url" content="https://techmadeeasy.info/blog/digitalisation-ai-power-systems" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* HEADER */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Link to="/blog" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Link>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />March 2026
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />18 min read
                </Badge>
                <Badge className="bg-blue-100 text-blue-800">IRENA 2025</Badge>
                <Badge className="bg-purple-100 text-purple-800">G7 Advisory</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* HERO */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-indigo-100 text-indigo-800 text-sm">IRENA 2025 Report Analysis</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Digitalisation & AI for<br />Power System Transformation
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              A digitalised power system is no longer a nice option — it's a <span className="font-bold text-blue-600">decisive enabler</span> of electrification and decarbonisation. An interactive deep-dive into the data behind the transformation.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-500">
              <span>Source: IRENA (2025) — Perspectives for the G7</span>
              <span>|</span>
              <span>68 pages, 170 member countries</span>
              <span>|</span>
              <span>Interactive analysis by techmadeeasy</span>
            </div>
          </div>

          {/* KEY STATS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {KEY_STATS.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>

          {/* TABS NAVIGATION */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 mb-8 h-auto">
              <TabsTrigger value="overview" className="text-xs sm:text-sm py-2">
                <BarChart3 className="h-3.5 w-3.5 mr-1 hidden sm:inline" />Overview
              </TabsTrigger>
              <TabsTrigger value="value" className="text-xs sm:text-sm py-2">
                <Zap className="h-3.5 w-3.5 mr-1 hidden sm:inline" />Value Clusters
              </TabsTrigger>
              <TabsTrigger value="barriers" className="text-xs sm:text-sm py-2">
                <AlertTriangle className="h-3.5 w-3.5 mr-1 hidden sm:inline" />Barriers
              </TabsTrigger>
              <TabsTrigger value="cases" className="text-xs sm:text-sm py-2">
                <CheckCircle className="h-3.5 w-3.5 mr-1 hidden sm:inline" />Case Studies
              </TabsTrigger>
              <TabsTrigger value="memes" className="text-xs sm:text-sm py-2">
                <Lightbulb className="h-3.5 w-3.5 mr-1 hidden sm:inline" />Key Insights
              </TabsTrigger>
              <TabsTrigger value="recommendations" className="text-xs sm:text-sm py-2">
                <Target className="h-3.5 w-3.5 mr-1 hidden sm:inline" />Action Plan
              </TabsTrigger>
            </TabsList>

            {/* ─── TAB: OVERVIEW ─── */}
            <TabsContent value="overview" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Digital Projects Growth */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                      Digital Projects in Power Sector (2017-2023)
                    </CardTitle>
                    <CardDescription>Number of digital projects tracked by BloombergNEF</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={350}>
                      <BarChart data={DIGITAL_PROJECTS_GROWTH}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip content={<CustomTooltipNum />} />
                        <Legend />
                        <Bar dataKey="northAm" name="North America" fill="#3b82f6" stackId="a" />
                        <Bar dataKey="europe" name="Europe" fill="#10b981" stackId="a" />
                        <Bar dataKey="asia" name="Asia-Pacific" fill="#f59e0b" stackId="a" />
                        <Bar dataKey="other" name="Other" fill="#8b5cf6" stackId="a" />
                      </BarChart>
                    </ResponsiveContainer>
                    <p className="text-xs text-gray-500 mt-2 text-center">Source: BNEF 2024 via IRENA</p>
                  </CardContent>
                </Card>

                {/* Technology Area Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Cpu className="h-5 w-5 text-purple-600" />
                      Digitalisation by Technology Area (2023-2024)
                    </CardTitle>
                    <CardDescription>353 projects tracked across 7 technology areas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={350}>
                      <PieChart>
                        <Pie
                          data={TECH_AREA_BREAKDOWN}
                          cx="50%"
                          cy="50%"
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          {TECH_AREA_BREAKDOWN.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <p className="text-xs text-gray-500 mt-2 text-center">Grid control accounts for ~30% of all activities</p>
                  </CardContent>
                </Card>
              </div>

              {/* The Big Picture */}
              <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-transparent">
                <CardHeader>
                  <CardTitle className="text-xl">The Big Picture: Why Digitalisation Matters Now</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4">
                      <div className="text-4xl font-bold text-blue-600">52%</div>
                      <p className="text-sm text-gray-600 mt-1">Electricity's share of final energy by 2050, up from ~20% today</p>
                    </div>
                    <div className="text-center p-4">
                      <div className="text-4xl font-bold text-green-600">91%</div>
                      <p className="text-sm text-gray-600 mt-1">New RE projects cheaper than cheapest fossil fuel in 2024</p>
                    </div>
                    <div className="text-center p-4">
                      <div className="text-4xl font-bold text-amber-600">3.5x</div>
                      <p className="text-sm text-gray-600 mt-1">More digital projects in the West than Asia-Pacific</p>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    The ongoing transformation of power systems is characterised by increasing complexity. As electricity demand doubles,
                    the variability of growing demand and generation — alongside rising numbers of distributed energy resources — requires
                    a <strong>digital transformation</strong> of power systems to maintain reliability without diminishing the cost reductions brought by renewables.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Yet IRENA finds that <strong>66% of countries</strong> are incorporating digitalisation in their energy strategies, while
                    <strong> most respondents</strong> don't believe any digital use case will be available in their country within 3 years.
                    The gap between strategy and execution is the central challenge.
                  </p>
                </CardContent>
              </Card>

              {/* Digital Divide */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-red-600" />
                    The Digital Energy Divide
                  </CardTitle>
                  <CardDescription>Digital projects deployed by region in 2023</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={DIGITAL_PROJECTS_BY_REGION} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="region" width={160} tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Bar dataKey="projects" name="Projects">
                        {DIGITAL_PROJECTS_BY_REGION.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <p className="text-sm text-amber-800">
                      <strong>Key insight:</strong> Sub-Saharan Africa accounts for 85% of the global population without electricity,
                      yet receives only 4% of global R&D spending. The cost of capital for generation projects is ~3.8% in Europe
                      vs ~12% in Africa.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ─── TAB: VALUE CLUSTERS ─── */}
            <TabsContent value="value" className="space-y-8">
              <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50 to-transparent">
                <CardHeader>
                  <CardTitle className="text-xl">Five Value Clusters of Power System Digitalisation</CardTitle>
                  <CardDescription>
                    IRENA categorises digital solutions by their value proposition. Together, these clusters lead to the digital
                    orchestration of power systems.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {VALUE_CLUSTERS.map((vc) => (
                      <Card key={vc.cluster} className="hover:shadow-md transition-shadow">
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="rounded-full p-2" style={{ backgroundColor: `${vc.color}15` }}>
                              <vc.icon className="h-5 w-5" style={{ color: vc.color }} />
                            </div>
                            <h3 className="font-bold">{vc.cluster}</h3>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{vc.description}</p>
                          <Badge className="text-xs" style={{ backgroundColor: `${vc.color}15`, color: vc.color }}>
                            {vc.benefit}
                          </Badge>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Key Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InsightCard
                  icon={TrendingDown}
                  title="Reduced Electricity Costs"
                  stat="$9M+ saved/year"
                  description="AI-enhanced forecasting in Denmark reduced operating reserve costs by 10-15%, yielding annual savings of more than USD 9 million for customers."
                  color="#10b981"
                />
                <InsightCard
                  icon={Shield}
                  title="Improved Security of Supply"
                  stat="45% fewer interruptions"
                  description="Grids equipped with automation reduce supply interruptions by up to 45% and outage duration by over 50% in controlled trials."
                  color="#3b82f6"
                />
                <InsightCard
                  icon={Brain}
                  title="Greater RE Integration"
                  stat="45% more accurate"
                  description="AI-enhanced forecasting enables up to 45% more accurate predictions of wind and solar variability, reducing curtailment."
                  color="#8b5cf6"
                />
                <InsightCard
                  icon={Users}
                  title="Added Value for End Users"
                  stat="70% more control"
                  description="Smart energy technologies enabled about 70% of US consumers to gain greater control of their energy consumption while improving comfort."
                  color="#f59e0b"
                />
              </div>

              {/* Use Case Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-indigo-600" />
                    When Will Digital Use Cases Be Available?
                  </CardTitle>
                  <CardDescription>Survey respondents' anticipated timeline for impact</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={USE_CASE_TIMELINE} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                      <YAxis type="category" dataKey="useCase" width={180} tick={{ fontSize: 11 }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="shortTerm" name="Short-term (up to 3 years)" fill="#10b981" stackId="a" />
                      <Bar dataKey="longTerm" name="Medium/Long-term (3+ years)" fill="#6366f1" stackId="a" />
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-800">
                      <strong>Reality check:</strong> Most respondents expect ALL digital use cases to take 3+ years to materialise.
                      The highest near-term confidence is in monitoring (47%) and data sharing (43%).
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ─── TAB: BARRIERS ─── */}
            <TabsContent value="barriers" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Main Barriers */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      Barriers to Digital Solutions
                    </CardTitle>
                    <CardDescription>Perceived barriers ranked by criticality</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={BARRIERS_DATA} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                        <YAxis type="category" dataKey="barrier" width={150} tick={{ fontSize: 11 }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar dataKey="critical" name="High/Critical" fill="#ef4444" stackId="a" />
                        <Bar dataKey="medium" name="Low/Medium" fill="#f59e0b" stackId="a" />
                        <Bar dataKey="low" name="Insignificant" fill="#d1d5db" stackId="a" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Data Barriers */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Server className="h-5 w-5 text-amber-600" />
                      Data-Specific Barriers
                    </CardTitle>
                    <CardDescription>Barriers to data implementation in the energy sector</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={DATA_BARRIERS} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                        <YAxis type="category" dataKey="barrier" width={150} tick={{ fontSize: 11 }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar dataKey="critical" name="High/Critical" fill="#ef4444" stackId="a" />
                        <Bar dataKey="medium" name="Low/Medium" fill="#f59e0b" stackId="a" />
                        <Bar dataKey="low" name="Insignificant" fill="#d1d5db" stackId="a" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Barrier Deep Dives */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Four Key Challenges</h2>
                {[
                  {
                    id: 'data',
                    title: '1. Data, Interoperability & Cyber Security',
                    icon: Server,
                    color: '#ef4444',
                    content: 'High-quality, accessible data is lacking. Practitioners spend up to 80% of their time finding, cleaning and organising data. Additionally, 62% rate legal/governance as a critical barrier to data use. Cyber security concerns grow as more systems connect — 71% of respondents want coordinated cyber security action.',
                    stat: '80% time spent on data cleaning',
                    action: 'Develop regional data interoperability frameworks with clear ownership rules.'
                  },
                  {
                    id: 'skills',
                    title: '2. Digital Skills & Workforce',
                    icon: Users,
                    color: '#3b82f6',
                    content: '60% of respondents believe skill shortage is a critical barrier. Innovation outstrips education pace. The energy sector competes with tech companies for talent, often at lower salaries. 70% say investment in upskilling is the most important government action.',
                    stat: '60% say skills gap is #1 barrier',
                    action: 'Blend energy sector re-skilling with digital skills training, co-designed with industry.'
                  },
                  {
                    id: 'regulation',
                    title: '3. Regulatory Environment & Finance',
                    icon: Shield,
                    color: '#f59e0b',
                    content: '53% report that lack of financial incentives hinders digital solutions. Regulatory incentives often promote conventional hardware over digital solutions. Legacy systems are incompatible with new digital technologies, prolonging transition and raising costs.',
                    stat: '53% lack financial incentives',
                    action: 'Introduce performance-based incentives and regulatory sandboxes for digital energy.'
                  },
                  {
                    id: 'coordination',
                    title: '4. Stakeholder Coordination',
                    icon: Globe,
                    color: '#8b5cf6',
                    content: 'The energy sector is multi-stakeholder. Digitalisation brings another set of actors with different objectives, risk appetites and timelines. Responsibilities for energy, innovation, digital development and education are spread across ministries. 78% say new investment models for developing economies are critically needed.',
                    stat: '78% need new EMDE investment models',
                    action: 'Align policy priorities across energy, digital, and education ministries.'
                  },
                ].map((barrier) => (
                  <Card key={barrier.id} className="overflow-hidden">
                    <button
                      className="w-full text-left"
                      onClick={() => setExpandedBarrier(expandedBarrier === barrier.id ? null : barrier.id)}
                    >
                      <CardHeader className="flex flex-row items-center gap-4">
                        <div className="rounded-full p-2 shrink-0" style={{ backgroundColor: `${barrier.color}15` }}>
                          <barrier.icon className="h-5 w-5" style={{ color: barrier.color }} />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{barrier.title}</CardTitle>
                          <Badge className="mt-1" style={{ backgroundColor: `${barrier.color}15`, color: barrier.color }}>
                            {barrier.stat}
                          </Badge>
                        </div>
                        {expandedBarrier === barrier.id ? (
                          <ChevronUp className="h-5 w-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        )}
                      </CardHeader>
                    </button>
                    {expandedBarrier === barrier.id && (
                      <CardContent className="pt-0 pb-6">
                        <p className="text-gray-700 mb-3">{barrier.content}</p>
                        <div className="p-3 rounded-lg" style={{ backgroundColor: `${barrier.color}08`, border: `1px solid ${barrier.color}30` }}>
                          <p className="text-sm font-medium" style={{ color: barrier.color }}>
                            Key Action: {barrier.action}
                          </p>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>

              {/* 80/20 meme */}
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <img
                    src="/images/irena-digital-ai/01_80_20_data_cleaning.png"
                    alt="80% of time spent on data cleaning"
                    className="w-full max-w-md mx-auto"
                    loading="lazy"
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* ─── TAB: CASE STUDIES ─── */}
            <TabsContent value="cases" className="space-y-8">
              <h2 className="text-2xl font-bold mb-2">Real-World Case Studies</h2>
              <p className="text-gray-600 mb-6">High-performing digital solutions from around the world, as documented by IRENA.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* EV Smart Charging */}
                <Card className="border-green-200">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-green-100 text-green-800">End-User Automation</Badge>
                      <Badge variant="outline">Denmark</Badge>
                    </div>
                    <CardTitle>Smart EV Charging</CardTitle>
                    <CardDescription>Reducing electricity costs through intelligent scheduling</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 mb-3">
                      Smart charging shifts EV consumption from peak to off-peak hours using time-of-use pricing.
                      Advanced V2G enables EVs to inject power back into the grid, turning vehicles into distributed storage assets.
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-green-50 rounded-lg p-3 text-center">
                        <div className="text-xl font-bold text-green-600">DKK 1,300</div>
                        <div className="text-xs text-gray-500">saved/year per EV owner</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3 text-center">
                        <div className="text-xl font-bold text-green-600">V2G</div>
                        <div className="text-xs text-gray-500">vehicles as grid storage</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Predictive Maintenance */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-blue-100 text-blue-800">Forecasting</Badge>
                      <Badge variant="outline">Global</Badge>
                    </div>
                    <CardTitle>AI Predictive Maintenance</CardTitle>
                    <CardDescription>From reactive to condition-based maintenance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 mb-3">
                      AI and ML algorithms process real-time sensor data to predict equipment degradation,
                      reducing unplanned downtime and extending asset life. This shifts utilities from
                      time-based maintenance to condition-based, saving significant costs.
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-blue-50 rounded-lg p-3 text-center">
                        <div className="text-xl font-bold text-blue-600">40%</div>
                        <div className="text-xs text-gray-500">less unplanned downtime</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-3 text-center">
                        <div className="text-xl font-bold text-blue-600">25%</div>
                        <div className="text-xs text-gray-500">maintenance cost reduction</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* FLISR */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-purple-100 text-purple-800">Operational Optimisation</Badge>
                      <Badge variant="outline">Control Centres</Badge>
                    </div>
                    <CardTitle>Automated FLISR</CardTitle>
                    <CardDescription>Fault Location, Isolation, Service Restoration in seconds</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 mb-3">
                      Automated FLISR detects faults, isolates damaged sections, and reroutes power — all
                      within seconds, without human intervention. This eliminates manual steps in fault-finding,
                      reduces crew mobilisation, and defers capital investment.
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-purple-50 rounded-lg p-3 text-center">
                        <div className="text-xl font-bold text-purple-600">45%</div>
                        <div className="text-xs text-gray-500">fewer interruptions</div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-3 text-center">
                        <div className="text-xl font-bold text-purple-600">50%+</div>
                        <div className="text-xs text-gray-500">shorter outage duration</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Granular Certificates */}
                <Card className="border-amber-200">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-amber-100 text-amber-800">Transparency</Badge>
                      <Badge variant="outline">Chile, Singapore, South Africa</Badge>
                    </div>
                    <CardTitle>Blockchain Energy Certificates</CardTitle>
                    <CardDescription>Granular, hourly tracking of renewable energy consumption</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 mb-3">
                      EDF tested tokenised RECs for EV charging in Singapore. Google partnered with I-REC
                      for hourly matching in Chile. South Africa launched Africa's first blockchain-based REC exchange.
                      These systems add transparency and credibility to green energy claims.
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-amber-50 rounded-lg p-3 text-center">
                        <div className="text-xl font-bold text-amber-600">Hourly</div>
                        <div className="text-xs text-gray-500">granular matching</div>
                      </div>
                      <div className="bg-amber-50 rounded-lg p-3 text-center">
                        <div className="text-xl font-bold text-amber-600">Blockchain</div>
                        <div className="text-xs text-gray-500">trustless verification</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* AI Forecasting */}
                <Card className="border-cyan-200">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-cyan-100 text-cyan-800">Forecasting</Badge>
                      <Badge variant="outline">Denmark, Australia, UK, India</Badge>
                    </div>
                    <CardTitle>AI-Enhanced Renewable Forecasting</CardTitle>
                    <CardDescription>45% more accurate than traditional methods</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 mb-3">
                      AI models analyse weather forecasts, satellite imagery, and historical output to predict wind and solar generation.
                      Ensemble learning and CNNs produce highly accurate short-term forecasts. Denmark's Energinet saved
                      $9M/year by cutting operating reserves 10-15%.
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-cyan-50 rounded-lg p-3 text-center">
                        <div className="text-xl font-bold text-cyan-600">45%</div>
                        <div className="text-xs text-gray-500">better accuracy</div>
                      </div>
                      <div className="bg-cyan-50 rounded-lg p-3 text-center">
                        <div className="text-xl font-bold text-cyan-600">$9M</div>
                        <div className="text-xs text-gray-500">saved annually (Denmark)</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Community Energy */}
                <Card className="border-pink-200">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-pink-100 text-pink-800">End-User Automation</Badge>
                      <Badge variant="outline">Portugal, Spain, Ethiopia</Badge>
                    </div>
                    <CardTitle>Community Energy & Mini-Grid Clustering</CardTitle>
                    <CardDescription>Up to 48% cost savings through collective self-consumption</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 mb-3">
                      In Portugal, community schemes enable passive consumers (apartment dwellers) to save up to 48% on costs.
                      Spain allows collective self-consumption within 5km radius. Ethiopia demonstrated micro-grid clustering
                      for improved reliability and economics.
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-pink-50 rounded-lg p-3 text-center">
                        <div className="text-xl font-bold text-pink-600">48%</div>
                        <div className="text-xs text-gray-500">cost savings (Portugal)</div>
                      </div>
                      <div className="bg-pink-50 rounded-lg p-3 text-center">
                        <div className="text-xl font-bold text-pink-600">5km</div>
                        <div className="text-xs text-gray-500">sharing radius (Spain)</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 4 hours vs 4 seconds meme */}
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle>The Speed Difference: Traditional vs AI-Automated</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <img
                    src="/images/irena-digital-ai/05_4hours_vs_4seconds.png"
                    alt="4 hours vs 4 seconds fault recovery"
                    className="w-full"
                    loading="lazy"
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* ─── TAB: KEY INSIGHTS (MEMES) ─── */}
            <TabsContent value="memes" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Key Insights — Visual Edition</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  The most surprising, shareable findings from IRENA's 68-page report, distilled into visual insights.
                  Click any image to view full-size.
                </p>
              </div>
              <MemeGallery memes={MEME_IMAGES} />
            </TabsContent>

            {/* ─── TAB: RECOMMENDATIONS ─── */}
            <TabsContent value="recommendations" className="space-y-8">
              <Card className="border-green-200 bg-gradient-to-br from-green-50 to-transparent">
                <CardHeader>
                  <CardTitle className="text-xl">IRENA's Action Agenda for the G7</CardTitle>
                  <CardDescription>Six recommendations for worldwide power system transformation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      {
                        num: '01',
                        title: 'Unlock System Value Through Tailored Digitalisation Strategies',
                        description: 'Assess national power systems through the prism of value clusters (monitoring, forecasting, optimisation, automation, transparency). Promote technology-agnostic investment frameworks.',
                        icon: Target,
                        color: '#3b82f6',
                      },
                      {
                        num: '02',
                        title: 'Accelerate Digital Orchestration Through System-Wide Coordination',
                        description: 'Align digitalisation across transmission, distribution, and end-use. Support interoperable digital ecosystems and inclusive market design allowing DER participation.',
                        icon: Activity,
                        color: '#10b981',
                      },
                      {
                        num: '03',
                        title: 'Fundamentals First: Data, Interoperability & Cyber Security',
                        description: 'Improve data collection quality. Roll out smart meters with ambitious targets. Promote interoperability frameworks and strengthen cyber security coordination.',
                        icon: Server,
                        color: '#f59e0b',
                      },
                      {
                        num: '04',
                        title: 'Rethink Skills & Training: Digital Literacy Integration',
                        description: '60% say skill shortage is critical. Blend energy re-skilling with digital skills. Map skill gaps, co-design training with industry, and promote diversity and inclusion.',
                        icon: Users,
                        color: '#8b5cf6',
                      },
                      {
                        num: '05',
                        title: 'Enable Innovation: Incentives, Sandboxes & Long-Term Planning',
                        description: 'Introduce performance-based incentives for digital solutions. Create regulatory sandboxes. Include digitalisation in energy planning and NDC revisions.',
                        icon: Lightbulb,
                        color: '#ec4899',
                      },
                      {
                        num: '06',
                        title: 'Strengthen International Cooperation, Especially for EMDEs',
                        description: 'Align policy priorities across energy, digital, and education sectors. Share reference architectures and toolkits. Support emerging economies with targeted funding.',
                        icon: Globe,
                        color: '#06b6d4',
                      },
                    ].map((rec) => (
                      <div key={rec.num} className="flex gap-4 items-start p-4 rounded-lg hover:bg-gray-50 transition-colors">
                        <div
                          className="rounded-full w-12 h-12 flex items-center justify-center shrink-0 text-white font-bold text-lg"
                          style={{ backgroundColor: rec.color }}
                        >
                          {rec.num}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-1">{rec.title}</h3>
                          <p className="text-sm text-gray-600">{rec.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Global Priorities Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-green-600" />
                    Global Priorities for Supporting Digital Energy Solutions
                  </CardTitle>
                  <CardDescription>What the international community considers most critical</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={GLOBAL_PRIORITIES} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                      <YAxis type="category" dataKey="priority" width={220} tick={{ fontSize: 11 }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="critical" name="High/Critical" fill="#10b981" stackId="a" />
                      <Bar dataKey="medium" name="Low/Medium" fill="#93c5fd" stackId="a" />
                      <Bar dataKey="low" name="Insignificant" fill="#d1d5db" stackId="a" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Bottom Line */}
              <Card className="border-indigo-300 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
                <CardContent className="pt-8 pb-8">
                  <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold mb-4">The Bottom Line</h2>
                    <blockquote className="text-lg text-gray-700 italic mb-6 leading-relaxed">
                      "The energy transition isn't just about solar panels — it's about the software running behind them.
                      A digitalised power system is not a nice option. It's the decisive enabler of the energy future we need."
                    </blockquote>
                    <p className="text-gray-600 mb-6">
                      IRENA's 2025 report makes clear: the technology exists, the economics work, and the benefits are proven.
                      What's missing is execution — data standards, digital skills, regulatory innovation, and coordinated international action.
                      The G7 has both the opportunity and responsibility to lead.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                      <Badge className="bg-blue-100 text-blue-800">170 IRENA Member Countries</Badge>
                      <Badge className="bg-green-100 text-green-800">68 Pages of Evidence</Badge>
                      <Badge className="bg-purple-100 text-purple-800">G7 Advisory 2025</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* FOOTER ATTRIBUTION */}
          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500">
              Data Source: IRENA (2025), <em>Digitalisation and AI for Power System Transformation: Perspectives for the G7</em>,
              International Renewable Energy Agency, Abu Dhabi.
            </p>
            <p className="text-xs text-gray-400 mt-2">
              This interactive analysis was created by <strong>techmadeeasy</strong> to make complex energy policy data accessible and engaging.
            </p>
            <div className="mt-6">
              <Link to="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
