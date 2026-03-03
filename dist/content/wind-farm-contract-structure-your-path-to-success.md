The single most consequential decision in a wind farm project — after site selection — is the contract structure. Not the turbine model. Not the foundation type. The contract structure.

This might seem like a back-office legal topic. It's not. The contract structure determines who carries which risks, how much the project will cost, how much control the developer retains, and — critically — how disputes are resolved when things go wrong. And things always go wrong.

> The contract structure is the operating system of your wind farm project. Choose the wrong one, and no amount of good engineering or project management can compensate.

Having worked across multiple contract structures — from full EPC turnkey to multi-package with 7+ contractors — I can tell you that there is no universally "best" structure. The right choice depends on your organization's capabilities, risk appetite, project complexity, and financing requirements. But the wrong choice is almost always the one made without fully understanding the trade-offs.

This article examines the main contract structure options for wind farm projects, their pros and cons, and the FIDIC contract forms typically used with each. It's written for developers, PMs, and anyone involved in structuring these projects.

![Offshore Wind Farm](/images/offshore_wind.png)
*Wind farm contract structure determines risk allocation, cost, and control — the most consequential project decision after site selection*

---

## The Spectrum of Contract Structures

Wind farm contract structures exist on a spectrum from maximum developer control (and risk) to maximum contractor control (and risk):

| Structure | Developer Risk | Developer Control | Cost Premium | PM Team Size |
|-----------|---------------|-------------------|-------------|-------------|
| **Multi-Package (5–7+ packages)** | Highest | Highest | Lowest (baseline) | Large (15–30) |
| **HV + BOP + TSA (3 packages)** | High | High | +5–10% | Medium (10–20) |
| **HV + Wind EPC (2 packages)** | Medium | Medium | +10–15% | Small-Medium (8–15) |
| **Full EPC Turnkey (1 package)** | Lowest | Lowest | +15–25% | Small (5–10) |

The fundamental trade-off: **more packages = lower cost but higher complexity and risk for the developer. Fewer packages = higher cost but simpler management and lower developer risk.**

---

## Option 1: Full EPC Turnkey

### How It Works

A single EPC contractor takes responsibility for the entire wind farm — engineering, procurement, construction, and commissioning. The developer signs one contract, pays against milestones, and receives a completed, operational wind farm.

### Pros

- **Single point of responsibility**: One contractor is accountable for everything. No interface gaps, no finger-pointing between contractors.
- **Fixed price, fixed schedule**: The EPC contractor bears the risk of cost overruns and delays (within the contracted scope). This is highly valued by project finance lenders.
- **Minimal developer PM resources**: The developer needs a small team to oversee the EPC contractor, not a large team to manage multiple packages.
- **Bankability**: Lenders love EPC turnkey structures because the risk profile is clear and the developer's execution risk is minimized.

### Cons

- **Cost premium**: The EPC contractor prices the risk they're absorbing — typically 15–25% above the aggregate cost of individual packages. You're paying for certainty.
- **Limited control**: The developer has less influence over equipment selection, subcontractor choice, and construction methodology. The EPC contractor makes these decisions to optimize their own risk/return profile.
- **Limited competition**: Very few companies can serve as full EPC contractor for a large wind farm. The market is oligopolistic, reducing competitive tension.
- **Change order exposure**: Any change to the scope or specification triggers a change order process where the EPC contractor has significant pricing leverage.

### When to Choose

- First-time developers or developers entering a new market
- Projects with non-recourse project finance where lender requirements dictate the structure
- Projects where the developer lacks the in-house PM capability for multi-package management
- Markets where the EPC contractor pool is competitive (reducing the cost premium)

### Typical Contract Form

**FIDIC Silver Book** (Conditions of Contract for EPC/Turnkey Projects). Key features:
- Contractor designs, procures, and builds to the Employer's Requirements
- Fixed lump sum price
- Contractor accepts most risks (including ground conditions unless "unforeseeable")
- Employer's role is supervision and acceptance, not direction

**Cost benchmark**: For a 200 MW onshore wind project in Southeast Asia, full EPC turnkey typically ranges $1.4–1.8M/MW (total installed cost).

---

## Option 2: HV + Wind EPC (Two Packages)

### How It Works

