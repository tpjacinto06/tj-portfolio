import { useEffect, useState } from 'react';
import IndexList from '../components/IndexList';
import Page from '../components/Page';
import SisyphusIntro from '../components/SisyphusIntro';
import { CATEGORIES } from '../data/projects';

const INTRO_KEY = 'tj-intro-played';

const LINKS = [
  ...CATEGORIES.map(category => ({ to: `/${category.id}`, label: category.name })),
  { to: '/about', label: 'ABOUT' },
];

// Backs up sessionStorage for visitors whose storage is blocked, so the intro
// still plays only once per page load.
let playedThisLoad = false;

// The intro plays once per session — returning to the homepage from a project
// shows the settled logo rather than replaying the whole sequence. Kept pure:
// StrictMode double-invokes state initialisers, so recording that it played
// has to happen in an effect, not here.
function shouldPlayIntro() {
  if (playedThisLoad) return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    return !sessionStorage.getItem(INTRO_KEY);
  } catch {
    return true;
  }
}

export default function Home() {
  const [playIntro] = useState(shouldPlayIntro);

  useEffect(() => {
    if (!playIntro) return;
    playedThisLoad = true;
    try {
      sessionStorage.setItem(INTRO_KEY, '1');
    } catch {
      // Storage unavailable — playedThisLoad covers this visit.
    }
  }, [playIntro]);

  // The long delay exists only to let the intro breathe before the links
  // arrive. Once it's been seen, there's nothing to wait for.
  const delay = playIntro ? 2.4 : 0;

  return (
    <Page>
      <h1 className="sr-only">Tomás Jacinto — Body of Work</h1>

      <div className="relative h-dvh">
        <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 md:inset-x-16">
          <SisyphusIntro play={playIntro} />
        </div>
        <IndexList label="Site" items={LINKS} delay={delay} />
      </div>
    </Page>
  );
}
