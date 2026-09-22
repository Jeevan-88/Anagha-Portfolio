'use client';

import React from 'react';
import { anaghaContent } from '@/content/anagha';
import { GraduationCap } from 'lucide-react';

export default function Education() {
  const education = anaghaContent.education;

  return (
    <section id="education" className="relative w-full py-16 md:py-20 px-6 md:px-12 bg-canvas-subtle/50 border-b border-ink/10">
      <div className="mx-auto max-w-7xl">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b border-ink/10">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-4 w-4 text-saffron" />
            <span className="text-xs uppercase font-mono tracking-widest text-ink/70">
              13 · Academic Foundation
            </span>
          </div>
          <span className="text-[11px] font-mono text-ink/40 mt-1 md:mt-0 uppercase">
            Formal Engineering &amp; Technology Education
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {education.map((edu, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white p-6 sm:p-7 border border-ink/10 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono text-ink/50 mb-1">
                  <span>{edu.period}</span>
                  <span className="text-saffron font-medium">{edu.field}</span>
                </div>
                <h4 className="font-display text-xl sm:text-2xl font-medium text-ink">
                  {edu.institution}
                </h4>
                <p className="text-xs sm:text-sm text-ink/70 font-mono">
                  {edu.degree} · {edu.field}
                </p>
                <p className="text-xs text-ink/60 font-light leading-relaxed pt-2">
                  {edu.focus}
                </p>
              </div>

              <div className="pt-3 border-t border-ink/5 flex items-center justify-between text-[10px] font-mono text-ink/40">
                <span>Degree Conferred</span>
                <span className="text-leaf font-medium">Verified</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
