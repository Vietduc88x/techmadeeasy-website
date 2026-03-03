I've been in enough conference rooms and project kickoff meetings to know when a technology is being oversold. And right now, green hydrogen is in that dangerous zone where the hype is running about three laps ahead of the reality.

> Green hydrogen is a genuine piece of the decarbonization puzzle. But it is not the universal solution that certain lobbying groups, government slide decks, and overeager consultants are making it out to be.

Let me be clear -- I'm not anti-hydrogen. I've worked on renewable energy projects across the board, and I can see exactly where hydrogen fits. The problem is that too many people are trying to hammer a hydrogen-shaped peg into every hole in the energy transition, and that's going to waste time, money, and political capital we can't afford to lose.

Let me walk you through the honest reality, from someone who actually looks at project economics and construction feasibility for a living.

---

## The Hype Machine Is Running Hot

Open any energy conference agenda from the last two years. Hydrogen is everywhere. Government strategies, corporate net-zero pledges, glossy investor presentations -- everyone's talking about the "hydrogen economy."

And look, the ambition is real. Global electrolyzer capacity reached roughly 2.1 GW by mid-2025, with over 45 GW of projects announced (IEA Global Hydrogen Review 2025). The EU's REPowerEU plan calls for 10 million tonnes of domestic green hydrogen production by 2030. The US Inflation Reduction Act offers up to $3/kg in production tax credits through the 45V provision.

The policy signals are strong. The investment pipeline looks impressive on paper.

But here's what I've learned managing projects: announcements are not megawatts. Pipelines are not production. And a final investment decision is not a commissioned facility.

> Of those 45+ GW of announced electrolyzer projects globally, only a fraction have reached final investment decision. The gap between announcement and reality is enormous, and it should make anyone paying attention a little nervous.

---

## The Economics: Let's Talk Real Numbers

This is where the conversation gets uncomfortable for hydrogen boosters.

Green hydrogen -- produced by splitting water using renewable electricity through electrolysis -- currently costs between **$4 and $6 per kilogram** in most markets. Some optimistic projections cite $3/kg in the best solar-resource regions with cheap capital, but those are edge cases, not the norm.

Grey hydrogen -- the conventional kind, produced from natural gas via steam methane reforming -- costs roughly **$1 to $2 per kilogram** (BloombergNEF Hydrogen Outlook 2025).

That's a **3-4x cost premium** for the green version. And in project economics, a 3-4x cost premium is not a rounding error. It's a deal-killer in most competitive markets without heavy subsidies.

Now, costs will come down. BloombergNEF projects green hydrogen could reach $2/kg in optimal locations by 2030, driven by cheaper electrolyzers and lower renewable electricity costs. IRENA's Green Hydrogen Cost Report 2025 paints a similar trajectory, projecting sub-$2/kg costs in regions with excellent solar or wind resources by the early 2030s.

But "could" and "will" are different words. And even at $2/kg, green hydrogen still needs to compete with incumbents that have had decades of infrastructure and scale advantages baked in.

- Current green hydrogen production cost: **$4-6/kg** (IEA Global Hydrogen Review 2025)
- Grey hydrogen from natural gas: **$1-2/kg** (BloombergNEF 2025)
- Projected green hydrogen cost by 2030: **$2-3/kg** in best-case locations (IRENA 2025)
- Electrolyzer capital costs: **$500-1,400/kW** depending on technology and scale (BloombergNEF 2025)

---

## The Efficiency Problem No One Wants to Discuss

Here's the part that really bothers me as an engineer. The thermodynamics of hydrogen are brutal.

Start with electrolysis. Even with the best PEM or alkaline electrolyzers available today, you're looking at about **65-70% efficiency** in converting electricity to hydrogen. That means for every 100 units of renewable electricity you feed in, you get roughly 65-70 units worth of hydrogen energy out. The rest is lost as heat.

But it doesn't stop there.

Hydrogen is the lightest element in the universe, which sounds cool until you need to store and move it. Compression to 700 bar for transport eats another **10-15% of the energy content**. If you liquefy it instead (cooling to -253 degrees Celsius), you lose **25-35%** of the energy just in the liquefaction process. And then there are boil-off losses during storage and transport.

If you convert that hydrogen back to electricity through a fuel cell, you lose another **40-50%** in the reconversion.

Do the math on the full round-trip:

- Start with 100 kWh of renewable electricity
- Electrolysis: 65-70 kWh of hydrogen energy
- Compression/transport: ~55-60 kWh delivered
- Fuel cell reconversion: ~30-35 kWh of usable electricity

