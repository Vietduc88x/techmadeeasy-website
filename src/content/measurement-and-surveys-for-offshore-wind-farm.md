I've spent enough time reviewing survey reports and metocean datasets to tell you this: the measurement and survey phase of an offshore wind project is where you either build a foundation of confidence or set yourself up for a cascade of costly surprises.

It's not glamorous work. There are no ribbon cuttings for a successful geotechnical borehole campaign. But when a foundation design fails because the soil profile was mischaracterized, or when a cable route hits an unexploded ordnance because the geophysical survey was scoped too narrowly — that's when everyone suddenly cares about surveys.

> The measurement and survey phase is the cheapest insurance policy in offshore wind development. Skimping on it is the most expensive mistake you can make.

According to the Carbon Trust's Offshore Wind Accelerator programme, site investigation and survey costs typically represent 1–3% of total project CAPEX — yet the decisions informed by this data drive 30–40% of total project cost through foundation design, cable routing, and installation methodology. That ratio alone should tell you everything about how to prioritize this phase.

This article breaks down the critical measurement and survey campaigns required for offshore wind development — what they cost, how long they take, and the practical lessons from getting them right (and wrong).

![Offshore Wind Farm](/images/offshore_wind.png)
*Offshore wind development starts long before the first turbine — with years of data collection and site investigation*

---

## Why Surveys Matter More Than You Think

Before a single foundation pile is driven, the project team needs to answer three fundamental questions:

1. **How much energy will the site produce?** (Wind resource assessment)
2. **What are the environmental loads the structures must withstand?** (Metocean conditions)
3. **What is the ground made of, and what's on the seabed?** (Geotechnical and geophysical surveys)

Get the answers wrong, and you face:
- Over-designed foundations (wasted CAPEX)
- Under-designed foundations (structural failure risk)
- Suboptimal turbine layouts (lost Annual Energy Production)
- Cable route conflicts (unexploded ordnance, protected habitats, buried pipelines)
- Installation vessel mismatches (wrong crane capacity or jack-up leg penetration assumptions)

The survey phase typically runs 18–36 months before construction begins, and often overlaps with the development and permitting phases. From a PM perspective, this means survey planning needs to start at project inception — not after the investment decision.

---

## Part 1: Wind Resource Assessment

### The Business Case Foundation

Everything in an offshore wind project ultimately traces back to one number: the **P50 net Annual Energy Production (AEP)**. This is the expected annual energy output with a 50% probability of exceedance — the central estimate that drives revenue projections, financing models, and investment decisions.

To calculate P50 AEP with bankable confidence, you need at minimum 12 months of on-site wind measurement data, correlated against long-term reference datasets spanning 10–20 years. Most lenders and investors require 2–3 years of on-site data for project financing.

### Wind Measurement Technologies

| Technology | Typical Cost | Duration | Key Advantage | Key Limitation |
|-----------|-------------|----------|---------------|----------------|
| Met mast (fixed) | $1.5–3.0M installed | 2–5 years | Gold standard accuracy, multi-height sensors | High upfront cost, fixed location, permitting required |
| Floating LiDAR | $0.8–1.5M/year lease | 1–3 years | Relocatable, faster deployment, lower permitting burden | Requires validation against met mast or accepted standard |
| Onshore met mast + mesoscale modeling | $200–500K | 1–2 years | Low cost for early-stage screening | Less accurate for offshore conditions, modeled not measured |

**Practical insight:** Floating LiDAR technology has matured significantly since 2018. The Carbon Trust's Offshore Wind Accelerator programme has validated several floating LiDAR systems against fixed met masts, achieving measurement accuracy within 1–2% for wind speed. For most projects today, floating LiDAR provides bankable data at roughly half the cost of a fixed met mast.

However, there's a catch. Floating LiDAR systems require their own mooring design, marine operations for deployment and retrieval, and ongoing maintenance. In areas with strong currents or heavy vessel traffic (common in Southeast Asian waters), the operational challenges shouldn't be underestimated.

### What the Wind Data Tells Us

The wind measurement campaign produces several critical outputs:

