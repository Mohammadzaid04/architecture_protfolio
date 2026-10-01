/**
 * Studio career openings and job listings.
 * Developers edit this file when publishing or archiving studio career opportunities.
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
];
