// Builds Cloudinary image URLs. Set VITE_CLOUDINARY_CLOUD_NAME in .env (add it to .env.example too).
const CLOUD_NAME =
  (import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string) || 'architecture-studio-demo';

export const IMAGE_WIDTHS = [400, 800, 1200, 1600, 2400, 3200];

/** One image URL at a given width. f_auto = best format, q_auto = best quality/size. */
export function cloudinaryUrl(publicId: string, width: number): string {
  if (!publicId) return '';
  if (/^https?:\/\//.test(publicId)) return publicId; // already a full URL, use as is
  if (publicId.startsWith('/') || publicId.startsWith('.')) return publicId; // local asset path, use as is
  const cleanId = publicId.replace(/^\/+/, '');
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto,w_${width}/${cleanId}`;
}

/** srcSet string so phones download small images and 4K screens get sharp ones. */
export function cloudinarySrcSet(publicId: string): string | undefined {
  if (
    !publicId ||
    /^https?:\/\//.test(publicId) ||
    publicId.startsWith('/') ||
    publicId.startsWith('.')
  ) {
    return undefined;
  }
  return IMAGE_WIDTHS.map((w) => `${cloudinaryUrl(publicId, w)} ${w}w`).join(', ');
}
