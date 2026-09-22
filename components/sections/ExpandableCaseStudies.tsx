'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { anaghaContent } from '@/content/anagha';
import { ArrowUpRight, ChevronDown, ChevronUp, Play, CheckCircle2 } from 'lucide-react';

export default function ExpandableCaseStudies() {
  // Default first case study (ANA Architects) open for immediate engagement
  const [openStudyId, setOpenStudyId] = useState<string | null>('ana-architects');

  const toggleStudy = (id: string) => {
    setOpenStudyId(openStudyId === id ? null : id);
  };

  return (
    <section id="case-studies" className="relative w-full py-24 md:py-32 px-6 md:px-12 bg-white border-b border-ink/10">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-ink/10">
          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-saffron block mb-2">
              04 · Selected Work
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-ink">
              Case Studies
            </h2>
          </div>
          <p className="text-xs font-mono text-ink/40 tracking-wider mt-4 md:mt-0 uppercase">
            Detailed Work Walkthroughs &amp; Real Outcomes
          </p>
        </div>

        {/* Expandable Case Studies Container */}
        <div className="space-y-6">
          {anaghaContent.caseStudies.map((study, idx) => {
            const isOpen = openStudyId === study.id;

            return (
              <div
                key={study.id}
                className={`rounded-2xl border transition-all duration-500 overflow-hidden ${
                  isOpen
                    ? 'border-ink/20 bg-canvas-subtle/40 shadow-sm'
                    : 'border-ink/10 bg-white hover:border-ink/25'
                }`}
              >
                {/* Header Bar: Click to Expand / Collapse */}
                <button
                  onClick={() => toggleStudy(study.id)}
                  className="w-full flex flex-col md:flex-row md:items-center justify-between p-6 sm:p-8 text-left transition-colors duration-200 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start sm:items-center space-x-4">
                    <span className="font-mono text-xs text-saffron font-semibold px-2.5 py-1 rounded-full bg-saffron/10 mt-1 sm:mt-0">
                      0{idx + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-medium text-ink">
                        {study.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-mono text-ink/50 mt-1">
                        {study.role} · <span className="text-ink/70">{study.period}</span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 md:mt-0 flex items-center space-x-3 text-xs font-mono text-ink/60">
                    <span className="hidden sm:inline">
                      {isOpen ? 'COLLAPSE CASE STUDY' : 'EXPAND CASE STUDY'}
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/15 text-ink">
                      {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </div>
                  </div>
                </button>

                {/* Expanded Content Area */}
                {isOpen && (
                  <div className="px-6 sm:px-8 pb-8 pt-2 border-t border-ink/10 space-y-10 animate-fadeIn">
                    
                    {/* 01 · Scope Pills */}
                    <div>
                      <p className="text-xs font-mono uppercase tracking-wider text-ink/40 mb-3">
                        Scope &amp; Responsibilities
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {study.scope.map((s) => (
                          <span
                            key={s}
                            className="px-3 py-1 rounded-full bg-white border border-ink/10 text-xs font-mono text-ink/80"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 02 · The Primary Human Description */}
                    <div className="space-y-4 max-w-4xl">
                      <p className="text-xs font-mono uppercase tracking-wider text-saffron font-medium">
                        What I Handled
                      </p>
                      <p className="font-display text-lg sm:text-xl text-ink leading-relaxed font-light">
                        {study.description}
                      </p>
                      {study.secondaryDescription && (
                        <p className="text-sm sm:text-base text-ink/75 leading-relaxed font-light bg-white p-5 rounded-xl border border-ink/10">
                          {study.secondaryDescription}
                        </p>
                      )}
                    </div>

                    {/* 03 · If Subsections exist (e.g. Neil & Momo 3 IPs) */}
                    {study.subsections && study.subsections.length > 0 && (
                      <div className="space-y-4">
                        <p className="text-xs font-mono uppercase tracking-wider text-ink/40">
                          Brand IP Breakdown
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {study.subsections.map((sub) => (
                            <div
                              key={sub.title}
                              className="p-5 rounded-xl bg-white border border-ink/10 flex flex-col justify-between space-y-4"
                            >
                              <div>
                                <h4 className="font-display text-lg font-medium text-ink">
                                  {sub.title}
                                </h4>
                                <p className="text-xs font-mono text-saffron mt-0.5 mb-2">
                                  {sub.role}
                                </p>
                                <p className="text-xs text-ink/70 leading-relaxed font-light">
                                  {sub.description}
                                </p>
                              </div>
                              <a
                                href={sub.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center space-x-1.5 text-xs font-mono text-ink hover:text-saffron transition-colors"
                              >
                                <span>Visit Profile</span>
                                <ArrowUpRight className="h-3 w-3" />
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 04 · Visual Work Gallery */}
                    {study.visualAssets && study.visualAssets.length > 0 && (
                      <div className="space-y-4">
                        <p className="text-xs font-mono uppercase tracking-wider text-ink/40">
                          Visual Work &amp; Collateral
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                          {study.visualAssets.map((asset, aIdx) => (
                            <div
                              key={aIdx}
                              className="group overflow-hidden rounded-xl bg-white border border-ink/10 p-2.5 space-y-2 shadow-xs"
                            >
                              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-canvas-subtle">
                                <Image
                                  src={asset.src}
                                  alt={asset.alt}
                                  fill
                                  sizes="(max-width: 768px) 100vw, 300px"
                                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                              </div>
                              <p className="text-[11px] font-mono text-ink/60 px-1 truncate">
                                {asset.caption}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 05 · Related Video / Reel Links */}
                    {study.reels && study.reels.length > 0 && (
                      <div className="space-y-4">
                        <p className="text-xs font-mono uppercase tracking-wider text-ink/40">
                          Event &amp; Highlight Reels
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {study.reels.map((reel) => (
                            <a
                              key={reel.id}
                              href={reel.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group flex space-x-4 p-4 rounded-xl bg-white border border-ink/10 transition-all hover:border-ink/30 hover:shadow-xs"
                            >
                              <div className="relative h-24 w-18 shrink-0 overflow-hidden rounded-lg bg-black/5">
                                <Image
                                  src={reel.thumbnail}
                                  alt={reel.title}
                                  fill
                                  sizes="80px"
                                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                                  <Play className="h-5 w-5 text-white fill-white" />
                                </div>
                              </div>
                              <div className="flex flex-col justify-between py-1">
                                <div>
                                  <h4 className="font-display text-base font-medium text-ink group-hover:text-saffron transition-colors">
                                    {reel.title}
                                  </h4>
                                  <p className="text-xs text-ink/60 line-clamp-2 mt-1 font-light">
                                    {reel.caption}
                                  </p>
                                </div>
                                <span className="inline-flex items-center space-x-1 text-xs font-mono text-saffron">
                                  <span>Watch on Instagram</span>
                                  <ArrowUpRight className="h-3 w-3" />
                                </span>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 06 · Deliverables & Grounded Outcomes */}
                    <div className="space-y-3 pt-4 border-t border-ink/10">
                      <p className="text-xs font-mono uppercase tracking-wider text-ink/40">
                        Verified Outcomes
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {study.deliverables.map((deliv, dIdx) => (
                          <div
                            key={dIdx}
                            className="flex items-start space-x-3 p-3.5 rounded-lg bg-white border border-ink/5 text-xs text-ink/80 font-light"
                          >
                            <CheckCircle2 className="h-4 w-4 text-leaf shrink-0 mt-0.5" />
                            <span>{deliv}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action Row */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-ink/10">
                      <a
                        href={study.primaryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 rounded-full bg-ink px-5 py-2.5 text-xs font-medium text-canvas hover:bg-saffron transition-colors"
                      >
                        <span>{study.urlLabel}</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>

                      <button
                        onClick={() => toggleStudy(study.id)}
                        className="inline-flex items-center space-x-1.5 text-xs font-mono text-ink/50 hover:text-ink transition-colors"
                      >
                        <span>Close Case Study</span>
                        <ChevronUp className="h-3.5 w-3.5" />
                      </button>
                    </div>

                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
