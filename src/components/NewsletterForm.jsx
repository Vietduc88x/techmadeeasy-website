import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function NewsletterForm({ className = '' }) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/.netlify/functions/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (response.ok) {
        setIsSubscribed(true);
        setEmail('');
        setMessage(data.message || 'Please check your email to confirm.');
      } else {
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      setMessage('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubscribed) {
    return (
      <div className={`border-y py-8 ${className}`}>
        <h2 className="text-xl font-bold">Thanks for reading.</h2>
        <p className="mt-2 text-muted-foreground">{message || 'Please check your email to confirm.'}</p>
      </div>
    );
  }

  return (
    <div className={`border-y py-8 ${className}`}>
      <div className="grid gap-5 md:grid-cols-[1fr_1.2fr] md:items-end">
        <div>
          <p className="text-sm font-semibold text-muted-foreground">Occasional email</p>
          <h2 className="mt-1 text-xl font-bold">New notes, when there is one</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">If you&rsquo;d like, I&rsquo;ll send a short email when I publish something new.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <Label htmlFor="newsletter-email" className="sr-only">Email address</Label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Input
              id="newsletter-email"
              name="email"
              autoComplete="email"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              disabled={isLoading}
              className="min-h-11 flex-1"
            />
            <Button type="submit" variant="outline" disabled={isLoading || !email} className="min-h-11">
              {isLoading ? 'Subscribing…' : 'Subscribe'}
            </Button>
          </div>
          {message && <p className="mt-3 text-sm text-muted-foreground" role="status">{message}</p>}
        </form>
      </div>
    </div>
  );
}
