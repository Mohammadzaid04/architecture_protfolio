/**
 * Semantic section layout wrapper with tone switching.
 * Developers use this component to create full-width page sections that automatically
 * set the correct background, text, and border tokens for "light" or "dark" tone.
 *
 * RESPONSIVE BEHAVIOR:
 * - Mobile (360px): Vertical section padding scales down to prevent excessive whitespace on phones (py-12 / py-16 / py-20).
 * - Tablet (768px): Intermediate vertical spacing (py-16 / py-24 / py-28).
 * - Desktop & Ultrawide (1024px - 2560px+): Generous architectural spacing (py-20 / py-32 / py-40).
 */
import type { ElementType, ReactNode } from 'react';
import { SPACING_TOKENS } from '@/styles/tokens';

export type SectionTone = 'light' | 'dark';
export type SectionSpacing = keyof typeof SPACING_TOKENS.section;

export interface SectionProps {
  /** Architectural tone variant (light stone or dark charcoal) */
  tone?: SectionTone;
  /** Vertical padding density */
  spacing?: SectionSpacing;
  /** Optional anchor ID for in-page navigation */
  id?: string;
  /** Optional additional CSS classes */
  className?: string;
  /** Semantic HTML wrapper element (default: 'section') */
  as?: ElementType;
  /** Section children content */
  children: ReactNode;
}

/**
 * Page section container that enforces color tone CSS variables and vertical rhythm.
 */
export function Section({
  tone = 'light',
  spacing = 'default',
  id,
  className = '',
  as: Component = 'section',
  children,
}: SectionProps) {
  const spacingClass = SPACING_TOKENS.section[spacing];
  const toneClass = tone === 'dark' ? 'bg-dark-bg text-dark-text' : 'bg-light-bg text-light-text';

  return (
    <Component
      id={id}
      data-tone={tone}
      className={`w-full transition-colors duration-300 relative ${toneClass} ${spacingClass} ${className}`}
    >
      {children}
    </Component>
  );
}
