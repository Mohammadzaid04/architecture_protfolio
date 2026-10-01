/**
 * Architectural section heading component.
 * Developers use this component to render numbered editorial section titles with hairline lines.
 *
 * RESPONSIVE BEHAVIOR:
 * - Mobile (360px - 639px): Display title fluidly clamps with word-break safety to prevent overflow on narrow screens.
 * - Tablet (640px - 1023px): Index and eyebrow flex horizontally without line collision.
 * - Desktop (1024px+): Large editorial display scale with generous spacing.
 */
export interface SectionHeadingProps {
  /** Primary headline text */
  title: string;
  /** Optional index number (e.g., "01" or "02") */
  index?: string;
  /** Optional uppercase eyebrow label (e.g., "Selected Work") */
  eyebrow?: string;
  /** Optional narrative paragraph description */
  description?: string;
  /** Horizontal alignment */
  alignment?: 'left' | 'center';
  /** Optional custom CSS classes */
  className?: string;
}

/**
 * Editorial section heading with hairline divider and large display typography.
 */
export function SectionHeading({
  title,
  index,
  eyebrow,
  description,
  alignment = 'left',
  className = '',
}: SectionHeadingProps) {
  const isCentered = alignment === 'center';

  return (
    <header className={`w-full border-t border-line pt-6 mb-10 sm:mb-12 md:mb-16 ${className}`}>
      {/* Eyebrow and index line */}
      {(index || eyebrow) && (
        <div
          className={`flex flex-wrap items-center gap-2 sm:gap-3 text-label font-medium uppercase tracking-widest text-muted mb-3 sm:mb-4 ${
            isCentered ? 'justify-center' : 'justify-start'
          }`}
        >
          {index && <span className="font-mono text-accent">{index}</span>}
          {index && eyebrow && (
            <span className="text-line" aria-hidden="true">
              /
            </span>
          )}
          {eyebrow && <span>{eyebrow}</span>}
        </div>
      )}

      {/* Oversized display headline with break-words to ensure narrow mobile safety */}
      <h2
        className={`font-serif text-display-lg leading-[1.05] tracking-tight text-text break-words [overflow-wrap:anywhere] ${
          isCentered ? 'text-center mx-auto' : 'text-left'
        }`}
      >
        {title}
      </h2>

      {/* Optional explanatory narrative */}
      {description && (
        <p
          className={`mt-4 sm:mt-5 text-body text-muted font-sans font-normal leading-relaxed max-w-2xl break-words ${
            isCentered ? 'text-center mx-auto' : 'text-left'
          }`}
        >
          {description}
        </p>
      )}
    </header>
  );
}
