import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Search, Filter, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

export function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('date'); // 'date', 'readTime', 'title'

  const blogPosts = [
    {
      slug: 'ca-nhan-chu-quyen-tu-do-so',
      title: 'Cá Nhân Chủ Quyền: Sự Trỗi Dậy của Tự Do Số trong Kỷ Nguyên Thông Tin',
      excerpt: 'Công nghệ đang viết lại luật chơi của quyền lực, tài sản và tự do cá nhân. Khám phá cuộc chuyển đổi từ quốc gia-dân tộc sang chủ quyền số và học các chiến lược thực tế để thịnh vượng trong Kỷ Nguyên Thông Tin.',
      category: 'Technology',
      readTime: '15 phút đọc',
      date: 'September 2025',
      dateSort: '2025-09',
      featured: true,
      tags: ['blockchain', 'cryptocurrency', 'digital sovereignty', 'future'],
    },
    {
      slug: 'sovereign-individual-digital-freedom',
      title: 'The Sovereign Individual: The Rise of Digital Freedom in the Information Age',
      excerpt: 'How technology is rewriting the rules of power, wealth, and individual liberty. Discover the transformation from nation-states to digital sovereignty and learn practical strategies for thriving in the Information Age.',
      category: 'Technology',
      readTime: '25 min read',
      date: 'September 2025',
      dateSort: '2025-09',
      featured: true,
      tags: ['blockchain', 'cryptocurrency', 'digital sovereignty', 'future'],
    },
    {
      slug: 'strategic-masterpiece-redefined-warfare',
      title: 'The Strategic Masterpiece That Redefined Warfare',
      excerpt: 'How one Vietnamese prince rewrote the rules of military strategy forever. Discover the revolutionary thinking behind the Battle of Bach Dang and its profound applications for modern business, leadership, and personal development.',
      category: 'Philosophy',
      readTime: '15 min read',
      date: 'September 2025',
      dateSort: '2025-09',
      featured: true,
      tags: ['strategy', 'leadership', 'history', 'business'],
    },
    {
      slug: 'interactive-offshore-wind-farm',
      title: 'Interactive Offshore Wind Farm',
      excerpt: 'Explore the complete offshore wind farm ecosystem through an interactive visualization. From floating turbines in deep waters to grid connections on shore, discover how these engineering marvels harness ocean winds to generate clean electricity.',
      category: 'Renewable Energy',
      readTime: '12 min read',
      date: 'September 2025',
      dateSort: '2025-09',
      featured: true,
      tags: ['wind energy', 'offshore', 'renewable', 'interactive'],
    },
    {
      slug: 'fim-implementation-roadmap',
      title: 'FIM Implementation Roadmap: Your Path to Procurement Excellence',
      excerpt: 'A detailed and interactive guide to integrating Free Issue Material (FIM) strategy for optimal procurement in renewable energy projects, covering workshops, procurement structure, team organization, and business case.',
      category: 'Engineering',
      readTime: '25 min read',
      date: 'August 2025',
      dateSort: '2025-08',
      featured: true,
      tags: ['procurement', 'FIM', 'project management', 'renewable energy'],
    },
    {
      slug: 'renewable-energy-costs-2024',
      title: 'Renewable Power Generation Cost in 2024: Source IRENA',
      excerpt: 'An interactive analysis of the latest cost trends in renewable energy technologies based on IRENA\'s comprehensive 2024 report. Explore how Solar PV achieved 90% cost reduction, making it one of the most competitive renewable technologies.',
      category: 'Renewable Energy',
      readTime: '15 min read',
      date: 'December 2024',
      dateSort: '2024-12',
      featured: true,
      tags: ['solar', 'costs', 'IRENA', 'analysis'],
    },
    {
      slug: 'the-power-of-compounding',
      title: 'The Power of Compounding: The Eighth Wonder of the World',
      excerpt: 'Understanding how small, consistent efforts can lead to extraordinary results. Explore the mathematical beauty and practical applications of compounding in finance, knowledge, relationships, and personal growth.',
      category: 'Personal Development',
      readTime: '15 min read',
      date: 'August 2025',
      dateSort: '2025-08',
      featured: true,
      tags: ['compounding', 'growth', 'finance', 'personal development'],
    },
    {
      slug: 'ai-applications-renewable-energy-transformation',
      title: 'AI Applications in Renewable Energy: Transforming the Clean Energy Landscape',
      excerpt: 'Explore how artificial intelligence is revolutionizing renewable energy systems through predictive analytics, smart grid management, asset optimization, and advanced maintenance strategies. Discover the future of AI-powered clean energy.',
      category: 'Technology',
      readTime: '20 min read',
      date: 'August 2024',
      dateSort: '2024-08',
      featured: true,
      tags: ['AI', 'renewable energy', 'smart grid', 'optimization'],
    },
    {
      slug: 'ark-invest-big-ideas-2025',
      title: 'ARK Invest Big Ideas 2025: A Vision for Disruptive Innovation',
      excerpt: 'The world is evolving rapidly, driven by technological advancements, automation, and the rise of Artificial Intelligence. Exploring ARK Invest\'s vision for the future.',
      category: 'Investment',
      readTime: '12 min read',
      date: 'January 2025',
      dateSort: '2025-01',
      featured: true,
      tags: ['investment', 'innovation', 'ARK Invest', 'future trends'],
    },
    {
      slug: 'the-courage-to-be-you',
      title: 'The Courage to Be You: Lessons from a Profound Book',
      excerpt: 'Last weekend, I had the chance to delve into a thoughtful book, The Courage to Be Disliked. Profound life lessons that resonated deeply.',
      category: 'Personal Development',
      readTime: '10 min read',
      date: 'January 2025',
      dateSort: '2025-01',
      featured: false,
      tags: ['psychology', 'self-improvement', 'courage', 'book review'],
    },
    {
      slug: 'hard-work-in-a-company-no-longer-gives-you-safe',
      title: 'Hard Work in a Company No Longer Gives You Safe',
      excerpt: 'The Storm Clouds. The business landscape feels fragile, and the winds of change are blowing. Exploring the realities of modern employment.',
      category: 'Career',
      readTime: '7 min read',
      date: 'December 2024',
      dateSort: '2024-12',
      featured: false,
      tags: ['career', 'employment', 'future of work', 'job security'],
    },
    {
      slug: 'self-sovereignty',
      title: 'Self-Sovereignty',
      excerpt: 'The internet has revolutionized the way we communicate and interact with each other, but it has also led to a centralized system where tech giants have complete control over our data.',
      category: 'Web 3.0',
      readTime: '15 min read',
      date: 'November 2024',
      dateSort: '2024-11',
      featured: true,
      tags: ['web3', 'decentralization', 'privacy', 'sovereignty'],
    },
    {
      slug: 'new-york-on-tech-is-helping-under-resourced-students-become-future-tech-leaders',
      title: 'New York on Tech is helping under-resourced students become future tech leaders',
      excerpt: 'Jessica Santana and Evin Robinson were riding the subway home from a college leadership conference when they realized they were getting off at the same stop.',
      category: 'Education',
      readTime: '10 min read',
      date: 'October 2024',
      dateSort: '2024-10',
      featured: false,
      tags: ['education', 'tech leadership', 'diversity', 'opportunity'],
    }
  ];

  const categories = [
    { name: 'All', count: blogPosts.length },
    { name: 'Technology', count: blogPosts.filter(p => p.category === 'Technology').length },
    { name: 'Renewable Energy', count: blogPosts.filter(p => p.category === 'Renewable Energy').length },
    { name: 'Philosophy', count: blogPosts.filter(p => p.category === 'Philosophy').length },
    { name: 'Personal Development', count: blogPosts.filter(p => p.category === 'Personal Development').length },
    { name: 'Investment', count: blogPosts.filter(p => p.category === 'Investment').length },
    { name: 'Engineering', count: blogPosts.filter(p => p.category === 'Engineering').length },
    { name: 'Career', count: blogPosts.filter(p => p.category === 'Career').length },
    { name: 'Web 3.0', count: blogPosts.filter(p => p.category === 'Web 3.0').length },
    { name: 'Education', count: blogPosts.filter(p => p.category === 'Education').length }
  ].filter(cat => cat.count > 0);

  // Filter and sort posts
  const filteredAndSortedPosts = useMemo(() => {
    let filtered = blogPosts;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Sort posts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return b.dateSort.localeCompare(a.dateSort);
        case 'readTime':
          const aTime = parseInt(a.readTime.match(/\d+/)[0]);
          const bTime = parseInt(b.readTime.match(/\d+/)[0]);
          return aTime - bTime;
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [selectedCategory, searchQuery, sortBy]);

  const featuredPosts = filteredAndSortedPosts.filter(post => post.featured);
  const regularPosts = filteredAndSortedPosts.filter(post => !post.featured);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
              Latest Insights
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover cutting-edge insights on technology, renewable energy, and strategic thinking. 
              Explore in-depth analysis and practical guidance for the digital age.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search articles, topics, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Controls */}
      <section className="py-8 border-b bg-background/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Categories Filter */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {categories.map((category) => (
                <Badge
                  key={category.name}
                  variant={category.name === selectedCategory ? 'default' : 'secondary'}
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all duration-200 px-4 py-2 text-sm font-medium"
                  onClick={() => setSelectedCategory(category.name)}
                >
                  {category.name} ({category.count})
                </Badge>
              ))}
            </div>

            {/* View Controls */}
            <div className="flex items-center gap-4">
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border rounded-md bg-background text-foreground text-sm"
              >
                <option value="date">Sort by Date</option>
                <option value="readTime">Sort by Read Time</option>
                <option value="title">Sort by Title</option>
              </select>

              {/* View Mode Toggle */}
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mt-4 text-sm text-muted-foreground text-center lg:text-left">
            Showing {filteredAndSortedPosts.length} article{filteredAndSortedPosts.length !== 1 ? 's' : ''}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16 flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <h2 className="text-3xl font-bold text-foreground">Featured Articles</h2>
                <Badge variant="secondary" className="px-3 py-1">
                  {featuredPosts.length}
                </Badge>
              </div>
              
              <div className={`grid gap-8 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {featuredPosts.map((post) => (
                  <PostCard key={post.slug} post={post} viewMode={viewMode} featured={true} />
                ))}
              </div>
            </div>
          )}

          {/* Regular Posts */}
          {regularPosts.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-8">
                <h2 className="text-3xl font-bold text-foreground">All Articles</h2>
                <Badge variant="outline" className="px-3 py-1">
                  {regularPosts.length}
                </Badge>
              </div>
              
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {regularPosts.map((post) => (
                  <PostCard key={post.slug} post={post} viewMode={viewMode} featured={false} />
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {filteredAndSortedPosts.length === 0 && (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <Filter className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No articles found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search terms or category filter to find what you're looking for.
                </p>
                <Button 
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchQuery('');
                  }}
                  variant="outline"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// Post Card Component
function PostCard({ post, viewMode, featured }) {
  const isListView = viewMode === 'list';
  
  return (
    <Card className={`group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
      isListView ? 'flex flex-row' : 'flex flex-col'
    } ${featured ? 'border-primary/20 bg-gradient-to-br from-primary/5 to-transparent' : ''}`}>
      <div className={`${isListView ? 'flex-1' : ''}`}>
        <CardHeader className={`${isListView ? 'pb-2' : ''}`}>
          <div className="flex items-center justify-between mb-3">
            <Badge 
              variant={featured ? 'default' : 'secondary'}
              className="text-xs font-medium"
            >
              {post.category}
            </Badge>
            {featured && (
              <Badge variant="outline" className="text-xs">
                Featured
              </Badge>
            )}
          </div>
          
          <CardTitle className={`group-hover:text-primary transition-colors ${
            isListView ? 'text-lg' : 'text-xl'
          } ${featured ? 'text-xl lg:text-2xl' : ''}`}>
            {post.title}
          </CardTitle>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className={`${isListView ? 'pt-0' : ''}`}>
          <CardDescription className={`mb-4 leading-relaxed ${
            featured ? 'text-base' : 'text-sm'
          }`}>
            {post.excerpt}
          </CardDescription>
          
          {/* Tags */}
          {post.tags && (
            <div className="flex flex-wrap gap-1 mb-4">
              {post.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs px-2 py-0.5">
                  {tag}
                </Badge>
              ))}
              {post.tags.length > 3 && (
                <Badge variant="outline" className="text-xs px-2 py-0.5">
                  +{post.tags.length - 3}
                </Badge>
              )}
            </div>
          )}
          
          <Link to={`/blog/${post.slug}`}>
            <Button 
              variant={featured ? 'default' : 'outline'} 
              className="group/btn w-full sm:w-auto"
            >
              Read More
              <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </CardContent>
      </div>
    </Card>
  );
}

