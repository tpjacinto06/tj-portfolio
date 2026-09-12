/*
 * Renders the Sisyphus logo to PNG for the favicon and link previews.
 *
 * The geometry and the sketch filter below mirror src/SisyphusIntro.jsx as it
 * draws the settled logo. This script only ever writes into public/ — it is
 * never imported by the app and must never be wired into the animation.
 *
 *   node scripts/make-logo.cjs
 */
const fs = require('fs'), zlib = require('zlib');

// ---------------------------------------------------------------- geometry --
// Lifted from the rendered logo: the figure sits under translate(TX,TY)
// scale(SC), while the boulder is already in page coordinates.
const TX = 454.2882510959442, TY = 47, SC = 0.62;
const INK = [0x66, 0x42, 0x28], PAPER = [0xFA, 0xF8, 0xF5];

const M = (x, y) => [TX + SC * x, TY + SC * y];
const seg = (x1, y1, x2, y2, w) => {
  const a = M(x1, y1), b = M(x2, y2);
  return { k: 'l', x1: a[0], y1: a[1], x2: b[0], y2: b[1], r: SC * w / 2 };
};
const dot = (cx, cy, r) => {
  const c = M(cx, cy);
  return { k: 'c', cx: c[0], cy: c[1], r: SC * r };
};

// Painter's order, one entry per SVG group. Shapes inside a group are unioned
// before the group opacity is applied — which is how group opacity actually
// works, and compositing them one at a time is what darkened the joints.
const GROUPS = [
  { opacity: 1, shapes: [{ k: 'c', cx: 498.272, cy: 26.54, r: 22.32 }] },
  {
    opacity: 0.45,
    shapes: [
      seg(0, -27, -2.868, -13.297, 7),
      seg(-2.868, -13.297, -15, 0, 6),
      seg(-16, 0, -9, 0, 5),
      seg(11, -41, 34, -43, 6),
    ],
  },
  {
    opacity: 1,
    shapes: [
      seg(0, -27, 14, -42, 10),
      dot(20, -51, 6),
      seg(0, -27, 10.722, -17.998, 7),
      seg(10.722, -17.998, 11, 0, 6),
      seg(10, 0, 17, 0, 5),
      seg(14, -42, 37, -45, 6),
    ],
  },
];

// ------------------------------------------------- SVG feTurbulence (spec) --
// The reference Perlin generator from the SVG 1.1 filter spec, so the
// roughness matches what the browser draws rather than merely resembling it.
const BSize = 0x100, BM = 0xff, PerlinN = 0x1000;
const RAND_m = 2147483647, RAND_a = 16807, RAND_q = 127773, RAND_r = 2836;

function makeNoise(seed) {
  const lat = new Int32Array(BSize + BSize + 2);
  const grad = Array.from({ length: 4 }, () => new Float64Array((BSize + BSize + 2) * 2));
  let s = seed <= 0 ? -(seed % (RAND_m - 1)) + 1 : Math.min(seed, RAND_m - 1);
  const rnd = () => {
    const r = RAND_a * (s % RAND_q) - RAND_r * Math.floor(s / RAND_q);
    s = r <= 0 ? r + RAND_m : r;
    return s;
  };

  for (let k = 0; k < 4; k++) {
    for (let i = 0; i < BSize; i++) {
      lat[i] = i;
      const gx = ((rnd() % (BSize + BSize)) - BSize) / BSize;
      const gy = ((rnd() % (BSize + BSize)) - BSize) / BSize;
      const len = Math.hypot(gx, gy);
      grad[k][i * 2] = gx / len;
      grad[k][i * 2 + 1] = gy / len;
    }
  }
  for (let i = BSize - 1; i > 0; i--) {
    const k = lat[i], j = rnd() % BSize;
    lat[i] = lat[j];
    lat[j] = k;
  }
  for (let i = 0; i < BSize + 2; i++) {
    lat[BSize + i] = lat[i];
    for (let k = 0; k < 4; k++) {
      grad[k][(BSize + i) * 2] = grad[k][i * 2];
      grad[k][(BSize + i) * 2 + 1] = grad[k][i * 2 + 1];
    }
  }

  const curve = t => t * t * (3 - 2 * t);
  const lerp = (t, a, b) => a + t * (b - a);

  function noise2(ch, vx, vy) {
    let t = vx + PerlinN;
    const bx0 = Math.floor(t) & BM, bx1 = (bx0 + 1) & BM;
    const rx0 = t - Math.floor(t), rx1 = rx0 - 1;
    t = vy + PerlinN;
    const by0 = Math.floor(t) & BM, by1 = (by0 + 1) & BM;
    const ry0 = t - Math.floor(t), ry1 = ry0 - 1;
    const i = lat[bx0], j = lat[bx1];
    const b00 = lat[i + by0], b10 = lat[j + by0], b01 = lat[i + by1], b11 = lat[j + by1];
    const sx = curve(rx0), sy = curve(ry0);
    const g = grad[ch];
    const a = lerp(sx,
      rx0 * g[b00 * 2] + ry0 * g[b00 * 2 + 1],
      rx1 * g[b10 * 2] + ry0 * g[b10 * 2 + 1]);
    const b = lerp(sx,
      rx0 * g[b01 * 2] + ry1 * g[b01 * 2 + 1],
      rx1 * g[b11 * 2] + ry1 * g[b11 * 2 + 1]);
    return lerp(sy, a, b);
  }

  // fractalNoise summed over octaves, mapped from [-1,1] into [0,1] as the
  // filter primitive does before the displacement map reads it.
  return (ch, x, y, freq, octaves) => {
    let sum = 0, vx = x * freq, vy = y * freq, ratio = 1;
    for (let o = 0; o < octaves; o++) {
      sum += noise2(ch, vx, vy) / ratio;
      vx *= 2;
      vy *= 2;
      ratio *= 2;
    }
    return (sum + 1) / 2;
  };
}

