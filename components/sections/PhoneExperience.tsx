'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { anaghaContent } from '@/content/anagha';
import { Instagram, ArrowUpRight } from 'lucide-react';

export default function PhoneExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const activeIndexRef = useRef(0);
  const animValuesRef = useRef<{ scale: number; x: number; opacity: number; rotation: number }[]>([]);
  const rafIdRef = useRef<number>(0);
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);
  const [isInViewport, setIsInViewport] = useState(false);
  const [headerOpacity, setHeaderOpacity] = useState(1);

  const screens = anaghaContent.reels;
  const totalScreens = screens.length;

  // Initialize animation values
  useEffect(() => {
    animValuesRef.current = screens.map(() => ({
      scale: 0.7,
      x: 0,
      opacity: 0,
      rotation: 0,
    }));
  }, [screens.length]);

  // Viewport intersection observer
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInViewport(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Scroll-driven animation loop using rAF
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const tick = () => {
      rafIdRef.current = requestAnimationFrame(tick);

      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalDist = rect.height - windowHeight;
      if (totalDist <= 0) return;

      const current = -rect.top;
      const p = Math.max(0, Math.min(1, current / totalDist));

      // Map progress to active reel index
      let newIndex: number;
      if (p < 0.18) {
        newIndex = 0;
      } else if (p >= 0.88) {
        newIndex = totalScreens - 1;
      } else {
        const immersionProgress = (p - 0.18) / 0.70;
        newIndex = Math.min(totalScreens - 1, Math.floor(immersionProgress * totalScreens));
      }

      if (newIndex !== activeIndexRef.current) {
        activeIndexRef.current = newIndex;
        setActiveScreenIndex(newIndex);
      }

      // Header fade
      const entrance = Math.max(0, Math.min(1, (p - 0.05) / 0.15));
      const exit = Math.max(0, Math.min(1, (p - 0.85) / 0.12));
      const hOpacity = Math.max(0, entrance * (1 - exit));
      setHeaderOpacity(hOpacity);

      // Interpolate transform values for each reel
      const active = activeIndexRef.current;
      const lerpFactor = prefersReducedMotion ? 1 : 0.12;

      for (let i = 0; i < totalScreens; i++) {
        const diff = i - active;
        const absDiff = Math.abs(diff);

        let targetScale: number, targetX: number, targetOpacity: number, targetRotation: number;

        if (absDiff === 0) {
          targetScale = 1;
          targetX = 0;
          targetOpacity = 1;
          targetRotation = 0;
        } else if (absDiff === 1) {
          targetScale = 0.82;
          targetX = diff * 70;
          targetOpacity = 0.35;
          targetRotation = diff * -2.5;
        } else if (absDiff === 2) {
          targetScale = 0.72;
          targetX = diff * 120;
          targetOpacity = 0.15;
          targetRotation = diff * -4;
        } else {
          targetScale = 0.65;
          targetX = diff * 150;
          targetOpacity = 0;
          targetRotation = diff * -5;
        }

        const v = animValuesRef.current[i];
        if (v) {
          v.scale += (targetScale - v.scale) * lerpFactor;
          v.x += (targetX - v.x) * lerpFactor;
          v.opacity += (targetOpacity - v.opacity) * lerpFactor;
          v.rotation += (targetRotation - v.rotation) * lerpFactor;

          // Apply transforms directly to DOM (bypass React render)
          const el = document.getElementById(`reel-card-${i}`);
          if (el) {
            el.style.transform = `translate3d(${v.x}px, 0, 0) scale(${v.scale}) rotate(${v.rotation}deg)`;
            el.style.opacity = String(Math.max(0, v.opacity));
            el.style.zIndex = String(absDiff === 0 ? 30 : 20 - absDiff);
          }
        }
      }
    };

    rafIdRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafIdRef.current);
  }, [totalScreens]);

  // Video playback lifecycle
  useEffect(() => {
    videoRefs.current.forEach((videoEl, idx) => {
      if (!videoEl) return;

      if (idx === activeScreenIndex && isInViewport) {
        videoEl.muted = true;
        videoEl.currentTime = 0;
        const playPromise = videoEl.play();
        if (playPromise) playPromise.catch(() => {});
      } else {
        if (!videoEl.paused) videoEl.pause();
      }
    });
  }, [activeScreenIndex, isInViewport]);

  const currentScreen = screens[activeScreenIndex];

  return (
    <section
      id="reels"
      ref={containerRef}
      className="relative w-full min-h-[320vh] md:min-h-[400vh] bg-canvas"
    >
      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden px-6 md:px-12 py-8">

        {/* Editorial Header */}
        <div
          className="mx-auto w-full max-w-7xl flex flex-col md:flex-row md:items-end justify-between border-b border-ink/10 pb-4 z-20"
          style={{ opacity: headerOpacity }}
        >
          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-saffron block mb-1">
              05 · Short-Form Content
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-ink">
              Reels &amp; Short-Form
            </h2>
          </div>
          <div className="flex items-center space-x-3 text-xs font-mono text-ink/40 mt-2 md:mt-0 uppercase">
            <span>Scroll to Browse</span>
            <span>·</span>
            <span className="text-saffron font-medium">{currentScreen.index}</span>
          </div>
        </div>

        {/* Reel Stack Container */}
        <div className="relative mx-auto my-auto w-full max-w-6xl flex items-center justify-center" style={{ height: 'calc(100vh - 200px)' }}>
          {screens.map((screen, idx) => {
            const isActive = idx === activeScreenIndex;
            const isNearby = Math.abs(idx - activeScreenIndex) <= 2;

            return (
              <a
                key={screen.id}
                id={`reel-card-${idx}`}
                href={screen.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group/reel absolute flex items-center justify-center"
                style={{
                  opacity: 0,
                  transform: 'scale(0.7)',
                  willChange: 'transform, opacity',
                  pointerEvents: isActive ? 'auto' : 'none',
                }}
              >
                {/* Vertical Reel Frame */}
                <div className={`relative overflow-hidden rounded-2xl border transition-shadow duration-500 ${
                  isActive
                    ? 'border-white/20 shadow-[0_8px_60px_rgba(0,0,0,0.25)]'
                    : 'border-white/8 shadow-lg shadow-black/10'
                }`}
                  style={{ width: 'clamp(220px, 28vw, 320px)', aspectRatio: '9/16' }}
                >
                  {/* Video */}
                  <video
                    ref={(el) => { videoRefs.current[idx] = el; }}
                    src={screen.video}
                    poster={screen.thumbnail}
                    muted
                    loop
                    playsInline
                    preload={isActive ? 'auto' : isNearby ? 'metadata' : 'none'}
                    className="absolute inset-0 h-full w-full object-cover"
                  />

                  {/* Bottom Gradient for Text */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

                  {/* Content Overlay (active reel only via CSS) */}
                  <div className={`absolute inset-0 flex flex-col justify-between p-4 transition-opacity duration-300 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}>
                    {/* Top Bar */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-saffron font-medium drop-shadow-sm">
                        {screen.client}
                      </span>
                      <span className="text-[10px] font-mono text-white/50 drop-shadow-sm">
                        {screen.category}
                      </span>
                    </div>

                    {/* Bottom Info */}
                    <div>
                      <p className="font-display text-sm sm:text-base font-medium text-white leading-tight drop-shadow-md">
                        {screen.title}
                      </p>
                      <p className="text-[10px] font-mono text-white/70 mt-1 drop-shadow-sm">
                        {screen.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Hover: Open on Instagram */}
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 group-hover/reel:opacity-100 transition-opacity duration-300 bg-black/30 z-20">
                    <div className="flex items-center space-x-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-mono text-ink font-medium shadow-md">
                      <Instagram className="h-3.5 w-3.5 text-saffron" />
                      <span>Open on Instagram</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* Dot Indicators */}
        <div
          className="mx-auto w-full max-w-7xl flex items-center justify-center pt-3 z-20"
          style={{ opacity: headerOpacity }}
        >
          <div className="flex items-center space-x-1.5">
            {screens.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  activeIndexRef.current = i;
                  setActiveScreenIndex(i);
                }}
                className={`h-1.5 rounded-full shrink-0 transition-all duration-300 ${
                  activeScreenIndex === i ? 'w-5 bg-saffron' : 'w-1.5 bg-ink/20'
                }`}
                aria-label={`Go to Reel ${i + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
