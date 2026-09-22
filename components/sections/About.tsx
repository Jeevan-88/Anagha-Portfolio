'use client';

import React from 'react';
import Image from 'next/image';
import { anaghaContent } from '@/content/anagha';

export default function About() {
  return (
    <section id="about" className="relative w-full py-24 md:py-32 px-6 md:px-12 bg-white border-y border-ink/10">
      <div className="mx-auto max-w-7xl">
        
        {/* Clean Editorial Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-ink/10">
          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-saffron block mb-2">
              02 · Background &amp; Focus
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-ink">
              About
            </h2>
          </div>
          <p className="text-xs font-mono text-ink/40 tracking-wider mt-4 md:mt-0 uppercase">
            Who I Am &amp; How I Work
          </p>
        </div>

        {/* Two-Column Editorial Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Portrait Documentation Frame */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-canvas-subtle border border-ink/10 shadow-xs">
              <Image
                src={anaghaContent.identity.introCardImage}
                alt="Anagha Mhaiskar portfolio documentation"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover"
              />
            </div>

            {/* Grounded Human Statement */}
            <p className="font-display text-2xl sm:text-3xl text-ink font-light leading-snug italic border-l-2 border-saffron pl-5 py-1">
              &ldquo;I turn briefs into work people can actually understand, see, and engage with, balancing strong visual systems with daily execution.&rdquo;
            </p>
          </div>

          {/* Right Column: First-Person Human Story & Concrete Areas */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4 text-base sm:text-lg text-ink/80 leading-relaxed font-light">
              <p className="text-xl sm:text-2xl text-ink font-normal leading-relaxed">
                My work sits between social media, design, content, video and web. I focus on finding the balance between an engaging narrative and a structured strategy.
              </p>

              <p>
                Currently managing social media at <strong>Neil &amp; Momo Organic Skincare</strong> and having designed web and graphic collateral at <strong>Dnnovate Technologies</strong>, I work across the planning, content, and visual sides of digital communication. My projects range from physical soap packaging wraps and Figma e-commerce layouts to fast-paced short-form video reels.
              </p>

              <p>
                I enjoy transforming complex briefs or founder concepts into clear content pillars, scheduled formats, and reliable publishing calendars so the feed maintains a purposeful direction.
              </p>
            </div>

            {/* Concrete Skill Groups: Pure Craft, No Buzzwords */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-ink/10">
              <div className="space-y-2">
                <h3 className="text-xs font-mono uppercase tracking-wider text-saffron font-medium">
                  Social Media &amp; Planning
                </h3>
                <p className="text-sm text-ink/70 font-light leading-relaxed">
                  Monthly content calendars, feed curation, reel concepts, copywriting, and direct customer CRM interaction.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xs font-mono uppercase tracking-wider text-ink font-medium">
                  Graphic &amp; Packaging Design
                </h3>
                <p className="text-sm text-ink/70 font-light leading-relaxed">
                  Botanical soap packaging labels, merchandise mockups, print brochures, brand logo suites, and visiting cards.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xs font-mono uppercase tracking-wider text-ink font-medium">
                  Video &amp; Motion
                </h3>
                <p className="text-sm text-ink/70 font-light leading-relaxed">
                  Editing vertical reels, apparel try-on cuts, motion typography sequences, and promotional video clips.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xs font-mono uppercase tracking-wider text-leaf font-medium">
                  Web &amp; Prototyping
                </h3>
                <p className="text-sm text-ink/70 font-light leading-relaxed">
                  Responsive product UI prototyping in Figma, WordPress website setup, layout updates, and digital asset maintenance.
                </p>
              </div>
            </div>

            {/* Grounding Academic Note */}
            <div className="pt-4 border-t border-ink/10 text-xs font-mono text-ink/40 flex items-center justify-between">
              <span>B.Tech Information Technology, SVPCET</span>
              <span>Based in Maharashtra, India · Working globally</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
