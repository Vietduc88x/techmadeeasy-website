import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  FileDown,
  RotateCcw,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  accessAssumptions,
  baselineAccessState,
  calculateAccessScenario,
} from '@/data/accessWasAssumed';

const MAX_DISPLAY_DAY = 40;

function AssumptionToggle({ assumption, available, onToggle }) {
  return (
    <button
      type="button"
      aria-pressed={available}
      onClick={onToggle}
      className={`w-full rounded-xl border p-4 text-left transition-all ${
        available
          ? 'border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-500/60'
          : 'border-amber-500/50 bg-amber-500/10 hover:border-amber-500'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-foreground">{assumption.label}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{assumption.question}</p>
        </div>
        <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
          available
            ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
            : 'bg-amber-500/20 text-amber-800 dark:text-amber-200'
        }`}>
          {available ? 'Available' : `+${assumption.delayDays}d gate`}
        </span>
      </div>
    </button>
  );
}

function ScheduleBar({ activity, maxDay }) {
  const left = (activity.start / maxDay) * 100;
  const width = Math.max((activity.duration / maxDay) * 100, 4);
  const delayed = activity.gateDelay > 0;

  return (
    <div className="grid gap-2 border-b border-border/60 py-3 last:border-0 md:grid-cols-[190px_1fr] md:items-center">
      <div>
        <p className="text-sm font-medium text-foreground">{activity.label}</p>
        <p className="text-xs text-muted-foreground">Day {activity.start} to {activity.finish}</p>
      </div>
      <div
        className="relative h-9 overflow-hidden rounded-md border bg-muted/50"
        style={{
          backgroundImage: 'repeating-linear-gradient(to right, transparent 0, transparent calc(12.5% - 1px), hsl(var(--border)) calc(12.5% - 1px), hsl(var(--border)) 12.5%)',
        }}
      >
        <div
          className={`absolute inset-y-1 rounded px-2 text-xs font-semibold leading-7 text-white shadow-sm ${
            delayed ? 'bg-amber-600' : 'bg-primary'
          }`}
          style={{ left: `${left}%`, width: `${width}%` }}
          title={`${activity.label}: day ${activity.start} to ${activity.finish}`}
        >
          <span className="hidden sm:inline">{activity.duration}d</span>
        </div>
      </div>
    </div>
  );
}

