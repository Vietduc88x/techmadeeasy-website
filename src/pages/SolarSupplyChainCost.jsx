import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  DollarSign,
  Sun,
  Globe,
  Factory,
  Zap,
  Users,
  Package,
  Ship,
  Shield,
  Info,
  ChevronDown,
  ChevronUp,
  BarChart3,
  Layers,
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
  LineChart,
  Line,
  ComposedChart,
  Area,
} from 'recharts';

// ─── DATA ────────────────────────────────────────────────────────────────────

const COUNTRIES = [
  { id: 'vietnam', name: 'Vietnam', flag: '🇻🇳', color: '#ef4444' },
  { id: 'china', name: 'China', flag: '🇨🇳', color: '#f59e0b' },
  { id: 'india', name: 'India', flag: '🇮🇳', color: '#f97316' },
  { id: 'australia', name: 'Australia', flag: '🇦🇺', color: '#10b981' },
  { id: 'germany', name: 'Germany', flag: '🇩🇪', color: '#3b82f6' },
  { id: 'us', name: 'United States', flag: '🇺🇸', color: '#8b5cf6' },
];

const COUNTRY_INPUTS = {
  vietnam:   { electricity: 0.07,  salary: 9000,  eqPolysilicon: 15, eqWafer: 40, eqCell: 35, eqModule: 13, bldPolysilicon: 5, bldWafer: 30, bldCell: 30, bldModule: 20 },
  china:     { electricity: 0.065, salary: 14500, eqPolysilicon: 13, eqWafer: 35, eqCell: 30, eqModule: 10, bldPolysilicon: 3, bldWafer: 25, bldCell: 25, bldModule: 15 },
  india:     { electricity: 0.095, salary: 8500,  eqPolysilicon: 16, eqWafer: 40, eqCell: 35, eqModule: 15, bldPolysilicon: 6, bldWafer: 40, bldCell: 40, bldModule: 22 },
  australia: { electricity: 0.09,  salary: 67000, eqPolysilicon: 20, eqWafer: 45, eqCell: 50, eqModule: 20, bldPolysilicon: 7, bldWafer: 55, bldCell: 50, bldModule: 30 },
  germany:   { electricity: 0.18,  salary: 65000, eqPolysilicon: 20, eqWafer: 45, eqCell: 50, eqModule: 20, bldPolysilicon: 7, bldWafer: 55, bldCell: 50, bldModule: 30 },
  us:        { electricity: 0.068, salary: 69000, eqPolysilicon: 25, eqWafer: 55, eqCell: 60, eqModule: 25, bldPolysilicon: 10, bldWafer: 60, bldCell: 50, bldModule: 35 },
};

// Total module cost per country per scenario (USD/Wp) — from IRENA Table 10
const MODULE_COSTS = {
  vietnam:   { domestic: 0.180, importPoly: 0.167, importWafer: 0.146, importCell: 0.124 },
  india:     { domestic: 0.191, importPoly: 0.176, importWafer: 0.150, importCell: 0.126 },
  australia: { domestic: 0.256, importPoly: 0.236, importWafer: 0.193, importCell: 0.148 },
  germany:   { domestic: 0.284, importPoly: 0.255, importWafer: 0.201, importCell: 0.150 },
};

// TOPCon module cost composition (Vietnam domestic, 2025)
const WATERFALL_TOPCON_2025 = { polysilicon: 0.023, wafer: 0.033, cell: 0.040, module: 0.083, total: 0.180 };
const WATERFALL_MONO_2025   = { polysilicon: 0.021, wafer: 0.036, cell: 0.036, module: 0.083, total: 0.177 };

// Year-by-year projections (Vietnam domestic)
const YEARLY_PROJECTIONS = [
  { year: 2025, monoNoESG: 0.174, monoESG: 0.177, topconNoESG: 0.178, topconESG: 0.180 },
  { year: 2026, monoNoESG: 0.173, monoESG: 0.176, topconNoESG: 0.174, topconESG: 0.176 },
  { year: 2027, monoNoESG: 0.173, monoESG: 0.175, topconNoESG: 0.173, topconESG: 0.176 },
  { year: 2028, monoNoESG: 0.171, monoESG: 0.175, topconNoESG: 0.172, topconESG: 0.175 },
  { year: 2029, monoNoESG: 0.170, monoESG: 0.174, topconNoESG: 0.170, topconESG: 0.173 },
  { year: 2030, monoNoESG: 0.169, monoESG: 0.173, topconNoESG: 0.168, topconESG: 0.171 },
];

