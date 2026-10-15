/**
 * Client-editable About page content catalog.
 * Developers and content managers edit this file to update the studio history,
 * leadership profiles, design philosophy, process methodology, awards, and monographs.
 *
 * All editable items are labeled with // EDIT: or // TEMP: markers.
 * Sections whose data array is empty will not render at all.
 */

export interface AboutHeaderContent {
  eyebrow: {
    // EDIT: Eyebrow sequence number
    number: string;
    // EDIT: Eyebrow section label
    label: string;
  };
  // EDIT: Primary display title
  title: string;
  // EDIT: Short editorial intro paragraph
  intro: string;
  // Wide studio header image
  image: {
    // EDIT: Cloudinary public ID or image URL
    publicId: string;
    // EDIT: Accessibility alternative description
    alt: string;
    // Aspect ratio specification
    aspectRatio: string;
  };
}

export interface AboutStoryContent {
  // EDIT: Column section label
  label: string;
  // EDIT: Lead narrative opening paragraph
  lead: string;
  // EDIT: Detailed narrative paragraphs
  paragraphs: string[];
  // EDIT: Editorial pull-quote styled in display serif
  pullQuote: string;
}

export interface PhilosophyPrinciple {
  // EDIT: Principle index (e.g., "01")
  number: string;
  // EDIT: Principle title
  title: string;
  // EDIT: Short explanatory description
  text: string;
}

export interface AboutPhilosophyContent {
  // EDIT: Section index
  index?: string;
  // EDIT: Eyebrow label
  eyebrow: string;
  // EDIT: Primary section heading
  title: string;
  // EDIT: List of 3 to 4 core studio principles
  principles: PhilosophyPrinciple[];
}

export interface AboutPrincipalContent {
  // EDIT: Section index
  index?: string;
  // EDIT: Eyebrow label
  eyebrow: string;
  // EDIT: Primary section heading
  title: string;
  // EDIT: Principal architect's full name
  name: string;
  // EDIT: Leadership title / role
  role: string;
  // EDIT: Biographical narrative paragraphs
  bio: string[];
  // EDIT: Professional credentials, registrations, and memberships
  credentials: string[];
  // Portrait photograph
  image: {
    // EDIT: Cloudinary public ID or image URL
    publicId: string;
    // EDIT: Image alt text
    alt: string;
    // Aspect ratio specification
    aspectRatio: string;
  };
}

export interface ProcessStep {
  // EDIT: Step sequence number (e.g. "01")
  number: string;
  // EDIT: Phase title
  title: string;
  // EDIT: Phase methodology description
  description: string;
}

export interface AboutProcessContent {
  // EDIT: Section index
  index?: string;
  // EDIT: Eyebrow label
  eyebrow: string;
  // EDIT: Primary section heading
  title: string;
  // EDIT: Process description
  description: string;
  // EDIT: Ordered phases of delivery
  steps: ProcessStep[];
}

export interface TeamMember {
  // EDIT: Team member name
  name: string;
  // EDIT: Practice position or discipline
  role: string;
  // EDIT: Portrait image Cloudinary ID or URL
  photo: string;
  // EDIT: Alt text
  alt: string;
}

export interface AwardItem {
  // EDIT: Year of honor
  year: string;
  // EDIT: Award title
  title: string;
  // EDIT: Issuing institution or jury
  issuer: string;
  // EDIT: Associated project name (optional)
  project?: string;
}

export interface PublicationItem {
  // EDIT: Publication year
  year: string;
  // EDIT: Monograph or article title
  title: string;
  // EDIT: Publisher, journal, or magazine
  issuer: string;
}

export interface AboutContent {
  seo: {
    title: string;
    description: string;
  };
  header: AboutHeaderContent;
  story: AboutStoryContent;
  philosophy: AboutPhilosophyContent;
  principal: AboutPrincipalContent;
  process: AboutProcessContent;
  team: TeamMember[];
  awards: AwardItem[];
  publications: PublicationItem[];
}

