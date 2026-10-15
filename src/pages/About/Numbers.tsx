/**
 * About page Numbers / Studio Milestones section component.
 * Reuses the existing Metrics component and statistics data pattern.
 *
 * RESPONSIVE BEHAVIOR:
 * - Desktop: 4 equal columns aligned to the 12-column grid tracks.
 * - Mobile & Tablet: 2 x 2 grid with accessible count-up animation and screen reader values.
 */
import { Section } from '@/components/common/Section';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Metrics } from '@/pages/Home/Metrics';

export interface NumbersProps {
  /** Optional custom CSS classes */
  className?: string;
}

/**
 * Architectural practice quantitative milestones section.
 */
export function Numbers({ className = '' }: NumbersProps) {
  return (
    <Section tone="light" spacing="compact" className={className}>
      <Container>
        <SectionHeading
          index="04"
          eyebrow="Practice Milestones"
          title="Fourteen Years of Measured Practice"
          description="A quantitative overview of our studio's continuous inquiry into monolithic architecture, craftsmanship, and ecological permanence."
        />

        {/* Reuse existing Metrics component and data pattern */}
        <div className="-mt-12 sm:-mt-16">
          <Metrics />
        </div>
      </Container>
    </Section>
  );
}

export default Numbers;
