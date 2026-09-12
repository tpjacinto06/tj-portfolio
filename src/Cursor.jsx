import { useEffect, useRef, useState } from 'react';

const CLICKABLE_SELECTOR = 'button, a, .cursor-pointer';
const LABEL_SELECTOR = '[data-cursor]';
const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)';

export default function Cursor() {
  const dotRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [label, setLabel] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(window.matchMedia(FINE_POINTER_QUERY).matches);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const handleMove = (e) => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
      setIsVisible(true);
    };

    const handleOver = (e) => {
      if (e.target.closest(CLICKABLE_SELECTOR)) setIsHovering(true);
      const labelled = e.target.closest(LABEL_SELECTOR);
      if (labelled) setLabel(labelled.dataset.cursor);
    };

    const handleOut = (e) => {
      if (e.target.closest(CLICKABLE_SELECTOR)) setIsHovering(false);
      if (e.target.closest(LABEL_SELECTOR)) setLabel(null);
    };

    const handleLeave = () => setIsVisible(false);

    // Clicking a project swaps the whole page, so the element the cursor was
    // over is removed without ever firing mouseout — which would otherwise
    // leave the cursor stuck open on the new page until the mouse next moves.
    const handleClick = () => {
      setLabel(null);
      setIsHovering(false);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseover', handleOver);
    window.addEventListener('mouseout', handleOut);
    window.addEventListener('click', handleClick);
    document.addEventListener('mouseleave', handleLeave);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseover', handleOver);
      window.removeEventListener('mouseout', handleOut);
      window.removeEventListener('click', handleClick);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  // Three states: a labelled disc over projects, a small dot over other
  // clickables, and the default dot. Size/colour animate; position never does,
  // so the cursor still tracks the pointer exactly.
  const shape = label
    ? 'w-20 h-20 bg-vandyke'
    : isHovering
      ? 'w-3 h-3 bg-vandyke/50'
      : 'w-6 h-6 bg-vandyke';

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className={`fixed top-0 left-0 z-[9999] rounded-full pointer-events-none flex items-center justify-center transition-[width,height,background-color] duration-500 ease-luxe ${shape} ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <span
        className={`text-[0.6rem] tracking-[0.2em] text-paper transition-opacity duration-300 ease-luxe ${
          label ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {label}
      </span>
    </div>
  );
}
