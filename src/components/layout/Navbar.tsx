import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { navigationLinks } from '@/data/navigation';
import Logo from './Logo';

export interface NavbarProps {
  /** Optional custom CSS class string */
  className?: string;
  /** When true, navbar begins with solid background instead of transparent */
  initialSolid?: boolean;
}

export function Navbar({ className = '' }: NavbarProps) {
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}${className ? ` ${className}` : ''}`}>
      <nav className="site-nav" aria-label="Main navigation">
        <NavLink to="/" className="brand">
          <span className="brand-logo">
            <Logo size={36} />
          </span>
          <span className="brand-text">SADIK AGARIA ARCHITECTS</span>
        </NavLink>
        <ul className="nav-links">
          {navigationLinks.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `nav-link${isActive ? ' is-active' : ''}`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
