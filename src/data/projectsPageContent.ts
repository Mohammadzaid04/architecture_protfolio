/**
 * Editorial content, stats, and copy for the Projects catalog page.
 * Developers edit this file to update the headline copy, practice statistics,
 * categories list, archive call-to-action, or SEO metadata per client.
 */
import type { ProjectCategory } from '@/types';

export interface ProjectStat {
  /** Numerical value or metric display (e.g. "150+", "12", "14 yrs") */
  value: string;
  /** Monospace uppercase descriptor */
  label: string;
}

export interface ProjectsArchiveCTA {
  /** Section heading */
  title: string;
  /** Narrative explanatory text */
  text: string;
  /** Primary button action linking to contact/inquiry */
  primaryButton: {
    label: string;
    href: string;
  };
  /** Secondary button action linking to list index */
  secondaryButton: {
    label: string;
    href: string;
  };
}

export interface ProjectsPageContent {
  /** Eyebrow section number and label */
  eyebrow: {
    number: string;
    label: string;
  };
  /** Primary page H1 display title */
  title: string;
  /** Curated highlights intro narrative */
  intro: string;
  /** Key practice milestones and statistics strip */
  stats: ProjectStat[];
  /** Total project catalog count string representation */
  totalProjects: string;
  /** Filterable project categories */
  categories: readonly ('All' | ProjectCategory)[];
  /** Empty filter result messaging */
  emptyState: {
    message: string;
    resetLabel: string;
  };
  /** Footer archive call-to-action block */
  archive: ProjectsArchiveCTA;
  /** SEO meta head properties */
  seo: {
    title: string;
    description: string;
  };
}

export const projectsPageContent: ProjectsPageContent = {
  eyebrow: {
    number: '02',
    label: 'Projects',
  },
  title: 'Selected Works',
  intro:
    'A curated edit from over 150 projects delivered since 2012, spanning residential, civic, interior and landscape architecture.',
  stats: [
    {
      value: '150+',
      label: 'Projects delivered',
    },
    {
      value: '12',
      label: 'Cities',
    },
    {
      value: '14 yrs',
      label: 'Of practice',
    },
  ],
  totalProjects: '150+',
  categories: [
    'All',
    'Residential',
    'Institutional',
    'Commercial',
    'Interior',
    'Landscape',
  ] as const,
  emptyState: {
    message: 'No projects in this category yet.',
    resetLabel: 'Reset to All Works',
  },
  archive: {
    title: 'Looking for something specific?',
    text: 'What you see here is only a selection. Ask us for the complete portfolio, or get to know the practice behind the work.',
    primaryButton: {
      label: 'Request full portfolio',
      href: '/contact',
    },
    secondaryButton: {
      label: 'Meet the studio',
      href: '/about',
    },
  },
  seo: {
    title: 'Selected Works | Sadik Agaria Architects',
    description:
      'A curated selection of our best residential, institutional, commercial, interior and landscape architecture projects.',
  },
};
