import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, FileDown, Printer } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArticleHeader } from '@/components/article/ArticleHeader';

const decisionRows = [
  ['Commercial leverage', 'Owner can aggregate demand or negotiate directly.', 'Contractor can price and manage the complete supply chain.', 'Is the apparent saving still real after owner-side management and interface cost?'],
  ['Technical control', 'Owner needs direct influence over specification or supplier.', 'Performance responsibility should remain with one delivery party.', 'Who owns design integration and fitness for the complete system?'],
  ['Schedule', 'Long-lead release must start before the EPC package is ready.', 'One contractor can sequence procurement with construction.', 'Who carries late delivery, resequencing, storage and remobilisation exposure?'],
  ['Logistics and custody', 'Owner has the capability to manage transport and handover.', 'The contractor is better placed to manage door-to-workfront delivery.', 'Where do risk, title, inspection and care of materials transfer?'],
  ['Warranty', 'Supplier warranty can be administered without creating a gap.', 'A single point of responsibility is worth the embedded premium.', 'Who responds when equipment, installation and system performance overlap?'],
];

const controlRows = [
  ['Specification and interface data', 'Owner / supplier', 'EPC', 'Approved interface register'],
  ['Manufacture and factory quality', 'Owner / supplier', 'EPC', 'Inspection and test plan'],
  ['Transport to named handover point', 'Define explicitly', 'EPC', 'Incoterm, route and delivery plan'],
  ['Receipt, storage and preservation', 'Usually EPC after handover', 'EPC', 'Signed custody and preservation record'],
  ['Installation and integration', 'EPC', 'EPC', 'Method statement and design interface'],
  ['Defects and system performance', 'Split risk - close the gap', 'EPC', 'Back-to-back warranty and test matrix'],
];

const readinessChecks = [
  'Is there a named owner for supplier, design and construction interfaces?',
  'Can the owner manage expediting, inspection, logistics, customs, custody and preservation?',
  'Are delivery dates tied to an integrated programme with workable notice and recovery rules?',
  'Can equipment, installation and system-performance warranties be enforced without a gap?',
];

const decisionRecord = [
  ['Decision and approval date', 'FIM, EPC supply or a defined hybrid package'],
  ['Value case', 'Like-for-like evaluated cost, schedule benefit and strategic control'],
  ['Residual risk owner', 'A named party for every retained interface and failure mode'],
  ['Review trigger', 'Supplier, design, logistics, programme or market assumption changes'],
];

