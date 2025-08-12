import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function BlogPost() {
  const { slug } = useParams();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  const blogPosts = {
    'renewable-energy-workshop-01': {
      title: 'Renewable Energy Workshop 01',
      category: 'Renewable Energy',
      readTime: '5 min read',
      date: 'August 2025',
      author: 'Duc Hoang',
    },
    'lever-leverage': {
      title: 'Lever – Leverage',
      category: 'Philosophy',
      readTime: '8 min read',
      date: 'January 2025',
      author: 'Duc Hoang',
    },
    'ark-invest-big-ideas-2025': {
      title: 'ARK Invest Big Ideas 2025: A Vision for Disruptive Innovation',
      category: 'Investment',
      readTime: '12 min read',
      date: 'January 2025',
      author: 'Duc Hoang',
    },
    'the-courage-to-be-you': {
      title: 'The Courage to Be You: Lessons from a Profound Book',
      category: 'Personal Development',
      readTime: '10 min read',
      date: 'January 2025',
      author: 'Duc Hoang',
    },
    'hard-work-in-a-company-no-longer-gives-you-safe': {
      title: 'Hard Work in a Company No Longer Gives You Safe',
      category: 'Career',
      readTime: '7 min read',
      date: 'December 2024',
      author: 'Duc Hoang',
    },
    'construction-cost-estimation': {
      title: 'Construction Cost Estimation',
      category: 'Engineering',
      readTime: '9 min read',
      date: 'December 2024',
      author: 'Duc Hoang',
    },
    'work-breakdown-structure-for-offshore-wind-farm': {
      title: 'Work Breakdown Structure for Offshore Wind Farm',
      category: 'Renewable Energy',
      readTime: '11 min read',
      date: 'December 2024',
      author: 'Duc Hoang',
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
      author: 'Duc Hoang',
    },
    'self-sovereignty': {
      title: 'Self-Sovereignty',
      category: 'Web 3.0',
      readTime: '15 min read',
      date: 'November 2024',
      author: 'Duc Hoang',
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
      author: 'Duc Hoang',
    },
    'navigating-the-noise-finding-perspective': {
      title: 'Navigating the Noise: Finding Perspective in Turbulent Times',
      category: 'Personal Development',
      readTime: '6 min read',
      date: 'October 2024',
      author: 'Duc Hoang',
    },
    'measurement-and-surveys-for-offshore-wind-farm': {
      title: 'Measurement and Surveys for Offshore Wind Farm',
      category: 'Renewable Energy',
      readTime: '12 min read',
      date: 'September 2024',
      author: 'Duc Hoang',
    },
    'why-ignoring-technology-is-no-longer-an-option': {
      title: 'Why Ignoring Technology Is No Longer an Option',
      category: 'Technology',
      readTime: '9 min read',
      date: 'September 2024',
      author: 'Duc Hoang',
    },
    'wind-farm-contract-structure-your-path-to-success': {
      title: 'Wind Farm Contract Structure: Your Path to Success',
      category: 'Renewable Energy',
      readTime: '10 min read',
      date: 'August 2024',
      author: 'Duc Hoang & Tam Tran',
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
      author: 'Duc Hoang',
    },
  };

  const post = blogPosts[slug];

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

  const formatContent = (content) => {
    // Simple markdown-like formatting
    return content
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('# ')) {
          return <h1 key={index} className="text-3xl font-bold text-foreground mb-6 mt-8">{line.slice(2)}</h1>;
        }
        if (line.startsWith('## ')) {
          return <h2 key={index} className="text-2xl font-bold text-foreground mb-4 mt-6">{line.slice(3)}</h2>;
        }
        if (line.startsWith('### ')) {
          return <h3 key={index} className="text-xl font-bold text-foreground mb-3 mt-5">{line.slice(4)}</h3>;
        }
        if (line.startsWith('> ')) {
          return (
            <blockquote key={index} className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4">
              {line.slice(2)}
            </blockquote>
          );
        }
        if (line.startsWith('*   ')) {
          return (
            <li key={index} className="text-muted-foreground mb-2 ml-4">
              {line.slice(4)}
            </li>
          );
        }
        if (line.startsWith('**') && line.endsWith('**')) {
          return <p key={index} className="font-bold text-foreground mb-4">{line.slice(2, -2)}</p>;
        }
        if (line.startsWith("[") && line.includes("](") && line.endsWith(")")) {
          const linkText = line.substring(line.indexOf("[") + 1, line.indexOf("]"));
          const linkUrl = line.substring(line.indexOf("(") + 1, line.indexOf(")"));
          return (
            <p key={index} className="text-muted-foreground mb-4 leading-relaxed">
              <a 
                href={linkUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary hover:underline"
                onClick={(e) => {
                  // For PDF files, prevent React Router from handling the link
                  if (linkUrl.endsWith('.pdf')) {
                    e.preventDefault();
                    window.open(linkUrl, '_blank');
                  }
                }}
              >
                {linkText}
              </a>
            </p>
          );
        }
        if (line.trim() === ")") {
          return <br key={index} />;
        }
        return <p key={index} className="text-muted-foreground mb-4 leading-relaxed">{line}</p>;
      });
  };

  return (
    <div className="flex flex-col">
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
            <article className="prose prose-lg max-w-none">
              {loading ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Loading content...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {formatContent(content)}
                </div>
              )}
            </article>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-8">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(blogPosts)
                .filter(([key]) => key !== slug)
                .slice(0, 2)
                .map(([key, relatedPost]) => (
                  <div key={key} className="bg-card rounded-lg p-6 border hover:shadow-lg transition-shadow">
                    <Badge variant="secondary" className="mb-3">{relatedPost.category}</Badge>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      <Link to={`/blog/${key}`} className="hover:text-primary transition-colors">
                        {relatedPost.title}
                      </Link>
                    </h3>
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

