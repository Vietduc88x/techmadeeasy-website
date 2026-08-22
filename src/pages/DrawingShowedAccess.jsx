import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CircleGauge,
  Eye,
  Play,
  RotateCcw,
  Ruler,
  Truck,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArticleHeader } from '@/components/article/ArticleHeader';
import {
  calculateTurningScreen,
  defaultTurningInputs,
  turningInterventions,
  turningInputRanges,
} from '@/data/drawingShowedAccess';

const controls = [
  { key: 'roadWidth', label: 'Usable road width', help: 'Clear width between hard obstructions—not the line shown on the plan.' },
  { key: 'insideRadius', label: 'Inside bend radius', help: 'Radius to the inside physical edge of the turn.' },
  { key: 'vehicleLength', label: 'Vehicle envelope length', help: 'Illustrative overall delivery-vehicle length.' },
  { key: 'clearance', label: 'Working clearance, each side', help: 'A screening allowance; it is not a project standard.' },
];

const readinessRows = [
  ['Swept path', 'Approved vehicle data and route geometry', 'Vehicle-tracking output plus marked pinch points', 'Logistics / transport lead'],
  ['Bearing capacity', 'Axle loads, pavement build-up, culverts and bridges', 'Route bearing assessment and crossing releases', 'Civil / temporary works'],
  ['Overhead clearance', 'Conductors, gates, trees, pipe racks and signage', 'Measured clearance envelope and isolation plan', 'Electrical + logistics'],
  ['Road furniture', 'Barriers, drains, poles, fences and removable items', 'Removal / protection schedule with owners', 'Site construction'],
  ['Delivery interface', 'Laydown, crane position, reversing and egress', 'Approved delivery and lifting sequence', 'Construction + lifting'],
  ['Controls', 'Permits, escorts, traffic windows and emergency access', 'Route permit and traffic-management release', 'HSE / permits'],
];

function ValueControl({ control, value, onChange }) {
  const range = turningInputRanges[control.key];
  const id = `turning-${control.key}`;
  const helpId = `${id}-help`;
  return (
    <div className="rounded-xl border border-border/70 bg-background/70 p-4">
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="font-semibold text-foreground">{control.label}</label>
        <output htmlFor={id} className="shrink-0 font-mono text-lg font-bold text-primary">{value.toFixed(value % 1 ? 2 : 0)} m</output>
      </div>
      <div className="mt-1 flex min-h-11 items-center">
        <input
          id={id}
          type="range"
          min={range.min}
          max={range.max}
          step={range.step}
          value={value}
          aria-describedby={helpId}
          onChange={(event) => onChange(control.key, Number(event.target.value))}
          className="h-11 w-full cursor-pointer accent-primary"
        />
      </div>
      <div className="mt-1 flex justify-between text-xs text-muted-foreground">
        <span>{range.min} m</span><span>{range.max} m</span>
      </div>
      <p id={helpId} className="mt-2 text-sm leading-relaxed text-muted-foreground">{control.help}</p>
    </div>
  );
}

