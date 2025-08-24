import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/fim-revolution" element={<FIMRevolution />} />
            <Route path="/blog/bop-interactive-article" element={<BOPInteractiveArticle />} />
            <Route path="/blog/renewable-energy-costs-2024" element={<RenewableEnergyCosts2024 />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
