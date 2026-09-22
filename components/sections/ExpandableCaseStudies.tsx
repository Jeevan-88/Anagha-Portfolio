'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { anaghaContent, CaseStudy } from '@/content/anagha';
import { ArrowUpRight, ChevronDown, ChevronUp, CheckCircle2, Play } from 'lucide-react';

/**
 * Editorial Work Visual:
 * Autoplays video muted only when in viewport; auto-pauses when out of view.
 */
function EditorialWorkVisual({
  visual,
  onClick,
  isOpen,
}: {
  visual: CaseStudy['heroVisual'];
  onClick: () => void;
  isOpen: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    if (!visual?.video) return;

    const el = containerRef.current;
    if (!el) return;

    const nearObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNear(true);
        }
      },
      { rootMargin: '300px' }
    );

    const playObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = videoRef.current;
          if (!video) return;

          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: [0.1, 0.3, 0.6] }
    );

    nearObserver.observe(el);
    playObserver.observe(el);

    return () => {
      nearObserver.disconnect();
      playObserver.disconnect();
    };
  }, [visual?.video]);

  if (!visual) return null;

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      className="group relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden bg-canvas-subtle border border-ink/10 cursor-pointer shadow-xs transition-all duration-300 hover:border-ink/30 my-8 sm:my-10 select-none"
    >
      {/* Permanent Image Backdrop: Instant first frame with zero blank state */}
      <Image
        src={visual.src}
        alt={visual.alt}
        fill
        sizes="(max-width: 1200px) 100vw, 1200px"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
      />

      {visual.video && isNear && (
        <video
          ref={videoRef}
          src={visual.video}
          poster={visual.src}
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
      )}

      {/* Subtle overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none" />

      {/* Caption & Interaction Indicator */}
      <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-white pointer-events-none">
        <div className="max-w-xl">
          <span className="text-[10px] font-mono tracking-widest uppercase opacity-75 block mb-1 text-saffron">
            Work Showcase
          </span>
          <p className="font-display text-base sm:text-xl font-medium drop-shadow-xs line-clamp-2">
            {visual.caption || visual.alt}
          </p>
        </div>

        <div className="self-end sm:self-auto flex items-center space-x-2 text-xs font-mono uppercase tracking-wider bg-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
          <span>{isOpen ? 'Collapse Details' : 'View Full Case Study'}</span>
          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </div>
      </div>
    </div>
  );
}

