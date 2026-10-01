/**
 * Home page Studio Statement and Statistics section.
 * Developers edit this component to change the studio philosophy introduction or metrics layout.
 */
import { Section } from '@/components/common/Section';
import { Container } from '@/components/common/Container';
import { Button } from '@/components/common/Button';
import { homeContent } from '@/data/homeContent';
import { Metrics } from './Metrics';

export function Intro() {
  const { intro } = homeContent;

  return (
    /* 
      Section bottom padding calibrated so distance from metric labels to next section's divider
      is 96-128px on desktop (112px with metric pb-4), 80-96px on tablet (96px), and 64-80px on mobile (80px).
    */
    <Section
      id="intro"
      tone="light"
      spacing="none"
      className="pt-20 sm:pt-28 md:pt-40 pb-16 sm:pb-20 lg:pb-24"
    >
      <Container>
        {/* Philosophy & Practice block (kept untouched) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Eyebrow Label */}
          <div className="lg:col-span-3">
            <span className="text-label uppercase tracking-widest text-accent font-mono">
              Philosophy & Practice
            </span>
          </div>

          {/* Statement Paragraph & Action */}
          <div className="lg:col-span-9 space-y-8">
            <p className="font-serif text-h2 leading-snug text-text max-w-3xl">{intro.statement}</p>

            <div>
              <Button to="/about" variant="link-with-underline">
                {intro.linkLabel} →
              </Button>
            </div>
          </div>
        </div>

        {/* Studio Metrics Section (animated divider, count-up, and 12-column alignment) */}
        <Metrics />
      </Container>
    </Section>
  );
}
