/**
 * About page Awards & Monographic Publications section component.
 * Displays simple ruled lists (year, title, issuer) in a responsive two-column layout.
 * If both awards and publications arrays are empty, this section returns null.
 *
 * RESPONSIVE BEHAVIOR:
 * - Mobile (360px - 767px): Stacked vertical layout (Awards first, Publications second).
 * - Desktop (768px+): Two equal columns separated by a subtle dividing line or gutter.
 */
import { Section } from '@/components/common/Section';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import type { AwardItem, PublicationItem } from '@/data/aboutContent';

export interface AwardsPublicationsProps {
  /** Awards list */
  awards?: AwardItem[];
  /** Publications & Monographs list */
  publications?: PublicationItem[];
  /** Optional custom CSS classes */
  className?: string;
}

/**
 * Editorial ruled lists for architectural honors, design prizes, and publications.
 */
export function AwardsPublications({
  awards = [],
  publications = [],
  className = '',
}: AwardsPublicationsProps) {
  const hasAwards = awards.length > 0;
  const hasPublications = publications.length > 0;

  // Return null if both are empty (rule: no empty headings)
  if (!hasAwards && !hasPublications) {
    return null;
  }

  return (
    <Section tone="light" spacing="compact" className={className}>
      <Container>
        <SectionHeading
          index="06"
          eyebrow="Recognition"
          title="Honors & Selected Publications"
          description="A chronological record of peer recognitions, international design awards, and scholarly architectural monographs."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 pt-4">
          {/* Awards Ruled List */}
          {hasAwards && (
            <div>
              <div className="border-b border-line pb-3 mb-6">
                <h3 className="font-mono text-label uppercase tracking-widest text-accent font-semibold">
                  Selected Awards & Prizes
                </h3>
              </div>

              <ul className="divide-y divide-line list-none p-0 m-0">
                {awards.map((award, index) => (
                  <li key={index} className="py-4 flex items-baseline justify-between gap-4">
                    <div className="min-w-0 pr-4">
                      <h4 className="font-serif text-lg sm:text-xl text-text font-normal leading-snug break-words">
                        {award.title}
                      </h4>
                      <p className="font-sans text-small text-muted mt-1 break-words">
                        {award.issuer}
                        {award.project && (
                          <span className="font-mono text-xs text-text/60 ml-2">
                            [{award.project}]
                          </span>
                        )}
                      </p>
                    </div>
                    <span className="font-mono text-small text-accent shrink-0 select-none">
                      {award.year}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Publications Ruled List */}
          {hasPublications && (
            <div>
              <div className="border-b border-line pb-3 mb-6">
                <h3 className="font-mono text-label uppercase tracking-widest text-accent font-semibold">
                  Monographs & Publications
                </h3>
              </div>

              <ul className="divide-y divide-line list-none p-0 m-0">
                {publications.map((pub, index) => (
                  <li key={index} className="py-4 flex items-baseline justify-between gap-4">
                    <div className="min-w-0 pr-4">
                      <h4 className="font-serif text-lg sm:text-xl text-text font-normal leading-snug break-words">
                        {pub.title}
                      </h4>
                      <p className="font-sans text-small text-muted mt-1 break-words">
                        {pub.issuer}
                      </p>
                    </div>
                    <span className="font-mono text-small text-accent shrink-0 select-none">
                      {pub.year}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}

export default AwardsPublications;
