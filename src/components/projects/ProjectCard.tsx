/**
 * Architectural portfolio project card component.
 * Displays project photography with category chip overlay, title, location, and year.
 *
 * RESPONSIVE BEHAVIOR:
 * - Mobile & Tablet: Standard aspect ratio with clear, touch-accessible metadata.
 * - Desktop: Flagship card supports larger aspect ratio and col-span; alternate cards support staggered rhythm.
 * - Pointer Hover: Slow 700ms 1.05x image zoom, title accent highlight, and sliding arrow indicator.
 *   Hover effects are restricted to pointer devices so they never trigger clumsily on touch taps.
 * - Motion: Smooth scroll fade-up entrance via IntersectionObserver with staggered index delays.
 *   Completely disabled when prefers-reduced-motion is requested.
 * - Image Resilience: Gracefully falls back to a neutral cream placeholder block of identical aspect ratio
 *   if an image fails to load or is not provided.
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '@/types';
import { cloudinaryUrl, cloudinarySrcSet } from '@/utils/cloudinary';
import { useInView } from '@/hooks/useInView';

export interface ProjectCardProps {
  /** Project data item */
  project: Project;
  /** Whether the image should load eagerly */
  priority?: boolean;
  /** Custom aspect ratio string (e.g. '16/10', '4/3') */
  aspectRatio?: string;
  /** Flag indicating whether this is the prominent flagship card */
  isFlagship?: boolean;
  /** Zero-based index for scroll animation staggering */
  index?: number;
  /** Optional custom CSS class string */
  className?: string;
}

/**
 * Editorial project card with graceful image fallback and touch-safe interaction states.
 */
export function ProjectCard({
  project,
  priority = false,
  aspectRatio = '4/3',
  isFlagship = false,
  index = 0,
  className = '',
}: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);

  // Viewport detection hook for subtle scroll-driven fade-up
  const { ref, inView } = useInView<HTMLDivElement>({
    triggerOnce: true,
    rootMargin: '60px',
  });

  // Backward compatibility between `title` and `name`, `cover` and `image`
  const projectName = project.name || project.title;
  const imageSource = project.image || project.cover;

  // Stagger entrance delay based on card position (100ms per card, modulo 6)
  const staggerDelay = (index % 6) * 100;

  // Accessible descriptive alt text
  const altText = `${projectName} - ${project.category} Architecture in ${project.location}`;

  // Target route link for project detail
  // TODO: Link structure ready for /projects/:slug route
  const projectHref = `/projects/${project.slug}`;

  return (
    <article
      ref={ref}
      style={{
        transitionDelay: inView ? `${staggerDelay}ms` : '0ms',
      }}
      className={`group block transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none motion-reduce:transform-none ${
        inView
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-6 motion-reduce:opacity-100 motion-reduce:translate-y-0'
      } ${className}`}
    >
      <Link
        to={projectHref}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        aria-label={`View details for ${projectName}, ${project.category} architecture in ${project.location}`}
      >
        {/* Cover Image Container with slow hover zoom (desktop pointer only) */}
        <div
          className="relative w-full overflow-hidden bg-surface border border-line/40"
          style={{ aspectRatio }}
        >
          {imageSource && !imageError ? (
            <div className="w-full h-full transform transition-transform duration-700 ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-105">
              <img
                src={cloudinaryUrl(imageSource, isFlagship ? 2400 : 1200)}
                srcSet={cloudinarySrcSet(imageSource)}
                sizes={
                  isFlagship
                    ? '(min-width: 1024px) 66vw, 100vw'
                    : '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw'
                }
                alt={altText}
                loading={priority ? 'eager' : 'lazy'}
                decoding="async"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            /* Neutral Cream Placeholder fallback block (maintains layout without shift) */
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-surface select-none">
              <span className="font-serif italic text-3xl text-muted/40 font-normal">
                {projectName[0]}
              </span>
              <span className="font-mono text-label uppercase tracking-widest text-muted/50 mt-2">
                Curated Archive
              </span>
            </div>
          )}

          {/* Monospace Category Chip (Top-left of photography) */}
          <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-10 pointer-events-none">
            <span className="text-label uppercase tracking-widest font-mono bg-bg/85 backdrop-blur-xs text-text px-2.5 py-1 border border-line/40">
              {project.category}
            </span>
          </div>
        </div>

        {/* Project Metadata Caption */}
        <div className="pt-3.5 sm:pt-4 border-t border-line mt-3 transition-colors duration-300 [@media(hover:hover)_and_(pointer:fine)]:group-hover:border-text">
          <div className="flex items-baseline justify-between gap-4">
            {/* Project Name with sliding arrow on hover */}
            <h3 className="font-serif text-2xl sm:text-3xl text-text font-normal transition-colors [@media(hover:hover)_and_(pointer:fine)]:group-hover:text-accent break-words [overflow-wrap:anywhere] flex items-center gap-2">
              <span>{projectName}</span>
              <span
                className="inline-block opacity-0 -translate-x-2 transition-all duration-300 ease-out font-sans text-lg text-accent [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100 [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-0"
                aria-hidden="true"
              >
                →
              </span>
            </h3>

            {/* Optional Area Metric if provided */}
            {project.area && (
              <span className="hidden sm:inline font-mono text-xs text-muted/70 shrink-0">
                {project.area}
              </span>
            )}
          </div>

          {/* Location · Year metadata line */}
          <p className="font-mono text-small text-muted mt-1.5 break-words">
            {project.location} · {project.year}
          </p>
        </div>
      </Link>
    </article>
  );
}
