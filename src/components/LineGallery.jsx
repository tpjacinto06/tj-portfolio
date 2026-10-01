import { m } from 'framer-motion';
import { Link } from 'react-router-dom';
import FadeImage from './FadeImage';
import { ComingSoon } from './ProjectGrid';
import { reveal } from '../lib/motion';
import { IN_APP } from '../lib/navigation';

// Captions (name, year, description) are switched off for now. Flip this to
// bring them back under every picture.
const SHOW_CAPTIONS = false;

// Width ÷ height of each digital project's screen.
const RATIOS = { iphone: 9 / 16, macbook: 16 / 9 };
// A digital row is one phone beside one desktop; this is their combined width
// at a shared height, in units of that height.
const PAIR_WIDTH = RATIOS.iphone + RATIOS.macbook;

// Projects as a catalogue of pictures that fill their cells edge to edge,
// separated by solid lines in the text colour. Each cell draws its own right and bottom border; the
// whole thing is pulled two pixels past a clipping wrapper so the outermost
// lines fall outside it, leaving only the lines between pictures. (One pixel
// isn't enough on screens with fractional pixel ratios, where a line can snap
// back into view.)
//
//   grid       uniform square cells — physical work
//   paired     one phone and one desktop per row, the same height, each as
//              wide as its proportions need — digital work, so phones stay
//              9:16 and desktops 16:9 while the row is filled completely
export default function LineGallery({ projects, layout = 'grid' }) {
  if (projects.length === 0) return <ComingSoon />;

  return (
    <main className="px-8 pb-24 md:px-16">
      <div className="mx-auto max-w-screen-2xl overflow-hidden">
        <div className="-mb-[2px] -mr-[2px]">
          {layout === 'paired' ? (
            <PairedRows projects={projects} />
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, i) => (
                <Cell key={project.slug} project={project} index={i} className="aspect-square">
                  <Picture
                    project={project}
                    index={i}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </Cell>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}

// Phones and desktops are dealt out in order, one of each per row. Each takes
// the share of the row its ratio claims within a phone-plus-desktop pair, so
// both stand at the same height — and a row left with only one of them keeps
// that size rather than stretching across. Phones stack one per row instead.
function PairedRows({ projects }) {
  const phones = projects.filter(p => p.device === 'iphone');
  const desktops = projects.filter(p => p.device === 'macbook');
  const rows = Array.from({ length: Math.max(phones.length, desktops.length) }, (_, i) =>
    [phones[i], desktops[i]].filter(Boolean),
  );

  let index = 0;
  return rows.map((row, r) => (
    <ul key={r} className="flex flex-col md:flex-row">
      {row.map(project => {
        const ratio = RATIOS[project.device];
        const i = index++;
        return (
          <Cell
            key={project.slug}
            project={project}
            index={i}
            className="w-full md:w-[var(--share)]"
            style={{ '--share': `${(ratio / PAIR_WIDTH) * 100}%`, aspectRatio: ratio }}
          >
            <Picture
              project={project}
              index={i}
              sizes={
                ratio < 1 ? '(min-width: 768px) 24vw, 100vw' : '(min-width: 768px) 76vw, 100vw'
              }
            />
          </Cell>
        );
      })}
    </ul>
  ));
}

function Cell({ project, index, className = '', style, children }) {
  return (
    <m.li
      {...reveal(0.15 + index * 0.08)}
      style={style}
      className={`border-b border-r border-vandyke ${className}`}
    >
      <Link
        to={`/work/${project.slug}`}
        state={IN_APP}
        className="group block h-full overflow-hidden bg-vandyke/5 focus-visible:[outline-offset:-8px]"
      >
        {children}
      </Link>
      {SHOW_CAPTIONS && <Caption project={project} />}
    </m.li>
  );
}

function Picture({ project, index, sizes }) {
  return (
    <FadeImage
      src={project.screen ?? project.image}
      alt={project.name}
      delay={0.15 + index * 0.08}
      loading={index < 3 ? 'eager' : 'lazy'}
      sizes={sizes}
      className="h-full w-full object-cover group-hover:scale-[1.03]"
    />
  );
}

function Caption({ project }) {
  return (
    <div className="p-6">
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-sm uppercase tracking-luxe">{project.name}</p>
        <p className="label shrink-0 tabular-nums text-vandyke/80">{project.year}</p>
      </div>
      <p className="mt-1 text-xs tracking-soft text-vandyke/80">{project.description}</p>
    </div>
  );
}
