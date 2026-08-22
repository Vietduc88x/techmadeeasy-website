import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, Filter, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { describePost, getLibraryCategories, getLibraryPosts } from '@/data/playbookJourney';

export function Blog() {
  const [libraryMode, setLibraryMode] = useState('playbooks');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const categories = getLibraryCategories(libraryMode);

  const changeMode = (mode) => {
    setLibraryMode(mode);
    setSelectedCategory('All');
  };

  const filteredPosts = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();
    const filtered = getLibraryPosts(libraryMode).filter((post) => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch = !normalizedSearch
        || post.title.toLowerCase().includes(normalizedSearch)
        || post.excerpt.toLowerCase().includes(normalizedSearch)
        || post.tags?.some((tag) => tag.toLowerCase().includes(normalizedSearch));
      return matchesCategory && matchesSearch;
    });

    return filtered.sort((a, b) => b.dateSort.localeCompare(a.dateSort));
  }, [libraryMode, searchQuery, selectedCategory]);

  return (
    <div className="flex min-h-screen flex-col">
      <Helmet>
        <title>Notes | Tech Made Easy</title>
        <meta name="description" content="Notes from Duc Hoang, PMP on preconstruction, constructability, contracts, packages, cost and schedule in energy project delivery." />
        <link rel="canonical" href="https://techmadeeasy.info/blog/" />
      </Helmet>

      <section className="border-b bg-[#f5f2eb] py-12 text-slate-950 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-black uppercase tracking-[.2em] text-amber-700">Notes and small tools</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Energy project delivery</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-700">Mostly preconstruction, constructability, contracts, packages, cost and schedule&mdash;written from the questions that come up while doing the work.</p>
          <div className="relative mx-auto mt-7 max-w-xl text-left">
            <Label htmlFor="notes-search" className="sr-only">Search notes</Label>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"/>
            <Input id="notes-search" type="search" placeholder="Search decisions, topics or tags" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} className="min-h-12 border-slate-300 bg-white pl-11 text-base"/>
          </div>
        </div></div>
      </section>

      <section className="border-b bg-background py-5" aria-label="Notes library controls"><div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="inline-flex w-full rounded-xl border bg-muted/30 p-1 sm:w-auto" aria-label="Choose library">
              <button type="button" aria-pressed={libraryMode === 'playbooks'} onClick={() => changeMode('playbooks')} className={`min-h-11 flex-1 rounded-lg px-4 text-sm font-bold transition sm:flex-none ${libraryMode === 'playbooks' ? 'bg-foreground text-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>Project notes</button>
              <button type="button" aria-pressed={libraryMode === 'off-site'} onClick={() => changeMode('off-site')} className={`min-h-11 flex-1 rounded-lg px-4 text-sm font-bold transition sm:flex-none ${libraryMode === 'off-site' ? 'bg-foreground text-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>Off-site notes</button>
            </div>
          </div>

          <div className="md:hidden"><Label htmlFor="notes-category-mobile" className="mb-1 block text-xs font-bold text-muted-foreground">Filter by topic</Label><select id="notes-category-mobile" value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)} className="min-h-11 w-full rounded-md border bg-background px-3 text-sm">{categories.map(({ name, count }) => <option key={name} value={name}>{name} ({count})</option>)}</select></div>
          <div className="hidden flex-wrap gap-2 md:flex" aria-label="Filter by topic">{categories.map(({ name, count }) => <button key={name} type="button" aria-pressed={selectedCategory === name} onClick={() => setSelectedCategory(name)} className={`min-h-10 rounded-full border px-4 text-sm font-semibold transition ${selectedCategory === name ? 'border-foreground bg-foreground text-background' : 'bg-background text-muted-foreground hover:border-foreground hover:text-foreground'}`}>{name} ({count})</button>)}</div>
          <p className="text-sm text-muted-foreground" aria-live="polite">Showing {filteredPosts.length} {libraryMode === 'playbooks' ? 'project note' : 'off-site note'}{filteredPosts.length === 1 ? '' : 's'}{selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}{searchQuery ? ` matching “${searchQuery}”` : ''}</p>
        </div>
      </div></section>

      <section className="flex-1 py-12 sm:py-16"><div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-7 flex items-center gap-3"><h2 className="text-3xl font-black">{libraryMode === 'playbooks' ? 'All project notes' : 'Off-site notes'}</h2><Badge variant="secondary">{filteredPosts.length}</Badge></div>
        {filteredPosts.length > 0 ? <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">{filteredPosts.map((post) => <PostCard key={post.slug} post={post}/>)}</div> : <div className="rounded-2xl border py-16 text-center"><Filter className="mx-auto h-10 w-10 text-muted-foreground"/><h3 className="mt-4 text-xl font-bold">No matching notes</h3><p className="mt-2 text-muted-foreground">Try another topic or clear the search.</p><Button type="button" variant="outline" className="mt-5" onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}>Clear filters</Button></div>}
      </div></section>
    </div>
  );
}

function PostCard({ post }) {
  const detail = describePost(post);
  return (
    <Card className="group flex flex-col transition hover:border-slate-400">
      <div>
        <CardHeader><div className="flex flex-wrap items-center justify-between gap-2"><Badge variant="secondary">{post.category}</Badge><span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{detail.format}</span></div><CardTitle className="mt-3 text-xl leading-tight"><Link to={post.legacyPath || `/blog/${post.slug}`} reloadDocument={Boolean(post.legacyPath)} className="hover:text-primary">{post.title}</Link></CardTitle><div className="flex flex-wrap gap-4 text-sm text-muted-foreground"><span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5"/>{post.date}</span><span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5"/>{post.readTime}</span></div></CardHeader>
        <CardContent><p className="text-xs font-semibold text-muted-foreground">The question</p><CardDescription className="mt-2 text-base leading-7">{detail.decision}</CardDescription></CardContent>
      </div>
      <CardContent className="mt-auto"><Link to={post.legacyPath || `/blog/${post.slug}`} reloadDocument={Boolean(post.legacyPath)} aria-label={`Read ${post.title}`} className="inline-flex items-center text-sm font-semibold hover:text-primary">Read note<ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1"/></Link></CardContent>
    </Card>
  );
}
