/**
 * Shared editorial page header component for secondary pages (About, Careers, Contact).
 * Renders a standardized eyebrow with index sequence number, large display H1 title,
 * short introductory narrative, and an optional Cloudinary image.
 *
 * RESPONSIVE BEHAVIOR:
 * - Mobile (360px - 639px): Stacked single-column layout. Headings clamp fluidly to avoid overflow.
 * - Tablet (640px - 1023px): Proportional spacing with comfortable reading margins.
 * - Desktop (1024px+): Generous editorial spacing; image scales to container width with fixed aspect ratio.
 */
import Image from './Image';

export interface PageHeaderProps {
  /** Eyebrow with sequence number and section label (e.g., { number: "03", label: "About" }) */
  eyebrow: {
    number: string;
    label: string;
  };
  /** Primary H1 display title */
  title: string;
  /** Short editorial narrative intro paragraph */
  intro?: string;
  /** Optional Cloudinary studio photograph */
  image?: {
    publicId: string;
    alt: string;
    aspectRatio?: string;
    priority?: boolean;
    sizes?: string;
  };
  /** Optional custom CSS classes */
  className?: string;
}

/**
 * Shared page header with standardized editorial eyebrow, H1, intro, and optional eager image.
 */
export function PageHeader({ eyebrow, title, intro, image, className = '' }: PageHeaderProps) {
  return (
    <header className={`w-full ${className}`}>
      {/* 1. Eyebrow Sequence & Label */}
      <div className="flex items-center gap-2 sm:gap-3 text-label font-medium uppercase tracking-widest text-muted mb-4 sm:mb-5">
        <span className="font-mono text-accent">{eyebrow.number}</span>
        <span className="text-line" aria-hidden="true">
          /
        </span>
        <span className="font-mono">{eyebrow.label}</span>
      </div>

      {/* 2. Primary H1 Display Title */}
      <h1 className="font-serif text-display-lg sm:text-display-xl font-normal leading-[1.05] tracking-tight text-text break-words [overflow-wrap:anywhere] max-w-4xl">
        {title}
      </h1>

      {/* 3. Editorial Intro Narrative */}
      {intro && (
        <p className="mt-5 sm:mt-6 text-body sm:text-lg text-muted font-sans font-normal leading-relaxed max-w-3xl break-words">
          {intro}
        </p>
      )}

      {/* 4. Optional Cloudinary Photography (Eager or Lazy with Fixed Aspect Ratio) */}
      {image && (
        <div className="mt-8 sm:mt-12 md:mt-16 overflow-hidden bg-surface border border-line">
          <Image
            publicId={image.publicId}
            alt={image.alt}
            aspectRatio={image.aspectRatio ?? '21/9'}
            priority={image.priority ?? false}
            sizes={image.sizes ?? '(min-width: 1280px) 1216px, (min-width: 768px) 95vw, 100vw'}
            className="w-full"
          />
        </div>
      )}
    </header>
  );
}

export default PageHeader;
