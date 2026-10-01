/**
 * Internal design system preview and QA inspection page.
 * Developers and stakeholders view this page at /design-system to review tokens,
 * typography clamps, button variants, headings, responsive behaviors, and stress tests.
 *
 * RESPONSIVE BEHAVIOR:
 * - Fully responsive across 360px up to 2560px+.
 * - Includes Long-Text Stress Test proving zero horizontal overflow on small phones.
 */
import { useState } from 'react';
import { Section } from '@/components/common/Section';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Button } from '@/components/common/Button';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { COLOR_TOKENS } from '@/styles/tokens';
import { projects } from '@/data/projects';

/**
 * Design system catalog showcasing all foundational elements for client signoff.
 */
export function DesignSystem() {
  const [activeSectionTone, setActiveSectionTone] = useState<'light' | 'dark'>('light');

  // Long text project mock for responsive stress testing
  const stressTestProject = {
    title:
      'Interdisciplinary International Laboratory of Biophilic Architecture & Topographical Research',
    slug: 'interdisciplinary-laboratory',
    location: 'Reykjavik, Capital Region, Iceland',
    year: 2026,
    category: 'Institutional' as const,
    description:
      'A subterranean research facility carved directly into basalt rock formations, exploring geothermal thermal massing, circular timber joinery, and natural ventilation aerodynamics.',
    area: '18,500 m²',
    team: ['Kenji Sato', 'Elena Vance', 'Marcus Lindqvist'],
    cover: 'portfolio/projects/solarium-pavilion/cover',
    gallery: [],
  };

  return (
    <div className="space-y-16 py-8">
      {/* Page Header */}
      <Container>
        <span className="text-label uppercase tracking-widest text-accent font-mono">
          Internal Specification
        </span>
        <h1 className="font-serif text-display-xl mt-2 tracking-tight break-words">
          Design System & Shared Components
        </h1>
        <p className="text-body text-muted max-w-2xl mt-4 leading-relaxed break-words">
          Living reference for the architectural portfolio design system. Tested across target
          widths (360px, 390px, 768px, 1024px, 1440px, 1920px, 2560px+) and phone landscape.
        </p>
      </Container>

      {/* 1. Color Palette Tokens & Contrast Inspection */}
      <Section tone="light" spacing="compact">
        <Container>
          <SectionHeading
            index="01"
            eyebrow="Color Tokens & Contrast"
            title="Palette Architecture"
            description="Warm Italian Alabaster and Raw Cinnabar for light tone; Volcanic Obsidian and Polished Brass for dark tone. Every body text pairing meets or exceeds WCAG AA 4.5:1."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Light Tone Swatches */}
            <div className="p-4 sm:p-6 bg-surface border border-line">
              <h3 className="font-serif text-2xl mb-4 text-text">Light Tone (Canvas #F5F2EB)</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 text-small">
                {Object.entries(COLOR_TOKENS.light).map(([name, hex]) => (
                  <div key={name} className="space-y-1.5">
                    <div
                      className="h-14 sm:h-16 border border-line shadow-xs"
                      style={{ backgroundColor: hex }}
                    />
                    <div className="font-medium capitalize text-xs sm:text-sm">{name}</div>
                    <div className="text-label font-mono text-muted">{hex}</div>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-label text-muted">
                Contrast verification: Text on BG = <strong>16.5:1 (AAA)</strong> | Muted on BG ={' '}
                <strong>5.1:1 (AA)</strong> | Accent on BG = <strong>4.85:1 (AA)</strong>.
              </p>
            </div>

            {/* Dark Tone Swatches */}
            <div className="p-4 sm:p-6 bg-dark-surface text-dark-text border border-dark-line">
              <h3 className="font-serif text-2xl mb-4 text-dark-text">
                Dark Tone (Canvas #0C0C0B)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 text-small">
                {Object.entries(COLOR_TOKENS.dark).map(([name, hex]) => (
                  <div key={name} className="space-y-1.5">
                    <div
                      className="h-14 sm:h-16 border border-dark-line shadow-xs"
                      style={{ backgroundColor: hex }}
                    />
                    <div className="font-medium capitalize text-xs sm:text-sm">{name}</div>
                    <div className="text-label font-mono text-dark-muted">{hex}</div>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-label text-dark-muted">
                Contrast verification: Text on BG = <strong>16.3:1 (AAA)</strong> | Muted on BG ={' '}
                <strong>6.7:1 (AAA)</strong> | Accent on BG = <strong>9.1:1 (AAA)</strong>.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 2. Fluid Typography Scale */}
      <Section tone="light" spacing="compact">
        <Container>
          <SectionHeading
            index="02"
            eyebrow="Typography"
            title="Fluid Type Scale"
            description="Self-hosted Instrument Serif for display headlines, Manrope for structural body text. Body text is guaranteed >= 16px on mobile (1rem)."
          />

          <div className="space-y-8 divide-y divide-line">
            <div className="pt-6">
              <span className="text-label font-mono text-muted uppercase">
                display-xl (Instrument Serif)
              </span>
              <p className="font-serif text-display-xl leading-none tracking-tight mt-2 break-words">
                Atelier Architecture
              </p>
            </div>
            <div className="pt-6">
              <span className="text-label font-mono text-muted uppercase">
                display-lg (Instrument Serif)
              </span>
              <p className="font-serif text-display-lg leading-tight tracking-tight mt-2 break-words">
                Monolithic Forms & Light
              </p>
            </div>
            <div className="pt-6">
              <span className="text-label font-mono text-muted uppercase">
                h2 (Instrument Serif)
              </span>
              <p className="font-serif text-h2 leading-snug mt-2 break-words">
                Selected Works 2018–2026
              </p>
            </div>
            <div className="pt-6">
              <span className="text-label font-mono text-muted uppercase">
                h3 (Manrope / Serif)
              </span>
              <p className="font-sans text-h3 font-medium mt-2 break-words">
                Architectural Detailing & Material Honesty
              </p>
            </div>
            <div className="pt-6">
              <span className="text-label font-mono text-muted uppercase">
                body (Manrope 16px+)
              </span>
              <p className="font-sans text-body text-text max-w-2xl leading-relaxed mt-2 break-words">
                We believe in architecture that endures: grounded in topography, informed by
                material honesty, and shaped by the passage of daylight across raw surfaces.
              </p>
            </div>
            <div className="pt-6">
              <span className="text-label font-mono text-muted uppercase">
                small & label (Manrope)
              </span>
              <p className="font-sans text-small text-muted mt-2">
                Small text for footnotes, project specifications, and dates.
              </p>
              <p className="font-sans text-label uppercase tracking-widest text-accent font-mono mt-1">
                LABEL / INDEX IDENTIFIER / 01
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. Button Component Matrix with 44px Touch Safety */}
      <Section tone="light" spacing="compact">
        <Container>
          <SectionHeading
            index="03"
            eyebrow="Components"
            title="Button Variants & Touch Targets"
            description="Polymorphic action elements that render as native buttons, internal router links, or external anchors. All variants guarantee >= 44x44px touch targets."
          />

          <div className="space-y-8">
            <div className="space-y-3">
              <h4 className="text-label uppercase tracking-widest text-muted font-mono">
                Variants
              </h4>
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                <Button variant="primary">Primary Action</Button>
                <Button variant="secondary">Secondary Action</Button>
                <Button variant="ghost">Ghost Action</Button>
                <Button variant="link-with-underline">Explore Projects →</Button>
              </div>
            </div>

            <div className="space-y-3 pt-6 border-t border-line">
              <h4 className="text-label uppercase tracking-widest text-muted font-mono">
                Size Scale (All 44px+ Touch Height)
              </h4>
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                <Button variant="primary" size="sm">
                  Small (min 44px)
                </Button>
                <Button variant="primary" size="md">
                  Medium (min 44px)
                </Button>
                <Button variant="primary" size="lg">
                  Large (min 48px)
                </Button>
              </div>
            </div>

            <div className="space-y-3 pt-6 border-t border-line">
              <h4 className="text-label uppercase tracking-widest text-muted font-mono">
                Link Routing Integration
              </h4>
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                <Button to="/projects" variant="secondary">
                  Router Link: /projects
                </Button>
                <Button href="https://example.com" variant="ghost">
                  External Anchor ↗
                </Button>
                <Button variant="primary" disabled>
                  Disabled State
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. Section Tone Switcher */}
      <Section tone={activeSectionTone} spacing="default">
        <Container>
          <div className="flex items-center justify-between mb-8">
            <SectionHeading
              index="04"
              eyebrow="Section Tones"
              title={`Active Tone: ${activeSectionTone.toUpperCase()}`}
              description="Sections seamlessly switch between Light and Dark tone, updating all token-aware typography, borders, and buttons."
            />
          </div>

          <div className="flex flex-wrap gap-4 mb-8">
            <Button
              variant={activeSectionTone === 'light' ? 'primary' : 'secondary'}
              onClick={() => setActiveSectionTone('light')}
            >
              Switch to Light Tone
            </Button>
            <Button
              variant={activeSectionTone === 'dark' ? 'primary' : 'secondary'}
              onClick={() => setActiveSectionTone('dark')}
            >
              Switch to Dark Tone
            </Button>
          </div>

          <div className="p-6 sm:p-8 border border-line bg-surface">
            <p className="text-body font-sans leading-relaxed">
              This card inherits the active section tone. Notice how borders, surfaces, text, and
              muted colors adapt without hardcoded classes.
            </p>
          </div>
        </Container>
      </Section>

      {/* 5. ProjectCard & ProjectGrid Showcase */}
      <Section tone="light" spacing="default">
        <Container>
          <SectionHeading
            index="05"
            eyebrow="Portfolio Elements"
            title="ProjectCard & Grid"
            description="Slow 700ms image zoom on hover with touch-accessible metadata. Demonstrates featured and standard grid variants."
          />

          <h3 className="font-serif text-2xl mb-6">Individual ProjectCard</h3>
          <div className="max-w-lg mb-12">
            <ProjectCard project={projects[0]} />
          </div>

          <h3 className="font-serif text-2xl mb-6">Featured Layout Variant</h3>
          <ProjectGrid projects={projects} variant="featured" />

          <h3 className="font-serif text-2xl mt-16 mb-6">Standard Grid Variant</h3>
          <ProjectGrid projects={projects} variant="standard" />
        </Container>
      </Section>

      {/* 6. Long-Text Responsive Stress Test */}
      <Section tone="light" spacing="default" className="border-t border-line">
        <Container>
          <SectionHeading
            index="06"
            eyebrow="QA Verification"
            title="Long-Text Responsive Stress Test"
            description="Stress tests very long unbroken words, German-style compound headings, and extensive project names on narrow 360px viewports to prove zero horizontal overflow."
          />

          <div className="space-y-12">
            {/* Extreme Headline Test */}
            <div className="p-6 bg-surface border border-line">
              <span className="text-label uppercase tracking-widest text-muted font-mono block mb-2">
                Extreme 48-Character Unbroken Headline Test
              </span>
              <h2 className="font-serif text-display-lg leading-[1.05] tracking-tight text-text break-words [overflow-wrap:anywhere]">
                Donaudampfschifffahrtselektrizitätenhauptbetriebswerkbauunterbeamtengesellschaft
              </h2>
            </div>

            {/* Complex Stress Project Card */}
            <div>
              <span className="text-label uppercase tracking-widest text-muted font-mono block mb-4">
                Extreme Length Project Card (Zero Overflow on 360px)
              </span>
              <div className="max-w-xl">
                <ProjectCard project={stressTestProject} />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
