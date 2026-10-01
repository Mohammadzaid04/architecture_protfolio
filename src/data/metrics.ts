/**
 * PLACEHOLDER VALUES: replace with client-verified figures before launch.
 * Studio practice statistics and metrics for the homepage introduction.
 * Developers edit this array to update metric values, suffixes, or descriptions.
 */

export interface MetricItem {
  /** Target numeric value for count-up animation */
  value: number;
  /** Optional suffix (e.g. "+", "%", or "") */
  suffix: string;
  /** Descriptive metric label */
  label: string;
}

export const metricsData: MetricItem[] = [
  { value: 14, suffix: '+', label: 'Years of Practice' },
  { value: 42, suffix: '', label: 'Completed Works' },
  { value: 18, suffix: '', label: 'International Awards' },
  { value: 100, suffix: '%', label: 'Sustainable Sourcing' },
];
