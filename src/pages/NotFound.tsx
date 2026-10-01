/**
 * 404 Not Found error page component.
 * Developers edit this page to style the missing page fallback and provide helpful recovery links.
 */
import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <section className="py-32 px-6 max-w-3xl mx-auto text-center">
      <span className="text-sm font-semibold tracking-widest uppercase text-neutral-500">
        Error 404
      </span>
      <h1 className="text-5xl font-light tracking-tight text-neutral-900 mt-2">Page Not Found</h1>
      <p className="mt-4 text-neutral-600">
        The architectural record or page you requested could not be located.
      </p>
      <div className="mt-8">
        <Link
          to="/"
          className="inline-block px-6 py-3 text-sm font-medium bg-neutral-900 text-white hover:bg-neutral-800 transition-colors"
        >
          Return to Studio Home
        </Link>
      </div>
    </section>
  );
}