- **Wind speed distribution** at hub height (typically 80–150m above sea level)
- **Wind direction frequency** (the wind rose) — essential for turbine layout optimization and wake modeling
- **Turbulence intensity** — affects turbine loading and fatigue life calculations
- **Wind shear profile** — how wind speed changes with height, critical for extrapolating to hub height
- **Extreme wind speeds** — 50-year and 100-year return period values for structural design

> **From the field:** I've seen projects where the wind resource assessment showed excellent average wind speeds but high turbulence intensity. The result? The turbine supplier required expensive custom-rated towers, eroding the project's LCOE advantage. Always look beyond the headline wind speed number.

---

## Part 2: Metocean Assessment

### Understanding the Ocean Environment

While wind data tells you how much energy the project will produce, metocean data tells you how hard it will be to build and how robust the structures need to be. "Metocean" is the combined measurement and analysis of meteorological and oceanographic conditions at the project site.

### Key Metocean Parameters

| Parameter | What It Measures | Why It Matters |
|-----------|-----------------|----------------|
| Significant wave height (Hs) | Average height of the highest one-third of waves | Structural design, installation vessel limits |
| Peak wave period (Tp) | Dominant wave frequency | Foundation fatigue loading, resonance checks |
| Current speed & direction | Water flow velocity at multiple depths | Cable design, scour prediction, vessel positioning |
| Tidal range | Vertical water level variation | Foundation design, access platform elevation |
| Water temperature & salinity | Thermal and chemical properties | Corrosion protection design, marine growth rates |
| Storm surge | Extreme water level events | Design water level for foundations and substations |

### Metocean Data Collection Methods

The standard approach combines:

1. **In-situ measurements**: Wave buoys, acoustic Doppler current profilers (ADCPs), and tide gauges deployed at the site for 12+ months
2. **Hindcast modeling**: Numerical wave and current models calibrated against measured data, extending the record to 20–30+ years
3. **Satellite altimetry**: Remote sensing data for validation and spatial coverage

A typical metocean measurement campaign for a 500 MW offshore wind project costs $500K–$1.5M and runs for 12–24 months. The hindcast modeling and analysis adds another $200–500K.

### Combined Wind-Metocean Campaigns

Here's where smart project management can save significant time and cost. Wind and metocean measurement can be combined on a single platform — either a fixed met mast equipped with wave sensors and current meters, or a floating LiDAR system paired with oceanographic instruments.

According to DNV's recommended practices (DNV-RP-C205), combining campaigns can reduce total measurement costs by 20–30% and compress the data collection timeline by 6–12 months versus sequential campaigns. We've used this approach on multiple projects in Vietnam and Southeast Asia, and the cost savings consistently justify the slightly more complex deployment logistics.

---

## Part 3: Geophysical Survey

### Mapping the Seabed

The geophysical survey is your first look at what lies beneath the water surface and below the seabed. Think of it as creating a detailed 3D model of the project site — from the water column down through the upper geological strata.

### Survey Equipment and Techniques

| Equipment | What It Does | Resolution | Typical Cost |
|-----------|-------------|-----------|-------------|
| Multibeam echosounder (MBES) | Maps seabed topography (bathymetry) | 0.1–0.5m vertical | $50–150K per campaign |
| Side-scan sonar (SSS) | Images seabed surface features and obstructions | 0.1–0.3m lateral | $40–100K per campaign |
| Sub-bottom profiler (SBP) | Images shallow geology below seabed | 0.1–1.0m vertical (depth-dependent) | $60–150K per campaign |
| Magnetometer (MAG) | Detects ferrous objects (UXO, pipelines, cables) | Detects objects >10kg at 3–5m range | $30–80K per campaign |
| Ultra-high resolution seismic (UHRS) | Deep geological profiling for foundation design | 1–3m vertical | $100–300K per campaign |

Most of these instruments are deployed simultaneously from a single survey vessel, making the marine operations highly efficient. A comprehensive geophysical survey for a 500 MW site typically takes 4–8 weeks of vessel time and costs $500K–$1.5M depending on water depth, site size, and data density requirements.

### What the Survey Reveals

The geophysical survey data enables:

