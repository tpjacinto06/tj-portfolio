import { m } from 'framer-motion';
import { Link } from 'react-router-dom';

// The house curve. Mirrors `ease-luxe` in tailwind.config.js.
export const EASE = [0.16, 1, 0.3, 1];
export const EASE_CSS = `cubic-bezier(${EASE.join(', ')})`;

// Shared entrance motion: content resolves upward out of nothing rather than
// hard-cutting in. `delay` staggers siblings.
export const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: EASE, delay },
});

export const MotionLink = m.create(Link);
