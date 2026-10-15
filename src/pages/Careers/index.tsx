/**
 * Careers page view component composing culture values, open positions list,
 * empty state fallback, and spontaneous application guidelines.
 *
 * RESPONSIVE BEHAVIOR:
 * - Mobile (360px - 767px): Single column, fluid typography, minimum 44x44px touch targets.
 * - Desktop (768px+): 3-column culture values grid, structured expandable rows.
 * - Solid navbar state inherited from Layout shell.
 */
import { useDocumentHead } from '@/hooks/useDocumentHead';
import { careersContent } from '@/data/careersContent';
import { jobs } from '@/data/jobs';
import { siteConfig } from '@/data/siteConfig';
import { Section } from '@/components/common/Section';
import { Container } from '@/components/common/Container';
import { PageHeader } from '@/components/common/PageHeader';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Button } from '@/components/common/Button';
import { WhyWorkHere } from './WhyWorkHere';
import { JobRow } from './JobRow';

export function Careers() {
  // Set document title and SEO meta description
  useDocumentHead(careersContent.seo.title, careersContent.seo.description);

  const recipientEmail = siteConfig.careersEmail || siteConfig.email;
  const spontaneousSubject = encodeURIComponent(
    `General Portfolio Submission — ${siteConfig.studioName}`,
  );
  const spontaneousMailto = `mailto:${recipientEmail}?subject=${spontaneousSubject}`;

  const hasJobs = jobs && jobs.length > 0;

  return (
    <article className="pt-10 sm:pt-14 md:pt-16 pb-20 sm:pb-28">
      {/* 1. Page Header */}
      <Section tone="light" spacing="none" className="pb-12 sm:pb-16 md:pb-20">
        <Container>
          <PageHeader
            eyebrow={careersContent.header.eyebrow}
            title={careersContent.header.title}
            intro={careersContent.header.intro}
          />
        </Container>
      </Section>

      {/* 2. "Why Work Here" 3 Values Block */}
      <WhyWorkHere
        eyebrow={careersContent.whyWorkHere.eyebrow}
        title={careersContent.whyWorkHere.title}
        intro={careersContent.whyWorkHere.intro}
        values={careersContent.whyWorkHere.values}
      />

      {/* 3. Open Positions List OR Empty State */}
      <Section tone="light" spacing="compact" className="border-t border-line">
        <Container>
          <SectionHeading
            eyebrow={careersContent.positionsHeading.eyebrow}
            title={careersContent.positionsHeading.title}
            description={
              hasJobs
                ? 'Select a role to review qualifications and submit your application.'
                : undefined
            }
          />

          {hasJobs ? (
            /* Open Positions Accordion Rows */
            <div className="border-t border-line divide-y divide-line">
              {jobs.map((job, index) => (
                <JobRow key={job.title} job={job} index={index} />
              ))}
            </div>
          ) : (
            /* Friendly Empty State when jobs.ts is empty */
            <div className="border border-line bg-surface p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-6">
              <span className="font-mono text-label uppercase tracking-widest text-accent font-semibold block">
                Practice Recruitment
              </span>
              <h3 className="font-serif text-3xl text-text font-normal">
                {careersContent.emptyState.title}
              </h3>
              <p className="text-body text-muted font-sans max-w-lg mx-auto leading-relaxed">
                {careersContent.emptyState.message}
              </p>
              <div className="pt-2">
                <Button href={spontaneousMailto} variant="primary" size="lg">
                  {careersContent.emptyState.buttonLabel} →
                </Button>
              </div>
            </div>
          )}

          {/* 4. Internships and Open Applications Note (shown when jobs exist) */}
          {hasJobs && (
            <div className="mt-16 sm:mt-20 p-8 sm:p-10 border border-line bg-surface/60 max-w-4xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-xl">
                <h4 className="font-serif text-2xl text-text font-normal mb-2">
                  {careersContent.spontaneous.title}
                </h4>
                <p className="text-small sm:text-body text-muted font-sans leading-relaxed">
                  {careersContent.spontaneous.description}
                </p>
              </div>
              <div className="shrink-0">
                <Button href={spontaneousMailto} variant="secondary" size="md">
                  {careersContent.spontaneous.buttonLabel} →
                </Button>
              </div>
            </div>
          )}
        </Container>
      </Section>
    </article>
  );
}

export default Careers;
