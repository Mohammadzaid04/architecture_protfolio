/**
 * Client-editable Home page content catalog.
 * Content managers edit this file to update the homepage hero video, statement,
 * statistics, practice services, client logos, and call-to-action copy.
 *
 * All editable items are labeled with // EDIT: markers.
 */

export interface VideoSource {
  /** Full video link (Vimeo, YouTube, or direct MP4 URL) */
  url: string;
}

export interface StatItem {
  /** Statistic numeric value (e.g. "28+") */
  value: string;
  /** Metric description */
  label: string;
}

export interface ServiceItem {
  /** Practice discipline title */
  title: string;
  /** Short summary of service scope */
  description: string;
  /** Cloudinary public image ID */
  image: string;
  /** Alternative text for the image */
  imageAlt: string;
}

export interface ClientItem {
  /** Client or organization name */
  name: string;
  /** Local SVG path inside src/assets/clients/ */
  logo: string;
}

export interface HomeContent {
  hero: {
    headline: string;
    subline: string;
    location: string;
    established: number;
    video: VideoSource;
    poster: string;
    posterAlt: string;
  };
  intro: {
    statement: string;
    linkLabel: string;
  };
  stats: StatItem[];
  featuredProjectSlugs: string[];
  cinematicBand: {
    eyebrow: string;
    headline: string;
    video: VideoSource;
    poster: string;
    posterAlt: string;
  };
  services: ServiceItem[];
  selectedProjectSlug: string;
  clients: ClientItem[];
  cta: {
    headline: string;
    buttonLabel: string;
    video: VideoSource;
    poster: string;
    posterAlt: string;
  };
}

export const homeContent: HomeContent = {
  // -------------------------------------------------------------
  // HERO SECTION
  // -------------------------------------------------------------
  hero: {
    // EDIT: Main hero display headline
    headline: 'Architecture Shaped by Context, Light & Honesty',
    // EDIT: Secondary hero descriptor
    subline: 'Monolithic spaces conceived in dialogue with landscape and human ritual.',
    // EDIT: Studio primary location
    location: 'Kyoto — New York — Zurich',
    // EDIT: Studio foundation year
    established: 2012,
    // EDIT: Hero background video (Vimeo, YouTube, or direct MP4)
    video: {
      url: 'https://youtu.be/OP_fVIUTr9Y?si=d8gxwE8HDtgMnMeus',
    },
    // EDIT: Cloudinary public ID for eager LCP poster image
    poster: 'portfolio/hero/architecture-hero-poster',
    // EDIT: Alt text for hero poster
    posterAlt: 'Sculptural concrete architecture framed against natural light and bamboo trees',
  },

  // -------------------------------------------------------------
  // INTRO STATEMENT & STATS
  // -------------------------------------------------------------
  intro: {
    // EDIT: Studio mission statement
    statement:
      'We believe enduring architecture is not invented in isolation. It is uncovered through rigorous study of topography, tactile material honesty, and the silent rhythm of natural light across raw surfaces.',
    // EDIT: Action link text
    linkLabel: 'Discover Our Philosophy',
  },
  stats: [
    // EDIT: Studio statistics
    { value: '14+', label: 'Years of Practice' },
    { value: '42', label: 'Completed Works' },
    { value: '18', label: 'International Awards' },
    { value: '100%', label: 'Sustainable Sourcing' },
  ],

  // -------------------------------------------------------------
  // FEATURED PROJECTS
  // -------------------------------------------------------------
  // EDIT: Slugs corresponding to projects defined in src/data/projects.ts
  featuredProjectSlugs: ['monolith-house', 'solarium-cultural-pavilion'],

  // -------------------------------------------------------------
  // CINEMATIC FULL-WIDTH BAND
  // -------------------------------------------------------------
  cinematicBand: {
    // EDIT: Eyebrow label
    eyebrow: 'Atmosphere & Craft',
    // EDIT: Large band headline
    headline: 'Where Material Restraint Meets Spatial Poetry',
    // EDIT: Video link for the cinematic band
    video: {
      url: 'https://vimeo.com/331034927?fl=pl&fe=sh',
    },
    // EDIT: Cloudinary poster ID
    poster: 'portfolio/atmosphere/cinematic-band-poster',
    // EDIT: Alt text
    posterAlt: 'Cast-in-place concrete colonnade at dusk with warm directional lighting',
  },

  // -------------------------------------------------------------
  // SERVICES (WHAT WE DO)
  // -------------------------------------------------------------
  services: [
    {
      // EDIT: Service title
      title: 'Architectural Design',
      // EDIT: Service description
      description:
        'Holistic conceptualization and execution of residential, institutional, and cultural spaces tailored to site topography.',
      // EDIT: Cloudinary image ID
      image: 'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760848/samples/coffee.jpg',
      // EDIT: Image alt text
      imageAlt: 'Detailed blueprint model and concrete maquette',
    },
    {
      title: 'Interior Architecture',
      description:
        'Tactile material palettes, bespoke millwork, and custom lighting schemes crafted in balance with structural mass.',
      image:
        'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760848/samples/chair-and-coffee-table.jpg',
      imageAlt: 'Minimalist interior with continuous plaster walls and warm timber benches',
    },
    {
      title: 'Landscape & Masterplanning',
      description:
        'Symbiotic site planning that knits architectural pavilions into regenerative native ecosystems and forest gardens.',
      image:
        'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760841/samples/landscapes/nature-mountains.jpg',
      imageAlt: 'Aerial perspective of hillside pavilions nestled into native woodland',
    },
    {
      title: 'Historic Adaptive Reuse',
      description:
        'Respectful contemporary interventions that honor existing structural heritage while inserting modern spatial clarity.',
      image:
        'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760838/samples/landscapes/girl-urban-view.jpg',
      imageAlt: 'Restored brick masonry warehouse with contemporary glass insertion',
    },
  ],

  // -------------------------------------------------------------
  // SELECTED PROJECT SPOTLIGHT
  // -------------------------------------------------------------
  // EDIT: Slug for flagship project feature
  selectedProjectSlug: 'monolith-house',

  // -------------------------------------------------------------
  // CLIENT LOGOS STRIP
  // -------------------------------------------------------------
  clients: [
    // EDIT: Client logos (stored in src/assets/clients/)
    { name: 'Museum of Contemporary Art', logo: '/src/assets/clients/client-1.svg' },
    { name: 'Nordic Heritage Trust', logo: '/src/assets/clients/client-2.svg' },
    { name: 'Metropolitan Development Group', logo: '/src/assets/clients/client-3.svg' },
    { name: 'Kyoto Cultural Foundation', logo: '/src/assets/clients/client-4.svg' },
    { name: 'Bauhaus Archive Foundation', logo: '/src/assets/clients/client-5.svg' },
  ],

  // -------------------------------------------------------------
  // CALL TO ACTION SECTION
  // -------------------------------------------------------------
  cta: {
    // EDIT: CTA headline
    headline: 'Let Us Shape Your Next Spatial Landmark',
    // EDIT: Primary action button label
    buttonLabel: 'Initiate a Conversation',
    // EDIT: Ambient background video for CTA
    video: {
      url: 'https://vimeo.com/76979871',
    },
    // EDIT: Cloudinary poster ID
    poster: 'portfolio/cta/cta-ambient-poster',
    // EDIT: Poster alt text
    posterAlt: 'Sunlight casting deep linear shadows across textured stone wall',
  },
};
