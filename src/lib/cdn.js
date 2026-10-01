const UPLOAD = '/image/upload/';
const WIDTHS = [480, 800, 1200, 1600];

// Cloudinary resizes and re-encodes on the fly when transformations sit right
// after /upload/: f_auto serves AVIF or WebP where the browser takes them,
// q_auto picks the quality, c_limit never upscales past the original.
export function cdn(url, width) {
  if (!url.includes(UPLOAD)) return url;
  return url.replace(UPLOAD, `${UPLOAD}f_auto,q_auto,c_limit,w_${width}/`);
}

export function cdnSrcSet(url) {
  if (!url.includes(UPLOAD)) return undefined;
  return WIDTHS.map(w => `${cdn(url, w)} ${w}w`).join(', ');
}
