/**
 * About page Studio Team section component.
 * Displays a photographic grid of practice directors, associates, and researchers.
 * If the team array is empty, this section returns null and does not render any markup.
 *
 * RESPONSIVE BEHAVIOR:
 * - Mobile (360px - 639px): 1 column portrait cards.
 * - Tablet (640px - 1023px): 2 columns.
 * - Desktop (1024px+): 4 columns across the grid track.
 */
import { Section } from '@/components/common/Section';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import Image from '@/components/common/Image';
import type { TeamMember } from '@/data/aboutContent';

export interface TeamProps {
  /** Array of studio collaborators (if empty, component renders nothing) */
  team?: TeamMember[];
  /** Optional custom CSS classes */
  className?: string;
}

/**
 * Team showcase section with responsive portrait grid.
 */
export function Team({ team, className = '' }: TeamProps) {
  // Return null if data array is empty or undefined (rule: no empty headings)
  if (!team || team.length === 0) {
    return null;
  }

  return (
    <Section tone="light" spacing="compact" className={className}>
      <Container>
        <SectionHeading
          index="05"
          eyebrow="The Atelier"
          title="Studio Leadership & Collaborators"
          description="A multidisciplinary collective of architects, interior specialists, computational researchers, and landscape strategists."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pt-4">
          {team.map((member) => (
            <div key={member.name} className="group flex flex-col justify-start">
              {/* Portrait photograph with fixed aspect ratio */}
              <div className="overflow-hidden bg-surface border border-line aspect-[4/5]">
                <Image
                  publicId={member.photo}
                  alt={member.alt}
                  aspectRatio="4/5"
                  priority={false}
                  sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 100vw"
                  className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                />
              </div>

              {/* Name & Role */}
              <h3 className="font-serif text-2xl text-text font-normal mt-4 leading-snug break-words">
                {member.name}
              </h3>
              <p className="font-mono text-small text-muted mt-1 break-words">{member.role}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export default Team;
