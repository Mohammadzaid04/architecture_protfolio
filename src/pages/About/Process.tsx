/**
 * About page Process section component.
 * Displays four sequential architectural delivery phases, numbered,
 * as a horizontal row on desktop and a vertical list on mobile.
 *
 * RESPONSIVE BEHAVIOR:
 * - Mobile (360px - 639px): Vertical stacked list with clean hairline borders.
 * - Tablet (640px - 1023px): 2 x 2 grid of sequential process cards.
 * - Desktop (1024px+): Single horizontal row of 4 columns across the 12-column track.
 */
import { Section } from '@/components/common/Section';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import type { AboutProcessContent } from '@/data/aboutContent';

export interface ProcessProps {
  /** Process section data */
  content: AboutProcessContent;
  /** Optional custom CSS classes */
  className?: string;
}

/**
 * Sequential architectural delivery methodology component.
 */
export function Process({ content, className = '' }: ProcessProps) {
  if (!content.steps || content.steps.length === 0) {
    return null;
  }

  return (
    <Section tone="light" spacing="compact" className={className}>
      <Container>
        <SectionHeading
          index={content.index}
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-4">
          {content.steps.map((step) => (
            <div
              key={step.number}
              className="border-t border-line pt-6 flex flex-col justify-start"
            >
              {/* Step Sequence Number */}
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-small text-accent font-semibold">
                  {step.number}
                </span>
                <span className="text-line text-xs" aria-hidden="true">
                  /
                </span>
                <span className="font-mono text-xs uppercase tracking-wider text-muted">Phase</span>
              </div>

              {/* Step Title */}
              <h3 className="font-serif text-2xl text-text font-normal leading-tight mb-3 break-words">
                {step.title}
              </h3>

              {/* Step Description */}
              <p className="text-small sm:text-body text-muted font-sans font-normal leading-relaxed break-words">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export default Process;
