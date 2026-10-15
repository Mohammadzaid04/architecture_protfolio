/**
 * Client-editable Careers page content catalog.
 * Content managers edit this file to update the studio recruitment narrative,
 * core cultural values, internship policies, and empty state prompts.
 *
 * All editable items are labeled with // EDIT: or // TEMP: markers.
 */

export interface CareerValue {
  // EDIT: Value sequence number
  number: string;
  // EDIT: Value headline
  title: string;
  // EDIT: Value description
  description: string;
}

export interface CareersContent {
  seo: {
    title: string;
    description: string;
  };
  header: {
    eyebrow: {
      number: string;
      label: string;
    };
    title: string;
    intro: string;
  };
  whyWorkHere: {
    eyebrow: string;
    title: string;
    intro: string;
    values: CareerValue[];
  };
  positionsHeading: {
    eyebrow: string;
    title: string;
  };
  spontaneous: {
    title: string;
    description: string;
    buttonLabel: string;
  };
  emptyState: {
    title: string;
    message: string;
    buttonLabel: string;
  };
}

export const careersContent: CareersContent = {
  seo: {
    // EDIT: Careers page title
    title: 'Careers',
    // EDIT: Meta description
    description:
      'Explore career opportunities and design fellowships at Sadik Agaria Architects. Join our collaborative studios in New York, Kyoto, and Zurich.',
  },

  header: {
    eyebrow: {
      number: '04',
      label: 'Careers & Culture',
    },
    // EDIT: Careers headline
    title: 'Join Our Architectural Practice',
    // EDIT: Header intro
    intro:
      'We are an inquisitive, close-knit studio of architects, interior designers, and landscape strategists. We seek thoughtful individuals who combine intellectual curiosity with obsessive tectonic craft and material rigor.',
  },

  whyWorkHere: {
    eyebrow: 'Studio Culture',
    title: 'Why Practice With Us',
    intro:
      'We cultivate an environment where design inquiry is non-hierarchical, research is embedded into everyday practice, and every team member contributes directly to the realization of built work.',
    values: [
      {
        number: '01',
        // EDIT: Value 1
        title: 'Tectonic Research & Making',
        description:
          'We operate an active materials workshop with physical casting tables, timber mockups, and robotic fabrication tools. Research into raw geology and sustainable materiality informs all project phases.',
      },
      {
        number: '02',
        // EDIT: Value 2
        title: 'Design Autonomy & Mentorship',
        description:
          'From junior associates to senior leads, team members engage with clients, consultants, and master artisans on active job sites. We invest deeply in professional licensure and continuous learning.',
      },
      {
        number: '03',
        // EDIT: Value 3
        title: 'Sustainable Rhythm & Well-being',
        description:
          'We believe exceptional architecture requires sustained clarity and rested minds. We actively discourage burnout culture, offer flexible hybrid arrangements, and maintain balanced studio hours.',
      },
    ],
  },

  positionsHeading: {
    eyebrow: 'Opportunities',
    title: 'Current Open Positions',
  },

  spontaneous: {
    title: 'Internships & Spontaneous Applications',
    description:
      'We are continually on the lookout for promising designers, student interns, and researchers who align with our spatial ethos. If you do not see a role matching your exact profile, we invite you to submit a portfolio and curriculum vitae.',
    buttonLabel: 'Submit Spontaneous Portfolio',
  },

  emptyState: {
    title: 'No Active Openings at Present',
    message:
      'Our team is currently at full capacity, but we evaluate speculative portfolios on an ongoing basis for upcoming institutional and residential commissions.',
    buttonLabel: 'Send Us Your Portfolio',
  },
};
