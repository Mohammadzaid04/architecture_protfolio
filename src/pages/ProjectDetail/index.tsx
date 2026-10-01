/**
 * Project detail case study page view component.
 * Displays full architectural documentation for a single project, including full-bleed eager hero,
 * structured facts specification bar, readable architectural narrative, asymmetric gallery with lightbox,
 * and circular next-project navigation.
 *
 * RESPONSIVE BEHAVIOR:
 * - Mobile (360px): Specifications stack cleanly into 2 columns; hero aspect ratio clamps to 4:3.
 *   Body text maintains 16px minimum floor and 65-75ch comfortable reading width.
 * - Tablet (768px): Specifications expand to 3 columns; hero aspect ratio transitions to 16:9.
 * - Desktop (1024px+): Specifications expand to 5 columns; hero aspect ratio expands to 21:9 cinematic ratio.
 * - Touch Targets: All navigation links, buttons, and adjacent project cards enforce >= 44x44px.
 */
import { useParams, Link } from 'react-router-dom';
import { getProjectBySlug, getNextProject } from '@/data/projects';
import { Section } from '@/components/common/Section';
import { Container } from '@/components/common/Container';
import { Divider } from '@/components/common/Divider';
import ResponsiveImage from '@/components/common/ResponsiveImage';
import { Gallery } from '@/components/projects/Gallery';
import { NotFound } from '@/pages/NotFound';
import { useDocumentHead } from '@/hooks/useDocumentHead';

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();

  // Lookup project by URL slug parameter
  const project = getProjectBySlug(slug || '');

  // SEO & Head Metadata
  const pageTitle = project ? project.title : 'Project Not Found';
  const pageDescription = project?.description;
  useDocumentHead(pageTitle, pageDescription);

  // If slug is not found, gracefully render the reused NotFound component
  if (!project) {
    return <NotFound />;
  }

  // Circular next-project navigation lookup
  const nextProject = getNextProject(project.slug);

  return (
    <article className="pt-24 sm:pt-28 md:pt-32 pb-24 sm:pb-32">
      <Section tone="light" className="py-0">
        <Container>
          {/* Top Breadcrumb & Return Link */}
          <div className="mb-8">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 font-mono text-small text-muted hover:text-text min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors"
              aria-label="Return to all projects"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span>Back to All Works</span>
            </Link>
          </div>

          {/* Project Header: Eyebrow, Title & Lead */}
          <header className="max-w-4xl">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
                Case Study
              </span>
              <span className="text-muted font-mono text-xs">/</span>
              <span className="font-mono text-xs uppercase tracking-widest text-muted">
                {project.category}
              </span>
            </div>

            <h1 className="font-serif text-display-xl sm:text-display-2xl text-text font-normal mt-3 leading-[1.05] tracking-tight break-words [overflow-wrap:anywhere]">
              {project.title}
            </h1>

            <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-muted font-serif italic max-w-3xl leading-relaxed">
              &ldquo;{project.description}&rdquo;
            </p>
          </header>

          {/* Architectural Facts Specification Bar */}
          <div className="mt-8 sm:mt-12">
            <Divider tone="subtle" />
            <dl className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 py-6 sm:py-8 font-mono text-small">
              <div>
                <dt className="text-label uppercase tracking-widest text-muted">Location</dt>
                <dd className="text-text font-medium mt-1 break-words">{project.location}</dd>
              </div>
              <div>
                <dt className="text-label uppercase tracking-widest text-muted">Year</dt>
                <dd className="text-text font-medium mt-1">{project.year}</dd>
              </div>
              <div>
                <dt className="text-label uppercase tracking-widest text-muted">Classification</dt>
                <dd className="text-text font-medium mt-1">{project.category}</dd>
              </div>
              <div>
                <dt className="text-label uppercase tracking-widest text-muted">Floor Area</dt>
                <dd className="text-text font-medium mt-1">{project.area}</dd>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <dt className="text-label uppercase tracking-widest text-muted">Project Team</dt>
                <dd className="text-text font-medium mt-1 break-words">
                  {project.team.join(', ')}
                </dd>
              </div>
            </dl>
            <Divider tone="subtle" />
          </div>

          {/* Full-Bleed Eager LCP Hero Image */}
          {/* Aspect ratio: 4:3 on mobile, 16:9 on tablet, 21:9 on desktop */}
          <div className="mt-8 sm:mt-12 overflow-hidden bg-surface shadow-sm">
            <ResponsiveImage
              publicId={project.cover}
              alt={`${project.title} flagship architecture cover photograph`}
              aspectRatio="4/3"
              priority={true}
              sizes="(min-width: 1440px) 1400px, (min-width: 1024px) 100vw, 100vw"
              className="hidden lg:block aspect-[21/9]"
            />
            <ResponsiveImage
              publicId={project.cover}
              alt={`${project.title} flagship architecture cover photograph`}
              aspectRatio="16/9"
              priority={true}
              sizes="100vw"
              className="hidden sm:block lg:hidden aspect-[16/9]"
            />
            <ResponsiveImage
              publicId={project.cover}
              alt={`${project.title} flagship architecture cover photograph`}
              aspectRatio="4/3"
              priority={true}
              sizes="100vw"
              className="block sm:hidden aspect-[4/3]"
            />
          </div>

          {/* Architectural Body Narrative (2-3 paragraphs, 65-75ch comfortable width) */}
          <div className="mt-12 sm:mt-16 md:mt-24 max-w-[72ch] mx-auto">
            <span className="font-mono text-label uppercase tracking-widest text-muted block mb-4">
              Architectural Concept & Realization
            </span>
            <div className="space-y-6 text-body text-text/90 font-sans leading-relaxed text-base sm:text-lg">
              {project.body && project.body.length > 0 ? (
                project.body.map((paragraph, index) => (
                  <p key={index} className="break-words">
                    {paragraph}
                  </p>
                ))
              ) : (
                <p className="break-words">{project.description}</p>
              )}
            </div>
          </div>

          {/* Asymmetric Photo & Video Gallery with Full-screen Lightbox */}
          <section className="mt-16 sm:mt-24 md:mt-32" aria-label="Project documentation gallery">
            <div className="mb-8 sm:mb-12">
              <span className="font-mono text-label uppercase tracking-widest text-muted block">
                02 / Spatial Documentation
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-text mt-2 font-normal">
                Photographic Study
              </h2>
            </div>

            <Gallery
              images={project.gallery}
              videoUrl={project.videoUrl}
              projectTitle={project.title}
            />
          </section>

          {/* Bottom Divider */}
          <div className="mt-20 sm:mt-28">
            <Divider tone="default" />
          </div>

          {/* Next Project Circular Navigation Block */}
          <footer className="mt-12 sm:mt-16 flex flex-col sm:flex-row sm:items-center justify-between gap-8">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 font-mono text-small text-muted hover:text-text min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors order-2 sm:order-1"
            >
              <span>← View All Projects</span>
            </Link>

            {/* Next Project Preview Card */}
            <div className="order-1 sm:order-2">
              <Link
                to={`/projects/${nextProject.slug}`}
                className="group flex items-center gap-4 sm:gap-6 min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent text-right"
                aria-label={`Explore next project: ${nextProject.title}, ${nextProject.category}`}
              >
                <div>
                  <span className="font-mono text-label uppercase tracking-widest text-muted block group-hover:text-accent transition-colors">
                    Next Project →
                  </span>
                  <span className="font-serif text-xl sm:text-2xl text-text font-normal group-hover:text-accent transition-colors block mt-1 break-words">
                    {nextProject.title}
                  </span>
                  <span className="font-mono text-xs text-muted block mt-0.5">
                    {nextProject.location} • {nextProject.year}
                  </span>
                </div>

                {/* Small Cover Thumbnail */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 overflow-hidden bg-surface border border-line">
                  <div className="w-full h-full transform transition-transform duration-500 group-hover:scale-110">
                    <ResponsiveImage
                      publicId={nextProject.cover}
                      alt={`${nextProject.title} preview thumbnail`}
                      aspectRatio="1/1"
                      sizes="80px"
                    />
                  </div>
                </div>
              </Link>
            </div>
          </footer>
        </Container>
      </Section>
    </article>
  );
}
