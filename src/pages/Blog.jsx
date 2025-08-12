import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function Blog() {
  const blogPosts = [
    {
      slug: 'lever-leverage',
      title: 'Lever – Leverage',
      excerpt: 'Give me a lever long enough and a fulcrum on which to place it, and I shall move the world. Exploring the concept of leverage in the digital age.',
      category: 'Philosophy',
      readTime: '8 min read',
      date: 'January 2025',
      featured: true,
    },
    {
      slug: 'ark-invest-big-ideas-2025',
      title: 'ARK Invest Big Ideas 2025: A Vision for Disruptive Innovation',
      excerpt: 'The world is evolving rapidly, driven by technological advancements, automation, and the rise of Artificial Intelligence. Exploring ARK Invest\'s vision for the future.',
      category: 'Investment',
      readTime: '12 min read',
      date: 'January 2025',
      featured: true,
    },
    {
      slug: 'the-courage-to-be-you',
      title: 'The Courage to Be You: Lessons from a Profound Book',
      excerpt: 'Last weekend, I had the chance to delve into a thoughtful book, The Courage to Be Disliked. Profound life lessons that resonated deeply.',
      category: 'Personal Development',
      readTime: '10 min read',
      date: 'January 2025',
      featured: false,
    },
    {
      slug: 'hard-work-in-a-company-no-longer-gives-you-safe',
      title: 'Hard Work in a Company No Longer Gives You Safe',
      excerpt: 'The Storm Clouds. The business landscape feels fragile, and the winds of change are blowing. Exploring the realities of modern employment.',
      category: 'Career',
      readTime: '7 min read',
      date: 'December 2024',
      featured: false,
    },
    {
      slug: 'construction-cost-estimation',
      title: 'Construction Cost Estimation',
      excerpt: 'Imagine You\'re Building a Cool Treehouse! You\'re standing in your backyard, gazing at that perfect tree. A comprehensive guide to construction cost estimation.',
      category: 'Engineering',
      readTime: '9 min read',
      date: 'December 2024',
      featured: false,
    },
    {
      slug: 'work-breakdown-structure-for-offshore-wind-farm',
      title: 'Work Breakdown Structure for Offshore Wind Farm',
      excerpt: 'By Duc Hoang So, What is a Work Breakdown Structure? Imagine we\'re building a massive offshore wind farm – it\'s like constructing a floating city powered by wind!',
      category: 'Renewable Energy',
      readTime: '11 min read',
      date: 'December 2024',
      featured: false,
    },
    {
      slug: 'construction-of-the-intertidal-wind-farm',
      title: 'Construction of the Intertidal Wind Farm – What Should We Know?',
      excerpt: 'So… What is the key to success of construction of a nearshore wind farm? The answer is simple… planning…, planning … planning.',
      category: 'Renewable Energy',
      readTime: '13 min read',
      date: 'November 2024',
      featured: false,
    },
    {
      slug: 'matrix-of-responsibility-between-packages-for-offshore-wind',
      title: 'Matrix of Responsibility between packages for Offshore Wind',
      excerpt: 'Think of the offshore wind farm project as a huge puzzle. It\'s so big that it\'s tough for just one company to put it all together.',
      category: 'Renewable Energy',
      readTime: '8 min read',
      date: 'November 2024',
      featured: false,
    },
    {
      slug: 'self-sovereignty',
      title: 'Self-Sovereignty',
      excerpt: 'The internet has revolutionized the way we communicate and interact with each other, but it has also led to a centralized system where tech giants have complete control over our data.',
      category: 'Web 3.0',
      readTime: '15 min read',
      date: 'November 2024',
      featured: true,
    },
    {
      slug: 'new-york-on-tech-is-helping-under-resourced-students-become-future-tech-leaders',
      title: 'New York on Tech is helping under-resourced students become future tech leaders',
      excerpt: 'Jessica Santana and Evin Robinson were riding the subway home from a college leadership conference when they realized they were getting off at the same stop.',
      category: 'Education',
      readTime: '10 min read',
      date: 'October 2024',
      featured: false,
    },
    {
      slug: 'offshore-wind-risk-management-explained',
      title: 'Offshore Wind Risk Management Explained',
      excerpt: 'Imagine we\'re embarking on an exciting voyage to build an offshore wind farm. Our mission: harness the wind\'s power while avoiding treacherous waters.',
      category: 'Renewable Energy',
      readTime: '14 min read',
      date: 'October 2024',
      featured: false,
    },
    {
      slug: 'navigating-the-noise-finding-perspective',
      title: 'Navigating the Noise: Finding Perspective in Turbulent Times',
      excerpt: 'You\'re right – there\'s a whirlwind of noise out there. Market downturns, layoffs, uncertainty – it feels like a storm brewing.',
      category: 'Personal Development',
      readTime: '6 min read',
      date: 'October 2024',
      featured: false,
    },
    {
      slug: 'measurement-and-surveys-for-offshore-wind-farm',
      title: 'Measurement and Surveys for Offshore Wind Farm',
      excerpt: 'Before building a wind farm, we need to befriend the wind and ocean, just like detectives solving a mystery! We use cool gadgets to collect clues.',
      category: 'Renewable Energy',
      readTime: '12 min read',
      date: 'September 2024',
      featured: false,
    },
    {
      slug: 'why-ignoring-technology-is-no-longer-an-option',
      title: 'Why Ignoring Technology Is No Longer an Option',
      excerpt: 'In today\'s fast-paced world, innovation seems to be the name of the game, and at the forefront of this innovation stands Artificial Intelligence (AI).',
      category: 'Technology',
      readTime: '9 min read',
      date: 'September 2024',
      featured: false,
    },
    {
      slug: 'wind-farm-contract-structure-your-path-to-success',
      title: 'Wind Farm Contract Structure: Your Path to Success',
      excerpt: 'Building a wind farm is much like assembling a complex puzzle. It involves aligning numerous components—contracts and partnerships—in perfect harmony.',
      category: 'Renewable Energy',
      readTime: '10 min read',
      date: 'August 2024',
      featured: false,
    },
    {
      slug: 'wind-turbine-onshore-transportation-challenges',
      title: 'Wind Turbine Onshore Transportation challenges',
      excerpt: 'Wind turbine transportation is a critical issue for any wind farm projects. This short article aims to provide an overview of wind turbines inland-transportation challenges.',
      category: 'Renewable Energy',
      readTime: '8 min read',
      date: 'August 2024',
      featured: false,
    },
    {
      slug: 'nearshore-wind-farm-foundations-in-vietnam',
      title: 'Nearshore Wind Farm Foundations in Vietnam – The case study in Mekong Delta Nearshore area',
      excerpt: 'There are several types of foundation available for nearshore/ offshore wind towers. The choice of foundation is one of the key determining factors.',
      category: 'Renewable Energy',
      readTime: '11 min read',
      date: 'July 2024',
      featured: false,
    },
  ];

  const categories = ['All', 'Philosophy', 'Investment', 'Personal Development', 'Renewable Energy', 'Technology', 'Web 3.0', 'Career', 'Engineering', 'Education'];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6">
              Latest Insights
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover the newest updates and tips in technology. We explore the latest trends and provide in-depth analysis.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Categories Filter */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={category === 'All' ? 'default' : 'secondary'}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {category}
              </Badge>
            ))}
          </div>

          {/* Featured Posts */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8">Featured Posts</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {blogPosts.filter(post => post.featured).map((post) => (
                <Card key={post.slug} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{post.category}</Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      <Link to={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      {post.date}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">
                      {post.excerpt}
                    </CardDescription>
                    <Button asChild variant="ghost" className="p-0 h-auto">
                      <Link to={`/blog/${post.slug}`} className="flex items-center text-primary hover:text-primary/80">
                        Read More
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* All Posts */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-8">All Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
                <Card key={post.slug} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{post.category}</Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      <Link to={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      {post.date}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">
                      {post.excerpt}
                    </CardDescription>
                    <Button asChild variant="ghost" className="p-0 h-auto">
                      <Link to={`/blog/${post.slug}`} className="flex items-center text-primary hover:text-primary/80">
                        Read More
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="mt-16 bg-muted/30 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Stay Updated
            </h3>
            <p className="text-muted-foreground mb-6">
              Sign up to be the first reader of our up-to-date articles!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-border rounded-md bg-background text-foreground"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