// Import costs from China (TOPCon, USD/Wp)
const IMPORT_COSTS_TOPCON = {
  polysilicon: [
    { year: 2025, vietnam: 0.011, india: 0.011, australia: 0.011, germany: 0.011 },
    { year: 2026, vietnam: 0.020, india: 0.020, australia: 0.021, germany: 0.021 },
    { year: 2027, vietnam: 0.022, india: 0.022, australia: 0.022, germany: 0.023 },
    { year: 2028, vietnam: 0.022, india: 0.022, australia: 0.022, germany: 0.023 },
    { year: 2029, vietnam: 0.021, india: 0.021, australia: 0.022, germany: 0.022 },
    { year: 2030, vietnam: 0.021, india: 0.021, australia: 0.021, germany: 0.022 },
  ],
  wafer: [
    { year: 2025, vietnam: 0.023, india: 0.023, australia: 0.023, germany: 0.023 },
    { year: 2026, vietnam: 0.036, india: 0.036, australia: 0.036, germany: 0.036 },
    { year: 2027, vietnam: 0.039, india: 0.039, australia: 0.039, germany: 0.039 },
    { year: 2028, vietnam: 0.038, india: 0.039, australia: 0.039, germany: 0.039 },
    { year: 2029, vietnam: 0.038, india: 0.038, australia: 0.038, germany: 0.038 },
    { year: 2030, vietnam: 0.037, india: 0.038, australia: 0.038, germany: 0.038 },
  ],
  cell: [
    { year: 2025, vietnam: 0.041, india: 0.041, australia: 0.041, germany: 0.041 },
    { year: 2026, vietnam: 0.054, india: 0.055, australia: 0.055, germany: 0.055 },
    { year: 2027, vietnam: 0.053, india: 0.054, australia: 0.054, germany: 0.054 },
    { year: 2028, vietnam: 0.052, india: 0.053, australia: 0.053, germany: 0.053 },
    { year: 2029, vietnam: 0.051, india: 0.052, australia: 0.052, germany: 0.052 },
    { year: 2030, vietnam: 0.051, india: 0.051, australia: 0.051, germany: 0.051 },
  ],
};

// Cost breakdown for domestic production per component (Vietnam, TOPCon 2025)
const COMPONENT_BREAKDOWN = {
  polysilicon: { electricity: 2.80, materials: 3.50, equipment: 1.20, building: 0.50, labour: 0.40, maintenance: 0.30, overheads: 0.25, profit: 1.05, total: 10.00, unit: 'USD/kg' },
  wafer:       { electricity: 0.006, materials: 0.012, equipment: 0.005, building: 0.003, labour: 0.002, maintenance: 0.001, overheads: 0.001, profit: 0.003, total: 0.033, unit: 'USD/Wp' },
  cell:        { electricity: 0.005, materials: 0.018, equipment: 0.006, building: 0.003, labour: 0.002, maintenance: 0.001, overheads: 0.001, profit: 0.004, total: 0.040, unit: 'USD/Wp' },
  module:      { electricity: 0.003, materials: 0.042, equipment: 0.003, building: 0.002, labour: 0.004, maintenance: 0.002, overheads: 0.002, profit: 0.005, esg: 0.002, total: 0.065, unit: 'USD/Wp' },
};

// Colors
const CHART_COLORS = {
  polysilicon: '#f59e0b',
  wafer: '#3b82f6',
  cell: '#10b981',
  module: '#8b5cf6',
  electricity: '#eab308',
  materials: '#f97316',
  equipment: '#6366f1',
  building: '#64748b',
  labour: '#ec4899',
  maintenance: '#14b8a6',
  overheads: '#a855f7',
  profit: '#22c55e',
  esg: '#06b6d4',
};

// ─── HELPER COMPONENTS ───────────────────────────────────────────────────────

