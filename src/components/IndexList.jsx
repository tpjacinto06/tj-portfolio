import { MotionLink, reveal } from '../lib/motion';
import { IN_APP } from '../lib/navigation';

// A numbered list of links pinned to the bottom of a full-height screen: on
// the right on phones, within reach of the thumb, and on the left from md up.
// The numbers are drawn lighter than the words and sit on the outer edge, so
// on either side they form a clean column. The <ol> already numbers the items
// for screen readers, so the visible ones are hidden from them.
export default function IndexList({ label, items, delay = 0 }) {
  return (
    <nav
      aria-label={label}
      className="absolute bottom-12 right-8 md:bottom-16 md:left-16 md:right-auto"
    >
      <ol className="flex flex-col items-end md:items-start md:gap-2">
        {items.map((item, i) => (
          <li key={item.to}>
            <MotionLink
              to={item.to}
              state={IN_APP}
              {...reveal(delay + i * 0.12)}
              className="link-fade inline-flex flex-row-reverse items-baseline py-2 text-xl tracking-luxe md:flex-row md:py-1 md:text-2xl"
            >
              {/* Fixed width, because Barlow's digits aren't all the same width
                  and the words would otherwise start at different points. */}
              <span
                aria-hidden="true"
                className="w-[2.6em] shrink-0 text-right tabular-nums text-vandyke/50 md:text-left"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              {item.label}
            </MotionLink>
          </li>
        ))}
      </ol>
    </nav>
  );
}
