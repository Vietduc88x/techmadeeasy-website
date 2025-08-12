import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Wind, Brain, Globe, Cpu, Users, Eye, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function Home() {
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

      {/* Image Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center">
            <img src="/images/energy_ecosystem.png" alt="Energy Ecosystem" className="max-w-full h-auto" />
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

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Ready to Explore?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join our community and stay updated with the latest insights in technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8">
                <Link to="/blog">
                  Read Our Blog
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

