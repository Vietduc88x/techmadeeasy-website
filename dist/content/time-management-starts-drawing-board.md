I've sat in enough recovery meetings to know how the script goes.

The schedule is red. The client is furious. Everyone gathers in a room, and someone asks: *"How do we get back on track?"*

The team proposes acceleration. More crews. Weekend shifts. Overtime premiums. The scheduler runs scenarios in Primavera, presents three options, and everyone leaves feeling productive.

I've been that scheduler. I've been that project manager. And I'll be honest — it took me years to realize that most of those recovery meetings were solving the wrong problem.

The real problem happened months earlier. On the drawing board.

> **"Time management starts on the drawing board with the conceptual design. If the design is not time-effective, no procurement strategy will rescue it."**
>
> — CIOB Guide to Good Practice, Principle 1.1.10

This single sentence, buried in a 176-page technical guide by the Chartered Institute of Building, might be the most consequential — and most ignored — principle in our industry.

It means the person who decided how the project would be shaped and zoned — the architect, the concept designer, the layout engineer — **that person effectively wrote the schedule.** The planner who came later just translated those design decisions into bars and logic links.

![Sequential vs Parallel Planning](/images/time_meme_3_drawing_board.png)
*Bad planning creates sequential chains where one delay kills the whole project. Good planning creates parallel paths where delays stay local.*

---

## Two Solar Farms That Changed How I Think

Let me tell you about the moment this principle became real for me.

**Project A** was a 200 MW solar plant designed as a single contiguous array with one central inverter station and shared civil infrastructure. Clean layout. Efficient cable routing. Looks great on the single-line diagram.

But here's what that design meant for construction: site clearing had to proceed as one continuous operation across 400+ hectares. Pile driving followed a single front. Tracker installation followed the same linear path. Module mounting waited for structures. DC cabling followed behind modules. Every phase was gate-kept by the previous one — across the ENTIRE site.

When we got a three-week delay on civil works due to unexpected ground conditions in the southern zone, I watched it ripple through the entire schedule like dominoes. Cable trenching delayed three weeks. Inverter installation delayed three weeks. Grid connection pushed back. The whole project slipped — not because of bad scheduling, but because the design gave us no alternative path.

**Project B** was a similar-sized plant, but the layout had been designed as **four independent 50 MW blocks**, each with its own inverter station, cable routes, and MV connection to a central collector substation. When we hit the same ground condition issue in Block 3, the other three blocks kept moving. Block 1 was already being energized while Block 3 was still resolving its civil works.

**Same capacity. Same site. Same technology. Fundamentally different schedule risk.**

That was when I started to see it: **the layout IS the schedule.** Everything else is just administration.

No amount of Primavera expertise or recovery planning can transform a single-block design into a multi-block design after the piles are in the ground. That ship has sailed. It sailed on the drawing board.

---

## Wind Farms: Where the Stakes Are Even Higher

Solar taught me the principle. Wind made it impossible to ignore.

**The sequential trap in wind:** When the crane pad layout creates access dependencies between turbine positions, ALL foundations must be poured and cured before ANY turbine erection can begin. The result? You're sitting idle with a $200,000/day crane while waiting for concrete to cure on the last foundation. I've seen this happen. It's painful.

**The parallel advantage in wind:** A well-designed wind farm layout allows foundation work and turbine erection to overlap across different clusters. While foundations are being poured in the northern cluster, turbines are being erected in the southern cluster where foundations cured weeks ago. The access roads are designed so the crane can move between zones without crossing active foundation work.

On one nearshore wind project I worked on, the design team separated the turbine positions into three independent installation zones with separate marine access routes. When we faced a two-week vessel delay affecting Zone 2, Zones 1 and 3 continued installation. The overall project impact was five days, not two weeks.

> **Same delay. Different design. Different outcome.** That's not scheduling skill — that's design intelligence.

On another project, the layout forced a single installation sequence due to cable route dependencies between turbines. One foundation delay in the middle of the sequence stopped everything downstream. We spent weeks in recovery meetings trying to find solutions. There were none. The design had locked us in.

