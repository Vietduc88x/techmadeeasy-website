import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import FIMRevolution from './pages/FIMRevolution';
import { BOPInteractiveArticle } from './pages/BOPInteractiveArticle';
import { RenewableEnergyCosts2024 } from './pages/RenewableEnergyCosts2024';
import { FIMImplementationRoadmap } from './pages/FIMImplementationRoadmap';
import { SolarSupplyChainCost } from './pages/SolarSupplyChainCost';
import { DigitalAIPowerSystems } from './pages/DigitalAIPowerSystems';
import { NotFound } from './pages/NotFound';

export function AppShell() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/fim-revolution" element={<FIMRevolution />} />
          <Route path="/blog/bop-interactive-article" element={<BOPInteractiveArticle />} />
          <Route path="/blog/renewable-energy-costs-2024" element={<RenewableEnergyCosts2024 />} />
          <Route path="/blog/fim-implementation-roadmap" element={<FIMImplementationRoadmap />} />
          <Route path="/blog/solar-pv-supply-chain-cost" element={<SolarSupplyChainCost />} />
          <Route path="/blog/digitalisation-ai-power-systems" element={<DigitalAIPowerSystems />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
