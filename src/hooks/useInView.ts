/**
 * Intersection Observer viewport detection hook.
 * Developers use this hook to trigger lazy mounting or scroll-driven state changes.
 */
import { useEffect, useState, useRef, type RefObject } from 'react';

export interface UseInViewOptions {
  /** Margin around the root element (e.g. '200px' to trigger before entering view) */
  rootMargin?: string;
  /** Visibility ratio required to trigger (0 to 1) */
  threshold?: number | number[];
  /** When true, stays inView permanently once triggered */
  triggerOnce?: boolean;
}

export interface UseInViewReturn<T extends HTMLElement> {
  /** DOM element ref to attach to container */
  ref: RefObject<T | null>;
  /** Whether the element is currently within the observed viewport region */
  inView: boolean;
}

/**
 * Tracks whether a target DOM element is visible within the viewport or specified rootMargin.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>({
  rootMargin = '200px',
  threshold = 0,
  triggerOnce = false,
}: UseInViewOptions = {}): UseInViewReturn<T> {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === 'undefined') {
      // Fallback for environments lacking IntersectionObserver
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setInView(false);
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin, threshold, triggerOnce]);

  return { ref, inView };
}
