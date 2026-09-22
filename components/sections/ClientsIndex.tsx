'use client';

import React from 'react';
import { anaghaContent } from '@/content/anagha';
import { ArrowUpRight } from 'lucide-react';

export default function ClientsIndex() {
  return (
    <section id="brands" className="relative w-full py-24 md:py-32 px-6 md:px-12 bg-canvas drafting-grid">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-ink/10">
          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-saffron block mb-2">
              03 · Brands &amp; Organisations
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-ink">
              Brands I Have Worked With
            </h2>
          </div>
          <p className="text-xs font-mono text-ink/40 tracking-wider mt-4 md:mt-0 uppercase">
            Curated Professional Client &amp; Work Index
          </p>
        </div>

        {/* Curated Index List */}
        <div className="divide-y divide-ink/10 border-y border-ink/10">
          {anaghaContent.brands.map((b) => (
            <a
              key={b.id}
              href={b.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col md:flex-row md:items-center justify-between py-6 md:py-8 px-4 transition-all duration-300 hover:bg-canvas-subtle/80 rounded-xl"
            >
              {/* Brand Mark & Name */}
              <div className="flex items-center space-x-5 md:w-1/3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-ink text-canvas font-mono text-xs font-bold tracking-wider group-hover:bg-saffron transition-colors duration-300">
                  {b.mark}
                </div>
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-medium text-ink group-hover:text-saffron transition-colors duration-300">
                    {b.name}
                  </h3>
                  <p className="text-xs font-mono text-ink/40 mt-0.5">
                    {b.role}
                  </p>
                </div>
              </div>

              {/* Scope Description */}
              <div className="mt-3 md:mt-0 md:w-1/2 text-sm text-ink/70 font-light leading-relaxed">
                {b.description}
              </div>

              {/* Direct Clickable Action */}
              <div className="mt-4 md:mt-0 flex items-center space-x-2 text-xs font-mono text-ink/40 group-hover:text-ink transition-colors duration-300">
                <span className="hidden sm:inline">VISIT SOURCE</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </a>
          ))}
        </div>

        {/* Index Verification Note */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-ink/40 pt-4">
          <span>All links connect directly to live verified profiles, stores, and channels</span>
          <span className="mt-2 sm:mt-0">7 Active IPs &amp; Collaborations</span>
        </div>

      </div>
    </section>
  );
}
