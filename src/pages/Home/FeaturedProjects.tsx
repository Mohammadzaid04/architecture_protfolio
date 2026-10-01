/**
 * Homepage "Portfolio Highlights" curated showcase section.
 * Implements architectural editorial layout with 8/4 alternating 12-column grid,
 * robust media containers, semantic spec lists, and viewport entrance animations.
 *
 * RESPONSIVE BEHAVIOR:
 * - Desktop (lg+): 12-column row (8 cols image / 4 cols annotation aligned to bottom).
 *   Alternates sides: Project 1 (Image Left / Info Right), Project 2 (Info Left / Image Right).
 * - Tablet (md): Image full width, annotation organized in a balanced 2-column layout below.
 * - Mobile (<768px): Single column vertical stack; titles never cropped; comfortable tap targets.
 */
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Section } from '@/components/common/Section';
import { Container } from '@/components/common/Container';
import ResponsiveImage from '@/components/common/ResponsiveImage';
import { homeContent } from '@/data/homeContent';
import { projects } from '@/data/projects';
import type { Project } from '@/types';

/**
 * Animation duration and timing constants for Portfolio Highlights.
 * Configured for a calm, editorial, architectural pacing.
 */
/** Duration for image clip-path reveal in milliseconds (1200-1500ms range) */
const IMAGE_REVEAL_DURATION_MS = 1350;

/** Duration for annotation entrance fade/translate in milliseconds (900-1200ms range) */
const ANNOTATION_DURATION_MS = 1000;

/** Initial start delay (ms) before image begins revealing once in view (150-300ms range) */
const ROW_INITIAL_DELAY_MS = 200;

/** Stagger delay (ms) between image reveal start and annotation block entrance (150-250ms range) */
const ANNOTATION_STAGGER_DELAY_MS = 200;

/** Duration for section header fade/translate entrance in milliseconds (900-1200ms range) */
const HEADER_DURATION_MS = 1000;

/** Soft architectural ease-out curve */
const EASING_SOFT_OUT = 'cubic-bezier(0.22, 1, 0.36, 1)';

interface ProjectRowProps {
  project: Project;
  index: number;
  totalProjects: number;
  prefersReducedMotion: boolean;
}

/**
 * Individual architectural project row:
 * - 12-column desktop grid with alternating image/annotation positions.
 * - Semantic <article> with stretched clickable area covering the entire row (one tab stop).
 * - Left-to-right clip-path image reveal with staggered annotation entrance.
 */
