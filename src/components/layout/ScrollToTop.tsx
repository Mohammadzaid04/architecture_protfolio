/**
 * ScrollToTop navigation helper.
 * Developers use this component inside Router to ensure navigation always resets viewport to top.
 */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Observes pathname changes and scrolls window to top instantly.
 */
export function ScrollToTop(): null {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll instantly to top-left on route transition
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, [pathname]);

  return null;
}
