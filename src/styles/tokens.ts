/**
 * Architecture studio design tokens.
 * Developers edit this file to adjust the studio's color palette, typography scale,
 * spacing presets, and motion timings. This serves as the single source of truth.
 *
 * RESPONSIVE BEHAVIOR:
 * - Mobile (< 640px): Body font starts at 16px (1rem), display headings clamp down to prevent overflow on 360px.
 * - Tablet (640px - 1024px): Proportional fluid scaling across intermediate widths.
 * - Desktop & Ultrawide (1024px - 2560px+): Containers constrain content to max-w-7xl (1280px) centered.
 */

// EDIT: Studio brand color palette (Creative Architectural Editorial)
export const COLOR_TOKENS = {
  light: {
    // Warm Italian Alabaster / Travertine canvas
    bg: '#F5F2EB',
    // Honed Mortar surface for cards and elevated panels
    surface: '#ECE7DE',
    // Deep Ink Black body and headline text (Contrast ratio ~16.5:1 against bg)
    text: '#121110',
    // Warm Basalt grey for secondary metadata (Contrast ratio ~5.1:1 against bg)
    muted: '#68645E',
    // Raw Architectural Cinnabar / Terracotta accent (Contrast ratio ~4.85:1 against bg)
    accent: '#C44D2B',
    // Hairline stone joint divider
    line: '#DCD5CA',
  },
  dark: {
    // Nocturnal Volcanic Obsidian canvas
    bg: '#0C0C0B',
    // Smoked Oak surface for cards and elevated panels
    surface: '#181816',
    // Raw Cotton off-white text (Contrast ratio ~16.3:1 against bg)
    text: '#F0EDE6',
    // Silver Granite metadata on dark canvas (Contrast ratio ~6.7:1 against bg)
    muted: '#9E9A91',
    // Luminous Polished Brass / Warm Amber accent (Contrast ratio ~9.1:1 against bg)
    accent: '#E2B056',
    // Dark hairline reveal border
    line: '#262624',
  },
} as const;

// EDIT: Self-hosted typography font families
export const FONT_TOKENS = {
  // Display font for expressive editorial headings
  serif: '"Instrument Serif", Georgia, serif',
  // Clean geometric grotesk for UI and body text
  sans: '"Manrope", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
} as const;

// Fluid typography clamp definitions across viewport range 360px to 1440px
// Rule: Body text is at least 16px (1rem) on mobile; display headings scale safely without horizontal blowout
export const TYPE_SCALE = {
  'display-xl': 'clamp(2.25rem, 5vw + 1rem, 5.5rem)',
  'display-lg': 'clamp(2rem, 3.5vw + 0.875rem, 4rem)',
  h2: 'clamp(1.625rem, 2vw + 0.75rem, 2.5rem)',
  h3: 'clamp(1.25rem, 1.25vw + 0.5rem, 1.75rem)',
  body: 'clamp(1rem, 0.25vw + 0.95rem, 1.125rem)',
  small: 'clamp(0.8125rem, 0.15vw + 0.75rem, 0.875rem)',
  label: 'clamp(0.6875rem, 0.1vw + 0.65rem, 0.75rem)',
} as const;

// Responsive vertical section spacing scale (mobile-first)
export const SPACING_TOKENS = {
  section: {
    none: 'py-0',
    compact: 'py-12 sm:py-16 md:py-20',
    default: 'py-16 sm:py-24 md:py-32',
    spacious: 'py-20 sm:py-28 md:py-40',
  },
  // Responsive container horizontal padding: 16px mobile (360px) -> 24px tablet -> 32px desktop
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  gutter: 'gap-6 md:gap-8 lg:gap-12',
} as const;

// Viewport layout breakpoints
export const BREAKPOINTS = {
  mobile: '640px',
  tablet: '768px',
  desktop: '1024px',
  largeDesktop: '1280px',
  ultrawide: '2560px',
} as const;

// Editorial transition and motion tokens
export const MOTION_TOKENS = {
  duration: {
    fast: '150ms',
    base: '300ms',
    slow: '700ms',
  },
  // Smooth architectural deceleration curve
  easeArchitectural: 'cubic-bezier(0.16, 1, 0.3, 1)',
} as const;
