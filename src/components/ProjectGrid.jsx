import { m } from 'framer-motion';
import { Link } from 'react-router-dom';
import FadeImage from './FadeImage';
import { reveal } from '../lib/motion';
import { IN_APP } from '../lib/navigation';

export default function ProjectGrid({ projects }) {
  if (projects.length === 0) return <ComingSoon />;

  return (
    <main className="px-8 pb-24 md:px-16">
      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 lg:grid-cols-3">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} delay={0.15 + i * 0.08} eager={i < 3} />
        ))}
      </div>
    </main>
  );
}

function ProjectCard({ project, delay, eager }) {
  return (
    <m.div {...reveal(delay)}>
      <Link to={`/work/${project.slug}`} state={IN_APP} className="group block">
        <div className="relative mb-4 aspect-square overflow-hidden bg-vandyke/5">
          <FadeImage
            src={project.image}
            alt={project.name}
            delay={delay}
            loading={eager ? 'eager' : 'lazy'}
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="h-full w-full object-cover group-hover:scale-105"
          />
          {/* Desktop overlay with name and year. The caption below already
              says both, so it's hidden from screen readers. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 hidden items-center justify-center bg-paper/90 opacity-0 backdrop-blur-sm transition-opacity duration-700 ease-luxe group-hover:opacity-100 group-focus-visible:opacity-100 md:flex"
          >
            <div className="text-center">
              <h3 className="mb-1 text-lg tracking-soft">{project.name}</h3>
              <p className="label text-vandyke/80">{project.year}</p>
            </div>
          </div>
        </div>

        <p className="text-xs tracking-luxe text-vandyke/80">
          {project.description}, {project.year}
        </p>
      </Link>
    </m.div>
  );
}

export function ComingSoon() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <p className="text-sm tracking-loose text-vandyke/80">Coming soon…</p>
    </div>
  );
}

export function CategoryHeader({ children }) {
  return (
    <m.div {...reveal()} className="px-8 pb-12 pt-32 text-center md:px-16">
      <h1 className="text-3xl tracking-luxe">{children}</h1>
    </m.div>
  );
}
