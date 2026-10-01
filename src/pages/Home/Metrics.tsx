/**
 * Homepage Studio Metrics section with viewport-triggered count-up animation.
 * Developers edit metrics data in `src/data/metrics.ts`.
 *
 * RESPONSIVE BEHAVIOR:
 * - Desktop (lg+): 4 equal columns aligned to the philosophy 12-column grid tracks.
 * - Tablet & Mobile: 2 x 2 grid with comfortable row and column gaps.
 * - Numbers scale fluidly with clamp() to prevent horizontal blowout at 360px.
 */
import { useEffect, useRef, useState } from 'react';
import { metricsData, type MetricItem } from '@/data/metrics';

/**
 * Animation duration and timing constants for studio metrics.
 * Configured for a calm, editorial, and premium pacing.
 */
/** Total duration for the metric count-up animation in milliseconds (2500-3000ms range) */
const COUNT_DURATION_MS = 2800;

/** Small start delay (ms) after section becomes visible before counting begins (150-300ms range) */
const COUNT_START_DELAY_MS = 250;

/** Sequential stagger delay (ms) between each metric item (150-250ms range) */
const METRIC_STAGGER_DELAY_MS = 180;

/** Duration for the top divider line horizontal draw animation (1000-1200ms range) */
const DIVIDER_DURATION_MS = 1100;

/** Duration for fade/translate entrance of numbers and labels (900-1200ms range) */
const ENTRANCE_DURATION_MS = 1000;

/** Soft architectural ease-out curve */
const EASING_SOFT_OUT = 'cubic-bezier(0.22, 1, 0.36, 1)';

interface MetricCounterItemProps {
  item: MetricItem;
  index: number;
  hasEntered: boolean;
  prefersReducedMotion: boolean;
}

/**
 * Individual metric counter component:
 * - Performs easeOutQuart count-up using requestAnimationFrame with stagger delay.
 * - Reserves exact final width to eliminate layout shift/jitter during counting.
 * - Renders a visually hidden final value for immediate screen reader accessibility.
 * - Supports keyboard focus and an architectural accent line draw on hover/focus.
 */
