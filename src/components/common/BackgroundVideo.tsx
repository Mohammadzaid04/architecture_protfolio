import { useEffect, useMemo, useRef, useState } from 'react';
import { parseVideoUrl } from '../../utils/videoEmbed';
import ResponsiveImage from './ResponsiveImage';

interface BackgroundVideoProps {
  /** Vimeo or YouTube link (from homeContent.ts) */
  url: string;
  /** Cloudinary ID of the poster image (shown while loading and if reduced motion is on) */
  posterId: string;
  posterAlt: string;
  className?: string;
}

const RATIO = 16 / 9; // video aspect ratio

/**
 * Full-cover background video (autoplay, muted, loop, no controls).
 * The PARENT section decides the height (e.g. h-[70svh]); this component fills 100% of it.
 * The iframe is scaled so it always covers the whole box on every screen size
 * (no side gaps, no black bars), like CSS object-fit: cover but for iframes.
 */
export default function BackgroundVideo({
  url,
  posterId,
  posterAlt,
  className = '',
}: BackgroundVideoProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const [shouldLoad, setShouldLoad] = useState(false);
  const [ready, setReady] = useState(false);

  const video = useMemo(() => parseVideoUrl(url), [url]);
  const reduceMotion = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  );

  // 1) Measure the box, and measure again whenever the window resizes or rotates
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const measure = () => setBox({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // 2) Load the iframe only when the section is close to the screen (saves mobile data)
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: '300px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // 3) Cover math: start from full width; if that is too short, scale up from the height instead
  let w = box.w;
  let h = w / RATIO;
  if (h < box.h) {
    h = box.h;
    w = h * RATIO;
  }

  const showVideo = video && shouldLoad && !reduceMotion && box.w > 0;

  return (
    <div
      ref={boxRef}
      className={`absolute inset-0 h-full w-full overflow-hidden bg-[#0d0d0d] ${className}`}
    >
      {/* Poster sits behind the video so the area is never an empty black box */}
      <ResponsiveImage publicId={posterId} alt={posterAlt} fill />

      {showVideo && (
        <iframe
          src={video.embedUrl}
          title={posterAlt}
          allow="autoplay; fullscreen; picture-in-picture"
          onLoad={() => setReady(true)}
          // pointer-events-none = acts as a background, no controls or clicks
          className="pointer-events-none absolute border-0 transition-opacity duration-700"
          style={{
            top: '50%',
            left: '50%',
            width: `${w}px`,
            height: `${h}px`,
            transform: 'translate(-50%, -50%)',
            opacity: ready ? 1 : 0,
          }}
        />
      )}
    </div>
  );
}
