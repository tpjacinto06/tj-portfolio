import { useEffect, useRef, useState } from 'react';
import { cdn, cdnSrcSet } from '../lib/cdn';
import { EASE_CSS } from '../lib/motion';

// An <img> that resolves out of a soft blur once the file has actually
// decoded, instead of snapping in. `delay` staggers siblings in a grid.
// `sizes` tells the browser how wide it will be drawn, so it fetches the
// smallest Cloudinary rendition that's still sharp.
export default function FadeImage({
  src,
  alt,
  className = '',
  delay = 0,
  sizes = '100vw',
  loading = 'lazy',
  style,
}) {
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
      src={cdn(src, 1200)}
      srcSet={cdnSrcSet(src)}
      sizes={sizes}
      alt={alt}
      loading={loading}
      decoding="async"
      onLoad={() => setLoaded(true)}
      className={className}
      style={{
        ...style,
        opacity: loaded ? 1 : 0,
        filter: loaded ? 'blur(0px)' : 'blur(16px)',
        // Transform is included so any hover-scale class on this element still
        // animates — an inline transition would otherwise override it entirely.
        transition: `opacity 1.2s ${EASE_CSS} ${delay}s, filter 1.4s ${EASE_CSS} ${delay}s, transform 1.2s ${EASE_CSS}`,
      }}
    />
  );
}
