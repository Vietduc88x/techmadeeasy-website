import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, ComposedChart } from 'recharts';
import { Link } from 'react-router-dom';

const FIMImplementationRoadmap = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Data for visualizations
  const phaseTimeline = [
    { phase: "Phase 1", duration: 4, start: 0, activities: "Strategic Assessment & Planning" },
    { phase: "Phase 2", duration: 6, start: 4, activities: "Supplier Engagement & Negotiation" },
    { phase: "Phase 3", duration: 8, start: 10, activities: "Contract Integration & Logistics Setup" },
    { phase: "Phase 4", duration: 12, start: 18, activities: "Execution & Proactive Monitoring" }
  ];

  const costSavings = [
    { category: "Direct Procurement", savings: 15, color: "#8884d8" },
    { category: "Reduced Mark-ups", savings: 8, color: "#82ca9d" },
    { category: "Logistics Optimization", savings: 5, color: "#ffc658" },
    { category: "Quality Control", savings: 3, color: "#ff7300" },
    { category: "Tax Optimization", savings: 2, color: "#00ff00" }
  ];

  const riskMitigation = [
    { risk: "Supply Chain Disruption", effectiveness: 85, impact: "High" },
    { risk: "Quality Issues", effectiveness: 90, impact: "High" },
    { risk: "Schedule Delays", effectiveness: 75, impact: "Medium" },
    { risk: "Cost Overruns", effectiveness: 80, impact: "High" },
    { risk: "Contractual Disputes", effectiveness: 70, impact: "Medium" }
  ];

  const teamStructure = [
    { role: "FIM Project Manager", importance: 95 },
    { role: "Procurement Specialist", importance: 90 },
    { role: "Logistics Expert", importance: 85 },
    { role: "Quality Engineer", importance: 80 },
    { role: "Engineering Rep", importance: 75 },
    { role: "Legal Specialist", importance: 70 },
    { role: "Finance Controller", importance: 65 }
  ];

  const workshopSchedule = [
    { week: 1, workshop: "FIM Introduction", participants: 25, duration: 4 },
    { week: 3, workshop: "Procurement Strategy", participants: 15, duration: 6 },
    { week: 5, workshop: "Contract Integration", participants: 12, duration: 8 },
    { week: 7, workshop: "Quality Control", participants: 18, duration: 6 },
    { week: 9, workshop: "Logistics Planning", participants: 20, duration: 8 },
    { week: 11, workshop: "Performance Monitoring", participants: 22, duration: 4 }
  ];

  const businessCaseMetrics = [
    { metric: "Cost Reduction", value: 33 },
    { metric: "Schedule Improvement", value: 15 },
    { metric: "Quality Enhancement", value: 25 },
    { metric: "Risk Mitigation", value: 40 },
    { metric: "ROI", value: 180 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="container mx-auto p-4">
      <Link to="/blog" className="text-blue-500 hover:underline mb-4 inline-block">&larr; Back to Blog</Link>
      <h1 className="text-4xl font-bold mb-4">FIM Implementation Roadmap: Your Path to Procurement Excellence</h1>
      <p className="text-lg text-gray-600 mb-6">A detailed and interactive guide to integrating Free Issue Material (FIM) strategy for optimal procurement in renewable energy projects.</p>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="workshop">Workshops</TabsTrigger>
          <TabsTrigger value="procurement_structure">Procurement Structure</TabsTrigger>
          <TabsTrigger value="team_organization">Team Organization</TabsTrigger>
          <TabsTrigger value="business_case">Business Case</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>FIM Implementation Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={phaseTimeline}>
                    <XAxis dataKey="phase" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="duration" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost Savings Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={costSavings}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ category, savings }) => `${category}: ${savings}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="savings"
                    >
                      {costSavings.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Overview of FIM Implementation Roadmap</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">The Free Issue Material (FIM) strategy is a critical approach in complex projects, particularly within the renewable energy sector, where optimizing procurement processes can lead to significant cost savings, improved project timelines, and enhanced quality control. This roadmap outlines a structured, phased approach to successfully integrate FIM into your procurement strategy, ensuring excellence from planning to execution.</p>
              <p className="mb-4">FIM involves the client or main contractor providing specific materials or components directly to the EPC (Engineering, Procurement, and Construction) contractor or other suppliers, rather than these items being procured by the contractor themselves. This approach offers several advantages, including better control over material quality, direct access to preferred suppliers, and potential for bulk purchasing discounts. However, it also introduces complexities related to logistics, quality assurance, and contractual agreements that must be meticulously managed.</p>
              <p className="mb-4">Our roadmap is designed to guide organizations through these complexities, breaking down the implementation process into manageable phases, each with distinct objectives and key activities. By following this comprehensive plan, companies can mitigate risks, leverage FIM benefits, and achieve superior procurement outcomes, ultimately contributing to the overall success and profitability of their renewable energy projects.</p>
              <h3 className="text-2xl font-semibold mt-6 mb-3">Key Phases of FIM Implementation</h3>
              <ul className="list-disc list-inside mb-4">
                <li><strong>Phase 1: Strategic Assessment & Planning:</strong> Laying the groundwork by analyzing project components, assessing the market, and developing a detailed FIM procurement plan.</li>
                <li><strong>Phase 2: Supplier Engagement & Negotiation:</strong> Engaging with qualified suppliers, evaluating their capabilities, and negotiating favorable terms.</li>
                <li><strong>Phase 3: Contract Integration & Logistics Setup:</strong> Modifying contracts, establishing interface protocols, and setting up robust quality control and logistics.</li>
                <li><strong>Phase 4: Execution & Proactive Monitoring:</strong> Actively overseeing supplier performance, managing logistics, and tracking key metrics to demonstrate value.</li>
              </ul>
              <p>Each phase is crucial for a successful FIM integration, requiring careful planning, cross-functional collaboration, and continuous monitoring. The following sections will delve deeper into specific aspects, including workshops, procurement structure, team organization, and the compelling business case for FIM.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workshop">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Workshop Schedule & Participation</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={workshopSchedule}>
                    <XAxis dataKey="week" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="participants" fill="#8884d8" name="Participants" />
                    <Line yAxisId="right" type="monotone" dataKey="duration" stroke="#ff7300" name="Duration (hours)" />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Workshop Types Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {workshopSchedule.map((workshop, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <h4 className="font-semibold">{workshop.workshop}</h4>
                        <p className="text-sm text-gray-600">Week {workshop.week}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{workshop.participants} people</p>
                        <p className="text-sm text-gray-600">{workshop.duration} hours</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>FIM Implementation Workshops</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Workshops are foundational to a successful FIM implementation, serving as critical platforms for knowledge transfer, alignment, and collaborative planning. These sessions bring together key stakeholders from various departments—procurement, engineering, legal, logistics, project management, and finance—to ensure a holistic understanding and unified approach to the FIM strategy. The primary goal of these workshops is to foster a shared vision, clarify roles and responsibilities, and collectively address potential challenges before they escalate.</p>
              <p className="mb-4">Typically, FIM workshops are structured in several stages, progressing from introductory overviews to detailed operational planning. Initial sessions might focus on educating participants about the FIM concept, its benefits, and the overall roadmap. Subsequent workshops delve into more granular topics, such as specific material requirements, supplier selection criteria, contractual implications, logistics planning, and quality control procedures. Interactive exercises, case studies, and brainstorming sessions are often incorporated to encourage active participation and facilitate practical problem-solving.</p>
              <h3 className="text-2xl font-semibold mt-6 mb-3">Key Workshop Objectives:</h3>
              <ul className="list-disc list-inside mb-4">
                <li><strong>Stakeholder Alignment:</strong> Ensuring all relevant parties understand and commit to the FIM strategy.</li>
                <li><strong>Process Definition:</strong> Detailing new or modified procurement, logistics, and quality control processes.</li>
                <li><strong>Risk Identification & Mitigation:</strong> Proactively identifying potential risks (e.g., supply chain disruptions, quality issues) and developing mitigation strategies.</li>
                <li><strong>Role & Responsibility Clarification:</strong> Clearly defining who is accountable for each aspect of the FIM process.</li>
                <li><strong>Tool & System Integration:</strong> Discussing the integration of FIM processes with existing ERP, supply chain management, and project management systems.</li>
                <li><strong>Training & Capability Building:</strong> Equipping teams with the necessary skills and knowledge to manage FIM effectively.</li>
              </ul>
              <p className="mb-4">Effective workshops are not one-off events but rather a series of structured engagements that evolve with the project lifecycle. Post-workshop follow-ups are essential to track progress, address emerging issues, and reinforce learned concepts. By investing in comprehensive FIM workshops, organizations can build a strong foundation for successful implementation, fostering a culture of collaboration and proactive problem-solving that is vital for procurement excellence.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="procurement_structure">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Structure Importance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={teamStructure}>
                    <XAxis dataKey="role" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="importance" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Mitigation Effectiveness</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={riskMitigation}>
                    <XAxis dataKey="risk" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="effectiveness" stroke="#8884d8" fill="#8884d8" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Optimizing Procurement Structure for FIM</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">The successful implementation of a Free Issue Material (FIM) strategy necessitates a re-evaluation and potential restructuring of the existing procurement organization. Traditional procurement models, where contractors are solely responsible for material sourcing, may not be adequately equipped to handle the complexities introduced by FIM. A tailored procurement structure ensures that roles, responsibilities, and processes are aligned to maximize the benefits of FIM while mitigating associated risks.</p>
              <p className="mb-4">Several organizational models can be adapted for FIM, each with its own advantages and considerations:</p>
              <ul className="list-disc list-inside mb-4">
                <li><strong>Centralized Model:</strong> A dedicated central FIM procurement team manages all aspects of material sourcing, contracting, and logistics. This model offers strong control, consistency, and leverage for bulk purchasing. It is ideal for organizations with multiple projects requiring similar FIM components.</li>
                <li><strong>Decentralized Model:</strong> FIM procurement responsibilities are distributed among individual project teams. This provides greater flexibility and responsiveness to specific project needs but may lead to fragmented purchasing and reduced leverage.</li>
                <li><strong>Hybrid Model:</strong> Combines elements of both centralized and decentralized approaches. A central team sets overall FIM strategy, policies, and key supplier agreements, while project-specific teams handle day-to-day execution and localized logistics. This model often strikes the best balance between control and flexibility.</li>
              </ul>
              <p className="mb-4">Regardless of the chosen model, key considerations for optimizing the procurement structure include:</p>
              <ul className="list-disc list-inside mb-4">
                <li><strong>Clear Accountability:</strong> Defining clear ownership for FIM-related tasks, from supplier selection to quality control and delivery.</li>
                <li><strong>Cross-functional Integration:</strong> Establishing strong communication channels and collaboration mechanisms between procurement, engineering, project management, and logistics teams.</li>
                <li><strong>Specialized Expertise:</strong> Ensuring the procurement team possesses the necessary expertise in FIM-specific contracting, international trade, and quality assurance.</li>
                <li><strong>Technology Enablement:</strong> Leveraging procurement software, ERP systems, and supply chain visibility tools to manage FIM processes efficiently.</li>
              </ul>
              <p>An optimized procurement structure is not merely about assigning tasks; it\'s about creating an agile and responsive framework that can effectively manage the unique demands of FIM, transforming potential challenges into strategic advantages for the organization.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team_organization">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Role Importance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={teamStructure}>
                    <XAxis dataKey="role" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="importance" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Team Role Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={teamStructure}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ role, importance }) => `${role}: ${importance}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="importance"
                    >
                      {teamStructure.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Effective Team Organization for FIM</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">The success of a Free Issue Material (FIM) strategy hinges significantly on the effective organization and collaboration of the project team. Unlike traditional procurement, FIM requires a highly integrated and cross-functional approach, as responsibilities for material provision are shared between the client/owner and the contractor. A well-structured team ensures seamless coordination, clear communication, and efficient problem-solving throughout the project lifecycle.</p>
              <p className="mb-4">Key roles within an FIM-focused project team typically include:</p>
              <ul className="list-disc list-inside mb-4">
                <li><strong>FIM Project Manager/Coordinator:</strong> Oversees the entire FIM process, ensuring alignment with project goals, managing timelines, and coordinating between internal departments and external suppliers/contractors.</li>
                <li><strong>Procurement Specialists:</strong> Responsible for supplier identification, qualification, negotiation, and contract management for FIM components. They work closely with engineering to ensure technical specifications are met.</li>
                <li><strong>Logistics & Supply Chain Experts:</strong> Manage the transportation, warehousing, customs clearance, and on-site delivery of FIM. They are crucial for ensuring materials arrive on time and in good condition.</li>
                <li><strong>Quality Control/Assurance Engineers:</strong> Develop and implement quality inspection plans for FIM at various stages (factory, port, site) and manage any non-conformance issues.</li>
                <li><strong>Engineering Representatives:</strong> Provide technical specifications, review supplier proposals, and ensure FIM components meet design requirements.</li>
                <li><strong>Legal & Contracts Specialists:</strong> Draft and review FIM-specific clauses in EPC/BOP contracts, ensuring clear definition of scope, liabilities, and responsibilities.</li>
                <li><strong>Finance & Cost Controllers:</strong> Monitor FIM-related expenditures, track cost savings, and manage payment terms with suppliers.</li>
              </ul>
              <p className="mb-4">Beyond individual roles, the organizational structure should promote:</p>
              <ul className="list-disc list-inside mb-4">
                <li><strong>Cross-functional Communication:</strong> Regular meetings, shared platforms, and clear reporting lines to facilitate information exchange.</li>
                <li><strong>Integrated Planning:</strong> Joint planning sessions between client and contractor teams to synchronize FIM delivery with construction schedules.</li>
                <li><strong>Proactive Risk Management:</strong> A collaborative approach to identifying and mitigating FIM-related risks, such as supply chain disruptions or quality defects.</li>
                <li><strong>Performance Monitoring:</strong> Establishing clear KPIs for FIM performance and regularly reviewing them to ensure continuous improvement.</li>
              </ul>
              <p>By fostering a collaborative and well-organized team, organizations can effectively navigate the complexities of FIM, transforming it from a logistical challenge into a strategic advantage that drives project success and procurement excellence.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="business_case">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Business Case Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={businessCaseMetrics}>
                    <XAxis dataKey="metric" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Mitigation Effectiveness</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={riskMitigation}>
                    <XAxis dataKey="risk" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="effectiveness" stroke="#8884d8" fill="#8884d8" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>The Compelling Business Case for FIM</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Implementing a Free Issue Material (FIM) strategy is not merely an operational adjustment; it represents a strategic decision with a compelling business case, particularly for large-scale renewable energy projects. The financial and operational benefits derived from FIM can significantly impact project profitability, risk management, and overall organizational efficiency. This section outlines the key elements that form the robust business case for adopting FIM.</p>
              <h3 className="text-2xl font-semibold mt-6 mb-3">1. Cost Savings & Optimization</h3>
              <ul className="list-disc list-inside mb-4">
                <li><strong>Direct Procurement Advantages:</strong> Clients can leverage their purchasing power and global supplier relationships to secure materials at lower costs than individual EPC contractors. This often includes bulk discounts and direct-from-manufacturer pricing.</li>
                <li><strong>Reduced Contractor Mark-ups:</strong> By providing materials directly, clients eliminate the mark-ups that contractors typically add to procured items, leading to substantial savings.</li>
                <li><strong>Optimized Logistics & Inventory:</strong> Centralized FIM management can lead to more efficient logistics, reduced warehousing costs, and minimized inventory holding costs through just-in-time delivery strategies.</li>
                <li><strong>Tax & Duty Optimization:</strong> Opportunities for optimizing import duties and taxes by managing the import process directly.</li>
              </ul>
              <h3 className="text-2xl font-semibold mt-6 mb-3">2. Risk Mitigation & Quality Control</h3>
              <ul className="list-disc list-inside mb-4">
                <li><strong>Enhanced Quality Assurance:</strong> Direct procurement allows clients to implement stringent quality control measures at the source, reducing the risk of defective materials and rework.</li>
                <li><strong>Supply Chain Stability:</strong> Direct relationships with key suppliers provide greater visibility and control over the supply chain, mitigating risks associated with material shortages or delivery delays.</li>
                <li><strong>Contractual Clarity:</strong> FIM clarifies contractual liabilities, as the client assumes responsibility for material quality and delivery, while the contractor focuses on installation and construction.</li>
                <li><strong>Intellectual Property Protection:</strong> For proprietary components, FIM ensures that sensitive designs and technologies remain under the client\\'s control.</li>
              </ul>
              <h3 className="text-2xl font-semibold mt-6 mb-3">3. Project Schedule & Efficiency</h3>
              <ul className="list-disc list-inside mb-4">
                <li><strong>Accelerated Project Timelines:</strong> Pre-ordering and timely delivery of critical FIM components can prevent delays caused by long lead times or contractor procurement bottlenecks.</li>
                <li><strong>Improved Planning & Coordination:</strong> FIM encourages integrated planning between client and contractor, leading to better synchronization of material availability with construction schedules.</li>
                <li><strong>Reduced Disputes:</strong> Clear delineation of responsibilities for materials can reduce potential disputes between client and contractor, streamlining project execution.</li>
              </ul>
              <p className="mb-4">While FIM requires upfront investment in planning and management capabilities, the long-term benefits in terms of cost savings, risk reduction, and project efficiency far outweigh the initial complexities. A well-executed FIM strategy transforms procurement from a cost center into a strategic lever for achieving project excellence and maximizing return on investment in renewable energy ventures.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FIMImplementationRoadmap;

