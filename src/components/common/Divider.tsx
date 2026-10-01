/**
 * Architectural hairline divider component.
 * Developers use this component to create subtle, editorial stone-joint dividing lines
 * between sections, headers, and metadata lists.
 *
 * RESPONSIVE BEHAVIOR:
 * - Fluid full-width rule that maintains crisp 1px hairline rendering across all screen densities.
 */
import React from 'react';

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  /** Optional tonal variation (default: 'line') */
  tone?: 'default' | 'subtle' | 'strong';
  /** Optional spacing preset */
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** Optional custom CSS classes */
  className?: string;
}

const SPACING_MAP = {
  none: 'my-0',
  sm: 'my-4 sm:my-6',
  md: 'my-6 sm:my-8 md:my-10',
  lg: 'my-8 sm:my-12 md:my-16',
  xl: 'my-12 sm:my-16 md:my-24',
} as const;

const TONE_MAP = {
  default: 'border-line',
  subtle: 'border-line/50',
  strong: 'border-text/30',
} as const;

/**
 * Editorial hairline divider matching the studio design token system.
 */
export function Divider({
  tone = 'default',
  spacing = 'none',
  className = '',
  ...props
}: DividerProps) {
  return (
    <hr
      className={`border-0 border-t ${TONE_MAP[tone]} ${SPACING_MAP[spacing]} w-full ${className}`}
      {...props}
    />
  );
}
