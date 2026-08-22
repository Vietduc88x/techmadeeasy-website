import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { NewsletterForm } from '@/components/NewsletterForm';

export function ArticleEnding({ relatedPosts = [] }) {
  return (
    <footer className="border-t bg-muted/20">
      <div className="container mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {relatedPosts.length > 0 && (
          <section aria-labelledby="continue-reading-title">
            <h2 id="continue-reading-title" className="text-2xl font-black">Continue reading</h2>
            <div className="mt-5 divide-y border-y">
              {relatedPosts.map((post) => (
                <Link key={post.slug} to={post.legacyPath || `/blog/${post.slug}`} reloadDocument={Boolean(post.legacyPath)} className="group grid gap-2 py-5 sm:grid-cols-[1fr_auto] sm:items-center">
                  <span><span className="text-xs font-semibold uppercase tracking-[.14em] text-muted-foreground">{post.category}</span><strong className="mt-1 block text-lg group-hover:text-primary">{post.title}</strong></span>
                  <ArrowRight className="hidden h-5 w-5 sm:block" />
                </Link>
              ))}
            </div>
          </section>
        )}
        <NewsletterForm className={relatedPosts.length ? 'mt-12' : ''} />
      </div>
    </footer>
  );
}
