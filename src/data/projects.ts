/**
 * Portfolio project catalog for the architecture studio.
 * Developers and content managers edit this file to add, modify, or reorganize studio projects.
 *
 * RESPONSIVE BEHAVIOR:
 * - Data schema provides full aspect ratio options, rich text blocks, and structured galleries.
 * - Helper functions support client-side filtering, slug lookup, and circular next-project routing.
 *
 * All client-editable fields are marked with // EDIT:
 */
import type { Project, ProjectCategory } from '@/types';

// EDIT: Portfolio project records (at least 6 projects covering all ProjectCategory types)
export const projects: Project[] = [
  // -------------------------------------------------------------
  // 1. RESIDENTIAL: Monolith House
  // -------------------------------------------------------------
  {
    id: 'monolith-house',
    name: 'Monolith House',
    featured: true,
    // EDIT: Project title
    title: 'Monolith House',
    // EDIT: Unique slug (used in URL /projects/:slug)
    slug: 'monolith-house',
    // EDIT: Project location
    location: 'Kyoto, Japan',
    // EDIT: Completion year
    year: 2024,
    // EDIT: Category (Residential | Commercial | Interior | Institutional | Landscape)
    category: 'Residential' as ProjectCategory,
    // EDIT: Short overview (1 paragraph, shown on cards and intros)
    description:
      'A board-formed concrete residence nestled into a forested hillside, balancing monolithic mass with expansive framed views of the bamboo canopy.',
    // EDIT: In-depth architectural narrative (2-3 paragraphs)
    body: [
      'Nestled into the steep topography on the outskirts of Kyoto, Monolith House was conceived as a silent geometric counterpoint to the organic density of the surrounding bamboo forest. The residence is composed of three interlocking cast-in-place concrete volumes that step with the natural hillside slope, minimizing earth displacement while creating private terraced platforms overlooking the valley.',
      'Inside, structural board-formed concrete walls are left exposed, bearing the tactile grain of locally sourced cedar formwork. Sunlight enters through razor-thin roof monitors and deeply recessed vertical glazed apertures, tracking shadows across textured surfaces throughout the day. The interplay between raw mass and soft atmospheric light instills a quiet monastic calm.',
      'Environmental stewardship guided the design: high thermal mass combined with geothermal radiant flooring and passive stack ventilation keeps interior temperatures regulated year-round without mechanical chillers. Native plantings and moss gardens gradually reclaim the concrete seams, allowing architecture and nature to age together in mutual dignity.',
    ],
    // EDIT: Built area
    area: '420 m²',
    // EDIT: Project design & engineering team
    team: ['Kenji Sato (Lead)', 'Elena Vance', 'Taro Mori', 'Keiko Fujimoto'],
    // EDIT: Display image and Cloudinary cover photo
    image:
      'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760979/what-is-good-interior-design_7.jpg',
    cover:
      'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760979/what-is-good-interior-design_7.jpg',
    // EDIT: Gallery images (6-10 items with Cloudinary public IDs, alt text, and layout hints)
    gallery: [
      {
        publicId:
          'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760979/what-is-good-interior-design_7.jpg',
        alt: 'Monolith House living pavilion framed by board-formed concrete and bamboo trees',
        layout: 'wide',
        caption: 'Cantilevered living volume projecting toward the forested valley',
      },
      {
        publicId:
          'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760848/samples/chair-and-coffee-table.jpg',
        alt: 'Minimalist living area featuring sunken hearth and basalt bench',
        layout: 'half',
        caption: 'Honed basalt stone hearth and low tea table',
      },
      {
        publicId: 'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760848/samples/coffee.jpg',
        alt: 'Tactile cedar joinery detail against raw concrete reveal',
        layout: 'half',
        caption: 'Custom Japanese cedar joinery and recessed shadow gap',
      },
      {
        publicId:
          'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760841/samples/landscapes/nature-mountains.jpg',
        alt: 'Site perspective showing relationship between concrete volumes and hillside',
        layout: 'full',
        caption: 'Stepped pavilion silhouette anchored to the forested mountainside',
      },
      {
        publicId:
          'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760838/samples/landscapes/girl-urban-view.jpg',
        alt: 'Courtyard meditation garden with shallow water reflection basin',
        layout: 'half',
        caption: 'Inner courtyard water garden reflecting changing sky and weather',
      },
      {
        publicId:
          'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760835/samples/landscapes/architecture-signs.jpg',
        alt: 'Entrance sequence with deeply recessed cast threshold',
        layout: 'half',
        caption: 'Compressed entryway transition into the primary light pavilion',
      },
      {
        publicId:
          'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760979/what-is-good-interior-design_7.jpg',
        alt: 'Twilight exterior view showcasing warm directional illumination',
        layout: 'wide',
        caption: 'Nightfall illumination highlighting raw texture and timber grain',
      },
    ],
    // EDIT: Optional Vimeo or YouTube video URL
    videoUrl: 'https://vimeo.com/76979871',
  },

  // -------------------------------------------------------------
  // 2. INSTITUTIONAL: Solarium Cultural Pavilion
  // -------------------------------------------------------------
  {
    id: 'solarium-cultural-pavilion',
    name: 'Solarium Cultural Pavilion',
    featured: false,
    title: 'Solarium Cultural Pavilion',
    slug: 'solarium-cultural-pavilion',
    location: 'Zurich, Switzerland',
    year: 2023,
    category: 'Institutional' as ProjectCategory,
    description:
      'A public pavilion exploring mass timber joinery and passive solar heating, conceived as an airy forum for contemporary sculpture and musical performance.',
    body: [
      'Commissioned by the Zurich Arts Endowment, the Solarium Cultural Pavilion acts as an open-air civic forum on the shore of Lake Zurich. The structure investigates the expressive potential of precision-milled Swiss larch and glulam arches, assembled using traditional interlocking joinery without steel fasteners.',
      'The building skin employs triple-glazed structural glass walls with high-transmittance low-e coatings that harvest low-angle winter sunlight, storing thermal energy in a polished terrazzo slab. In summer, automated external louvers provide continuous sun-shading while roof monitors draw cool lake breezes up through the central atrium.',
      'The pavilion has quickly become a cultural beacon: its column-free main hall hosts chamber concerts, temporary sculptural exhibits, and academic lectures, demonstrating that civic institutions can achieve net-positive carbon performance while celebrating monumental warmth.',
    ],
    area: '1,250 m²',
    team: ['Elena Vance (Lead)', 'Marcus Lindqvist', 'Sophie Dubois', 'Hans Zimmer'],
    image:
      'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760848/samples/chair-and-coffee-table.jpg',
    cover:
      'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760848/samples/chair-and-coffee-table.jpg',
    gallery: [
      {
        publicId:
          'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760848/samples/chair-and-coffee-table.jpg',
        alt: 'Curved timber glulam columns rising toward glazed skylights',
        layout: 'full',
        caption: 'Primary timber glulam hall spanning thirty meters without interior columns',
      },
      {
        publicId:
          'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760841/samples/landscapes/nature-mountains.jpg',
        alt: 'Lake Zurich reflection at sunrise with pavilion in foreground',
        layout: 'half',
        caption: 'Lakefront terrace connecting the civic hall to public promenade',
      },
      {
        publicId: 'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760848/samples/coffee.jpg',
        alt: 'Close-up of interlocking Swiss larch timber joinery',
        layout: 'half',
        caption: 'Precision interlocking larch joint detail crafted by local artisans',
      },
      {
        publicId:
          'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760838/samples/landscapes/girl-urban-view.jpg',
        alt: 'Perimeter glass gallery during an acoustic performance',
        layout: 'wide',
        caption: 'Acoustically tuned exhibition space flooded with diffused northern daylight',
      },
      {
        publicId:
          'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760835/samples/landscapes/architecture-signs.jpg',
        alt: 'Public plaza approach and granite seating steps',
        layout: 'half',
        caption: 'Granite seating steps leading from the civic square down to water level',
      },
      {
        publicId:
          'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760979/what-is-good-interior-design_7.jpg',
        alt: 'Evening lighting reflecting across the timber rib ceiling',
        layout: 'half',
        caption: 'Indirect evening lighting emphasizing the geometric ceiling lattice',
      },
    ],
    videoUrl: 'https://vimeo.com/331034927',
  },

  // -------------------------------------------------------------
  // 3. COMMERCIAL: Strata Art Foundation
  // -------------------------------------------------------------
  {
    id: 'strata-art-foundation',
    name: 'Strata Art Foundation',
    featured: false,
    title: 'Strata Art Foundation',
    slug: 'strata-art-foundation',
    location: 'Berlin, Germany',
    year: 2022,
    category: 'Commercial' as ProjectCategory,
    description:
      'Adaptive reuse of a heritage brick warehouse into a light-filled contemporary art gallery with suspended steel walkways and sky lanterns.',
    body: [
      'Located in Berlin-Kreuzberg, the Strata Art Foundation represents an architectural dialogue between 19th-century industrial masonry and radical contemporary subtraction. The project involved hollowing out the interior of a defunct mechanical workshop to create a four-story central light well, illuminated by three massive faceted skylights.',
      'Suspended blackened steel bridges crisscross the void, offering dramatic viewing perspectives for large-scale sculptural installations. The original clinker brick walls were meticulously restored and treated with a breathable lime wash, celebrating patinated scars, former crane tracks, and masonry textures.',
      'Beyond galleries, the facility houses artist studios, archival study rooms, a design bookstore, and a basement auditorium. The building functions as an open cultural ecosystem that invites the city inside while maintaining strictly controlled museum-grade climate zones.',
    ],
    area: '2,800 m²',
    team: ['Elena Vance (Lead)', 'Lukas Meyer', 'Greta Richter', 'Florian Becker'],
    image:
      'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760838/samples/landscapes/girl-urban-view.jpg',
    cover:
      'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760838/samples/landscapes/girl-urban-view.jpg',
    gallery: [
      {
        publicId:
          'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760838/samples/landscapes/girl-urban-view.jpg',
        alt: 'Main light atrium with suspended blackened steel footbridge',
        layout: 'wide',
        caption: 'Four-story atrium carved into the center of the historic warehouse',
      },
      {
        publicId:
          'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760979/what-is-good-interior-design_7.jpg',
        alt: 'Gallery wing with polished concrete floor and lime-washed brick',
        layout: 'half',
        caption: 'Natural illumination raking across restored historical brick masonry',
      },
      {
        publicId: 'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760848/samples/coffee.jpg',
        alt: 'Architectural bookshop and reading tables crafted from reclaimed timbers',
        layout: 'half',
        caption: 'Foundation bookstore featuring millwork salvaged from floor joists',
      },
      {
        publicId:
          'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760841/samples/landscapes/nature-mountains.jpg',
        alt: 'Exterior view of the historic facade with crisp modern steel apertures',
        layout: 'full',
        caption: 'Restored brick envelope punctuated by minimalist blackened steel window bays',
      },
      {
        publicId:
          'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760848/samples/chair-and-coffee-table.jpg',
        alt: 'Basement screening auditorium with dark acoustic timber panels',
        layout: 'half',
        caption: 'Multipurpose auditorium and cinema space in the vaulted basement',
      },
      {
        publicId:
          'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760835/samples/landscapes/architecture-signs.jpg',
        alt: 'Detail of steel handrail and patinated masonry reveal',
        layout: 'half',
        caption: 'Tactile junction between raw hot-rolled steel and lime mortar',
      },
    ],
    videoUrl: 'https://vimeo.com/76979871',
  },

  // -------------------------------------------------------------
  // 4. RESIDENTIAL: Kanso Urban Villa
  // -------------------------------------------------------------
  {
    id: 'kanso-urban-villa',
    name: 'Kanso Urban Villa',
    featured: false,
    title: 'Kanso Urban Villa',
    slug: 'kanso-urban-villa',
    location: 'Tokyo, Japan',
    year: 2023,
    category: 'Residential' as ProjectCategory,
    description:
      'A compact courtyard home sculpted with exposed basalt stone and cedar louvers, filtering city sounds into tranquil domestic daylight.',
    body: [
      'Situated on a narrow 180-square-meter urban lot in Meguro, Kanso Urban Villa is an exercise in privacy and spatial introversion. In response to dense neighboring buildings, the facade presents a blind basalt stone facade to the street, drawing all light, air, and nature from a series of internal lightwells and a central stone garden.',
      'The ground level is organized around a sunken living room finished in hand-raked lime plaster and dark smoked oak. Sliding shoji-inspired acoustic screens allow the owners to seamlessly transform the floor plan from open entertaining spaces to intimate quiet rooms.',
      'On the upper floors, operable cedar louvers filter exterior views while shielding solar heat gain. Rainwater collected from the zinc roof cascades down a bronze rain chain into an underground cistern, sustaining the courtyard fern trees throughout the year.',
    ],
    area: '310 m²',
    team: ['Kenji Sato (Lead)', 'Hana Takahashi', 'Kenichi Kato'],
    image: 'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760848/samples/coffee.jpg',
    cover: 'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760848/samples/coffee.jpg',
    gallery: [
      {
        publicId: 'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760848/samples/coffee.jpg',
        alt: 'Courtyard garden view seen through full-height sliding glass pocket doors',
        layout: 'wide',
        caption: 'Central courtyard courtyard mediating daylight into living quarters',
      },
      {
        publicId:
          'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760979/what-is-good-interior-design_7.jpg',
        alt: 'Sunken living area with dark oak floors and minimalist shelving',
        layout: 'half',
        caption: 'Sunken conversation hearth enveloped in tactile clay plaster',
      },
      {
        publicId:
          'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760848/samples/chair-and-coffee-table.jpg',
        alt: 'Custom bathroom with monolithic granite soaking tub and skylight',
        layout: 'half',
        caption: 'Deep granite ofuro tub illuminated by a direct vertical sun monitor',
      },
      {
        publicId:
          'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760838/samples/landscapes/girl-urban-view.jpg',
        alt: 'Operable vertical timber louvers shielding exterior facade',
        layout: 'full',
        caption: 'Cedar screen facade providing privacy from adjacent residential buildings',
      },
      {
        publicId:
          'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760835/samples/landscapes/architecture-signs.jpg',
        alt: 'Entry corridor with hand-chiselled stone pavers',
        layout: 'half',
        caption: 'Transition foyer paved with local split basalt flagstones',
      },
      {
        publicId:
          'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760841/samples/landscapes/nature-mountains.jpg',
        alt: 'Rooftop garden terrace overlooking the Tokyo city skyline',
        layout: 'half',
        caption: 'Sheltered roof terrace providing an open sky sanctuary',
      },
    ],
  },

  // -------------------------------------------------------------
  // 5. INTERIOR: Omotesando Atelier
  // -------------------------------------------------------------
  {
    id: 'omotesando-atelier',
    name: 'Omotesando Atelier',
    featured: false,
    title: 'Omotesando Atelier',
    slug: 'omotesando-atelier',
    location: 'Tokyo, Japan',
    year: 2024,
    category: 'Interior' as ProjectCategory,
    description:
      'A multi-level concept retail and exhibition interior sculpted entirely from raw rammed earth, blackened steel, and linen acoustic baffles.',
    body: [
      'Conceived as a serene sanctuary amid the bustling commercial tempo of Omotesando, this interior transformation explores the emotional impact of earth, weight, and silence. Massive curved rammed-earth walls divide the retail gallery into intuitive alcoves, each dedicated to craft textiles and ceramics.',
      'Every horizontal surface is rendered in unlacquered blackened brass and charred hinoki cypress, engineered to patinate slowly through human touch. Lighting was treated as an architectural material: rather than even overhead wash, concealed warm micro-fixtures illuminate products as though discovered in candlelight.',
      'A suspended ceiling canopy composed of hand-woven undyed linen acoustic baffles dampens ambient street reverberation, giving the gallery the tranquil acoustic quietude of a subterranean cavern.',
    ],
    area: '540 m²',
    team: ['Kenji Sato (Lead)', 'Yuki Tanaka', 'Clara Hoffmann'],
    image:
      'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760835/samples/landscapes/architecture-signs.jpg',
    cover:
      'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760835/samples/landscapes/architecture-signs.jpg',
    gallery: [
      {
        publicId:
          'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760835/samples/landscapes/architecture-signs.jpg',
        alt: 'Curved rammed earth exhibition wall with recessed lighting reveals',
        layout: 'wide',
        caption: 'Seamless rammed-earth partitions guiding visitors through tactile alcoves',
      },
      {
        publicId:
          'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760979/what-is-good-interior-design_7.jpg',
        alt: 'Charred cypress display counter and unlacquered brass vitrines',
        layout: 'half',
        caption: 'Monolithic charred hinoki display counter with blackened brass fittings',
      },
      {
        publicId:
          'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760848/samples/chair-and-coffee-table.jpg',
        alt: 'Linen acoustic ceiling baffles suspended in geometric rows',
        layout: 'half',
        caption: 'Textured undyed linen baffles creating acoustic warmth and shadow rhythm',
      },
      {
        publicId: 'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760848/samples/coffee.jpg',
        alt: 'Private consultation lounge with sunken seating and textured clay wall',
        layout: 'full',
        caption: 'Subdued salon for private client consultations and material review',
      },
      {
        publicId:
          'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760838/samples/landscapes/girl-urban-view.jpg',
        alt: 'Detail of bronze door handle and stone floor junction',
        layout: 'half',
        caption: 'Custom cast bronze architectural hardware made specifically for the atelier',
      },
      {
        publicId:
          'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760841/samples/landscapes/nature-mountains.jpg',
        alt: 'Street-facing glass threshold reflecting evening city lights',
        layout: 'half',
        caption: 'Minimalist glass entry framing the rammed earth volume within',
      },
    ],
    videoUrl: 'https://vimeo.com/76979871',
  },

  // -------------------------------------------------------------
  // 6. LANDSCAPE: Nordic Pine Sanctuary
  // -------------------------------------------------------------
  {
    id: 'nordic-pine-sanctuary',
    name: 'Nordic Pine Sanctuary',
    featured: false,
    title: 'Nordic Pine Sanctuary',
    slug: 'nordic-pine-sanctuary',
    location: 'Oslo, Norway',
    year: 2024,
    category: 'Landscape' as ProjectCategory,
    description:
      'A masterplanned ecological reserve and stepped observation boardwalks integrated into old-growth boreal forest and granite outcroppings.',
    body: [
      'Set along the forested fjord ridges north of Oslo, the Nordic Pine Sanctuary establishes a sensitive infrastructure for conservation education and low-impact public access. The project comprises 3.2 kilometers of elevated corten steel and untreated larch boardwalks suspended lightly above delicate moss ecosystems.',
      'Rather than dominating the terrain, the pavilions and boardwalks thread through the forest along natural granite fissures, pivoting to preserve mature Scots pines and boulder formations. Three cantilevered observation decks terminate above the fjord, offering panoramic vistas while providing sheltered resting platforms.',
      'Constructed entirely with small-footprint pin foundations that leave no blast marks in bedrock, the architecture is designed to weather naturally over decades into silvered hues that merge seamlessly into the subarctic forest floor.',
    ],
    area: '14,600 m²',
    team: ['Marcus Lindqvist (Lead)', 'Astrid Holm', 'Soren Berg', 'Elena Vance'],
    image:
      'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760841/samples/landscapes/nature-mountains.jpg',
    cover:
      'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760841/samples/landscapes/nature-mountains.jpg',
    gallery: [
      {
        publicId:
          'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760841/samples/landscapes/nature-mountains.jpg',
        alt: 'Elevated timber boardwalk threading through boreal forest to fjord vista',
        layout: 'wide',
        caption:
          'Suspended larch boardwalk traversing granite ridges without disturbing root systems',
      },
      {
        publicId:
          'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760848/samples/chair-and-coffee-table.jpg',
        alt: 'Weathering corten steel observation shelter overlooking misty lake',
        layout: 'half',
        caption: 'Corten steel shelter framing dramatic seasonal shifts across the fjord',
      },
      {
        publicId:
          'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760838/samples/landscapes/girl-urban-view.jpg',
        alt: 'Stepped granite rest area integrated into natural rock fissures',
        layout: 'half',
        caption: 'Dry-stacked native granite seating benches around a communal hearth',
      },
      {
        publicId:
          'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760979/what-is-good-interior-design_7.jpg',
        alt: 'Shelter interior with timber roof beams and panoramic opening',
        layout: 'full',
        caption: 'Observation shelter interior framing panoramic views toward southern waters',
      },
      {
        publicId: 'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760848/samples/coffee.jpg',
        alt: 'Detail of pin foundation anchoring cleanly into bare granite',
        layout: 'half',
        caption: 'Minimal-impact steel pin foundation preserving ancient lichen and bedrock',
      },
      {
        publicId:
          'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760835/samples/landscapes/architecture-signs.jpg',
        alt: 'Dusk view of illuminated path winding through pine trees',
        layout: 'half',
        caption: 'Low-lux downward pathway markers preserving dark sky ecology',
      },
    ],
    videoUrl: 'https://vimeo.com/331034927',
  },
];

// -------------------------------------------------------------
// HELPER FUNCTIONS
// -------------------------------------------------------------

/**
 * Returns all active portfolio projects.
 */
export function getAllProjects(): Project[] {
  return projects;
}

/**
 * Retrieves a single project record by its unique slug.
 * Returns undefined if no matching project is found.
 */
export function getProjectBySlug(slug: string): Project | undefined {
  if (!slug) return undefined;
  return projects.find((project) => project.slug.toLowerCase() === slug.toLowerCase());
}

/**
 * Returns the next project in the catalogue relative to currentSlug,
 * looping back to the first project when at the end of the array.
 */
export function getNextProject(currentSlug: string): Project {
  const currentIndex = projects.findIndex(
    (project) => project.slug.toLowerCase() === currentSlug.toLowerCase(),
  );

  if (currentIndex === -1 || currentIndex === projects.length - 1) {
    return projects[0];
  }

  return projects[currentIndex + 1];
}

/**
 * Returns all distinct project categories present in the current dataset.
 */
export function getAvailableCategories(): ProjectCategory[] {
  const categories = new Set<ProjectCategory>();
  projects.forEach((p) => categories.add(p.category));
  return Array.from(categories);
}
