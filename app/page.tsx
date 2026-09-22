'use client';

import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import ClientsIndex from '@/components/sections/ClientsIndex';
import ExpandableCaseStudies from '@/components/sections/ExpandableCaseStudies';
import PhoneExperience from '@/components/sections/PhoneExperience';
import ContentStrategy from '@/components/sections/ContentStrategy';
import VideoEditingArchive from '@/components/sections/VideoEditingArchive';
import LaptopExperience from '@/components/sections/LaptopExperience';
import Capabilities from '@/components/sections/Capabilities';
import Tools from '@/components/sections/Tools';
import Services from '@/components/sections/Services';
import ExperienceTimeline from '@/components/sections/ExperienceTimeline';
import Education from '@/components/sections/Education';
import Contact from '@/components/sections/Contact';

export default function Home() {
  // Smooth scroll initialization with Lenis
  useEffect(() => {
    let lenis: any = null;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
      import('lenis').then(({ default: Lenis }) => {
        lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 0.9,
          touchMultiplier: 1.5,
        });

        function raf(time: number) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
      }).catch(() => {
        // Fallback silently if lenis cannot load
      });
    }

    return () => {
      if (lenis) {
        lenis.destroy();
      }
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-canvas text-ink overflow-x-clip selection:bg-saffron selection:text-white">
      {/* Precision Custom Cursor for Desktop */}
      <CustomCursor />

      {/* Persistent Navigation */}
      <Navbar />

      {/* 01 · Hero: Grand Typographic Particle Masthead into Editorial Stage */}
      <Hero />

      {/* 02 · About: Professional Profile & Grounded ANA Architects Statement */}
      <About />

      {/* 03 · Brands & Clients: Curated Professional Client & Work Index */}
      <ClientsIndex />

      {/* 04 · Selected Work: Expandable Deep Case Studies (ANA Architects & Neil & Momo) */}
      <ExpandableCaseStudies />

      {/* 05 · Reels & Short-Form Content: Single-Phone Reel Feed */}
      <PhoneExperience />

      {/* 06 · Content Strategy: Repurposing Workflow & Topic Curation */}
      <ContentStrategy />

      {/* 07 · Video Editing: Long-Form Documentary, Campus Life & Compilations */}
      <VideoEditingArchive />

      {/* 08 · Web Design: Cinematic 3D Laptop Walkthrough of Neil & Momo Website */}
      <LaptopExperience />

      {/* 09 · Capabilities: What I Bring to the Table */}
      <Capabilities />

      {/* 10 · Tools & Creative Production Stack */}
      <Tools />

      {/* 11 · Services Menu: Retainers, Singles & Custom Scope */}
      <Services />

      {/* 12 · Experience: Documented Career History */}
      <ExperienceTimeline />

      {/* 13 · Academic Education Foundation */}
      <Education />

      {/* 14 · Contact & Direct Communication */}
      <Contact />

      {/* Footer */}
      <Footer />
    </main>
  );
}
