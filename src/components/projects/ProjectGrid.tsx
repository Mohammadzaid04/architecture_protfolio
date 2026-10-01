/**
 * Responsive grid and list container for portfolio project cards.
 * Developers edit this component to change portfolio grid layouts, list formats, or card hierarchy.
 *
 * RESPONSIVE BEHAVIOR:
 * - Mobile (360px - 767px): Single-column stack (1 col) for maximum readability and full-width touch cards.
 * - Tablet (768px - 1023px): Two-column grid (2 cols) with balanced vertical rhythm.
 * - Desktop & Ultrawide (1024px+): Three-column grid (3 cols) in standard layout, full-bleed hero in featured layout,
 *   or balanced rows in index layout (guaranteeing no empty cell in the last row for any count 1-20+).
 * - List layout: Full-width horizontal editorial rows on tablet/desktop, stacked on mobile.
 */
import { Link } from 'react-router-dom';
import type { Project } from '@/types';
import { ProjectCard } from './ProjectCard';
import ResponsiveImage from '@/components/common/ResponsiveImage';

export type ProjectGridVariant = 'standard' | 'featured' | 'list' | 'index';

export interface ProjectGridProps {
  /** Array of portfolio projects */
  projects: Project[];
  /** Layout presentation style */
  variant?: ProjectGridVariant;
  /** Optional custom CSS classes */
  className?: string;
}

/**
 * Responsive project card grid supporting standard, featured, index, and list editorial layouts.
 */
export function ProjectGrid({ projects, variant = 'standard', className = '' }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div className="py-16 text-center text-muted">
        <p>No projects available in this category.</p>
      </div>
    );
  }

  // -------------------------------------------------------------
  // LIST VARIANT: Full-width editorial rows (0 empty cells guaranteed)
  // -------------------------------------------------------------
  if (variant === 'list') {
    return (
      <div className={`divide-y divide-line border-y border-line ${className}`}>
        {projects.map((project, index) => {
          const indexStr = String(index + 1).padStart(2, '0');
          return (
            <article key={project.slug} className="group py-8 sm:py-10 transition-colors">
              <Link
                to={`/projects/${project.slug}`}
                className="flex flex-col md:flex-row md:items-center justify-between gap-6 sm:gap-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label={`View details for ${project.title}, ${project.category} in ${project.location}`}
              >
                {/* Left side: Thumbnail with slow zoom */}
                <div className="w-full md:w-64 lg:w-80 shrink-0 overflow-hidden bg-surface">
                  <div className="transition-transform duration-700 ease-out group-hover:scale-105">
                    <ResponsiveImage
                      publicId={project.cover}
                      alt={`${project.title} cover`}
                      aspectRatio="16/10"
                      sizes="(min-width: 768px) 320px, 100vw"
                    />
                  </div>
                </div>

                {/* Middle: Index number, title, overview & specs */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-label text-muted">{indexStr}</span>
                    <span className="text-label uppercase tracking-widest text-accent font-mono">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-text mt-2 group-hover:text-accent transition-colors break-words [overflow-wrap:anywhere]">
                    {project.title}
                  </h3>

                  <p className="text-body text-muted mt-2 line-clamp-2 max-w-2xl font-sans">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-small text-muted mt-3 font-mono">
                    <span>{project.location}</span>
                    <span>•</span>
                    <span>{project.year}</span>
                    <span>•</span>
                    <span>{project.area}</span>
                  </div>
                </div>

                {/* Right side: Directional arrow indicator */}
                <div className="hidden lg:flex items-center justify-center w-12 h-12 rounded-full border border-line text-muted group-hover:text-text group-hover:border-text group-hover:translate-x-1 transition-all shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>
              </Link>
            </article>
          );
        })}
      </div>
    );
  }

  // -------------------------------------------------------------
  // FEATURED VARIANT: Home page hero card + secondary grid
  // -------------------------------------------------------------
  if (variant === 'featured' && projects.length > 1) {
    const [featured, ...remaining] = projects;
    return (
      <div className={`space-y-8 sm:space-y-12 ${className}`}>
        {/* Prominent Featured Hero Card */}
        <div className="w-full">
          <ProjectCard project={featured} aspectRatio="16/9" priority={true} />
        </div>

        {/* Secondary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {remaining.map((project) => (
            <ProjectCard key={project.slug} project={project} aspectRatio="4/3" />
          ))}
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // INDEX VARIANT: Balanced grid that never leaves an empty cell in the last row
  // -------------------------------------------------------------
  if (variant === 'index') {
    const count = projects.length;

    // For 1 item: large centered card
    if (count === 1) {
      return (
        <div className={`max-w-3xl mx-auto ${className}`}>
          <ProjectCard project={projects[0]} aspectRatio="16/9" priority={true} />
        </div>
      );
    }

    // For 2 or 4 items: exactly 2 equal columns on tablet and desktop (never leaves an empty cell!)
    if (count === 2 || count === 4) {
      return (
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 ${className}`}>
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} priority={index === 0} />
          ))}
        </div>
      );
    }

    // For 5 items: first item is wide (span 2), remaining 4 form two 2-col rows (or 1 wide + 2 + 2)
    if (count === 5) {
      const [first, ...rest] = projects;
      return (
        <div className={`space-y-8 md:space-y-10 ${className}`}>
          <div className="w-full">
            <ProjectCard project={first} aspectRatio="16/9" priority={true} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {rest.map((project) => (
              <ProjectCard key={project.slug} project={project} aspectRatio="4/3" />
            ))}
          </div>
        </div>
      );
    }

    // For multiples of 3 (3, 6, 9...) or counts >= 6: standard 3-column grid
    return (
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 ${className}`}
      >
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} priority={index < 2} />
        ))}
      </div>
    );
  }

  // -------------------------------------------------------------
  // STANDARD VARIANT: 1 col mobile, 2 col tablet, 3 col desktop
  // -------------------------------------------------------------
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 ${className}`}>
      {projects.map((project, index) => (
        <ProjectCard key={project.slug} project={project} priority={index === 0} />
      ))}
    </div>
  );
}
