'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { anaghaContent } from '@/content/anagha';
import { ArrowUpRight, Youtube, ChevronLeft, ChevronRight } from 'lucide-react';

export default function VideoEditingArchive() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const prevActiveIndexRef = useRef(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isInViewport, setIsInViewport] = useState(false);

  const projects = anaghaContent.videoEditing;

  // Viewport intersection observer to control playback and active status
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Track scroll progress through this section
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalDist = rect.height - windowHeight;

      if (totalDist <= 0) return;

      const current = -rect.top;
      const p = Math.max(0, Math.min(1, current / totalDist));
      setScrollProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Continuous active index calculation based on scroll
  // Entry buffer: 0.05 to 0.95 gives clean start and end rest states
  const clampedProgress = Math.max(0, Math.min(1, (scrollProgress - 0.08) / 0.84));
  const rawIndex = clampedProgress * (projects.length - 1);
  const activeIndex = Math.min(projects.length - 1, Math.max(0, Math.round(rawIndex)));

  // Autoplay lifecycle: play active video, pause inactive
  useEffect(() => {
    const isSectionActive = isInViewport;
    const isIndexChanged = prevActiveIndexRef.current !== activeIndex;
    prevActiveIndexRef.current = activeIndex;

    videoRefs.current.forEach((videoEl, idx) => {
      if (!videoEl) return;

      if (idx === activeIndex && isSectionActive) {
        videoEl.muted = true;
        if (isIndexChanged) {
          videoEl.currentTime = 0;
        }
        const playPromise = videoEl.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      } else {
        if (!videoEl.paused) {
          videoEl.pause();
        }
      }
    });
  }, [activeIndex, isInViewport]);

  const currentProject = projects[activeIndex];

  return (
    <section
      id="video-editing"
      ref={containerRef}
      className="relative w-full min-h-[350vh] md:min-h-[420vh] bg-canvas drafting-grid"
    >
      {/* Pinned Sticky Stage */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden px-6 md:px-12 py-8 sm:py-10">
        
        {/* Section Header */}
        <div className="mx-auto w-full max-w-7xl flex flex-col md:flex-row md:items-end justify-between border-b border-ink/10 pb-4 z-20">
          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-saffron block mb-1">
              07 · Long-Form Production
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-ink">
              Video Editing Archive
            </h2>
          </div>
          <div className="flex items-center space-x-3 text-xs font-mono text-ink/40 mt-2 md:mt-0 uppercase">
            <span>Scroll Down To Browse Stack</span>
            <span>·</span>
            <span className="text-saffron font-medium">
              0{activeIndex + 1} / 0{projects.length}
            </span>
          </div>
        </div>

        {/* ========================================================
            TRANSLUCENT STACKED VERTICAL SLIDE DECK
            ======================================================== */}
        <div className="relative mx-auto my-auto h-[540px] sm:h-[600px] md:h-[640px] w-full max-w-5xl flex items-center justify-center">
          {projects.map((project, idx) => {
            // Distance from active scroll focus: offset < 0 is past, offset > 0 is ahead
            const offset = idx - rawIndex;
            const absOffset = Math.abs(offset);

            // Is this slide currently in the visible neighborhood?
            if (absOffset > 2.5) return null;

            // Geometry calculations for realistic physical slide stacking:
            // Center slide: x=0, scale=1, rotate=0, opacity=1, zIndex=30
            // Surrounding slides: shifted horizontally, slightly scaled down, rotated, translucent
            const translateX = offset * 280; // horizontal separation
            const translateY = Math.min(absOffset * 14, 30); // subtle vertical drop for depth
            const scale = Math.max(0.78, 1 - absOffset * 0.12);
            const rotate = offset * 3.8; // subtle tilt angle (-3.8deg / +3.8deg)
            const opacity = Math.max(0.12, 1 - absOffset * 0.65);
            const zIndex = Math.round(30 - absOffset * 10);
            const isCenter = absOffset < 0.45;
            const isNearby = absOffset <= 1.2;

            return (
              <div
                key={project.id}
                className="absolute transition-transform duration-300 ease-out will-change-transform"
                style={{
                  transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale}) rotate(${rotate}deg)`,
                  opacity,
                  zIndex,
                }}
              >
                {/* The Tall Cinematic Vertical Slide Frame */}
                <div
                  className={`relative w-[280px] sm:w-[330px] md:w-[370px] h-[480px] sm:h-[540px] md:h-[580px] rounded-[32px] sm:rounded-[40px] overflow-hidden transition-all duration-300 ${
                    isCenter
                      ? 'border-2 border-ink/20 bg-black shadow-[0_28px_80px_rgba(0,0,0,0.22)] ring-1 ring-ink/10'
                      : 'border border-ink/15 bg-white/30 backdrop-blur-md shadow-[0_16px_40px_rgba(0,0,0,0.10)]'
                  }`}
                >
                  {/* Media Content */}
                  <div className="relative h-full w-full overflow-hidden bg-neutral-950">
                    {/* Instant Poster Image: Guaranteed first visible frame */}
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 330px, 370px"
                      className="h-full w-full object-cover"
                    />

                    {project.video && (isCenter || isNearby) && (
                      <video
                        ref={(el) => {
                          videoRefs.current[idx] = el;
                        }}
                        src={project.video}
                        poster={project.thumbnail}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    )}

                    {/* Editorial Translucent Gradient Overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10" />

                    {/* Top Tag Bar */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 text-white">
                      <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-saffron bg-black/50 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/10">
                        {project.client}
                      </span>
                      <span className="text-[10px] font-mono text-white/60">
                        0{idx + 1}
                      </span>
                    </div>

                    {/* Bottom Editorial Content Info */}
                    <div className="absolute bottom-4 left-4 right-4 z-10 text-white space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-white/60 block">
                        {project.format}
                      </span>
                      <h3 className="font-display text-lg sm:text-xl md:text-2xl font-medium text-white leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-white/70 font-light leading-relaxed line-clamp-2">
                        {project.context}
                      </p>

                      {/* Direct YouTube Link */}
                      <div className="pt-2">
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1.5 rounded-full bg-white/20 hover:bg-white text-white hover:text-ink px-3 py-1.5 text-[11px] font-mono transition-all duration-300 backdrop-blur-xs border border-white/20"
                        >
                          <Youtube className="h-3.5 w-3.5 text-red-500" />
                          <span>Watch on YouTube</span>
                          <ArrowUpRight className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Pagination Controls & Slide Description */}
        <div className="mx-auto w-full max-w-7xl flex flex-col sm:flex-row items-center justify-between pt-3 border-t border-ink/5 text-xs font-mono text-ink/40 z-20 gap-2 sm:gap-0">
          {/* Active Title Breadcrumb */}
          <div className="flex items-center space-x-2 text-ink/70">
            <span className="h-1.5 w-1.5 rounded-full bg-saffron" />
            <span className="font-medium text-ink truncate max-w-[260px] sm:max-w-md">
              {currentProject?.title}
            </span>
          </div>

          {/* Indicators */}
          <div className="flex items-center space-x-2">
            {projects.map((p, i) => (
              <span
                key={p.id}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === i ? 'w-6 bg-saffron' : 'w-1.5 bg-ink/20'
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
