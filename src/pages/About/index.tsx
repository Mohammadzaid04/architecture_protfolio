/**
 * About page view component composing individual modular sections.
 * Displays practice history, design philosophy, principal leadership profile,
 * architectural delivery process, quantitative metrics, studio team,
 * awards/publications, and closing dark CTA.
 *
 * RESPONSIVE BEHAVIOR:
 * - Fluid mobile-first layout (360px - 2560px+).
 * - Eagerly loads the wide studio header image for optimal LCP score.
 * - Solid navbar state inherited from Layout shell.
 */
import { useDocumentHead } from '@/hooks/useDocumentHead';
import { aboutContent } from '@/data/aboutContent';
import { Section } from '@/components/common/Section';
import { Container } from '@/components/common/Container';
import { PageHeader } from '@/components/common/PageHeader';
import { Story } from './Story';
import { Philosophy } from './Philosophy';
import { Principal } from './Principal';
import { Process } from './Process';
import { Numbers } from './Numbers';
import { Team } from './Team';
import { AwardsPublications } from './AwardsPublications';
import { Cta } from '@/pages/Home/Cta';

export function About() {
  // Set document title and SEO meta description
  useDocumentHead(aboutContent.seo.title, aboutContent.seo.description);

  return (
    <article className="pt-10 sm:pt-14 md:pt-16">
      {/* 1. Page Header with Eager-loaded Wide Studio Image (Fixed Aspect Ratio) */}
      <Section tone="light" spacing="none" className="pb-12 sm:pb-16 md:pb-20">
        <Container>
          <PageHeader
            eyebrow={aboutContent.header.eyebrow}
            title={aboutContent.header.title}
            intro={aboutContent.header.intro}
            image={{
              publicId: aboutContent.header.image.publicId,
              alt: aboutContent.header.image.alt,
              aspectRatio: aboutContent.header.image.aspectRatio,
              priority: true, // Only the About header image is eager
              sizes: '(min-width: 1440px) 1280px, (min-width: 1024px) 95vw, 100vw',
            }}
          />
        </Container>
      </Section>

      {/* 2. Studio Heritage & Narrative Story */}
      <Story content={aboutContent.story} />

      {/* 3. Guiding Architectural Philosophy & Principles */}
      <Philosophy content={aboutContent.philosophy} />

      {/* 4. Leadership & Principal Profile */}
      <Principal content={aboutContent.principal} />

      {/* 5. Sequential Delivery Process */}
      <Process content={aboutContent.process} />

      {/* 6. Quantitative Studio Practice Metrics */}
      <Numbers />

      {/* 7. Studio Atelier Team (Hidden if empty array) */}
      <Team team={aboutContent.team} />

      {/* 8. Ruled Lists of Honors, Awards & Publications (Hidden if empty) */}
      <AwardsPublications awards={aboutContent.awards} publications={aboutContent.publications} />

      {/* 9. Closing Dark Tone Call to Action */}
      <Cta />
    </article>
  );
}

export default About;
