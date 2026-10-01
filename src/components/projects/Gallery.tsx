/**
 * Editorial architectural project gallery component with varied grid layout,
 * click-to-play video facade, and integrated full-screen lightbox.
 *
 * RESPONSIVE BEHAVIOR:
 * - Mobile (360px): Stacks into a clean, readable single-column flow (1 col).
 * - Tablet & Desktop (768px+): Asymmetric editorial layout where images occupy 12-column spans (6-col half, 8-col wide, 12-col full bleed).
 * - Touch & Keyboard: Every image is an accessible focusable button trigger.
 */
import { useState, useRef } from 'react';
import type { ProjectGalleryItem } from '@/types';
import ResponsiveImage from '@/components/common/ResponsiveImage';
import { parseVideoUrl } from '@/utils/videoEmbed';
import { Lightbox } from './Lightbox';

export interface GalleryProps {
  /** Gallery images (array of public IDs or structured items) */
  images: (string | ProjectGalleryItem)[];
  /** Optional project video URL (Vimeo, YouTube, or direct MP4) */
  videoUrl?: string;
  /** Project title for accessibility labeling */
  projectTitle: string;
  /** Optional custom CSS classes */
  className?: string;
}

/**
 * Editorial photo and video gallery for case study detail views.
 */
export function Gallery({ images, videoUrl, projectTitle, className = '' }: GalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);

  const parsedVideo = videoUrl ? parseVideoUrl(videoUrl) : null;

  const handleOpenLightbox = (index: number, e: React.MouseEvent<HTMLButtonElement>) => {
    triggerRef.current = e.currentTarget;
    setActiveImageIndex(index);
    setLightboxOpen(true);
  };

  const handleKeyDownOpen = (index: number, e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      triggerRef.current = e.currentTarget;
      setActiveImageIndex(index);
      setLightboxOpen(true);
    }
  };

  return (
    <div className={`space-y-12 sm:space-y-16 md:space-y-20 ${className}`}>
      {/* Editorial Varied Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 lg:gap-10 items-start">
        {images.map((item, index) => {
          const publicId = typeof item === 'string' ? item : item.publicId;
          const alt =
            typeof item === 'string'
              ? `${projectTitle} gallery photo ${index + 1}`
              : item.alt || `${projectTitle} photo ${index + 1}`;
          const layout = typeof item === 'object' ? item.layout : undefined;
          const caption = typeof item === 'object' ? item.caption : undefined;

          // Asymmetric column span logic (1 col on mobile, varied 12-col spans on md+)
          let colSpan: string;
          let aspect: string;

          if (layout === 'full' || (!layout && index % 5 === 0)) {
            colSpan = 'md:col-span-12';
            aspect = '16/9';
          } else if (layout === 'wide') {
            colSpan = 'md:col-span-12 lg:col-span-8';
            aspect = '16/10';
          } else if (index % 4 === 1 || index % 4 === 2) {
            colSpan = 'md:col-span-6';
            aspect = '4/3';
          } else {
            colSpan = 'md:col-span-6 lg:col-span-4';
            aspect = '3/4';
          }

          return (
            <figure
              key={`${publicId}-${index}`}
              className={`group flex flex-col w-full ${colSpan}`}
            >
              <button
                type="button"
                onClick={(e) => handleOpenLightbox(index, e)}
                onKeyDown={(e) => handleKeyDownOpen(index, e)}
                className="relative block w-full overflow-hidden bg-surface text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label={`Enlarge photograph: ${alt}`}
              >
                <div className="transition-transform duration-700 ease-out group-hover:scale-105">
                  <ResponsiveImage
                    publicId={publicId}
                    alt={alt}
                    aspectRatio={aspect}
                    sizes={
                      colSpan.includes('12')
                        ? '(min-width: 1280px) 1200px, 100vw'
                        : '(min-width: 768px) 50vw, 100vw'
                    }
                  />
                </div>

                {/* Subtle zoom hint overlay on hover / focus */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300 pointer-events-none flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 bg-bg/90 backdrop-blur-xs text-text text-label uppercase tracking-widest px-3 py-1.5 font-mono pointer-events-none">
                    View High-Res
                  </span>
                </div>
              </button>

              {/* Optional Caption */}
              {caption && (
                <figcaption className="mt-3 text-small text-muted font-sans border-l border-line pl-3">
                  {caption}
                </figcaption>
              )}
            </figure>
          );
        })}
      </div>

      {/* Non-Autoplaying Video Facade (if videoUrl is provided) */}
      {videoUrl && parsedVideo && (
        <div className="w-full mt-12 sm:mt-16 pt-8 border-t border-line">
          <div className="max-w-4xl mx-auto">
            <span className="text-label uppercase tracking-widest text-muted font-mono block mb-3">
              Cinematic Overview · {parsedVideo.provider.toUpperCase()}
            </span>
            <div className="relative aspect-video w-full bg-black overflow-hidden shadow-xl border border-line">
              {!isPlayingVideo ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  {/* Poster background preview */}
                  {images[0] && (
                    <div className="absolute inset-0 opacity-40">
                      <ResponsiveImage
                        publicId={typeof images[0] === 'string' ? images[0] : images[0].publicId}
                        alt={`${projectTitle} video presentation preview`}
                        fill
                      />
                    </div>
                  )}

                  {/* Gradient vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60" />

                  {/* Play Trigger Button */}
                  <button
                    type="button"
                    onClick={() => setIsPlayingVideo(true)}
                    className="relative z-10 group/btn flex flex-col items-center gap-4 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    aria-label={`Play cinematic video presentation for ${projectTitle}`}
                  >
                    <span className="min-h-[56px] min-w-[56px] flex items-center justify-center rounded-full bg-accent text-white group-hover/btn:scale-110 transition-transform duration-300 shadow-lg">
                      <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                    <span className="font-serif text-xl sm:text-2xl text-neutral-100 group-hover/btn:text-white transition-colors">
                      Play Project Film
                    </span>
                  </button>
                </div>
              ) : (
                <iframe
                  src={`${parsedVideo.embedUrl}&autoplay=1`}
                  title={`${projectTitle} project documentary`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Full-screen Lightbox Modal */}
      <Lightbox
        images={images}
        currentIndex={activeImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(newIdx) => setActiveImageIndex(newIdx)}
        triggerRef={triggerRef}
      />
    </div>
  );
}