function ProjectRow({ project, index, totalProjects, prefersReducedMotion }: ProjectRowProps) {
  const rowRef = useRef<HTMLElement>(null);
  const [hasEntered, setHasEntered] = useState(() => prefersReducedMotion);

  // Trigger entrance sequence when project row enters viewport (runs once)
  useEffect(() => {
    if (hasEntered || prefersReducedMotion) return;
    const el = rowRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -10% 0px',
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasEntered, prefersReducedMotion]);

  // Alternating side logic on desktop: Project 1 (even index 0) = Image Left; Project 2 = Info Left
  const isEven = index % 2 === 0;
  const indexString = String(index + 1).padStart(2, '0');

  // Image left-to-right clip-path reveal (1200-1500ms range with initial delay)
  const imageAnimStyle = prefersReducedMotion
    ? undefined
    : {
        clipPath: hasEntered ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
        opacity: hasEntered ? 1 : 0.4,
        transition: `clip-path ${IMAGE_REVEAL_DURATION_MS}ms ${EASING_SOFT_OUT} ${ROW_INITIAL_DELAY_MS}ms, opacity ${IMAGE_REVEAL_DURATION_MS}ms ease-out ${ROW_INITIAL_DELAY_MS}ms`,
      };

  // Annotation block fade + subtle translateY (staggered after image reveal begins)
  const annotationDelay = ROW_INITIAL_DELAY_MS + ANNOTATION_STAGGER_DELAY_MS;
  const annotationAnimStyle = prefersReducedMotion
    ? undefined
    : {
        opacity: hasEntered ? 1 : 0,
        transform: hasEntered ? 'translateY(0)' : 'translateY(10px)',
        transition: `opacity ${ANNOTATION_DURATION_MS}ms ease-out ${annotationDelay}ms, transform ${ANNOTATION_DURATION_MS}ms ${EASING_SOFT_OUT} ${annotationDelay}ms`,
      };

  return (
    <>
      <article
        ref={rowRef}
        aria-labelledby={`project-title-${project.slug}`}
        className="group relative w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 lg:items-end"
      >
        {/* 
          1. Media Container:
          - Desktop: 8 columns (lg:col-span-8).
          - Alternates: order-1 on even projects (left), order-2 on odd projects (right).
          - Fixed 3:2 aspect ratio with slow pointer hover zoom.
        */}
        <div
          style={imageAnimStyle}
          className={`col-span-1 lg:col-span-8 overflow-hidden aspect-[3/2] w-full bg-surface ${
            isEven ? 'lg:order-1' : 'lg:order-2'
          }`}
        >
          <div
            className={`w-full h-full transition-transform duration-700 ease-out ${
              prefersReducedMotion ? '' : 'group-hover:scale-[1.03]'
            }`}
          >
            <ResponsiveImage
              publicId={project.cover}
              alt={`${project.title}, ${project.category} architecture in ${project.location}`}
              aspectRatio="3/2"
              sizes="(min-width: 1024px) 66vw, 100vw"
              priority={index === 0}
            />
          </div>
        </div>

        {/* 
          2. Annotation Block:
          - Desktop: 4 columns (lg:col-span-4) aligned to the bottom of the image.
          - Alternates: order-2 on even projects (right), order-1 on odd projects (left).
          - Tablet: 2-column layout (title left, specs right).
          - Mobile: Single-column vertical stack.
        */}
        <div
          style={annotationAnimStyle}
          className={`col-span-1 lg:col-span-4 md:grid md:grid-cols-2 md:gap-8 md:items-end lg:block ${
            isEven ? 'lg:order-2' : 'lg:order-1'
          }`}
        >
          {/* Top Metadata: Index, Category, Title, Action Cue */}
          <div>
            {/* Small Mono Index & Category */}
            <div className="flex items-center gap-2.5 text-label uppercase tracking-widest font-mono mb-3">
              <span className="text-accent font-medium">No. {indexString}</span>
              <span className="text-line" aria-hidden="true">
                /
              </span>
              <span className="text-muted">{project.category}</span>
            </div>

            {/* Project Title with Stretched Link covering the entire article row */}
            <h3
              id={`project-title-${project.slug}`}
              className="font-serif text-[clamp(1.75rem,2.2vw+0.5rem,2.75rem)] leading-[1.1] text-text font-normal mb-3"
            >
              <Link
                to={`/projects/${project.slug}`}
                className="focus:outline-none focus-visible:outline-accent focus-visible:outline-2 focus-visible:outline-offset-4 rounded-xs inline-block"
              >
                {/* Pseudo-element stretches across entire <article> for unified single tap target */}
                <span className="after:absolute after:inset-0 after:z-10" aria-hidden="true" />
                {project.title}
              </Link>
            </h3>

            {/* View Project Action Cue with subtle arrow nudge on hover */}
            <div className="flex items-center gap-1.5 text-small text-muted font-sans font-medium mb-6 group-hover:text-text transition-colors">
              <span>View project</span>
              <span
                aria-hidden="true"
                className={`inline-block transition-transform duration-300 ease-out ${
                  prefersReducedMotion ? '' : 'group-hover:translate-x-1'
                }`}
              >
                →
              </span>
            </div>
          </div>

          {/* Semantic Architectural Specification List (<dl>) */}
          <dl className="border-t border-line divide-y divide-line/60 text-small font-sans w-full">
            <div className="flex items-baseline justify-between py-2.5">
              <dt className="font-mono text-label uppercase tracking-widest text-muted">
                Location
              </dt>
              <dd className="text-text font-normal">{project.location}</dd>
            </div>
            <div className="flex items-baseline justify-between py-2.5">
              <dt className="font-mono text-label uppercase tracking-widest text-muted">Area</dt>
              <dd className="text-text font-normal">{project.area}</dd>
            </div>
            <div className="flex items-baseline justify-between py-2.5">
              <dt className="font-mono text-label uppercase tracking-widest text-muted">Year</dt>
              <dd className="text-text font-normal">{project.year}</dd>
            </div>
          </dl>
        </div>
      </article>

      {/* 
        3. Low-contrast 1px Hairline Divider:
        - Separates PROJECTS from each other (not image from caption).
        - Consistent vertical rhythm (my-16 sm:my-20 lg:my-24).
      */}
      {index < totalProjects - 1 && (
        <div className="w-full h-px bg-line my-16 sm:my-20 lg:my-24" aria-hidden="true" />
      )}
    </>
  );
}

