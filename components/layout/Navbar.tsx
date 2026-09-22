'use client';

import React, { useState, useEffect } from 'react';
import { anaghaContent } from '@/content/anagha';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [showBrandName, setShowBrandName] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const aboutEl = document.getElementById('about');
      if (aboutEl) {
        setShowBrandName(window.scrollY >= aboutEl.offsetTop - 140);
      } else {
        setShowBrandName(window.scrollY > 600);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { label: 'ABOUT', href: '#about' },
    { label: 'CLIENTS', href: '#brands' },
    { label: 'WORK', href: '#case-studies' },
    { label: 'REELS', href: '#reels' },
    { label: 'STRATEGY', href: '#content-strategy' },
    { label: 'VIDEO', href: '#video-editing' },
    { label: 'WEB', href: '#laptop-experience' },
    { label: 'TOOLS', href: '#tools' },
    { label: 'SERVICES', href: '#services' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-[#FBF9F5]/90 py-4 backdrop-blur-md border-b border-ink/5 shadow-[0_4px_24px_rgba(0,0,0,0.02)]'
            : 'bg-transparent py-6 md:py-8'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12">
          {/* Brand Mark: Fades in smoothly once About is reached */}
          <a
            href="#top"
            className={`text-ink transition-all duration-700 ease-out hover:opacity-75 ${
              showBrandName
                ? 'opacity-100 translate-x-0 pointer-events-auto'
                : 'opacity-0 -translate-x-3 pointer-events-none'
            }`}
          >
            <span className="font-display text-lg sm:text-xl md:text-2xl font-semibold tracking-wider">
              ANAGHA MHAISKAR
            </span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-6 text-[11px] font-medium tracking-wider text-ink/75">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="relative py-1 transition-colors hover:text-ink after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-saffron after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Direct CTA */}
          <div className="hidden lg:block">
            <a
              href="#contact"
              className="inline-flex items-center rounded-full border border-ink/20 px-4 py-1.5 text-xs font-medium tracking-wide text-ink transition-all duration-300 hover:border-ink hover:bg-ink hover:text-canvas"
            >
              LET&apos;S TALK
            </a>
          </div>

          {/* Mobile Clean Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex flex-col space-y-1.5 p-2 lg:hidden text-ink focus:outline-none"
            aria-label="Toggle Navigation"
          >
            <span
              className={`h-[1.5px] w-6 bg-ink transition-transform duration-300 ${
                mobileMenuOpen ? 'translate-y-2 rotate-45' : ''
              }`}
            />
            <span
              className={`h-[1.5px] w-6 bg-ink transition-opacity duration-300 ${
                mobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`h-[1.5px] w-6 bg-ink transition-transform duration-300 ${
                mobileMenuOpen ? '-translate-y-2 -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Clean Full-Screen Menu */}
      <div
        className={`fixed inset-0 z-30 flex flex-col justify-between bg-[#FBF9F5] px-8 py-24 transition-all duration-500 lg:hidden overflow-y-auto ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col space-y-5">
          <p className="text-xs uppercase tracking-widest text-ink/40 font-mono">Navigation</p>
          {navItems.map((item, idx) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="font-display text-2xl font-medium tracking-wide text-ink transition-colors hover:text-saffron"
              style={{ transitionDelay: `${idx * 30}ms` }}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="border-t border-ink/10 pt-6 mt-8">
          <a
            href={`mailto:${anaghaContent.contact.email}`}
            className="font-display text-base text-saffron underline decoration-saffron/40 underline-offset-4"
          >
            {anaghaContent.contact.email}
          </a>
        </div>
      </div>
    </>
  );
}
