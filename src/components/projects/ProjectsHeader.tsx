/**
 * Projects page hero header component.
 * Displays the page eyebrow, primary H1 headline, editorial curated intro paragraph,
 * and a 3-metric studio practice statistics strip.
 *
 * RESPONSIVE BEHAVIOR:
 * - Mobile & Tablet (< 1024px): Single column stacked layout. The stats strip appears below the intro in 3 columns.
 * - Desktop (1024px+): 12-column grid. Left 7 columns hold the eyebrow, H1, and intro narrative.
 *   Right 5 columns hold the stats strip aligned cleanly to the bottom with a hairline top border.
 */
import type { ProjectStat } from '@/data/projectsPageContent';

export interface ProjectsHeaderProps {
  /** Eyebrow section index and label */
  eyebrow: {
    number: string;
    label: string;
  };
  /** Primary H1 headline text */
  title: string;
  /** Curated narrative intro paragraph */
  intro: string;
  /** Studio milestone stats strip items */
  stats: ProjectStat[];
  /** Optional custom CSS classes */
  className?: string;
}

/**
 * Editorial header for the curated portfolio highlights page.
 */
export function ProjectsHeader({
  eyebrow,
  title,
  intro,
  stats,
  className = '',
}: ProjectsHeaderProps) {
  return (
    <header className={`w-full ${className}`}>
      {/* 12-Column Responsive Grid Layout on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
        {/* Left Column (7 cols on lg): Eyebrow, H1, and Intro */}
        <div className="lg:col-span-7">
          {/* Eyebrow Label */}
          <div className="flex items-center gap-2 text-label font-medium uppercase tracking-widest text-muted mb-3 sm:mb-4">
            <span className="font-mono text-accent">{eyebrow.number}</span>
            <span className="text-line" aria-hidden="true">
              /
            </span>
            <span className="font-mono">{eyebrow.label}</span>
          </div>

          {/* Primary Page Headline */}
          <h1 className="font-serif text-display-lg sm:text-display-xl font-normal leading-[1.05] tracking-tight text-text break-words [overflow-wrap:anywhere]">
            {title}
          </h1>

          {/* Editorial Curated Highlights Narrative */}
          <p className="mt-4 sm:mt-5 text-body text-muted font-sans font-normal leading-relaxed max-w-2xl break-words">
            {intro}
          </p>
        </div>

        {/* Right Column (5 cols on lg): Stats Strip aligned to bottom with thin top border */}
        <div className="lg:col-span-5 flex flex-col justify-end w-full">
          <div className="border-t border-line pt-6 sm:pt-8 grid grid-cols-3 gap-4 sm:gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="min-w-0">
                <div className="font-serif text-3xl sm:text-4xl text-text font-normal leading-none tracking-tight">
                  {stat.value}
                </div>
                <div className="font-mono text-label uppercase tracking-widest text-muted mt-2 break-words">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
