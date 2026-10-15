/**
 * Studio career openings and job listings.
 * Developers edit this file when publishing or archiving studio career opportunities.
 *
 * NOTE: When this array is set to empty [], the Careers page displays the friendly
 * empty state with "Send us your portfolio" mailto action.
 */
import type { Job } from '@/types';

// EDIT: Studio job openings (placeholder data)
export const jobs: Job[] = [
  {
    // EDIT: Job title
    title: 'Senior Project Architect',
    // EDIT: Employment type
    type: 'Full-time',
    // EDIT: Job location
    location: 'New York, NY (Hybrid)',
    // EDIT: Job summary description
    description:
      'We are looking for a licensed architect with 7+ years of experience leading complex residential and cultural projects from concept through contract administration.',
    // EDIT: List of qualifications and requirements
    requirements: [
      'Professional degree in Architecture (B.Arch or M.Arch)',
      'Licensed Architect with minimum 7 years of post-licensure experience',
      'Demonstrated expertise in detailing, construction documentation, and site supervision',
      'Proficiency in Revit, Rhino, and Adobe Creative Cloud',
      'Strong client communication and collaborative team leadership abilities',
    ],
  },
  {
    // EDIT: Job title
    title: 'Interior Architect / Millwork Specialist',
    // EDIT: Employment type
    type: 'Full-time',
    // EDIT: Job location
    location: 'Zurich, Switzerland',
    // EDIT: Job summary description
    description:
      'Seeking an interior architect with 4–6 years of experience specializing in custom architectural millwork, tactile material palettes, and bespoke residential detailing.',
    // EDIT: List of qualifications and requirements
    requirements: [
      'Degree in Interior Architecture or Architecture',
      'Minimum 4 years of proven experience in high-end residential interiors',
      'Extensive knowledge of natural stone, timber species, textiles, and hardware detailing',
      'Strong documentation and 1:1 construction detailing skills in Vectorworks or Revit',
      'Fluency in English; working proficiency in German is an advantage',
    ],
  },
  {
    // EDIT: Job title
    title: 'Design Fellow / Architectural Intern',
    // EDIT: Employment type
    type: 'Internship (6 Months)',
    // EDIT: Job location
    location: 'Kyoto, Japan / New York, NY',
    // EDIT: Job summary description
    description:
      'A paid 6-month research and design residency for advanced architecture students or recent graduates interested in physical model making and contextual studies.',
    // EDIT: List of qualifications and requirements
    requirements: [
      'Currently enrolled in or recently graduated from an accredited architecture program',
      'Exceptional physical modeling craft (wood, plaster, cast concrete)',
      'High digital proficiency in Rhino 3D, Grasshopper, and V-Ray',
      'Self-motivated, detail-oriented, and passionate about material research',
    ],
  },
];
