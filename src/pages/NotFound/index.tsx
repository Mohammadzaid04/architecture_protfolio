/**
 * Architectural 404 Not Found error page component.
 * Replaces the initial placeholder with a designed editorial layout:
 * large "404" in the display serif, friendly reassurance line,
 * quick action buttons to Home and Projects, and the full studio site navigation index.
 *
 * Reused when a project slug is missing or an unknown route is accessed.
 *
 * RESPONSIVE BEHAVIOR:
 * - Fluid display typography clamps safely from 360px up to 2560px+.
 * - Action buttons and directory links maintain >= 44x44px touch targets.
 * - Solid navbar state inherited from the Layout shell.
 */
import { Link } from 'react-router-dom';
import { useDocumentHead } from '@/hooks/useDocumentHead';
import { navigationLinks } from '@/data/navigation';
import { Section } from '@/components/common/Section';
import { Container } from '@/components/common/Container';
import { Button } from '@/components/common/Button';

export function NotFound() {
  // Set document title and SEO meta description
  useDocumentHead(
    'Page Not Found',
    'The architectural record or page you requested could not be located.',
  );

  return (
    <div className="py-16 sm:py-24 md:py-32 flex flex-col items-center justify-center min-h-[70vh]">
      <Section tone="light" spacing="none" className="py-0 text-center">
        <Container className="max-w-3xl mx-auto flex flex-col items-center">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-2 text-label font-medium uppercase tracking-widest text-muted mb-4 sm:mb-6">
            <span className="font-mono text-accent">Error 404</span>
            <span className="text-line" aria-hidden="true">
              /
            </span>
            <span className="font-mono">Spatial Record Unresolved</span>
          </div>

          {/* Large "404" in Display Serif */}
          <h1 className="font-serif text-[clamp(5.5rem,16vw,11rem)] leading-none text-text font-normal tracking-tight select-none">
            404
          </h1>

          {/* Short Friendly Line */}
          <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-muted font-sans font-normal max-w-xl mx-auto leading-relaxed break-words">
            The architectural record or page you requested could not be located. It may have been
            re-cataloged, archived, or moved.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button to="/" variant="primary" size="lg">
              Return to Studio Home
            </Button>
            <Button to="/projects" variant="secondary" size="lg">
              Explore Selected Works
            </Button>
          </div>

          {/* Main Navigation Index Directory Links */}
          <div className="mt-16 sm:mt-20 pt-10 border-t border-line w-full max-w-xl">
            <span className="font-mono text-label uppercase tracking-widest text-muted block mb-4">
              Explore Studio Directory
            </span>
            <nav aria-label="Studio 404 Directory">
              <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 list-none p-0 m-0">
                {navigationLinks.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="font-mono text-small text-muted hover:text-text underline underline-offset-4 transition-colors min-h-[44px] inline-flex items-center"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </Container>
      </Section>
    </div>
  );
}

export default NotFound;
