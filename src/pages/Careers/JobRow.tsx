/**
 * Individual career opening expandable row component.
 * Features an accessible accordion trigger, keyboard accessibility,
 * and prefilled mailto application button.
 *
 * RESPONSIVE BEHAVIOR:
 * - Mobile (360px - 639px): Title and metadata wrap cleanly. Touch target >= 44px.
 * - Desktop (640px+): Header row displays title on left, type & location + chevron on right.
 */
import { useState, useId } from 'react';
import type { Job } from '@/types';
import { Button } from '@/components/common/Button';
import { siteConfig } from '@/data/siteConfig';

export interface JobRowProps {
  /** Job opening data */
  job: Job;
  /** Index position */
  index: number;
  /** Optional custom CSS classes */
  className?: string;
}

/**
 * Accessible expandable row for studio job positions.
 */
export function JobRow({ job, index, className = '' }: JobRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentId = useId();
  const triggerId = useId();

  // Prefer dedicated careers email, falling back to general studio email
  const recipientEmail = siteConfig.careersEmail || siteConfig.email;
  const applySubject = encodeURIComponent(`Application: ${job.title} — ${siteConfig.studioName}`);
  const mailtoHref = `mailto:${recipientEmail}?subject=${applySubject}`;

  return (
    <div className={`border-b border-line last:border-b-0 ${className}`}>
      {/* 
        Accessible Accordion Trigger Header:
        - Native <button> element with aria-expanded and aria-controls
        - Title, type, and location are always visible
        - Min-height 56px (>= 44x44px touch target)
      */}
      <button
        id={triggerId}
        type="button"
        aria-expanded={isExpanded}
        aria-controls={contentId}
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6 text-left group cursor-pointer focus-visible:outline-accent focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors min-h-[56px]"
      >
        <div className="min-w-0 pr-2">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs text-accent font-semibold select-none">
              0{index + 1}
            </span>
            <span className="text-line text-xs" aria-hidden="true">
              /
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-muted">
              {job.type}
            </span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl text-text font-normal group-hover:text-accent transition-colors break-words">
            {job.title}
          </h3>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 mt-1 sm:mt-0">
          <span className="font-mono text-small text-muted break-words">{job.location}</span>
          <div
            className={`w-8 h-8 rounded-full border border-line flex items-center justify-center transition-transform duration-300 text-muted group-hover:border-text group-hover:text-text select-none ${
              isExpanded ? 'rotate-180 bg-surface' : ''
            }`}
            aria-hidden="true"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </button>

      {/* 
        Expandable Content Details:
        - Description, requirements, and Apply mailto button
        - Accessible landmark linked via aria-controls
      */}
      {isExpanded && (
        <div
          id={contentId}
          role="region"
          aria-labelledby={triggerId}
          className="pb-8 pt-2 sm:pt-4 max-w-3xl space-y-6"
        >
          {/* Role Summary */}
          <div>
            <h4 className="font-mono text-label uppercase tracking-widest text-muted mb-2">
              Role Overview
            </h4>
            <p className="text-body text-text/85 font-sans leading-relaxed break-words">
              {job.description}
            </p>
          </div>

          {/* Requirements List */}
          {job.requirements && job.requirements.length > 0 && (
            <div>
              <h4 className="font-mono text-label uppercase tracking-widest text-muted mb-3">
                Key Qualifications & Experience
              </h4>
              <ul className="space-y-2 list-none p-0 m-0">
                {job.requirements.map((req, reqIdx) => (
                  <li
                    key={reqIdx}
                    className="text-small text-text/85 font-sans flex items-start gap-3 break-words"
                  >
                    <span className="text-accent font-mono select-none" aria-hidden="true">
                      —
                    </span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Apply Button */}
          <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Button href={mailtoHref} variant="primary" size="md">
              Apply for this Position →
            </Button>
            <span className="font-mono text-xs text-muted">
              Sends an application email directly to {recipientEmail}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default JobRow;
