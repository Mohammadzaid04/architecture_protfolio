/**
 * Full-screen accessible image lightbox component.
 * Developers invoke this modal from gallery layouts to display high-resolution architectural photography.
 *
 * RESPONSIVE & ACCESSIBILITY BEHAVIOR:
 * - Mobile (360px): Full-bleed viewport with touch swipe gestures (left/right) and safe-area padding for notches.
 * - Tablet & Desktop: Floating high-res image container with keyboard arrows, on-screen buttons, and focus trapping.
 * - Touch Targets: All interactive buttons (close, prev, next) enforce >= 44x44px hit areas.
 * - Focus Management: Focus is trapped inside the lightbox and returned to the trigger element on close.
 */
import { useEffect, useRef, useState, useCallback } from 'react';
import type { ProjectGalleryItem } from '@/types';
import { cloudinaryUrl } from '@/utils/cloudinary';

export interface LightboxProps {
  /** Array of gallery items */
  images: (string | ProjectGalleryItem)[];
  /** Currently active image index */
  currentIndex: number;
  /** Whether the lightbox modal is visible */
  isOpen: boolean;
  /** Close handler function */
  onClose: () => void;
  /** Change index handler function */
  onNavigate: (newIndex: number) => void;
  /** Ref to element that triggered the lightbox (to restore focus upon closing) */
  triggerRef?: React.RefObject<HTMLElement | null>;
}

export function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
  triggerRef,
}: LightboxProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const touchStartXRef = useRef<number>(0);
  const touchStartYRef = useRef<number>(0);
  const [touchDeltaX, setTouchDeltaX] = useState<number>(0);

  const total = images.length;
  const currentItem = images[currentIndex];

  // Extract public ID, alt text, and caption safely
  const publicId = typeof currentItem === 'string' ? currentItem : currentItem?.publicId || '';
  const altText =
    typeof currentItem === 'string'
      ? `Architectural photograph ${currentIndex + 1} of ${total}`
      : currentItem?.alt || `Architectural photograph ${currentIndex + 1} of ${total}`;
  const caption = typeof currentItem === 'object' ? currentItem?.caption : undefined;

  // Navigation handlers
  const handlePrev = useCallback(() => {
    if (total <= 1) return;
    onNavigate((currentIndex - 1 + total) % total);
  }, [currentIndex, total, onNavigate]);

  const handleNext = useCallback(() => {
    if (total <= 1) return;
    onNavigate((currentIndex + 1) % total);
  }, [currentIndex, total, onNavigate]);

  // Lock body scroll and set initial focus
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Capture trigger element reference when opening for safe restoration on close
    const triggerEl = triggerRef?.current;

    // Set initial focus to the close button for accessibility
    const timer = setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    return () => {
      document.body.style.overflow = originalOverflow;
      clearTimeout(timer);
      // Return focus to the trigger element when closing
      if (triggerEl) {
        triggerEl.focus();
      }
    };
  }, [isOpen, triggerRef]);

  // Keyboard navigation & focus trap
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
        return;
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
        return;
      }

      // Focus trap
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleNext, handlePrev, onClose]);

  // Touch swipe handling for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
    setTouchDeltaX(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = currentX - touchStartXRef.current;
    const diffY = currentY - touchStartYRef.current;

    // Only track if horizontal movement is dominant
    if (Math.abs(diffX) > Math.abs(diffY)) {
      setTouchDeltaX(diffX);
    }
  };

  const handleTouchEnd = () => {
    if (Math.abs(touchDeltaX) > 50) {
      if (touchDeltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setTouchDeltaX(0);
  };

  if (!isOpen || !currentItem) return null;

  // High-resolution image URL (loaded on demand only when lightbox is opened)
  const highResSrc = publicId.startsWith('http') ? publicId : cloudinaryUrl(publicId, 2400);

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-label="High-resolution photo lightbox"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md select-none touch-none"
      onClick={onClose}
    >
      {/* Top Bar: Counter & Close button with safe-area insets */}
      <div
        className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-4 sm:px-8 pt-[max(1rem,var(--sat))] pb-4 bg-gradient-to-b from-black/80 to-transparent pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="font-mono text-sm tracking-wider text-neutral-300">
          {currentIndex + 1} <span className="text-neutral-500">/</span> {total}
        </span>

        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          className="min-h-[44px] min-w-[44px] flex items-center justify-center text-neutral-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label="Close lightbox (Press Escape)"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Main Image Stage */}
      <div
        className="relative w-full h-full flex items-center justify-center p-4 sm:p-12 md:p-16"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="relative max-w-full max-h-full flex flex-col items-center justify-center transition-transform duration-150 ease-out"
          style={{ transform: touchDeltaX ? `translateX(${touchDeltaX * 0.4}px)` : 'none' }}
        >
          <img
            src={highResSrc}
            alt={altText}
            decoding="async"
            className="max-h-[75vh] sm:max-h-[82vh] max-w-[92vw] object-contain shadow-2xl"
          />

          {/* Optional Caption & Alt Text */}
          <div className="mt-4 px-4 text-center max-w-2xl">
            {caption && (
              <p className="font-sans text-sm sm:text-base text-neutral-200">{caption}</p>
            )}
            <p className="font-mono text-xs text-neutral-400 mt-1">{altText}</p>
          </div>
        </div>
      </div>

      {/* Navigation Buttons (Left/Right) */}
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-2 sm:left-6 z-20 min-h-[44px] min-w-[44px] flex items-center justify-center text-neutral-400 hover:text-white transition-colors bg-black/40 hover:bg-black/60 rounded-full border border-white/10 p-2 sm:p-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Previous photograph"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-2 sm:right-6 z-20 min-h-[44px] min-w-[44px] flex items-center justify-center text-neutral-400 hover:text-white transition-colors bg-black/40 hover:bg-black/60 rounded-full border border-white/10 p-2 sm:p-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Next photograph"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}

      {/* Mobile Swipe Guidance Indicator */}
      <div className="sm:hidden absolute bottom-4 inset-x-0 text-center pointer-events-none pb-[max(0.5rem,var(--sab))]">
        <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest bg-black/60 px-3 py-1 rounded-full border border-white/10">
          Swipe left or right
        </span>
      </div>
    </div>
  );
}
