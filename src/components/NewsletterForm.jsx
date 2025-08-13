import React, { useState } from 'react';
import { Mail, CheckCircle, FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

export function NewsletterForm({ className = "" }) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    
    try {
      // Use external API service (no environment variables needed)
      const response = await fetch('https://58hpi8cwjw3q.manus.space/api/newsletter/subscribe', {
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
        setMessage(data.message || 'Thank you for subscribing! Please check your email for confirmation.');
      } else {
        setMessage(data.error || 'An error occurred while subscribing. Please try again.');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      setMessage('An error occurred while subscribing. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubscribed) {
    return (
      <Card className={`border-2 border-green-200 shadow-xl ${className}`}>
        <CardContent className="text-center space-y-4 pt-6">
          <div className="flex justify-center">
            <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-foreground">Welcome to the Community!</h3>
          <p className="text-muted-foreground">
            {message || "Thank you for subscribing! Check your email for a confirmation message and your first weekly insight."}
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
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`border-2 border-primary/20 shadow-xl ${className}`}>
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
        <form onSubmit={handleSubmit} className="space-y-4">
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
          
          {message && (
            <div className={`text-center p-3 rounded-lg ${
              message.includes('error') || message.includes('Error') 
                ? 'bg-red-50 text-red-700 border border-red-200' 
                : 'bg-green-50 text-green-700 border border-green-200'
            }`}>
              {message}
            </div>
          )}
          
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
        
        <div className="border-t pt-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              What you'll get every week:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start">
                <Mail className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Latest renewable energy developments and project insights</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">AI applications and technology trends analysis</span>
              </div>
              <div className="flex items-start">
                <FileText className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Exclusive guides and templates for professionals</span>
              </div>
              <div className="flex items-start">
                <Download className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Industry networking opportunities and events</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