---

## BESS Projects: A Lesson in Modular Thinking

You might think battery storage is immune to this problem. After all, BESS projects naturally lend themselves to parallel construction because of their modular architecture. Each BESS container or rack is essentially an independent unit with its own BMS, thermal management, and DC connection.

But even here, I've seen the sequential trap emerge. On one project, the civil works design placed all BESS containers along a single access road with a shared drainage system. The drainage had to be complete before any container could be placed. A two-week delay on drainage meant every single container placement was pushed back.

On a better-designed project, the BESS yard was split into four quadrants, each with independent drainage, access, and MV connection. When one quadrant had a civil delay, the other three proceeded to container placement and energization.

The principle is universal: **any technology can be designed sequentially or in parallel.** The layout decides which one you get.

So what does this look like mathematically? Let's put numbers on it.

---

## Sequential vs Parallel: What the Numbers Actually Show

![Critical Path Density](/images/time_critical_path_density.png)
*In a sequential design, nearly 100% of activities are critical. In a parallel design, only ~15% are. That 85% difference is your schedule's shock absorber.*

### The Sequential Trap

In a sequential solar farm design, activities form a single chain:

**Site Prep → Piling → Structure → Modules → DC Cabling → Inverter → MV Cable → Grid Connection**

The critical path runs straight through every activity. Total float is zero. When a three-week delay hits piling:

- Structure installation: delayed 3 weeks
- Module mounting: delayed 3 weeks
- DC cabling: delayed 3 weeks
- Grid connection: delayed 3 weeks
- **Project completion: delayed 3 weeks. No negotiation.**

### The Parallel Advantage

In a multi-block design, after site preparation, work splits into independent paths:

- **Block A:** Piling → Structure → Modules → Cabling → Inverter A
- **Block B:** Piling → Structure → Modules → Cabling → Inverter B
- **Block C:** Piling → Structure → Modules → Cabling → Inverter C

All blocks merge at **MV Collection → Grid Connection.**

The same three-week piling delay in Block B? Blocks A and C don't even notice. When the paths merge at the collector substation, the project delay depends on whether Block B was actually the longest path.

### The Math Behind It

Industry benchmarks suggest that in a well-structured schedule at medium density, approximately **15% of activities should be on the critical path**. That means 85% have float — they can absorb delays without affecting the completion date.

In a single-block sequential design? Nearly **100% of activities are critical**. There is only one path. The schedule has zero resilience.

That difference — 15% versus 100% critical — is not created by the scheduler. **It's created by the designer.**

---

## The Five Levels of Time-Aware Design

![Five Levels of Time-Aware Design](/images/time_five_levels.png)
*Most renewable energy projects operate at Level 1 or 2. The industry needs to get to Level 4 or 5.*

Based on CIOB principles and what I've observed across solar, wind, and BESS projects, here's a framework I use to evaluate how "time-aware" a design really is:

### Level 1: Time-Blind

The layout engineer gave zero thought to construction sequence. The solar farm is one giant contiguous array. The wind farm has one installation path. The planner receives the layout and discovers every activity is on the critical path. The first delay request hits at month 3. The recovery meeting is called at month 4. Sound familiar?

### Level 2: Acknowledged, Not Addressed

The development team knows buildability matters but treats it as the EPC contractor's problem. *"We design the layout for maximum yield; they figure out how to build it."* The contractor's tender schedule comes back 4 months longer than the PPA milestone requires. Everyone panics.

### Level 3: Reviewed Too Late

A constructability review happens — but only after the layout is frozen for permitting. The reviewer identifies that the cable route design forces sequential installation. But changing it now means re-filing environmental permits. The report gathers dust. The project proceeds with the original sequence.

### Level 4: Designed for Parallel Construction

Construction sequencing is a layout criterion from concept stage. The solar farm is divided into independent blocks with separate inverter stations. The wind farm clusters have independent access and cable routes. The BESS yard is split into quadrants. When a delay occurs, the PM actually has options — re-sequencing, shifting resources between blocks, or just absorbing it.

### Level 5: Integrated Time-Model

