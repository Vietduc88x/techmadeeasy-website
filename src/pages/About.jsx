import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Eye, FileText, Target, Heart, Lightbulb, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function About() {
  const stats = [
    { icon: Users, value: '5,000+', label: 'Newsletter Subscribers' },
    { icon: Eye, value: '50+', label: 'Countries Reached' },
    { icon: FileText, value: '17+', label: 'Expert Articles Published' },
  ];

  const values = [
    {
      icon: Target,
      title: 'Simplifying Complex Concepts',
      description: 'We break down complex technical concepts into easy-to-understand explanations.',
    },
    {
      icon: Lightbulb,
      title: 'Providing Insightful Analysis',
      description: 'We offer in-depth analysis and commentary on the latest technology trends.',
    },
    {
      icon: Heart,
      title: 'Empowering Individuals',
      description: 'We empower individuals and businesses to succeed in the digital world.',
    },
    {
      icon: Users,
      title: 'Making Technology Accessible',
      description: 'We believe technology should be accessible to everyone, not just experts.',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6">
              About Tech Made Easy
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Your go-to resource for technology insights and education. We believe that technology can be understandable, accessible and even enjoyable.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                  Our Mission
                </h2>
                <p className="text-lg text-muted-foreground">
                  At Tech-Made-Easy, our mission is to empower individuals and businesses by making technology easy to understand and accessible to all. We believe that technology should be an enabler, not a barrier, to progress and innovation.
                </p>
                <p className="text-lg text-muted-foreground">
                  Our goal is to simplify complex technical concepts and provide insightful analysis and commentary to help our readers navigate the fast-changing world of technology. We strive to be a trusted resource for our community, providing accurate information, expert opinions, and practical advice.
                </p>
              </div>
              
              <div className="bg-card rounded-lg p-8 border">
                <blockquote className="text-lg italic text-muted-foreground mb-4">
                  "Our blog is built on the belief that technology should be accessible to all. By breaking down complex concepts and making them easy to understand, we're helping to create a more informed and empowered society."
                </blockquote>
                <cite className="text-sm font-semibold text-foreground">
                  — Tech Made Easy Team
                </cite>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Impact</h2>
            <p className="text-xl text-muted-foreground">
              We're proud to serve a growing community of technology enthusiasts.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg">
                    <stat.icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-muted-foreground text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              These core principles guide everything we do at Tech Made Easy.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section - Hidden */}
      <section className="py-20 bg-muted/30" style={{display: 'none'}}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Meet Our Founder
              </h2>
              <p className="text-xl text-muted-foreground">
                Learn about the vision and expertise behind Tech Made Easy.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-foreground">Duc Hoang, PMP®</h3>
                  <p className="text-lg text-primary font-semibold">Founder & Technology Expert</p>
                </div>
                
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Duc Hoang is a certified Project Management Professional (PMP®) with extensive experience in renewable energy project management and technology implementation. His passion for making complex technology accessible to everyone led to the creation of Tech Made Easy.
                  </p>
                  <p>
                    With a deep understanding of offshore wind development, AI applications, and emerging technologies, Duc brings real-world expertise to every article and guide published on this platform.
                  </p>
                  <p>
                    His mission is to bridge the gap between complex technical concepts and practical understanding, empowering professionals and enthusiasts to succeed in today's rapidly evolving technology landscape.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-foreground">Expertise Areas:</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                        <span className="text-muted-foreground">Renewable Energy Project Management</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                        <span className="text-muted-foreground">Offshore Wind Farm Development</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                        <span className="text-muted-foreground">AI Applications in Energy</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                        <span className="text-muted-foreground">Digital Transformation</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                        <span className="text-muted-foreground">Crypto Network Technologies</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                        <span className="text-muted-foreground">Technical Writing & Education</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button asChild>
                    <a 
                      href="https://www.linkedin.com/in/hoang-vietduc-pmp%C2%AE-100842aa/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center"
                    >
                      Connect on LinkedIn
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-80 h-80 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                    <div className="w-72 h-72 bg-card rounded-full border-4 border-primary/20 flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto flex items-center justify-center">
                          <Users className="h-12 w-12 text-primary" />
                        </div>
                        <div>
                          <p className="font-bold text-foreground">Duc Hoang</p>
                          <p className="text-sm text-muted-foreground">PMP® Certified</p>
                          <p className="text-xs text-muted-foreground">Technology Expert</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Focus Areas Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Our Focus Areas
              </h2>
              <p className="text-xl text-muted-foreground">
                We cover a wide range of technology topics to keep you informed.
              </p>
            </div>
            
            <div className="space-y-8">
              <div className="bg-card rounded-lg p-6 border">
                <h3 className="text-xl font-semibold text-foreground mb-3">Renewable Energy</h3>
                <p className="text-muted-foreground">
                  At first, this blog will be more focused on the renewable energy sector including onshore wind and offshore wind. We explore wind farms, their components, technologies and supply chains.
                </p>
              </div>
              
              <div className="bg-card rounded-lg p-6 border">
                <h3 className="text-xl font-semibold text-foreground mb-3">Artificial Intelligence</h3>
                <p className="text-muted-foreground">
                  AI is like teaching computers to think and learn just like us using math and code. We discuss different AI apps and tools that can help us get our work done faster and better.
                </p>
              </div>
              
              <div className="bg-card rounded-lg p-6 border">
                <h3 className="text-xl font-semibold text-foreground mb-3">Crypto Network & Open Web</h3>
                <p className="text-muted-foreground">
                  Crypto Network is all about decentralization, privacy, and shifting digital ownership from companies to decentralized networks, builders, and users. We discover together what open webs are, their use cases, and potential investments.
                </p>
              </div>
              
              <div className="bg-card rounded-lg p-6 border">
                <h3 className="text-xl font-semibold text-foreground mb-3">Digital Twins</h3>
                <p className="text-muted-foreground">
                  Digital Twins represent the future of technology, enabling virtual representations of physical systems. We explore their applications and potential impact across industries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guest Author Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Join Our Community
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              If you have expertise in technology and a passion for making it accessible to everyone, we'd love to hear from you.
            </p>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Submit a guest post to our blog and join us in our mission to make technology easy.
              </p>
              <p className="text-muted-foreground">
                You have a cool idea that you think fits our blog and our style? Send us your idea and let's talk!
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button asChild size="lg">
                <Link to="/contact">
                  Get in Touch
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/blog">Read Our Blog</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

