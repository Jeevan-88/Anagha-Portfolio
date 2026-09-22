'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { anaghaContent, VideoProject } from '@/content/anagha';
import { Play, ArrowUpRight, Youtube, X } from 'lucide-react';

export default function VideoEditingArchive() {
  const [activeVideo, setActiveVideo] = useState<VideoProject | null>(null);

  // Helper to extract YouTube video ID from URL
  const getYouTubeId = (url: string) => {
    if (url.includes('youtu.be/')) {
      return url.split('youtu.be/')[1].split('?')[0];
    }
    if (url.includes('/shorts/')) {
      return url.split('/shorts/')[1].split('?')[0];
    }
    const match = url.match(/[?&]v=([^&]+)/);
    return match ? match[1] : '';
  };

  return (
    <section id="video-editing" className="relative w-full py-24 md:py-32 px-6 md:px-12 bg-canvas drafting-grid">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-ink/10">
          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-saffron block mb-2">
              07 · Long-Form Production
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-ink">
              Video Editing Archive
            </h2>
          </div>
          <p className="text-xs font-mono text-ink/40 tracking-wider mt-4 md:mt-0 uppercase">
            Documentary, Campus Life &amp; Season Compilations
          </p>
        </div>

        {/* Video Archive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {anaghaContent.videoEditing.map((vid) => {
            const ytId = getYouTubeId(vid.url);

            return (
              <div
                key={vid.id}
                className="group flex flex-col justify-between rounded-2xl bg-white border border-ink/10 p-5 sm:p-6 transition-all duration-300 hover:border-ink/30 hover:shadow-md"
              >
                {/* Media Presentation */}
                <div className="space-y-4">
                  <div
                    onClick={() => setActiveVideo(vid)}
                    className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-black/5 cursor-pointer"
                  >
                    <Image
                      src={vid.thumbnail}
                      alt={vid.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 600px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                    {/* Play Button Trigger */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-ink shadow-lg transition-transform duration-300 group-hover:scale-110">
                        <Play className="h-6 w-6 text-ink fill-ink ml-1" />
                      </div>
                    </div>

                    {/* Format Pill */}
                    <div className="absolute top-3 left-3">
                      <span className="rounded-full bg-black/60 backdrop-blur-xs px-3 py-1 text-[11px] font-mono text-white">
                        {vid.format}
                      </span>
                    </div>
                  </div>

                  {/* Title & Client Context */}
                  <div>
                    <span className="text-xs font-mono text-saffron uppercase tracking-wider block mb-1">
                      {vid.client}
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-medium text-ink leading-snug">
                      {vid.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-ink/70 leading-relaxed font-light mt-2">
                      {vid.context}
                    </p>
                  </div>
                </div>

                {/* External Link Action */}
                <div className="flex items-center justify-between pt-6 mt-6 border-t border-ink/10 text-xs font-mono">
                  <button
                    onClick={() => setActiveVideo(vid)}
                    className="inline-flex items-center space-x-1.5 text-ink hover:text-saffron transition-colors"
                  >
                    <Play className="h-3.5 w-3.5 fill-current" />
                    <span>Watch in Modal</span>
                  </button>

                  <a
                    href={vid.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 text-ink/60 hover:text-ink transition-colors"
                  >
                    <Youtube className="h-3.5 w-3.5 text-red-600" />
                    <span>Open on YouTube</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </div>

              </div>
            );
          })}
        </div>

        {/* Modal Player */}
        {activeVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6 animate-fadeIn">
            <div className="relative w-full max-w-4xl rounded-2xl bg-neutral-900 border border-white/10 overflow-hidden shadow-2xl">
              
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 text-white">
                <div>
                  <p className="text-xs font-mono text-saffron uppercase">{activeVideo.client}</p>
                  <h4 className="font-display text-lg font-medium">{activeVideo.title}</h4>
                </div>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="rounded-full p-2 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close Modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* YouTube Iframe Player */}
              <div className="relative aspect-[16/9] w-full bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${getYouTubeId(activeVideo.url)}?autoplay=1`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between px-6 py-3 bg-neutral-950 text-xs font-mono text-white/50">
                <span>{activeVideo.format}</span>
                <a
                  href={activeVideo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-white hover:text-saffron"
                >
                  <span>Open directly on YouTube</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
