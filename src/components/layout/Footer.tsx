/**
 * Architectural studio footer component.
 * Developers edit this component to change footer columns, contact presentation,
 * or back-to-top behavior. Always uses the dark tone.
 *
 * RESPONSIVE BEHAVIOR:
 * - Mobile (360px - 767px): Stacks columns vertically into 1 column with generous touch spacing.
 * - Tablet & Desktop (768px+): Expands into 4-column architectural layout.
 * - Safe areas: Includes bottom safe-area padding for mobile home-bar compatibility.
 */
import { NavLink } from 'react-router-dom';
import { Section } from '@/components/common/Section';
import { Container } from '@/components/common/Container';
import { navigationLinks } from '@/data/navigation';
import { siteConfig } from '@/data/siteConfig';

export interface FooterProps {
  /** Optional custom CSS class string */
  className?: string;
}

/**
 * Semantic footer with dark architectural tone, navigation links, studio info, and back-to-top link.
 */
export function Footer({ className = '' }: FooterProps) {
  const currentYear = new Date().getFullYear();

  // Scroll smoothly to top of viewport
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Section
      tone="dark"
      spacing="spacious"
      as="footer"
      className={`border-t border-dark-line pb-[max(2rem,env(safe-area-inset-bottom))] ${className}`}
    >
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12 pb-12 sm:pb-16 border-b border-dark-line">
          {/* Column 1: Studio Identity */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-body font-semibold tracking-wider uppercase text-dark-text">
              {siteConfig.studioName}
            </h2>
            <p className="text-small text-dark-muted font-normal max-w-md leading-relaxed">
              {siteConfig.tagline}
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h3 className="text-label uppercase tracking-widest font-semibold text-dark-muted mb-4">
              Navigation
            </h3>
            <ul className="space-y-1 list-none p-0 m-0">
              {navigationLinks.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className="text-small text-dark-text hover:text-dark-accent transition-colors min-h-[44px] inline-flex items-center"
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Inquiries */}
          <div>
            <h3 className="text-label uppercase tracking-widest font-semibold text-dark-muted mb-4">
              Contact
            </h3>
            <address className="not-italic text-small text-dark-text space-y-2">
              <p>{siteConfig.address}</p>
              <p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-dark-accent transition-colors underline underline-offset-4 min-h-[44px] inline-flex items-center"
                >
                  {siteConfig.email}
                </a>
              </p>
              <p>{siteConfig.phone}</p>
            </address>
          </div>
        </div>

        {/* Footer bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-small text-dark-muted">
          <p>
            © {currentYear} {siteConfig.studioName}. All rights reserved.
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            className="cursor-pointer hover:text-dark-text transition-colors inline-flex items-center gap-2 text-small min-h-[44px] min-w-[44px] px-2"
          >
            <span>Back to top</span>
            <span aria-hidden="true">↑</span>
          </button>
        </div>
      </Container>
    </Section>
  );
}
