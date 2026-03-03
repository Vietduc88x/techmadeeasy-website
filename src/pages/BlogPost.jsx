import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, Clock, ArrowLeft, Share2, Mail, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import OffshoreWindGuide from '@/components/OffshoreWindGuide';
import OffshoreWindFarmApp from '@/pages/offshore-wind-farm/App.jsx';
import BachDangBattleApp from '@/pages/bach-dang-battle/App.jsx';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { blogPosts as allPosts, blogPostsBySlug } from '@/data/posts';

export function BlogPost() {
  const { slug } = useParams();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const post = blogPostsBySlug[slug];

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/.netlify/functions/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        setIsSubscribed(true);
        setEmail('');
      } else {
        alert(data.error || 'An error occurred while subscribing');
      }
    } catch (error) {
      alert('An error occurred while subscribing. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Related posts: same category first, then other posts, excluding current
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const aMatch = a.category === post?.category ? 1 : 0;
      const bMatch = b.category === post?.category ? 1 : 0;
      if (bMatch !== aMatch) return bMatch - aMatch;
      return b.dateSort?.localeCompare(a.dateSort || '') || 0;
    })
    .slice(0, 2);

  useEffect(() => {
    const loadContent = async () => {
      try {
        // In a real app, you would fetch from an API or import markdown files
        const response = await fetch(`/content/${slug}.md`);
        if (response.ok) {
          const text = await response.text();
          setContent(text);
        } else {
          setContent('Content not found.');
        }
      } catch (error) {
        console.error('Error loading content:', error);
        setContent('Error loading content.');
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [slug]);

  if (!post) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  // Custom components for ReactMarkdown — preserves existing Tailwind styling
  const markdownComponents = {
    h1: ({ children }) => <h1 className="text-3xl font-bold text-foreground mb-6 mt-8">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-bold text-foreground mb-4 mt-6">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-bold text-foreground mb-3 mt-5">{children}</h3>,
    h4: ({ children }) => <h4 className="text-lg font-bold text-foreground mb-2 mt-4">{children}</h4>,
    p: ({ children }) => <p className="text-muted-foreground mb-2 leading-relaxed">{children}</p>,
    a: ({ href, children }) => <a href={href} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">{children}</a>,
    strong: ({ children }) => <strong className="font-bold text-foreground">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    code: ({ className, children }) => {
      // Fenced code blocks have a className like "language-js"
      if (className) {
        return (
          <code className="block bg-muted p-4 rounded-lg text-sm font-mono overflow-x-auto my-4">
            {children}
          </code>
        );
      }
      return <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>;
    },
    pre: ({ children }) => <pre className="my-4">{children}</pre>,
    blockquote: ({ children }) => <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4">{children}</blockquote>,
    ul: ({ children }) => <ul className="list-disc list-inside space-y-2 my-4 ml-4">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal list-inside space-y-2 my-4 ml-4">{children}</ol>,
    li: ({ children }) => <li className="text-muted-foreground leading-relaxed">{children}</li>,
    hr: () => <hr className="my-8 border-border" />,
    img: ({ src, alt }) => (
      <span className="block my-8 text-center">
        <img src={src} alt={alt} className="max-w-full h-auto mx-auto rounded-lg shadow-lg" style={{ maxHeight: '500px' }} loading="lazy" />
      </span>
    ),
    table: ({ children }) => (
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border text-sm">{children}</table>
      </div>
    ),
    thead: ({ children }) => <thead className="bg-muted">{children}</thead>,
    th: ({ children }) => <th className="border border-border px-4 py-2 text-left font-semibold text-foreground">{children}</th>,
    td: ({ children }) => <td className="border border-border px-4 py-2 text-muted-foreground">{children}</td>,
    tr: ({ children }) => <tr>{children}</tr>,
  };

  const renderMarkdown = (text) => (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
      {text}
    </ReactMarkdown>
  );

  return (
    <div className="flex flex-col">
      <Helmet>
        <title>{post.title} | Tech Made Easy</title>
        <meta name="description" content={post.excerpt || `${post.title} - Expert insights by Duc Hoang, PMP`} />
        <link rel="canonical" href={`https://techmadeeasy.info/blog/${slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt || post.title} />
        <meta property="og:url" content={`https://techmadeeasy.info/blog/${slug}`} />
        <meta property="og:site_name" content="Tech Made Easy" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt || post.title} />
      </Helmet>

      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Button asChild variant="ghost" className="mb-6">
              <Link to="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
            
            <div className="flex items-center gap-4 mb-6">
              <Badge variant="secondary">{post.category}</Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1" />
                {post.date}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                {post.readTime}
              </div>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6">
              {post.title}
            </h1>
            
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">
                By <span className="font-medium text-foreground">{post.author}</span>
              </p>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {slug === 'life-thesis' ? (
              <iframe 
                src={`/articles/${slug}.html`}
                className="w-full border-0"
                style={{ minHeight: '100vh', height: '100%' }}
                title={post.title}
                onLoad={(e) => {
                  // Auto-resize iframe to content height
                  const iframe = e.target;
                  if (iframe.contentWindow) {
                    try {
                      const height = iframe.contentWindow.document.body.scrollHeight;
                      iframe.style.height = height + 'px';
                    } catch (err) {
                      console.log('Cannot access iframe content');
                    }
                  }
                }}
              />
            ) : slug === 'complete-guide-offshore-wind-farm-development' ? (
              <OffshoreWindGuide />
            ) : slug === 'interactive-offshore-wind-farm' ? (
              <div className="space-y-8">
                <article className="prose prose-lg max-w-none">
                  {loading ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Loading content...</p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {renderMarkdown(content)}
                    </div>
                  )}
                </article>
                <div className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20 rounded-xl p-4 border">
                  <h3 className="text-2xl font-bold text-center mb-4">🌊 Interactive Offshore Wind Farm</h3>
                  <p className="text-center text-muted-foreground mb-6">
                    Explore the complete offshore wind farm system below. Click on any component to learn more!
                  </p>
                  <div className="w-full">
                    <OffshoreWindFarmApp />
                  </div>
                </div>
              </div>
            ) : slug === 'strategic-masterpiece-redefined-warfare' ? (
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-xl p-4 border">
                  <h3 className="text-2xl font-bold text-center mb-4">⚔️ Interactive Battle of Bach Dang</h3>
                  <p className="text-center text-muted-foreground mb-6">
                    Experience the legendary battle through our interactive timeline. Watch Tran Hung Dao's brilliant strategy unfold!
                  </p>
                  <div className="w-full">
                    <BachDangBattleApp />
                  </div>
                </div>
                <article className="prose prose-lg max-w-none">
                  {loading ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Loading content...</p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {renderMarkdown(content)}
                    </div>
                  )}
                </article>
              </div>
            ) : (
              <article className="prose prose-lg max-w-none">
                {loading ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Loading content...</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {renderMarkdown(content)}
                  </div>
                )}
              </article>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-primary/20">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl font-bold text-foreground">
                  Enjoyed this article?
                </CardTitle>
                <CardDescription className="text-base text-muted-foreground">
                  Get weekly insights on renewable energy, AI, and emerging technologies delivered to your inbox.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!isSubscribed ? (
                  <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1"
                      disabled={isLoading}
                    />
                    <Button type="submit" disabled={isLoading || !email}>
                      {isLoading ? 'Subscribing...' : (
                        <>
                          <Mail className="mr-2 h-4 w-4" />
                          Subscribe Free
                        </>
                      )}
                    </Button>
                  </form>
                ) : (
                  <div className="text-center space-y-2">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto" />
                    <p className="font-semibold text-foreground">Welcome to the community!</p>
                    <p className="text-sm text-muted-foreground">Check your email for a confirmation link.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-8">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost) => (
                <div key={relatedPost.slug} className="bg-card rounded-lg p-6 border hover:shadow-lg transition-shadow">
                  <Badge variant="secondary" className="mb-3">{relatedPost.category}</Badge>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    <Link to={`/blog/${relatedPost.slug}`} className="hover:text-primary transition-colors">
                      {relatedPost.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{relatedPost.excerpt}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    {relatedPost.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

