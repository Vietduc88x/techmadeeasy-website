import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';

const namedPage = (loader, exportName) => lazy(() => loader().then((module) => ({ default: module[exportName] })));
const FIMRevolution = lazy(() => import('./pages/FIMRevolution.jsx'));
const BOPInteractiveArticle = namedPage(() => import('./pages/BOPInteractiveArticle.jsx'), 'BOPInteractiveArticle');
const RenewableEnergyCosts2024 = namedPage(() => import('./pages/RenewableEnergyCosts2024.jsx'), 'RenewableEnergyCosts2024');
const FIMImplementationRoadmap = namedPage(() => import('./pages/FIMImplementationRoadmap.jsx'), 'FIMImplementationRoadmap');
const SolarSupplyChainCost = namedPage(() => import('./pages/SolarSupplyChainCost.jsx'), 'SolarSupplyChainCost');
const DigitalAIPowerSystems = namedPage(() => import('./pages/DigitalAIPowerSystems.jsx'), 'DigitalAIPowerSystems');
const AccessWasAssumed = namedPage(() => import('./pages/AccessWasAssumed.jsx'), 'AccessWasAssumed');
const FIMvsEPCDecisionSheet = namedPage(() => import('./pages/FIMvsEPCDecisionSheet.jsx'), 'FIMvsEPCDecisionSheet');
const DrawingShowedAccess = namedPage(() => import('./pages/DrawingShowedAccess.jsx'), 'DrawingShowedAccess');
const FoundationBeforeGroundModel = namedPage(() => import('./pages/FoundationBeforeGroundModel.jsx'), 'FoundationBeforeGroundModel');

export function AppShell() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main id="main-content" className="flex-1">
        <Suspense fallback={<div className="container mx-auto px-4 py-16 text-sm text-muted-foreground">Loading note…</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/fim-revolution" element={<FIMRevolution />} />
          <Route path="/blog/bop-interactive-article" element={<BOPInteractiveArticle />} />
          <Route path="/blog/renewable-energy-costs-2024" element={<RenewableEnergyCosts2024 />} />
          <Route path="/blog/fim-implementation-roadmap" element={<FIMImplementationRoadmap />} />
          <Route path="/blog/solar-pv-supply-chain-cost" element={<SolarSupplyChainCost />} />
          <Route path="/blog/digitalisation-ai-power-systems" element={<DigitalAIPowerSystems />} />
          <Route path="/blog/access-was-assumed" element={<AccessWasAssumed />} />
          <Route path="/blog/fim-vs-epc-decision-sheet" element={<FIMvsEPCDecisionSheet />} />
          <Route path="/blog/drawing-showed-access" element={<DrawingShowedAccess />} />
          <Route path="/blog/foundation-before-ground-model" element={<FoundationBeforeGroundModel />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
