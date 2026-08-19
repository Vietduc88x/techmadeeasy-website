import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Users, Eye, FileText, Target, Heart, Lightbulb, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function About() {
  const stats = [
    { icon: FileText, value: '44', label: 'Articles and playbooks' },
    { icon: Target, value: '10+', label: 'Years, solar to nearshore wind' },
    { icon: Users, value: 'VN · PH', label: 'Delivery; advisory in AU, MV, MY, KR' },
  ];

  const values = [
    {
      icon: Target,
      title: 'Preconstruction first',
      description: 'Layout versus schedule, FIM versus turnkey, technical and commercial — before FID, not after the overrun.',
    },
    {
      icon: Lightbulb,
      title: 'Numbers that have to work',
      description: 'Cost, commissioning versus COD, packages and EPC turnkey. Field notes from having to make the plant add up.',
    },
    {
      icon: Heart,
      title: 'Honest geography',
      description: 'Vietnam and the Philippines for delivery. Advisory, desktop works, and TDD in Australia, Maldives, Malaysia, and Korea. Offshore only where I have actually touched it.',
    },
    {
      icon: Users,
      title: 'Written for people on the job',
      description: 'Playbooks for energy PMs, owner’s engineers, and EPC teams in APAC — not a generic tech-audience blog.',
    },
  ];

  return (
    <div className="flex flex-col">
      <Helmet>
        <title>About Duc Hoang, PMP | Tech Made Easy</title>
        <meta name="description" content="Duc Hoang, PMP. Solar, BESS, onshore and nearshore wind, FPV. Preconstruction, P6, FIDIC. Vietnam and the Philippines for delivery." />
        <link rel="canonical" href="https://techmadeeasy.info/about" />
      </Helmet>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6">
              Field notes from an energy PM
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              I’m Duc Hoang, PMP. Over a decade in solar, BESS, onshore and nearshore wind, and FPV. Strongest in preconstruction, technical and commercial, P6, and FIDIC.
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
                  Why this site exists
                </h2>
                <p className="text-lg text-muted-foreground">
                  I write the field notes I wish I had on site: constructability, packages, cost, the things a schedule cannot save. Vietnam and the Philippines for delivery. Technical advisory, desktop works, and technical due diligence in Australia, Maldives, Malaysia, and Korea.
                </p>
                <p className="text-lg text-muted-foreground">
                  I also write the non-site stuff here: stories, thinking, a bit of entertainment. The job is still energy delivery — BOP / FIM packages and EPC turnkey, P6 and FIDIC, preconstruction.
                </p>
              </div>
              
              <div className="bg-card rounded-lg p-8 border">
                <blockquote className="text-lg italic text-muted-foreground mb-4">
                  "I write the field notes I wish I had on site: constructability, packages, cost, the things a schedule cannot save."
                </blockquote>
                <cite className="text-sm font-semibold text-foreground">
                  — Duc Hoang, PMP
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
            <h2 className="text-3xl font-bold text-foreground mb-4">The job, in short</h2>
            <p className="text-xl text-muted-foreground">
              The work, the experience, and the playbooks behind this site.
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
              How I work
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Preconstruction, packages, and delivery — written for energy PMs, OE, and EPC.
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

      {/* Founder Section */}
      <section className="py-20 bg-muted/30">
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
                  <h3 className="text-2xl font-bold text-foreground">Duc Hoang, PMP</h3>
                  <p className="text-lg text-primary font-semibold">Energy project manager</p>
                </div>
                
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    I’m a PMP with over a decade in solar, BESS, onshore and nearshore wind, and FPV. Some offshore, only where I have actually touched it. Strongest in preconstruction, technical and commercial, P6, and FIDIC — BOP / FIM packages and EPC turnkey.
                  </p>
                  <p>
                    Vietnam and the Philippines for delivery. Technical advisory, desktop works, and technical due diligence in Australia, Maldives, Malaysia, and Korea.
                  </p>
                  <p>
                    This site is the playbooks and field notes from that work, plus the non-site stuff: stories, thinking, a bit of entertainment.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-foreground">Expertise Areas:</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                        <span className="text-muted-foreground">Preconstruction, P6, FIDIC</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                        <span className="text-muted-foreground">Wind, nearshore first</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                        <span className="text-muted-foreground">Solar + BESS</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                        <span className="text-muted-foreground">BOP / FIM and EPC turnkey</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                        <span className="text-muted-foreground">VN + PH delivery; APAC advisory</span>
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
                    <img
                      src="/images/duc-hoang.jpg"
                      alt="Duc Hoang, PMP"
                      className="w-72 h-72 rounded-full object-cover border-4 border-primary/20 shadow-lg"
                    />
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
                Focus areas
              </h2>
              <p className="text-xl text-muted-foreground">
                The work, not a generic tech syllabus.
              </p>
            </div>
            
            <div className="space-y-8">
              <div className="bg-card rounded-lg p-6 border">
                <h3 className="text-xl font-semibold text-foreground mb-3">Wind, nearshore first</h3>
                <p className="text-muted-foreground">
                  Foundations, tides, packages. Onshore and nearshore wind, FPV. Offshore only where I have actually touched it.
                </p>
              </div>
              
              <div className="bg-card rounded-lg p-6 border">
                <h3 className="text-xl font-semibold text-foreground mb-3">Solar + BESS</h3>
                <p className="text-muted-foreground">
                  Cost, commissioning versus COD, the numbers behind the plant. Solar and battery storage from preconstruction through delivery.
                </p>
              </div>
              
              <div className="bg-card rounded-lg p-6 border">
                <h3 className="text-xl font-semibold text-foreground mb-3">Preconstruction</h3>
                <p className="text-muted-foreground">
                  Layout versus schedule, FIM versus turnkey, technical and commercial. P6 and FIDIC. BOP / FIM packages and EPC turnkey.
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
              Guest notes
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Written for APAC energy PMs, owner’s engineers, and EPC teams — not a generic tech-savvy audience.
            </p>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                If you work solar, BESS, wind, or FPV and have a field note worth publishing, get in touch.
              </p>
              <p className="text-muted-foreground">
                Ads and partnerships: same readers. Energy delivery, not lifestyle tech.
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