function SceneFallback({ failed }) {
  return (
    <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden rounded-2xl bg-[#07111f] p-8 text-center text-slate-100">
      <div className="absolute -bottom-32 -left-28 h-96 w-96 rounded-full border-[74px] border-slate-600/65" />
      <div className="relative max-w-xs rounded-xl border border-white/15 bg-slate-950/75 p-5 backdrop-blur">
        <Truck className="mx-auto h-8 w-8 text-amber-400" />
        <p className="mt-3 font-semibold">{failed ? 'Plan view unavailable' : 'Loading the concept screen…'}</p>
        <p className="mt-1 text-sm text-slate-300">The result and assumptions remain available in the controls and metric table.</p>
      </div>
    </div>
  );
}

export function DrawingShowedAccess() {
  const [inputs, setInputs] = useState(defaultTurningInputs);
  const [Scene, setScene] = useState(null);
  const [sceneFailed, setSceneFailed] = useState(false);
  const [shouldLoadScene, setShouldLoadScene] = useState(false);
  const [runToken, setRunToken] = useState(0);
  const toolRef = useRef(null);
  const scenario = useMemo(() => calculateTurningScreen(inputs), [inputs]);
  const handleUnavailable = useCallback(() => setSceneFailed(true), []);

  useEffect(() => {
    const tool = toolRef.current;
    if (!tool) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShouldLoadScene(true);
        observer.disconnect();
      }
    }, { rootMargin: '0px' });
    observer.observe(tool);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoadScene) return undefined;
    let active = true;
    import('@/components/turning/TurningEnvelopeScene')
      .then((module) => {
        if (active) setScene(() => module.TurningEnvelopeScene);
      })
      .catch(() => {
        if (active) setSceneFailed(true);
      });
    return () => { active = false; };
  }, [shouldLoadScene]);

  const updateInput = (key, value) => setInputs((current) => ({ ...current, [key]: value }));
  const statusLabel = scenario.status === 'fail'
    ? 'Screen fails'
    : scenario.status === 'tight'
      ? 'Screening margin too tight'
      : 'Positive screening margin';
  const statusTone = scenario.status === 'pass'
    ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200'
    : scenario.status === 'tight'
      ? 'border-amber-500/50 bg-amber-500/10 text-amber-800 dark:text-amber-200'
      : 'border-rose-500/50 bg-rose-500/10 text-rose-800 dark:text-rose-200';

  return (
    <div className="flex flex-col">
      <Helmet>
        <title>The Drawing Showed Access | Constructability Autopsy</title>
        <meta name="description" content="Could the delivery vehicle actually make the turn? Test road width, bend radius, vehicle length and clearance in a public-safe constructability screening model." />
        <link rel="canonical" href="https://techmadeeasy.info/blog/drawing-showed-access/" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://techmadeeasy.info/blog/drawing-showed-access" />
        <meta property="og:title" content="The Drawing Showed Access" />
        <meta property="og:description" content="Could the delivery vehicle actually make the turn? A constructability field note with an interactive concept screen." />
        <meta property="og:image" content="https://techmadeeasy.info/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The Drawing Showed Access" />
        <meta name="twitter:description" content="A road line is not a logistics release. Test the geometry, then identify the evidence needed for delivery." />
        <meta name="twitter:image" content="https://techmadeeasy.info/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'The Drawing Showed Access',
          description: 'Could the delivery vehicle actually make the turn? A constructability field note with an interactive concept screen.',
          datePublished: '2026-08-19',
          dateModified: '2026-08-19',
          mainEntityOfPage: 'https://techmadeeasy.info/blog/drawing-showed-access',
          image: 'https://techmadeeasy.info/og-image.jpg',
          author: { '@type': 'Person', name: 'Duc Hoang' },
          publisher: { '@type': 'Organization', name: 'Tech Made Easy' },
        })}</script>
      </Helmet>

      <article>
        <ArticleHeader slug="drawing-showed-access" kicker="Constructability screen" format="Interactive tool" title="The drawing showed access. Could the delivery vehicle actually make the turn?" summary="A road line on a general arrangement is not a logistics release. Change four inputs, run the turn, and see where a plausible route becomes a constructability problem." />
        <header className="hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
              <Button asChild variant="ghost" className="mb-7 -ml-3 text-slate-300 hover:bg-white/10 hover:text-white">
                <Link to="/blog"><ArrowLeft className="mr-2 h-4 w-4" />Back to notes</Link>
              </Button>
              <div className="flex flex-wrap gap-2">
                <Badge className="border-sky-400/30 bg-sky-400/15 text-sky-100">Constructability Autopsy</Badge>
                <Badge variant="outline" className="border-white/25 text-slate-200">Interactive field note</Badge>
                <Badge variant="outline" className="border-white/25 text-slate-200">Composite example</Badge>
              </div>
              <div className="mt-7 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">The drawing showed access.</div>
              <p className="mt-4 max-w-4xl text-2xl font-semibold text-sky-200 sm:text-3xl">Could the delivery vehicle actually make the turn?</p>
              <p className="mt-7 max-w-3xl text-lg leading-relaxed text-slate-300">A road line on a general arrangement is not a logistics release. Change four inputs, run the turn, and see where a plausible route becomes a constructability problem.</p>
              <p className="mt-6 text-sm text-slate-400">By Duc Hoang, PMP · August 2026 · 4 min read + interactive screen</p>
            </div>
          </div>
        </header>

        <div className="container mx-auto space-y-16 px-4 py-12 sm:px-6 lg:px-8">
          <section className="mx-auto max-w-4xl text-lg leading-8 text-muted-foreground">
            <p className="text-xl font-semibold leading-9 text-foreground">The vehicle arrived on Day 9. The gate was wide enough. The internal road existed. Then the driver stopped before the first bend.</p>
            <p className="mt-5">The drawing had answered a planning question: <em>is there a route?</em> It had not answered the field question: <em>can this vehicle use that route with its load, clearance and turning behaviour?</em> By then, the lifting window, escort and crew were already committed.</p>
            <blockquote className="my-8 border-l-4 border-primary pl-6 text-2xl font-bold leading-relaxed text-foreground">Access is not a line on a drawing. It is a released physical envelope.</blockquote>
          </section>

          <section ref={toolRef} aria-labelledby="turning-lab-title" className="mx-auto max-w-7xl">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <Badge variant="secondary">Try the turn</Badge>
                <h2 id="turning-lab-title" className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">The drawing-to-delivery gap</h2>
                <p className="mt-2 max-w-3xl text-muted-foreground">Composite example, not a client route. <strong className="text-foreground">Concept screening estimate:</strong> the open calculation is the source of truth; the plan view explains it.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button className="min-h-11" variant="outline" onClick={() => setInputs(defaultTurningInputs)}><RotateCcw className="mr-2 h-4 w-4" />Reset drawing</Button>
                <Button className="min-h-11" variant="outline" onClick={() => setInputs(turningInterventions.widenRoad.inputs)}><CheckCircle2 className="mr-2 h-4 w-4" />Widen road to 9 m</Button>
                <Button className="min-h-11" variant="outline" onClick={() => setInputs(turningInterventions.increaseRadius.inputs)}><CircleGauge className="mr-2 h-4 w-4" />Increase radius to 16 m</Button>
                <Button className="min-h-11" onClick={() => setRunToken((value) => value + 1)}><Play className="mr-2 h-4 w-4" />Replay vehicle</Button>
              </div>
            </div>

            <div className="grid overflow-hidden rounded-3xl border bg-card shadow-xl lg:grid-cols-[390px_1fr]">
              <div className="space-y-3 border-b bg-muted/30 p-4 sm:p-6 lg:border-b-0 lg:border-r">
                {controls.map((control) => <ValueControl key={control.key} control={control} value={inputs[control.key]} onChange={updateInput} />)}
              </div>
              <div className="relative min-w-0 bg-[#07111f] p-2 sm:p-4">
                <div className={`pointer-events-none absolute right-5 top-5 z-10 rounded-xl border px-3 py-2 shadow-lg backdrop-blur-md sm:right-7 sm:top-7 ${
                  scenario.status === 'pass'
                    ? 'border-emerald-300/35 bg-emerald-950/80 text-emerald-100'
                    : scenario.status === 'tight'
                      ? 'border-amber-300/35 bg-amber-950/80 text-amber-100'
                      : 'border-rose-300/35 bg-rose-950/80 text-rose-100'
                }`}>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em]">Concept screen</p>
                  <p className="mt-0.5 text-sm font-bold sm:text-base">{statusLabel}</p>
                  <p className="font-mono text-xs opacity-80">Margin {scenario.margin > 0 ? '+' : ''}{scenario.margin.toFixed(2)} m</p>
                </div>
                {Scene && !sceneFailed
                  ? <Scene scenario={scenario} vehicleLength={inputs.vehicleLength} runToken={runToken} onUnavailable={handleUnavailable} />
                  : <SceneFallback failed={sceneFailed} />}
                <div className="pointer-events-none absolute bottom-5 left-5 z-10 grid gap-1.5 rounded-xl border border-white/15 bg-slate-950/85 px-3 py-2 text-[11px] text-slate-100 backdrop-blur sm:bottom-7 sm:left-7 sm:grid-cols-2 sm:gap-x-4">
                  <span className="flex items-center gap-2"><i className="h-0.5 w-5 bg-slate-200" />Road boundary</span>
                  <span className="flex items-center gap-2"><i className="h-0.5 w-5 bg-sky-400" />Assumed reference path</span>
                  <span className="flex items-center gap-2"><i className="h-0.5 w-5 bg-amber-400" />Approx. rear-wheel path</span>
                  <span className="flex items-center gap-2"><i className={`h-2.5 w-5 ${scenario.status === 'pass' ? 'bg-emerald-400/70' : scenario.status === 'tight' ? 'bg-amber-400/70' : 'bg-rose-400/70'}`} />Estimated envelope</span>
                </div>
              </div>
            </div>

            <p className="sr-only" aria-live="polite">Screening result: {statusLabel}; margin {scenario.margin.toFixed(2)} metres.</p>
            <div className={`mt-5 rounded-2xl border p-5 ${statusTone}`}>
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-3">
                  {scenario.status === 'pass' ? <CheckCircle2 className="h-8 w-8 shrink-0" /> : <AlertTriangle className="h-8 w-8 shrink-0" />}
                  <div><p className="text-xs font-black uppercase tracking-[0.2em]">Geometry screen</p><p className="text-2xl font-black">{statusLabel}</p></div>
                </div>
                <dl className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-4">
                  <div><dt className="text-xs font-bold uppercase tracking-wide opacity-75">Available</dt><dd className="font-mono text-xl font-bold">{scenario.availableWidth.toFixed(2)} m</dd></div>
                  <div><dt className="text-xs font-bold uppercase tracking-wide opacity-75">Required</dt><dd className="font-mono text-xl font-bold">{scenario.requiredWidth.toFixed(2)} m</dd></div>
                  <div><dt className="text-xs font-bold uppercase tracking-wide opacity-75">Margin</dt><dd className="font-mono text-xl font-bold">{scenario.margin > 0 ? '+' : ''}{scenario.margin.toFixed(2)} m</dd></div>
                  <div><dt className="text-xs font-bold uppercase tracking-wide opacity-75">Off-tracking</dt><dd className="font-mono text-xl font-bold">{scenario.offTracking.toFixed(2)} m</dd></div>
                </dl>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground"><strong className="text-foreground">Important:</strong> This is an illustrative screening model, not a swept-path approval. A positive margin means “investigate further with project data,” not “release the delivery.”</p>
          </section>

          <section className="mx-auto max-w-5xl" aria-labelledby="calculation-title">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
              <div>
                <Badge variant="secondary">Open calculation</Badge>
                <h2 id="calculation-title" className="mt-4 text-3xl font-bold text-foreground">What changed when you moved the sliders</h2>
                <p className="mt-4 text-lg leading-8 text-muted-foreground">The screen treats the vehicle as a simplified rigid envelope. Effective wheelbase is 52% of overall length; front overhang is 18%; vehicle width is fixed at 3.00 m. Those teaching assumptions are intentionally visible because a hidden vehicle library would imply precision this page does not have.</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border p-5"><CircleGauge className="h-6 w-6 text-primary" /><h3 className="mt-3 font-bold">Rear wheels cut inside</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Approximate off-tracking = effective wheelbase² ÷ (2 × vehicle path radius).</p></div>
                  <div className="rounded-2xl border p-5"><Ruler className="h-6 w-6 text-primary" /><h3 className="mt-3 font-bold">The body swings outside</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">The outside front corner adds width beyond the nominal 3.00 m vehicle body.</p></div>
                </div>
              </div>
              <dl className="overflow-hidden rounded-2xl border bg-muted/25">
                {[
                  ['Vehicle path radius', `${scenario.pathRadius.toFixed(2)} m`],
                  ['Effective wheelbase', `${scenario.effectiveWheelbase.toFixed(2)} m`],
                  ['Approximate off-tracking', `${scenario.offTracking.toFixed(2)} m`],
                  ['Approx. rear-wheel path radius', `${scenario.rearWheelPathRadius.toFixed(2)} m`],
                  ['Outside corner swing', `${scenario.outsideCornerSwing.toFixed(2)} m`],
                  ['Working clearance', `${inputs.clearance.toFixed(2)} m each side`],
                  ['Required envelope', `${scenario.requiredWidth.toFixed(2)} m`],
                ].map(([term, value]) => <div key={term} className="flex items-center justify-between gap-5 border-b px-5 py-4 last:border-0"><dt className="text-sm text-muted-foreground">{term}</dt><dd className="text-right font-mono font-bold text-foreground">{value}</dd></div>)}
              </dl>
            </div>
          </section>

          <section className="mx-auto max-w-6xl" aria-labelledby="release-title">
            <Badge variant="secondary">Field control</Badge>
            <h2 id="release-title" className="mt-4 text-3xl font-bold text-foreground">A pass on geometry is only the first gate</h2>
            <p className="mt-3 max-w-4xl text-lg leading-8 text-muted-foreground">The route should be owned and released like any other construction interface. “Shown on the drawing” is not acceptance evidence.</p>
            <div className="mt-7 grid gap-4 md:hidden">
              {readinessRows.map(([condition, input, evidence, owner]) => <div key={condition} className="rounded-2xl border p-5"><h3 className="font-bold">{condition}</h3><dl className="mt-3 space-y-2 text-sm"><div><dt className="font-semibold text-muted-foreground">Verify</dt><dd>{input}</dd></div><div><dt className="font-semibold text-muted-foreground">Acceptance evidence</dt><dd>{evidence}</dd></div><div><dt className="font-semibold text-muted-foreground">Owner</dt><dd>{owner}</dd></div></dl></div>)}
            </div>
            <div className="mt-7 hidden overflow-x-auto rounded-2xl border md:block">
              <table className="w-full min-w-[820px] text-left text-sm">
                <thead className="bg-muted/60 text-foreground"><tr><th className="p-4">Condition</th><th className="p-4">Verify</th><th className="p-4">Acceptance evidence</th><th className="p-4">Owner</th></tr></thead>
                <tbody>{readinessRows.map(([condition, input, evidence, owner]) => <tr key={condition} className="border-t align-top"><th className="p-4 font-semibold">{condition}</th><td className="p-4 text-muted-foreground">{input}</td><td className="p-4 text-muted-foreground">{evidence}</td><td className="p-4 text-muted-foreground">{owner}</td></tr>)}</tbody>
              </table>
            </div>
          </section>

          <section className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
            <div className="rounded-2xl border p-6 sm:p-8"><Eye className="h-7 w-7 text-primary" /><h2 className="mt-4 text-2xl font-bold">What the plan review should ask</h2><ol className="mt-5 list-decimal space-y-3 pl-5 text-muted-foreground"><li>Which actual vehicle and load controls the route?</li><li>Where are the inside and outside swept-envelope pinch points?</li><li>What changes between survey, civil completion and delivery day?</li><li>Who signs the route release, against what dated evidence?</li><li>What is the recovery plan if one control is false?</li></ol></div>
            <div className="rounded-2xl border border-amber-500/35 bg-amber-500/5 p-6 sm:p-8"><AlertTriangle className="h-7 w-7 text-amber-700 dark:text-amber-300" /><h2 className="mt-4 text-2xl font-bold">What this model cannot tell you</h2><ul className="mt-5 list-disc space-y-3 pl-5 text-muted-foreground"><li>It does not model steering geometry, articulation, axle groups or a manufacturer-specific vehicle.</li><li>It does not assess gradients, crossfall, bearing capacity, overhead clearance or dynamic behaviour.</li><li>It does not replace a route survey, vehicle-tracking study, temporary-works design or competent-person approval.</li><li>It does not determine contractual responsibility, delay entitlement or cost.</li></ul></div>
          </section>

          <section className="mx-auto max-w-5xl border-t pt-8" aria-labelledby="further-reading-title">
            <h2 id="further-reading-title" className="text-xl font-bold">Further reading</h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              For project work, agree the representative vehicle and movement, then show wheel tracks, the vehicle-body envelope, clearances and route constraints against surveyed geometry. See the{' '}
              <a className="font-medium text-primary underline underline-offset-4" href="https://www.worcestershire.gov.uk/council-services/travel-and-highways/highways-licences/streetscape-design-guide/4-access-layout-and-connectivity" target="_blank" rel="noreferrer">Worcestershire County Council swept-path presentation guidance</a>
              {' '}and the{' '}
              <a className="font-medium text-primary underline underline-offset-4" href="https://www.hse.gov.uk/workplacetransport/vehicles.htm" target="_blank" rel="noreferrer">UK Health and Safety Executive vehicle-route questions</a>.
            </p>
          </section>

          <section className="mx-auto max-w-5xl rounded-3xl border-2 border-primary/20 bg-primary/5 p-7 sm:p-10">
            <Badge>Companion field note</Badge>
            <h2 className="mt-4 text-3xl font-bold">The schedule had already assumed the route was ready</h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">Once geometry, structure and controls become explicit gates, they can be linked to mobilisation and delivery instead of discovered by the driver.</p>
            <Button asChild className="mt-6"><Link to="/blog/access-was-assumed">Open “Access Was Assumed”<ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
          </section>
        </div>
      </article>
    </div>
  );
}
