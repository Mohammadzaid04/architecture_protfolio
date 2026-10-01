/**
 * Lightweight document title and meta description hook.
 * Developers invoke this hook inside routed page components to ensure accurate SEO head tags.
 *
 * RESPONSIVE BEHAVIOR:
 * - Runs synchronously on the client window document; does not cause layout shifts.
 */
import { useEffect } from 'react';
import { setDocumentMeta } from '@/utils/seo';

export interface DocumentHeadOptions {
  /** Optional meta description string for search engines and social previews */
  description?: string;
  /** Studio name suffix override (default: 'Atelier Architecture') */
  suffix?: string;
}

/**
 * Custom hook to dynamically set document title and meta description without external dependencies.
 */
export function useDocumentHead(title: string, description?: string, suffix?: string): void {
  useEffect(() => {
    setDocumentMeta(title, description, suffix);
  }, [title, description, suffix]);
}
