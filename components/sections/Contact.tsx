'use client';

import React, { useState } from 'react';
import { anaghaContent } from '@/content/anagha';
import ParticleDissolve from '@/components/canvas/ParticleDissolve';
import { Mail, ArrowUpRight, Copy, Check, MapPin, Send } from 'lucide-react';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(anaghaContent.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const socialLinks = [
    { platform: 'LinkedIn', url: anaghaContent.contact.linkedin },
    { platform: 'Instagram (ANA)', url: anaghaContent.contact.instagram },
    { platform: 'Email', url: `mailto:${anaghaContent.contact.email}` },
  ];

  return (
    <section id="contact" className="relative w-full py-28 md:py-36 px-6 md:px-12 bg-canvas overflow-hidden drafting-grid">
      <div className="mx-auto max-w-7xl">
        
        {/* Dissolution Canvas: Echo of the Opening */}
        <div className="mb-12 flex flex-col items-center justify-center text-center">
          <ParticleDissolve />
        </div>

        {/* Quiet Film-Ending Composition */}
        <div className="mx-auto max-w-4xl text-center space-y-8">
          
          <div className="space-y-3">
            <span className="text-xs uppercase font-mono tracking-widest text-saffron block">
              14 · Direct Contact
            </span>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-medium tracking-tight text-ink leading-tight">
              Let&apos;s Build Together
            </h2>
            <p className="text-base sm:text-lg text-ink/70 font-light max-w-xl mx-auto">
              {anaghaContent.contact.statement}
            </p>
          </div>

          {/* Interactive Direct Email Plate */}
          <div className="mx-auto max-w-md rounded-2xl bg-white p-4 border border-ink/10 shadow-sm flex items-center justify-between">
            <div className="flex items-center space-x-3 text-left pl-2">
              <Mail className="h-4 w-4 text-saffron" />
              <div>
                <span className="text-[10px] font-mono text-ink/40 uppercase block">Email</span>
                <a
                  href={`mailto:${anaghaContent.contact.email}`}
                  className="text-sm font-medium text-ink hover:text-saffron transition-colors"
                >
                  {anaghaContent.contact.email}
                </a>
              </div>
            </div>

            <button
              onClick={copyEmail}
              data-cursor-interactive="true"
              className="flex items-center space-x-1.5 rounded-lg bg-canvas-subtle px-3 py-2 text-xs font-mono text-ink transition-colors hover:bg-ink hover:text-white"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 text-leaf" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Location & Response Time */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-ink/50 pt-2">
            <div className="flex items-center space-x-1.5">
              <MapPin className="h-3.5 w-3.5 text-saffron" />
              <span>Based in Pune, India · Available Worldwide</span>
            </div>
            <span>·</span>
            <span>{anaghaContent.contact.availability}</span>
          </div>

          {/* Verified Social Channels */}
          <div className="pt-8 border-t border-ink/10 flex flex-wrap items-center justify-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target={link.url.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                data-cursor-interactive="true"
                className="group flex items-center space-x-2 rounded-full border border-ink/10 bg-white px-5 py-2.5 text-xs font-mono text-ink transition-all duration-300 hover:border-saffron hover:bg-saffron hover:text-white shadow-xs"
              >
                <span>{link.platform}</span>
                <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