export function AccessWasAssumed() {
  const [selected, setSelected] = useState(baselineAccessState);
  const scenario = useMemo(() => calculateAccessScenario(selected), [selected]);
  const maxDay = Math.max(MAX_DISPLAY_DAY, scenario.completionDay + 2);

  const toggle = (id) => {
    setSelected((current) => ({ ...current, [id]: !current[id] }));
  };

  return (
    <div className="flex flex-col">
      <Helmet>
        <title>Access Was Assumed | Tech Made Easy</title>
        <meta name="description" content="An interactive preconstruction field note: switch off hidden access assumptions and watch a simple construction sequence move." />
        <link rel="canonical" href="https://techmadeeasy.info/blog/access-was-assumed" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Access Was Assumed" />
        <meta property="og:description" content="The activity is not late. The access assumption is false." />
      </Helmet>

      <section className="border-b bg-gradient-to-br from-amber-500/10 via-background to-primary/5 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <Button asChild variant="ghost" className="mb-6">
              <Link to="/blog"><ArrowLeft className="mr-2 h-4 w-4" />Back to Blog</Link>
            </Button>
            <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <Badge>Before the Spade</Badge>
              <Badge variant="secondary">Preconstruction</Badge>
              <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />August 2026</span>
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" />10 min read + tool</span>
            </div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-300">
              One lie in the programme
            </p>
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-foreground lg:text-6xl">
              Access Was Assumed
            </h1>
            <p className="mt-6 max-w-3xl text-xl leading-relaxed text-muted-foreground">
              The activity is not late. The access assumption is false. Switch off the conditions below and watch a simple construction sequence tell the truth.
            </p>
            <p className="mt-6 text-sm text-muted-foreground">By Duc Hoang, PMP</p>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[360px_1fr]">
            <div className="space-y-3">
              <div className="mb-5">
                <h2 className="text-2xl font-bold text-foreground">Test the assumptions</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Click any condition to make it unavailable. Gate durations are illustrative and are not a forecast for a real project.
                </p>
              </div>
              {accessAssumptions.map((assumption) => (
                <AssumptionToggle
                  key={assumption.id}
                  assumption={assumption}
                  available={selected[assumption.id]}
                  onToggle={() => toggle(assumption.id)}
                />
              ))}
              <Button variant="outline" className="w-full" onClick={() => setSelected(baselineAccessState)}>
                <RotateCcw className="mr-2 h-4 w-4" />Reset baseline
              </Button>
            </div>

            <Card className="overflow-hidden border-2">
              <CardHeader className="border-b bg-muted/30">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Illustrative completion</p>
                    <CardTitle className="mt-1 text-4xl">Day {scenario.completionDay}</CardTitle>
                  </div>
                  <div className={`rounded-lg px-4 py-2 text-sm font-semibold ${
                    scenario.deltaDays
                      ? 'bg-amber-500/15 text-amber-800 dark:text-amber-200'
                      : 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
                  }`}>
                    {scenario.deltaDays ? `+${scenario.deltaDays} days vs baseline` : 'Baseline sequence'}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="mb-2 hidden grid-cols-9 pl-[190px] text-xs text-muted-foreground md:grid">
                  {[0, 5, 10, 15, 20, 25, 30, 35, 40].map((day) => <span key={day}>D{day}</span>)}
                </div>
                {scenario.activities.map((activity) => (
                  <ScheduleBar key={activity.id} activity={activity} maxDay={maxDay} />
                ))}
                <div className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
                  <div className="flex gap-3">
                    <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                    <div>
                      <p className="font-semibold text-foreground">
                        {scenario.unavailableCount
                          ? `${scenario.unavailableCount} assumed condition${scenario.unavailableCount === 1 ? '' : 's'} now controls the sequence.`
                          : 'The baseline only works while every enabling condition remains true.'}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        Delays are not simply additive. Parallel work may absorb some waiting, while one gate can move every downstream activity. That is why access belongs in the logic, not in a note under the programme.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <article className="container mx-auto px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-10 text-lg leading-relaxed text-muted-foreground">
          <section>
            <h2 className="mb-4 text-3xl font-bold text-foreground">A programme can be logically correct and physically impossible</h2>
            <p>
              A construction schedule usually shows the work we intend to perform. It often does not show the conditions that allow the work to begin: a road that can carry the delivery, a platform released for the planned equipment, temporary power at the required point, or owner-supplied material accepted into the contractor&apos;s custody.
            </p>
            <p className="mt-4">
              When one of those conditions is missing, the visible activity receives the delay. The installation team looks late. The planner is asked to recover. The real failure happened earlier, when an enabling condition was treated as background rather than scope.
            </p>
          </section>

          <blockquote className="border-l-4 border-primary pl-6 text-2xl font-semibold leading-relaxed text-foreground">
            If the programme cannot name who makes access true, access is not planned. It is hoped for.
          </blockquote>

          <section>
            <h2 className="mb-4 text-3xl font-bold text-foreground">Put enabling conditions into the delivery architecture</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                ['Name the condition', 'Replace “site available” with the specific road, platform, laydown, lifting, utility or custody condition the task needs.'],
                ['Assign one owner', 'The party performing the work is not automatically the party responsible for making the workfront available.'],
                ['Define acceptance', 'Use a survey, certificate, inspection record, permit or signed handover—not an optimistic date—to release the activity.'],
                ['Link it in the logic', 'The enabling condition should be a predecessor with visible float and consequences, not a line in the assumptions register.'],
              ].map(([title, copy]) => (
                <Card key={title}>
                  <CardContent className="p-5">
                    <div className="flex gap-3">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                      <div><h3 className="font-bold text-foreground">{title}</h3><p className="mt-1 text-base">{copy}</p></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-3xl font-bold text-foreground">The procurement model changes the access question</h2>
            <p>
              Under a single EPC package, equipment availability, logistics and installation may sit behind one contractual interface. Under a free-issue-material strategy, the owner may control supply while the contractor controls receipt, storage and installation. The schedule must show the custody and information handovers between them.
            </p>
            <div className="mt-6 rounded-2xl border-2 border-primary/20 bg-primary/5 p-6 sm:p-8">
              <Badge variant="secondary">Companion playbook</Badge>
              <h3 className="mt-4 text-2xl font-bold text-foreground">FIM versus EPC: the one-page decision sheet</h3>
              <p className="mt-3 text-base">
                Compare control, interface load, logistics, warranties and schedule ownership before choosing a procurement model.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Button asChild><Link to="/blog/fim-vs-epc-decision-sheet">Open the decision sheet<ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
                <Button asChild variant="outline"><a href="/downloads/fim-vs-epc-decision-sheet.pdf" download><FileDown className="mr-2 h-4 w-4" />Download PDF</a></Button>
              </div>
            </div>
          </section>

          <section className="border-t pt-8 text-sm">
            <p><strong className="text-foreground">Method note:</strong> This is a generic teaching model, not a client programme or a prediction. Gate durations are intentionally illustrative. A real baseline should use the project&apos;s approved scope, access plan, logistics study, responsibility matrix and acceptance evidence.</p>
          </section>
        </div>
      </article>
    </div>
  );
}
