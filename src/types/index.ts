/**
 * Shared TypeScript type definitions for the architecture studio portfolio.
 * Developers edit this file when extending data schemas, content models, or global entity types.
 */

// EDIT: Studio project categories. Add or adjust categories to match studio practice.
export type ProjectCategory =
  'Residential' | 'Commercial' | 'Interior' | 'Institutional' | 'Landscape';

/** Architectural gallery photo item */
export interface ProjectGalleryItem {
  /** Cloudinary public ID or full URL */
  publicId: string;
  /** Accessibility alternative description */
  alt: string;
  /** Layout width hint for varied gallery composition (default: 'half') */
  layout?: 'full' | 'half' | 'wide';
  /** Optional architectural caption */
  caption?: string;
}

/** Represents an architectural portfolio project item */
export interface Project {
  /** Optional unique identifier */
  id?: string;
  /** Full title of the architectural project */
  title: string;
  /** Project display name alias */
  name?: string;
  /** URL slug used for routing (/projects/:slug) */
  slug: string;
  /** Physical location (City, Country) */
  location: string;
  /** Year of completion or design */
  year: number;
  /** Studio category classification */
  category: ProjectCategory;
  /** Short project overview (1 short paragraph) */
  description: string;
  /** Detailed 2-3 paragraph architectural narrative */
  body?: string[];
  /** Total area (e.g., "450 m²" or "4,800 sq ft") */
  area?: string;
  /** Core project team members or collaborators */
  team: string[];
  /** Cloudinary public ID for primary cover photo (optional for text-only index records) */
  cover?: string;
  /** Primary display image URL or Cloudinary ID (optional for text-only index records) */
  image?: string;
  /** Cloudinary public IDs or gallery items for project gallery photos */
  gallery: (string | ProjectGalleryItem)[];
  /** Optional Vimeo or YouTube video URL */
  videoUrl?: string;
  /** Optional custom CSS object-position (e.g. 'center', '50% 30%') */
  objectPosition?: string;
  /** Whether the project is marked as featured / flagship */
  featured?: boolean;
}

/** Represents a career / employment opening at the studio */
export interface Job {
  /** Job position title */
  title: string;
  /** Employment type (e.g., Full-time, Part-time, Internship) */
  type: string;
  /** Work location or hybrid/remote policy */
  location: string;
  /** Overview of role responsibilities */
  description: string;
  /** Key qualifications and requirements list */
  requirements: string[];
}

/** Represents a top-level navigation link item */
export interface NavItem {
  /** Display label for the navigation item */
  label: string;
  /** Target route path (e.g., "/projects") */
  path: string;
}

/** Social media link entries for the studio */
export interface SocialLinks {
  /** Instagram profile URL */
  instagram?: string;
  /** LinkedIn company page URL */
  linkedin?: string;
  /** Twitter/X profile URL */
  twitter?: string;
  /** Facebook page URL */
  facebook?: string;
  /** Extensible key-value for additional social platforms */
  [key: string]: string | undefined;
}

/** Global studio configuration and contact details */
export interface SiteConfig {
  /** Registered architectural studio name */
  studioName: string;
  /** Studio tagline or core philosophy statement */
  tagline: string;
  /** Primary contact and inquiry email */
  email: string;
  /** Studio telephone number with country code */
  phone: string;
  /** Physical studio address */
  address: string;
  /** Google Maps embed iframe URL */
  mapEmbedUrl: string;
  /** Direct WhatsApp contact phone number */
  whatsappNumber: string;
  /** Social media platform URLs */
  socialLinks: SocialLinks;
}

// -------------------------------------------------------------
// HOME PAGE CONTENT TYPES
// -------------------------------------------------------------

/** Single photographic slide for the hero section */
export interface HeroSlide {
  /** Cloudinary public asset ID */
  publicId: string;
  /** Accessibility alternative description */
  alt: string;
}

/** Hero section content specification */
export interface HeroContent {
  /** Single primary H1 display headline */
  headline: string;
  /** Subordinate supporting narrative */
  subheadline: string;
  /** Geographical location indicator */
  locationLine: string;
  /** Studio founding / establishment year */
  establishedYear: number;
  /** Slideshow photographic assets */
  slides: HeroSlide[];
  /** Optional direct mp4/webm loop video URL */
  heroVideoSrc?: string;
  /** Vimeo or YouTube showreel share URL */
  showreelUrl: string;
  /** Cloudinary public ID for showreel video poster */
  showreelPoster: string;
}

/** Studio introduction section content */
export interface IntroContent {
  /** Bold editorial statement */
  statement: string;
  /** Detailed paragraph description */
  description: string;
  /** Cloudinary public asset ID */
  imageId: string;
  /** Image alternative text */
  imageAlt: string;
  /** Text for link to about page */
  aboutLinkText: string;
}

/** Architectural service / approach item */
export interface ServiceItem {
  /** Discipline or phase title */
  title: string;
  /** Brief explanatory description */
  shortDescription: string;
}

/** Spotlight featured project showcase on the home page */
export interface SelectedProjectContent {
  /** Target project slug matching projects.ts */
  slug: string;
  /** Project title */
  title: string;
  /** Cloudinary hero image ID */
  imageId: string;
  /** Image alternative text */
  imageAlt: string;
  /** Concise conceptual narrative */
  oneLineStory: string;
  /** Optional architectural short film Vimeo/YouTube link */
  filmUrl?: string;
}

/** Quantitative studio metric item */
export interface StatItem {
  /** Numerical value or metric (e.g. "45+", "12") */
  value: string;
  /** Explanatory metric label */
  label: string;
}

/** Institutional client or collaborator mark */
export interface ClientLogo {
  /** Client or institution name */
  name: string;
  /** SVG markup or imported SVG URL */
  logo: string;
  /** Optional external link */
  url?: string;
}

/** Closing Call To Action section content */
export interface CtaContent {
  /** Monumental call to action headline */
  heading: string;
  /** Short prompt text */
  text: string;
  /** Primary button label */
  buttonLabel: string;
}

/** Complete schema for the Home page */
export interface HomeContent {
  hero: HeroContent;
  intro: IntroContent;
  featuredProjectSlugs: string[];
  services: ServiceItem[];
  selectedProject: SelectedProjectContent;
  stats: StatItem[];
  clients: ClientLogo[];
  cta: CtaContent;
}

/** Parsed video embed information */
export interface VideoEmbedInfo {
  provider: 'vimeo' | 'youtube' | null;
  id: string | null;
  embedUrl: string | null;
  error?: string;
}
