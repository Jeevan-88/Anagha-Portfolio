'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { anaghaContent } from '@/content/anagha';
import { ChevronLeft, ChevronRight, ArrowUpRight, Instagram } from 'lucide-react';

export default function PhoneExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);

  const screens = anaghaContent.reels;

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

      // Map progress to active reel screen when phone is focused (between p = 0.20 and 0.85)
      if (p >= 0.20 && p < 0.85) {
        const immersionProgress = (p - 0.20) / 0.65;
        const screenIdx = Math.min(
          screens.length - 1,
          Math.floor(immersionProgress * screens.length)
        );
        setActiveScreenIndex(screenIdx);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [screens.length]);

  // Interpolated animation values
  const phoneEntrance = Math.max(0, Math.min(1, (scrollProgress - 0.15) / 0.2));
  const phoneExit = Math.max(0, Math.min(1, (scrollProgress - 0.85) / 0.15));

  const phoneScale = 0.75 + phoneEntrance * 0.25 - phoneExit * 0.2;
  const phoneOpacity = Math.max(0, Math.min(1, phoneEntrance * 1.5)) * (1 - phoneExit * 0.9);
  const phoneTranslateY = (1 - phoneEntrance) * 60 + phoneExit * 30;

  // Background cards depth recession
  const cardSpread = phoneEntrance * (1 - phoneExit);
  const cardOpacity = 1 - cardSpread * 0.65;

  const currentScreen = screens[activeScreenIndex];

  return (
    <section
      id="reels"
      ref={containerRef}
      className="relative w-full min-h-[280vh] md:min-h-[340vh] bg-canvas drafting-grid"
    >
      {/* Sticky Viewport Stage */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden px-6 md:px-12 py-8">
        
        {/* Section Editorial Header */}
        <div className="mx-auto w-full max-w-7xl flex flex-col md:flex-row md:items-end justify-between border-b border-ink/10 pb-4 z-20">
          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-saffron block mb-1">
              05 · Short-Form Content
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-ink">
              Reels &amp; Short-Form
            </h2>
          </div>
          <div className="flex items-center space-x-3 text-xs font-mono text-ink/40 mt-2 md:mt-0 uppercase">
            <span>Scroll Down To Navigate Feed</span>
            <span>·</span>
            <span className="text-saffron font-medium">{currentScreen.index}</span>
          </div>
        </div>

        {/* 3D Spatial Theater Container */}
        <div className="relative mx-auto my-auto h-[620px] w-full max-w-6xl perspective-container flex items-center justify-center">
          
          {/* ========================================================
              BACKGROUND SUBSTRATE CARDS (Real work assets floating with depth)
              ======================================================== */}
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-300 flex items-center justify-center"
            style={{ opacity: cardOpacity }}
          >
            {/* Substrate Card 1: Top-Left (Neil & Momo Persian Rose) */}
            <div
              className="absolute left-[2%] sm:left-[6%] top-[8%] w-48 sm:w-56 aspect-[4/3] rounded-2xl bg-white p-2.5 shadow-sm border border-ink/10 transition-transform duration-500 ease-out"
              style={{
                transform: `translate3d(${-cardSpread * 140}px, ${-cardSpread * 50}px, ${-cardSpread * 160}px) rotate(-3deg)`,
              }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-xl bg-canvas-subtle">
                <Image
                  src="/assets/projects/neil-momo-01.webp"
                  alt="Neil & Momo packaging"
                  fill
                  sizes="240px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Substrate Card 2: Top-Right (ANA Architects Culture) */}
            <div
              className="absolute right-[3%] sm:right-[8%] top-[10%] w-48 sm:w-60 aspect-[4/3] rounded-2xl bg-white p-2.5 shadow-sm border border-ink/10 transition-transform duration-500 ease-out"
              style={{
                transform: `translate3d(${cardSpread * 140}px, ${-cardSpread * 40}px, ${-cardSpread * 150}px) rotate(3deg)`,
              }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-xl bg-canvas-subtle">
                <Image
                  src="/assets/projects/ana_reel_2.jpg"
                  alt="ANA Architects studio culture"
                  fill
                  sizes="240px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Substrate Card 3: Bottom-Left (MUWCI Campus) */}
            <div
              className="absolute left-[3%] sm:left-[8%] bottom-[10%] w-52 sm:w-64 aspect-[16/10] rounded-2xl bg-white p-2.5 shadow-sm border border-ink/10 transition-transform duration-500 ease-out"
              style={{
                transform: `translate3d(${-cardSpread * 150}px, ${cardSpread * 60}px, ${-cardSpread * 180}px) rotate(2deg)`,
              }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-xl bg-canvas-subtle">
                <Image
                  src="/assets/projects/muwci.jpg"
                  alt="MUWCI documentary frame"
                  fill
                  sizes="260px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Substrate Card 4: Bottom-Right (Bharat Forge CSR) */}
            <div
              className="absolute right-[2%] sm:right-[7%] bottom-[12%] w-52 sm:w-64 aspect-[16/10] rounded-2xl bg-white p-2.5 shadow-sm border border-ink/10 transition-transform duration-500 ease-out"
              style={{
                transform: `translate3d(${cardSpread * 150}px, ${cardSpread * 70}px, ${-cardSpread * 170}px) rotate(-3deg)`,
              }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-xl bg-canvas-subtle">
                <Image
                  src="/assets/projects/bharat_forge.jpg"
                  alt="Bharat Forge CSR documentary"
                  fill
                  sizes="260px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* ========================================================
              THE SINGLE SMARTPHONE OBJECT (Thin black chassis silhouette)
              ======================================================== */}
          <div
            className="relative z-30 transition-transform duration-300 ease-out"
            style={{
              transform: `translate3d(0, ${phoneTranslateY}px, 0) scale(${phoneScale})`,
              opacity: phoneOpacity,
            }}
          >
            {/* The Smartphone Frame */}
            <div className="relative w-[300px] sm:w-[330px] md:w-[350px] h-[570px] sm:h-[610px] rounded-[44px] sm:rounded-[48px] border-[3px] border-[#181818] bg-canvas shadow-[0_24px_70px_rgba(0,0,0,0.14)] p-3 overflow-hidden flex flex-col justify-between">
              
              {/* Speaker & Dynamic Notch Bar */}
              <div className="relative w-full flex items-center justify-between px-4 pt-1 pb-2 text-[11px] font-mono text-ink/70 z-20">
                <span>9:41</span>
                <div className="h-4 w-20 rounded-full bg-ink/90 mx-auto" />
                <div className="flex items-center space-x-1 text-[10px]">
                  <span>5G</span>
                </div>
              </div>

              {/* Inside Screen Container: Clickable Direct Link to Reel */}
              <a
                href={currentScreen.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group/reel relative flex-1 w-full overflow-hidden rounded-[32px] sm:rounded-[36px] bg-black flex flex-col justify-between p-3.5 border border-ink/5 focus:outline-none"
              >
                {/* Header inside screen */}
                <div className="relative z-10 flex items-center justify-between pb-2 border-b border-white/10 text-white">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-saffron font-medium">
                    {currentScreen.client}
                  </span>
                  <span className="text-[10px] font-mono text-white/50">
                    {currentScreen.category}
                  </span>
                </div>

                {/* Media Presentation: Real Reel Image Preview */}
                <div className="relative my-auto aspect-[9/13] w-full overflow-hidden rounded-2xl bg-neutral-900 shadow-inner">
                  <Image
                    src={currentScreen.thumbnail}
                    alt={currentScreen.title}
                    fill
                    sizes="350px"
                    className="object-cover transition-transform duration-700 group-hover/reel:scale-105"
                    priority
                  />

                  {/* Gradient Overlay for Text Readability */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                  {/* Play / Instagram Link Trigger Indicator */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/reel:opacity-100 transition-opacity duration-300 bg-black/30">
                    <div className="flex items-center space-x-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-mono text-ink font-medium shadow-md">
                      <Instagram className="h-3.5 w-3.5 text-saffron" />
                      <span>Open on Instagram</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </div>
                  </div>

                  {/* Overlaid Title & Subtitle */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="font-display text-base sm:text-lg font-medium tracking-wide leading-tight">
                      {currentScreen.title}
                    </p>
                    <p className="text-[10px] font-mono text-white/75 mt-1">
                      {currentScreen.subtitle}
                    </p>
                  </div>
                </div>

                {/* Bottom App Bar */}
                <div className="relative z-10 pt-2 flex items-center justify-between border-t border-white/10 text-[10px] font-mono text-white/60">
                  <div className="flex items-center space-x-1.5 text-saffron">
                    <span className="h-1.5 w-1.5 rounded-full bg-saffron" />
                    <span>INSTAGRAM REEL</span>
                  </div>
                  <span className="text-white/40">{currentScreen.index}</span>
                </div>
              </a>

              {/* Bottom Home Indicator */}
              <div className="w-full flex justify-center py-1.5">
                <div className="h-1 w-24 rounded-full bg-ink/70" />
              </div>

            </div>
          </div>

        </div>

        {/* Mobile Interactive Screen Switcher Controls */}
        <div className="mx-auto w-full max-w-7xl flex items-center justify-between pt-2 border-t border-ink/5 text-xs font-mono text-ink/40 z-20">
          <div className="flex items-center space-x-2">
            {screens.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveScreenIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeScreenIndex === i ? 'w-6 bg-saffron' : 'w-2 bg-ink/20'
                }`}
                aria-label={`Go to Reel ${i + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveScreenIndex((prev) => Math.max(0, prev - 1))}
              disabled={activeScreenIndex === 0}
              className="p-1.5 rounded-full border border-ink/10 text-ink/60 hover:text-ink disabled:opacity-30"
              aria-label="Previous Reel"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setActiveScreenIndex((prev) => Math.min(screens.length - 1, prev + 1))}
              disabled={activeScreenIndex === screens.length - 1}
              className="p-1.5 rounded-full border border-ink/10 text-ink/60 hover:text-ink disabled:opacity-30"
              aria-label="Next Reel"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
