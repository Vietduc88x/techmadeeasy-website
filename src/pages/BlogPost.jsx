import React, { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArticleHeader } from '@/components/article/ArticleHeader';
import { ArticleEnding } from '@/components/article/ArticleEnding';
import { blogPosts as allPosts, blogPostsBySlug } from '@/data/posts';

const OffshoreWindGuide = lazy(() => import('../components/OffshoreWindGuide.jsx'));
const OffshoreWindFarmApp = lazy(() => import('./offshore-wind-farm/App.jsx'));
const BachDangBattleApp = lazy(() => import('./bach-dang-battle/App.jsx'));

const markdownComponents = {
  h1: ({ children }) => <h2 className="mb-5 mt-12 text-3xl font-black tracking-tight text-foreground sm:text-4xl">{children}</h2>,
  h2: ({ children }) => <h2 className="mb-4 mt-12 text-3xl font-black tracking-tight text-foreground">{children}</h2>,
  h3: ({ children }) => <h3 className="mb-3 mt-9 text-2xl font-bold text-foreground">{children}</h3>,
  h4: ({ children }) => <h4 className="mb-2 mt-7 text-xl font-bold text-foreground">{children}</h4>,
  p: ({ children }) => <p className="mb-5 text-[1.05rem] leading-8 text-slate-700 dark:text-slate-300">{children}</p>,
  a: ({ href, children }) => <a href={href} className="font-medium text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary" target="_blank" rel="noopener noreferrer">{children}</a>,
  strong: ({ children }) => <strong className="font-bold text-foreground">{children}</strong>,
  code: ({ className, children }) => className
    ? <code className="my-6 block overflow-x-auto rounded-lg bg-slate-950 p-5 font-mono text-sm text-slate-100">{children}</code>
    : <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">{children}</code>,
  pre: ({ children }) => <pre className="my-6">{children}</pre>,
  blockquote: ({ children }) => <blockquote className="my-8 border-l-4 border-amber-600 pl-6 text-xl italic leading-8 text-foreground">{children}</blockquote>,
  ul: ({ children }) => <ul className="my-6 list-disc space-y-3 pl-6 text-slate-700 dark:text-slate-300">{children}</ul>,
  ol: ({ children }) => <ol className="my-6 list-decimal space-y-3 pl-6 text-slate-700 dark:text-slate-300">{children}</ol>,
  li: ({ children }) => <li className="pl-1 leading-7">{children}</li>,
  hr: () => <hr className="my-12 border-border" />,
  img: ({ src, alt }) => <span className="my-10 block"><img src={src} alt={alt || ''} className="mx-auto h-auto max-w-full rounded-xl border" loading="lazy" /></span>,
  table: ({ children }) => <div className="my-8 overflow-x-auto rounded-xl border"><table className="w-full min-w-[680px] border-collapse text-sm">{children}</table></div>,
  thead: ({ children }) => <thead className="bg-muted">{children}</thead>,
  th: ({ children }) => <th className="border-b border-r px-4 py-3 text-left font-bold text-foreground last:border-r-0">{children}</th>,
  td: ({ children }) => <td className="border-b border-r px-4 py-3 align-top text-muted-foreground last:border-r-0">{children}</td>,
};

