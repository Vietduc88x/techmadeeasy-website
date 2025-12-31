import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Wind, Brain, Globe, Cpu, Users, Eye, FileText, Download, Mail, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export function Home() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('https://mzhyi8cdlj3o.manus.space/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setIsSubscribed(true);
        setEmail('');
        // You could show different messages based on data.status
        console.log('Subscription successful:', data);
      } else {
        // Handle error cases
        alert(data.error || 'An error occurred while subscribing');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      alert('An error occurred while subscribing. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: Wind,
      title: 'Renewable Energy',
      description: 'Explore offshore wind farms, components, technologies and supply chains.',
    },
    {
      icon: Brain,
      title: 'Artificial Intelligence',
      description: 'Discover AI applications, tools and how they revolutionize industries.',
    },
    {
      icon: Globe,
      title: 'Web 3.0 & Open Web',
      description: 'Learn about decentralization, privacy, and digital ownership.',
    },
    {
      icon: Cpu,
      title: 'Digital Twins',
      description: 'Understand digital twin technology and its real-world applications.',
    },
  ];



  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
              Making Technology{' '}
              <span className="text-primary">Accessible</span>{' '}
              to Everyone
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              We believe that technology should be easy to understand and that everyone should have access to the tools they need to succeed in today's digital world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8">
                <Link to="/blog">
                  Explore Our Blog
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Stats Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-secondary/5 to-primary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Empowering the Future of Technology
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Our mission is to bridge the gap between complex technology and everyday understanding, making innovation accessible to everyone.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">17+</div>
                <div className="text-lg text-muted-foreground">Expert Articles</div>
              </div>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">4</div>
                <div className="text-lg text-muted-foreground">Focus Areas</div>
              </div>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">100%</div>
                <div className="text-lg text-muted-foreground">Accessible Content</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Our Focus Areas
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We provide insightful and comprehensive content that simplifies the complexities of technology across multiple domains.
            </p>
          </div>

          {/* Renewable Energy System Visualization */}
          <div className="mb-16">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Integrated Renewable Energy Ecosystem
                </h3>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Explore how wind, solar, hydrogen, and smart grid technologies work together to create a sustainable energy future. From generation to storage and distribution, see the complete renewable energy value chain.
                </p>
              </div>
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 shadow-lg">
                <img 
                  src="/renewable-energy-system.png" 
                  alt="Integrated Renewable Energy System - Wind turbines, solar panels, hydrogen production, smart grid, and energy storage working together"
                  className="w-full h-auto rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                  style={{ maxHeight: '600px', objectFit: 'contain' }}
                />
                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground italic">
                    Complete renewable energy ecosystem: From offshore wind and solar generation to hydrogen production, smart grid integration, and end-user applications
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Magnet Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 via-secondary/10 to-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-primary/20 shadow-xl">
              <CardHeader className="text-center pb-6">
                <div className="flex justify-center mb-4">
                  <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full">
                    <Download className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                  Free Download: Renewable Energy Project Management Checklist
                </CardTitle>
                <CardDescription className="text-lg text-muted-foreground">
                  Get our comprehensive 150+ item checklist used by project managers worldwide to deliver successful renewable energy projects on time and within budget.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground">What's Included:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        7-phase project roadmap with 150+ actionable items
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        Risk mitigation strategies for common challenges
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        Stakeholder management templates
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        Quality assurance protocols
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        Critical success factors and pitfalls to avoid
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground">Perfect for:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center">
                        <Users className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0" />
                        Project managers in renewable energy
                      </li>
                      <li className="flex items-center">
                        <Users className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0" />
                        Engineering consultants
                      </li>
                      <li className="flex items-center">
                        <Users className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0" />
                        Energy company executives
                      </li>
                      <li className="flex items-center">
                        <Users className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0" />
                        Clean energy investors
                      </li>
                      <li className="flex items-center">
                        <Users className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0" />
                        Anyone managing complex technical projects
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-4">
                      Join 2,000+ professionals who have downloaded this guide
                    </p>
                    <Button size="lg" className="text-lg px-8" asChild>
                      <a href="/Renewable-Energy-Workshop-01.pdf" download target="_blank" rel="noopener noreferrer">
                        <Download className="mr-2 h-5 w-5" />
                        Download Free Checklist
                      </a>
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      No email required • Instant download • 100% Free
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Our Mission
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground">
                  At Tech-Made-Easy, our mission is to empower individuals and businesses by making technology easy to understand and accessible to all. We believe that technology should be an enabler, not a barrier, to progress and innovation.
                </p>
                <p className="text-lg text-muted-foreground">
                  Our goal is to simplify complex technical concepts and provide insightful analysis and commentary to help our readers navigate the fast-changing world of technology.
                </p>
                <Button asChild className="mt-6">
                  <Link to="/about">
                    Learn More About Us
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              <div className="flex justify-center items-center">
                <img src="/duc_hoang_profile.png" alt="Duc Hoang, Founder" className="rounded-lg shadow-lg max-w-full h-auto" />
              </div>

              <div className="bg-card rounded-lg p-8 border">
                <blockquote className="text-lg italic text-muted-foreground mb-4">
                  "Our blog is built on the belief that technology should be accessible to all. By breaking down complex concepts and making them easy to understand, we\'re helping to create a more informed and empowered society."
                </blockquote>
                <cite className="text-sm font-semibold text-foreground">
                  — Duc Hoang, Founder & CEO
                </cite>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Card className="border-2 border-primary/20 shadow-xl">
              <CardHeader className="text-center pb-6">
                <div className="flex justify-center mb-4">
                  <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full">
                    <Mail className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                  Stay Ahead of Technology Trends
                </CardTitle>
                <CardDescription className="text-lg text-muted-foreground">
                  Join 5,000+ professionals who receive weekly insights on renewable energy, AI, and emerging technologies. Get exclusive content, early access to guides, and expert analysis delivered to your inbox.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!isSubscribed ? (
                  <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="flex-1 text-lg py-6"
                        disabled={isLoading}
                      />
                      <Button 
                        type="submit" 
                        size="lg" 
                        className="text-lg px-8 py-6"
                        disabled={isLoading || !email}
                      >
                        {isLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Subscribing...
                          </>
                        ) : (
                          <>
                            <Mail className="mr-2 h-5 w-5" />
                            Subscribe Free
                          </>
                        )}
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm text-muted-foreground">
                      <div className="flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Weekly insights
                      </div>
                      <div className="flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        No spam, ever
                      </div>
                      <div className="flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Unsubscribe anytime
                      </div>
                    </div>
                  </form>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="flex justify-center">
                      <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Welcome to the Community!</h3>
                    <p className="text-muted-foreground">
                      Thank you for subscribing! Check your email for a welcome message and your first weekly insight.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                      <Button asChild variant="outline">
                        <Link to="/blog">
                          <FileText className="mr-2 h-4 w-4" />
                          Explore Our Blog
                        </Link>
                      </Button>
                      <Button asChild>
                        <a href="/Renewable-Energy-Workshop-01.pdf" download target="_blank" rel="noopener noreferrer">
                          <Download className="mr-2 h-4 w-4" />
                          Download Free Guide
                        </a>
                      </Button>
                    </div>
                  </div>
                )}
                
                <div className="border-t pt-6">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-4">
                      What you'll get every week:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-start">
                        <Wind className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">Latest renewable energy developments and project insights</span>
                      </div>
                      <div className="flex items-start">
                        <Brain className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">AI applications and technology trends analysis</span>
                      </div>
                      <div className="flex items-start">
                        <FileText className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">Exclusive guides and templates for professionals</span>
                      </div>
                      <div className="flex items-start">
                        <Users className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">Industry networking opportunities and events</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

