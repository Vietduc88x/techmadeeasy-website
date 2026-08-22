import React from 'react';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                <Zap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Tech Made Easy</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Field notes on preconstruction, packages, and delivery for renewable-energy teams.
            </p>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
            <Link to="/">Home</Link>
            <Link to="/blog">Notes</Link>
            <Link to="/about">About</Link>
          </nav>
        </div>

        <div className="mt-8 border-t border-border pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Tech Made Easy. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

