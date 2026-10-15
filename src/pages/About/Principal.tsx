/**
 * About page Principal leadership section component.
 * Displays the founding architect's portrait photograph, name, leadership title,
 * biographical background, and professional credentials list.
 *
 * RESPONSIVE BEHAVIOR:
 * - Mobile (360px - 767px): Stacked single column (portrait on top, biography below).
 * - Desktop (768px+): Fixed two-column layout: portrait on left (5 cols), biography and credentials on right (7 cols).
 */
import { Section } from '@/components/common/Section';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import Image from '@/components/common/Image';
import type { AboutPrincipalContent } from '@/data/aboutContent';

export interface PrincipalProps {
  /** Principal architect profile data */
  content: AboutPrincipalContent;
  /** Optional custom CSS classes */
  className?: string;
}

/**
 * Editorial leadership profile block with portrait photo and credentials.
 */
export function Principal({ content, className = '' }: PrincipalProps) {
  return (
    <Section tone="light" spacing="compact" className={className}>
      <Container>
        <SectionHeading index={content.index} eyebrow={content.eyebrow} title={content.title} />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-start">
          {/* Left Column: Portrait Photograph (Lazy loaded, fixed aspect ratio) */}
          <div className="md:col-span-5 lg:col-span-5">
            <div className="overflow-hidden bg-surface border border-line">
              <Image
                publicId={content.image.publicId}
                alt={content.image.alt}
                aspectRatio={content.image.aspectRatio ?? '4/5'}
                priority={false}
                sizes="(min-width: 1024px) 460px, (min-width: 768px) 40vw, 100vw"
                className="w-full"
              />
            </div>
          </div>

          {/* Right Column: Name, Title, Biography & Credentials */}
          <div className="md:col-span-7 lg:col-span-7 flex flex-col justify-start">
            <h3 className="font-serif text-3xl sm:text-4xl text-text font-normal leading-tight break-words">
              {content.name}
            </h3>

            <span className="font-mono text-small uppercase tracking-widest text-accent font-semibold mt-2 block">
              {content.role}
            </span>

            {/* Biographical Narrative */}
            <div className="mt-6 space-y-4 text-body text-text/85 font-sans leading-relaxed">
              {content.bio.map((paragraph, index) => (
                <p key={index} className="break-words">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Professional Credentials & Memberships */}
            {content.credentials && content.credentials.length > 0 && (
              <div className="mt-8 pt-6 border-t border-line">
                <span className="font-mono text-label uppercase tracking-widest text-muted block mb-3">
                  Professional Credentials & Accreditations
                </span>
                <ul className="space-y-2 list-none p-0 m-0">
                  {content.credentials.map((cred, index) => (
                    <li
                      key={index}
                      className="font-mono text-small text-muted flex items-start gap-2 break-words"
                    >
                      <span className="text-accent select-none" aria-hidden="true">
                        —
                      </span>
                      <span>{cred}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default Principal;
