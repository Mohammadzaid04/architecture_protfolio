/**
 * Master composition component for the Home page.
 * Developers edit this file to reorder or toggle homepage sections.
 */
import { Hero } from './Hero';
import { Intro } from './Intro';
import { FeaturedProjects } from './FeaturedProjects';
import { CinematicBand } from './CinematicBand';
import { Services } from './Services';
import { SelectedProject } from './SelectedProject';
import { Clients } from './Clients';
import { Cta } from './Cta';

/**
 * High-performance architectural studio homepage view.
 */
export function Home() {
  return (
    <div className="w-full">
      <Hero />
      <Intro />
      <FeaturedProjects />
      <CinematicBand />
      <Services />
      <SelectedProject />
      <Clients />
      <Cta />
    </div>
  );
}
