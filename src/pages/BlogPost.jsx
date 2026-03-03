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

  const _legacyBlogPosts = {
    'ai-orchestration-pm-transformation': {
      title: 'AI Orchestration: The 2026 Reality Most PMs Aren\'t Ready For',
      category: 'Technology',
      readTime: '9 min read',
      date: 'March 2026',
      author: 'techmadeeasy',
    },
    'solar-bess-dominance': {
      title: "Why Solar and BESS Will Dominate -- A Field Engineer's Honest Take",
      category: 'Renewable Energy',
      readTime: '10 min read',
      date: 'February 2026',
      author: 'techmadeeasy',
    },
    'digital-twins-energy-infrastructure': {
      title: 'Digital Twins in Energy: Why Your Next Power Plant Already Exists Before You Build It',
      category: 'Technology',
      readTime: '8 min read',
      date: 'March 2026',
      author: 'techmadeeasy',
    },
    'life-thesis': {
      title: "Don't Set Goals. Build Layers.",
      category: 'Personal Development',
      readTime: '20 min read',
      date: 'February 2026',
      author: 'techmadeeasy',
    },
    'symmetric-risk-versus-asymmetric-risk': {
      title: 'The world of symmetric risk versus the power of asymmetric risk',
      category: 'Investment',
      readTime: '7 min read',
      date: 'January 2026',
      author: 'techmadeeasy',
    },
    'ai-power-hungry-giants-energy-demands': {
      title: 'The Power Hungry Giants: Understanding AI Data Center Energy Demands and Load Profiles',
      category: 'Technology',
      readTime: '10 min read',
      date: 'September 2025',
      author: 'techmadeeasy',
    },
    'ca-nhan-chu-quyen-tu-do-so': {
      title: 'Cá Nhân Chủ Quyền: Sự Trỗi Dậy của Tự Do Số trong Kỷ Nguyên Thông Tin',
      category: 'Công Nghệ',
      readTime: '15 phút đọc',
      date: 'Tháng 9 2025',
      author: 'techmadeeasy',
    },
    'sovereign-individual-digital-freedom': {
      title: 'The Sovereign Individual: The Rise of Digital Freedom in the Information Age',
      category: 'Technology',
      readTime: '15 min read',
      date: 'September 2025',
      author: 'techmadeeasy',
    },
    'strategic-masterpiece-redefined-warfare': {
      title: 'The Strategic Masterpiece That Redefined Warfare',
      category: 'History',
      readTime: '15 min read',
      date: 'September 2025',
      author: 'techmadeeasy',
    },
    'interactive-offshore-wind-farm': {
      title: 'Interactive Offshore Wind Farm',
      category: 'Renewable Energy',
      readTime: '12 min read',
      date: 'September 2025',
      author: 'techmadeeasy',
    },
    'complete-guide-offshore-wind-farm-development': {
      title: 'Complete Guide to Offshore Wind Farm Development: From Planning to Operation',
      category: 'Renewable Energy',
      readTime: '25 min read',
      date: 'August 2024',
      author: 'techmadeeasy',
    },
    'ai-applications-renewable-energy-transformation': {
      title: 'AI Applications in Renewable Energy: Transforming the Clean Energy Landscape',
      category: 'Technology',
      readTime: '20 min read',
      date: 'August 2024',
      author: 'techmadeeasy',
    },
    'the-power-of-compounding': {
      title: 'The Power of Compounding: The Eighth Wonder of the World',
      category: 'Personal Development',
      readTime: '15 min read',
      date: 'August 2025',
      author: 'techmadeeasy',
    },
    'renewable-energy-workshop-01': {
      title: 'Renewable Energy Workshop 01',
      category: 'Renewable Energy',
      readTime: '5 min read',
      date: 'August 2025',
      author: 'techmadeeasy',
    },
    'lever-leverage': {
      title: 'Lever – Leverage',
      category: 'Philosophy',
      readTime: '8 min read',
      date: 'January 2025',
      author: 'techmadeeasy',
    },
    'ark-invest-big-ideas-2025': {
      title: 'ARK Invest Big Ideas 2025: A Vision for Disruptive Innovation',
      category: 'Investment',
      readTime: '12 min read',
      date: 'January 2025',
      author: 'techmadeeasy',
    },
    'my-story-told-again': {
      title: 'My Story, Told Again - Once look back, see how far you\'ve come!',
      category: 'Personal Development',
      readTime: '8 min read',
      date: 'January 2026',
      author: 'techmadeeasy',
    },
    'the-courage-to-be-you': {
      title: 'The Courage to Be You: Lessons from a Profound Book',
      category: 'Personal Development',
      readTime: '10 min read',
      date: 'January 2025',
      author: 'techmadeeasy',
    },
    'hard-work-in-a-company-no-longer-gives-you-safe': {
      title: 'Hard Work in a Company No Longer Gives You Safe',
      category: 'Career',
      readTime: '7 min read',
      date: 'December 2024',
      author: 'techmadeeasy',
    },
    'construction-cost-estimation': {
      title: 'Construction Cost Estimation',
      category: 'Engineering',
      readTime: '9 min read',
      date: 'December 2024',
      author: 'techmadeeasy',
    },
    'work-breakdown-structure-for-offshore-wind-farm': {
      title: 'Work Breakdown Structure for Offshore Wind Farm',
      category: 'Renewable Energy',
      readTime: '11 min read',
      date: 'December 2024',
      author: 'techmadeeasy',
    },
    'construction-of-the-intertidal-wind-farm': {
      title: 'Construction of the Intertidal Wind Farm – What Should We Know?',
      category: 'Renewable Energy',
      readTime: '13 min read',
      date: 'November 2024',
      author: 'Nam Vu',
    },
    'matrix-of-responsibility-between-packages-for-offshore-wind': {
      title: 'Matrix of Responsibility between packages for Offshore Wind',
      category: 'Renewable Energy',
      readTime: '8 min read',
      date: 'November 2024',
      author: 'techmadeeasy',
    },
    'self-sovereignty': {
      title: 'Self-Sovereignty',
      category: 'Crypto Network',
      readTime: '15 min read',
      date: 'November 2024',
      author: 'techmadeeasy',
    },
    'new-york-on-tech-is-helping-under-resourced-students-become-future-tech-leaders': {
      title: 'New York on Tech is helping under-resourced students become future tech leaders',
      category: 'Education',
      readTime: '10 min read',
      date: 'October 2024',
      author: 'Tech Made Easy',
    },
    'offshore-wind-risk-management-explained': {
      title: 'Offshore Wind Risk Management Explained',
      category: 'Renewable Energy',
      readTime: '14 min read',
      date: 'October 2024',
      author: 'techmadeeasy',
    },
    'navigating-the-noise-finding-perspective': {
      title: 'Navigating the Noise: Finding Perspective in Turbulent Times',
      category: 'Personal Development',
      readTime: '6 min read',
      date: 'October 2024',
      author: 'techmadeeasy',
    },
    'measurement-and-surveys-for-offshore-wind-farm': {
      title: 'Measurement and Surveys for Offshore Wind Farm',
      category: 'Renewable Energy',
      readTime: '12 min read',
      date: 'September 2024',
      author: 'techmadeeasy',
    },
    'why-ignoring-technology-is-no-longer-an-option': {
      title: 'Why Ignoring Technology Is No Longer an Option',
      category: 'Technology',
      readTime: '9 min read',
      date: 'September 2024',
      author: 'techmadeeasy',
    },
    'wind-farm-contract-structure-your-path-to-success': {
      title: 'Wind Farm Contract Structure: Your Path to Success',
      category: 'Renewable Energy',
      readTime: '10 min read',
      date: 'August 2024',
      author: 'techmadeeasy',
    },
    'wind-turbine-onshore-transportation-challenges': {
      title: 'Wind Turbine Onshore Transportation challenges',
      category: 'Renewable Energy',
      readTime: '8 min read',
      date: 'August 2024',
      author: 'Tam Tran',
    },
    'nearshore-wind-farm-foundations-in-vietnam': {
      title: 'Nearshore Wind Farm Foundations in Vietnam – The case study in Mekong Delta Nearshore area',
      category: 'Renewable Energy',
      readTime: '11 min read',
      date: 'July 2024',
      author: 'techmadeeasy',
    },
    'strategic-planning-renewable-energy': {
      title: 'Strategic Planning for Large-Scale Renewable Energy Projects: Your Complete Playbook',
      category: 'Renewable Energy',
      readTime: '25 min read',
      date: 'December 2024',
      author: 'Renewable Energy Strategy Team',
    },
  };

  // Use unified data source; fall back to legacy for any stragglers
  const post = blogPostsBySlug[slug] || _legacyBlogPosts[slug];

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

