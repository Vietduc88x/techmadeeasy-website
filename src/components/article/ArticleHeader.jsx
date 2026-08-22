import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import { blogPostsBySlug } from '@/data/posts';

export function ArticleHeader({ slug, title, summary, kicker, format }) {
  const post = blogPostsBySlug[slug] || {};
  const resolvedTitle = title || post.title || 'Field note';
  const resolvedSummary = summary || post.excerpt;
  const canonical = `https://techmadeeasy.info/blog/${slug}/`;
  const socialImage = post.socialImage || 'https://techmadeeasy.info/og-image.jpg';
  const publishedDate = /^\d{4}-\d{2}-\d{2}$/.test(post.dateSort || '')
    ? post.dateSort
    : `${post.dateSort || '2026-01'}-01`;

  return (
    <header className="border-b bg-[#f5f2eb] text-slate-950">
      <Helmet>
        <meta property="og:type" content="article" />
        <meta property="og:title" content={resolvedTitle} />
        <meta property="og:description" content={resolvedSummary || resolvedTitle} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={socialImage} />
        <meta property="og:image:alt" content={`${resolvedTitle} — Tech Made Easy`} />
        <meta property="article:published_time" content={publishedDate} />
        <meta property="article:author" content="Duc Hoang" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={socialImage} />
      </Helmet>
      <div className="container mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <Link to="/blog/" className="inline-flex items-center text-sm font-semibold text-slate-600 hover:text-slate-950"><ArrowLeft className="mr-2 h-4 w-4" />All notes</Link>
        <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-slate-600">
          <span className="font-bold text-slate-900">{post.category || 'Field note'}</span>
          {post.date && <><span aria-hidden="true">·</span><span>{post.date}</span></>}
          {post.readTime && <><span aria-hidden="true">·</span><span>{post.readTime}</span></>}
          {format && <><span aria-hidden="true">·</span><span>{format}</span></>}
        </div>
        {kicker && <p className="mt-7 text-sm font-black uppercase tracking-[.18em] text-amber-700">{kicker}</p>}
        <h1 className={`${kicker ? 'mt-3' : 'mt-7'} max-w-4xl text-4xl font-black leading-[1.06] tracking-tight sm:text-5xl`}>{resolvedTitle}</h1>
        {resolvedSummary && <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700 sm:text-xl">{resolvedSummary}</p>}
        <p className="mt-7 text-sm text-slate-600">Duc Hoang, PMP</p>
      </div>
    </header>
  );
}