/**
 * Section Header:
 * - Desktop: Asymmetric layout with title/description on left and square CTA on right.
 * - Mobile: Clean vertical stack order (label -> heading -> description -> CTA).
 */
export function FeaturedProjects() {
  const headerRef = useRef<HTMLDivElement>(null);

  // Detect user motion preferences
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false,
  );

  const [hasHeaderEntered, setHasHeaderEntered] = useState(() => prefersReducedMotion);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  // Header entrance observer
  useEffect(() => {
    if (hasHeaderEntered || prefersReducedMotion) return;
    const el = headerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setHasHeaderEntered(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px',
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasHeaderEntered, prefersReducedMotion]);

  // Data-driven list of featured projects from catalog
  const featured = projects.filter((p) => homeContent.featuredProjectSlugs.includes(p.slug));

  const headerAnimStyle = prefersReducedMotion
    ? undefined
    : {
        opacity: hasHeaderEntered ? 1 : 0,
        transform: hasHeaderEntered ? 'translateY(0)' : 'translateY(12px)',
        transition: `opacity ${HEADER_DURATION_MS}ms ease-out 150ms, transform ${HEADER_DURATION_MS}ms ${EASING_SOFT_OUT} 150ms`,
      };

  return (
    <Section
      id="featured-projects"
      tone="light"
      spacing="none"
      className="pt-0 pb-16 sm:pb-24 md:pb-32"
    >
      <Container>
        {/* Top 1px hairline divider matching container width */}
        <div className="w-full h-px bg-line mb-10 sm:mb-12" aria-hidden="true" />

        {/* Section Header */}
        <div
          ref={headerRef}
          style={headerAnimStyle}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-4"
        >
          <div className="max-w-3xl">
            {/* Section Eyebrow Label */}
            <div className="flex items-center gap-2.5 text-label font-medium uppercase tracking-widest text-muted mb-3 sm:mb-4">
              <span className="font-mono text-accent">01</span>
              <span className="text-line" aria-hidden="true">
                /
              </span>
              <span>SELECTED WORK</span>
            </div>

            {/* Display Headline */}
            <h2
              id="portfolio-highlights-title"
              className="font-serif text-[clamp(2.25rem,4vw+0.75rem,4rem)] leading-[1.05] tracking-tight text-text"
            >
              Portfolio Highlights
            </h2>

            {/* Narrative Description (constrained to ~60ch) */}
            <p className="mt-4 sm:mt-5 text-body text-muted font-sans font-normal leading-relaxed max-w-[60ch]">
              A curated selection of residential and cultural works balancing monolithic mass with
              material sensitivity.
            </p>
          </div>

          {/* Minimal Editorial CTA Button */}
          <div className="shrink-0 lg:self-end">
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2.5 px-6 py-3 border border-text text-text bg-transparent hover:border-accent hover:text-accent text-small font-medium tracking-wide rounded-none transition-colors duration-250 ease-out focus:outline-none focus-visible:outline-accent focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <span>View All Projects</span>
              <span
                aria-hidden="true"
                className={`transition-transform duration-250 ease-out ${
                  prefersReducedMotion ? '' : 'group-hover:translate-x-1'
                }`}
              >
                →
              </span>
            </Link>
          </div>
        </div>

        {/* 
          Curated Project Rows:
          - Spacing from header to first project: mt-16 sm:mt-20 lg:mt-24 (~80-120px).
          - Alternates left/right on desktop; unified 8/4 grid structure for every project.
        */}
        <div className="mt-16 sm:mt-20 lg:mt-24 space-y-0">
          {featured.map((project, index) => (
            <ProjectRow
              key={project.slug}
              project={project}
              index={index}
              totalProjects={featured.length}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>

        {/* Optional End-of-List Plain Text Link */}
        <div className="mt-16 sm:mt-20 lg:mt-24 text-center">
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 text-small font-mono uppercase tracking-widest text-muted hover:text-accent transition-colors duration-200 focus:outline-none focus-visible:outline-accent focus-visible:outline-2 focus-visible:outline-offset-2 rounded-xs"
          >
            <span>View All Projects</span>
            <span
              aria-hidden="true"
              className={`transition-transform duration-200 ${
                prefersReducedMotion ? '' : 'group-hover:translate-x-1'
              }`}
            >
              →
            </span>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