The layout evolves alongside a dynamic 4D schedule model. Design changes are tested against the schedule in real time. Layout engineer, electrical designer, civil engineer, and planner collaborate from FEED. The team can answer "What happens to our COD if we change the Block C cable route?" within hours.

Most projects I've worked on operate at Level 1 or 2. Some reach Level 3. Very few reach Level 4. Level 5 is where the industry needs to be, but almost nobody is there yet.

---

## Float: The Most Misunderstood Concept in Renewable Energy Projects

![Float Concept](/images/time_float_concept.png)
*Float is not a gift from the planner. It's a structural feature of good design. Sequential designs have zero float. Parallel designs create it naturally.*

Let me be blunt about something I've seen go wrong repeatedly on solar and wind projects: **float is not your safety net.**

The CIOB is unambiguous. Float is not a substitute for contingency planning. It's not spare time that "belongs" to anyone. It's a mathematical artefact — a byproduct of parallel paths.

Here's what most people miss:

- In a **single-block solar farm**, float barely exists. One construction front. Zero slack.
- In a **multi-block solar farm**, float appears naturally. Not because the planner added buffers, but because the layout created independent paths.

**A planner cannot manufacture float in a sequential layout.** Only the layout designer can create the conditions for float to exist.

I've watched project managers burn through float in the first two months of a wind farm construction, treating it like a contingency account. Then when a crane breakdown hits at month six, there's nothing left. The CIOB warns specifically:

> *"Contingencies should be preserved as long as possible consistent with the current risk appraisal. If contingencies are absorbed in the early stages of a project, the likelihood of completion on time will be reduced."*

Spend it carelessly and you've effectively converted a parallel schedule back into a sequential one — with all the fragility that comes with it.

---

## The Buildability Review Nobody Wants to Have

The CIOB defines the buildability review as a formal assessment before construction, designed to answer one question:

> **Can this actually be built in the time available, with the resources available, in the sequence the design implies?**

For renewable energy projects, this means asking:
- Does the solar farm layout allow independent block construction, or does the cable routing force a sequential build?
- Can wind turbine foundations and erection overlap, or do access road dependencies prevent it?
- Is the BESS yard designed with independent quadrants, or does shared infrastructure create bottlenecks?
- Are there physical constraints (wetlands, cultural heritage zones, terrain) that force sequential working?
- Are the required specialized resources (piling rigs, cable jointing crews, HV commissioning teams) available when the schedule demands them?

This review should happen **before EPC tender** — ideally at the end of FEED. Once the EPC contract is signed with a fixed layout, the design is frozen and the schedule is contractual. The opportunities for re-sequencing have evaporated.

As the CIOB states:

> *"During the early stages of every project there are many alternative sequences that can be pursued. However, those options reduce as the project proceeds and it is unusual to find a project with many opportunities for re-sequencing in the later stages."*

Every week you delay the constructability review, you lose options. By the time you're mobilizing on site, you're locked in.

---

## The Industry's Uncomfortable Truth

![CIOB Survey Statistics](/images/time_survey_stats.png)
*The CIOB's industry-wide survey covered thousands of projects. The results should keep every project director awake at night.*

Think about that. We have sophisticated scheduling software. We have Monte Carlo simulations. We have earned value dashboards. And yet the overwhelming majority of practitioners surveyed say **time management training and education are inadequate.**

This is not a technology gap. It's a knowledge and culture gap. Layout designers are not trained to think about construction time. Planners are brought in too late to influence design. And project managers are left trying to recover time that was given away before they were even hired.

In renewable energy, I see this pattern constantly. The development team optimizes the layout for energy yield and land use — which makes sense. But nobody asks: "What does this layout mean for construction sequence?" The EPC contractor receives a frozen layout and builds the best schedule they can. When delays hit, everyone blames the contractor. But the constraint was baked into the layout from the start.

> *"Schedules, if used at all, are used only as a target against which failure to succeed can be reported."* — CIOB

Does that sound like any project you've been on?

---

## Your Schedule Is Not a Bar Chart — And Why It Matters

