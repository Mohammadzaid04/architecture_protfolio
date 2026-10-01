/**
 * Projects archive call-to-action section component.
 * Invites visitors looking for specific archives or comprehensive PDF monographs
 * to request the full portfolio or get to know the studio practice.
 *
 * RESPONSIVE BEHAVIOR:
 * - Mobile (< 640px): Headings, copy, and buttons stack vertically; buttons expand to full width (touch targets >= 44px).
 * - Tablet & Desktop (640px+): Two-column layout with heading and copy on the left, buttons grouped on the right.
 * - Framed with a top hairline border and generous top margin.
 */
import { Link } from 'react-router-dom';
import type { ProjectsArchiveCTA } from '@/data/projectsPageContent';

export interface ArchiveCTAProps {
  /** Archive content copy, heading, and button definitions from data file */
  content: ProjectsArchiveCTA;
  /** Optional custom CSS classes */
  className?: string;
}

/**
 * Editorial archive call-to-action section with primary and secondary button actions.
 */
export function ArchiveCTA({ content, className = '' }: ArchiveCTAProps) {
  return (
    <section
      aria-labelledby="archive-cta-heading"
      className={`border-t border-line mt-20 sm:mt-28 md:mt-36 pt-12 sm:pt-16 pb-6 ${className}`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
        {/* Left Column: Heading and Narrative Copy */}
        <div className="max-w-xl">
          <h2
            id="archive-cta-heading"
            className="font-serif text-3xl sm:text-4xl text-text font-normal tracking-tight break-words"
          >
            {content.title}
          </h2>
          <p className="mt-3 text-body text-muted font-sans font-normal leading-relaxed break-words">
            {content.text}
          </p>
        </div>

        {/* Right Column: Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 shrink-0">
          {/* Primary Action Button (Solid dark, turns accent on hover) */}
          <Link
            to={content.primaryButton.href}
            className="min-h-[44px] px-6 py-3.5 bg-text text-bg hover:bg-accent hover:text-white font-mono text-xs uppercase tracking-widest font-semibold transition-colors duration-200 inline-flex items-center justify-center text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-accent select-none"
          >
            {content.primaryButton.label}
          </Link>

          {/* Secondary Action Button (Outlined hairline, surface fill on hover) */}
          <Link
            to={content.secondaryButton.href}
            className="min-h-[44px] px-6 py-3.5 border border-line text-text hover:border-text hover:bg-surface font-mono text-xs uppercase tracking-widest transition-colors duration-200 inline-flex items-center justify-center text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-accent select-none"
          >
            {content.secondaryButton.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
