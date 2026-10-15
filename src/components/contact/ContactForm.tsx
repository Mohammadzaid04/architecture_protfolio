/**
 * Architectural client inquiry form with plain React state and TypeScript validation.
 * Supports inline validation, accessible screen reader error links, honeypot spam prevention,
 * minimum time-on-page verification, and Formspree/REST endpoint transmission with mailto fallback.
 *
 * RESPONSIVE BEHAVIOR:
 * - Mobile (360px - 639px): Inputs enforce minimum 16px font-size to prevent iOS Safari auto-zoom.
 * - Touch Targets: All inputs, selects, and action buttons maintain >= 44x44px hit areas.
 * - Layout Stability: Uses a min-h container to eliminate cumulative layout shift (CLS) between states.
 */
import { useState, useRef, useEffect, type FormEvent, type ChangeEvent } from 'react';
import { contactContent } from '@/data/contactContent';
import { siteConfig } from '@/data/siteConfig';

export interface FormData {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  projectLocation: string;
  message: string;
  _gotcha: string; // Honeypot field
}

export interface FormErrors {
  name?: string;
  email?: string;
  projectType?: string;
  message?: string;
  general?: string;
}

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface ContactFormProps {
  /** Optional custom CSS classes */
  className?: string;
}

const INITIAL_FORM_DATA: FormData = {
  name: '',
  email: '',
  phone: '',
  projectType: '',
  projectLocation: '',
  message: '',
  _gotcha: '',
};

/** Minimum duration (in ms) a user must spend on page before submitting to defeat automated spam bots */
const MIN_TIME_ON_PAGE_MS = 2500;

