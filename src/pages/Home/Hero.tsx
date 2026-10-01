/**
 * Home page full-viewport Hero section.
 * Developers edit this section to modify hero media integration,
 * editorial typography presentation, or bottom navigation cues.
 *
 * RESPONSIVE BEHAVIOR:
 * - 100svh viewport sizing ensures mobile browser chrome does not clip content.
 * - Fluid clamp heading scales down gracefully across mobile and tablet.
 * - Safe top padding ensures heading never collides with fixed navbar.
 */
import type { CSSProperties, MouseEvent } from 'react';
import BackgroundVideo from '@/components/common/BackgroundVideo';
import { homeContent } from '@/data/homeContent';

export function Hero() {
  const { hero } = homeContent;

  // Smoothly scroll to the next section or featured projects, respecting reduced-motion preferences
  const handleScrollTo =
    (targetId: string) => (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
      e.preventDefault();
      const target = document.getElementById(targetId);
      if (target) {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
      }
    };

  return (
    <section
      aria-label="Studio Introduction"
      className="relative w-full h-[100svh] min-h-[600px] flex flex-col justify-between text-white overflow-hidden"
    >
      {/* Cinematic Ambient Background Media */}
      <BackgroundVideo url={hero.video.url} posterId={hero.poster} posterAlt={hero.posterAlt} />

      {/* Multi-tier gradient & base overlay for navbar & headline legibility */}
      <div className="absolute inset-0 pointer-events-none select-none z-10" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{ backgroundColor: 'var(--hero-overlay, rgba(12, 12, 11, 0.32))' }}
        />
        <div className="absolute inset-x-0 top-0 h-44 sm:h-56 bg-gradient-to-b from-dark-bg/75 via-dark-bg/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 sm:h-48 bg-gradient-to-t from-dark-bg/80 via-dark-bg/25 to-transparent" />
      </div>

      {/* Top Spacer guaranteeing heading never sits under the fixed navbar */}
      <div className="pt-24 sm:pt-28 md:pt-32" />

      {/* Central Headline Entrance with editorial staggered reveal */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="max-w-4xl space-y-6">
          {/* A. Small metadata line */}
          <p
            className="reveal-up text-label uppercase tracking-widest font-mono text-white/75"
            style={
              {
                '--reveal-delay': '100ms',
                '--reveal-duration': '600ms',
                '--reveal-distance': '12px',
              } as CSSProperties
            }
          >
            {hero.location} • Est. {hero.established}
          </p>

          {/* B. Main heading preserving exact copy and intentional line break */}
          <h1
            className="reveal-left font-serif text-[clamp(2.125rem,4.5vw+0.75rem,5.25rem)] leading-[1.04] tracking-tight text-white drop-shadow-sm max-w-4xl"
            style={
              {
                '--reveal-delay': '200ms',
                '--reveal-duration': '800ms',
                '--reveal-distance': '-30px',
              } as CSSProperties
            }
          >
            <span className="block">Architecture Shaped by Context,</span>
            <span className="block">Light & Honesty</span>
          </h1>

          {/* C. Description: desktop 18-20px, line-height ~1.5, balanced text-wrap */}
          <p
            className="reveal-left text-base sm:text-[1.125rem] lg:text-[1.25rem] leading-[1.5] text-white/85 max-w-xl font-sans font-light [text-wrap:balance]"
            style={
              {
                '--reveal-delay': '300ms',
                '--reveal-duration': '600ms',
                '--reveal-distance': '-20px',
                textWrap: 'balance',
              } as CSSProperties
            }
          >
            {hero.subline}
          </p>
        </div>
      </div>

      {/* D. Bottom Architectural Metadata Bar & Scroll Cue (Staggered Step D) */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-8 sm:pb-12">
        <div
          className="reveal-up border-t border-white/20 pt-4 flex items-center justify-between text-small text-white/75"
          style={
            {
              '--reveal-delay': '400ms',
              '--reveal-duration': '600ms',
              '--reveal-distance': '12px',
            } as CSSProperties
          }
        >
          {/* Explore Works: minimal editorial link with focus-visible and touch target */}
          <a
            href="#featured-projects"
            onClick={handleScrollTo('featured-projects')}
            className="min-h-[44px] inline-flex items-center text-white/75 hover:text-white transition-[color,opacity] duration-200 underline-offset-4 hover:underline focus-visible:outline-accent focus-visible:outline-2 focus-visible:outline-offset-2 rounded-xs cursor-pointer"
          >
            Explore Works
          </a>

          {/* Scroll Down: accessible button with smooth scroll (no bouncing) */}
          <button
            type="button"
            onClick={handleScrollTo('intro')}
            aria-label="Scroll down to studio introduction"
            className="min-h-[44px] inline-flex items-center gap-2 font-mono text-label uppercase tracking-widest text-white/75 hover:text-white transition-opacity duration-200 focus-visible:outline-accent focus-visible:outline-2 focus-visible:outline-offset-2 rounded-xs cursor-pointer"
          >
            <span>Scroll Down</span>
            <span aria-hidden="true">↓</span>
          </button>
        </div>
      </div>
    </section>
  );
}