function MetricCounterItem({
  item,
  index,
  hasEntered,
  prefersReducedMotion,
}: MetricCounterItemProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // If not visible yet or user prefers reduced motion, skip RAF count-up
    if (!hasEntered || prefersReducedMotion) return;

    let startTime: number | null = null;
    let rafId: number;
    // Start count after entrance establishes + sequential stagger per metric
    const totalDelay = COUNT_START_DELAY_MS + index * METRIC_STAGGER_DELAY_MS;

    const step = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }
      const elapsed = timestamp - startTime;

      if (elapsed < totalDelay) {
        rafId = requestAnimationFrame(step);
        return;
      }

      const countElapsed = elapsed - totalDelay;
      const progress = Math.min(1, countElapsed / COUNT_DURATION_MS);
      // easeOutQuart: 1 - (1 - t)^4 for a gentle, luxurious slow-down on the final number
      const easedProgress = 1 - Math.pow(1 - progress, 4);
      const current = Math.round(easedProgress * item.value);

      setCount(current);

      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    };

    rafId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [hasEntered, item.value, index, prefersReducedMotion]);

  // Entrance animation delays for subtle staggered appearance
  const baseDelay = 150 + index * METRIC_STAGGER_DELAY_MS;
  const indexDelay = prefersReducedMotion ? '0ms' : `${baseDelay}ms`;
  const numberDelay = prefersReducedMotion ? '0ms' : `${baseDelay + 50}ms`;
  const labelDelay = prefersReducedMotion ? '0ms' : `${baseDelay + 120}ms`;

  const displayCount = prefersReducedMotion ? item.value : count;

  return (
    <div
      tabIndex={0}
      aria-label={`${item.value}${item.suffix} ${item.label}`}
      className="group relative flex flex-col justify-start pb-4 focus-visible:outline-accent focus-visible:outline-2 focus-visible:outline-offset-4 rounded-xs cursor-default col-span-1 lg:col-span-3"
    >
      {/* 1. Immediate Screen Reader Text with Final Values */}
      <span className="sr-only">
        {item.value}
        {item.suffix} {item.label}
      </span>

      {/* 2. Visual Metric Presentation */}
      <div aria-hidden="true" className="flex flex-col">
        {/* Tiny Mono Index Label (01, 02, 03, 04) */}
        <span
          style={
            prefersReducedMotion
              ? undefined
              : {
                  transitionDelay: indexDelay,
                  transitionDuration: `${ENTRANCE_DURATION_MS}ms`,
                  transitionTimingFunction: EASING_SOFT_OUT,
                }
          }
          className={`font-mono text-label uppercase tracking-widest text-muted/70 select-none block mb-2 sm:mb-3 transition-opacity ${
            hasEntered || prefersReducedMotion ? 'opacity-100' : 'opacity-0'
          }`}
        >
          0{index + 1}
        </span>

        {/* Number with Jitter-Free Phantom Width Reservation */}
        <div
          style={
            prefersReducedMotion
              ? undefined
              : {
                  transitionDelay: numberDelay,
                  transitionDuration: `${ENTRANCE_DURATION_MS}ms`,
                  transitionTimingFunction: EASING_SOFT_OUT,
                }
          }
          className={`relative inline-flex items-baseline font-serif text-[clamp(2.25rem,3.2vw+1rem,3.75rem)] leading-none text-text font-normal select-none transition-all ${
            hasEntered || prefersReducedMotion
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-3'
          }`}
        >
          {/* Invisible phantom reserving the exact final width and height */}
          <span className="invisible select-none" aria-hidden="true">
            {item.value}
            {item.suffix}
          </span>

          {/* Animating visible counter with stable suffix */}
          <span className="absolute inset-0 flex items-baseline tabular-nums" aria-hidden="true">
            <span>{displayCount}</span>
            <span>{item.suffix}</span>
          </span>
        </div>

        {/* Supporting Secondary Label */}
        <div
          style={
            prefersReducedMotion
              ? undefined
              : {
                  transitionDelay: labelDelay,
                  transitionDuration: `${ENTRANCE_DURATION_MS}ms`,
                  transitionTimingFunction: EASING_SOFT_OUT,
                }
          }
          className={`mt-3 sm:mt-4 text-small sm:text-body text-muted font-sans font-medium leading-relaxed transition-all ${
            hasEntered || prefersReducedMotion
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-2'
          }`}
        >
          {item.label}
        </div>
      </div>

      {/* 3. Single Architectural Hover/Focus Accent Line Drawing from Left */}
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-px w-full bg-accent origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100 pointer-events-none"
      />
    </div>
  );
}

/**
 * Studio Metrics Grid section with drawing top divider and staggered metrics.
 */
export function Metrics() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect user operating system reduced-motion preference directly in initializer
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false,
  );

  // Viewport trigger using IntersectionObserver (runs ONCE per visit)
  const [hasEntered, setHasEntered] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false,
  );

  // Listen for reduced motion system setting changes
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  // Observe section entry once: threshold 0.25, negative bottom rootMargin so it triggers only when clearly inside viewport
  useEffect(() => {
    if (hasEntered || prefersReducedMotion) return;
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.25,
        rootMargin: '0px 0px -10% 0px',
      },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [hasEntered, prefersReducedMotion]);

  return (
    <div ref={containerRef} className="mt-20 sm:mt-24 lg:mt-28">
      {/* 
        Top Divider Line:
        - Draws left-to-right (scaleX 0 to 1, transform-origin left, 1100ms ease-out).
        - Thin (1px), subtle line color matching site container.
      */}
      <div
        aria-hidden="true"
        style={
          prefersReducedMotion
            ? undefined
            : {
                transform: hasEntered ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: 'left',
                transition: `transform ${DIVIDER_DURATION_MS}ms ${EASING_SOFT_OUT} 100ms`,
              }
        }
        className={`w-full h-px bg-line ${prefersReducedMotion ? 'scale-x-100' : ''}`}
      />

      {/* 
        Metrics Grid:
        - Desktop (lg+): 12-column grid tracks aligning exactly with the philosophy block above.
        - Tablet & Mobile: 2 x 2 grid with comfortable gap.
        - Spacing between divider and numbers: pt-14 sm:pt-16 (~56-64px).
      */}
      <div className="pt-14 sm:pt-16 grid grid-cols-2 lg:grid-cols-12 gap-y-10 sm:gap-y-12 gap-x-6 sm:gap-x-12 lg:gap-x-16">
        {metricsData.map((item, index) => (
          <MetricCounterItem
            key={item.label}
            item={item}
            index={index}
            hasEntered={hasEntered}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </div>
    </div>
  );
}
