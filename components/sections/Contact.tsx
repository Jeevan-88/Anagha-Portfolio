'use client';

import React, { useState } from 'react';
import { anaghaContent } from '@/content/anagha';
import ParticleDissolve from '@/components/canvas/ParticleDissolve';
import { Mail, ArrowUpRight, Copy, Check, MapPin, Send, PenLine } from 'lucide-react';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [subject, setSubject] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const copyEmail = () => {
    navigator.clipboard.writeText(anaghaContent.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const emailTo = anaghaContent.contact.email;
    const finalSubject = subject.trim() || 'Creative Inquiry · Portfolio Collaboration';
    let bodyText = message.trim();
    if (name.trim()) {
      bodyText = `From: ${name.trim()}\n\n${bodyText}`;
    }

    const mailtoUrl = `mailto:${emailTo}?subject=${encodeURIComponent(finalSubject)}&body=${encodeURIComponent(bodyText)}`;
    window.location.href = mailtoUrl;
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

          {/* Realistic Physical Paper Note Style Message Box */}
          <div className="relative mx-auto max-w-md pt-6">
            <div className="relative rounded-2xl bg-[#FCFAF6] border border-ink/15 p-6 sm:p-8 shadow-[0_20px_45px_-15px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.03)] text-left transition-all">
              
              {/* Realistic Translucent Drafting Tape Accent at Top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-ink/10 rounded-xs backdrop-blur-[2px] border border-ink/10 rotate-[-1deg] pointer-events-none shadow-xs" />

              {/* Note Header */}
              <div className="flex items-center justify-between border-b border-ink/10 pb-3 mb-5">
                <div className="flex items-center space-x-2">
                  <PenLine className="w-3.5 h-3.5 text-saffron" />
                  <span className="text-xs font-mono font-medium tracking-wider text-ink/80 uppercase">
                    Leave a Physical Note
                  </span>
                </div>
                <span className="text-[10px] font-mono text-ink/40 uppercase tracking-widest">
                  Direct Dispatch
                </span>
              </div>

              {/* Form */}
              <form onSubmit={handleSendNote} className="space-y-4">
                <div>
                  <label htmlFor="note-subject" className="block text-[10px] font-mono uppercase tracking-wider text-ink/50 mb-1">
                    Subject
                  </label>
                  <input
                    id="note-subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Creative Retainer / Video Direction"
                    className="w-full bg-transparent border-b border-ink/15 px-1 py-1.5 text-xs sm:text-sm font-sans text-ink placeholder:text-ink/30 focus:outline-none focus:border-saffron transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="note-name" className="block text-[10px] font-mono uppercase tracking-wider text-ink/50 mb-1">
                    Your Name (Optional)
                  </label>
                  <input
                    id="note-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Sharma"
                    className="w-full bg-transparent border-b border-ink/15 px-1 py-1.5 text-xs sm:text-sm font-sans text-ink placeholder:text-ink/30 focus:outline-none focus:border-saffron transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="note-message" className="block text-[10px] font-mono uppercase tracking-wider text-ink/50 mb-1">
                    Message <span className="text-saffron">*</span>
                  </label>
                  <textarea
                    id="note-message"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your note or brief here..."
                    className="w-full bg-white/70 border border-ink/15 rounded-xl p-3 text-xs sm:text-sm font-sans text-ink placeholder:text-ink/30 focus:outline-none focus:border-saffron focus:bg-white transition-all resize-none shadow-2xs"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={!message.trim()}
                    data-cursor-interactive="true"
                    className={`w-full py-3 px-5 rounded-xl text-xs font-mono uppercase tracking-widest flex items-center justify-center space-x-2 transition-all duration-300 shadow-sm ${
                      message.trim()
                        ? 'bg-ink text-white hover:bg-saffron cursor-pointer active:scale-[0.98]'
                        : 'bg-ink/10 text-ink/30 cursor-not-allowed'
                    }`}
                  >
                    <span>Send Note</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>

              {/* Note Footer Info */}
              <div className="mt-4 pt-3 border-t border-ink/10 text-center">
                <span className="text-[10px] font-mono text-ink/45 block">
                  Dispatches directly to: <span className="text-ink font-medium">anagha.mhaiskar8@gmail.com</span>
                </span>
              </div>

            </div>
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
