import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const emailHref = `mailto:re.hoangvietduc@gmail.com?subject=${encodeURIComponent('Tech Made Easy conversation')}`;

export function About() {
  return (
    <div className="flex flex-col">
      <Helmet>
        <title>About Duc Hoang, PMP | Tech Made Easy</title>
        <meta name="description" content="About Duc Hoang, PMP, the field notes behind Tech Made Easy, and how to get in touch." />
        <link rel="canonical" href="https://techmadeeasy.info/about/" />
      </Helmet>

      <section className="border-b bg-[#f5f2eb] py-14 text-slate-950 sm:py-20">
        <div className="container mx-auto grid max-w-5xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_20rem] lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[.2em] text-amber-700">About</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">Field notes from an energy project manager</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">I&rsquo;m Duc Hoang, PMP. I work across solar, battery storage, onshore and nearshore wind, and floating solar&mdash;mainly on the decisions made before construction: planning, constructability, packages, cost and contracts.</p>
            <p className="mt-4 max-w-3xl leading-7 text-slate-700">Tech Made Easy is where I turn recurring delivery problems into practical field notes, decision sheets and small interactive models.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild><Link to="/blog">Browse the notes<ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
              <Button asChild variant="outline"><a href="#contact"><Mail className="mr-2 h-4 w-4" />Get in touch</a></Button>
            </div>
          </div>
          <div className="mx-auto w-full max-w-xs">
            <img src="/images/duc-hoang.jpg" alt="Duc Hoang, PMP" className="aspect-square w-full rounded-2xl border-4 border-white object-cover shadow-xl" />
            <p className="mt-3 text-center text-sm font-semibold text-slate-700">Duc Hoang, PMP &middot; Vietnam</p>
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-20 border-b bg-background py-14 sm:py-20">
        <div className="container mx-auto grid max-w-5xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.15fr_.85fr] lg:gap-20 lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[.2em] text-amber-700">Contact</p>
            <h2 className="mt-4 max-w-2xl text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">If something here connects with your work</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">If you are working through a question about constructability, packages, cost or programme logic, feel free to send a note.</p>
            <p className="mt-4 max-w-2xl leading-7 text-slate-600">A little context helps: the plant type, the decision being made and what has already been tried.</p>
          </div>

          <div className="border-t border-slate-300 pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-1">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.16em] text-slate-500">Email</p>
              <a href={emailHref} className="mt-2 inline-flex items-center font-bold text-slate-950 underline decoration-slate-400 underline-offset-4 hover:decoration-slate-950">
                <Mail className="mr-2 h-4 w-4" />Email Duc
              </a>
              <p className="mt-2 text-sm leading-6 text-slate-600">Opens in your mail application. The site does not collect your message.</p>
            </div>
            <div className="mt-7 border-t border-slate-200 pt-6">
              <p className="text-xs font-bold uppercase tracking-[.16em] text-slate-500">LinkedIn</p>
              <a href="https://www.linkedin.com/in/hoang-vietduc-pmp%C2%AE-100842aa/" target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center font-bold text-slate-950 underline decoration-slate-400 underline-offset-4 hover:decoration-slate-950">
                <Linkedin className="mr-2 h-4 w-4" />Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
