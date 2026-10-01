/**
 * Responsive container constraint component.
 * Developers use this component to enforce standard architectural page margins and maximum widths.
 *
 * RESPONSIVE BEHAVIOR:
 * - Mobile (360px - 639px): 16px (1rem) horizontal padding (px-4).
 * - Tablet (640px - 1023px): 24px (1.5rem) horizontal padding (sm:px-6).
 * - Desktop & Ultrawide (1024px - 2560px+): 32px (2rem) padding (lg:px-8), caps at max-w-7xl (1280px) and stays centered.
 */
import type { ElementType, ReactNode } from 'react';

export interface ContainerProps {
  /** Nested content */
  children: ReactNode;
  /** Optional custom CSS classes */
  className?: string;
  /** Semantic HTML element wrapper (default: 'div') */
  as?: ElementType;
}

/**
 * Centered responsive container with standard horizontal padding.
 */
export function Container({ children, className = '', as: Component = 'div' }: ContainerProps) {
  return (
    <Component className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </Component>
  );
}
