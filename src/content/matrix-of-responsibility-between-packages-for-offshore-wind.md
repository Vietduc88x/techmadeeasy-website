If I've learned one thing from managing multi-package offshore wind projects, it's this: the interfaces between work packages will cause more problems than the work packages themselves.

It sounds counterintuitive. You'd think the hard part is designing and manufacturing a 12 MW turbine, or fabricating 80-meter monopiles, or installing 200 km of subsea cable. And those are genuinely complex engineering challenges. But they're largely solved problems within their respective disciplines.

What's not solved — what goes wrong project after project — is the handover between packages. The moment when one contractor's scope ends and another's begins. That gray zone where responsibility is ambiguous, documentation is incomplete, and everyone assumes someone else is handling it.

> The biggest risk in multi-package offshore wind projects isn't technical. It's organizational. Interface management is where projects succeed or fail.

According to McKinsey's analysis of large infrastructure projects, 60–70% of schedule overruns are attributable to poor interface management and coordination failures — not technical challenges. In offshore wind, where a typical 500 MW project involves 5–8 major work packages and 15–25 contractual interfaces, this statistic should keep every project director up at night.

This article breaks down the typical package structure for offshore wind projects, the responsibility matrix that governs them, and the practical lessons from interface management in the field.

![Offshore Wind Farm](/images/offshore_wind.png)
*Offshore wind projects are massive multi-contractor operations — getting the interfaces right is everything*

---

## Why Multi-Package Is the Norm

Most offshore wind projects are too large and too specialized for a single EPC contractor to handle everything. The typical approach is to split the project into discrete work packages, each awarded to a contractor with specific expertise.

There are sound reasons for this:

- **Specialization**: A cable manufacturer doesn't build turbines. A turbine OEM doesn't fabricate foundations. Each discipline requires deep technical expertise and purpose-built facilities.
- **Risk allocation**: Multi-package structures allow the project owner to allocate risks to the parties best positioned to manage them.
- **Cost competition**: Splitting packages creates competitive tension in procurement, often delivering lower total costs than a single EPC award.
- **Supply chain access**: Some components (like subsea cables or large monopiles) have limited global suppliers. Direct contracting gives the project owner better access and leverage.

But multi-package structures also create complexity. More contractors mean more interfaces, more coordination, and more potential for gaps and overlaps. Managing this complexity is the project owner's primary responsibility — and it requires a robust responsibility matrix.

---

## The Typical Package Structure

### Package 1: Wind Turbine Generator (WTG) Supply

**Scope**: Design, manufacture, testing, and supply of complete wind turbine generators — including nacelle, hub, blades, tower sections, and turbine control systems.

**Typical contract value**: 40–55% of total CAPEX (for a 500 MW project, this is $800M–$1.5B)

**Key interfaces**:
- Foundation design loads → WTG loads document defines the structural requirements the foundation must meet
- Tower-to-foundation connection → Transition piece or flange interface is a critical design coordination point
- SCADA system integration → WTG control system must interface with the project-wide SCADA/monitoring system
- Installation vessel specifications → WTG component weights and dimensions drive vessel selection

**Common issues**: Late delivery of WTG loads documents is one of the most frequent causes of foundation design delays. The WTG supplier finalizes structural loads through iterative analysis, and delays cascade directly into foundation design, fabrication, and ultimately installation schedules.

### Package 2: WTG Foundations

**Scope**: Design, fabrication, coating, load-out, and transportation of foundation structures (monopiles, jackets, or pile caps) and transition pieces.

**Typical contract value**: 10–18% of total CAPEX

**Key interfaces**:
- WTG loads → Must receive certified loads document from WTG supplier before final design
- Geotechnical data → Foundation design depends directly on soil investigation results
- Transport & Installation → Foundation dimensions and weights must match T&I vessel capabilities
- Cable entry points → J-tube or cable hang-off locations must coordinate with cable contractor

### Package 3: Offshore Substation (OSS)

**Scope**: Design, fabrication, and supply of the offshore substation platform — including electrical equipment (transformers, switchgear), structural steelwork, and platform topsides.

**Typical contract value**: 5–10% of total CAPEX

**Key interfaces**:
- Array cable terminations → Cable contractor must coordinate termination design with OSS electrical layout
- Export cable connection → Export cable contractor interfaces at the OSS cable deck
- Foundation → OSS foundation (usually a jacket or monopile) must support the topsides weight and environmental loads
- SCADA → Central control and monitoring system integration

### Package 4: Subsea Cables (Array and Export)

**Scope**: Design, manufacture, testing, and supply of inter-array cables (connecting turbines to the offshore substation) and export cables (connecting the OSS to the onshore grid connection point).

**Typical contract value**: 8–15% of total CAPEX

