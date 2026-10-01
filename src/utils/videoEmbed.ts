// Turns any normal Vimeo / YouTube share link into a clean, autoplay-friendly embed URL.
// Content owners can paste ANY share link into homeContent.ts; extra params are ignored.

export interface ParsedVideo {
  provider: 'vimeo' | 'youtube';
  id: string;
  embedUrl: string;
}

export function parseVideoUrl(url: string): ParsedVideo | null {
  // Vimeo: vimeo.com/273975886?fl=pl&fe=sh  or  player.vimeo.com/video/273975886
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) {
    const id = vimeo[1];
    return {
      provider: 'vimeo',
      id,
      // background=1 = no controls, autoplay, muted, loop (best for cinematic bands)
      embedUrl: `https://player.vimeo.com/video/${id}?background=1&autoplay=1&muted=1&loop=1&autopause=0&playsinline=1`,
    };
  }

  // YouTube: watch?v=ID, youtu.be/ID, embed/ID, shorts/ID
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
  if (yt) {
    const id = yt[1];
    // playlist={id} is required for loop to work on YouTube
    return {
      provider: 'youtube',
      id,
      embedUrl: `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&playsinline=1&modestbranding=1&rel=0`,
    };
  }

  return null;
}
