import { useEffect, useRef, useState } from 'react';
import useMediaQuery from '../lib/useMediaQuery';

const CLICKABLE_SELECTOR = 'button, a, .cursor-pointer';
const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)';

export default function Cursor() {
  const dotRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const enabled = useMediaQuery(FINE_POINTER_QUERY);

  useEffect(() => {
    if (!enabled) return;

    // The system cursor is hidden only while this one is mounted (see
    // index.css), so a failed script never leaves the visitor with no cursor.
    document.documentElement.classList.add('custom-cursor');

    const handleMove = e => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
      setIsVisible(true);
    };

    const handleOver = e => {
      if (e.target.closest(CLICKABLE_SELECTOR)) setIsHovering(true);
    };

    const handleOut = e => {
      if (e.target.closest(CLICKABLE_SELECTOR)) setIsHovering(false);
    };

    const handleLeave = () => setIsVisible(false);

    // Clicking a project swaps the whole page, so the element the cursor was
    // over is removed without ever firing mouseout — which would otherwise
    // leave the cursor stuck small on the new page until the mouse next moves.
    const handleClick = () => setIsHovering(false);

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseover', handleOver);
    window.addEventListener('mouseout', handleOut);
    window.addEventListener('click', handleClick);
    document.addEventListener('mouseleave', handleLeave);

    return () => {
      document.documentElement.classList.remove('custom-cursor');
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseover', handleOver);
      window.removeEventListener('mouseout', handleOut);
      window.removeEventListener('click', handleClick);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  // Two states: a small dot over clickables and the default dot. Size/colour
  // animate; position never does, so the cursor still tracks the pointer
  // exactly.
  const shape = isHovering ? 'w-3 h-3 bg-vandyke/50' : 'w-6 h-6 bg-vandyke';

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className={`pointer-events-none fixed left-0 top-0 z-[9999] rounded-full transition-[width,height,background-color] duration-500 ease-luxe ${shape} ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    />
  );
}