The CIOB deliberately avoids the word "programme" and uses "schedule" instead. This isn't semantics. A "programme" in construction is usually a printed bar chart pinned to the site office wall, updated rarely, showing target dates but no logic. It can't predict consequences of change. It can't identify the critical path. It's a poster, not a tool.

A proper schedule is a **dynamic, logic-linked time-model** that:
- Contains engineering logic, resource logic, and zonal logic
- Reacts to change when you update actual progress
- Identifies the critical path mathematically
- Functions as a prediction engine, not a recording device

On one solar project, we used the schedule as a real time-model. When a module delivery delay was announced, we ran the scenario within hours, identified that it only affected Block 2, shifted the Block 2 crew to accelerate Block 4, and maintained the overall COD. That's only possible when the schedule is a living model AND the layout allows parallel paths.

On another project, the "schedule" was an Excel bar chart. When a similar delay hit, nobody could tell which activities were affected downstream. We spent two weeks figuring out the impact manually. By then, the recovery window had closed.

> *"Progress monitoring without rescheduling the critical path should not be adopted as the sole method of managing time in a complex project."* — CIOB

Earned value tells you that you're behind. It doesn't tell you which activities are causing it, whether they're on the critical path, or what happens downstream. Only a living schedule can do that.

---

## Five Schedule Types — Most Projects Only Have One

![Five Schedule Types](/images/time_five_schedules.png)
*Based on CIOB principles and industry practice, five distinct schedule types should exist across a project's lifecycle. Most renewable energy projects only produce one — the Tender Schedule.*

| Schedule | Owner | When | Renewable Energy Example |
|----------|-------|------|--------------------------|
| **Development** | Developer | Pre-tender | Land acquisition milestones, permit timeline, grid connection dates, FEED schedule |
| **Tender** | EPC Contractor | Tender | First construction-level schedule with major milestones |
| **Working** | EPC Contractor | Construction | Resource-loaded, high density for next 3 months, crew allocation per block |
| **Commissioning** | Developer/Owner | Pre-COD | Testing sequences, grid compliance, PPA milestones, regulatory inspections |
| **As-Built** | EPC Contractor | Post-COD | Actual construction sequence, productivity rates, lessons learned |

Most renewable energy projects produce only the Tender Schedule and treat it as everything — working schedule, baseline, and delay analysis reference. The Development Schedule, which should inform the layout-time relationship, is rarely produced with any rigour. And the As-Built Schedule, which should provide productivity benchmarks for the next project, is almost never completed.

I've worked on a portfolio of solar projects where the second and third projects were significantly faster than the first — not because of better scheduling, but because we finally had As-Built data to plan from. Imagine if every project had that.

---

## Change Will Happen. That's Not the Question.

The CIOB says something that should be printed on every project charter:

> *"A shift in timing is almost certain to occur as a result of the maturation of one or more foreseeable risks into an intervening event at some time during the life of the project. On a complex project it is indefensible to proceed on the basis that an intervening event will not occur."*

Read that again. **It is indefensible to assume nothing will go wrong.**

On renewable energy projects, the list of things that WILL go wrong is long and familiar:
- Module/turbine delivery delays (shipping, customs, manufacturing)
- Ground conditions different from geotech report
- Weather windows missed (especially for offshore/nearshore wind)
- Grid connection delays from the utility side
- Permit conditions discovered late
- Crane breakdowns on wind projects
- Cable jointing failures requiring rework
- BESS container delivery and BMS integration issues

These are not black swan events. They happen on every project. The only question is: **how resilient is your schedule when they do?**

A single-block layout gives you zero resilience. A multi-block layout gives you absorption capacity. The choice between them is made on the drawing board — and it's irreversible once construction begins.

---

## What I'd Tell My Younger Self

If I could go back to the beginning of my career and give myself one piece of advice about time management, it wouldn't be "learn Primavera better" or "take an earned value course."

It would be: **get involved in design.**

The most valuable thing a planner or project manager can do is sit in the layout optimization meetings from day one and ask one simple question: *"If we get a three-week delay on any single element, how many other activities are affected?"*