The project is split into two packages:
1. **Wind EPC**: Covers turbine supply, BOP (foundations, roads, cabling), and turbine installation
2. **HV Package**: Covers the onshore substation, HV grid connection, and (sometimes) the export cable

### Pros

- **Leverages local HV expertise**: In most markets, the grid connection and onshore substation are best handled by a local electrical contractor with deep knowledge of the grid operator's requirements and approval processes.
- **Reduced interface complexity**: Only one major interface to manage (between the Wind EPC and HV packages) versus multiple interfaces in a multi-package structure.
- **Still relatively bankable**: Two packages is manageable from a lender's perspective, especially if the Wind EPC is a fixed-price contract.
- **Cost reduction vs. full EPC**: The HV package is procured competitively from local contractors, typically at lower cost than if bundled into a full EPC scope.

### Cons

- **Interface risk at the HV connection point**: The physical and electrical interface between the Wind EPC scope and the HV package is the critical coordination point. Who designs the substation cable bay? Who tests the protection settings? These questions need clear contractual answers.
- **Schedule coordination**: The Wind EPC and HV contractors must coordinate their schedules, particularly around energization and commissioning. Misalignment here can delay grid connection.
- **Finding a capable Wind EPC contractor**: The Wind EPC contractor must handle both the turbine supply agreement and the civil/electrical BOP — this requires a different skill set than either a pure turbine OEM or a pure civil contractor.

### When to Choose

- Projects where the grid connection is complex and benefits from local expertise
- Markets where local HV contractors have strong track records with the grid operator
- Developers with moderate PM capability — enough to manage one major interface but not 5–7 packages

### Typical Contract Forms

- Wind EPC: **FIDIC Silver Book** (EPC/Turnkey)
- HV Package: **FIDIC Yellow Book** (Plant and Design-Build) or **Red Book** (Measurement) depending on scope definition maturity

---

## Option 3: HV + BOP + TSA (Three Packages)

### How It Works

The project is split into three packages:
1. **TSA (Turbine Supply Agreement)**: Direct contract with the turbine OEM for supply of WTGs
2. **BOP (Balance of Plant)**: Foundations, access roads, internal cabling, crane pads, and sometimes turbine erection
3. **HV Package**: Onshore substation and grid connection

### Pros

- **Direct relationship with turbine OEM**: The developer contracts directly with the turbine manufacturer, giving better visibility into turbine specifications, delivery schedules, and warranty terms.
- **Cost optimization**: Separating the TSA from the BOP typically reveals cost savings — the BOP contractor isn't marking up the turbine price, and the turbine OEM isn't marking up the BOP work.
- **Local BOP contractors**: The BOP scope (civil works, foundations, roads) can be awarded to experienced local contractors who know the terrain, labor market, and regulatory environment.
- **Better warranty structure**: Turbine warranties are negotiated directly with the OEM, avoiding the "back-to-back warranty" complications that arise in EPC contracts where the EPC contractor acts as intermediary.

### Cons