1. **Bathymetric model**: Precise seabed elevation map — essential for foundation design heights and cable burial depth planning
2. **Seabed characterization**: Identification of rock outcrops, sand waves, boulders, and debris that affect foundation placement and cable routing
3. **Shallow geology model**: Stratigraphic layers and geological features down to 30–80m below seabed — the preliminary ground model for foundation design
4. **Geohazard identification**: Gas pockets (shallow gas), fault lines, unstable slopes, mobile sediments, and man-made objects (UXO, abandoned infrastructure)
5. **Environmental features**: Reef systems, sensitive habitats, and archaeological sites requiring avoidance or mitigation

> **Critical PM lesson:** Never skip the magnetometer survey. UXO (unexploded ordnance) clearance is one of the most expensive and schedule-critical risks in offshore wind construction. In areas with historical military activity — and much of Southeast Asia qualifies — a single undetected UXO can halt foundation installation for weeks while specialist disposal teams are mobilized. The magnetometer survey costs less than a single day of installation vessel standby.

---

## Part 4: Geotechnical Survey

### Understanding What's Below

If the geophysical survey shows you the shape and structure of the ground, the geotechnical survey tells you what it's made of and how it behaves under loading. This is the data that directly feeds foundation engineering design.

### Investigation Methods

| Method | What It Provides | Typical Cost Per Location | Duration |
|--------|-----------------|--------------------------|----------|
| Borehole drilling (with sampling) | Continuous soil profile, lab-quality samples | $150–400K | 12–48 hours per borehole |
| Cone Penetration Testing (CPT) | Continuous in-situ soil strength profile | $50–150K | 4–12 hours per test |
| Vibro-core sampling | Shallow seabed samples (top 3–6m) | $20–50K | 2–4 hours per sample |
| Piezocone testing (CPTU) | Soil strength + pore water pressure | $60–180K | 6–16 hours per test |

A typical geotechnical campaign for a 500 MW offshore wind project with 50–80 turbine positions requires:
- 10–20 boreholes (one per turbine cluster, plus cable route and substation locations)
- 50–80 CPTs (one at or near each turbine position)
- Laboratory testing program on recovered samples

Total cost: **$3–8M** depending on water depth, soil conditions, and the number of investigation points. Campaign duration: **8–16 weeks** of geotechnical vessel time.

### How Geotechnical Data Is Used

The geotechnical investigation results directly determine:

- **Foundation type selection**: Monopile, jacket, pile cap, gravity base — the soil profile dictates feasibility
- **Pile design**: Length, diameter, wall thickness, and installation method (impact hammer, vibratory, drill-drive-drill)
- **Scour protection requirements**: Susceptibility of seabed soils to erosion around foundations
- **Cable burial depth**: Achievable burial depth based on soil resistance and cable protection requirements
- **Jack-up vessel operations**: Leg penetration predictions for installation vessels — getting this wrong can strand a vessel

> **From the field:** On one project in the Mekong Delta, initial CPT data suggested relatively uniform soft clay to 25m depth. But the borehole campaign revealed a thin sand lens at 18m that the CPT had penetrated through without clearly indicating a layer change. That sand lens significantly affected pile driving resistance predictions. Without the borehole data, the piling contractor would have brought the wrong hammer — a mistake that could have cost $2M+ in vessel standby and remobilization. Always do both CPTs and boreholes.

---

## Campaign Sequencing: The Master Plan

One of the most important — and most frequently botched — aspects of survey management is campaign sequencing. The surveys are interdependent, and the sequence matters.

### Recommended Sequence

| Phase | Campaign | Duration | Typical Cost (500MW) | Key Output |
|-------|----------|----------|---------------------|------------|
| 1 | Desktop study & data review | 2–3 months | $100–300K | Preliminary risk assessment, data gap analysis |
| 2 | Wind measurement deployment | Month 3 (runs 12–36 months) | $1.5–3.0M | Wind resource dataset |
| 3 | Metocean measurement | Month 3–6 (runs 12–24 months) | $500K–1.5M | Wave, current, tidal dataset |
| 4 | Geophysical survey | Month 6–9 | $500K–1.5M | Bathymetry, geology, geohazards |
| 5 | Environmental surveys | Month 6–18 | $500K–2.0M | Habitat maps, species data |
| 6 | Geotechnical survey | Month 12–18 | $3–8M | Soil profiles, foundation design parameters |
| 7 | UXO survey & clearance | Month 18–24 | $500K–3.0M | Cleared installation corridors |
| **Total** | | **24–36 months** | **$8–22M** | **Bankable site characterization** |

