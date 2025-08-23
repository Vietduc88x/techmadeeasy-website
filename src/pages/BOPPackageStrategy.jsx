import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function BOPPackageStrategy() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Button asChild variant="ghost" className="mb-6 p-0 h-auto">
          <Link to="/blog" className="flex items-center text-primary hover:text-primary/80">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>

        <Card className="mb-8">
          <CardHeader>
            <Badge variant="secondary" className="w-fit mb-2">Renewable Energy</Badge>
            <CardTitle className="text-3xl font-bold mb-2">
              The BOP Package Strategy That Transformed Our Solar Portfolio
            </CardTitle>
            <p className="text-muted-foreground text-sm">
              August 23, 2025 • 5 min read
            </p>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>
              Balance of Plant (BOP) management is where average PMs fail and experts excel.
            </p>
            <h3>THE CHALLENGE:</h3>
            <ul>
              <li>❌ Finger-pointing when issues arise</li>
              <li>❌ Unclear responsibility boundaries</li>
              <li>❌ Performance guarantee gaps</li>
              <li>❌ Cost overruns from scope creep</li>
            </ul>
            <h3>THE SOLUTION: Strategic BOP Package Design</h3>
            <ul>
              <li>✅ Clear interface definitions</li>
              <li>✅ Single-point responsibility</li>
              <li>✅ Integrated performance guarantees</li>
              <li>✅ Optimized package boundaries</li>
            </ul>
            <h3>RESULTS from our 200MW solar portfolio:</h3>
            <ul>
              <li>💰 20% reduction in BOP costs</li>
              <li>⏰ 40% fewer interface issues</li>
              <li>🎯 100% on-time delivery</li>
              <li>📊 15% better performance guarantees</li>
            </ul>
            <p>
              The key? Understanding where to draw package boundaries.
            </p>
            <p>
              How do you handle BOP complexity in your projects? 👇
            </p>
            <p className="text-muted-foreground">
              #BalanceOfPlant #SolarEnergy #ProjectManagement #ProcurementExcellence
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

