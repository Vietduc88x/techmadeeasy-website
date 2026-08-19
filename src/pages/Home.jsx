import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Wind, Sun, FileText, Download, Mail, CheckCircle } from 'lucide-react';
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
      const response = await fetch('/.netlify/functions/newsletter', {
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
      title: 'Wind, nearshore first',
      description: 'Foundations, tides, packages. Offshore only where I have actually touched it.',
    },
    {
      icon: Sun,
      title: 'Solar + BESS',
      description: 'Cost, commissioning versus COD, the numbers behind the plant.',
    },
    {
      icon: FileText,
      title: 'Preconstruction',
      description: 'Layout versus schedule, FIM versus turnkey, technical and commercial.',
    },
  ];



  return (
    <div className="flex flex-col">
      <Helmet>
        <title>Tech Made Easy — Field notes from an energy PM</title>
        <meta name="description" content="Duc Hoang, PMP. Solar, BESS, onshore and nearshore wind, FPV. Preconstruction, P6, FIDIC. Vietnam and the Philippines." />
        <link rel="canonical" href="https://techmadeeasy.info/" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
              Field notes from an{' '}
              <span className="text-primary">energy PM</span>{' '}
              who has had to make the numbers work.
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              I’m Duc Hoang, PMP. Over a decade in solar, BESS, onshore and nearshore wind, and FPV. Strongest in preconstruction, technical and commercial, P6, and FIDIC. Vietnam and the Philippines for delivery. Technical advisory, desktop works, and technical due diligence in Australia, Maldives, Malaysia, and Korea.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8">
                <Link to="/blog">
                  Read the playbooks
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <a href="https://www.linkedin.com/in/hoang-vietduc-pmp%C2%AE-100842aa" target="_blank" rel="noopener">
                  LinkedIn
                </a>
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
              The job, in short
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              I also write the non-site stuff here: stories, thinking, a bit of entertainment. The job is still energy delivery.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">10+</div>
                <div className="text-lg text-muted-foreground">years, solar to nearshore wind</div>
              </div>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">BOP / FIM</div>
                <div className="text-lg text-muted-foreground">packages and EPC turnkey</div>
              </div>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">PMP · P6 · FIDIC</div>
                <div className="text-lg text-muted-foreground">preconstruction</div>
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
              What I write about
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Playbooks from delivery, not a generic tech syllabus.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="bg-card rounded-lg p-8 border">
              <blockquote className="text-lg italic text-muted-foreground mb-4">
                "I write the field notes I wish I had on site: constructability, packages, cost, the things a schedule cannot save."
              </blockquote>
              <cite className="text-sm font-semibold text-foreground">
                — Duc Hoang, PMP
              </cite>
            </div>
            <Button asChild>
              <Link to="/about">
                More about the work
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
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
                  Get the next playbook
                </CardTitle>
                <CardDescription className="text-lg text-muted-foreground">
                  I send this when I publish a playbook. No fake weekly promise.
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
                        When I publish
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
                      Thanks. I will send the next playbook when it is up.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                      <Button asChild variant="outline">
                        <Link to="/blog">
                          <FileText className="mr-2 h-4 w-4" />
                          Read the playbooks
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

              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

