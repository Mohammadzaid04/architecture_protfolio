/**
 * Careers page view component.
 * Developers edit this page to manage recruitment copy, open job positions listing,
 * studio culture notes, and application guidelines.
 */
import { jobs } from '@/data/jobs';

export function Careers() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-light tracking-tight text-neutral-900">Join the Studio</h1>
      <p className="mt-4 text-lg text-neutral-600 max-w-2xl">
        Careers page placeholder. In upcoming phases, this will detail studio culture, employee
        benefits, open roles, and application instructions.
      </p>

      <div className="mt-12 space-y-6">
        {jobs.map((job) => (
          <div key={job.title} className="p-6 border border-neutral-200 bg-white">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-medium text-neutral-900">{job.title}</h2>
                <span className="text-xs text-neutral-500 mt-1 block">
                  {job.type} • {job.location}
                </span>
              </div>
            </div>
            <p className="text-sm text-neutral-600 mt-3">{job.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
