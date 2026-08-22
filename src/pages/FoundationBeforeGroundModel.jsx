import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Check,
  CircleDot,
  ClipboardCheck,
  Layers3,
  RotateCcw,
  SearchCheck,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArticleHeader } from '@/components/article/ArticleHeader';
import {
  baselineFoundationEvidence,
  evaluateFoundationEvidence,
  foundationEvidenceGates,
} from '@/data/foundationGroundModel';

const maturityRows = [
  ['Problem framing', 'Site context and design question', 'Define what the investigation must resolve', 'Selecting a preferred foundation'],
  ['Option screening', 'Context plus an explicit design question', 'Compare plausible families and carry ranges', 'Freezing quantities, method or price'],
  ['Conditional concept', 'Targeted field data and interpreted ground model', 'Develop against named assumptions and sensitivities', 'Treating an assumption as verified fact'],
  ['Engineering design review', 'Variability addressed and stage review recorded', 'Challenge the evidence, calculations and controls', 'Calling the concept approved before formal acceptance'],
];

const reviewQuestions = [
  ['What decision must the ground model support?', 'Name the structure, load envelope, performance criterion and date of the decision.'],
  ['What is observed, interpreted and assumed?', 'Keep those three evidence classes visually separate in the ground model and review record.'],
  ['Where could the model be wrong?', 'Show groundwater ranges, variable strata, obstructions, geohazards and areas outside the investigation coverage.'],
  ['What changes the foundation concept?', 'Predefine the result, threshold or field observation that triggers redesign, more investigation or a stop.'],
  ['What has the schedule and estimate assumed?', 'Trace the concept into quantities, plant, testing, permits, access and procurement lead times.'],
  ['Who owns the next evidence release?', 'Record the accountable person, acceptance evidence, required date and response if late.'],
];

function GroundSection({ evidence }) {
  const hasField = evidence.fieldEvidence;
  const interpreted = evidence.labInterpretation;
  const uncertainty = evidence.variability;
  return (
    <svg viewBox="0 0 760 390" role="img" aria-labelledby="ground-title ground-desc" className="h-auto w-full">
      <title id="ground-title">Conceptual ground evidence section</title>
      <desc id="ground-desc">A composite section showing how site observations, field investigation, interpretation and uncertainty progressively make the ground model usable for design review.</desc>
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#dbeafe"/><stop offset="1" stopColor="#f8fafc"/></linearGradient>
        <pattern id="unknown" width="22" height="22" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><line x1="0" y1="0" x2="0" y2="22" stroke="#f59e0b" strokeWidth="5" opacity=".18"/></pattern>
      </defs>
      <rect width="760" height="390" rx="24" fill="url(#sky)"/>
      <path d="M0 110 C150 88 250 124 390 104 C520 86 640 115 760 92 L760 390 L0 390 Z" fill="#a8a29e"/>
      <path d="M0 180 C180 155 290 205 460 175 C590 152 680 170 760 160 L760 390 L0 390 Z" fill={interpreted ? '#c7a46a' : '#b9a88d'} opacity=".98"/>
      <path d="M0 285 C170 255 330 310 500 278 C620 255 700 270 760 262 L760 390 L0 390 Z" fill={interpreted ? '#64748b' : '#7c7f83'}/>
      {interpreted && <><path d="M0 180 C180 155 290 205 460 175 C590 152 680 170 760 160" fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="8 7"/><path d="M0 285 C170 255 330 310 500 278 C620 255 700 270 760 262" fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="8 7"/></>}
      {!uncertainty && <rect y="110" width="760" height="280" fill="url(#unknown)"/>}
      <rect x="282" y="54" width="196" height="48" rx="5" fill="#334155"/>
      <rect x="315" y="102" width="130" height="17" fill="#475569"/>
      {hasField ? [145, 380, 620].map((x, index) => <g key={x}><line x1={x} y1="72" x2={x} y2={index === 1 ? 340 : 310} stroke="#0f172a" strokeWidth="3"/><circle cx={x} cy="72" r="8" fill="#0ea5e9"/><path d={`M${x - 7} ${155 + index * 18}h14M${x - 7} ${218 + index * 8}h14M${x - 7} ${278 - index * 5}h14`} stroke="#fff" strokeWidth="3"/></g>) : <g fill="#78350f" fontWeight="800" fontSize="34"><text x="130" y="220">?</text><text x="365" y="260">?</text><text x="610" y="205">?</text></g>}
      <path d="M0 245 C160 225 290 260 430 238 C560 220 665 242 760 228" fill="none" stroke="#38bdf8" strokeWidth="5" strokeDasharray="11 8" opacity={uncertainty ? 1 : .35}/>
      <text x="24" y="35" fill="#334155" fontSize="14" fontWeight="800">COMPOSITE EVIDENCE SECTION — NOT TO SCALE</text>
      <g fontSize="13" fontWeight="700" fill="#fff"><text x="26" y="145">Observed surface</text>{interpreted && <><text x="26" y="210">Interpreted unit A</text><text x="26" y="322">Interpreted unit B</text></>}</g>
      <text x="572" y="220" fill="#075985" fontSize="13" fontWeight="800">Groundwater range</text>
    </svg>
  );
}

