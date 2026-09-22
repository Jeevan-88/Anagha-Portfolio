'use client';

import React, { useState } from 'react';
import { anaghaContent } from '@/content/anagha';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function Capabilities() {
  const [selectedCapId, setSelectedCapId] = useState<string>(anaghaContent.capabilities[0].id);

  const selectedCap =
    anaghaContent.capabilities.find((c) => c.id === selectedCapId) ||
    anaghaContent.capabilities[0];

  return (
    <section id="capabilities" className="relative w-full py-24 md:py-32 px-6 md:px-12 bg-canvas drafting-grid-dense">
      <div className="mx-auto max-w-7xl">
        
        {/* Clean Editorial Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-ink/10">
          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-saffron block mb-2">
              06 · Strategic Approach
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-ink">
              What I Bring to the Table
            </h2>
          </div>
          <p className="text-xs font-mono text-ink/40 tracking-wider mt-4 md:mt-0 uppercase">
            How I approach the work
          </p>
        </div>

        {/* Dual-Column Strategic Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left: Typographic List of Pillars */}
          <div className="lg:col-span-6 flex flex-col divide-y divide-ink/10 border-y border-ink/10">
            {anaghaContent.capabilities.map((cap) => {
              const isSelected = cap.id === selectedCapId;
              return (
                <div
                  key={cap.id}
                  onClick={() => setSelectedCapId(cap.id)}
                  onMouseEnter={() => setSelectedCapId(cap.id)}
                  className={`group cursor-pointer py-6 md:py-7 transition-all duration-300 ${
                    isSelected ? 'pl-4 md:pl-6 bg-white/70' : 'hover:pl-2'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline space-x-5">
                      <span
                        className={`text-xs font-mono font-medium tracking-widest transition-colors ${
                          isSelected ? 'text-saffron' : 'text-ink/30 group-hover:text-ink/60'
                        }`}
                      >
                        {cap.number}
                      </span>
                      <div>
                        <h3
                          className={`font-display text-2xl sm:text-3xl font-medium tracking-tight transition-all duration-300 ${
                            isSelected ? 'text-ink' : 'text-ink/40 group-hover:text-ink'
                          }`}
                        >
                          {cap.title}
                        </h3>
                        <p className="text-xs text-ink/50 font-light mt-1">
                          {cap.thesis}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`h-7 w-7 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        isSelected
                          ? 'border-saffron bg-saffron text-white rotate-45'
                          : 'border-ink/10 text-ink/30 group-hover:border-ink/30 group-hover:text-ink'
                      }`}
                    >
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </div>
                  </div>

                  {/* Mobile expansion */}
                  {isSelected && (
                    <div className="mt-4 pt-3 md:hidden space-y-3 border-t border-ink/5">
                      <p className="text-sm text-ink/80 font-light leading-relaxed">
                        {cap.description}
                      </p>
                      <div className="space-y-2 pt-1">
                        {cap.points.map((point, pIdx) => (
                          <div key={pIdx} className="flex items-start space-x-2 text-xs text-ink/70">
                            <span className="text-saffron mt-0.5">•</span>
                            <span>{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right: Deep Strategy Exploration Card (Desktop) */}
          <div className="hidden lg:block lg:col-span-6 sticky top-28">
            <div className="rounded-3xl bg-white p-10 border border-ink/10 shadow-[0_10px_35px_rgba(0,0,0,0.02)] space-y-6">
              
              {/* Pillar Number & Title */}
              <div className="border-b border-ink/10 pb-6 space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-saffron font-medium">
                  Approach {selectedCap.number} · Methodology
                </span>
                <h3 className="font-display text-3xl font-medium text-ink tracking-tight">
                  {selectedCap.title}
                </h3>
                <p className="text-base text-ink/60 font-light italic">
                  &ldquo;{selectedCap.thesis}&rdquo;
                </p>
              </div>

              {/* Detailed Explanation */}
              <div className="space-y-4">
                <span className="text-[11px] font-mono uppercase tracking-widest text-ink/40 block">
                  Strategic Process
                </span>
                <p className="text-base text-ink/80 font-light leading-relaxed">
                  {selectedCap.description}
                </p>
              </div>

              {/* Concrete Application Points */}
              <div className="rounded-2xl bg-canvas p-6 border border-ink/5 space-y-3">
                <span className="text-[11px] font-mono uppercase tracking-widest text-ink/50 block">
                  Practical Execution
                </span>
                <div className="space-y-2.5">
                  {selectedCap.points.map((point, idx) => (
                    <div key={idx} className="flex items-start space-x-3 text-sm text-ink/75 font-light">
                      <div className="mt-1 h-3.5 w-3.5 rounded-full bg-saffron/15 text-saffron flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="h-2.5 w-2.5" />
                      </div>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
