'use client';

import React, { useState } from 'react';
import { anaghaContent } from '@/content/anagha';
import { Check, ArrowUpRight } from 'lucide-react';

export default function Services() {
  const [activeCategory, setActiveCategory] = useState<string>('Monthly Retainers');

  const tiers = anaghaContent.services;
  const currentTier = tiers.find((t) => t.category === activeCategory) || tiers[0];

  return (
    <section id="services" className="relative w-full py-24 md:py-32 px-6 md:px-12 bg-white border-y border-ink/10">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-ink/10">
          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-saffron block mb-2">
              11 · Service Menu
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-ink">
              How We Can Work Together
            </h2>
          </div>
          <p className="text-xs font-mono text-ink/40 tracking-wider mt-4 md:mt-0 uppercase">
            Retainers · Singles · Custom Scope
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex flex-wrap gap-3 mb-12">
          {tiers.map((t) => (
            <button
              key={t.category}
              onClick={() => setActiveCategory(t.category)}
              className={`rounded-full px-6 py-2.5 text-xs font-mono tracking-wider transition-all duration-300 ${
                activeCategory === t.category
                  ? 'bg-ink text-white shadow-md'
                  : 'bg-canvas-subtle text-ink/70 hover:bg-ink/10 hover:text-ink'
              }`}
            >
              {t.category.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Overview Header for Active Tier */}
        <div className="rounded-3xl bg-canvas p-8 sm:p-12 md:p-14 border border-ink/10 space-y-8">
          
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-saffron font-medium">
              {currentTier.subtitle}
            </span>
            <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium text-ink tracking-tight">
              {currentTier.title}
            </h3>
            <p className="text-base sm:text-lg text-ink/80 font-light leading-relaxed">
              {currentTier.description}
            </p>
          </div>

          {/* Deliverables List */}
          <div className="pt-4 border-t border-ink/10">
            <span className="text-xs font-mono uppercase tracking-widest text-ink/40 block mb-4">
              Included Deliverables &amp; Scope
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentTier.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start space-x-3 p-4 rounded-xl bg-white border border-ink/10 text-xs sm:text-sm text-ink/80 font-light"
                >
                  <div className="mt-0.5 h-4 w-4 rounded-full bg-leaf/15 text-leaf flex items-center justify-center shrink-0">
                    <Check className="h-2.5 w-2.5" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Ideal Fit & Contact Prompt */}
          <div className="pt-8 border-t border-ink/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-ink/60">
            <div className="max-w-lg">
              <span className="text-ink font-medium">Ideal Application: </span>
              <span>{currentTier.fit}</span>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center space-x-2 rounded-full border border-ink/20 px-5 py-2 text-xs font-mono text-ink transition-colors hover:border-saffron hover:bg-saffron hover:text-white"
            >
              <span>Discuss Requirements</span>
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