function StatCard({ title, value, subtitle, icon: Icon, color = 'blue', trend }) {
  const colorMap = {
    blue: 'text-blue-600', green: 'text-green-600', amber: 'text-amber-600',
    red: 'text-red-600', purple: 'text-purple-600', cyan: 'text-cyan-600',
  };
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${colorMap[color]}`} />
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${colorMap[color]}`}>{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        {trend && (
          <div className="flex items-center mt-1">
            {trend < 0 ? <TrendingDown className="h-3 w-3 text-green-500 mr-1" /> : <TrendingUp className="h-3 w-3 text-red-500 mr-1" />}
            <span className={`text-xs ${trend < 0 ? 'text-green-600' : 'text-red-600'}`}>{Math.abs(trend)}%</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function CustomTooltip({ active, payload, label, prefix = '$', suffix = '' }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 shadow-lg rounded-lg p-3 text-sm">
      <p className="font-semibold text-gray-900 mb-1">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: entry.color }} />
          <span className="text-gray-600">{entry.name}:</span>
          <span className="font-medium">{prefix}{typeof entry.value === 'number' ? entry.value.toFixed(3) : entry.value}{suffix}</span>
        </p>
      ))}
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export function SolarSupplyChainCost() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCountry, setSelectedCountry] = useState('vietnam');
  const [selectedTech, setSelectedTech] = useState('topcon');
  const [selectedScenario, setSelectedScenario] = useState('domestic');
  const [showESG, setShowESG] = useState(true);
  const [expandedSection, setExpandedSection] = useState(null);

  // ── Derived data ──

  const countryInfo = COUNTRIES.find(c => c.id === selectedCountry);
  const countryInput = COUNTRY_INPUTS[selectedCountry];

  const scenarioComparisonData = useMemo(() => {
    const countries = ['vietnam', 'india', 'australia', 'germany'];
    return countries.map(cid => {
      const c = COUNTRIES.find(x => x.id === cid);
      const costs = MODULE_COSTS[cid];
      return {
        name: c.name,
        'All Domestic': costs.domestic,
        'Import Polysilicon': costs.importPoly,
        'Import Wafers': costs.importWafer,
        'Import Cells': costs.importCell,
      };
    });
  }, []);

  const savingsData = useMemo(() => {
    const countries = ['vietnam', 'india', 'australia', 'germany'];
    return countries.map(cid => {
      const c = COUNTRIES.find(x => x.id === cid);
      const costs = MODULE_COSTS[cid];
      return {
        name: c.name,
        'Import Polysilicon': Math.round((1 - costs.importPoly / costs.domestic) * 100),
        'Import Wafers': Math.round((1 - costs.importWafer / costs.domestic) * 100),
        'Import Cells': Math.round((1 - costs.importCell / costs.domestic) * 100),
      };
    });
  }, []);

  const waterfallData = useMemo(() => {
    const src = selectedTech === 'topcon' ? WATERFALL_TOPCON_2025 : WATERFALL_MONO_2025;
    return [
      { name: 'Polysilicon', cost: src.polysilicon, fill: CHART_COLORS.polysilicon },
      { name: 'Wafer', cost: src.wafer, fill: CHART_COLORS.wafer },
      { name: 'Cell', cost: src.cell, fill: CHART_COLORS.cell },
      { name: 'Module', cost: src.module, fill: CHART_COLORS.module },
      { name: 'Total', cost: src.total, fill: '#1e293b' },
    ];
  }, [selectedTech]);

  const componentBreakdownChart = useMemo(() => {
    const comps = ['polysilicon', 'wafer', 'cell', 'module'];
    return comps.map(comp => {
      const d = COMPONENT_BREAKDOWN[comp];
      return {
        name: comp.charAt(0).toUpperCase() + comp.slice(1),
        Electricity: comp === 'polysilicon' ? d.electricity / d.total * 100 : d.electricity / d.total * 100,
        Materials: d.materials / d.total * 100,
        Equipment: d.equipment / d.total * 100,
        Labour: d.labour / d.total * 100,
        'Building & Facilities': d.building / d.total * 100,
        Other: (d.maintenance + d.overheads + d.profit + (d.esg || 0)) / d.total * 100,
      };
    });
  }, []);

  const countryComparisonInputs = useMemo(() => {
    return COUNTRIES.map(c => ({
      name: c.name,
      flag: c.flag,
      'Electricity ($/kWh)': COUNTRY_INPUTS[c.id].electricity,
      'Salary ($/yr)': COUNTRY_INPUTS[c.id].salary,
    }));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-blue-50">
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
                March 2026
              </Badge>
              <Badge variant="secondary" className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                20 min read
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Article Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-amber-100 text-amber-800 hover:bg-amber-200">IRENA 2026 Report Analysis</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Solar PV Supply Chain Cost Tool
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            Interactive analysis of solar module manufacturing costs across the global supply chain — from polysilicon to finished panels.
            Explore cost drivers, country comparisons, and import scenarios.
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 flex-wrap gap-y-2">
            <span>Source: IRENA (International Renewable Energy Agency)</span>
            <span className="hidden sm:inline">•</span>
            <span>Technologies: TOPCon & Monocrystalline PERC</span>
            <span className="hidden sm:inline">•</span>
            <span>6 Countries Compared</span>
          </div>
        </div>

        {/* Global Controls */}
        <Card className="mb-8 border-2 border-amber-200 bg-amber-50/50">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Technology Toggle */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Technology</label>
                <div className="flex gap-2">
                  <Button
                    variant={selectedTech === 'topcon' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedTech('topcon')}
                    className="flex-1"
                  >
                    TOPCon
                  </Button>
                  <Button
                    variant={selectedTech === 'mono' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedTech('mono')}
                    className="flex-1"
                  >
                    Mono PERC
                  </Button>
                </div>
              </div>

              {/* Country Selector */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Country</label>
                <div className="flex flex-wrap gap-1">
                  {COUNTRIES.map(c => (
                    <Button
                      key={c.id}
                      variant={selectedCountry === c.id ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCountry(c.id)}
                      className="text-xs px-2"
                    >
                      {c.flag} {c.name.length > 8 ? c.name.slice(0, 6) + '..' : c.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* ESG Toggle */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Options</label>
                <Button
                  variant={showESG ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setShowESG(!showESG)}
                  className="w-full"
                >
                  <Shield className="h-3 w-3 mr-1" />
                  {showESG ? 'ESG Included' : 'ESG Excluded'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interactive Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 mb-8 h-auto">
            <TabsTrigger value="overview" className="text-xs sm:text-sm py-2">Overview</TabsTrigger>
            <TabsTrigger value="supply-chain" className="text-xs sm:text-sm py-2">Supply Chain</TabsTrigger>
            <TabsTrigger value="countries" className="text-xs sm:text-sm py-2">Countries</TabsTrigger>
            <TabsTrigger value="scenarios" className="text-xs sm:text-sm py-2">Import Scenarios</TabsTrigger>
            <TabsTrigger value="projections" className="text-xs sm:text-sm py-2 col-span-2 sm:col-span-1">2025–2030</TabsTrigger>
          </TabsList>

          {/* ═══════════════════════ OVERVIEW TAB ═══════════════════════ */}
          <TabsContent value="overview" className="space-y-8">
            {/* Key Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Vietnam Module Cost"
                value="$0.180/Wp"
                subtitle="Lowest all-domestic cost (TOPCon)"
                icon={Factory}
                color="green"
              />
              <StatCard
                title="China Module Cost"
                value="~$0.160/Wp"
                subtitle="Global benchmark price"
                icon={Globe}
                color="amber"
              />
              <StatCard
                title="Germany Module Cost"
                value="$0.284/Wp"
                subtitle="Highest domestic production cost"
                icon={Factory}
                color="red"
              />
              <StatCard
                title="Max Savings (Import Cells)"
                value="47%"
                subtitle="Germany: import cells vs all-domestic"
                icon={TrendingDown}
                color="blue"
                trend={-47}
              />
            </div>

            {/* Two-column: Waterfall + Key Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layers className="h-5 w-5 text-amber-600" />
                    {selectedTech === 'topcon' ? 'TOPCon' : 'Monocrystalline'} Module Cost Composition (2025)
                  </CardTitle>
                  <CardDescription>Vietnam domestic production — USD/Wp breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={320}>
                    <BarChart data={waterfallData} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `$${v}`} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="cost" name="Cost (USD/Wp)" radius={[4, 4, 0, 0]}>
                        {waterfallData.map((entry, index) => (
                          <rect key={index} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-blue-600" />
                    Key Findings
                  </CardTitle>
                  <CardDescription>From the IRENA 2026 analysis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { icon: Sun, color: 'text-amber-600', bg: 'bg-amber-50', title: 'TOPCon Overtakes PERC by 2028', desc: 'TOPCon starts costlier but has steeper efficiency gains. By 2030, it reaches $0.168/Wp vs PERC\'s $0.169/Wp.' },
                    { icon: Zap, color: 'text-yellow-600', bg: 'bg-yellow-50', title: 'Electricity Is the Top Cost Driver', desc: 'Germany\'s $0.18/kWh vs China\'s $0.065/kWh explains 58% of the manufacturing cost gap.' },
                    { icon: Ship, color: 'text-blue-600', bg: 'bg-blue-50', title: 'Importing Cells Saves Up to 47%', desc: 'Importing cells from China vs full domestic production cuts module costs dramatically in high-cost countries.' },
                    { icon: Shield, color: 'text-cyan-600', bg: 'bg-cyan-50', title: 'ESG Adds $0.002–0.003/Wp', desc: 'ESG certification costs are minor today but their relative share grows as production costs decline.' },
                    { icon: Factory, color: 'text-green-600', bg: 'bg-green-50', title: 'Module Assembly Is Easiest to Localize', desc: 'Requires the least capital, labour and electricity — the ideal entry point for domestic manufacturing.' },
                  ].map((item, i) => (
                    <div key={i} className={`flex gap-3 p-3 rounded-lg ${item.bg}`}>
                      <item.icon className={`h-5 w-5 ${item.color} flex-shrink-0 mt-0.5`} />
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900">{item.title}</h4>
                        <p className="text-xs text-gray-600 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Supply chain flow diagram */}
            <Card>
              <CardHeader>
                <CardTitle>Solar PV Supply Chain Flow</CardTitle>
                <CardDescription>From raw silicon to finished solar module — each stage adds cost</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
                  {[
                    { name: 'Polysilicon', cost: '$0.021–0.023/Wp', share: '12%', color: 'bg-amber-100 border-amber-300', icon: '⚗️', desc: '40 kWh/kg electricity intensive' },
                    { name: 'Wafer', cost: '$0.033–0.036/Wp', share: '19%', color: 'bg-blue-100 border-blue-300', icon: '💿', desc: '$500M for 7 GW facility' },
                    { name: 'Cell', cost: '$0.036–0.040/Wp', share: '21%', color: 'bg-green-100 border-green-300', icon: '⚡', desc: 'Silver paste = top material cost' },
                    { name: 'Module', cost: '$0.065–0.083/Wp', share: '47%', color: 'bg-purple-100 border-purple-300', icon: '🔲', desc: 'Lowest barrier to localize' },
                  ].map((stage, i) => (
                    <React.Fragment key={i}>
                      <div className={`flex-1 w-full p-4 rounded-xl border-2 ${stage.color} text-center`}>
                        <div className="text-2xl mb-1">{stage.icon}</div>
                        <h4 className="font-bold text-gray-900 text-sm">{stage.name}</h4>
                        <p className="text-lg font-semibold text-gray-800 mt-1">{stage.cost}</p>
                        <Badge variant="secondary" className="mt-1 text-xs">{stage.share} of total</Badge>
                        <p className="text-xs text-gray-500 mt-2">{stage.desc}</p>
                      </div>
                      {i < 3 && (
                        <ArrowRight className="h-6 w-6 text-gray-400 flex-shrink-0 hidden sm:block" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ═══════════════════════ SUPPLY CHAIN TAB ═══════════════════════ */}
          <TabsContent value="supply-chain" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Cost Breakdown by Component (Vietnam, TOPCon 2025)</CardTitle>
                <CardDescription>What drives cost at each stage of the supply chain — percentage breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={380}>
                  <BarChart data={componentBreakdownChart} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" tick={{ fontSize: 11 }} tickFormatter={v => `${v.toFixed(0)}%`} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(v) => `${v.toFixed(1)}%`} />
                    <Legend />
                    <Bar dataKey="Electricity" stackId="a" fill={CHART_COLORS.electricity} />
                    <Bar dataKey="Materials" stackId="a" fill={CHART_COLORS.materials} />
                    <Bar dataKey="Equipment" stackId="a" fill={CHART_COLORS.equipment} />
                    <Bar dataKey="Labour" stackId="a" fill={CHART_COLORS.labour} />
                    <Bar dataKey="Building & Facilities" stackId="a" fill={CHART_COLORS.building} />
                    <Bar dataKey="Other" stackId="a" fill={CHART_COLORS.overheads} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Component detail cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  name: 'Polysilicon Production', icon: '⚗️', comp: 'polysilicon',
                  facts: [
                    'Most electricity-intensive stage: ~40 kWh/kg',
                    'Energy consumption dropped from 80 to 40 kWh/kg in 5 years',
                    'Primary silicon metal is the main raw material',
                    'Only marginal additional energy savings expected',
                  ]
                },
                {
                  name: 'Ingot & Wafer Manufacturing', icon: '💿', comp: 'wafer',
                  facts: [
                    'Requires ~$500M to build a 7 GW facility',
                    'Equipment lifetime: ~7 years before replacement',
                    'Key materials: quartz crucibles, diamond wire, argon',
                    'Frequent technology upgrades drive early replacement',
                  ]
                },
                {
                  name: 'Solar Cell Production', icon: '⚡', comp: 'cell',
                  facts: [
                    'Silver paste is the largest material expense',
                    'Equipment lifetime: only 5–6 years',
                    'TOPCon cells require more complex processing',
                    'Capital expenditure similar to wafer production',
                  ]
                },
                {
                  name: 'Module Assembly', icon: '🔲', comp: 'module',
                  facts: [
                    'Least capital-intensive stage of the supply chain',
                    'Key materials: aluminium frames, glass, junction boxes',
                    'Most attractive stage for local manufacturing entry',
                    'ESG certification costs are applied at this stage',
                  ]
                },
              ].map(item => {
                const d = COMPONENT_BREAKDOWN[item.comp];
                return (
                  <Card key={item.comp} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <span className="text-xl">{item.icon}</span>
                        {item.name}
                      </CardTitle>
                      <CardDescription>Total: {d.total} {d.unit}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {item.facts.map((fact, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="text-amber-500 mt-1">•</span>
                            {fact}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* ═══════════════════════ COUNTRIES TAB ═══════════════════════ */}
          <TabsContent value="countries" className="space-y-8">
            {/* Country input comparison */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-600" />
                  Key Manufacturing Input Comparison
                </CardTitle>
                <CardDescription>Industrial electricity prices and engineer salaries across 6 markets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Electricity comparison */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3">Industrial Electricity Price (USD/kWh)</h4>
                    <div className="space-y-3">
                      {COUNTRIES.sort((a, b) => COUNTRY_INPUTS[b.id].electricity - COUNTRY_INPUTS[a.id].electricity).map(c => {
                        const val = COUNTRY_INPUTS[c.id].electricity;
                        const maxVal = 0.18;
                        return (
                          <div key={c.id} className="flex items-center gap-3">
                            <span className="w-6 text-center">{c.flag}</span>
                            <span className="w-20 text-sm text-gray-600 truncate">{c.name}</span>
                            <div className="flex-1 bg-gray-100 rounded-full h-5 relative overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{
                                  width: `${(val / maxVal) * 100}%`,
                                  backgroundColor: c.color,
                                }}
                              />
                            </div>
                            <span className="text-sm font-semibold w-14 text-right">${val}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Salary comparison */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3">Average Engineer Salary (USD/year)</h4>
                    <div className="space-y-3">
                      {COUNTRIES.sort((a, b) => COUNTRY_INPUTS[b.id].salary - COUNTRY_INPUTS[a.id].salary).map(c => {
                        const val = COUNTRY_INPUTS[c.id].salary;
                        const maxVal = 69000;
                        return (
                          <div key={c.id} className="flex items-center gap-3">
                            <span className="w-6 text-center">{c.flag}</span>
                            <span className="w-20 text-sm text-gray-600 truncate">{c.name}</span>
                            <div className="flex-1 bg-gray-100 rounded-full h-5 relative overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{
                                  width: `${(val / maxVal) * 100}%`,
                                  backgroundColor: c.color,
                                }}
                              />
                            </div>
                            <span className="text-sm font-semibold w-20 text-right">${val.toLocaleString()}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* All-domestic cost comparison chart */}
            <Card>
              <CardHeader>
                <CardTitle>Domestic PV Module Manufacturing Costs (All Components)</CardTitle>
                <CardDescription>Total module cost (USD/Wp) for fully domestic production across markets</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart
                    data={[
                      { name: 'China', cost: 0.160, fill: '#f59e0b' },
                      { name: 'Vietnam', cost: 0.180, fill: '#ef4444' },
                      { name: 'India', cost: 0.191, fill: '#f97316' },
                      { name: 'Australia', cost: 0.256, fill: '#10b981' },
                      { name: 'United States', cost: 0.270, fill: '#8b5cf6' },
                      { name: 'Germany', cost: 0.284, fill: '#3b82f6' },
                    ]}
                    margin={{ top: 10, right: 30, left: 10, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `$${v}`} domain={[0, 0.32]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="cost" name="Total Module Cost" radius={[4, 4, 0, 0]}>
                      {[
                        { fill: '#f59e0b' },
                        { fill: '#ef4444' },
                        { fill: '#f97316' },
                        { fill: '#10b981' },
                        { fill: '#8b5cf6' },
                        { fill: '#3b82f6' },
                      ].map((entry, index) => (
                        <rect key={index} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Country deep-dive */}
            <Card className="border-2" style={{ borderColor: countryInfo?.color + '40' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{countryInfo?.flag}</span>
                  {countryInfo?.name} — Manufacturing Profile
                </CardTitle>
                <CardDescription>Select a country using the controls above to see details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg text-center">
                    <Zap className="h-5 w-5 mx-auto text-yellow-500 mb-1" />
                    <p className="text-xs text-gray-500">Electricity</p>
                    <p className="text-lg font-bold">${countryInput?.electricity}/kWh</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg text-center">
                    <Users className="h-5 w-5 mx-auto text-pink-500 mb-1" />
                    <p className="text-xs text-gray-500">Avg Salary</p>
                    <p className="text-lg font-bold">${(countryInput?.salary / 1000).toFixed(0)}K/yr</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg text-center">
                    <Package className="h-5 w-5 mx-auto text-indigo-500 mb-1" />
                    <p className="text-xs text-gray-500">Equip (Cell)</p>
                    <p className="text-lg font-bold">${countryInput?.eqCell}/kW</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg text-center">
                    <Factory className="h-5 w-5 mx-auto text-gray-500 mb-1" />
                    <p className="text-xs text-gray-500">Building (Module)</p>
                    <p className="text-lg font-bold">${countryInput?.bldModule}/kWp</p>
                  </div>
                </div>

                {MODULE_COSTS[selectedCountry] && (
                  <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                    <h4 className="font-semibold text-sm mb-3">Total Module Cost by Scenario</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { label: 'All Domestic', val: MODULE_COSTS[selectedCountry].domestic },
                        { label: 'Import Polysilicon', val: MODULE_COSTS[selectedCountry].importPoly },
                        { label: 'Import Wafers', val: MODULE_COSTS[selectedCountry].importWafer },
                        { label: 'Import Cells', val: MODULE_COSTS[selectedCountry].importCell },
                      ].map(s => (
                        <div key={s.label} className="text-center p-2 bg-white rounded-lg shadow-sm">
                          <p className="text-xs text-gray-500">{s.label}</p>
                          <p className="text-lg font-bold text-gray-900">${s.val}/Wp</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {!MODULE_COSTS[selectedCountry] && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center text-sm text-gray-500">
                    Scenario cost data not available for {countryInfo?.name}. Only Vietnam, India, Australia, and Germany have full scenario comparisons in the IRENA dataset.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ═══════════════════════ IMPORT SCENARIOS TAB ═══════════════════════ */}
          <TabsContent value="scenarios" className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { id: 'domestic', label: 'All Domestic', icon: Factory, desc: 'Produce everything locally' },
                { id: 'importPoly', label: 'Import Polysilicon', icon: Package, desc: 'Import polysilicon from China' },
                { id: 'importWafer', label: 'Import Wafers', icon: Ship, desc: 'Import wafers from China' },
                { id: 'importCell', label: 'Import Cells', icon: Ship, desc: 'Import cells from China' },
              ].map(s => (
                <Button
                  key={s.id}
                  variant={selectedScenario === s.id ? 'default' : 'outline'}
                  className="h-auto p-4 flex flex-col items-center space-y-1"
                  onClick={() => setSelectedScenario(s.id)}
                >
                  <s.icon className="h-5 w-5" />
                  <span className="text-xs font-semibold">{s.label}</span>
                  <span className="text-[10px] text-gray-500">{s.desc}</span>
                </Button>
              ))}
            </div>

            {/* Scenario comparison chart */}
            <Card>
              <CardHeader>
                <CardTitle>Total Module Cost by Manufacturing Scenario</CardTitle>
                <CardDescription>Comparison across 4 countries — USD/Wp (2025)</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={380}>
                  <BarChart data={scenarioComparisonData} margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `$${v}`} domain={[0, 0.32]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="All Domestic" fill="#64748b" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="Import Polysilicon" fill="#f59e0b" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="Import Wafers" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="Import Cells" fill="#10b981" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Savings chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="h-5 w-5 text-green-600" />
                  Cost Savings vs All-Domestic Production
                </CardTitle>
                <CardDescription>Percentage reduction when importing components from China</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={savingsData} margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `${v}%`} />
                    <Tooltip formatter={v => `${v}%`} />
                    <Legend />
                    <Bar dataKey="Import Polysilicon" fill="#f59e0b" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="Import Wafers" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="Import Cells" fill="#10b981" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Data table */}
            <Card>
              <CardHeader>
                <CardTitle>Detailed Cost Table (USD/Wp)</CardTitle>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-2 font-semibold">Scenario</th>
                      <th className="text-center py-3 px-2 font-semibold">🇻🇳 Vietnam</th>
                      <th className="text-center py-3 px-2 font-semibold">🇮🇳 India</th>
                      <th className="text-center py-3 px-2 font-semibold">🇦🇺 Australia</th>
                      <th className="text-center py-3 px-2 font-semibold">🇩🇪 Germany</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { label: 'All Domestic', key: 'domestic' },
                      { label: 'Import Polysilicon', key: 'importPoly' },
                      { label: 'Import Wafers', key: 'importWafer' },
                      { label: 'Import Cells', key: 'importCell' },
                    ].map(row => (
                      <tr key={row.key} className={`border-b ${selectedScenario === row.key ? 'bg-amber-50 font-semibold' : ''}`}>
                        <td className="py-3 px-2">{row.label}</td>
                        <td className="text-center py-3 px-2">${MODULE_COSTS.vietnam[row.key]}</td>
                        <td className="text-center py-3 px-2">${MODULE_COSTS.india[row.key]}</td>
                        <td className="text-center py-3 px-2">${MODULE_COSTS.australia[row.key]}</td>
                        <td className="text-center py-3 px-2">${MODULE_COSTS.germany[row.key]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>

            {/* Import cost breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ship className="h-5 w-5 text-blue-600" />
                  Import Costs from China (TOPCon, USD/Wp)
                </CardTitle>
                <CardDescription>Projected landed costs including shipping, tariffs and insurance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {['polysilicon', 'wafer', 'cell'].map(comp => (
                    <div key={comp}>
                      <button
                        className="flex items-center justify-between w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        onClick={() => setExpandedSection(expandedSection === comp ? null : comp)}
                      >
                        <span className="font-semibold text-sm capitalize">{comp} Import Costs</span>
                        {expandedSection === comp ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </button>
                      {expandedSection === comp && (
                        <div className="mt-2 overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left py-2 px-2">Year</th>
                                <th className="text-center py-2 px-2">🇻🇳 Vietnam</th>
                                <th className="text-center py-2 px-2">🇮🇳 India</th>
                                <th className="text-center py-2 px-2">🇦🇺 Australia</th>
                                <th className="text-center py-2 px-2">🇩🇪 Germany</th>
                              </tr>
                            </thead>
                            <tbody>
                              {IMPORT_COSTS_TOPCON[comp].map(row => (
                                <tr key={row.year} className="border-b hover:bg-gray-50">
                                  <td className="py-2 px-2 font-medium">{row.year}</td>
                                  <td className="text-center py-2 px-2">${row.vietnam}</td>
                                  <td className="text-center py-2 px-2">${row.india}</td>
                                  <td className="text-center py-2 px-2">${row.australia}</td>
                                  <td className="text-center py-2 px-2">${row.germany}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ═══════════════════════ PROJECTIONS TAB ═══════════════════════ */}
          <TabsContent value="projections" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Total Module Production Cost (2025–2030)</CardTitle>
                <CardDescription>Vietnam domestic production — TOPCon vs Monocrystalline PERC (USD/Wp)</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={YEARLY_PROJECTIONS} margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `$${v}`} domain={[0.160, 0.185]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    {showESG ? (
                      <>
                        <Line type="monotone" dataKey="monoESG" name="Mono PERC (with ESG)" stroke="#f97316" strokeWidth={2} dot={{ r: 4 }} />
                        <Line type="monotone" dataKey="topconESG" name="TOPCon (with ESG)" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
                      </>
                    ) : (
                      <>
                        <Line type="monotone" dataKey="monoNoESG" name="Mono PERC (no ESG)" stroke="#f97316" strokeWidth={2} dot={{ r: 4 }} strokeDasharray="5 5" />
                        <Line type="monotone" dataKey="topconNoESG" name="TOPCon (no ESG)" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} strokeDasharray="5 5" />
                      </>
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Crossover insight */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-blue-200 bg-blue-50/50">
                <CardHeader>
                  <CardTitle className="text-blue-800 flex items-center gap-2">
                    <TrendingDown className="h-5 w-5" />
                    TOPCon Cost Trajectory
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-gray-700">
                  <p>TOPCon technology currently costs slightly more than monocrystalline PERC, but its <strong>steeper efficiency improvement roadmap</strong> — driven by greater potential for cell conversion efficiency gains — makes it the more cost-competitive option by 2028–2030.</p>
                  <div className="flex justify-between p-3 bg-white rounded-lg">
                    <div>
                      <p className="text-xs text-gray-500">2025 Cost</p>
                      <p className="font-bold text-lg">$0.180/Wp</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-blue-400 self-center" />
                    <div>
                      <p className="text-xs text-gray-500">2030 Cost</p>
                      <p className="font-bold text-lg text-green-600">$0.171/Wp</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Reduction</p>
                      <p className="font-bold text-lg text-green-600">-5.0%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-200 bg-orange-50/50">
                <CardHeader>
                  <CardTitle className="text-orange-800 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Monocrystalline PERC Plateau
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-gray-700">
                  <p>Monocrystalline PERC technology is <strong>approaching its practical efficiency limits</strong>, resulting in a flatter cost reduction curve. While it remains competitive, the gap narrows and reverses by 2030.</p>
                  <div className="flex justify-between p-3 bg-white rounded-lg">
                    <div>
                      <p className="text-xs text-gray-500">2025 Cost</p>
                      <p className="font-bold text-lg">$0.177/Wp</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-orange-400 self-center" />
                    <div>
                      <p className="text-xs text-gray-500">2030 Cost</p>
                      <p className="font-bold text-lg text-green-600">$0.173/Wp</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Reduction</p>
                      <p className="font-bold text-lg text-green-600">-2.3%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Projection data table */}
            <Card>
              <CardHeader>
                <CardTitle>Year-by-Year Projection Data</CardTitle>
                <CardDescription>Vietnam domestic production (USD/Wp)</CardDescription>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-2">Year</th>
                      <th className="text-center py-3 px-2">Mono (no ESG)</th>
                      <th className="text-center py-3 px-2">Mono (with ESG)</th>
                      <th className="text-center py-3 px-2">TOPCon (no ESG)</th>
                      <th className="text-center py-3 px-2">TOPCon (with ESG)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {YEARLY_PROJECTIONS.map(row => (
                      <tr key={row.year} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-2 font-semibold">{row.year}</td>
                        <td className="text-center py-3 px-2">${row.monoNoESG}</td>
                        <td className="text-center py-3 px-2">${row.monoESG}</td>
                        <td className="text-center py-3 px-2">${row.topconNoESG}</td>
                        <td className="text-center py-3 px-2">${row.topconESG}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>

            {/* Policy recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Policy Recommendations for Competitive Manufacturing</CardTitle>
                <CardDescription>Based on IRENA's conclusions for countries seeking to build domestic capacity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      icon: Zap,
                      color: 'text-yellow-600',
                      bg: 'bg-yellow-50 border-yellow-200',
                      title: 'Lower Industrial Electricity Costs',
                      desc: 'Provide preferential tariffs, incentivise onsite renewables, or support access to low-cost clean energy through PPAs. Electricity is the #1 cost driver in upstream manufacturing.',
                    },
                    {
                      icon: Shield,
                      color: 'text-blue-600',
                      bg: 'bg-blue-50 border-blue-200',
                      title: 'Manufacturer Certification + Finance',
                      desc: 'Establish quality standards and certified manufacturer lists (like India\'s PLI scheme) to reduce investment risk and attract low-cost financing.',
                    },
                    {
                      icon: Sun,
                      color: 'text-green-600',
                      bg: 'bg-green-50 border-green-200',
                      title: 'Innovation-Focused R&D Strategy',
                      desc: 'Invest in next-gen cell technologies, advanced manufacturing, and specialised materials. Focus on segments where global markets are not yet dominated.',
                    },
                  ].map((rec, i) => (
                    <div key={i} className={`p-4 rounded-xl border ${rec.bg}`}>
                      <rec.icon className={`h-8 w-8 ${rec.color} mb-3`} />
                      <h4 className="font-bold text-sm text-gray-900 mb-2">{rec.title}</h4>
                      <p className="text-xs text-gray-600 leading-relaxed">{rec.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Source attribution */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            Data Source: IRENA (2026), <em>Solar PV Supply Chain Cost Tool: Methodology, Results and Analysis</em>,
            International Renewable Energy Agency, Abu Dhabi.
          </p>
          <p className="text-xs text-gray-400 mt-2">
            This interactive analysis was created by <strong>techmadeeasy</strong> based on publicly available IRENA data.
            All cost figures are in 2025 USD unless otherwise noted.
          </p>
        </div>
      </div>
    </div>
  );
}
