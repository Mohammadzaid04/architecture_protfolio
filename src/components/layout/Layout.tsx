/**
 * Root layout shell.
 * Developers edit this component to modify persistent framing elements across routed views.
 *
 * RESPONSIVE BEHAVIOR:
 * - Fluid flex column ensuring footer sits at bottom on tall screens.
 * - Handles safe-area padding and dev-only viewport indicators.
 */
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ScrollToTop } from './ScrollToTop';
import { SkipLink } from '@/components/common/SkipLink';

export interface LayoutProps {
  /** Optional custom container CSS class */
  className?: string;
}

/**
 * Primary layout shell wrapping routed pages with SkipLink, Navbar, <main id="main-content">, and Footer.
 */
export function Layout({ className = '' }: LayoutProps) {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div
      className={`flex flex-col min-h-screen bg-bg text-text transition-colors duration-300 ${className}`}
    >
      <SkipLink targetId="main-content" />
      <ScrollToTop />
      {/* Navbar starts transparent on Home over 100svh Hero, solid on secondary pages */}
      <Navbar initialSolid={!isHomePage} />
      <main
        id="main-content"
        tabIndex={-1}
        className={`flex-1 w-full focus:outline-none ${isHomePage ? '' : 'pt-20'}`}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
