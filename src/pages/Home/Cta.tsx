/**
 * Home page Call to Action section.
 * Developers edit this component to change contact invitation copy or direct communication channels.
 * Always uses the dark tone with ambient video background.
 */
import { Section } from '@/components/common/Section';
import { Container } from '@/components/common/Container';
import { Button } from '@/components/common/Button';
import BackgroundVideo from '@/components/common/BackgroundVideo';
import { homeContent } from '@/data/homeContent';
import { siteConfig } from '@/data/siteConfig';

export function Cta() {
  const { cta } = homeContent;

  return (
    <Section tone="dark" spacing="spacious" className="relative w-full overflow-hidden text-center">
      {/* Ambient Video Background */}
      <BackgroundVideo url={cta.video.url} posterId={cta.poster} posterAlt={cta.posterAlt} />
      {/* Dark overlay so text stays readable */}
      <div className="absolute inset-0 bg-dark-bg/60 pointer-events-none" />

      <Container className="relative z-20 max-w-3xl mx-auto space-y-8">
        <span className="text-label uppercase tracking-widest font-mono text-dark-accent">
          Start a Dialogue
        </span>

        <h2 className="font-serif text-display-lg leading-[1.05] tracking-tight text-dark-text">
          {cta.headline}
        </h2>

        <div className="pt-2">
          <Button to="/contact" variant="primary" size="lg">
            {cta.buttonLabel} →
          </Button>
        </div>

        <div className="pt-8 border-t border-dark-line flex flex-col sm:flex-row items-center justify-center gap-6 text-small text-dark-muted">
          <a
            href={`mailto:${siteConfig.email}`}
            className="hover:text-dark-text underline underline-offset-4 transition-colors"
          >
            {siteConfig.email}
          </a>
          <span className="hidden sm:inline" aria-hidden="true">
            •
          </span>
          <span>{siteConfig.phone}</span>
        </div>
      </Container>
    </Section>
  );
}