If the answer is "everything" — the layout needs rethinking.

### If You're the Developer

1. **Put constructability in the layout brief.** Don't just optimize for yield — specify that the layout must enable parallel construction blocks.
2. **Hire a construction planner at FEED stage.** Not EPC stage. The planner should advise on layout from day one.
3. **Commission a constructability review before EPC tender.** Not after.
4. **Require a planning method statement** with every schedule — documenting the "why" behind every sequencing decision.

### If You're the Layout Designer

1. **Think in blocks, not sites.** Design for independent construction blocks that can proceed in parallel.
2. **Separate high-risk areas.** Challenging terrain? Long cable runs? Complex grid interface? Isolate them so delays stay local.
3. **Ask the three-week question.** For every major layout decision, ask what happens to the schedule if that element is delayed by three weeks.

### If You're the Planner

1. **Push for design influence.** Your most valuable contribution isn't the Gantt chart — it's showing the development team how their layout decisions affect the critical path.
2. **Model alternatives.** Present two or three block strategies for the same layout and let the client see the risk difference.
3. **Use three schedule densities simultaneously** — low density for strategic planning (9+ months), medium for tactical (3-9 months), high for operational (within 3 months).
4. **Never use negative lags.** The CIOB says clearly: *"Negative lag is a logic which is impossible to perform and should never be used because it can falsify criticality."*

### If You're the EPC Contractor

1. **Challenge the layout at tender.** If it forces a sequential build, price the risk — or propose layout modifications that enable parallel working.
2. **Preserve contingencies.** Don't burn float in the first two months.
3. **Keep the schedule alive.** Update it with actual progress, re-run the critical path, communicate proactively. A schedule that isn't updated is a historical document, not a management tool.

---

## The Bottom Line

The renewable energy industry has spent years investing in better scheduling software, more sophisticated delay analysis, and increasingly elaborate recovery programmes. These are valuable. But they're all downstream interventions — attempts to manage consequences of decisions made months earlier, on the drawing board.

The CIOB guide represents a shift in thinking that our industry still hasn't fully absorbed: **time management is not a construction-stage activity. It's a design-stage activity.**

The layout designer who creates independent construction blocks is doing more for the schedule than any recovery plan ever could. The developer who commissions a constructability review before EPC tender is saving more time than any acceleration package. The planner who advises on layout alternatives at FEED stage is worth ten planners producing bar charts during construction.

I've learned this the hard way, through projects where the layout locked us into sequences we couldn't escape, and through projects where good design gave us the breathing room to absorb the unexpected.

The scheduler cannot fix what the architect broke.

Design for time. Or pay for it later.

---

## Key Takeaways

- **Principle 1.1.10:** If the design is not time-effective, no procurement strategy will rescue it
- **Single-block layouts** create sequential schedules where one delay cascades through everything
- **Multi-block layouts** create parallel paths where delays can be absorbed
- **Constructability reviews** must happen before EPC tender — not after
- **Float** is a byproduct of parallel design — planners cannot manufacture it in sequential layouts
- The **overwhelming majority** of industry professionals rate time management education as inadequate
- The schedule must function as a **dynamic time-model**, not a static bar chart
- **Five schedule types** should exist across a project's lifecycle — most projects only produce one
- Delays are not exceptional. They happen on every project. **Design for resilience.**

---

What's your experience? Have you worked on a project where the layout locked you into a sequential build — or one where parallel design saved you? I'm genuinely curious to hear from others managing solar, wind, and BESS projects day-to-day. Tell me what you're seeing in the field.

---

**Disclaimer:** Views expressed are entirely my own and do not represent any employer, client, or organization.

**Source:** This article draws from the **CIOB Guide to Good Practice in the Management of Time in Complex Projects** by the Chartered Institute of Building (Wiley-Blackwell, 1st edition 2011, 2nd edition 2018 retitled *Dynamic Time Modelling*), developed from an extensive industry-wide survey covering thousands of projects. It remains the most comprehensive industry standard for time management in construction.

*Duc Hoang, PMP | Tech Made Easy (techmadeeasy.info)*