**Key interfaces**:
- Cable route → Depends on turbine layout, OSS location, and geophysical/geotechnical survey data
- Foundation J-tubes → Cable entry points at each foundation must match cable specifications
- Onshore cable landfall → Marine-to-land transition zone requires coordination with onshore contractor
- Cable burial tool → Burial specifications depend on soil conditions along the cable route

**Common issues**: Cable manufacturing has long lead times (12–24 months), and only a handful of companies globally can produce high-voltage subsea cables. Late specification changes — even minor ones like cable length adjustments due to layout optimization — can cause disproportionate schedule impacts.

### Package 5: Onshore Substation and Grid Connection

**Scope**: Design and construction of the onshore substation, HV cable route from landfall to substation, grid connection works, and metering systems.

**Typical contract value**: 5–10% of total CAPEX

**Key interfaces**:
- Export cable landfall → Coordination with offshore cable contractor on transition joint design
- Grid operator → Technical requirements, protection settings, and connection agreement compliance
- Metering → Revenue metering design must meet grid operator and regulatory requirements

### Package 6: Transport and Installation (T&I)

**Scope**: Marine transportation of all offshore components (foundations, WTGs, cables) and installation at site using specialized vessels.

**Typical contract value**: 10–20% of total CAPEX

**Key interfaces**:
- All supply packages → T&I must receive components in the right sequence, at the right port, with lifting attachments and sea-fastening provisions in place
- Port/marshaling area → Requires suitable quayside capacity, storage areas, and load-out facilities
- Weather windows → Installation schedule must align with seasonal metocean conditions
- Marine coordination → Vessel traffic management, guard vessel requirements, and safety zone compliance

**Common issues**: T&I is where all the upstream interfaces converge. A delayed foundation delivery, a late WTG component, or a cable manufacturing issue — all of these hit the T&I schedule. And with installation vessels costing $150–500K per day, every day of delay is extremely expensive.

---

## The RACI Matrix: Making It Work

The RACI matrix (Responsible, Accountable, Consulted, Informed) is the standard tool for defining who does what across packages. For offshore wind, we extend this to RASCI-V to capture additional roles:

| Role | Definition | Example |
|------|-----------|---------|
| **R** — Responsible | Performs the work | BOP contractor designs the foundation |
| **A** — Accountable | Owns the outcome and final approval | Project owner approves the design |
| **S** — Support | Provides resources or assistance | OE reviews design calculations |
| **C** — Consult | Provides input before the action | WTG supplier provides loads for foundation design |
| **I** — Inform | Notified after the action | Grid operator informed of construction progress |
| **V** — Validate | Checks and approves the deliverable | Independent verification body certifies the design |

### Sample RACI Matrix: Foundation-WTG Interface

| Activity | WTG Supplier | Foundation Contractor | T&I Contractor | Owner | Owner's Engineer |
|----------|-------------|----------------------|----------------|-------|-----------------|
| WTG loads document | R, A | I | I | I | V |
| Foundation design | C | R, A | C | I | V |
| Transition piece design | C | R | C | A | V |
| Tower-foundation interface specification | R | C | I | A | V |
| Foundation fabrication QA/QC | I | R, A | I | I | V |
| Foundation load-out | I | R | C | A | S |
| Foundation installation | I | S | R, A | I | V |
| Turbine installation | R | S | R | A | V |
| Mechanical completion walk-down | R | R | R | A | R |

### Sample RACI Matrix: Cable-Foundation Interface

| Activity | Cable Supplier | Foundation Contractor | T&I Contractor | Owner | Owner's Engineer |
|----------|---------------|----------------------|----------------|-------|-----------------|
| Cable specification | R, A | C | I | I | V |
| J-tube design | C | R, A | C | I | V |
| Cable pull-in specification | R | C | R | A | V |
| Cable termination design | R, A | I | I | I | V |
| Cable laying | R | I | S | A | V |
| Cable pull-in & hang-off | S | I | R, A | I | V |
| Cable termination & testing | R, A | I | I | I | V |

---

## Work Categories: Breaking Down the Matrix

The RACI matrix becomes actionable when organized by work category. Each interface point involves multiple work categories:

### Design
- Engineering calculations and analysis
- Detailed design drawings and specifications
- Interface design documents (e.g., tower-foundation connection detail)
- Design verification and certification

### Supply (Procurement & Manufacturing)
- Material procurement and supplier qualification
- Component manufacturing and quality control
- Factory acceptance testing (FAT)
- Packaging, preservation, and marking

### Loading & Transport
- Load-out from fabrication yard to vessel/barge
- Sea-fastening design and execution
- Marine transportation to installation port or site
- Offloading and storage at marshaling port

### Installation
- Pre-installation surveys and seabed preparation
- Foundation installation (piling, grouting)
- Component installation (turbine erection, cable laying)
- Installation QA/QC and as-built surveys

### Testing & Commissioning
- Pre-commissioning checks and mechanical completion
- Electrical testing and energization
- Performance testing and optimization
- Handover documentation and certificate issuance

---

## Lessons from Interface Failures

