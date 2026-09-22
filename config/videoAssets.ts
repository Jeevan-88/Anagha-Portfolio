/**
 * Centralized Vercel Blob Video Asset Mapping
 * All production videos stream directly from the public Vercel Blob store.
 */

export const VERCEL_BLOB_VIDEOS = {
  // ANA Architects Reels
  ana_reel_01: 'https://sdpbnfippzoecrrh.public.blob.vercel-storage.com/ana_reel_01.mp4',
  ana_reel_02: 'https://sdpbnfippzoecrrh.public.blob.vercel-storage.com/ana_reel_02.mp4',

  // Neil & Momo Reels
  neil_momo_reel_01: 'https://sdpbnfippzoecrrh.public.blob.vercel-storage.com/neil_momo_reel_01.mp4',
  neil_momo_reel_02: 'https://sdpbnfippzoecrrh.public.blob.vercel-storage.com/neil_momo_reel_02.mp4',

  // Root Cause Podcast Reels
  root_cause_reel_01: 'https://sdpbnfippzoecrrh.public.blob.vercel-storage.com/root_cause_reel_01.mp4',
  root_cause_reel_02: 'https://sdpbnfippzoecrrh.public.blob.vercel-storage.com/root_cause_reel_02.mp4',
  root_cause_reel_03: 'https://sdpbnfippzoecrrh.public.blob.vercel-storage.com/root_cause_reel_03.mp4',

  // General Creative Reels
  reel_general_01: 'https://sdpbnfippzoecrrh.public.blob.vercel-storage.com/reel_general_01.mp4',
  reel_general_02: 'https://sdpbnfippzoecrrh.public.blob.vercel-storage.com/reel_general_02.mp4',
  reel_general_03: 'https://sdpbnfippzoecrrh.public.blob.vercel-storage.com/reel_general_03.mp4',
  reel_general_04: 'https://sdpbnfippzoecrrh.public.blob.vercel-storage.com/reel_general_04.mp4',
  reel_general_05: 'https://sdpbnfippzoecrrh.public.blob.vercel-storage.com/reel_general_05.mp4',

  // Storefront & 3D Interactive Video Experiences
  nmwebsite: 'https://sdpbnfippzoecrrh.public.blob.vercel-storage.com/nmwebsite.mp4',
  room_tv: 'https://sdpbnfippzoecrrh.public.blob.vercel-storage.com/WhatsApp%20Video%202026-09-22%20at%202.00.15%20PM.mp4',
  graduation_highlights: 'https://sdpbnfippzoecrrh.public.blob.vercel-storage.com/2025%20Graduation%20Ceremony%20Highlights_1080p.mp4',
} as const;

/**
 * Resolves a video path or filename to its centralized public Vercel Blob URL.
 */
export function getBlobVideoUrl(localPathOrName: string): string {
  if (!localPathOrName) return '';
  if (localPathOrName.startsWith('http://') || localPathOrName.startsWith('https://')) {
    return localPathOrName;
  }

  const filename = localPathOrName.split('/').pop()?.split('?')[0] || '';
  const key = filename.replace(/\.mp4$/i, '');

  if (key in VERCEL_BLOB_VIDEOS) {
    return VERCEL_BLOB_VIDEOS[key as keyof typeof VERCEL_BLOB_VIDEOS];
  }

  if (filename.includes('WhatsApp Video')) {
    return VERCEL_BLOB_VIDEOS.room_tv;
  }

  if (filename.includes('Graduation')) {
    return VERCEL_BLOB_VIDEOS.graduation_highlights;
  }

  return localPathOrName;
}
