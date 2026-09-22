'use client';

import React, { useState, useEffect } from 'react';
import { anaghaContent } from '@/content/anagha';
import { ArrowUp, Clock } from 'lucide-react';

export default function Footer() {
  const [istTime, setIstTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Formatted in Asia/Kolkata timezone
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setIstTime(timeStr);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#141312] text-white/80 py-12 px-6 md:px-12 border-t border-white/10">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono">
        
        {/* Identity & Location */}
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-center sm:text-left">
          <span className="font-display text-lg text-white font-medium tracking-wider">
            {anaghaContent.meta.name.toUpperCase()}
          </span>
          <span className="hidden sm:inline-block text-white/20">|</span>
          <span className="text-white/60">
            Pune, India
          </span>
        </div>

        {/* Live IST Clock */}
        <div className="flex items-center space-x-2 text-white/70 bg-white/5 rounded-full px-3 py-1 border border-white/10">
          <Clock className="h-3 w-3 text-saffron animate-pulse" />
          <span>IST: {istTime || '15:42 IST'}</span>
        </div>

        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          data-cursor-interactive="true"
          className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors"
        >
          <span>Back to Top</span>
          <ArrowUp className="h-3.5 w-3.5" />
        </button>

      </div>

      <div className="mx-auto max-w-7xl mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-white/40 gap-2">
        <span>© {new Date().getFullYear()} Anagha Mhaiskar. All rights reserved.</span>
        <span>Crafted for Anagha Mhaiskar</span>
      </div>
    </footer>
  );
}
