import Lenis from 'lenis';

// Single shared Lenis instance. Guarded so React StrictMode's double-invoked
// effects (and any hot reload) can't stack up multiple raf loops.
let lenis = null;

export function initSmoothScroll() {
  if (lenis) return lenis;
  if (typeof window === 'undefined') return null;

  // Respect users who've asked the OS for reduced motion — hijacking scroll
  // is exactly the kind of thing that setting exists to prevent.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null;

  lenis = new Lenis({
    duration: 1.2,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });

  let ticked = false;
  const raf = time => {
    ticked = true;
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);

  // Safety net. Lenis intercepts wheel events and applies the scroll itself on
  // each animation frame. In any context where rAF never runs, that means the
  // wheel is swallowed and the scroll is never applied — a page you physically
  // cannot scroll. If our frames aren't firing, tear it down and let the
  // browser's native scrolling take over.
  setTimeout(() => {
    if (!ticked && lenis) {
      lenis.destroy();
      lenis = null;
    }
  }, 1000);

  return lenis;
}

// Scroll helpers used across the app, so page code never has to know whether
// Lenis is active. Both fall back to native scrolling when it isn't.
export function scrollToY(y, { immediate = false } = {}) {
  if (lenis) lenis.scrollTo(y, { immediate });
  else window.scrollTo({ top: y, behavior: immediate ? 'auto' : 'smooth' });
}

export function scrollToTopImmediate() {
  if (lenis) lenis.scrollTo(0, { immediate: true });
  else window.scrollTo(0, 0);
}