// Matches <filter id="tj-sketch"> in SisyphusIntro.jsx exactly.
const FREQ = 0.055, OCTAVES = 2, SEED = 7, DISPLACE = 1.6;
const turb = makeNoise(SEED);

// ------------------------------------------------------------------ raster --
function bounds(s) {
  return s.k === 'c'
    ? [s.cx - s.r, s.cy - s.r, s.cx + s.r, s.cy + s.r]
    : [Math.min(s.x1, s.x2) - s.r, Math.min(s.y1, s.y2) - s.r,
       Math.max(s.x1, s.x2) + s.r, Math.max(s.y1, s.y2) + s.r];
}

let BB = [Infinity, Infinity, -Infinity, -Infinity];
for (const g of GROUPS) {
  for (const s of g.shapes) {
    const b = bounds(s);
    BB = [Math.min(BB[0], b[0]), Math.min(BB[1], b[1]),
          Math.max(BB[2], b[2]), Math.max(BB[3], b[3])];
  }
}
// The displacement pushes edges outward, so the mark covers more than its
// bare geometry — pad the box or the roughness gets clipped flat.
BB = [BB[0] - DISPLACE, BB[1] - DISPLACE, BB[2] + DISPLACE, BB[3] + DISPLACE];

function inside(px, py, s) {
  if (s.k === 'c') return Math.hypot(px - s.cx, py - s.cy) <= s.r;
  const dx = s.x2 - s.x1, dy = s.y2 - s.y1, L2 = dx * dx + dy * dy;
  let t = L2 ? ((px - s.x1) * dx + (py - s.y1) * dy) / L2 : 0;
  t = t < 0 ? 0 : t > 1 ? 1 : t;
  return Math.hypot(px - (s.x1 + t * dx), py - (s.y1 + t * dy)) <= s.r;
}

function render(W, H, coverage, SS) {
  const srcW = BB[2] - BB[0], srcH = BB[3] - BB[1];
  const k = Math.min(W * coverage / srcW, H * coverage / srcH);
  const offX = (W - srcW * k) / 2 - BB[0] * k;
  const offY = (H - srcH * k) / 2 - BB[1] * k;

  const px = Buffer.alloc(W * H * 3);
  for (let i = 0; i < W * H; i++) px.set(PAPER, i * 3);

  const x0 = Math.max(0, Math.floor(BB[0] * k + offX) - 2);
  const x1 = Math.min(W - 1, Math.ceil(BB[2] * k + offX) + 2);
  const y0 = Math.max(0, Math.floor(BB[1] * k + offY) - 2);
  const y1 = Math.min(H - 1, Math.ceil(BB[3] * k + offY) + 2);
  const inv = 1 / (SS * SS);
  const cov = new Float64Array(GROUPS.length);

  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      cov.fill(0);
      for (let sy = 0; sy < SS; sy++) {
        for (let sx = 0; sx < SS; sx++) {
          // Canvas sample -> user space, then displaced by the sketch filter.
          const ux = (x + (sx + 0.5) / SS - offX) / k;
          const uy = (y + (sy + 0.5) / SS - offY) / k;
          const fx = ux + DISPLACE * (turb(0, ux, uy, FREQ, OCTAVES) - 0.5);
          const fy = uy + DISPLACE * (turb(1, ux, uy, FREQ, OCTAVES) - 0.5);
          for (let gi = 0; gi < GROUPS.length; gi++) {
            // Union within a group: a sample inside any shape counts once.
            for (const s of GROUPS[gi].shapes) {
              if (inside(fx, fy, s)) { cov[gi] += inv; break; }
            }
          }
        }
      }
      const o = (y * W + x) * 3;
      for (let gi = 0; gi < GROUPS.length; gi++) {
        const a = cov[gi] * GROUPS[gi].opacity;
        if (a <= 0) continue;
        for (let c = 0; c < 3; c++) {
          px[o + c] = Math.round(px[o + c] * (1 - a) + INK[c] * a);
        }
      }
    }
  }
  return px;
}

// ------------------------------------------------------------- PNG encoder --
const CRC = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let j = 0; j < 8; j++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();
const crc32 = buf => {
  let c = 0xFFFFFFFF;
  for (const b of buf) c = CRC[(c ^ b) & 0xFF] ^ (c >>> 8);
  return (c ^ 0xFFFFFFFF) >>> 0;
};
function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
}
function png(W, H, rgb) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(W, 0);
  ihdr.writeUInt32BE(H, 4);
  ihdr[8] = 8;  // bit depth
  ihdr[9] = 2;  // truecolour
  const stride = W * 3 + 1, raw = Buffer.alloc(H * stride);
  for (let y = 0; y < H; y++) rgb.copy(raw, y * stride + 1, y * W * 3, (y + 1) * W * 3);
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

for (const [file, W, H, cov, ss] of [
  ['public/logo.png', 1024, 1024, 0.72, 4],
  ['public/og-image.png', 1200, 630, 0.5, 4],
]) {
  const t = Date.now();
  fs.writeFileSync(file, png(W, H, render(W, H, cov, ss)));
  console.log(file + '  ' + W + 'x' + H + '  ' +
    Math.round(fs.statSync(file).size / 1024) + ' KB  ' + (Date.now() - t) + 'ms');
}
