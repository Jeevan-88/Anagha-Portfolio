'use client';

import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';

import PhoneExperience from '@/components/sections/PhoneExperience';
import Capabilities from '@/components/sections/Capabilities';
import LaptopExperience from '@/components/sections/LaptopExperience';
import Services from '@/components/sections/Services';
import ExperienceTimeline from '@/components/sections/ExperienceTimeline';
import Education from '@/components/sections/Education';
import Contact from '@/components/sections/Contact';

export default function Home() {
  // Smooth scroll initialization with Lenis
  useEffect(() => {
    let lenis: any = null;

    // Check if user prefers reduced motion
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

      {/* Navigation */}
      <Navbar />

      {/* 01 · Signature Particle Identity into Editorial Hero */}
      <Hero />

      {/* 02 · Editorial About & Authentic Story */}
      <About />



      {/* 05 · Dedicated Single-Phone Video Reels Feed */}
      <PhoneExperience />

      {/* 06 · Strategic Approach: What I Bring to the Table */}
      <Capabilities />

      {/* 07 · Cinematic 3D Studio Laptop Experience: Tools & Applied Work */}
      <LaptopExperience />

      {/* 08 · Service Menu: Retainers, Singles & Custom Scope */}
      <Services />

      {/* 09 · Verified Career Trajectory: Work History */}
      <ExperienceTimeline />

      {/* 10 · Academic Foundation */}
      <Education />

      {/* 11 · Epilogue: Particle Dissolution & Film-Like Contact */}
      <Contact />

      {/* Concluding Footer */}
      <Footer />
    </main>
  );
}
