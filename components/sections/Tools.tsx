'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { anaghaContent } from '@/content/anagha';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function Tools() {
  const tools = anaghaContent.tools;
  const total = tools.length;
  const sectionRef = useRef<HTMLElement>(null);

  // Active tool index (0 to total - 1)
  const [activeIndex, setActiveIndex] = useState(1); // Default to After Effects / Premiere Pro
  // Smooth continuous rotation position
  const [rotationPos, setRotationPos] = useState(1);
  const [isManualSelection, setIsManualSelection] = useState(false);
  const manualTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Responsive radius calculation
  const [radius, setRadius] = useState(240);

  useEffect(() => {
    const updateDimensions = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth < 640) {
          setRadius(135);
        } else if (window.innerWidth < 1024) {
          setRadius(190);
        } else {
          setRadius(240);
        }
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Handle manual selection
  const selectTool = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(total - 1, index));
    setActiveIndex(clamped);
    setRotationPos(clamped);
    setIsManualSelection(true);

    if (manualTimeoutRef.current) clearTimeout(manualTimeoutRef.current);
    manualTimeoutRef.current = setTimeout(() => {
      setIsManualSelection(false);
    }, 2000);
  }, [total]);

  // Smooth scroll rotation along the arc
  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      if (isManualSelection) return;
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // When section is active in the viewport
      if (rect.bottom > 0 && rect.top < windowHeight) {
        // Map section scroll entry to exit
        // Start rotating when section enters mid-screen
        const startOffset = windowHeight * 0.75;
        const endOffset = -rect.height * 0.25;
        const totalDistance = startOffset - endOffset;
        const currentProgress = (startOffset - rect.top) / totalDistance;
        const clampedProgress = Math.max(0, Math.min(1, currentProgress));

        // Map progress (0 -> 1) to tool index (0 -> total - 1)
        const targetPos = clampedProgress * (total - 1);
        setRotationPos(targetPos);
        setActiveIndex(Math.round(targetPos));
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animationFrameId);
      if (manualTimeoutRef.current) clearTimeout(manualTimeoutRef.current);
    };
  }, [isManualSelection, total]);

  const activeTool = tools[activeIndex] || tools[0];

  return (
    <section
      id="tools"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 px-6 md:px-12 bg-white border-b border-ink/10 overflow-hidden"
    >
      <div className="mx-auto max-w-6xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 pb-6 border-b border-ink/10">
          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-saffron block mb-2">
              10 · Creative Production
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-ink">
              Tools &amp; Software
            </h2>
          </div>
          <p className="text-xs font-mono text-ink/40 tracking-wider mt-4 md:mt-0 uppercase">
            Invisible Arc Showcase · Scroll or Tap to Explore
          </p>
        </div>

        {/* Arc Showcase Container */}
        <div className="relative w-full flex flex-col items-center">
          
          {/* Navigation chevrons (left/right) */}
          <div className="w-full flex items-center justify-between max-w-xl px-2 mb-2 z-30">
            <button
              onClick={() => selectTool(activeIndex - 1)}
              disabled={activeIndex === 0}
              className={`p-2 rounded-full border border-ink/10 bg-white transition-all ${
                activeIndex === 0
                  ? 'opacity-30 cursor-not-allowed text-ink/30'
                  : 'hover:bg-canvas-subtle hover:border-ink/30 text-ink shadow-xs'
              }`}
              aria-label="Previous tool"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-[11px] font-mono uppercase tracking-widest text-ink/40">
              Tool {activeIndex + 1} of {total}
            </span>

            <button
              onClick={() => selectTool(activeIndex + 1)}
              disabled={activeIndex === total - 1}
              className={`p-2 rounded-full border border-ink/10 bg-white transition-all ${
                activeIndex === total - 1
                  ? 'opacity-30 cursor-not-allowed text-ink/30'
                  : 'hover:bg-canvas-subtle hover:border-ink/30 text-ink shadow-xs'
              }`}
              aria-label="Next tool"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Semicircular Arc Track (Entirely Invisible track, strictly 6 icons in arc geometry) */}
          <div
            className="relative w-full overflow-hidden flex items-center justify-center select-none"
            style={{ height: `${radius * 1.05 + 80}px` }}
          >
            {tools.map((tool, i) => {
              // Angular math relative to apex (0 radians)
              const diff = i - rotationPos;
              const angleDeg = diff * 32; // 32 degrees between adjacent icons
              const angleRad = (angleDeg * Math.PI) / 180;

              // Arc coordinates: apex at top (x=0, y=0), curving downward as |angle| increases
              const x = Math.sin(angleRad) * radius;
              // Semicircular drop with slight oval compression (0.7) for a wider, balanced arc
              const y = (1 - Math.cos(angleRad)) * (radius * 0.72) + 20;

              // Prominence calculation: ~3 items prominent at any time
              const absDiff = Math.abs(diff);
              const isCenter = absDiff < 0.55;
              const isFlanking = absDiff >= 0.55 && absDiff < 1.6;
              const isOuter = absDiff >= 1.6 && absDiff < 2.5;

              let scale = 0.65;
              let opacity = 0;
              let zIndex = 1;

              if (isCenter) {
                scale = 1.15;
                opacity = 1.0;
                zIndex = 20;
              } else if (isFlanking) {
                scale = 0.9;
                opacity = 0.85;
                zIndex = 10;
              } else if (isOuter) {
                scale = 0.7;
                opacity = 0.35;
                zIndex = 5;
              }

              return (
                <div
                  key={tool.name}
                  onClick={() => selectTool(i)}
                  className="absolute cursor-pointer transition-all duration-300 ease-out will-change-transform group"
                  style={{
                    transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
                    opacity,
                    zIndex,
                  }}
                >
                  <div
                    className={`relative rounded-2xl p-3 sm:p-4 bg-white border transition-all duration-300 shadow-md flex items-center justify-center ${
                      isCenter
                        ? 'border-saffron shadow-lg shadow-saffron/10 ring-2 ring-saffron/20'
                        : 'border-ink/10 hover:border-ink/40 hover:shadow-lg'
                    }`}
                    style={{ width: radius < 180 ? '58px' : '72px', height: radius < 180 ? '58px' : '72px' }}
                  >
                    <Image
                      src={tool.icon}
                      alt={tool.name}
                      width={44}
                      height={44}
                      className="object-contain transition-transform duration-300 group-hover:scale-110"
                    />

                    {/* Active pulse ring */}
                    {isCenter && (
                      <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-saffron opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-saffron"></span>
                      </span>
                    )}
                  </div>

                  {/* Centered label tooltip on prominent active item */}
                  {isCenter && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 whitespace-nowrap text-center">
                      <span className="text-[11px] font-mono font-medium text-ink bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-full border border-ink/10 shadow-xs">
                        {tool.name}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick-select tool pills for frictionless interaction */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 max-w-2xl px-2">
            {tools.map((tool, idx) => {
              const isCurrent = idx === activeIndex;
              return (
                <button
                  key={tool.name}
                  onClick={() => selectTool(idx)}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 border ${
                    isCurrent
                      ? 'bg-ink text-white border-ink shadow-xs'
                      : 'bg-canvas text-ink/70 border-ink/10 hover:border-ink/30 hover:text-ink'
                  }`}
                >
                  {tool.name.split(' ')[0] === 'Adobe'
                    ? tool.name.replace('Adobe ', '')
                    : tool.name.split('&')[0].trim()}
                </button>
              );
            })}
          </div>

          {/* Detailed Role Description Card */}
          <div className="w-full max-w-xl mt-8 p-6 sm:p-7 rounded-2xl bg-canvas border border-ink/10 shadow-xs transition-all duration-300">
            <div className="flex items-start justify-between gap-4 border-b border-ink/10 pb-4 mb-4">
              <div className="flex items-center gap-3.5">
                <div className="relative h-12 w-12 rounded-xl bg-white border border-ink/10 p-2 flex items-center justify-center shadow-xs">
                  <Image
                    src={activeTool.icon}
                    alt={activeTool.name}
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-medium text-ink">
                    {activeTool.name}
                  </h3>
                  <span className="text-[11px] font-mono text-saffron uppercase tracking-wider font-semibold">
                    {activeTool.category}
                  </span>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-leaf bg-leaf/10 px-2.5 py-1 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Active Stack</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-ink/40 block mb-1.5">
                How Anagha Used This Tool:
              </span>
              <p className="text-sm sm:text-base text-ink/80 leading-relaxed font-light">
                {activeTool.role}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
