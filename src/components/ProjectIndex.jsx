import { useRef, useState } from 'react';
import { m } from 'framer-motion';
import { Link } from 'react-router-dom';
import FadeImage from './FadeImage';
import { ComingSoon } from './ProjectGrid';
import { reveal } from '../lib/motion';
import { IN_APP } from '../lib/navigation';
import useMediaQuery from '../lib/useMediaQuery';

// Each kind of work keeps its own proportions, both in the hover preview and
// in the thumbnails phones get instead: physical work square, phone work 9:16,
// desktop work 16:9.
const SHAPES = {
  physical: { width: 320, height: 320, thumb: 'h-14 w-14' },
  iphone: { width: 200, height: 356, thumb: 'h-16 w-9' },
  macbook: { width: 420, height: 236, thumb: 'h-9 w-16' },
};
const shapeOf = project => SHAPES[project.device ?? 'physical'];

// Distance kept between the preview and the pointer, and the viewport edges.
const GAP = 32;

// Projects as a ruled index, like a parts list: number, name, and what it was,
// one row each between lines in the text colour. Where there's a mouse, the
// row under it brings up a picture beside the pointer and the other rows dim.
// Touch screens have no hover, so each row carries a small picture instead.
// `preview={false}` turns the hover picture and dimming off; rows then just
// fade on hover like every other link.
export default function ProjectIndex({ projects, preview = true }) {
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine)') && preview;
  const [active, setActive] = useState(null);
  const previewRef = useRef(null);

  if (projects.length === 0) return <ComingSoon />;

  // Written straight to the element rather than through state, so following
  // the pointer never re-renders the list. The preview sits to the right of
  // the pointer, or to its left when there isn't room.
  const follow = e => {
    const el = previewRef.current;
    if (!el) return;
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    const x = e.clientX + GAP + w > window.innerWidth ? e.clientX - GAP - w : e.clientX + GAP;
    const y = Math.min(Math.max(e.clientY - h / 2, GAP), window.innerHeight - h - GAP);
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const shape = shapeOf(projects[active ?? 0]);

  return (
    <main className="px-8 pb-24 md:px-16">
      <ol
        onMouseMove={canHover ? follow : undefined}
        onMouseLeave={() => setActive(null)}
        className="group/list mx-auto max-w-screen-2xl border-t border-vandyke"
      >
        {projects.map((project, i) => (
          <m.li key={project.slug} {...reveal(0.15 + i * 0.08)} className="border-b border-vandyke">
            <Link
              to={`/work/${project.slug}`}
              state={IN_APP}
              onMouseEnter={canHover ? () => setActive(i) : undefined}
              className={`flex items-center gap-4 py-5 md:py-7 ${
                preview
                  ? 'transition-opacity duration-500 ease-luxe md:group-hover/list:opacity-40 md:hover:!opacity-100'
                  : 'link-fade'
              }`}
            >
              <span
                aria-hidden="true"
                className="w-[2.6em] shrink-0 text-lg tabular-nums text-vandyke/50 md:text-2xl"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="min-w-0 flex-1 text-lg uppercase tracking-luxe md:text-2xl">
                {project.name}
              </span>
              <span className="label hidden shrink-0 uppercase text-vandyke/80 md:block">
                {project.description} · {project.year}
              </span>
              <span
                className={`shrink-0 overflow-hidden bg-vandyke/5 md:hidden ${shapeOf(project).thumb}`}
              >
                <FadeImage
                  src={project.screen ?? project.image}
                  alt=""
                  sizes="64px"
                  className="h-full w-full object-cover"
                />
              </span>
            </Link>
          </m.li>
        ))}
      </ol>

      {/* Every picture is stacked in the preview and cross-fades in when its
          row is hovered, so moving down the list never waits on a download.
          The frame eases between each project's proportions. */}
      {canHover && (
        <div
          ref={previewRef}
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-40 overflow-hidden bg-vandyke/5 transition-[opacity,width,height] duration-500 ease-luxe"
          style={{ width: shape.width, height: shape.height, opacity: active === null ? 0 : 1 }}
        >
          {projects.map((project, i) => (
            <div
              key={project.slug}
              className={`absolute inset-0 transition-opacity duration-500 ease-luxe ${
                i === active ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <FadeImage
                src={project.screen ?? project.image}
                alt=""
                loading="eager"
                sizes={`${shapeOf(project).width}px`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