- **Two major interfaces to manage**: TSA-BOP interface (turbine loads, delivery scheduling, installation coordination) and BOP-HV interface (cable terminations, protection settings)
- **Developer takes construction coordination risk**: With three separate contractors, the developer (or their Owner's Engineer) must manage the overall construction sequence, resolve schedule conflicts, and ensure interface coordination.
- **More complex financing**: Lenders need to understand three separate contractual risk profiles, which increases due diligence complexity.

### When to Choose

- Developers with established PM teams and prior wind project experience
- Projects where the turbine OEM doesn't offer a full EPC capability (common for some European and Chinese OEMs in Asian markets)
- Projects prioritizing cost optimization over simplicity
- Markets with strong local BOP contractor capabilities

### Typical Contract Forms

- TSA: Custom turbine supply agreement (not FIDIC) — typically negotiated directly with OEM using their standard terms as a starting point
- BOP: **FIDIC Red Book** (Measurement) — quantities are measured on site, and payment is based on unit rates from a bill of quantities
- HV: **FIDIC Yellow Book** or **Red Book**

### Cost benchmark

Typically 10–15% lower total cost than full EPC turnkey for the same project scope.

---

## Option 4: Multi-Package (5–7+ Packages)

### How It Works

The project is split into maximum granularity:
1. **TSA**: Turbine supply
2. **EBOP (Electrical BOP)**: Array cables, export cables, electrical infrastructure
3. **CBOP (Civil BOP)**: Foundations, roads, crane pads, site preparation
4. **T&I (Transport & Installation)**: Marine/onshore transportation and erection
5. **HV**: Onshore substation and grid connection
6. **OSS (Offshore Substation)**: If applicable for offshore projects
7. **Foundations**: Foundation fabrication (separate from installation)

### Pros

- **Maximum cost optimization**: Each package is competitively tendered to specialist contractors. No single contractor is marking up work outside their core competency.
- **Maximum control**: The developer controls every aspect — equipment selection, construction methodology, schedule sequencing, quality standards.
- **Best-in-class contractors**: Each package goes to the contractor with the strongest capability in that specific discipline.
- **Transparency**: The developer has full visibility into the cost structure of every component.

### Cons

- **Maximum complexity**: 5–7 packages means 10–20+ contractual interfaces. Managing these interfaces is a full-time job for a dedicated team.
- **Developer takes all coordination risk**: If Package A delivers late and it delays Package B, the developer — not the contractors — absorbs the cost. There's no single EPC contractor to hold accountable for the overall schedule.
- **Large PM team required**: A multi-package structure requires 15–30 experienced professionals on the developer's team — project managers, engineers, contract administrators, scheduler, and interface managers.
- **Financing complexity**: Lenders must evaluate risk across 5–7 separate contracts. Some lenders simply won't finance multi-package structures unless the developer has a strong track record.
- **Claims environment**: With multiple interfaces, disputes between contractors about whose scope caused a problem are common. The developer often ends up arbitrating between contractors.

### When to Choose

- Experienced developers with large, seasoned PM teams
- Very large projects (500 MW+) where the cost savings from multi-package structure justify the management overhead
- Developers with strong balance sheets who can self-finance or attract lenders comfortable with the structure
- Projects where specific packages have dramatically different risk profiles that benefit from targeted risk allocation

### Typical Contract Forms

- TSA: Custom supply agreement
- EBOP/CBOP: **FIDIC Red Book** (Measurement contracts with bill of quantities)
- T&I: Day rate or unit rate contracts (highly specialized marine operations)
- HV: **FIDIC Yellow Book** or **Red Book**
- OSS/Foundations fabrication: Custom supply agreements or **FIDIC Yellow Book**

### Cost benchmark

Typically 15–25% lower total cost than full EPC turnkey — but only if the developer has the PM capability to manage the interfaces effectively. If interface management fails, the cost savings are quickly consumed by delay costs, claims, and remedial works.

---

## Contract Structure Comparison

| Criteria | Full EPC | HV + Wind EPC | HV + BOP + TSA | Multi-Package |
|----------|---------|---------------|----------------|---------------|
| **Total cost** | Highest | High | Medium | Lowest |
| **Developer risk** | Lowest | Low-Medium | Medium-High | Highest |
| **Interface complexity** | None | Low (1 interface) | Medium (2 interfaces) | High (10–20+ interfaces) |
| **PM team required** | 5–10 people | 8–15 people | 10–20 people | 15–30 people |
| **Lender acceptance** | Highest | High | Medium | Variable |
| **Developer control** | Lowest | Medium | High | Highest |
| **Schedule certainty** | Highest | High | Medium | Lowest |
| **Flexibility** | Lowest | Low-Medium | Medium | Highest |

---

## FIDIC Contracts: A Quick Guide

FIDIC (Federation Internationale Des Ingenieurs-Conseils) publishes internationally recognized standard contract forms. The three most relevant for wind projects:

### Red Book (Conditions of Contract for Construction)

- **Design responsibility**: Employer (developer) provides the design
- **Payment**: Based on measurement of quantities and application of unit rates
- **Risk allocation**: Balanced between employer and contractor
- **Best for**: BOP packages where the developer has completed detailed design and wants to control the engineering

### Yellow Book (Conditions of Contract for Plant and Design-Build)

- **Design responsibility**: Contractor designs to the Employer's Requirements
- **Payment**: Lump sum against milestones
- **Risk allocation**: More risk on the contractor (they design and build)
- **Best for**: HV substation packages, offshore substation, self-contained design-build packages

### Silver Book (Conditions of Contract for EPC/Turnkey Projects)

- **Design responsibility**: Contractor takes full design responsibility
- **Payment**: Fixed lump sum price
- **Risk allocation**: Maximum risk on contractor (including ground conditions)
- **Best for**: Full EPC turnkey contracts where the developer wants maximum certainty

> **Important note on Sub-EPC contracts**: When a Wind EPC contractor subcontracts the BOP scope, the Sub-EPC contract typically does not include the performance guarantees (energy yield, availability) that are in the main EPC contract. The main EPC contractor retains these guarantees and manages the Sub-EPC contractor's performance to meet them. This distinction matters for warranty and liability purposes.

![Project Strategy](/images/project_strategy_board.jpg)
*Contract structure decisions require balancing cost, risk, control, and organizational capability — there's no one-size-fits-all answer*

---

## Practical Lessons from the Field

### Lesson 1: Match the Structure to Your Team

The most common mistake is choosing a contract structure that doesn't match the developer's organizational capability. A multi-package structure managed by a team of 5 people is a recipe for disaster. Conversely, paying a 20% EPC premium when you have a 25-person PM team with extensive wind experience is leaving money on the table.

**Rule of thumb**: If you need to hire most of your PM team specifically for this project, choose a simpler structure. If you already have an experienced team in place, consider a more granular structure.

### Lesson 2: Interface Specifications Are Contracts Too

In multi-package structures, the interface specifications between packages are just as important as the package contracts themselves. These documents define:
- Physical interfaces (bolt patterns, cable termination details, transition piece geometry)
- Information interfaces (design data delivery schedule, format, approval process)
- Schedule interfaces (milestone dependencies, handover criteria)
- Commercial interfaces (who pays for shared resources, who bears risk at the handover point)

Treat interface specifications with the same rigor as contract terms. Review them with the same legal and engineering scrutiny.

### Lesson 3: The TSA Is Not a Normal Supply Contract

The Turbine Supply Agreement is unlike any other supply contract in the project. The turbine OEM has enormous leverage — they're one of a handful of companies that can supply the core equipment, and switching OEMs mid-project is virtually impossible. This leverage manifests in:
- Standard terms heavily favoring the OEM
- Limited warranty scope and high LD caps
- Restrictive IP provisions that limit the developer's ability to inspect or modify
- Long lead times with limited schedule acceleration options

Negotiate the TSA with specialized legal counsel who has offshore/onshore wind experience. Generic construction lawyers will miss critical wind-specific clauses.

### Lesson 4: Red Book vs. Silver Book Matters Enormously

The choice between measurement-based (Red Book) and lump-sum (Silver Book) contracts has profound implications:

- **Red Book**: The developer pays for what's actually built. If quantities increase (e.g., more concrete needed due to poor ground), the developer pays more. The developer carries the quantity risk but gets the benefit if quantities are lower than estimated.
- **Silver Book**: The contractor is paid a fixed price regardless of actual quantities. The contractor carries the quantity risk but prices a premium for this uncertainty.

For well-defined scopes with reliable quantity estimates, Red Book typically delivers lower total cost. For scopes with high uncertainty (complex marine foundations, difficult access conditions), Silver Book provides certainty — at a price.

---

## The Honest Take

There is no "best" contract structure for wind farm projects. There is only the right structure for your specific combination of project characteristics, organizational capability, financing requirements, and risk appetite.

The projects that succeed are the ones where the contract structure was chosen deliberately — based on an honest assessment of the developer's capability and a clear understanding of the trade-offs — rather than defaulted to based on precedent or consultant recommendation.

If you're a first-time developer, start with EPC turnkey. Learn the business. Build your team. Then progressively move to more granular structures as your capability grows. If you're an experienced developer with a strong PM team, challenge yourself to take on more packages — the cost savings are real and compound across your portfolio.

Whatever structure you choose, invest heavily in the contract negotiation phase. The cost of good legal and commercial advice during contract negotiation is a rounding error compared to the cost of a poorly structured contract during construction.

---

**Disclaimer:** Views expressed are entirely our own and do not represent any employer, client, or organization. Data cited is from publicly available industry reports and professional experience.

**Sources:**
- FIDIC Conditions of Contract (Red, Yellow, Silver Books)
- GWEC Global Wind Report 2024
- BloombergNEF — Wind Market Outlook 2024
- Industry project experience (2020–2025)

*By Tam Tran & Duc Hoang, PMP | Tech Made Easy (techmadeeasy.info)*