function MarkdownArticle({ content, loading }) {
  const normalizedContent = content.replace(/^#\s+[^\n]+\r?\n+/, '');
  return (
    <article className="article-prose mx-auto max-w-[760px]">
      {loading ? <p className="py-12 text-muted-foreground">Loading article…</p> : <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{normalizedContent}</ReactMarkdown>}
    </article>
  );
}

export function BlogPost() {
  const { slug } = useParams();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const post = blogPostsBySlug[slug];

  useEffect(() => {
    if (post?.title) document.title = `${post.title} | Tech Made Easy`;
  }, [post?.title]);

  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return allPosts
      .filter((candidate) => candidate.slug !== slug)
      .sort((a, b) => Number(b.category === post.category) - Number(a.category === post.category) || b.dateSort.localeCompare(a.dateSort))
      .slice(0, 2);
  }, [post, slug]);

  useEffect(() => {
    if (slug === 'life-thesis') {
      setLoading(false);
      return undefined;
    }
    let active = true;
    setLoading(true);
    fetch(`/content/${slug}.md`)
      .then((response) => response.ok ? response.text() : Promise.reject(new Error('Content not found')))
      .then((text) => { if (active) setContent(text); })
      .catch(() => { if (active) setContent('This article is not available.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [slug]);

  if (!post) return <div className="container mx-auto max-w-3xl px-4 py-20"><h1 className="text-3xl font-black">Article not found</h1></div>;

  const canonical = post.legacyPath
    ? `https://techmadeeasy.info${post.legacyPath}`
    : `https://techmadeeasy.info/blog/${slug}/`;
  const socialImage = post.socialImage || 'https://techmadeeasy.info/og-image.jpg';
  const publishedDate = /^\d{4}-\d{2}-\d{2}$/.test(post.dateSort)
    ? post.dateSort
    : `${post.dateSort}-01`;
  const markdown = <MarkdownArticle content={content} loading={loading} />;

  if (post.legacyPath) {
    return <LegacyArticleRedirect post={post} />;
  }

  return (
    <div className="flex flex-col">
      <Helmet>
        <title>{post.title} | Tech Made Easy</title>
        <meta name="description" content={post.excerpt || post.title} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt || post.title} />
        <meta property="og:url" content={canonical} />
        <meta property="og:site_name" content="Tech Made Easy" />
        <meta property="og:image" content={socialImage} />
        <meta property="og:image:alt" content={`${post.title} — Tech Made Easy`} />
        <meta property="article:published_time" content={publishedDate} />
        <meta property="article:modified_time" content={publishedDate} />
        <meta property="article:author" content="Duc Hoang" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={socialImage} />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          description: post.excerpt || post.title,
          datePublished: publishedDate,
          dateModified: publishedDate,
          mainEntityOfPage: canonical,
          image: socialImage,
          author: { '@type': 'Person', name: 'Duc Hoang' },
          publisher: { '@type': 'Organization', name: 'Tech Made Easy' },
        })}</script>
      </Helmet>

      <ArticleHeader slug={slug} />
      <div className="container mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {slug === 'complete-guide-offshore-wind-farm-development' ? <Suspense fallback={<p className="text-muted-foreground">Loading guide…</p>}><OffshoreWindGuide embedded /></Suspense>
          : slug === 'interactive-offshore-wind-farm' ? <div className="space-y-12">{markdown}<section className="rounded-2xl border bg-muted/20 p-4 sm:p-6"><h2 className="text-2xl font-black">Interactive offshore wind farm</h2><p className="mt-2 text-muted-foreground">Select a component to explore how the system fits together.</p><div className="mt-6"><Suspense fallback={<p className="text-muted-foreground">Loading interactive…</p>}><OffshoreWindFarmApp embedded /></Suspense></div></section></div>
            : slug === 'strategic-masterpiece-redefined-warfare' ? <div className="space-y-12"><section className="rounded-2xl border bg-muted/20 p-4 sm:p-6"><h2 className="text-2xl font-black">Interactive Battle of Bach Dang</h2><p className="mt-2 text-muted-foreground">Follow the sequence through the interactive timeline.</p><div className="mt-6"><Suspense fallback={<p className="text-muted-foreground">Loading interactive…</p>}><BachDangBattleApp /></Suspense></div></section>{markdown}</div>
              : markdown}
      </div>
      <ArticleEnding relatedPosts={relatedPosts} />
    </div>
  );
}

function LegacyArticleRedirect({ post }) {
  useEffect(() => {
    window.location.replace(post.legacyPath);
  }, [post.legacyPath]);

  return (
    <section className="container mx-auto max-w-3xl px-4 py-20">
      <Helmet>
        <title>{post.title} | Tech Made Easy</title>
        <meta name="description" content={post.excerpt || post.title} />
        <link rel="canonical" href={`https://techmadeeasy.info${post.legacyPath}`} />
      </Helmet>
      <h1 className="text-3xl font-black">Opening {post.title}</h1>
      <p className="mt-4 text-muted-foreground">This archived note has its own reading layout.</p>
      <a className="mt-6 inline-flex font-semibold underline underline-offset-4" href={post.legacyPath}>Open the article</a>
    </section>
  );
}