**You've lost roughly 65-70% of the energy you started with.** That's the round-trip efficiency of a hydrogen-based energy storage system.

Compare that to lithium-ion batteries at **85-90% round-trip efficiency**, and you start to see why hydrogen as an electricity storage medium is a tough sell for most applications.

> As a PM, when I see a process that wastes two-thirds of the input energy, my first question is always: "Is there a more direct path?" And for most energy applications, the answer is yes.

---

## Where Green Hydrogen Actually Makes Sense

Now here's where I put on my pragmatist hat. Despite everything I've said above, there are applications where hydrogen isn't just useful -- it's potentially irreplaceable. These are the sectors where direct electrification either can't work or doesn't make economic sense.

**Heavy Industry: Steel and Ammonia**

Steel production accounts for about 7% of global CO2 emissions. The traditional blast furnace process uses coal as both a fuel and a chemical reducing agent. You can't just plug in a battery and make steel. Green hydrogen can replace coal in direct reduced iron (DRI) processes, and projects like H2 Green Steel in Sweden and Salzgitter in Germany are proving this out at industrial scale.

Ammonia production -- essential for fertilizers that feed billions of people -- currently consumes about 1% of global energy and uses hydrogen from natural gas as a feedstock. Switching to green hydrogen here is a direct substitution. The chemistry demands hydrogen. There is no battery alternative.

**Long-Duration and Seasonal Energy Storage**

Batteries dominate short-duration storage -- 2 to 8 hours. They're cheaper, more efficient, and operationally simpler. But what about storing energy for weeks or months? What about seasonal storage -- capturing excess summer solar to use in winter?

This is where hydrogen's low round-trip efficiency matters less, because the alternative isn't batteries -- the alternative is curtailing renewable energy entirely. Underground hydrogen storage in salt caverns could provide massive, long-duration reserves that batteries simply can't match economically at those timescales.

**Maritime Shipping and Aviation**

Container ships can't run on batteries. The energy density just isn't there. A large container vessel needs fuel with roughly **40 times the energy density of current lithium-ion batteries** by weight. Hydrogen-derived fuels -- ammonia, methanol, or synthetic fuels -- are among the few realistic options for decarbonizing deep-sea shipping.

Aviation faces similar constraints. Sustainable aviation fuels produced via green hydrogen and captured CO2 (power-to-liquids) could eventually decarbonize long-haul flights where battery-electric aircraft can't reach.

**Industrial Heat Above 400 degrees Celsius**

Cement kilns, glass manufacturing, ceramics, petrochemical cracking -- these processes need temperatures that heat pumps and electric resistance heaters struggle to deliver economically at scale. Hydrogen combustion can hit those temperatures. It's not the only option (electric arc furnaces and concentrated solar thermal are contenders in some cases), but it's a strong one.

---

## Where Green Hydrogen Does NOT Make Sense

And this is where the hype gets dangerous, because real money and real policy decisions are being wasted on hydrogen applications where better alternatives already exist.

**Passenger Vehicles**

I'll say it plainly: hydrogen fuel cell passenger cars are a dead end.

An electric vehicle uses about **70-80% of the original electricity** to move the wheels. A hydrogen fuel cell vehicle uses roughly **25-30%** after accounting for electrolysis, compression, transport, and reconversion losses. EVs are about **3x more energy efficient** for personal transportation (IRENA 2025).

The charging infrastructure for EVs is already scaling globally. Hydrogen refueling stations cost $2-3 million each and there are barely 1,000 worldwide. The EV network has hundreds of thousands of charging points and growing daily.

Toyota and Hyundai deserve respect for the engineering, but the market has spoken. Global EV sales topped 17 million in 2024. Hydrogen fuel cell vehicle sales were in the low thousands.

**Home Heating**

Some gas utilities are pushing hydrogen blending into natural gas networks as a way to preserve their infrastructure and business model. I understand the motivation, but the physics don't support it.

Heat pumps deliver **3-4 units of heat for every 1 unit of electricity consumed** (coefficient of performance of 3-4). Burning hydrogen in a boiler gives you at best **0.9 units of heat per unit of hydrogen energy**, and that hydrogen cost you 30-35% of the original electricity just to produce.

Heat pumps are 5-6x more efficient than a green hydrogen boiler when you trace the energy back to the original renewable electricity source. The UK's Climate Change Committee, among others, has concluded that hydrogen for home heating is not cost-effective compared to heat pumps for the vast majority of buildings.

