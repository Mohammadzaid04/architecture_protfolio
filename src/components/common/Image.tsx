/**
 * Responsive Image component for high-performance architectural photography.
 * Wraps Cloudinary responsive srcset delivery with automatic aspect-ratio reservation,
 * lazy-loading, and dark skeleton background to eliminate layout shift (CLS).
 *
 * RESPONSIVE BEHAVIOR:
 * - Mobile (360px): Downloads light, compressed mobile widths (400w - 800w).
 * - Tablet & Desktop: Selects appropriate srcset candidate according to the `sizes` attribute.
 * - Ultrawide (2560px+): Serves crisp 2400w/3200w assets without pixelation.
 */
import ResponsiveImage from './ResponsiveImage';

export interface ImageProps {
  /** Cloudinary public ID or full image URL */
  publicId: string;
  /** Accessibility alternative text */
  alt: string;
  /** Aspect ratio string (e.g., '16/9', '4/3', '21/9', '1/1') */
  aspectRatio?: string;
  /** When true, positions absolutely to fill relative container */
  fill?: boolean;
  /** Set true for above-the-fold hero images (LCP) */
  priority?: boolean;
  /** Responsive sizes attribute string for browser image candidate selection */
  sizes?: string;
  /** Image object-fit ('cover' | 'contain') */
  fit?: 'cover' | 'contain';
  /** Optional custom CSS classes */
  className?: string;
}

export function Image(props: ImageProps) {
  return <ResponsiveImage {...props} />;
}

export default Image;
