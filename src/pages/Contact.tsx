/**
 * Contact page view component.
 * Developers edit this page to customize client inquiry forms, office address presentation,
 * map display, and WhatsApp quick-action links.
 */
import { siteConfig } from '@/data/siteConfig';

export function Contact() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-light tracking-tight text-neutral-900">Contact Us</h1>
      <p className="mt-4 text-lg text-neutral-600 max-w-2xl">
        Contact page placeholder. In upcoming phases, this will include interactive inquiry forms,
        interactive location maps, and studio contact points.
      </p>

      <div className="mt-8 p-6 bg-white border border-neutral-200 space-y-2 text-sm text-neutral-700">
        <p>
          <strong>Email:</strong> {siteConfig.email}
        </p>
        <p>
          <strong>Phone:</strong> {siteConfig.phone}
        </p>
        <p>
          <strong>Address:</strong> {siteConfig.address}
        </p>
      </div>
    </section>
  );
}
