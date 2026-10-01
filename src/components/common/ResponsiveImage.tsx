import { useState } from 'react';
import { cloudinarySrcSet, cloudinaryUrl } from '../../utils/cloudinary';

interface ResponsiveImageProps {
  /** Cloudinary public ID (or a full image URL) */
  publicId?: string;
  /** Required for accessibility and SEO */
  alt: string;
  /** Reserves space so the page does not jump while loading, e.g. "16/9", "4/3", "1/1", "3/4". Ignored when `fill` is true. */
  aspectRatio?: string;
  /** true = fills its parent completely (parent must be `relative` with its own height), used for hero/backgrounds */
  fill?: boolean;
  /** true for the first image on the page (hero): loads immediately, high priority */
  priority?: boolean;
  /** Tells the browser how wide the image is displayed, so it picks the right file size */
  sizes?: string;
  /** "cover" crops to fill (photos), "contain" shows whole image (logos) */
  fit?: 'cover' | 'contain';
  className?: string;
}

/**
 * The one image component for the whole site.
 * - No layout jump (space is reserved)
 * - Sharp on every screen (srcSet), light on phones
 * - Dark placeholder color shows while loading or if the image fails (never a broken-image icon)
 */
export default function ResponsiveImage({
  publicId = '',
  alt,
  aspectRatio,
  fill = false,
  priority = false,
  sizes = '100vw',
  fit = 'cover',
  className = '',
}: ResponsiveImageProps) {
  const [failed, setFailed] = useState(false);

  const wrapperClass = fill ? 'absolute inset-0 h-full w-full' : 'relative w-full';

  return (
    <div
      className={`${wrapperClass} overflow-hidden bg-[#0d0d0d] ${className}`}
      style={!fill && aspectRatio ? { aspectRatio } : undefined}
    >
      {Boolean(publicId) && !failed && (
        <img
          src={cloudinaryUrl(publicId, 1600)}
          srcSet={cloudinarySrcSet(publicId)}
          sizes={sizes}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full ${fit === 'contain' ? 'object-contain' : 'object-cover'}`}
        />
      )}
    </div>
  );
}
