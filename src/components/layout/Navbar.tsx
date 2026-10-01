/**
 * Primary site navigation bar with scroll detection and accessible mobile menu.
 * Developers edit this component to change header layout, branding presentation,
 * or mobile overlay behaviors.
 *
 * RESPONSIVE BEHAVIOR:
 * - Mobile (360px - 767px): Displays logo + 44x44px hamburger toggle. Full-screen overlay menu with safe-area padding and landscape height support.
 * - Phone Landscape (height < 480px): Overlay menu compacts vertical gaps and enables smooth touch scrolling with safe area margins.
 * - Desktop (768px+): Hides hamburger and shows horizontal text navigation links.
 */
import { useEffect, useState, useRef, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { navigationLinks } from '@/data/navigation';
import { siteConfig } from '@/data/siteConfig';

export interface NavbarProps {
  /** Optional custom CSS class string */
  className?: string;
  /** When true, navbar begins with solid background instead of transparent */
  initialSolid?: boolean;
}

/**
 * Navigation bar with two intentional states:
 * State 1 (Top of Hero): Fully transparent with crisp white typography and white active underline.
 * State 2 (After Scrolling): Solid warm cream background (bg-bg) with dark typography and subtle 1px border.
 */
export function Navbar({ className = '', initialSolid = false }: NavbarProps) {
  // Read initial scroll position safely with a 32px threshold
  const [isScrolled, setIsScrolled] = useState(() =>
    typeof window !== 'undefined' ? window.scrollY > 32 : false,
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  // Monitor window scroll offset to switch between transparent and solid states
  useEffect(() => {
    if (initialSolid) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 32);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [initialSolid]);

  // Lock body scroll and manage focus / keyboard navigation when mobile menu is active
  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    toggleButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMobileMenu();
        return;
      }

      // Trap focus within mobile overlay dialog to prevent keyboard traps
      if (event.key === 'Tab' && mobileNavRef.current) {
        const focusable = mobileNavRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen, closeMobileMenu]);

  // When mobile menu is open, navbar always adopts solid cream with dark text
  const isSolid = isScrolled || initialSolid || isMobileMenuOpen;

  return (
    <>
      {/* 
        Fixed Navigation Header:
        - Consistent vertical padding (pt-[max(0.875rem,env(safe-area-inset-top))] pb-3.5) avoids layout jump.
        - Smooth transition of background-color and border-color (300ms ease).
        - State 1: bg-transparent, border-transparent (overlaid on hero).
        - State 2: bg-bg (warm off-white/cream), border-line (subtle 1px border, no shadow).
      */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-[background-color,border-color] duration-300 ease-in-out pt-[max(0.875rem,env(safe-area-inset-top))] pb-3.5 ${
          isSolid ? 'bg-bg border-b border-line' : 'bg-transparent border-b border-transparent'
        } ${className}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <NavLink
            to="/"
            className={`text-body font-semibold tracking-wider uppercase transition-colors duration-300 focus-visible:outline-accent focus-visible:outline-2 focus-visible:outline-offset-2 rounded-xs min-h-[44px] inline-flex items-center ${
              isSolid ? 'text-text hover:text-muted' : 'text-white hover:text-white/80'
            }`}
          >
            {siteConfig.studioName}
          </NavLink>

          {/* Desktop Navigation Links */}
          <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-8">
            {navigationLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `text-small font-medium tracking-wide transition-colors duration-300 relative min-h-[44px] inline-flex items-center py-1 focus-visible:outline-accent focus-visible:outline-2 focus-visible:outline-offset-2 rounded-xs ${
                    isActive
                      ? isSolid
                        ? 'text-text after:content-[""] after:absolute after:bottom-1 after:left-0 after:w-full after:h-px after:bg-text'
                        : 'text-white after:content-[""] after:absolute after:bottom-1 after:left-0 after:w-full after:h-px after:bg-white'
                      : isSolid
                        ? 'text-muted hover:text-text'
                        : 'text-white/75 hover:text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu Toggle Button (44x44px minimum touch target) */}
          <button
            ref={toggleButtonRef}
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className={`md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors duration-300 focus-visible:outline-accent focus-visible:outline-2 focus-visible:outline-offset-2 rounded-xs cursor-pointer ${
              isSolid ? 'text-text hover:text-muted' : 'text-white hover:text-white/80'
            }`}
          >
            <div className="w-6 h-4 flex flex-col justify-between" aria-hidden="true">
              <span
                className={`block h-0.5 w-full bg-current transition-transform duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-current transition-opacity duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-current transition-transform duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Accessible Full-screen Mobile Menu Overlay with Safe Areas */}
      {isMobileMenuOpen && (
        <div
          id="mobile-navigation"
          ref={mobileNavRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site Navigation"
          className="fixed inset-0 z-50 bg-bg text-text flex flex-col justify-between overflow-y-auto pt-[max(1.5rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] pl-[max(1.5rem,env(safe-area-inset-left))] pr-[max(1.5rem,env(safe-area-inset-right))] md:hidden"
        >
          {/* Header Row */}
          <div className="flex items-center justify-between border-b border-line pb-4">
            <span className="text-body font-semibold tracking-wider uppercase text-text">
              {siteConfig.studioName}
            </span>
            <button
              type="button"
              onClick={closeMobileMenu}
              aria-label="Close navigation menu"
              className="min-w-[44px] min-h-[44px] flex items-center justify-center text-text hover:text-muted focus-visible:outline-accent focus-visible:outline-2 focus-visible:outline-offset-2 rounded-xs cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Links with 44px touch targets */}
          <nav className="my-auto py-8">
            <ul className="space-y-4 list-none p-0 m-0">
              {navigationLinks.map((item, idx) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={closeMobileMenu}
                    className={({ isActive }) =>
                      `font-serif text-3xl sm:text-4xl min-h-[48px] flex items-center transition-colors focus-visible:outline-accent focus-visible:outline-2 focus-visible:outline-offset-2 rounded-xs ${
                        isActive ? 'text-accent' : 'text-text hover:text-muted'
                      }`
                    }
                  >
                    <span className="font-mono text-small text-muted mr-4">0{idx + 1}</span>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer Contact Metadata */}
          <div className="pt-6 border-t border-line text-small text-muted space-y-1">
            <p>{siteConfig.address}</p>
            <p>{siteConfig.email}</p>
          </div>
        </div>
      )}
    </>
  );
}
