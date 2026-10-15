/**
 * Careers page "Why work here" values block component.
 * Displays three core studio values supporting practice culture and team development.
 *
 * RESPONSIVE BEHAVIOR:
 * - Mobile (360px - 767px): 1 column stacked cards with hairline borders.
 * - Desktop (768px+): 3 columns across the container grid.
 */
import { Section } from '@/components/common/Section';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import type { CareerValue } from '@/data/careersContent';

export interface WhyWorkHereProps {
  /** Section eyebrow label */
  eyebrow: string;
  /** Section headline */
  title: string;
  /** Introductory text */
  intro: string;
  /** Array of 3 studio values */
  values: CareerValue[];
  /** Optional custom CSS classes */
  className?: string;
}

/**
 * Editorial 3-values culture block for the Careers page.
 */
export function WhyWorkHere({ eyebrow, title, intro, values, className = '' }: WhyWorkHereProps) {
  if (!values || values.length === 0) {
    return null;
  }

  return (
    <Section tone="light" spacing="compact" className={`border-t border-line ${className}`}>
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} description={intro} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 pt-4">
          {values.map((val) => (
            <article key={val.number} className="border-t border-line pt-6 flex flex-col">
              <span className="font-mono text-small text-accent font-semibold block mb-3">
                {val.number}
              </span>
              <h3 className="font-serif text-2xl text-text font-normal leading-tight mb-3 break-words">
                {val.title}
              </h3>
              <p className="text-small sm:text-body text-muted font-sans font-normal leading-relaxed break-words">
                {val.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export default WhyWorkHere;
