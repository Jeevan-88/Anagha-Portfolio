'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { anaghaContent } from '@/content/anagha';
import { ArrowUpRight, Sparkles } from 'lucide-react';

function PillarVideoCard({
  ex,
}: {
  ex: {
    id: string;
    title: string;
    url: string;
    thumbnail: string;
    video?: string;
  };
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting && entry.intersectionRatio >= 0.35);
      },
      { threshold: [0.1, 0.35, 0.6] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    if (isVisible) {
      vid.muted = true;
      const playPromise = vid.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } else {
      if (!vid.paused) {
        vid.pause();
      }
    }
  }, [isVisible]);

  return (
    <a
      ref={cardRef}
      href={ex.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-neutral-900 border border-ink/15 shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-all duration-300 hover:border-ink/30 hover:shadow-lg focus:outline-none"
    >
      {/* 9:16 Vertical Video Frame matching Reels language */}
      <div className="relative aspect-[9/15] w-full overflow-hidden bg-neutral-950">
        {ex.video ? (
          <video
            ref={videoRef}
            src={ex.video}
            poster={ex.thumbnail}
            muted
            loop
            playsInline
            preload="metadata"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <Image
            src={ex.thumbnail}
            alt={ex.title}
            fill
            sizes="(max-width: 768px) 100vw, 360px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}

        {/* Subtle cinematic gradient overlay for readable title */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

        {/* Editorial Title Overlay at bottom */}
        <div className="pointer-events-none absolute bottom-3 left-3 right-3 z-10 text-white flex items-end justify-between">
          <p className="font-display text-sm sm:text-base font-medium leading-snug line-clamp-2 group-hover:text-saffron transition-colors">
            {ex.title}
          </p>
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/15 backdrop-blur-xs text-white/80 group-hover:bg-saffron group-hover:text-white transition-colors ml-2">
            <ArrowUpRight className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>
    </a>
  );
}

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

              {/* Concrete Examples: Clean Vertical Video Presentation */}
              <div className="space-y-4">
                <p className="text-xs font-mono uppercase tracking-wider text-ink/40">
                  Applied Reel &amp; Strategy Examples
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl">
                  {strat.examples.map((ex) => (
                    <PillarVideoCard key={ex.id} ex={ex} />
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
