/**
 * Flagship Selected Project full-bleed spotlight section.
 * Developers edit this component to change the spotlighted project or key architectural facts.
 */
import { Section } from '@/components/common/Section';
import { Container } from '@/components/common/Container';
import ResponsiveImage from '@/components/common/ResponsiveImage';
import { Button } from '@/components/common/Button';
import { homeContent } from '@/data/homeContent';
import { projects } from '@/data/projects';

export function SelectedProject() {
  const project = projects.find((p) => p.slug === homeContent.selectedProjectSlug) || projects[0];

  if (!project) return null;

  return (
    <Section tone="light" spacing="default">
      <Container>
        <div className="mb-8">
          <span className="text-label uppercase tracking-widest text-accent font-mono">
            Flagship Case Study
          </span>
          <h2 className="font-serif text-display-lg leading-[1.05] tracking-tight text-text mt-2">
            {project.title}
          </h2>
        </div>

        {/* Full-bleed Architectural Image */}
        <div className="relative overflow-hidden bg-surface mb-8">
          <ResponsiveImage
            publicId={project.cover}
            alt={`${project.title} flagship project overview`}
            aspectRatio="16/9"
            sizes="(min-width: 1280px) 1280px, 100vw"
          />
        </div>

        {/* Key Project Specifications Bar */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 pt-6 border-t border-line items-center">
          <div>
            <span className="text-label uppercase tracking-widest font-mono text-muted block">
              Location
            </span>
            <span className="text-small text-text font-medium mt-1 block">{project.location}</span>
          </div>
          <div>
            <span className="text-label uppercase tracking-widest font-mono text-muted block">
              Year
            </span>
            <span className="text-small text-text font-medium mt-1 block">{project.year}</span>
          </div>
          <div>
            <span className="text-label uppercase tracking-widest font-mono text-muted block">
              Category
            </span>
            <span className="text-small text-text font-medium mt-1 block">{project.category}</span>
          </div>
          <div>
            <span className="text-label uppercase tracking-widest font-mono text-muted block">
              Area
            </span>
            <span className="text-small text-text font-medium mt-1 block">{project.area}</span>
          </div>
          <div className="col-span-2 md:col-span-1 md:text-right">
            <Button to={`/projects/${project.slug}`} variant="link-with-underline">
              Case Study →
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
