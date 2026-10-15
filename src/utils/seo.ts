/**
 * Client-side SEO and document head metadata utility.
 * Developers call this function on page mounts to update document title and description.
 */

import { siteConfig } from '@/data/siteConfig';

/**
 * Updates document title and meta description tag dynamically.
 *
 * @param title - The page title (will be suffixed with studio name)
 * @param description - Optional meta description content
 */
export function setDocumentMeta(title: string, description?: string, suffix?: string): void {
  const brandSuffix = suffix ?? siteConfig.studioName;
  document.title = title ? `${title} | ${brandSuffix}` : brandSuffix;

  if (description) {
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);
  }
}
