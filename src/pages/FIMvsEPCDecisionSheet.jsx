import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, FileDown, Printer } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

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

export function FIMvsEPCDecisionSheet() {
  return (
    <div className="flex flex-col">
      <Helmet>
        <title>FIM versus EPC Decision Sheet | Tech Made Easy</title>
        <meta name="description" content="A one-page procurement decision aid comparing free-issue materials with EPC supply across control, interfaces, logistics, schedule and warranty." />
        <link rel="canonical" href="https://techmadeeasy.info/blog/fim-vs-epc-decision-sheet" />
      </Helmet>

      <section className="border-b bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-14 print:hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <Button asChild variant="ghost" className="mb-6"><Link to="/blog"><ArrowLeft className="mr-2 h-4 w-4" />Back to Blog</Link></Button>
            <div className="mb-5 flex flex-wrap gap-2"><Badge>Before the Spade</Badge><Badge variant="secondary">Contracts &amp; Packages</Badge><Badge variant="outline">Printable one-pager</Badge></div>
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight lg:text-6xl">FIM versus EPC</h1>
            <p className="mt-5 max-w-3xl text-xl leading-relaxed text-muted-foreground">
              The price comparison is the easy part. The decision turns on who can actually manage the interfaces created by taking supply away from the EPC contractor.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild><a href="/downloads/fim-vs-epc-decision-sheet.pdf" download><FileDown className="mr-2 h-4 w-4" />Download the one-page PDF</a></Button>
              <Button variant="outline" onClick={() => window.print()}><Printer className="mr-2 h-4 w-4" />Print this page</Button>
            </div>
          </div>
        </div>
      </section>

      <article className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 print:px-0 print:py-0">
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="hidden print:block"><h1 className="text-3xl font-bold">FIM versus EPC - decision sheet</h1><p className="mt-2 text-sm">A generic project-delivery aid by Tech Made Easy</p></div>

          <Card className="border-2 border-primary/20">
            <CardContent className="grid gap-6 p-6 md:grid-cols-3">
              <div><p className="text-sm font-semibold uppercase tracking-wide text-primary">Choose FIM when</p><p className="mt-2 text-muted-foreground">Direct control or early release creates more value than the interfaces the owner must absorb.</p></div>
              <div><p className="text-sm font-semibold uppercase tracking-wide text-primary">Choose EPC supply when</p><p className="mt-2 text-muted-foreground">Single-point integration, logistics and performance accountability are worth the contractor&apos;s premium.</p></div>
              <div><p className="text-sm font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">Do not decide on price alone</p><p className="mt-2 text-muted-foreground">Compare the whole delivery system: capability, custody, interfaces, delay exposure and warranty response.</p></div>
            </CardContent>
          </Card>

          <section>
            <h2 className="mb-4 text-2xl font-bold">Five questions before the package decision</h2>
            <div className="overflow-x-auto rounded-xl border">
              <table className="w-full min-w-[900px] border-collapse text-sm">
                <thead className="bg-muted"><tr><th className="p-3 text-left">Decision</th><th className="p-3 text-left">FIM is stronger when</th><th className="p-3 text-left">EPC supply is stronger when</th><th className="p-3 text-left">Question that must be answered</th></tr></thead>
                <tbody>{decisionRows.map((row) => <tr key={row[0]} className="border-t align-top">{row.map((cell, index) => <td key={cell} className={`p-3 ${index === 0 ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>{cell}</td>)}</tr>)}</tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold">Minimum interface controls</h2>
            <div className="overflow-x-auto rounded-xl border">
              <table className="w-full min-w-[760px] border-collapse text-sm">
                <thead className="bg-muted"><tr><th className="p-3 text-left">Interface</th><th className="p-3 text-left">Typical FIM starting point</th><th className="p-3 text-left">Typical EPC starting point</th><th className="p-3 text-left">Evidence required</th></tr></thead>
                <tbody>{controlRows.map((row) => <tr key={row[0]} className="border-t align-top">{row.map((cell, index) => <td key={cell} className={`p-3 ${index === 0 ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>{cell}</td>)}</tr>)}</tbody>
              </table>
            </div>
          </section>

          <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center print:hidden">
            <div><h2 className="text-2xl font-bold">See why the handover belongs in the programme</h2><p className="mt-2 text-muted-foreground">The companion interactive shows what happens when material custody is treated as an assumption instead of a predecessor.</p></div>
            <Button asChild><Link to="/blog/access-was-assumed">Open Access Was Assumed<ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
          </div>

          <div className="rounded-xl border bg-muted/30 p-5 text-sm leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Professional-judgment note:</strong> This sheet is a generic decision aid, not legal, procurement or project-specific advice. “Typical” allocations are only a starting point. The executed contracts, technical schedules, Incoterms, insurance, warranty structure and responsibility matrix control the actual allocation.
          </div>

          <div className="flex flex-wrap gap-3 print:hidden">
            <Button asChild variant="outline"><Link to="/blog/fim-implementation-roadmap">Read the FIM implementation roadmap</Link></Button>
            <Button asChild variant="outline"><Link to="/blog/matrix-of-responsibility-between-packages-for-offshore-wind">See a package responsibility matrix</Link></Button>
          </div>
        </div>
      </article>
    </div>
  );
}
