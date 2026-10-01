/**
 * Architectural Services section with CSS hover image reveal.
 * Developers edit this component to adjust practice disciplines or hover presentation.
 */
import { useState } from 'react';
import { Section } from '@/components/common/Section';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import ResponsiveImage from '@/components/common/ResponsiveImage';
import { homeContent } from '@/data/homeContent';

export function Services() {
  const { services } = homeContent;
  const [activeHoverIndex, setActiveHoverIndex] = useState(0);

  return (
    <Section tone="light" spacing="spacious">
      <Container>
        <SectionHeading
          index="02"
          eyebrow="What We Do"
          title="Disciplines & Methodology"
          description="Our studio approaches every project as an integrated continuum from masterplanning to bespoke interior details."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Numbered Services List */}
          <div className="lg:col-span-7 divide-y divide-line border-y border-line">
            {services.map((service, index) => (
              <div
                key={service.title}
                onMouseEnter={() => setActiveHoverIndex(index)}
                className="py-8 group cursor-pointer transition-colors"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <div className="flex items-baseline gap-6">
                    <span className="font-mono text-small text-accent">0{index + 1}</span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-text group-hover:text-accent transition-colors">
                      {service.title}
                    </h3>
                  </div>
                </div>

                <p className="mt-3 ml-12 text-body text-muted leading-relaxed max-w-xl">
                  {service.description}
                </p>

                {/* Inline Image for Mobile / Touch Devices */}
                <div className="mt-4 ml-12 lg:hidden">
                  <ResponsiveImage
                    publicId={service.image}
                    alt={service.imageAlt}
                    aspectRatio="16/9"
                    sizes="100vw"
                    className="w-full"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Hover Image Reveal Panel (CSS-driven smooth opacity) */}
          <div className="hidden lg:block lg:col-span-5 relative h-[520px] overflow-hidden bg-surface border border-line">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`absolute inset-0 transition-opacity duration-500 ease-out ${
                  activeHoverIndex === index
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-105 pointer-events-none'
                }`}
              >
                <ResponsiveImage
                  publicId={service.image}
                  alt={service.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