**Short-Duration Grid Storage**

For 1-8 hours of grid storage, lithium-ion batteries win on every metric: cost, efficiency, response time, proven track record. Battery storage costs have dropped to around $70/kWh (BloombergNEF 2025), and they deliver 85-90% round-trip efficiency.

Using hydrogen for short-duration storage would mean accepting 30-35% round-trip efficiency at a higher capital cost. It simply doesn't compute.

---

## The PM Perspective: Infrastructure and Execution Reality

Let me put on my project management hat for a moment, because the infrastructure challenges around hydrogen are something that doesn't get enough attention.

**Transport and Distribution**

Hydrogen embrittles standard carbon steel pipelines. You can't just pump hydrogen through existing natural gas infrastructure without significant modifications or replacements. New hydrogen-dedicated pipelines cost $1-4 million per kilometer depending on terrain and pressure requirements.

Trucking compressed hydrogen is viable but expensive -- you're essentially shipping mostly container weight, not fuel weight, because hydrogen is so light. A standard tube trailer carries only about 300-400 kg of hydrogen. Compare that to a gasoline tanker carrying 25,000 liters.

**Safety Considerations**

Hydrogen is not inherently more dangerous than natural gas or gasoline, but it behaves differently. It's invisible when burning. It has a wider flammability range (4-75% in air vs 5-15% for natural gas). It can leak through seals and joints that would contain other gases. It requires different detection systems, different materials, and different training.

None of these are showstoppers. Hydrogen has been safely handled in industrial settings for decades. But scaling from industrial to consumer-facing applications requires rigorous safety frameworks, updated building codes, trained workforces, and public acceptance -- all of which take time and investment.

**Regulatory Landscape**

The regulatory environment for green hydrogen is still maturing. Key questions remain unanswered in many jurisdictions:

- What counts as "green" hydrogen? The EU's Delegated Acts set strict additionality and temporal correlation requirements. The US 45V tax credit guidelines have gone through multiple revisions. Different definitions create market fragmentation.
- Certification and guarantees of origin for hydrogen are still being standardized globally.
- Permitting for hydrogen production, storage, and transport facilities varies enormously across regions and is often uncertain or slow.

> From a project execution standpoint, regulatory uncertainty is one of the biggest risks I see in hydrogen projects today. You can't commit billions to infrastructure when the rules might change mid-construction.

---

## The Balanced View: Part of the Answer, Not THE Answer

Here's my honest assessment, distilled from looking at this from a project reality perspective:

Green hydrogen will be essential for decarbonizing roughly **15-20% of global energy use** -- the sectors where direct electrification is impractical or impossible. Heavy industry, long-duration storage, maritime fuel, aviation, and high-temperature industrial processes genuinely need hydrogen or hydrogen-derived fuels.

But green hydrogen is not a universal solution. For the other 80% of our energy needs -- passenger transport, building heating, short-duration storage, most electricity generation -- we have better, cheaper, more efficient tools already: solar, wind, batteries, heat pumps, and EVs.

The danger is in overselling hydrogen and spreading limited capital and policy attention too thin. Every dollar spent subsidizing hydrogen for passenger cars or home heating is a dollar not spent scaling batteries, heat pumps, or grid infrastructure where those technologies deliver more decarbonization per dollar.

- Hydrogen's sweet spot: **hard-to-abate sectors** where no direct electrification path exists
- Electrification's domain: **everything that can be directly electrified** -- which is most things
- The right framing: **hydrogen as a targeted tool**, not a general-purpose fuel

The energy transition doesn't need a single hero technology. It needs an honest, clear-eyed portfolio approach where each technology is deployed where it performs best.

Green hydrogen deserves investment, R&D support, and strategic deployment in its sweet spots. What it doesn't deserve is the breathless, cure-all narrative that sets it up for a backlash when reality catches up with the hype.

That's the honest reality check. And I'd rather be honest now than disappointed later.

What are you seeing in your projects or markets? If you're working on hydrogen or competing technologies, I'd genuinely like to hear your perspective. The energy transition is too important for echo chambers.

---

**Disclaimer:** Views expressed are entirely my own and do not represent any employer, client, or organization.

**Sources:** IEA Global Hydrogen Review 2025, BloombergNEF Hydrogen Outlook 2025, IRENA Green Hydrogen Cost Report 2025, UK Climate Change Committee, EU Delegated Acts on Renewable Hydrogen.

*Duc Hoang, PMP | Tech Made Easy (techmadeeasy.info)*
