/**
 * Keyboard accessibility skip navigation link.
 * Developers include this component at the top of Layout so keyboard users can bypass the navbar.
 *
 * RESPONSIVE BEHAVIOR:
 * - Visually hidden until focused via Tab key.
 * - When focused: 44px minimum touch target positioned at top-left with high z-index.
 */
export interface SkipLinkProps {
  /** Target element ID (default: "main-content") */
  targetId?: string;
}

/**
 * Visually hidden link that becomes visible when focused by Tab key.
 */
export function SkipLink({ targetId = 'main-content' }: SkipLinkProps) {
  return (
    <a
      href={`#${targetId}`}
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-3 focus:min-h-[44px] focus:inline-flex focus:items-center focus:bg-accent focus:text-bg focus:font-medium focus:text-small focus:shadow-lg focus:outline-none"
    >
      Skip to main content
    </a>
  );
}
