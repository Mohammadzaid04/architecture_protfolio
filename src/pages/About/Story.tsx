/**
 * About page Story section component.
 * Displays the studio's founding history, narrative heritage, and a display pull-quote.
 *
 * RESPONSIVE BEHAVIOR:
 * - Mobile (360px - 767px): Single-column stacked layout. Pull-quote renders with readable fluid serif typography.
 * - Desktop (768px+): Asymmetric two-column editorial layout: section label on the left (4 cols),
 *   narrative body and pull-quote on the right (8 cols).
 */
import { Section } from '@/components/common/Section';
import { Container } from '@/components/common/Container';
import type { AboutStoryContent } from '@/data/aboutContent';

export interface StoryProps {
  /** Story content containing label, lead, body paragraphs, and pull-quote */
  content: AboutStoryContent;
  /** Optional custom CSS classes */
  className?: string;
}

/**
 * Editorial two-column studio history story block with display serif pull-quote.
 */
export function Story({ content, className = '' }: StoryProps) {
  return (
    <Section tone="light" spacing="compact" className={`border-t border-line ${className}`}>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16">
          {/* Left Column: Editorial Label */}
          <div className="md:col-span-4 lg:col-span-3">
            <span className="font-mono text-label uppercase tracking-widest text-muted sticky top-28 block">
              {content.label}
            </span>
          </div>

          {/* Right Column: Narrative Body & Display Pull-Quote */}
          <div className="md:col-span-8 lg:col-span-9 max-w-3xl">
            {/* Lead Paragraph */}
            <p className="font-serif text-2xl sm:text-3xl text-text font-normal leading-snug">
              {content.lead}
            </p>

            {/* Display Font Pull-Quote */}
            <blockquote className="my-8 sm:my-10 border-l-2 border-accent pl-6 sm:pl-8 py-2">
              <p className="font-serif italic text-xl sm:text-2xl text-text/90 leading-relaxed">
                &ldquo;{content.pullQuote}&rdquo;
              </p>
            </blockquote>

            {/* In-depth Narrative Body Paragraphs */}
            <div className="space-y-6 text-body text-text/85 font-sans font-normal leading-relaxed">
              {content.paragraphs.map((paragraph, index) => (
                <p key={index} className="break-words">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default Story;