export function ContactForm({ className = '' }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Track component mount timestamp for client-side bot detection
  const mountTimeRef = useRef<number>(0);

  // Input element refs for programmatic focus management on validation failure
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const projectTypeSelectRef = useRef<HTMLSelectElement>(null);
  const messageTextareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    mountTimeRef.current = Date.now();
  }, []);

  // Plain TypeScript email syntax validation
  const isValidEmail = (val: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  // Validate a single field on blur
  const validateField = (field: keyof FormData, value: string): string | undefined => {
    const v = contactContent.form.validation;
    switch (field) {
      case 'name':
        if (!value.trim()) return v.nameRequired;
        break;
      case 'email':
        if (!value.trim()) return v.emailRequired;
        if (!isValidEmail(value)) return v.emailInvalid;
        break;
      case 'projectType':
        if (!value.trim()) return v.projectTypeRequired;
        break;
      case 'message':
        if (!value.trim()) return v.messageRequired;
        if (value.trim().length < 20) return v.messageMinLength;
        break;
      default:
        break;
    }
    return undefined;
  };

  const handleBlur = (field: keyof FormData) => {
    const error = validateField(field, formData[field]);
    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for field while typing if previously errored
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Full form submission handler
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // 1. Spam protection: Honeypot check
    if (formData._gotcha) {
      setErrors({ general: contactContent.form.validation.spamDetected });
      return;
    }

    // 2. Spam protection: Minimum time-on-page check
    const timeOnPage =
      mountTimeRef.current > 0 ? Date.now() - mountTimeRef.current : MIN_TIME_ON_PAGE_MS;
    if (timeOnPage < MIN_TIME_ON_PAGE_MS) {
      setErrors({ general: contactContent.form.validation.tooFast });
      return;
    }

    // 3. Full form validation pass
    const newErrors: FormErrors = {};
    const nameErr = validateField('name', formData.name);
    if (nameErr) newErrors.name = nameErr;

    const emailErr = validateField('email', formData.email);
    if (emailErr) newErrors.email = emailErr;

    const typeErr = validateField('projectType', formData.projectType);
    if (typeErr) newErrors.projectType = typeErr;

    const msgErr = validateField('message', formData.message);
    if (msgErr) newErrors.message = msgErr;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      // Move keyboard focus to the first invalid field
      if (newErrors.name) {
        nameInputRef.current?.focus();
      } else if (newErrors.email) {
        emailInputRef.current?.focus();
      } else if (newErrors.projectType) {
        projectTypeSelectRef.current?.focus();
      } else if (newErrors.message) {
        messageTextareaRef.current?.focus();
      }
      return;
    }

    // 4. Submission transmission
    setStatus('submitting');
    setErrorMessage('');

    const endpoint = import.meta.env.VITE_FORM_ENDPOINT as string | undefined;

    // Check endpoint availability
    if (!endpoint || endpoint.includes('xyzexample')) {
      console.warn(
        'VITE_FORM_ENDPOINT is not defined or is using the placeholder URL. Falling back to client mailto: transmission.',
      );

      // Build structured mailto fallback URL
      const subject = encodeURIComponent(
        `Project Inquiry: ${formData.projectType} — ${formData.name}`,
      );
      const body = encodeURIComponent(
        `Full Name: ${formData.name}\n` +
          `Email: ${formData.email}\n` +
          `Phone: ${formData.phone || 'Not provided'}\n` +
          `Project Typology: ${formData.projectType}\n` +
          `Site Location: ${formData.projectLocation || 'Not provided'}\n\n` +
          `Project Scope & Narrative:\n${formData.message}\n`,
      );

      window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
      setStatus('success');
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          projectType: formData.projectType,
          projectLocation: formData.projectLocation,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        const data = await response.json().catch(() => null);
        setStatus('error');
        setErrorMessage(data?.error || data?.message || contactContent.form.error.message);
      }
    } catch {
      setStatus('error');
      setErrorMessage(contactContent.form.error.message);
    }
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
    setStatus('idle');
    setErrorMessage('');
    mountTimeRef.current = Date.now();
  };

  return (
    <div className={`w-full min-h-[580px] flex flex-col justify-center ${className}`}>
      {/* SUCCESS STATE */}
      {status === 'success' ? (
        <div
          role="status"
          aria-live="polite"
          className="border border-line bg-surface p-8 sm:p-12 text-left space-y-6 animate-fade-in"
        >
          <div className="flex items-center gap-2 text-label font-medium uppercase tracking-widest text-accent">
            <span className="w-2 h-2 rounded-full bg-accent" aria-hidden="true" />
            <span>Submission Acknowledged</span>
          </div>

          <h3 className="font-serif text-3xl sm:text-4xl text-text font-normal leading-tight">
            {contactContent.form.success.title}
          </h3>

          <p className="text-body text-text/85 font-sans leading-relaxed max-w-xl">
            {contactContent.form.success.message}
          </p>

          <div className="pt-4 border-t border-line">
            <button
              type="button"
              onClick={handleReset}
              className="min-h-[44px] px-6 py-2.5 bg-text text-bg hover:opacity-85 text-small font-medium font-sans cursor-pointer transition-opacity focus-visible:outline-accent focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {contactContent.form.success.sendAnother} →
            </button>
          </div>
        </div>
      ) : (
        /* FORM STATE */
        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-6"
          aria-label={contactContent.form.title}
        >
          {/* Honeypot field for bot detection (hidden from human view and assistive tech) */}
          <div className="sr-only" aria-hidden="true">
            <label htmlFor="_gotcha">Leave this field blank</label>
            <input
              id="_gotcha"
              type="text"
              name="_gotcha"
              tabIndex={-1}
              autoComplete="off"
              value={formData._gotcha}
              onChange={handleChange}
            />
          </div>

          {/* Form Top Header */}
          <div className="border-b border-line pb-4">
            <h3 className="font-serif text-2xl sm:text-3xl text-text font-normal">
              {contactContent.form.title}
            </h3>
            <p className="text-small sm:text-body text-muted font-sans mt-1">
              {contactContent.form.description}
            </p>
          </div>

          {/* General / Spam Error Banner */}
          {errors.general && (
            <div
              role="alert"
              aria-live="polite"
              className="p-4 border border-accent/40 bg-accent/10 text-accent text-small font-sans"
            >
              {errors.general}
            </div>
          )}

          {/* Submission Network Error Banner */}
          {status === 'error' && (
            <div
              role="alert"
              aria-live="polite"
              className="p-5 border border-accent bg-accent/10 space-y-3"
            >
              <h4 className="font-serif text-xl text-text font-medium">
                {contactContent.form.error.title}
              </h4>
              <p className="text-small text-text/85 font-sans">
                {errorMessage || contactContent.form.error.message}
              </p>
              <p className="text-small text-muted font-sans">
                {contactContent.form.error.fallbackPrefix}{' '}
                <a href={`mailto:${siteConfig.email}`} className="text-text underline font-medium">
                  {siteConfig.email}
                </a>{' '}
                or call{' '}
                <a
                  href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
                  className="text-text underline font-medium"
                >
                  {siteConfig.phone}
                </a>
                .
              </p>
            </div>
          )}

          {/* Field 1: Full Name */}
          <div className="space-y-1.5">
            <label
              htmlFor="contact-name"
              className="block font-mono text-xs uppercase tracking-widest text-text font-medium"
            >
              {contactContent.form.labels.name}{' '}
              <span className="text-accent" aria-hidden="true">
                *
              </span>
              <span className="sr-only">(required)</span>
            </label>
            <input
              ref={nameInputRef}
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={formData.name}
              onChange={handleChange}
              onBlur={() => handleBlur('name')}
              placeholder={contactContent.form.placeholders.name}
              aria-describedby={errors.name ? 'contact-name-error' : undefined}
              aria-invalid={Boolean(errors.name)}
              className={`w-full min-h-[48px] px-4 py-3 bg-surface border text-base font-sans text-text placeholder:text-muted/60 rounded-none focus:outline-none focus:ring-2 focus:ring-accent transition-colors ${
                errors.name ? 'border-accent ring-1 ring-accent' : 'border-line'
              }`}
            />
            {errors.name && (
              <p
                id="contact-name-error"
                role="alert"
                aria-live="polite"
                className="font-sans text-xs text-accent mt-1"
              >
                {errors.name}
              </p>
            )}
          </div>

          {/* Field 2 & 3: Email and Phone (2 columns on tablet/desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Email */}
            <div className="space-y-1.5">
              <label
                htmlFor="contact-email"
                className="block font-mono text-xs uppercase tracking-widest text-text font-medium"
              >
                {contactContent.form.labels.email}{' '}
                <span className="text-accent" aria-hidden="true">
                  *
                </span>
                <span className="sr-only">(required)</span>
              </label>
              <input
                ref={emailInputRef}
                id="contact-email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur('email')}
                placeholder={contactContent.form.placeholders.email}
                aria-describedby={errors.email ? 'contact-email-error' : undefined}
                aria-invalid={Boolean(errors.email)}
                className={`w-full min-h-[48px] px-4 py-3 bg-surface border text-base font-sans text-text placeholder:text-muted/60 rounded-none focus:outline-none focus:ring-2 focus:ring-accent transition-colors ${
                  errors.email ? 'border-accent ring-1 ring-accent' : 'border-line'
                }`}
              />
              {errors.email && (
                <p
                  id="contact-email-error"
                  role="alert"
                  aria-live="polite"
                  className="font-sans text-xs text-accent mt-1"
                >
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone (Optional) */}
            <div className="space-y-1.5">
              <label
                htmlFor="contact-phone"
                className="block font-mono text-xs uppercase tracking-widest text-text font-medium"
              >
                {contactContent.form.labels.phone}
              </label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder={contactContent.form.placeholders.phone}
                className="w-full min-h-[48px] px-4 py-3 bg-surface border border-line text-base font-sans text-text placeholder:text-muted/60 rounded-none focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
              />
            </div>
          </div>

          {/* Field 4 & 5: Project Type & Project Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Project Typology */}
            <div className="space-y-1.5">
              <label
                htmlFor="contact-project-type"
                className="block font-mono text-xs uppercase tracking-widest text-text font-medium"
              >
                {contactContent.form.labels.projectType}{' '}
                <span className="text-accent" aria-hidden="true">
                  *
                </span>
                <span className="sr-only">(required)</span>
              </label>
              <select
                ref={projectTypeSelectRef}
                id="contact-project-type"
                name="projectType"
                required
                value={formData.projectType}
                onChange={handleChange}
                onBlur={() => handleBlur('projectType')}
                aria-describedby={errors.projectType ? 'contact-type-error' : undefined}
                aria-invalid={Boolean(errors.projectType)}
                className={`w-full min-h-[48px] px-4 py-3 bg-surface border text-base font-sans text-text rounded-none focus:outline-none focus:ring-2 focus:ring-accent transition-colors cursor-pointer ${
                  errors.projectType ? 'border-accent ring-1 ring-accent' : 'border-line'
                }`}
              >
                <option value="">{contactContent.form.placeholders.projectTypeSelect}</option>
                {contactContent.projectTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.projectType && (
                <p
                  id="contact-type-error"
                  role="alert"
                  aria-live="polite"
                  className="font-sans text-xs text-accent mt-1"
                >
                  {errors.projectType}
                </p>
              )}
            </div>

            {/* Project Location (Optional) */}
            <div className="space-y-1.5">
              <label
                htmlFor="contact-location"
                className="block font-mono text-xs uppercase tracking-widest text-text font-medium"
              >
                {contactContent.form.labels.projectLocation}
              </label>
              <input
                id="contact-location"
                name="projectLocation"
                type="text"
                value={formData.projectLocation}
                onChange={handleChange}
                placeholder={contactContent.form.placeholders.projectLocation}
                className="w-full min-h-[48px] px-4 py-3 bg-surface border border-line text-base font-sans text-text placeholder:text-muted/60 rounded-none focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
              />
            </div>
          </div>

          {/* Field 6: Message Narrative */}
          <div className="space-y-1.5">
            <label
              htmlFor="contact-message"
              className="block font-mono text-xs uppercase tracking-widest text-text font-medium"
            >
              {contactContent.form.labels.message}{' '}
              <span className="text-accent" aria-hidden="true">
                *
              </span>
              <span className="sr-only">(required)</span>
            </label>
            <textarea
              ref={messageTextareaRef}
              id="contact-message"
              name="message"
              rows={5}
              required
              value={formData.message}
              onChange={handleChange}
              onBlur={() => handleBlur('message')}
              placeholder={contactContent.form.placeholders.message}
              aria-describedby={errors.message ? 'contact-message-error' : undefined}
              aria-invalid={Boolean(errors.message)}
              className={`w-full px-4 py-3 bg-surface border text-base font-sans text-text placeholder:text-muted/60 rounded-none focus:outline-none focus:ring-2 focus:ring-accent transition-colors resize-y ${
                errors.message ? 'border-accent ring-1 ring-accent' : 'border-line'
              }`}
            />
            {errors.message && (
              <p
                id="contact-message-error"
                role="alert"
                aria-live="polite"
                className="font-sans text-xs text-accent mt-1"
              >
                {errors.message}
              </p>
            )}
          </div>

          {/* Submit Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={status === 'submitting'}
              className={`w-full sm:w-auto min-h-[52px] px-8 py-3.5 bg-text text-bg hover:opacity-85 active:opacity-95 text-body font-medium font-sans cursor-pointer transition-opacity focus-visible:outline-accent focus-visible:outline-2 focus-visible:outline-offset-2 ${
                status === 'submitting' ? 'opacity-60 cursor-not-allowed' : ''
              }`}
            >
              {status === 'submitting'
                ? contactContent.form.submit.submitting
                : status === 'error'
                  ? contactContent.form.submit.retry
                  : contactContent.form.submit.idle}{' '}
              →
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default ContactForm;
