/**
 * Contact page view component composing the PageHeader, two-column responsive layout,
 * accessible ContactForm, studio direct channels, and MapEmbed facade.
 *
 * RESPONSIVE BEHAVIOR:
 * - Mobile (360px - 1023px): Stacked single column with the contact inquiry form FIRST,
 *   followed by studio details and the interactive location map facade.
 * - Desktop (1024px+): Two-column layout: details column on the left (5 cols),
 *   inquiry form on the right (7 cols).
 * - Single H1 tag on the page via PageHeader.
 * - Solid navbar state inherited from Layout shell.
 */
import { useDocumentHead } from '@/hooks/useDocumentHead';
import { contactContent } from '@/data/contactContent';
import { siteConfig } from '@/data/siteConfig';
import { Section } from '@/components/common/Section';
import { Container } from '@/components/common/Container';
import { PageHeader } from '@/components/common/PageHeader';
import { ContactForm } from '@/components/contact/ContactForm';
import { MapEmbed } from '@/components/contact/MapEmbed';

export function Contact() {
  // Set document title and SEO meta description
  useDocumentHead(contactContent.seo.title, contactContent.seo.description);

  // Filter only filled social media links
  const activeSocials = Object.entries(siteConfig.socialLinks || {}).filter(([, url]) =>
    Boolean(url && url.trim().length > 0),
  );

  // Clean WhatsApp international phone number link
  const cleanWhatsAppNumber = siteConfig.whatsappNumber
    ? siteConfig.whatsappNumber.replace(/[^0-9]/g, '')
    : '';
  const whatsAppUrl = cleanWhatsAppNumber ? `https://wa.me/${cleanWhatsAppNumber}` : '';

  // Telephone click-to-call href
  const telHref = `tel:${siteConfig.phone.replace(/[^0-9+]/g, '')}`;

  return (
    <article className="pt-10 sm:pt-14 md:pt-16 pb-20 sm:pb-28">
      {/* 1. Page Header with Single H1 */}
      <Section tone="light" spacing="none" className="pb-12 sm:pb-16">
        <Container>
          <PageHeader
            eyebrow={contactContent.header.eyebrow}
            title={contactContent.header.title}
            intro={contactContent.header.intro}
          />
        </Container>
      </Section>

      {/* 2. Main Inquiry Section: Details Left, Form Right on Desktop; Form FIRST on Mobile */}
      <Section tone="light" spacing="compact" className="border-t border-line">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* 
              Details Column:
              - Desktop (lg+): Left column (5 cols), order-1
              - Mobile (< lg): Stacked SECOND below form, order-2
            */}
            <div className="order-2 lg:order-1 lg:col-span-5 space-y-10 sm:space-y-12">
              {/* Physical Studio Address */}
              <div className="border-t border-line pt-6">
                <span className="font-mono text-label uppercase tracking-widest text-accent font-semibold block mb-3">
                  Atelier Address
                </span>
                <address className="not-italic text-body text-text font-sans leading-relaxed break-words">
                  <p>{siteConfig.address}</p>
                </address>
              </div>

              {/* Direct Communication Channels */}
              <div className="border-t border-line pt-6">
                <span className="font-mono text-label uppercase tracking-widest text-accent font-semibold block mb-3">
                  Direct Inquiries
                </span>
                <div className="space-y-3 font-sans text-body">
                  {/* Telephone Click-to-Call Link */}
                  <div>
                    <span className="font-mono text-xs text-muted block mb-0.5">Telephone</span>
                    <a
                      href={telHref}
                      className="text-text hover:text-accent font-medium underline underline-offset-4 transition-colors min-h-[44px] inline-flex items-center"
                    >
                      {siteConfig.phone}
                    </a>
                  </div>

                  {/* Mailto Link */}
                  <div>
                    <span className="font-mono text-xs text-muted block mb-0.5">
                      Electronic Mail
                    </span>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-text hover:text-accent font-medium underline underline-offset-4 transition-colors break-words min-h-[44px] inline-flex items-center"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </div>

                {/* WhatsApp Button (Hidden if whatsappNumber is empty) */}
                {Boolean(whatsAppUrl) && (
                  <div className="mt-6">
                    <a
                      href={whatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-6 py-2.5 bg-surface border border-line text-text hover:border-text active:bg-surface/80 text-small font-medium font-sans transition-colors focus-visible:outline-accent focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                      <svg
                        className="w-4 h-4 text-accent"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.074-2.115-.515-1.701-.703-2.777-2.438-2.862-2.551-.085-.114-.688-.916-.688-1.748 0-.832.434-1.242.588-1.411.155-.169.34-.212.453-.212.114 0 .228.001.328.006.105.006.246-.04.385.295.144.346.491 1.198.533 1.284.043.085.071.186.014.3-.056.115-.085.186-.17.285-.085.1-.179.223-.256.3-.086.086-.176.18-.076.352.1.171.444.733.953 1.186.657.585 1.21.766 1.382.852.17.086.27.071.37-.043.1-.115.428-.499.542-.67.114-.172.228-.143.385-.085.157.057.999.471 1.17.557.171.086.286.128.328.2.043.072.043.415-.101.82z" />
                      </svg>
                      <span>{contactContent.directChannels.whatsappLabel}</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Office Operating Hours */}
              <div className="border-t border-line pt-6">
                <span className="font-mono text-label uppercase tracking-widest text-accent font-semibold block mb-3">
                  {contactContent.officeHours.title}
                </span>
                <ul className="space-y-1.5 list-none p-0 m-0 font-sans text-small text-muted">
                  {contactContent.officeHours.hours.map((line, idx) => (
                    <li key={idx} className="break-words">
                      {line}
                    </li>
                  ))}
                </ul>
                <p className="font-sans text-xs text-muted/80 mt-3 italic">
                  {contactContent.officeHours.note}
                </p>
              </div>

              {/* Active Social Media Profiles */}
              {activeSocials.length > 0 && (
                <div className="border-t border-line pt-6">
                  <span className="font-mono text-label uppercase tracking-widest text-accent font-semibold block mb-3">
                    Studio Followings
                  </span>
                  <div className="flex flex-wrap gap-4">
                    {activeSocials.map(([platform, url]) => (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-small text-muted hover:text-text capitalize underline underline-offset-4 transition-colors min-h-[44px] inline-flex items-center"
                      >
                        {platform} ↗
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 
              Form Column:
              - Desktop (lg+): Right column (7 cols), order-2
              - Mobile (< lg): Stacked FIRST above details, order-1
            */}
            <div className="order-1 lg:order-2 lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. Location Map Embed Section with Facade */}
      <Section tone="light" spacing="compact" className="border-t border-line">
        <Container>
          <div className="mb-8">
            <span className="font-mono text-label uppercase tracking-widest text-muted block mb-2">
              Studio Presence
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-text font-normal">
              {contactContent.map.subtitle}
            </h2>
          </div>

          <MapEmbed />
        </Container>
      </Section>
    </article>
  );
}

export default Contact;
