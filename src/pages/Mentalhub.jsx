import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Zap, 
  Target, 
  TrendingUp, 
  Users, 
  Award,
  CheckCircle,
  ArrowRight,
  Brain,
  Heart,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function Mentalhub() {
  const features = [
    {
      icon: BookOpen,
      title: "Stoic Wisdom",
      description: "Explore the teachings of Marcus Aurelius, Epictetus, and Seneca through comprehensive articles on Stoic philosophy, practices, and principles."
    },
    {
      icon: Zap,
      title: "Stoic Practices",
      description: "Master practical Stoic exercises like negative visualization, dichotomy of control, and morning/evening reflections to build lasting resilience."
    },
    {
      icon: Target,
      title: "Daily Stoic Diary",
      description: "Maintain a daily journal for morning reflections, evening reviews, gratitude practice, and tracking your progress on the Stoic path."
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Monitor your journey with detailed analytics, streak tracking, and achievements that celebrate your growth."
    },
    {
      icon: Users,
      title: "Community Learning",
      description: "Connect with like-minded individuals pursuing mental discipline and independent thinking."
    },
    {
      icon: Award,
      title: "Personalized Path",
      description: "Bookmark favorite articles and exercises, building your own curated library of mental training resources."
    }
  ];

  const stoicPrinciples = [
    {
      icon: Shield,
      title: "Dichotomy of Control",
      description: "Focus on what you can control, accept what you cannot. This fundamental Stoic principle brings peace and clarity to daily life."
    },
    {
      icon: Brain,
      title: "Rational Thinking",
      description: "Question your assumptions, examine your judgments, and develop clear, logical thinking free from emotional bias."
    },
    {
      icon: Heart,
      title: "Virtue & Character",
      description: "Build a life of wisdom, justice, courage, and self-discipline. Character is the only true measure of success."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-900/80"></div>
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-6 bg-purple-500/20 text-purple-100 border-purple-400">
                Mental Training Hub
              </Badge>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Master Stoic Philosophy for a Resilient Life
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-blue-100">
                Build unshakeable inner strength through ancient Stoic wisdom. Practice daily reflection, master Stoic exercises, and transform challenges into opportunities for growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-900 hover:bg-blue-50"
                  asChild
                >
                  <a href="https://mentalhub-bsqdcmnk.manus.space" target="_blank" rel="noopener noreferrer">
                    <Target className="mr-2 h-5 w-5" />
                    Get Started
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-blue-900"
                  asChild
                >
                  <a href="https://mentalhub-bsqdcmnk.manus.space" target="_blank" rel="noopener noreferrer">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Explore Articles
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Live Like a Stoic Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Live Like a Stoic
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed">
              A complete Stoic training platform combining ancient philosophy with modern practice. Develop resilience, wisdom, and virtue through daily journaling, curated articles, and practical exercises.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stoic Principles Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Core Stoic Principles
            </h2>
            <p className="text-xl text-slate-600">
              Master the fundamental teachings that have guided leaders, philosophers, and seekers for over 2,000 years.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stoicPrinciples.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full text-center hover:shadow-xl transition-shadow">
                    <CardHeader>
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-8 w-8 text-purple-600" />
                      </div>
                      <CardTitle className="text-2xl">{principle.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 leading-relaxed">{principle.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">
              Why Practice Stoicism?
            </h2>
            
            <div className="space-y-6">
              {[
                "Develop unshakeable inner peace regardless of external circumstances",
                "Build resilience to handle life's challenges with grace and wisdom",
                "Improve decision-making through rational, clear thinking",
                "Reduce anxiety and stress by focusing on what you can control",
                "Cultivate meaningful relationships based on virtue and character",
                "Find purpose and meaning through living according to nature and reason"
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start space-x-4 bg-white p-6 rounded-lg shadow-sm"
                >
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                  <p className="text-lg text-slate-700">{benefit}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl font-bold mb-6">
              Begin Your Journey Today
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join a community committed to developing mental clarity, critical thinking, and stoic resilience.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-blue-50"
              asChild
            >
              <a href="https://mentalhub-bsqdcmnk.manus.space" target="_blank" rel="noopener noreferrer">
                <ArrowRight className="mr-2 h-5 w-5" />
                Start Training Now
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <blockquote className="text-2xl lg:text-3xl font-serif italic text-slate-700 mb-6">
              "You have power over your mind - not outside events. Realize this, and you will find strength."
            </blockquote>
            <p className="text-lg text-slate-500">— Marcus Aurelius, Meditations</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Mentalhub;
