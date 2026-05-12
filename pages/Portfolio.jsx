import { useState } from 'react';
import { PortfolioGrid } from '@/components/portfolio/PortfolioGrid.jsx';
import { SEOHead } from '@/components/seo/SEOHead.jsx';
import { motion } from 'framer-motion';
import { projects, getProjectsByCategory } from '@/data/projects.js';

const CATEGORIES = ['all', 'fullstack', 'frontend', 'backend', 'mobile'];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('all');
  const filtered = getProjectsByCategory(activeCategory);

  return (
    <>
      <SEOHead title="Portfolio" description="Browse my complete portfolio of full-stack, frontend, backend, and mobile projects." />
      <div className="min-h-screen relative z-10">
        <section className="py-16 md:py-24 px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl font-bold">
                My <span className="text-gradient-purple">Projects</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg text-muted-foreground">
                A curated collection of software development projects
              </motion.p>
            </div>

            {/* Category filter */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-2 mb-10">
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${
                    activeCategory === cat
                      ? 'bg-primary text-primary-foreground'
                      : 'border border-border text-muted-foreground hover:text-foreground hover:border-primary/50'
                  }`}>
                  {cat}
                </button>
              ))}
            </motion.div>

            <PortfolioGrid projects={filtered} />
          </div>
        </section>
        <div className="h-16" />
      </div>
    </>
  );
}
