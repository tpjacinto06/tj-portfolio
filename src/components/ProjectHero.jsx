import { useEffect, useState } from 'react';
import { m } from 'framer-motion';
import { reveal } from '../lib/motion';
import { scrollToElementEnd } from '../lib/smoothScroll';

// The opening screen of every project: its name alone, and an arrow down to
// `targetId` that bows out once the visitor has started scrolling.
export default function ProjectHero({ title, targetId }) {
  return (
    <section className="relative flex h-dvh items-center justify-center">
      <m.h1
        {...reveal(0.1)}
        className="max-w-4xl px-8 text-center text-3xl uppercase tracking-loose md:text-5xl lg:text-6xl"
      >
        {title}
      </m.h1>
      <ScrollArrow targetId={targetId} />
    </section>
  );
}

function ScrollArrow({ targetId }) {
  // Pages always open at the top, so it starts out showing.
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY < window.innerHeight * 0.8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Scroll to content"
      onClick={() => scrollToElementEnd(targetId)}
      className="absolute bottom-12 left-1/2 z-10 -translate-x-1/2 transition-opacity duration-700 ease-luxe hover:opacity-70 motion-safe:animate-bounce"
    >
      <svg
        aria-hidden="true"
        width="24"
        height="40"
        viewBox="0 0 24 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M12 0 L12 36 M12 36 L6 30 M12 36 L18 30" />
      </svg>
    </button>
  );
}
