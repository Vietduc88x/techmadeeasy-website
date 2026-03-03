import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, Clock, ArrowRight, Search, Filter, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { blogPosts, getCategories } from '@/data/posts';

export function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('date'); // 'date', 'readTime', 'title'

  const categories = getCategories();

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

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Blog | Tech Made Easy</title>
        <meta name="description" content="Expert articles on renewable energy, AI, digital twins, project management, and emerging technologies. In-depth analysis for professionals." />
        <link rel="canonical" href="https://techmadeeasy.info/blog" />
      </Helmet>

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
          {/* All Articles */}
          {filteredAndSortedPosts.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <h2 className="text-3xl font-bold text-foreground">All Articles</h2>
                <Badge variant="secondary" className="px-3 py-1">
                  {filteredAndSortedPosts.length}
                </Badge>
              </div>

              <div className={`grid gap-8 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'
                  : 'grid-cols-1'
              }`}>
                {filteredAndSortedPosts.map((post) => (
                  <PostCard key={post.slug} post={post} viewMode={viewMode} featured={post.featured} />
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

