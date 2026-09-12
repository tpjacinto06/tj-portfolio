import { useEffect, useRef, useState } from 'react';

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';

// An <img> that resolves out of a soft blur once the file has actually
// decoded, instead of snapping in. `delay` staggers siblings in a grid.
export default function FadeImage({ src, alt, className = '', delay = 0, style }) {
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(false);

  // A cached image can finish loading before React attaches onLoad, which
  // would otherwise leave it stuck at opacity 0.
  useEffect(() => {
    if (ref.current?.complete) setLoaded(true);
  }, [src]);

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      onLoad={() => setLoaded(true)}
      className={className}
      style={{
        ...style,
        opacity: loaded ? 1 : 0,
        filter: loaded ? 'blur(0px)' : 'blur(16px)',
        // Transform is included so any hover-scale class on this element still
        // animates — an inline transition would otherwise override it entirely.
        transition: `opacity 1.2s ${EASE} ${delay}s, filter 1.4s ${EASE} ${delay}s, transform 1.2s ${EASE}`,
      }}
    />
  );
}
