'use client';

import React from 'react';
import { anaghaContent } from '@/content/anagha';
import { Calendar, MapPin } from 'lucide-react';

export default function ExperienceTimeline() {
  const experiences = anaghaContent.experience;

  return (
    <section id="experience" className="relative w-full py-24 md:py-32 px-6 md:px-12 bg-canvas drafting-grid">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-ink/10">
          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-saffron block mb-2">
              12 · Career Trajectory
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-ink">
              Where I Have Worked
            </h2>
          </div>
          <p className="text-xs font-mono text-ink/40 tracking-wider mt-4 md:mt-0 uppercase">
            Documented Roles &amp; Responsibilities
          </p>
        </div>

        {/* Work History Cards */}
        <div className="space-y-8 max-w-5xl">
          {experiences.map((exp) => (
            <div
              key={exp.company}
              className={`rounded-3xl bg-white p-8 sm:p-10 md:p-12 border transition-all duration-300 ${
                exp.isCurrent
                  ? 'border-saffron/40 shadow-[0_8px_30px_rgba(206,107,51,0.06)]'
                  : 'border-ink/10 shadow-[0_8px_30px_rgba(0,0,0,0.02)]'
              }`}
            >
              {/* Header: Company, Role, Type & Dates */}
              <div className="flex flex-col md:flex-row md:items-start justify-between border-b border-ink/10 pb-6 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-3 mb-1">
                    {exp.isCurrent && (
                      <span className="rounded-full bg-saffron/15 text-saffron px-2.5 py-0.5 text-[10px] font-mono font-medium tracking-wider uppercase">
                        Current Role
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-3xl sm:text-4xl font-medium text-ink">
                    {exp.company}
                  </h3>
                  <p className="text-base text-ink/80 font-light">
                    {exp.role}
                  </p>
                </div>

                <div className="text-xs font-mono text-ink/50 md:text-right space-y-1.5 shrink-0">
                  <div className="flex items-center md:justify-end space-x-1.5">
                    <Calendar className="h-3.5 w-3.5 text-saffron" />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center md:justify-end space-x-1.5">
                    <MapPin className="h-3.5 w-3.5 text-ink/40" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              {/* Responsibilities */}
              <div className="space-y-3 pt-4">
                <span className="text-[11px] font-mono uppercase tracking-widest text-ink/40 block">
                  Documented Responsibilities
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {exp.responsibilities.map((resp, i) => (
                    <div key={i} className="flex items-start space-x-2.5 text-xs sm:text-sm text-ink/75 font-light">
                      <span className="text-saffron font-mono text-xs mt-0.5">↳</span>
                      <span>{resp}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
