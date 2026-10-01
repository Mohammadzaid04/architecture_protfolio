/**
 * Single-row architectural portfolio toolbar component.
 * Features category filter buttons on the left and total catalog count on the right,
 * framed by top and bottom hairline borders.
 *
 * RESPONSIVE BEHAVIOR:
 * - Mobile (< 768px): Category filter buttons scroll horizontally in a single row without visible scrollbars.
 *   Catalog count sits on a second row below with a hairline separator.
 * - Tablet & Desktop (768px+): Clean single-row layout with filters on the left and count on the right.
 * - Touch Targets: All filter buttons strictly enforce >= 44px min-height for touch accessibility.
 */
import type { ProjectCategory } from '@/types';

export interface ProjectsToolbarProps {
  /** Available filter categories list */
  categories: readonly ('All' | ProjectCategory)[];
  /** Currently active filter category */
  activeCategory: string;
  /** Callback when user selects a category */
  onSelectCategory: (category: string) => void;
  /** Number of projects currently displayed in filtered view */
  shownCount: number;
  /** Studio's total delivered project count string from data file (e.g. "150+") */
  totalProjects: string;
  /** Optional custom CSS classes */
  className?: string;
}

/**
 * Filter toolbar with category buttons and catalog count framed by hairline borders.
 */
export function ProjectsToolbar({
  categories,
  activeCategory,
  onSelectCategory,
  shownCount,
  totalProjects,
  className = '',
}: ProjectsToolbarProps) {
  return (
    <div className={`w-full border-y border-line my-8 sm:my-10 ${className}`}>
      {/* 
        Responsive Container:
        - Mobile: 2 stacked rows (horizontal scroll filters on top, count on bottom).
        - Desktop: 1 unified row (flex-row items-center justify-between).
      */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4 py-3 sm:py-3.5">
        {/* Left: Category Filters (Horizontally scrollable on mobile without wrapping) */}
        <div className="overflow-x-auto scrollbar-none -mx-4 px-4 md:mx-0 md:px-0">
          <nav
            className="flex items-center gap-1.5 sm:gap-2 min-w-max md:min-w-0"
            aria-label="Filter portfolio projects by discipline"
          >
            {categories.map((category) => {
              const isActive = activeCategory.toLowerCase() === category.toLowerCase();

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => onSelectCategory(category)}
                  aria-pressed={isActive}
                  className={`min-h-[44px] px-3.5 py-2 font-mono text-xs uppercase tracking-widest border transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                    isActive
                      ? 'border-accent text-accent font-semibold bg-accent/5'
                      : 'border-transparent text-muted hover:text-text hover:border-line bg-transparent'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right: "Showing {shown} of {totalProjects}" */}
        <div className="flex items-center justify-end pt-3 md:pt-0 border-t border-line/60 md:border-t-0 shrink-0">
          <span className="font-mono text-xs sm:text-small text-muted whitespace-nowrap">
            Showing {shownCount} of {totalProjects}
          </span>
        </div>
      </div>
    </div>
  );
}