export function FIMvsEPCDecisionSheet() {
  return (
    <div className="flex w-full min-w-0 flex-col overflow-x-hidden">
      <Helmet>
        <title>FIM versus EPC Decision Sheet | Tech Made Easy</title>
        <meta name="description" content="A one-page procurement decision aid comparing free-issue materials with EPC supply across control, interfaces, logistics, schedule and warranty." />
        <link rel="canonical" href="https://techmadeeasy.info/blog/fim-vs-epc-decision-sheet/" />
      </Helmet>

      <div className="print:hidden"><ArticleHeader slug="fim-vs-epc-decision-sheet" kicker="One-page decision sheet" format="Printable A4 sheet" title="Free-issue materials versus EPC supply" summary="This sheet compares free-issue materials (FIM) with engineering, procurement and construction (EPC) supply. The price comparison is the easy part; the decision turns on who can manage the interfaces." /></div>
      <section className="border-b py-5 print:hidden"><div className="container mx-auto flex max-w-5xl flex-col gap-3 px-4 sm:flex-row sm:px-6 lg:px-8"><Button asChild><a href="/downloads/fim-vs-epc-decision-sheet.pdf" download><FileDown className="mr-2 h-4 w-4" />Download the one-page PDF</a></Button><Button variant="outline" onClick={() => window.print()}><Printer className="mr-2 h-4 w-4" />Print this page</Button></div></section>

      <article className="container mx-auto min-w-0 overflow-x-hidden px-4 py-12 sm:px-6 lg:px-8 print:px-0 print:py-0">
        <div className="mx-auto w-full min-w-0 max-w-6xl space-y-10">
          <div className="hidden print:block"><div className="text-3xl font-bold">FIM versus EPC - decision sheet</div><p className="mt-2 text-sm">A generic project-delivery aid by Tech Made Easy</p></div>

          <Card className="border-2 border-primary/20">
            <CardContent className="grid gap-6 p-6 md:grid-cols-3">
              <div><p className="text-sm font-semibold uppercase tracking-wide text-primary">Choose FIM when</p><p className="mt-2 text-muted-foreground">Direct control or early release creates more value than the interfaces the owner must absorb.</p></div>
              <div><p className="text-sm font-semibold uppercase tracking-wide text-primary">Choose EPC supply when</p><p className="mt-2 text-muted-foreground">Contract-backed integration, logistics and performance accountability are worth the contractor&apos;s premium.</p></div>
              <div><p className="text-sm font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">Do not decide on price alone</p><p className="mt-2 text-muted-foreground">Compare the whole delivery system: capability, custody, interfaces, delay exposure and warranty response.</p></div>
            </CardContent>
          </Card>

          <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <h2 className="text-2xl font-bold">First, define what is actually being compared</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Under FIM, the owner buys specified equipment and issues it to the installing contractor at a defined handover point. Under EPC supply, the contractor procures and integrates that equipment within its package. Neither label allocates risk by itself: the contract, technical schedules and responsibility matrix do.
              </p>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                A hybrid can be valid, but only when every boundary is explicit. “Owner selected” is not the same as “owner supplied”, and EPC supply is not single-point responsibility unless the contractor accepts the relevant design, delivery, integration and performance obligations.
              </p>
            </div>

            <Card className="border-amber-300/70 bg-amber-50/60 dark:border-amber-700/60 dark:bg-amber-950/20">
              <CardContent className="p-6">
                <p className="text-sm font-semibold uppercase tracking-wide text-amber-800 dark:text-amber-300">Readiness gate</p>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {readinessChecks.map((check) => <li key={check} className="flex gap-2"><span aria-hidden="true" className="font-bold text-amber-700 dark:text-amber-300">□</span><span>{check}</span></li>)}
                </ul>
                <p className="mt-4 text-sm font-semibold text-foreground">If any answer is no, use EPC supply as the starting point or close the capability gap before approving FIM.</p>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold">Five questions before the package decision</h2>
            <p className="mb-3 text-sm text-muted-foreground sm:hidden">Swipe the table to compare EPC supply and the decision question →</p>
            <div className="w-full min-w-0 max-w-full overflow-x-auto rounded-xl border">
              <table className="w-full min-w-[900px] border-collapse text-sm">
                <thead className="bg-muted"><tr><th className="p-3 text-left">Decision</th><th className="p-3 text-left">FIM is stronger when</th><th className="p-3 text-left">EPC supply is stronger when</th><th className="p-3 text-left">Question that must be answered</th></tr></thead>
                <tbody>{decisionRows.map((row) => <tr key={row[0]} className="border-t align-top">{row.map((cell, index) => <td key={`${row[0]}-${index}`} className={`p-3 ${index === 0 ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>{cell}</td>)}</tr>)}</tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold">Minimum interface controls</h2>
            <p className="mb-3 text-sm text-muted-foreground sm:hidden">Swipe the table to see the full allocation and required evidence →</p>
            <div className="w-full min-w-0 max-w-full overflow-x-auto rounded-xl border">
              <table className="w-full min-w-[760px] border-collapse text-sm">
                <thead className="bg-muted"><tr><th className="p-3 text-left">Interface</th><th className="p-3 text-left">Typical FIM starting point</th><th className="p-3 text-left">Typical EPC starting point</th><th className="p-3 text-left">Evidence required</th></tr></thead>
                <tbody>{controlRows.map((row) => <tr key={row[0]} className="border-t align-top">{row.map((cell, index) => <td key={`${row[0]}-${index}`} className={`p-3 ${index === 0 ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>{cell}</td>)}</tr>)}</tbody>
              </table>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <p className="text-sm font-semibold uppercase tracking-wide text-primary">Compare like with like</p>
                <h2 className="mt-2 text-2xl font-bold">Total evaluated FIM cost</h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  Supplier price + owner procurement and engineering + inspection and expediting + freight, customs and insurance + receipt, storage and preservation + interface management + financing and tax effects + quantified schedule and warranty exposure.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Compare this with the EPC evaluated price on the same scope, schedule, currency, tax, exclusions and risk basis. Treat contingency as visible retained risk, not as proof that the risk has disappeared.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <p className="text-sm font-semibold uppercase tracking-wide text-primary">Make it auditable</p>
                <h2 className="mt-2 text-2xl font-bold">Decision record</h2>
                <dl className="mt-3 divide-y">
                  {decisionRecord.map(([term, description]) => (
                    <div key={term} className="grid gap-1 py-3 sm:grid-cols-[10rem_1fr]">
                      <dt className="font-semibold text-foreground">{term}</dt>
                      <dd className="text-sm text-muted-foreground">{description}</dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
            </Card>
          </section>

          <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center print:hidden">
            <div><h2 className="text-2xl font-bold">See why the handover belongs in the programme</h2><p className="mt-2 text-muted-foreground">The companion interactive shows what happens when material custody is treated as an assumption instead of a predecessor.</p></div>
            <Button asChild><Link to="/blog/access-was-assumed">Open Access Was Assumed<ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
          </div>

          <div className="rounded-xl border bg-muted/30 p-5 text-sm leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Professional-judgment note:</strong> This sheet is a generic decision aid, not legal, procurement or project-specific advice. “Typical” allocations are only a starting point. The executed contracts, technical schedules, Incoterms, insurance, warranty structure and responsibility matrix control the actual allocation.
          </div>

          <section className="print:hidden">
            <h2 className="text-2xl font-bold">Further reading</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><a className="font-medium text-primary underline-offset-4 hover:underline" href="https://www.worldbank.org/en/projects-operations/products-and-services/brief/procurement-new-framework" target="_blank" rel="noreferrer">World Bank Procurement Framework</a> — fit-for-purpose procurement and value for money.</li>
              <li><a className="font-medium text-primary underline-offset-4 hover:underline" href="https://iccwbo.org/business-solutions/incoterms-rules/" target="_blank" rel="noreferrer">ICC Incoterms rules</a> — the tasks, costs and risks attached to delivery terms.</li>
            </ul>
          </section>

          <div className="flex flex-wrap gap-3 print:hidden">
            <Button asChild variant="outline"><Link to="/blog/fim-implementation-roadmap">Read the FIM implementation roadmap</Link></Button>
            <Button asChild variant="outline"><Link to="/blog/matrix-of-responsibility-between-packages-for-offshore-wind">See a package responsibility matrix</Link></Button>
          </div>
        </div>
      </article>
    </div>
  );
}