The total survey investment of $8–22M for a 500 MW project represents roughly 1–2% of total CAPEX (typically $2–3 billion). Yet these surveys inform design decisions that drive 30–40% of total cost.

### Why Sequence Matters

The sequence above isn't arbitrary:

1. **Geophysical before geotechnical**: The geophysical survey identifies where to drill. Drilling without geophysical data risks missing critical geological features and placing boreholes suboptimally.
2. **Wind data before layout finalization**: You can't optimize turbine positions without wind data. And you can't plan geotechnical investigation locations without a preliminary layout.
3. **Metocean data before installation planning**: Installation weather windows, vessel selection, and marine operations planning all depend on metocean conditions.

> **PM lesson:** I've seen projects try to run geotechnical campaigns before completing the geophysical survey to "save time." The result? They drilled boreholes in locations that were later moved due to geohazard avoidance, cable route changes, or layout optimization. Those wasted boreholes cost $200–400K each. Sequential may feel slower, but it's almost always cheaper.

---

## The PM Perspective: Managing Survey Campaigns

### Budget Planning

Survey campaigns are notorious for cost overruns. The three most common causes:

1. **Weather downtime**: Geotechnical vessels cost $100–300K per day. In monsoon-prone areas like Southeast Asia, weather standby can add 30–50% to planned vessel days.
2. **Scope creep**: Additional investigation points requested by the design team after the campaign has started. Each additional borehole requires vessel repositioning and setup time.
3. **Data quality issues**: If the first pass of data doesn't meet quality requirements (common with older survey equipment or inexperienced crews), repeat passes are needed.

### Contract Strategy

For survey campaigns, we generally recommend:

- **Unit rate contracts** for geotechnical work (per borehole, per CPT, per day of vessel time) — this provides flexibility to add or remove investigation points based on preliminary results
- **Lump sum contracts** for geophysical work — the scope is better defined upfront and less likely to change
- **Day rate contracts** for met mast and LiDAR maintenance — the duration is fixed but the effort required is unpredictable

### Data Management

One often-overlooked aspect: survey data management. A single offshore wind project generates terabytes of raw survey data across multiple campaigns. Without a structured data management system:

- Data gets lost in email threads and personal drives
- Different teams use different coordinate systems or datums
- Critical data gaps aren't identified until it's too late

Invest in a centralized project data management system from day one. The cost is trivial compared to the consequences of lost or mismanaged survey data.

![Energy Ecosystem](/images/energy_ecosystem.png)
*The offshore wind ecosystem depends on comprehensive site data — surveys are the foundation of every engineering decision*

---

## The Honest Take

Survey and measurement campaigns are the least exciting part of offshore wind development. They don't make headlines, they don't generate electricity, and they're often the first line item targeted when budgets are under pressure.

But here's the reality: every major construction issue I've encountered on offshore wind projects — cost overruns on foundations, installation delays, cable route conflicts, environmental compliance failures — can be traced back to insufficient or poorly managed site investigation.

The projects that invest properly in surveys — that sequence the campaigns correctly, that budget for weather contingency, that hire experienced survey contractors and data analysts — consistently deliver smoother construction phases and more predictable project economics.

If there's one message to take away: **surveys are not a cost center. They are a risk reduction investment.** And in a project where a single day of installation vessel standby costs $200–500K, the return on that investment is extraordinary.

---

**Disclaimer:** Views expressed are entirely our own and do not represent any employer, client, or organization. Data cited is from publicly available industry reports and our professional experience.

**Sources:**
- Carbon Trust Offshore Wind Accelerator Programme
- DNV Recommended Practice DNV-RP-C205 (Environmental Conditions and Environmental Loads)
- GWEC Global Wind Report 2024
- IEC 61400-12 (Power Performance Measurements)
- Industry project experience (2020–2025)

*By Duc Hoang, PMP | Tech Made Easy (techmadeeasy.info)*
