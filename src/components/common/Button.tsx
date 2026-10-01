/**
 * Architectural button and link component.
 * Developers use this component for all interactive calls-to-action, secondary actions,
 * and animated text links.
 *
 * RESPONSIVE BEHAVIOR:
 * - Mobile (360px - 767px): Enforces minimum 44x44px touch targets on touch devices.
 * - Tablet & Desktop (768px+): Scales padding elegantly while retaining accessible focus states.
 * - Text wrapping: Text wraps cleanly if label exceeds narrow mobile viewport width.
 */
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link-with-underline';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Size scale (applies to button-like variants) */
  size?: ButtonSize;
  /** React Router target route (renders as <Link>) */
  to?: string;
  /** External hyperlink URL (renders as native <a>) */
  href?: string;
  /** Children content */
  children: ReactNode;
  /** Optional extra classes */
  className?: string;
}

// Ensures touch targets are at least 44px in height
const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'text-small px-4 min-h-[44px]',
  md: 'text-small px-6 min-h-[44px]',
  lg: 'text-body px-8 min-h-[48px]',
};

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-text text-bg hover:opacity-85 active:opacity-95 font-medium transition-opacity rounded-none inline-flex items-center justify-center',
  secondary:
    'border border-line text-text hover:border-text active:bg-surface font-medium transition-colors rounded-none inline-flex items-center justify-center',
  ghost:
    'text-text hover:text-muted active:text-text font-medium transition-colors rounded-none inline-flex items-center justify-center',
  'link-with-underline':
    'relative text-text hover:text-accent font-medium min-h-[44px] inline-flex items-center pb-0.5 after:content-[""] after:absolute after:bottom-1 after:left-0 after:w-full after:h-px after:bg-current after:transition-transform after:duration-300 after:origin-left hover:after:scale-x-100 after:scale-x-0',
};

/**
 * Polymorphic button component supporting internal router links and external links with touch target safety.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  to,
  href,
  children,
  className = '',
  disabled,
  ...buttonProps
}: ButtonProps) {
  const isLinkVariant = variant === 'link-with-underline';
  const sizeClasses = isLinkVariant ? '' : SIZE_CLASSES[size];
  const combinedClasses = `cursor-pointer select-none font-sans text-center break-words max-w-full ${VARIANT_CLASSES[variant]} ${sizeClasses} ${
    disabled ? 'opacity-40 pointer-events-none cursor-not-allowed' : ''
  } ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combinedClasses} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <button
      type={buttonProps.type || 'button'}
      className={combinedClasses}
      disabled={disabled}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
