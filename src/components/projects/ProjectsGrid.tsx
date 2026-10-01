/**
 * Curated editorial portfolio project grid component.
 * Displays filtered project cards with a prominent flagship card (for 3+ projects),
 * single-column proportional layout for 1-2 projects, and stable vertical container min-height.
 *
 * RESPONSIVE BEHAVIOR:
 * - Mobile (< 768px): 1 column stack with uniform aspect ratios.
 * - Tablet (768px - 1023px): 2 columns. If 3+ projects exist, the first card spans across both columns.
 * - Desktop (1024px+): 3 columns.
 *   - 3+ projects: Flagship card spans 2 columns (16:10). Remaining cards (4:3) alternate with a 2.5rem top offset.
 *   - 1-2 projects: Uniform single-column-width cards (4:3), left-aligned, preventing stretched cards or unnatural gaps.
 * - Stability: Preserves container minimum height (min-h-[60vh] on desktop) to prevent abrupt layout shifts on filter changes.
 */
import type { Project } from '@/types';
import { ProjectCard } from './ProjectCard';
import { Button } from '@/components/common/Button';

export interface ProjectsGridProps {
  /** Filtered list of projects to render */
  projects: Project[];
  /** Callback to reset active filter if empty */
  onResetFilter?: () => void;
  /** Empty state message from data file */
  emptyMessage?: string;
  /** Reset button text from data file */
  resetLabel?: string;
  /** Optional custom CSS classes */
  className?: string;
}

/**
 * Editorial portfolio grid with dynamic flagship hierarchy and min-height stability.
 */
export function ProjectsGrid({
  projects,
  onResetFilter,
  emptyMessage = 'No projects in this category yet.',
  resetLabel = 'Reset to All Works',
  className = '',
}: ProjectsGridProps) {
  // Empty State Fallback when category filter yields zero items
  if (projects.length === 0) {
    return (
      <div
        className={`py-16 sm:py-24 text-left max-w-2xl min-h-[40vh] sm:min-h-[50vh] lg:min-h-[60vh] flex flex-col justify-start ${className}`}
      >
        <p className="text-body text-muted font-sans font-normal leading-relaxed break-words">
          {emptyMessage}
        </p>
        {onResetFilter && (
          <div className="mt-6">
            <Button variant="secondary" onClick={onResetFilter}>
              {resetLabel}
            </Button>
          </div>
        )}
      </div>
    );
  }

  // Flagship layout rule: first card spans 2 columns only when 3 or more projects exist
  const hasFlagship = projects.length >= 3;

  return (
    <div
      className={`min-h-[40vh] sm:min-h-[50vh] lg:min-h-[60vh] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-x-12 lg:gap-y-16 items-start ${className}`}
    >
      {projects.map((project, index) => {
        const isFlagship = hasFlagship && index === 0;

        // Column span: 2 cols on tablet/desktop only for flagship with 3+ items; otherwise 1 col
        const colSpanClass = isFlagship
          ? 'md:col-span-2 lg:col-span-2'
          : 'col-span-1 md:col-span-1 lg:col-span-1';

        // Stagger offset: applies alternate 2.5rem (mt-10) only on 3+ items with flagship
        const staggerOffsetClass =
          hasFlagship && !isFlagship && index % 2 === 1 ? 'lg:mt-10' : 'lg:mt-0';

        // Aspect ratio: flagship uses 16/10; all standard cards use 4/3
        const cardAspectRatio = isFlagship ? '16/10' : '4/3';

        return (
          <div key={project.id || project.slug} className={`${colSpanClass} ${staggerOffsetClass}`}>
            <ProjectCard
              project={project}
              priority={index === 0}
              isFlagship={isFlagship}
              aspectRatio={cardAspectRatio}
              index={index}
            />
          </div>
        );
      })}
    </div>
  );
}