### Lesson 1: The Loads Document Delay

On one project, the WTG supplier's loads document was delivered 4 months late due to iterative design changes in the turbine control system. The foundation contractor couldn't finalize their design without certified loads. Result: foundation fabrication started 3 months late, compressing the installation window and forcing the project to install foundations during a marginal weather period. Additional cost: approximately $15M in weather standby and schedule acceleration.

**Mitigation**: Negotiate a preliminary loads document (with conservative assumptions) in the WTG supply contract, issued at contract signing. This allows foundation design to proceed in parallel, with a design update when the certified loads are finalized.

### Lesson 2: The J-Tube Misalignment

Cable pull-in failed on 12 turbine foundations because the J-tube entry angle didn't match the cable contractor's pull-in specifications. The foundation contractor had designed the J-tubes based on a generic specification, while the cable contractor's actual equipment required a specific bend radius. Neither party had flagged the mismatch during design coordination.

**Mitigation**: Establish a formal interface register with mandatory design review meetings at key milestones. The interface register should list every physical and functional interface between packages, with a named responsible person on each side.

### Lesson 3: The Port Bottleneck

Three contractors needed simultaneous access to the marshaling port — foundations for load-out, WTG components for storage, and the T&I contractor for vessel berthing. The port had capacity for two simultaneous operations, not three. The conflict wasn't identified until 8 weeks before the installation campaign, forcing an expensive rescheduling exercise.

**Mitigation**: Include port and logistics interfaces in the RACI matrix. Assign the project owner (or their logistics coordinator) as accountable for port scheduling, with all contractors as consulted parties.

### Lesson 4: The Commissioning Sequence Conflict

The WTG supplier required energized array cables for turbine commissioning. The cable contractor required completed foundation grouting before cable pull-in. The foundation contractor couldn't complete grouting until the scour protection was installed. Each contractor was technically correct within their own scope — but the combined sequence created a circular dependency that took 6 weeks to resolve.

**Mitigation**: Develop an integrated commissioning sequence that maps dependencies across all packages before the installation phase begins. Test the sequence logic with all contractors at the table.

---

## The Employer's Role: More Than Just Watching

The project owner — the "Employer" in FIDIC contract terminology — has the most critical role in a multi-package structure. This isn't just about signing contracts and approving invoices. The Employer (directly or through their Owner's Engineer) must:

1. **Own the interface register**: Maintain a comprehensive register of all inter-package interfaces, updated continuously throughout the project
2. **Chair interface meetings**: Regular (monthly minimum) coordination meetings with all contractors present — not bilateral meetings that miss cross-cutting issues
3. **Manage the master schedule**: Integrate individual contractor schedules into a single project master schedule, with interface milestones clearly defined and tracked
4. **Resolve disputes promptly**: Interface disputes that aren't resolved quickly compound. The Employer must have the authority and willingness to make decisions when contractors disagree
5. **Control design changes**: Any design change that affects an interface must go through a formal change management process involving all affected parties

> **Honest reality check:** I've seen projects where the Employer tried to manage a 7-package structure with a team of 5 people and no Owner's Engineer. It didn't work. Multi-package offshore wind projects need a dedicated interface management function — typically 3–5 experienced engineers whose sole job is tracking and resolving interface issues. The cost of this function is a rounding error compared to the cost of interface failures.

![Project Strategy](/images/project_strategy_board.jpg)
*Interface management requires systematic tracking — every handover point between packages must be documented and managed*

---

## The Honest Take

Multi-package contracting is the dominant model for large-scale offshore wind projects, and for good reason. It leverages specialist expertise, creates procurement competition, and allows sophisticated risk allocation.

But it only works if the interfaces are managed rigorously. The RACI matrix isn't a bureaucratic exercise — it's the operational blueprint that prevents the kind of coordination failures that turn a well-planned project into a schedule and cost disaster.

The projects that get interface management right share common traits: a well-staffed owner's team, a comprehensive interface register maintained as a living document, regular multi-party coordination meetings, and — most importantly — a culture where raising interface concerns is encouraged rather than punished.

If you're involved in offshore wind project management, my strongest recommendation is this: **invest in interface management early, resource it properly, and never treat the RACI matrix as a one-time exercise.** It's a living document that evolves with the project — and it's your best defense against the coordination failures that kill schedules and budgets.

---

**Disclaimer:** Views expressed are entirely our own and do not represent any employer, client, or organization. Data cited is from publicly available industry reports and professional experience.

**Sources:**
- McKinsey & Company — "Delivering Large-Scale Infrastructure Projects On Time" (2023)
- FIDIC Conditions of Contract for Plant and Design-Build (Silver Book)
- DNV-SE-0073 (Project Certification of Wind Power Plants)
- GWEC Global Wind Report 2024
- Industry project experience (2020–2025)

*By Duc Hoang, PMP | Tech Made Easy (techmadeeasy.info)*
