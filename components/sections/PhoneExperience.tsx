'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { Play, ArrowUpRight, ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';

interface PhoneScreen {
  id: string;
  number: string;
  client: string;
  category: string;
  title: string;
  subtitle: string;
  image: string;
  video?: string;
  palette: string;
}

export default function PhoneExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const screens: PhoneScreen[] = [
    {
      id: 'neil-momo',
      number: '01 / 04',
      client: 'NEIL & MOMO',
      category: 'SOCIAL & PACKAGING',
      title: 'Botanical Skincare',
      subtitle: 'Persian Rose & Honey Multani Mitti',
      image: '/assets/projects/neil-momo-01.webp',
      palette: '#FAF3EB',
    },
    {
      id: 'warrior-deck',
      number: '02 / 04',
      client: 'WARRIOR DECK',
      category: 'REEL EDITING',
      title: 'Try It On Athleisure',
      subtitle: 'Dynamic Cuts & Movement Reel',
      image: '/assets/projects/warrior-deck-01.webp',
      video: '/assets/projects/anagha-showreel.mp4',
      palette: '#F0F4F8',
    },
    {
      id: 'maac',
      number: '03 / 04',
      client: 'MAAC INSTITUTE',
      category: 'MOTION DESIGN',
      title: 'ADVFX Plus Visuals',
      subtitle: '3D Sequence & Promotional Creative',
      image: '/assets/projects/campaign-posts-02.webp',
      palette: '#F8F5F2',
    },
    {
      id: 'campaigns',
      number: '04 / 04',
      client: 'STRATEGIC CAMPAIGNS',
      category: 'CONTENT & GRAPHICS',
      title: 'Choose To Thinq & Cultural',
      subtitle: 'Thought Leadership & Festival Posts',
      image: '/assets/projects/campaign-posts-01.webp',
      palette: '#FDF7F2',
    },
  ];

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

      // Map progress to active reel screen when phone is focused (between p = 0.35 and 0.85)
      if (p >= 0.35 && p < 0.85) {
        const immersionProgress = (p - 0.35) / 0.5; // 0.0 to 1.0
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

  // Handle video playback for active screen
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (activeScreenIndex === 1 && scrollProgress >= 0.35 && scrollProgress <= 0.85) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [activeScreenIndex, scrollProgress]);

  // Interpolated animation values
  // Stage 1: p < 0.22 (Cards visible, phone hidden)
  // Stage 2: 0.22 <= p < 0.40 (Phone rises forward, cards part)
  // Stage 3: 0.40 <= p < 0.85 (Phone locked, screen transitions)
  // Stage 4: p >= 0.85 (Phone recedes, transitions out)
  const phoneEntrance = Math.max(0, Math.min(1, (scrollProgress - 0.2) / 0.2));
  const phoneExit = Math.max(0, Math.min(1, (scrollProgress - 0.85) / 0.15));

  const phoneScale = 0.65 + phoneEntrance * 0.35 - phoneExit * 0.25;
  const phoneOpacity = Math.max(0, Math.min(1, phoneEntrance * 1.5)) * (1 - phoneExit * 0.9);
  const phoneTranslateY = (1 - phoneEntrance) * 80 + phoneExit * 40;

  // Flashcards lateral push and depth recession
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
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-ink">
              Reels &amp; Social Work
            </h2>
          </div>
          <div className="flex items-center space-x-3 text-xs font-mono text-ink/40 mt-2 md:mt-0 uppercase">
            <span>Scroll To Navigate Reel Feed</span>
            <span>·</span>
            <span className="text-saffron font-medium">{currentScreen.number}</span>
          </div>
        </div>

        {/* 3D Spatial Theater Container */}
        <div className="relative mx-auto my-auto h-[620px] w-full max-w-6xl perspective-container flex items-center justify-center">
          
          {/* ========================================================
              BACKGROUND FLASHCARDS (Real work substrates floating with depth)
              ======================================================== */}
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-300 flex items-center justify-center"
            style={{ opacity: cardOpacity }}
          >
            {/* Flashcard 1: Top-Left (Neil & Momo Persian Rose) */}
            <div
              className="absolute left-[3%] sm:left-[8%] top-[10%] w-48 sm:w-60 aspect-[4/3] rounded-2xl bg-white p-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] border border-ink/10 transition-transform duration-500 ease-out"
              style={{
                transform: `translate3d(${-cardSpread * 140}px, ${-cardSpread * 60}px, ${-cardSpread * 180}px) rotate(-3deg)`,
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

            {/* Flashcard 2: Top-Right (Tripster Studio merchandise) */}
            <div
              className="absolute right-[4%] sm:right-[10%] top-[8%] w-52 sm:w-64 aspect-[4/3] rounded-2xl bg-white p-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] border border-ink/10 transition-transform duration-500 ease-out"
              style={{
                transform: `translate3d(${cardSpread * 150}px, ${-cardSpread * 50}px, ${-cardSpread * 160}px) rotate(4deg)`,
              }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-xl bg-canvas-subtle">
                <Image
                  src="/assets/projects/tripster-01.webp"
                  alt="Tripster Studio merchandise"
                  fill
                  sizes="260px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Flashcard 3: Bottom-Left (Campaign Creative) */}
            <div
              className="absolute left-[5%] sm:left-[12%] bottom-[12%] w-52 sm:w-64 aspect-[4/3] rounded-2xl bg-white p-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] border border-ink/10 transition-transform duration-500 ease-out"
              style={{
                transform: `translate3d(${-cardSpread * 160}px, ${cardSpread * 70}px, ${-cardSpread * 200}px) rotate(2deg)`,
              }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-xl bg-canvas-subtle">
                <Image
                  src="/assets/projects/campaign-posts-01.webp"
                  alt="Campaign posts"
                  fill
                  sizes="260px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Flashcard 4: Bottom-Right (Warrior Deck reel still) */}
            <div
              className="absolute right-[3%] sm:right-[9%] bottom-[10%] w-48 sm:w-60 aspect-[4/3] rounded-2xl bg-white p-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] border border-ink/10 transition-transform duration-500 ease-out"
              style={{
                transform: `translate3d(${cardSpread * 160}px, ${cardSpread * 80}px, ${-cardSpread * 190}px) rotate(-4deg)`,
              }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-xl bg-canvas-subtle">
                <Image
                  src="/assets/projects/warrior-deck-01.webp"
                  alt="Warrior Deck video"
                  fill
                  sizes="240px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Flashcard 5: Center-Behind (Brand Identities) */}
            <div
              className="absolute top-[32%] w-60 sm:w-72 aspect-[16/10] rounded-2xl bg-white p-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] border border-ink/10 transition-transform duration-500 ease-out"
              style={{
                transform: `translate3d(0px, ${cardSpread * 40}px, ${-cardSpread * 240}px)`,
                opacity: 1 - cardSpread * 0.9,
              }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-xl bg-canvas-subtle">
                <Image
                  src="/assets/projects/brand-identity-01.webp"
                  alt="Brand identity cards"
                  fill
                  sizes="300px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* ========================================================
              THE SINGLE PHONE FRAME (Minimal line drawing silhouette)
              ======================================================== */}
          <div
            className="relative z-30 transition-transform duration-300 ease-out"
            style={{
              transform: `translate3d(0, ${phoneTranslateY}px, 0) scale(${phoneScale})`,
              opacity: phoneOpacity,
            }}
          >
            {/* The Smartphone Silhouette: Thin black outline, curved corners, matching background */}
            <div className="relative w-[300px] sm:w-[330px] md:w-[350px] h-[570px] sm:h-[610px] rounded-[44px] sm:rounded-[48px] border-[3px] border-[#181818] bg-canvas shadow-[0_24px_70px_rgba(0,0,0,0.12)] p-3 overflow-hidden flex flex-col justify-between">
              
              {/* Top Speaker Slit & Minimal Notch */}
              <div className="relative w-full flex items-center justify-between px-4 pt-1 pb-2 text-[11px] font-mono text-ink/70 z-20">
                <span>9:30</span>
                <div className="h-4 w-20 rounded-full bg-ink/90 mx-auto" />
                <div className="flex items-center space-x-1 text-[10px]">
                  <span>5G</span>
                </div>
              </div>

              {/* Inside Phone Screen Content : Editorial Reel Feed */}
              <div className="relative flex-1 w-full overflow-hidden rounded-[32px] sm:rounded-[36px] bg-canvas-subtle flex flex-col justify-between p-3.5 border border-ink/5">
                
                {/* Header inside screen */}
                <div className="relative z-10 flex items-center justify-between pb-2 border-b border-ink/10">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-saffron font-medium">
                    {currentScreen.client}
                  </span>
                  <span className="text-[10px] font-mono text-ink/50">
                    {currentScreen.category}
                  </span>
                </div>

                {/* Media Presentation (Reel Video / Imagery) */}
                <div className="relative my-auto aspect-[9/13] w-full overflow-hidden rounded-2xl bg-black/5 shadow-inner">
                  {/* If Screen is Video (Screen 02) */}
                  {currentScreen.video ? (
                    <div className="relative h-full w-full">
                      <video
                        ref={videoRef}
                        src={currentScreen.video}
                        loop
                        muted={isMuted}
                        playsInline
                        className="h-full w-full object-cover"
                      />
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="absolute bottom-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-transform hover:scale-110"
                        aria-label="Toggle Mute"
                      >
                        {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                  ) : (
                    <div className="relative h-full w-full">
                      <Image
                        src={currentScreen.image}
                        alt={currentScreen.title}
                        fill
                        sizes="350px"
                        className="object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                  )}

                  {/* Gradient Overlay for Titles */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Overlaid Title */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="font-display text-lg font-medium tracking-wide leading-tight">
                      {currentScreen.title}
                    </p>
                    <p className="text-[10px] font-mono text-white/75 mt-0.5">
                      {currentScreen.subtitle}
                    </p>
                  </div>
                </div>

                {/* Minimal Bottom App Bar */}
                <div className="relative z-10 pt-2 flex items-center justify-between border-t border-ink/10 text-[10px] font-mono text-ink/60">
                  <div className="flex items-center space-x-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-saffron" />
                    <span>REELS</span>
                  </div>
                  <span>{currentScreen.number}</span>
                </div>

              </div>

              {/* Bottom Home Indicator Bar */}
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
