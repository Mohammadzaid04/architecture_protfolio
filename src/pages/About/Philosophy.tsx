/**
 * About page Philosophy section component.
 * Displays three to four core architectural principles with hairline dividers and concise texts.
 *
 * RESPONSIVE BEHAVIOR:
 * - Mobile (360px - 639px): Single column stacked principles with hairline top borders.
 * - Tablet & Desktop (640px+): Two-column or four-column grid with subtle borders and clear touch spacing.
 */
import { Section } from '@/components/common/Section';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import type { AboutPhilosophyContent } from '@/data/aboutContent';

export interface PhilosophyProps {
  /** Philosophy section content */
  content: AboutPhilosophyContent;
  /** Optional custom CSS classes */
  className?: string;
}

/**
 * Numbered architectural principles section with hairline dividers.
 */
export function Philosophy({ content, className = '' }: PhilosophyProps) {
  if (!content.principles || content.principles.length === 0) {
    return null;
  }

  return (
    <Section tone="light" spacing="compact" className={className}>
      <Container>
        <SectionHeading index={content.index} eyebrow={content.eyebrow} title={content.title} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pt-4">
          {content.principles.map((item) => (
            <article
              key={item.number}
              className="border-t border-line pt-6 flex flex-col justify-start"
            >
              {/* Monospace Principle Number */}
              <span className="font-mono text-small text-accent font-semibold block mb-3">
                {item.number}
              </span>

              {/* Principle Headline */}
              <h3 className="font-serif text-2xl sm:text-2xl text-text font-normal leading-tight mb-3 break-words">
                {item.title}
              </h3>

              {/* Principle Body Text */}
              <p className="text-small sm:text-body text-muted font-sans font-normal leading-relaxed break-words">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export default Philosophy;
