/**
 * Full-width atmospheric video band section.
 * Developers edit this component to change the middle-page cinematic narrative.
 */
import BackgroundVideo from '@/components/common/BackgroundVideo';
import { homeContent } from '@/data/homeContent';

export function CinematicBand() {
  const { cinematicBand } = homeContent;

  return (
    <section className="relative w-full overflow-hidden h-[60svh] min-h-[320px] max-h-[1200px] md:h-[70svh] lg:h-[80vh]">
      <BackgroundVideo
        url={cinematicBand.video.url}
        posterId={cinematicBand.poster}
        posterAlt={cinematicBand.posterAlt}
      />
      {/* Dark overlay so text stays readable */}
      <div className="absolute inset-0 bg-black/40" />
      {/* Text stays in a centered container */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col items-center justify-center px-6 text-center md:px-10 space-y-4">
        <span className="text-label uppercase tracking-widest font-mono text-dark-accent">
          {cinematicBand.eyebrow}
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-6xl leading-[1.05] tracking-tight text-dark-text max-w-5xl">
          {cinematicBand.headline}
        </h2>
      </div>
    </section>
  );
}
