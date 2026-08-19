import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Calendar,
  FileDown,
  GitBranch,
  Info,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  accessAssumptions,
  baselineAccessState,
  calculateAccessScenario,
} from '@/data/accessWasAssumed';

const MAX_DISPLAY_DAY = 40;

const readinessResponses = {
  roadAccess: 'Resequence mobilisation or complete temporary access works',
  platformReady: 'Hold plant delivery and close temporary-works actions',
  fimHandover: 'Quarantine, conditionally accept or resequence installation',
  temporaryPower: 'Provide temporary generation or move the test window',
};

function AssumptionToggle({ assumption, available, onChange }) {
  const switchId = `access-condition-${assumption.id}`;
  const descriptionId = `${switchId}-description`;

  return (
    <div className={`rounded-xl border px-4 py-3 transition-colors ${
      available
        ? 'border-emerald-500/30 bg-emerald-500/5'
        : 'border-amber-500/60 bg-amber-500/10'
    }`}>
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <label htmlFor={switchId} className="cursor-pointer font-semibold text-foreground">
            {assumption.label}
          </label>
          <p id={descriptionId} className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {assumption.question}
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-2">
          <Switch
            id={switchId}
            checked={available}
            onCheckedChange={onChange}
            aria-describedby={descriptionId}
            aria-label={`${assumption.label}: ${available ? 'ready' : 'unavailable'}`}
            className="h-6 w-11 data-[state=checked]:bg-emerald-600 data-[state=unchecked]:bg-amber-600 [&_[data-slot=switch-thumb]]:size-5"
          />
          <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide ${
            available
              ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
              : 'bg-amber-500/20 text-amber-800 dark:text-amber-200'
          }`}>
            {available ? 'Ready' : `+${assumption.delayDays}d wait`}
          </span>
        </div>
      </div>
    </div>
  );
}

function ScheduleBar({ activity, maxDay }) {
  const waitLeft = (activity.logicStart / maxDay) * 100;
  const waitWidth = (activity.gateDelay / maxDay) * 100;
  const workLeft = (activity.start / maxDay) * 100;
  const workWidth = Math.max((activity.duration / maxDay) * 100, 3.5);

  return (
    <div className="grid gap-2 border-b border-border/60 py-2.5 last:border-0 md:grid-cols-[176px_1fr] md:items-center">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-semibold text-foreground">{activity.label}</p>
          {activity.critical ? (
            <span className="text-[10px] font-bold uppercase tracking-wide text-amber-700 dark:text-amber-300">Critical</span>
          ) : (
            <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">{activity.totalFloat}d float</span>
          )}
        </div>
        <p className="text-xs text-muted-foreground">Work: Day {activity.start}–{activity.finish}</p>
      </div>
      <div
        className="relative h-9 overflow-hidden rounded-md border bg-muted/40"
        style={{
          backgroundImage: 'repeating-linear-gradient(to right, transparent 0, transparent calc(12.5% - 1px), hsl(var(--border)) calc(12.5% - 1px), hsl(var(--border)) 12.5%)',
        }}
      >
        {activity.gateDelay > 0 && (
          <div
            className="absolute inset-y-1 overflow-hidden rounded-l border border-amber-700/30 px-1 text-[10px] font-bold leading-7 text-amber-950 dark:text-amber-100"
            style={{
              left: `${waitLeft}%`,
              width: `${waitWidth}%`,
              backgroundColor: 'rgb(251 191 36 / 0.55)',
              backgroundImage: 'repeating-linear-gradient(135deg, transparent 0, transparent 5px, rgb(180 83 9 / 0.22) 5px, rgb(180 83 9 / 0.22) 7px)',
            }}
            title={`Waiting ${activity.gateDelay} days for ${activity.label} gate`}
          >
            <span className="hidden lg:inline">{activity.gateDelay}d wait</span>
          </div>
        )}
        <div
          className={`absolute inset-y-1 rounded px-1 text-center text-[10px] font-bold leading-7 text-white shadow-sm ${
            activity.critical ? 'bg-slate-950 dark:bg-slate-100 dark:text-slate-950' : 'bg-slate-500'
          }`}
          style={{ left: `${workLeft}%`, width: `${workWidth}%` }}
          title={`${activity.label}: day ${activity.start} to ${activity.finish}; ${activity.totalFloat} days total float`}
        >
          <span className="hidden sm:inline">{activity.duration}d</span>
        </div>
      </div>
    </div>
  );
}

function LogicNode({ children, active = false, warning = false }) {
  return (
    <div className={`min-w-32 rounded-lg border px-3 py-2 text-center text-xs font-semibold ${
      warning
        ? 'border-amber-500/60 bg-amber-500/10 text-amber-900 dark:text-amber-100'
        : active
          ? 'border-slate-950 bg-slate-950 text-white dark:border-slate-100 dark:bg-slate-100 dark:text-slate-950'
          : 'border-border bg-background text-muted-foreground'
    }`}>
      {children}
    </div>
  );
}

function LogicNetwork({ scenario, selected }) {
  const criticalIds = new Set(scenario.controllingPath.map(({ id }) => id));
  const criticalGateIds = new Set(scenario.criticalGates.map(({ id }) => id));

  const mobileLanes = [
    {
      label: 'Civil workfront',
      nodes: [
        { label: 'Road gate', warning: !selected.roadAccess, active: criticalGateIds.has('roadAccess') },
        { label: 'Mobilisation', active: criticalIds.has('mobilisation') },
        { label: 'Survey', active: criticalIds.has('set-out') },
        { label: 'Platform gate', warning: !selected.platformReady, active: criticalGateIds.has('platformReady') },
      ],
    },
    {
      label: 'FIM interface',
      nodes: [
        { label: 'FIM handover', warning: !selected.fimHandover, active: criticalGateIds.has('fimHandover') },
        { label: 'Receipt + inspection', active: criticalIds.has('fim-receipt') },
      ],
    },
    {
      label: 'Convergence',
      nodes: [
        { label: 'Main installation', active: criticalIds.has('main-installation') },
        { label: 'Power gate', warning: !selected.temporaryPower, active: criticalGateIds.has('temporaryPower') },
        { label: 'Testing + handover', active: criticalIds.has('testing-handover') },
      ],
    },
  ];

  return (
    <div className="rounded-2xl border bg-muted/20 p-5">
      <div className="space-y-5 md:hidden">
        {mobileLanes.map((lane, laneIndex) => (
          <div key={lane.label} className={laneIndex ? 'border-t pt-5' : ''}>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">{lane.label}</p>
            <div className="grid gap-2">
              {lane.nodes.map((node, index) => (
                <React.Fragment key={node.label}>
                  {index > 0 && <span className="text-center text-muted-foreground" aria-hidden="true">↓</span>}
                  <LogicNode active={node.active} warning={node.warning}>{node.label}</LogicNode>
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="hidden overflow-x-auto md:block">
        <div className="min-w-[820px] space-y-4">
          <div className="grid grid-cols-[115px_1fr] items-center gap-4">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">Civil workfront</p>
          <div className="flex items-center gap-2">
            <LogicNode warning={!selected.roadAccess} active={criticalGateIds.has('roadAccess')}>Road gate</LogicNode>
            <span aria-hidden="true">→</span>
            <LogicNode active={criticalIds.has('mobilisation')}>Mobilisation</LogicNode>
            <span aria-hidden="true">→</span>
            <LogicNode active={criticalIds.has('set-out')}>Survey</LogicNode>
            <span aria-hidden="true">→</span>
            <LogicNode warning={!selected.platformReady} active={criticalGateIds.has('platformReady')}>Platform gate</LogicNode>
          </div>
          </div>
          <div className="grid grid-cols-[115px_1fr] items-center gap-4">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">FIM interface</p>
          <div className="flex items-center gap-2 pl-[292px]">
            <LogicNode warning={!selected.fimHandover} active={criticalGateIds.has('fimHandover')}>FIM handover</LogicNode>
            <span aria-hidden="true">→</span>
            <LogicNode active={criticalIds.has('fim-receipt')}>Receipt + inspection</LogicNode>
          </div>
          </div>
          <div className="grid grid-cols-[115px_1fr] items-center gap-4 border-t pt-4">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">Convergence</p>
          <div className="flex items-center justify-end gap-2">
            <LogicNode active={criticalIds.has('main-installation')}>Main installation</LogicNode>
            <span aria-hidden="true">→</span>
            <LogicNode warning={!selected.temporaryPower} active={criticalGateIds.has('temporaryPower')}>Power gate</LogicNode>
            <span aria-hidden="true">→</span>
            <LogicNode active={criticalIds.has('testing-handover')}>Testing + handover</LogicNode>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AccessWasAssumed() {
  const [selected, setSelected] = useState(baselineAccessState);
  const scenario = useMemo(() => calculateAccessScenario(selected), [selected]);
  const maxDay = Math.max(MAX_DISPLAY_DAY, scenario.completionDay + 3);
  const platformRelease = scenario.activities.find(({ id }) => id === 'platform-release');
  const fimReceipt = scenario.activities.find(({ id }) => id === 'fim-receipt');
  const mainInstallation = scenario.activities.find(({ id }) => id === 'main-installation');

  const setCondition = (id, available) => {
    setSelected((current) => ({ ...current, [id]: available }));
  };

  const controllingSummary = scenario.controllingGate
    ? `${scenario.controllingGate.shortLabel} is the first unavailable gate on the controlling path.`
    : 'The civil workfront sequence controls the baseline.';

  return (
    <div className="flex flex-col">
      <Helmet>
        <title>Access Was Assumed | Tech Made Easy</title>
        <meta name="description" content="An interactive project-controls field note: expose access gates, waiting time, float and the path controlling completion." />
        <link rel="canonical" href="https://techmadeeasy.info/blog/access-was-assumed" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Access Was Assumed" />
        <meta property="og:description" content="The programme says installation starts on Day 9. The delivery truck cannot reach the workfront. Which date is lying?" />
      </Helmet>

      <section className="border-b bg-gradient-to-br from-amber-500/10 via-background to-primary/5 py-14">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <Button asChild variant="ghost" className="mb-6">
              <Link to="/blog"><ArrowLeft className="mr-2 h-4 w-4" />Back to Blog</Link>
            </Button>
            <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <Badge>Before the Spade</Badge>
              <Badge variant="secondary">Preconstruction</Badge>
              <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />August 2026</span>
              <span className="flex items-center gap-1"><GitBranch className="h-4 w-4" />Interactive field note</span>
            </div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-300">
              One lie in the programme
            </p>
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-foreground lg:text-6xl">Access Was Assumed</h1>
            <p className="mt-6 max-w-3xl text-xl leading-relaxed text-muted-foreground">
              The programme says installation starts on Day 9. The delivery truck cannot reach the workfront. Which date is lying?
            </p>
            <p className="mt-6 text-sm text-muted-foreground">By Duc Hoang, PMP</p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-5 flex flex-col gap-3 border-b pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700 dark:text-amber-300">Composite example, not a client programme</p>
                <h2 className="mt-2 text-3xl font-bold text-foreground">Break the baseline</h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  Switch a readiness condition off. Orange is waiting created by a missing gate; black is work on the controlling path.
                </p>
              </div>
              <Button variant="outline" onClick={() => setSelected(baselineAccessState)}>
                <RotateCcw className="mr-2 h-4 w-4" />Reset baseline
              </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-[330px_minmax(0,1fr)] lg:items-start">
              <div className="space-y-3">
                {accessAssumptions.map((assumption) => (
                  <AssumptionToggle
                    key={assumption.id}
                    assumption={assumption}
                    available={selected[assumption.id]}
                    onChange={(available) => setCondition(assumption.id, available)}
                  />
                ))}
              </div>

              <Card className="overflow-hidden border-2 lg:sticky lg:top-20">
                <CardHeader className="border-b bg-muted/30 pb-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Illustrative completion</p>
                      <CardTitle className="mt-1 text-4xl tabular-nums">Day {scenario.completionDay}</CardTitle>
                    </div>
                    <div className={`rounded-lg px-4 py-2 text-sm font-semibold ${
                      scenario.deltaDays
                        ? 'bg-amber-500/15 text-amber-800 dark:text-amber-200'
                        : 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
                    }`}>
                      {scenario.deltaDays ? `+${scenario.deltaDays} days vs baseline` : 'Baseline sequence'}
                    </div>
                  </div>
                  <div className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                    <div className="rounded-lg border bg-background px-3 py-2">
                      <span className="text-muted-foreground">Controlling gate</span>
                      <p className="font-semibold text-foreground">{scenario.controllingGate?.shortLabel ?? 'None missing'}</p>
                    </div>
                    <div className="rounded-lg border bg-background px-3 py-2">
                      <span className="text-muted-foreground">Parallel delay absorbed</span>
                      <p className="font-semibold text-foreground">
                        {scenario.absorbedGates.length ? scenario.absorbedGates.map(({ shortLabel }) => shortLabel).join(', ') : 'None in this state'}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-5">
                  <div className="mb-1 hidden grid-cols-9 pl-[176px] text-[11px] text-muted-foreground md:grid">
                    {[0, 5, 10, 15, 20, 25, 30, 35, 40].map((day) => <span key={day}>D{day}</span>)}
                  </div>
                  {scenario.activities.map((activity) => <ScheduleBar key={activity.id} activity={activity} maxDay={maxDay} />)}
                  <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
                    <div className="flex gap-3">
                      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                      <div>
                        <p className="font-semibold text-foreground">{controllingSummary}</p>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {scenario.unavailableCount
                            ? `${scenario.unavailableCount} assumed condition${scenario.unavailableCount === 1 ? '' : 's'} ${scenario.unavailableCount === 1 ? 'is' : 'are'} unavailable; only gates on the zero-float path control completion.`
                            : 'Every enabling condition is ready at its planned point, so no waiting is added.'}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 border-t pt-4 text-sm font-semibold text-foreground">
                    Which access condition is most often missing from your baseline?
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <article className="container mx-auto px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-14 text-lg leading-relaxed text-muted-foreground">
          <section className="mx-auto max-w-4xl">
            <h2 className="mb-4 text-3xl font-bold text-foreground">The visible late activity is often not the failed control</h2>
            <p>
              Installation is where the delay becomes visible: the crew waits, the crane stands, or the delivery is turned away. But the failure usually happened earlier. A road was described as “available” without a route survey. A platform date had no signed release criterion. Owner-supplied equipment had no named custody point. Temporary power existed somewhere on site, but not at the voltage, location or quality the test method required.
            </p>
            <p className="mt-4">
              None of those is background information. Each is an enabling activity with an owner, a required-by date, acceptance evidence and a successor. If the programme carries only the successor, it can be logically tidy and physically impossible.
            </p>
          </section>

          <blockquote className="mx-auto max-w-4xl border-l-4 border-primary pl-6 text-2xl font-semibold leading-relaxed text-foreground">
            If the programme cannot name who makes access true—and what evidence proves it—access is not planned. It is hoped for.
          </blockquote>

          <section>
            <div className="mb-6 max-w-4xl">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-amber-700 dark:text-amber-300">The causal model</p>
              <h2 className="mt-2 text-3xl font-bold text-foreground">Two branches converge before installation</h2>
              <p className="mt-3">
                The platform branch and the FIM branch run in parallel. Installation cannot begin until both finish. That is why a delay can consume float without moving completion—and why another delay can suddenly become critical.
              </p>
            </div>
            <LogicNetwork scenario={scenario} selected={selected} />
            <div className="mt-5 rounded-xl bg-slate-950 p-5 font-mono text-sm leading-relaxed text-slate-100">
              <p>Installation start = max(platform release, FIM receipt)</p>
              <p className="mt-1 text-amber-300">max(Day {platformRelease.finish}, Day {fimReceipt.finish}) = Day {mainInstallation.start}</p>
            </div>
          </section>

          <section className="grid gap-8 border-y py-10 md:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Read the orange before the black</h2>
              <p className="mt-4">
                The black bar is productive work. The hatched orange segment is time spent waiting for a condition that the baseline assumed would already be true. Treating both as one longer activity hides responsibility and makes recovery discussions less useful.
              </p>
            </div>
            <dl className="space-y-4 text-base">
              <div className="grid grid-cols-[130px_1fr] gap-4 border-b pb-3">
                <dt className="font-semibold text-foreground">Critical path</dt>
                <dd>{scenario.controllingPath.map(({ label }) => label).join(' → ')}</dd>
              </div>
              <div className="grid grid-cols-[130px_1fr] gap-4 border-b pb-3">
                <dt className="font-semibold text-foreground">Total float</dt>
                <dd>Time an activity can move without delaying project completion in the current scenario.</dd>
              </div>
              <div className="grid grid-cols-[130px_1fr] gap-4">
                <dt className="font-semibold text-foreground">Gate evidence</dt>
                <dd>The signed record, survey, inspection or test that releases the next activity—not an optimistic date.</dd>
              </div>
            </dl>
          </section>

          <section>
            <div className="mb-6 max-w-4xl">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-amber-700 dark:text-amber-300">From assumption to control</p>
              <h2 className="mt-2 text-3xl font-bold text-foreground">The workfront-readiness register belongs beside the programme</h2>
              <p className="mt-3">
                A planner cannot own every access condition. The planner can make the interface visible, connect it to the work and force a dated evidence conversation before the crew arrives.
              </p>
            </div>
            <div className="rounded-2xl border">
              <div className="divide-y md:hidden">
                {accessAssumptions.map((assumption) => (
                  <div key={assumption.id} className="space-y-3 p-4 text-sm">
                    <h3 className="font-bold text-foreground">{assumption.shortLabel}</h3>
                    <dl className="space-y-2">
                      <div>
                        <dt className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Owner</dt>
                        <dd>{assumption.owner}</dd>
                      </div>
                      <div>
                        <dt className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Acceptance evidence</dt>
                        <dd>{assumption.evidence}</dd>
                      </div>
                      <div>
                        <dt className="text-xs font-bold uppercase tracking-wide text-muted-foreground">If it is not ready</dt>
                        <dd>{readinessResponses[assumption.id]}</dd>
                      </div>
                    </dl>
                  </div>
                ))}
              </div>
              <Table className="hidden md:table">
                <TableHeader>
                  <TableRow className="bg-muted/60">
                    <TableHead className="min-w-48">Condition</TableHead>
                    <TableHead className="min-w-44">Owner</TableHead>
                    <TableHead className="min-w-64">Acceptance evidence</TableHead>
                    <TableHead className="min-w-72">If it is not ready</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {accessAssumptions.map((assumption) => (
                    <TableRow key={assumption.id}>
                      <TableCell className="whitespace-normal font-semibold text-foreground">{assumption.shortLabel}</TableCell>
                      <TableCell className="whitespace-normal">{assumption.owner}</TableCell>
                      <TableCell className="whitespace-normal">{assumption.evidence}</TableCell>
                      <TableCell className="whitespace-normal">{readinessResponses[assumption.id]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border p-6">
              <ShieldCheck className="h-7 w-7 text-primary" />
              <h2 className="mt-4 text-2xl font-bold text-foreground">Five questions for the baseline review</h2>
              <ol className="mt-4 list-decimal space-y-3 pl-5 text-base">
                <li>What physical condition releases this activity?</li>
                <li>Which party owns making that condition true?</li>
                <li>What document or inspection proves readiness?</li>
                <li>Is the gate linked with visible float and a real calendar?</li>
                <li>What dated record will support delay attribution later?</li>
              </ol>
            </div>
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6">
              <Info className="h-7 w-7 text-amber-700 dark:text-amber-300" />
              <h2 className="mt-4 text-2xl font-bold text-foreground">What this model cannot tell you</h2>
              <ul className="mt-4 list-disc space-y-3 pl-5 text-base">
                <li>It does not determine contractual entitlement, extension of time (EOT) or cost responsibility.</li>
                <li>It omits resources, weather, calendars, permits and productivity.</li>
                <li>The waiting periods are teaching inputs, not benchmark durations.</li>
                <li>A real baseline must be tested against the approved access, logistics, temporary-works and interface plans.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-3xl font-bold text-foreground">The procurement model changes who owns the gate</h2>
            <p className="max-w-4xl">
              Under a single EPC package, equipment availability, logistics and installation may sit behind one contractual interface. Under a free-issue-material strategy, the owner may control supply while the contractor controls receipt, preservation and installation. The programme still needs both sides of the handover: the owner&apos;s delivery obligation and the contractor&apos;s acceptance evidence.
            </p>
            <div className="mt-6 rounded-2xl border-2 border-primary/20 bg-primary/5 p-6 sm:p-8">
              <Badge variant="secondary">Companion playbook</Badge>
              <h3 className="mt-4 text-2xl font-bold text-foreground">FIM versus EPC: the one-page decision sheet</h3>
              <p className="mt-3 text-base">Compare control, interface load, logistics, warranties and schedule ownership before choosing a procurement model.</p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Button asChild><Link to="/blog/fim-vs-epc-decision-sheet">Open the decision sheet<ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
                <Button asChild variant="outline"><a href="/downloads/fim-vs-epc-decision-sheet.pdf" download><FileDown className="mr-2 h-4 w-4" />Download PDF</a></Button>
              </div>
            </div>
          </section>

          <p className="border-t pt-6 text-sm text-muted-foreground">
            <strong className="text-foreground">Further reading:</strong>{' '}
            <a
              className="font-medium text-primary underline underline-offset-4"
              href="https://www.gao.gov/products/gao-16-89g"
              target="_blank"
              rel="noreferrer"
            >
              GAO Schedule Assessment Guide
            </a>
          </p>

        </div>
      </article>
    </div>
  );
}