export const aboutContent: AboutContent = {
  seo: {
    // EDIT: About page title
    title: 'About the Studio',
    // EDIT: Meta description
    description:
      'Founded in 2012, Sadik Agaria Architects is an international architectural and interiors practice dedicated to material honesty, quiet light, and context-driven spatial design.',
  },

  header: {
    eyebrow: {
      number: '03',
      label: 'About the Practice',
    },
    // EDIT: Primary display title
    title: 'A Practice of Quiet Restraint & Material Honesty',
    // EDIT: Short editorial intro
    intro:
      'We design buildings, interiors, and landscapes that emerge from the enduring characteristics of place. Over fourteen years and more than one hundred and fifty delivered works, our studio has pursued an architecture of permanence, tactile dignity, and atmospheric stillness.',
    image: {
      // EDIT: Cloudinary studio image public ID or full URL
      publicId:
        'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760979/what-is-good-interior-design_7.jpg',
      alt: 'Architects and collaborators examining physical models and timber samples in the studio atelier',
      aspectRatio: '21/9',
    },
  },

  story: {
    // EDIT: Story column label
    label: 'Studio Heritage',
    // EDIT: Lead paragraph
    lead: 'Established in 2012, our studio began with a single conviction: that architecture should resist novelty in favor of deep structural clarity, environmental resonance, and timeless spatial proportion.',
    paragraphs: [
      // EDIT: Story body paragraph 1
      'What began as a focused research atelier exploring board-formed concrete and native stone joinery has grown into an international practice of twenty architects, interior designers, and landscape architects. With studios in New York, Kyoto, and Zurich, our work encompasses private residential sanctuaries, cultural institutions, and sensitive adaptive reuse projects across three continents.',
      // EDIT: Story body paragraph 2
      'We reject the notion of a superimposed house style. Instead, each commission begins with exhaustive geological, climatic, and historical site investigations. We work closely with master stonemasons, timber artisans, and structural engineers to develop custom construction methodologies where every joint, reveal, and shadow line serves an authentic structural purpose.',
      // EDIT: Story body paragraph 3
      'Over more than one hundred and fifty completed works, our buildings have aged gracefully alongside the landscapes they inhabit. As raw copper patinates, lime plaster cures under shifting sunlight, and native vegetation softens exposed concrete masses, our architecture achieves an enduring dialogue between human ritual and natural topography.',
    ],
    // EDIT: Editorial pull-quote
    pullQuote:
      'Enduring architecture is not invented in isolation. It is uncovered through rigorous study of topography, tactile material honesty, and the silent rhythm of light across raw surfaces.',
  },

  philosophy: {
    index: '01',
    eyebrow: 'Our Philosophy',
    title: 'Guiding Principles of Our Work',
    principles: [
      {
        number: '01',
        // EDIT: Principle 1
        title: 'Contextual Specificity',
        text: 'Every structure is rooted in its specific geological, historical, and microclimatic setting. We do not impose imported forms; we listen to the contour, wind currents, and daylight of the land.',
      },
      {
        number: '02',
        // EDIT: Principle 2
        title: 'Material Authenticity',
        text: 'We honor raw matter: cast concrete, quarried limestone, hand-hewn oak, and blackened steel. Materials are left unadorned, allowing natural imperfections, textures, and aging patinas to enrich the architecture.',
      },
      {
        number: '03',
        // EDIT: Principle 3
        title: 'Choreography of Daylight',
        text: 'Light is our primary building material. Narrow apertures, clerestory lightwells, and deep overhangs track the passage of celestial time, creating interior atmospheres of contemplative stillness.',
      },
      {
        number: '04',
        // EDIT: Principle 4
        title: 'Ecological Permanence',
        text: 'True sustainability is longevity. We build with massive thermal envelopes, passive geothermal ventilation, and recyclable low-carbon assemblies designed to endure for centuries rather than decades.',
      },
    ],
  },

  principal: {
    index: '02',
    eyebrow: 'Leadership',
    title: 'Principal Architect',
    name: 'Sadik Agaria',
    role: 'Founder & Design Principal',
    bio: [
      // EDIT: Principal bio paragraph 1
      'Sadik Agaria founded the studio in 2012 following a decade of international design leadership on award-winning civic and cultural projects across Europe and Asia. His work investigates the intersection of monolithic structural clarity, regional craft traditions, and environmental stewardship.',
      // EDIT: Principal bio paragraph 2
      'A graduate of the Architectural Association in London and the ETH Zurich, Sadik brings a rigorous academic background combined with hands-on tectonic research. He frequently lectures on sustainable structural masonry, monolithic spatial design, and historical conservation at institutions worldwide.',
      // EDIT: Principal bio paragraph 3
      'Sadik personally directs the conceptual inception and material detailing of every studio commission, ensuring intimate collaboration with clients and artisans from the initial sketch to final occupancy.',
    ],
    credentials: [
      // EDIT: Professional memberships & credentials
      'Registered Architect, AIA (American Institute of Architects)',
      'Member, RIBA (Royal Institute of British Architects)',
      'NCARB Certified Architect',
      'LEED AP Building Design + Construction',
      'M.Arch, Architectural Association London',
      'B.Arch (Hons), ETH Zurich',
    ],
    image: {
      // EDIT: Cloudinary portrait public ID or full URL
      publicId:
        'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760838/samples/landscapes/girl-urban-view.jpg',
      alt: 'Sadik Agaria, Principal Architect and Founder',
      aspectRatio: '4/5',
    },
  },

  process: {
    index: '03',
    eyebrow: 'Methodology',
    title: 'Our Architectural Process',
    description:
      'A structured, collaborative voyage from initial site archaeology to tectonic delivery, ensuring absolute fidelity to concept, budget, and environmental performance.',
    steps: [
      {
        number: '01',
        title: 'Brief & Site Archaeology',
        description:
          'Deep inquiry into client aspirations, lifestyle rituals, geological conditions, solar orientation, and historic zoning constraints.',
      },
      {
        number: '02',
        title: 'Concept & Spatial Massing',
        description:
          'Exploration of tectonic volumes through hand drafting, physical plaster study models, and computational daylight simulation.',
      },
      {
        number: '03',
        title: 'Design Development & Detail',
        description:
          'Refining 1:1 material mockups, acoustic balances, structural coordination, and custom architectural millwork specifications.',
      },
      {
        number: '04',
        title: 'Delivery & Site Stewardship',
        description:
          'Rigorous on-site contract administration, artisan craftsmanship supervision, and meticulous commissioning through handover.',
      },
    ],
  },

  team: [
    // EDIT: Studio team members (Empty array [] hides the section entirely)
    {
      name: 'Elena Vance',
      role: 'Studio Director & Senior Associate',
      photo:
        'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760824/samples/people/smiling-man.jpg',
      alt: 'Elena Vance, Studio Director',
    },
    {
      name: 'Kenji Sato',
      role: 'Project Architect & Head of Research',
      photo:
        'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760824/samples/people/smiling-man.jpg',
      alt: 'Kenji Sato, Project Architect',
    },
    {
      name: 'Mira Lindqvist',
      role: 'Director of Interior Architecture',
      photo:
        'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760838/samples/landscapes/girl-urban-view.jpg',
      alt: 'Mira Lindqvist, Director of Interior Architecture',
    },
    {
      name: 'Julian Thorne',
      role: 'Computational Lead & Landscape Strategist',
      photo:
        'https://res.cloudinary.com/z77t2r2h/image/upload/v1790760824/samples/people/smiling-man.jpg',
      alt: 'Julian Thorne, Computational Lead',
    },
  ],

  awards: [
    // EDIT: Ruled list of awards (Empty array [] hides the section)
    {
      year: '2025',
      title: 'AIA National Honor Award for Architecture',
      issuer: 'American Institute of Architects',
      project: 'Monolith House',
    },
    {
      year: '2024',
      title: 'RIBA International Award for Excellence',
      issuer: 'Royal Institute of British Architects',
      project: 'Solarium Cultural Pavilion',
    },
    {
      year: '2023',
      title: 'Swiss Architectural Design Prize',
      issuer: 'Federal Office of Culture (FOC), Bern',
      project: 'Alabaster Residence',
    },
    {
      year: '2021',
      title: 'World Architecture Festival: Best Cultural Building',
      issuer: 'World Architecture Festival Jury',
      project: 'Kyoto Archive & Study Center',
    },
    {
      year: '2019',
      title: 'Mies Crown Hall Americas Prize Finalist',
      issuer: 'Illinois Institute of Technology',
      project: 'Hudson Valley Meadow Studio',
    },
  ],

  publications: [
    // EDIT: Ruled list of publications & monographs (Empty array [] hides the section)
    {
      year: '2025',
      title: 'Sadik Agaria Architects: Monograph 2012–2024',
      issuer: 'Hatje Cantz Verlag (Berlin)',
    },
    {
      year: '2024',
      title: 'Quiet Monoliths: The Tactile Work of Sadik Agaria',
      issuer: 'El Croquis, Issue 224',
    },
    {
      year: '2023',
      title: 'Material Memory in Contemporary Japanese Architecture',
      issuer: 'A+U (Architecture and Urbanism)',
    },
    {
      year: '2021',
      title: 'Light, Mass, Void: Selected Works',
      issuer: 'Birkhauser Architecture Press',
    },
  ],
};
