'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { anaghaContent } from '@/content/anagha';
import ParticleHero from '@/components/canvas/ParticleHero';
import { ArrowDown } from 'lucide-react';

interface HeroProps {
  onParticleHoverChange?: (hovered: boolean) => void;
}

export default function Hero({ onParticleHoverChange }: HeroProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const disciplines = ['SOCIAL MEDIA', 'CONTENT STRATEGY', 'VIDEO EDITING', 'WEB DESIGN', 'COMMUNICATION'];

  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.getElementById('top');
      const aboutEl = document.getElementById('about');
      const scrollY = window.scrollY;

      const startScroll = 15;
      const endScroll = aboutEl
        ? aboutEl.offsetTop - 120
        : (heroEl ? heroEl.offsetHeight * 0.75 : 500);

      const p = Math.min(Math.max((scrollY - startScroll) / (endScroll - startScroll), 0), 1);
      setScrollProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="top"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden pt-28 pb-12 px-6 md:px-12 drafting-grid"
    >
      {/* 1. Grand Masthead Particle Identity: 75 to 85% usable width on desktop */}
      <div className="mx-auto w-full max-w-7xl pt-4 pb-2 md:pb-6 flex justify-center">
        <ParticleHero
          scrollProgress={scrollProgress}
          onHoverChange={onParticleHoverChange}
        />
      </div>

      {/* 2. Editorial Cover Stage: Narrative + Authentic Portrait */}
      <div className="mx-auto w-full max-w-7xl py-4 md:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Role, First-Person Narrative & Disciplines */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            
            {/* Role & Strategic Focus */}
            <div className="space-y-4">
              <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-saffron">
                {anaghaContent.hero.role}
              </p>

              {/* Natural Human Editorial Copy in First Person */}
              <p className="max-w-xl text-lg sm:text-xl text-ink/80 font-light leading-relaxed">
                {anaghaContent.hero.statement}
              </p>

              {/* Disciplines Row */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 text-xs font-mono text-ink/60 uppercase tracking-wider">
                {disciplines.map((d, i) => (
                  <React.Fragment key={d}>
                    <span className="hover:text-ink transition-colors">{d}</span>
                    {i < disciplines.length - 1 && <span className="text-ink/20">·</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Clean CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#case-studies"
                className="group inline-flex items-center space-x-3 rounded-full bg-ink px-6 py-3 text-xs font-medium tracking-wider text-canvas transition-all duration-300 hover:bg-saffron"
              >
                <span>EXPLORE WORK</span>
                <ArrowDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
              </a>

              <a
                href="#about"
                className="inline-flex items-center space-x-2 rounded-full border border-ink/15 px-6 py-3 text-xs font-medium tracking-wider text-ink transition-all duration-300 hover:border-ink hover:bg-canvas-subtle"
              >
                <span>ABOUT ME</span>
              </a>
            </div>
          </div>

          {/* Right Column: Pure Editorial Portrait */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-canvas-subtle shadow-[0_12px_36px_rgba(0,0,0,0.04)] border border-ink/10">
                <Image
                  src={anaghaContent.hero.portrait}
                  alt="Anagha Mhaiskar"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover object-top filter contrast-[1.02]"
                  priority
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Quiet Scroll Indicator */}
      <div className="mx-auto w-full max-w-7xl flex items-center justify-between pt-6 border-t border-ink/5 text-xs font-mono text-ink/30">
        <span>SCROLL TO EXPLORE</span>
        <ArrowDown className="h-3 w-3 animate-bounce" />
      </div>
    </section>
  );
}
