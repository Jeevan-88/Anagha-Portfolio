'use client';

import React from 'react';
import Image from 'next/image';
import { anaghaContent } from '@/content/anagha';

export default function About() {
  return (
    <section id="about" className="relative w-full py-24 md:py-32 px-6 md:px-12 bg-white border-y border-ink/10">
      <div className="mx-auto max-w-7xl">
        
        {/* Clean Editorial Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-ink/10">
          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-saffron block mb-2">
              02 · Background &amp; Focus
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-ink">
              About
            </h2>
          </div>
          <p className="text-xs font-mono text-ink/40 tracking-wider mt-4 md:mt-0 uppercase">
            Who I Am &amp; What I Do
          </p>
        </div>

        {/* Two-Column Editorial Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Portrait Frame */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-canvas-subtle border border-ink/10 shadow-sm">
              <Image
                src={anaghaContent.about.portrait}
                alt="Anagha Mhaiskar"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover object-top"
              />
            </div>

            {/* Current Role Callout */}
            <div className="rounded-xl bg-canvas-subtle p-5 border border-ink/5">
              <p className="text-xs font-mono uppercase tracking-widest text-saffron font-medium mb-1">
                Current Role
              </p>
              <p className="text-sm font-medium text-ink">
                Social Media Manager &amp; Content Strategist at ANA Architects
              </p>
            </div>
          </div>

          {/* Right Column: First-Person Human Story & Core Disciplines */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Direct Supplied Quote for ANA Architects */}
            <div className="space-y-4">
              <p className="font-display text-xl sm:text-2xl text-ink font-normal leading-relaxed border-l-2 border-saffron pl-5 py-1">
                &ldquo;{anaghaContent.about.currentRoleQuote}&rdquo;
              </p>

              <p className="text-base sm:text-lg text-ink/80 leading-relaxed font-light">
                {anaghaContent.about.extendedBio}
              </p>
            </div>

            {/* Core Disciplines List */}
            <div className="pt-6 border-t border-ink/10">
              <h3 className="text-xs font-mono uppercase tracking-wider text-ink/50 font-medium mb-4">
                Core Disciplines
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {anaghaContent.about.disciplines.map((d) => (
                  <div key={d} className="flex items-center space-x-3 p-3 rounded-lg bg-canvas-subtle/70 border border-ink/5 text-xs font-medium text-ink">
                    <span className="h-1.5 w-1.5 rounded-full bg-saffron" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Values */}
            <div className="space-y-4 pt-4 border-t border-ink/10">
              <h3 className="text-xs font-mono uppercase tracking-wider text-ink/50 font-medium">
                How I Approach The Work
              </h3>
              <div className="space-y-3">
                {anaghaContent.about.values.map((v) => (
                  <div key={v.title} className="p-4 rounded-xl border border-ink/10 bg-white">
                    <h4 className="text-sm font-medium text-ink mb-1">{v.title}</h4>
                    <p className="text-xs text-ink/70 leading-relaxed font-light">{v.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Grounding Info */}
            <div className="pt-4 border-t border-ink/10 text-xs font-mono text-ink/40 flex flex-wrap items-center justify-between gap-2">
              <span>B.Tech Information Technology, SVPCET</span>
              <span>Based in Pune, India · Working Globally</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
