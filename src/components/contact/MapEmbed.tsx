/**
 * Interactive Google Maps embed with click-to-load facade.
 * Displays a styled, lightweight placeholder reserving the exact aspect ratio,
 * mounting the heavy Google Maps iframe only upon user interaction.
 *
 * RESPONSIVE BEHAVIOR:
 * - Mobile (360px - 767px): 16:9 fixed aspect ratio prevents cumulative layout shift (CLS).
 * - Desktop (768px+): 21:9 fixed aspect ratio matches cinematic studio photography standards.
 * - Touch Targets: Button and fallback external link maintain >= 44x44px.
 */
import { useState } from 'react';
import { siteConfig } from '@/data/siteConfig';
import { contactContent } from '@/data/contactContent';

export interface MapEmbedProps {
  /** Optional custom CSS classes */
  className?: string;
}

/**
 * Click-to-load facade map component.
 */
export function MapEmbed({ className = '' }: MapEmbedProps) {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Fallback Google Maps external search query URL
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    siteConfig.address,
  )}`;

  return (
    <section
      aria-label="Studio Location Map"
      className={`w-full overflow-hidden border border-line bg-surface relative aspect-[16/9] md:aspect-[21/9] ${className}`}
    >
      {isMapLoaded ? (
        /* Mounted Lazy Google Maps Iframe */
        <iframe
          src={siteConfig.mapEmbedUrl}
          title={contactContent.map.ariaLabel}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full border-0 absolute inset-0"
          allowFullScreen
        />
      ) : (
        /* Lightweight Facade Placeholder */
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-surface">
          {/* Subtle Map Pin Icon */}
          <div
            className="w-12 h-12 rounded-full border border-line bg-bg flex items-center justify-center text-accent mb-4 shadow-xs"
            aria-hidden="true"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
          </div>

          <h3 className="font-serif text-2xl text-text font-normal mb-1">
            {contactContent.map.title}
          </h3>

          <p className="font-sans text-small text-muted max-w-md mb-6 break-words">
            {siteConfig.address}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Show Map Button */}
            <button
              type="button"
              onClick={() => setIsMapLoaded(true)}
              className="min-h-[44px] px-6 py-2.5 bg-text text-bg hover:opacity-85 active:opacity-95 text-small font-medium font-sans cursor-pointer transition-opacity focus-visible:outline-accent focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {contactContent.map.showMapButton}
            </button>

            {/* Direct External Link Fallback */}
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] inline-flex items-center text-small text-muted hover:text-text underline underline-offset-4 focus-visible:outline-accent focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors"
            >
              {contactContent.map.openInGoogleMaps}
            </a>
          </div>
        </div>
      )}
    </section>
  );
}

export default MapEmbed;
