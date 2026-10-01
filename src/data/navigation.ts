/**
 * Navigation link definitions for header and footer navigation.
 * Developers edit this file to add, remove, or reorder main site navigation links.
 */
import type { NavItem } from '@/types';

// EDIT: Main site navigation menu items
export const navigationLinks: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Projects', path: '/projects' },
  { label: 'About', path: '/about' },
  { label: 'Careers', path: '/careers' },
  { label: 'Contact', path: '/contact' },
];
