/**
 * Client logo strip component.
 * Developers edit this component to modify client partner presentations or logo marquee speeds.
 */
import { Section } from '@/components/common/Section';
import { Container } from '@/components/common/Container';
import ResponsiveImage from '@/components/common/ResponsiveImage';
import { homeContent } from '@/data/homeContent';

export function Clients() {
  const { clients } = homeContent;

  return (
    <Section tone="light" spacing="compact" className="border-t border-line">
      <Container>
        <p className="text-center text-label uppercase tracking-widest font-mono text-muted mb-10">
          Selected Institutional & Cultural Collaborators
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 items-center justify-items-center">
          {clients.map((client) => (
            <div
              key={client.name}
              className="relative h-10 w-36 flex items-center justify-center text-muted hover:text-text transition-colors duration-300"
              title={client.name}
            >
              <ResponsiveImage
                publicId={client.logo}
                alt={client.name}
                fill
                fit="contain"
                className="!bg-transparent filter grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
