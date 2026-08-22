import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { blogPosts } from '@/data/posts';
import { describePost, getStartHerePosts, START_HERE_SLUGS } from '@/data/playbookJourney';

function NoteRow({ post, index }) {
  const detail = describePost(post);
  return (
    <li>
      <Link to={`/blog/${post.slug}`} className="group grid gap-3 py-6 sm:grid-cols-[3rem_1fr_auto] sm:items-start">
        <span className="font-mono text-sm font-bold text-muted-foreground">0{index + 1}</span>
        <span>
          <span className="text-xs font-semibold uppercase tracking-[.14em] text-muted-foreground">{detail.format}</span>
          <strong className="mt-1 block text-xl leading-7 group-hover:text-primary">{post.title}</strong>
          <span className="mt-2 block max-w-3xl text-sm leading-6 text-muted-foreground">{detail.decision}</span>
        </span>
        <ArrowRight className="mt-1 hidden h-5 w-5 transition group-hover:translate-x-1 sm:block" />
      </Link>
    </li>
  );
}

export function Home() {
  const selected = getStartHerePosts();
  const recent = blogPosts
    .filter(({ slug, category }) => category !== 'Off-site' && !START_HERE_SLUGS.includes(slug))
    .slice(0, 5);

  return (
    <div className="flex flex-col">
      <Helmet>
        <title>Tech Made Easy — Notes from energy project delivery</title>
        <meta name="description" content="Notes from Duc Hoang, PMP on preconstruction, constructability, packages, cost and schedule in renewable-energy delivery." />
        <link rel="canonical" href="https://techmadeeasy.info/" />
      </Helmet>

      <section className="border-b bg-[#f5f2eb] py-16 text-slate-950 sm:py-24">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[.2em] text-amber-700">Tech Made Easy</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl">Notes from working on energy projects.</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-700 sm:text-xl">I&rsquo;m Duc Hoang, PMP. I write about the assumptions, interfaces and field decisions behind preconstruction, constructability, packages, cost and schedule.</p>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
            <Link to="/blog/" className="inline-flex items-center underline decoration-slate-400 underline-offset-4 hover:decoration-slate-950">All notes<ArrowRight className="ml-2 h-4 w-4" /></Link>
            <Link to="/about/" className="underline decoration-slate-400 underline-offset-4 hover:decoration-slate-950">About Duc</Link>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20" aria-labelledby="selected-notes-title">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-muted-foreground">Selected notes</p>
            <h2 id="selected-notes-title" className="mt-2 text-3xl font-black tracking-tight">A practical place to begin</h2>
            <p className="mt-3 leading-7 text-muted-foreground">A programme assumption, a physical route and a package boundary—the same delivery problem seen from three sides.</p>
          </div>
          <ol className="mt-8 divide-y border-y">{selected.map((post, index) => <NoteRow key={post.slug} post={post} index={index} />)}</ol>
        </div>
      </section>

      <section className="border-t bg-muted/25 py-14 sm:py-20" aria-labelledby="recent-notes-title">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-5">
            <div><p className="text-sm font-semibold text-muted-foreground">Recent notes</p><h2 id="recent-notes-title" className="mt-2 text-3xl font-black tracking-tight">Recently published</h2></div>
            <Link to="/blog/" className="hidden items-center text-sm font-semibold sm:inline-flex">See all<ArrowRight className="ml-2 h-4 w-4" /></Link>
          </div>
          <ol className="mt-8 divide-y border-y">{recent.map((post, index) => <NoteRow key={post.slug} post={post} index={index} />)}</ol>
          <Link to="/blog/" className="mt-6 inline-flex items-center text-sm font-semibold sm:hidden">See all notes<ArrowRight className="ml-2 h-4 w-4" /></Link>
        </div>
      </section>
    </div>
  );
}