export default function ExpandableCaseStudies() {
  // Default first case study (ANA Architects) open for immediate engagement
  const [openStudyId, setOpenStudyId] = useState<string | null>('ana-architects');

  const toggleStudy = (id: string) => {
    setOpenStudyId(openStudyId === id ? null : id);
  };

  return (
    <section id="work" className="relative w-full py-24 md:py-32 px-6 md:px-12 bg-white border-b border-ink/10">
      <div className="mx-auto max-w-6xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 pb-6 border-b border-ink/10">
          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-saffron block mb-2">
              04 · Selected Work
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-ink">
              Case Studies
            </h2>
          </div>
          <p className="text-xs font-mono text-ink/40 tracking-wider mt-4 md:mt-0 uppercase">
            Editorial Work Entries &amp; Walkthroughs
          </p>
        </div>

        {/* Editorial Case Study Entries */}
        <div className="divide-y divide-ink/10">
          {anaghaContent.caseStudies.map((study, idx) => {
            const isOpen = openStudyId === study.id;
            const indexStr = idx < 9 ? `0${idx + 1}` : `${idx + 1}`;

            return (
              <article
                key={study.id}
                className="py-14 sm:py-20 md:py-24 transition-colors"
              >
                {/* 1. Header Row: Number, Client, Location, Real Logo, and Work Role */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  
                  {/* Left: Index + Title + Location + Real Logo */}
                  <div className="space-y-3">
                    <span className="text-xs font-mono uppercase tracking-widest text-saffron font-semibold block">
                      {indexStr}
                    </span>

                    <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                      <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium text-ink tracking-tight">
                        {study.title}
                      </h3>

                      {study.logo && (
                        <div className="relative h-8 w-8 sm:h-9 sm:w-9 rounded-lg bg-white border border-ink/10 p-1 flex items-center justify-center shrink-0 shadow-2xs">
                          <Image
                            src={study.logo}
                            alt={study.client}
                            width={30}
                            height={30}
                            className="h-full w-full object-contain"
                          />
                        </div>
                      )}
                    </div>

                    {study.location && (
                      <p className="text-xs sm:text-sm font-mono text-ink/45 tracking-wide">
                        {study.location}
                      </p>
                    )}
                  </div>

                  {/* Right: Role / Work & Period */}
                  <div className="md:text-right max-w-md">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-ink/40 block mb-1">
                      Role / Work
                    </span>
                    <p className="font-mono text-xs sm:text-sm font-medium text-ink leading-relaxed">
                      {study.role}
                    </p>
                    <span className="text-[11px] font-mono text-ink/45 block mt-1">
                      {study.period}
                    </span>
                  </div>

                </div>

                {/* 2. Large Real Visual / Work Area */}
                <EditorialWorkVisual
                  visual={study.heroVisual}
                  isOpen={isOpen}
                  onClick={() => toggleStudy(study.id)}
                />

                {/* 3. Short Existing Description & Actions */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-2">
                  <div className="max-w-2xl">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-ink/40 block mb-2">
                      Overview
                    </span>
                    <p className="font-display text-base sm:text-lg text-ink/75 leading-relaxed font-light">
                      {study.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 shrink-0">
                    <button
                      onClick={() => toggleStudy(study.id)}
                      data-cursor-interactive="true"
                      className={`inline-flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                        isOpen
                          ? 'bg-ink text-white hover:bg-saffron shadow-xs'
                          : 'bg-canvas text-ink border border-ink/15 hover:border-ink/40 hover:bg-white shadow-2xs'
                      }`}
                      aria-expanded={isOpen}
                    >
                      <span>{isOpen ? 'Collapse Case Study' : 'View Case Study'}</span>
                      {isOpen ? (
                        <ChevronUp className="h-3.5 w-3.5" />
                      ) : (
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      )}
                    </button>

                    <a
                      href={study.primaryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-full text-xs font-mono text-ink/60 hover:text-ink hover:bg-canvas-subtle transition-colors"
                    >
                      <span>{study.urlLabel}</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>

                {/* 4. Detailed Work Walkthrough (Editorial Smooth Expansion) */}
                {isOpen && (
                  <div className="mt-12 pt-12 border-t border-ink/10 space-y-12 animate-fadeIn">
                    
                    {/* Scope of Responsibilities */}
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-ink/40 block mb-3">
                        Scope &amp; Responsibilities
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {study.scope.map((item) => (
                          <span
                            key={item}
                            className="px-3.5 py-1.5 rounded-full bg-canvas border border-ink/10 text-xs font-mono text-ink/80"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Secondary Description / Editorial Context if present */}
                    {study.secondaryDescription && (
                      <div className="p-6 rounded-2xl bg-canvas border border-ink/10 space-y-2">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-saffron block">
                          Editorial Context
                        </span>
                        <p className="text-sm sm:text-base text-ink/80 font-light leading-relaxed">
                          {study.secondaryDescription}
                        </p>
                      </div>
                    )}

                    {/* Subsections if present (e.g. Neil & Momo brand IPs) */}
                    {study.subsections && study.subsections.length > 0 && (
                      <div className="space-y-4">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-ink/40 block">
                          Brand IP Breakdown
                        </span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {study.subsections.map((sub) => (
                            <div
                              key={sub.title}
                              className="p-6 rounded-2xl bg-canvas border border-ink/10 flex flex-col justify-between space-y-4"
                            >
                              <div>
                                <h4 className="font-display text-xl font-medium text-ink">
                                  {sub.title}
                                </h4>
                                <span className="text-xs font-mono text-saffron block mt-1 mb-2 font-medium">
                                  {sub.role}
                                </span>
                                <p className="text-xs sm:text-sm text-ink/70 leading-relaxed font-light">
                                  {sub.description}
                                </p>
                              </div>
                              <a
                                href={sub.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center space-x-1.5 text-xs font-mono text-ink hover:text-saffron transition-colors pt-2"
                              >
                                <span>Visit Profile</span>
                                <ArrowUpRight className="h-3 w-3" />
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Visual Work & Collateral Gallery */}
                    {study.visualAssets && study.visualAssets.length > 0 && (
                      <div className="space-y-4">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-ink/40 block">
                          Visual Work &amp; Collateral
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                          {study.visualAssets.map((asset, aIdx) => (
                            <div
                              key={aIdx}
                              className="group overflow-hidden rounded-xl bg-canvas border border-ink/10 p-2.5 space-y-2 shadow-2xs"
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

                    {/* Related Video / Reels */}
                    {study.reels && study.reels.length > 0 && (
                      <div className="space-y-4">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-ink/40 block">
                          Reels &amp; Short-Form Visuals
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {study.reels.map((reel) => (
                            <a
                              key={reel.id}
                              href={reel.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group flex space-x-4 p-4 rounded-xl bg-canvas border border-ink/10 transition-all hover:border-ink/30 hover:shadow-xs"
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

                    {/* Verified Outcomes / Deliverables */}
                    {study.deliverables && study.deliverables.length > 0 && (
                      <div className="space-y-3 pt-6 border-t border-ink/10">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-ink/40 block">
                          Verified Outcomes &amp; Deliverables
                        </span>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {study.deliverables.map((deliv, dIdx) => (
                            <div
                              key={dIdx}
                              className="flex items-start space-x-3 p-3.5 rounded-xl bg-canvas border border-ink/5 text-xs text-ink/80 font-light"
                            >
                              <CheckCircle2 className="h-4 w-4 text-leaf shrink-0 mt-0.5" />
                              <span>{deliv}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Bottom Action Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-ink/10">
                      <a
                        href={study.primaryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 rounded-full bg-ink px-5 py-2.5 text-xs font-medium text-white hover:bg-saffron transition-colors shadow-xs"
                      >
                        <span>{study.urlLabel}</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>

                      <button
                        onClick={() => toggleStudy(study.id)}
                        className="inline-flex items-center space-x-1.5 text-xs font-mono text-ink/50 hover:text-ink transition-colors"
                      >
                        <span>Close Walkthrough</span>
                        <ChevronUp className="h-3.5 w-3.5" />
                      </button>
                    </div>

                  </div>
                )}

              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
