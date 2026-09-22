'use client';

import React from 'react';
import Image from 'next/image';
import { anaghaContent } from '@/content/anagha';
import { ArrowUpRight, Play, Sparkles } from 'lucide-react';

export default function ContentStrategy() {
  return (
    <section id="content-strategy" className="relative w-full py-24 md:py-32 px-6 md:px-12 bg-white border-b border-ink/10">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-ink/10">
          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-saffron block mb-2">
              06 · Strategic Methodology
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-ink">
              Content Strategy &amp; Social Management
            </h2>
          </div>
          <p className="text-xs font-mono text-ink/40 tracking-wider mt-4 md:mt-0 uppercase">
            Curated Repurposing &amp; Direction
          </p>
        </div>

        {/* Strategy Pillars Stack */}
        <div className="space-y-16">
          {anaghaContent.contentStrategy.map((strat, sIdx) => (
            <div
              key={strat.id}
              className="p-8 sm:p-10 rounded-2xl bg-canvas border border-ink/10 space-y-8"
            >
              {/* Pillar Header */}
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-ink/10">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-mono text-saffron uppercase tracking-widest">
                    <span>Pillar 0{sIdx + 1}</span>
                    <span>·</span>
                    <span>{strat.client}</span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-medium text-ink">
                    {strat.title}
                  </h3>
                  <p className="text-sm font-mono text-ink/60">
                    {strat.subtitle}
                  </p>
                </div>

                {/* Grounding Strategy Points */}
                <div className="space-y-2 lg:max-w-md">
                  {strat.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start space-x-2.5 text-xs text-ink/80 font-light">
                      <Sparkles className="h-3.5 w-3.5 text-saffron shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Authentic Supplied Quote */}
              <div className="p-6 rounded-xl bg-white border border-ink/10">
                <p className="font-display text-base sm:text-lg text-ink font-normal leading-relaxed italic border-l-2 border-saffron pl-4">
                  &ldquo;{strat.quote}&rdquo;
                </p>
              </div>

              {/* Concrete Examples Grid */}
              <div className="space-y-3">
                <p className="text-xs font-mono uppercase tracking-wider text-ink/40">
                  Applied Reel &amp; Strategy Examples
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {strat.examples.map((ex) => (
                    <a
                      key={ex.id}
                      href={ex.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col justify-between p-3.5 rounded-xl bg-white border border-ink/10 transition-all hover:border-ink/30 hover:shadow-xs"
                    >
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-black/5 mb-3">
                        <Image
                          src={ex.thumbnail}
                          alt={ex.title}
                          fill
                          sizes="280px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/35 transition-colors">
                          <Play className="h-5 w-5 text-white fill-white" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs font-mono text-ink/80 pt-1">
                        <span className="truncate group-hover:text-saffron transition-colors">
                          {ex.title}
                        </span>
                        <ArrowUpRight className="h-3.5 w-3.5 text-ink/40 group-hover:text-ink shrink-0 ml-1" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