export function FoundationBeforeGroundModel() {
  const [evidence, setEvidence] = useState(baselineFoundationEvidence);
  const result = useMemo(() => evaluateFoundationEvidence(evidence), [evidence]);
  const toggle = (key) => setEvidence((current) => ({ ...current, [key]: !current[key] }));

  return (
    <div className="flex flex-col">
      <Helmet>
        <title>The Foundation Was Chosen Before the Ground Model Was Ready | Tech Made Easy</title>
        <meta name="description" content="An interactive field note for testing whether ground evidence supports option screening, a conditional concept, or engineering design review." />
        <link rel="canonical" href="https://techmadeeasy.info/blog/foundation-before-ground-model/" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://techmadeeasy.info/blog/foundation-before-ground-model" />
        <meta property="og:title" content="The Foundation Was Chosen Before the Ground Model Was Ready" />
        <meta property="og:description" content="What decision does the available ground evidence actually support?" />
        <meta property="og:image" content="https://techmadeeasy.info/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org', '@type': 'Article',
          headline: 'The Foundation Was Chosen Before the Ground Model Was Ready',
          datePublished: '2026-08-22', dateModified: '2026-08-22',
          mainEntityOfPage: 'https://techmadeeasy.info/blog/foundation-before-ground-model',
          author: { '@type': 'Person', name: 'Duc Hoang' },
          publisher: { '@type': 'Organization', name: 'Tech Made Easy' },
        })}</script>
      </Helmet>

      <article>
        <ArticleHeader slug="foundation-before-ground-model" kicker="Preconstruction evidence gate" format="Interactive tool" summary="The option had already entered the cost plan, procurement schedule and construction sequence. It looked settled because it had travelled through more documents than the evidence supporting it." />
        <header className="hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="mx-auto max-w-5xl">
            <Button asChild variant="ghost" className="mb-7 -ml-3 text-stone-300 hover:bg-white/10 hover:text-white"><Link to="/blog"><ArrowLeft className="mr-2 h-4 w-4"/>Back to notes</Link></Button>
            <div className="flex flex-wrap gap-2"><Badge className="border-amber-400/30 bg-amber-400/15 text-amber-100">Before the spade</Badge><Badge variant="outline" className="border-white/25 text-stone-200">Interactive field note</Badge><Badge variant="outline" className="border-white/25 text-stone-200">Composite scenario</Badge></div>
            <div className="mt-7 max-w-5xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">The foundation was chosen before the ground model was ready.</div>
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-stone-300">The option had already entered the cost plan, procurement schedule and construction sequence. It looked settled because it had travelled through more documents than the evidence supporting it.</p>
            <p className="mt-6 text-sm text-stone-400">By Duc Hoang, PMP · August 2026 · 11 min read + evidence gate</p>
          </div></div>
        </header>

        <div className="container mx-auto space-y-16 px-4 py-12 sm:px-6 lg:px-8">
          <section className="mx-auto max-w-4xl text-lg leading-8 text-muted-foreground">
            <p className="text-sm font-bold uppercase tracking-[.18em] text-amber-700 dark:text-amber-300">Composite scenario, not a client project</p>
            <p className="mt-4 text-xl font-semibold leading-9 text-foreground">At the design review, the foundation type was already a line in the estimate and a chain of activities in the programme. The ground model still carried unverified boundaries, groundwater uncertainty and investigation gaps.</p>
            <p className="mt-5">The problem was not that an early assumption existed. Early assumptions are unavoidable. The problem was that the assumption had silently changed status—from a basis for screening into an apparent decision.</p>
            <blockquote className="my-8 border-l-4 border-amber-500 pl-6 text-2xl font-bold leading-relaxed text-foreground">A repeated assumption does not become evidence. It becomes harder to challenge.</blockquote>
          </section>

          <section aria-labelledby="gate-title" className="mx-auto max-w-7xl">
            <div className="mb-6 max-w-4xl"><Badge variant="secondary">Decision in one minute</Badge><h2 id="gate-title" className="mt-3 text-3xl font-bold sm:text-4xl">What does the evidence support today?</h2><p className="mt-3 text-muted-foreground">Switch evidence on or off. The highest result is <strong className="text-foreground">Ready for engineering design review</strong>; it never means that a foundation is selected or approved.</p></div>
            <div className="grid overflow-hidden rounded-3xl border bg-card shadow-xl lg:grid-cols-[390px_1fr]">
              <div className="space-y-3 border-b bg-muted/30 p-4 sm:p-6 lg:border-b-0 lg:border-r">
                {foundationEvidenceGates.map((gate) => (
                  <button key={gate.key} type="button" aria-pressed={evidence[gate.key]} onClick={() => toggle(gate.key)} className={`w-full rounded-xl border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${evidence[gate.key] ? 'border-emerald-500/40 bg-emerald-500/10' : 'border-amber-500/40 bg-background'}`}>
                    <span className="flex items-center gap-3"><span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${evidence[gate.key] ? 'bg-emerald-600 text-white' : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200'}`}>{evidence[gate.key] ? <Check className="h-4 w-4"/> : <CircleDot className="h-4 w-4"/>}</span><strong>{gate.label}</strong></span>
                    <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">{gate.evidence}</span>
                  </button>
                ))}
                <Button variant="outline" className="min-h-11 w-full" onClick={() => setEvidence(baselineFoundationEvidence)}><RotateCcw className="mr-2 h-4 w-4"/>Reset to early screening</Button>
              </div>
              <div className="min-w-0 space-y-5 p-4 sm:p-7">
                <GroundSection evidence={evidence}/>
                <div className={`rounded-2xl border p-5 ${result.stage === 'design-review' ? 'border-emerald-500/40 bg-emerald-500/10' : result.stage === 'conditional-concept' ? 'border-sky-500/40 bg-sky-500/10' : 'border-amber-500/40 bg-amber-500/10'}`}>
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between"><div><p className="text-xs font-black uppercase tracking-[.18em]">Current evidence: {result.activeCount}/{result.total}</p><h3 className="mt-1 text-2xl font-black">{result.decision}</h3><p className="mt-2 max-w-2xl text-sm leading-relaxed">{result.summary}</p></div><Badge variant="outline" className="shrink-0">{result.label}</Badge></div>
                  <p className="mt-4 border-t border-current/15 pt-4 text-sm"><strong>Permitted next move:</strong> {result.allowedAction}</p>
                  {result.missing.length > 0 && <p className="mt-3 text-sm"><strong>Open evidence:</strong> {result.missing.map(({ shortLabel }) => shortLabel).join(' · ')}</p>}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground"><AlertTriangle className="mr-2 inline h-4 w-4 text-amber-600"/><strong className="text-foreground">This gate measures evidence maturity, not foundation adequacy.</strong> It performs no bearing, settlement, lateral, seismic, durability or constructability calculation.</p>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-5xl"><div className="grid gap-8 lg:grid-cols-2 lg:items-start"><div><Badge variant="secondary">The model</Badge><h2 className="mt-3 text-3xl font-bold">Why a ground model is not a borehole log.</h2><p className="mt-4 leading-7 text-muted-foreground">A borehole is evidence at a location. A ground model assembles observations, investigation results and interpretation into a site-specific account of ground and groundwater—and makes the gaps visible. It should be updated as knowledge increases.</p><p className="mt-4 leading-7 text-muted-foreground">That distinction matters because the foundation decision sits between sparse observations and a continuous physical reality. A clean section can look certain even when much of the line between data points is interpretation.</p></div><div className="rounded-2xl border bg-muted/30 p-6"><Layers3 className="h-8 w-8 text-amber-600"/><h3 className="mt-3 text-xl font-bold">Keep three layers separate</h3><dl className="mt-5 space-y-4 text-sm"><div><dt className="font-bold">Observed</dt><dd className="text-muted-foreground">What was measured, logged, sampled or directly seen.</dd></div><div><dt className="font-bold">Interpreted</dt><dd className="text-muted-foreground">How observations are correlated into units, boundaries and representative values.</dd></div><div><dt className="font-bold">Assumed</dt><dd className="text-muted-foreground">What remains provisional and what evidence would confirm or overturn it.</dd></div></dl></div></div></section>

          <section className="mx-auto max-w-6xl"><Badge variant="secondary">Decision maturity</Badge><h2 className="mt-3 text-3xl font-bold">Do not ask one evidence package to support four different decisions.</h2><div className="mt-6 overflow-x-auto rounded-2xl border"><table className="w-full min-w-[760px] text-left text-sm"><thead className="bg-muted"><tr>{['Stage', 'Minimum evidence position', 'Responsible use', 'Stop here'].map((heading) => <th key={heading} className="p-4 font-bold">{heading}</th>)}</tr></thead><tbody>{maturityRows.map((row) => <tr key={row[0]} className="border-t">{row.map((cell, index) => <td key={cell} className={`p-4 align-top ${index === 0 ? 'font-bold text-foreground' : 'text-muted-foreground'}`}>{cell}</td>)}</tr>)}</tbody></table></div></section>

          <section className="mx-auto max-w-6xl"><div className="flex items-start gap-4"><SearchCheck className="mt-1 h-8 w-8 shrink-0 text-amber-600"/><div><Badge variant="secondary">At the review table</Badge><h2 className="mt-3 text-3xl font-bold">Six questions that expose a premature decision</h2></div></div><div className="mt-7 grid gap-4 md:grid-cols-2">{reviewQuestions.map(([question, detail], index) => <div key={question} className="rounded-2xl border bg-card p-5"><p className="text-xs font-black uppercase tracking-[.18em] text-amber-700 dark:text-amber-300">Question {index + 1}</p><h3 className="mt-2 text-lg font-bold">{question}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{detail}</p></div>)}</div></section>

          <section className="mx-auto max-w-5xl rounded-3xl border bg-slate-950 p-7 text-slate-100 sm:p-9"><ClipboardCheck className="h-8 w-8 text-amber-400"/><h2 className="mt-4 text-3xl font-bold">The control is not “wait until everything is known.”</h2><p className="mt-4 max-w-4xl leading-7 text-slate-300">The control is to match commitment to evidence maturity. Screen early. Carry ranges. Name the assumptions. Protect the investigation and review dates. Predefine what result changes the concept. Then let the estimate, programme and procurement record show the same maturity—not a false certainty created by repetition.</p></section>

          <section className="mx-auto max-w-5xl"><h2 className="text-3xl font-bold">Limitations</h2><div className="mt-5 rounded-2xl border border-amber-500/40 bg-amber-500/10 p-6 text-sm leading-7"><p><strong>This is not a foundation-design calculator.</strong> It does not select or size a foundation, establish bearing capacity or settlement, assess geohazards, confirm constructability, allocate contractual responsibility, or provide engineering approval. The evidence categories are a discussion aid; project-specific scope and acceptance must be set by competent professionals under the applicable standards and approvals.</p></div></section>

          <section className="mx-auto max-w-5xl"><h2 className="text-3xl font-bold">Further reading</h2><ul className="mt-5 space-y-4 text-sm leading-6 text-muted-foreground"><li><a className="font-semibold text-primary underline underline-offset-4" href="https://eurocodes.jrc.ec.europa.eu/publications/assembling-ground-model-and-derived-values" target="_blank" rel="noreferrer">European Commission JRC — Assembling the Ground Model and Derived Values</a>: definition, content and progressive development of the ground model.</li><li><a className="font-semibold text-primary underline underline-offset-4" href="https://www.fhwa.dot.gov/publications/research/infrastructure/structures/bridge/13046/004.cfm" target="_blank" rel="noreferrer">FHWA — Geotechnical Site Characterization</a>: phased exploration tied to project development and design needs.</li><li><a className="font-semibold text-primary underline underline-offset-4" href="https://www.publications.usace.army.mil/USACE-Publications/Engineer-Manuals/" target="_blank" rel="noreferrer">USACE — Engineer Manuals</a>: official access to EM 1110-1-1804, Geotechnical Investigations.</li><li><a className="font-semibold text-primary underline underline-offset-4" href="https://eurocodes.jrc.ec.europa.eu/publications/r185-observational-method-ground-engineering-principles-and-applications" target="_blank" rel="noreferrer">European Commission JRC / CIRIA — The Observational Method in Ground Engineering</a>: integrated design, monitoring and predefined modification controls.</li></ul></section>

          <section className="mx-auto max-w-5xl border-t pt-10"><p className="text-sm font-bold uppercase tracking-[.18em] text-muted-foreground">Continue the field-note series</p><div className="mt-4 grid gap-4 sm:grid-cols-2"><Link to="/blog/access-was-assumed" className="rounded-2xl border p-5 transition hover:border-primary"><strong>Access Was Assumed</strong><span className="mt-2 block text-sm text-muted-foreground">See how hidden readiness conditions move a construction sequence.</span><ArrowRight className="mt-4 h-4 w-4"/></Link><Link to="/blog/drawing-showed-access" className="rounded-2xl border p-5 transition hover:border-primary"><strong>The Drawing Showed Access</strong><span className="mt-2 block text-sm text-muted-foreground">Test whether a delivery route survives a physical turning screen.</span><ArrowRight className="mt-4 h-4 w-4"/></Link></div></section>
        </div>
      </article>
    </div>
  );
}
