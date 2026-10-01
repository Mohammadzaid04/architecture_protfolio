/**
 * Client-side SEO and document head metadata utility.
 * Developers call this function on page mounts to update document title and description.
 */

/**
 * Updates document title and meta description tag dynamically.
 *
 * @param title - The page title (will be suffixed with studio name)
 * @param description - Optional meta description content
 */
export function setDocumentMeta(title: string, description?: string, suffix?: string): void {
  const brandSuffix = suffix ?? 'Atelier Architecture';
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
