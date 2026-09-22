'use client';

import React from 'react';
import Image from 'next/image';
import { anaghaContent } from '@/content/anagha';

export default function Tools() {
  return (
    <section id="tools" className="relative w-full py-24 md:py-32 px-6 md:px-12 bg-white border-b border-ink/10">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-ink/10">
          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-saffron block mb-2">
              10 · Creative Production
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-ink">
              Tools &amp; Software
            </h2>
          </div>
          <p className="text-xs font-mono text-ink/40 tracking-wider mt-4 md:mt-0 uppercase">
            Hands-on Technical Fluency
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {anaghaContent.tools.map((tool) => (
            <div
              key={tool.name}
              className="p-6 rounded-2xl bg-canvas border border-ink/10 space-y-4 hover:border-ink/30 transition-all hover:shadow-xs"
            >
              <div className="flex items-center justify-between">
                <div className="relative h-12 w-12 rounded-xl bg-white border border-ink/10 p-2.5 flex items-center justify-center">
                  <Image
                    src={tool.icon}
                    alt={tool.name}
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <span className="text-[11px] font-mono text-saffron uppercase tracking-wider">
                  {tool.category}
                </span>
              </div>

              <div>
                <h3 className="font-display text-xl font-medium text-ink">
                  {tool.name}
                </h3>
                <p className="text-xs text-ink/70 leading-relaxed font-light mt-2">
                  {tool.role}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
