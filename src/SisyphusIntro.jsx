import { useEffect, useRef, useState } from 'react';

// Overall size. One knob.
const S = 0.62;

// --- Figure ---------------------------------------------------------------
// Proportions and pose taken from the reference sketch: a deep committed lean,
// both arms locked straight into the boulder, back leg driving out behind,
// front leg bent underneath, feet flat on the ground.
const THIGH = 14;
const SHIN = 18;
const REACH = THIGH + SHIN;

const HIP = [0, -27];
const SHOULDER = [14, -42];
const HEAD = [20, -51];
const HAND = [37, -45];
// The far arm and shoulder sit slightly back, which is what separates a figure
// with two arms from a flat one with a single stick.
const SHOULDER_FAR = [11, -41];
const HAND_FAR = [34, -43];
const HEAD_R = 6;

const SHIN_W = 6;
const THIGH_W = 7;
const TORSO_W = 10;
const ARM_W = 6;
const FOOT_W = 5;
const FOOT_LEN = 6;

// Eight beats: four of stance (planted, travelling back under the body), four
// of swing (lifted, carried forward). Short, crouched strides — a pushing
// figure cannot take long ones.
const FOOT_PATH = [
  [15, 0], [8, 0], [0, 0], [-8, 0],
  [-15, 0], [-10, -4], [0, -6], [8, -3],
];
const HIP_Y = [-28, -27, -26, -27, -28, -27, -26, -27];
const STRIDE_UNITS = FOOT_PATH[0][0] - FOOT_PATH[4][0];

// The braced pose held as the finished logo — the reference pose itself.
const BRACE = { hipY: -27, footA: [-15, 0], footB: [11, 0] };

// --- Boulder --------------------------------------------------------------
const BALL_R = 36;
// Round linecaps extend half a stroke past the foot point, so the boulder sits
// that much lower for its bottom edge to line up with the feet.
const FOOT_OVERHANG = SHIN_W / 2;
const BALL_CY = -BALL_R + FOOT_OVERHANG;
// Places the boulder so the hands rest exactly on its surface.
const BALL_DX = HAND[0] + Math.sqrt(BALL_R * BALL_R - (HAND[1] - BALL_CY) ** 2);

const MARK_LEFT = Math.min(BRACE.footA[0] - FOOT_LEN, -REACH * 0.5) - SHIN_W / 2;
const MARK_RIGHT = BALL_DX + BALL_R;
const MARK_MID = (MARK_LEFT + MARK_RIGHT) / 2;

// --- Layout ---------------------------------------------------------------
const GROUND_Y = Math.ceil((BALL_R - BALL_CY) * S) + 4;
const HEIGHT = GROUND_Y + Math.ceil(FOOT_OVERHANG * S) + 5;

// The stride is locked to travel speed so the feet never skate, which means
// distance over the push sets the step cadence. Mean speed is pinned by
// distance ÷ duration, so the only way to slow his quickest phases without
// flattening the effort curve is to lower that mean — hence a shorter
// crossing over a longer push. Grinds at ~1.2s per step, never quicker
// than 0.4s. Scaled with PUSH_MS so the walking speed stays put: 310px over
// 10s is the same 31px/s as the 340px over 11s it replaced.
const MAX_TRAVEL = 310;

// --- Timeline (ms) --------------------------------------------------------
// The ending runs strictly in order: he lets go and fades where he stood, he
// reappears at centre already braced, and only then does the boulder come
// back to him — so it arrives into a man who is planted and waiting, rather
// than rolling off while he's still standing there holding nothing.
const PUSH_MS = 10000;
const VANISH_MS = 500;
const PLANT_MS = 700;
const RETURN_MS = 3000;
const T_VANISH = PUSH_MS;
const T_PLANT = T_VANISH + VANISH_MS;
const T_RETURN = T_PLANT + PLANT_MS;
const TOTAL_MS = T_RETURN + RETURN_MS;

const easeOut = t => 1 - Math.pow(1 - t, 4);
const easeInOut = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const clamp01 = t => Math.max(0, Math.min(1, t));

// Effort. Progress is the integral of (1 - A·cos(2πk·u)), so speed varies as a
// smooth sine between (1-A) and (1+A) — he digs in and grinds, then gains a
// little, four times over the crossing. Because it's a sine there are no
// corners to read as jitter, and since A < 1 the speed never reaches zero or
// goes negative, so he never stalls or slides backwards. Lands exactly on 1.
const LABOUR_A = 0.5;
const LABOUR_K = 3;
const labour = u =>
  u - (LABOUR_A * Math.sin(2 * Math.PI * LABOUR_K * u)) / (2 * Math.PI * LABOUR_K);

// Two-bone IK. Fixed bone lengths mean the leg can never stretch — a single
// hip-to-foot line varies its length by over 70% across a stride and reads as
// rubber.
function solveKnee(hip, foot) {
  const dx = foot[0] - hip[0];
  const dy = foot[1] - hip[1];
  const d = Math.min(Math.hypot(dx, dy), REACH - 0.01) || 0.01;
  const ux = dx / d;
  const uy = dy / d;
  const a = (THIGH * THIGH - SHIN * SHIN + d * d) / (2 * d);
  const h = Math.sqrt(Math.max(0, THIGH * THIGH - a * a));
  // Perpendicular chosen so the knee always breaks forward, as a human's does.
  return [hip[0] + a * ux + h * uy, hip[1] + a * uy - h * ux];
}

function sample(path, phase) {
  const n = path.length;
  const f = ((phase % 1) + 1) % 1 * n;
  const i0 = Math.floor(f) % n;
  const i1 = (i0 + 1) % n;
  const k = f - Math.floor(f);
  const a = path[i0];
  const b = path[i1];
  return Array.isArray(a)
    ? [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k]
    : a + (b - a) * k;
}

export default function SisyphusIntro({ play = false }) {
  const boxRef = useRef(null);
  const [width, setWidth] = useState(0);

  const manRef = useRef(null);
  const ballRef = useRef(null);
  const r = {
    thighA: useRef(null), shinA: useRef(null), footA: useRef(null),
    thighB: useRef(null), shinB: useRef(null), footB: useRef(null),
    torso: useRef(null), armNear: useRef(null), armFar: useRef(null), head: useRef(null),
  };

  useEffect(() => {
    const measure = () => setWidth(boxRef.current?.clientWidth ?? 0);
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    if (!width) return;

    const markW = (MARK_RIGHT - MARK_LEFT) * S;
    const travel = Math.max(0, Math.min(width - markW, MAX_TRAVEL));
    const centreHipX = width / 2 - MARK_MID * S;
    const startHipX = centreHipX - travel / 2;
    const endHipX = centreHipX + travel / 2;

    // Ground covered by one full stride. The walk is driven off distance
    // rather than elapsed time, so the legs inherit the effort curve for free:
    // when he grinds, the steps grind with him, and the planted foot still
    // can't skate because the cycle and the body advance together by
    // construction.
    const strideDistance = STRIDE_UNITS * 2 * S;

    // Where he abandons the boulder, and where it comes to rest in his hands.
    const ballLeft = endHipX + BALL_DX * S;
    const ballHome = centreHipX + BALL_DX * S;

    const set = (ref, attrs) => {
      const el = ref.current;
      if (!el) return;
      for (const k in attrs) el.setAttribute(k, attrs[k]);
    };

    const drawFigure = (hipY, footA, footB) => {
      const hip = [HIP[0], hipY];
      const kneeA = solveKnee(hip, footA);
      const kneeB = solveKnee(hip, footB);
      const lift = hipY - HIP[1];

      set(r.thighA, { x1: hip[0], y1: hip[1], x2: kneeA[0], y2: kneeA[1] });
      set(r.shinA, { x1: kneeA[0], y1: kneeA[1], x2: footA[0], y2: footA[1] });
      set(r.footA, { x1: footA[0] - 1, y1: footA[1], x2: footA[0] + FOOT_LEN, y2: footA[1] });

      set(r.thighB, { x1: hip[0], y1: hip[1], x2: kneeB[0], y2: kneeB[1] });
      set(r.shinB, { x1: kneeB[0], y1: kneeB[1], x2: footB[0], y2: footB[1] });
      set(r.footB, { x1: footB[0] - 1, y1: footB[1], x2: footB[0] + FOOT_LEN, y2: footB[1] });

      set(r.torso, { x1: hip[0], y1: hip[1], x2: SHOULDER[0], y2: SHOULDER[1] + lift });
      set(r.armNear, { x1: SHOULDER[0], y1: SHOULDER[1] + lift, x2: HAND[0], y2: HAND[1] + lift });
      set(r.armFar, { x1: SHOULDER_FAR[0], y1: SHOULDER_FAR[1] + lift, x2: HAND_FAR[0], y2: HAND_FAR[1] + lift });
      set(r.head, { cx: HEAD[0], cy: HEAD[1] + lift });
    };

    const place = (hipX, ballX, opacity) => {
      manRef.current?.setAttribute('transform', `translate(${hipX} ${GROUND_Y}) scale(${S})`);
      manRef.current?.setAttribute('opacity', opacity);
      ballRef.current?.setAttribute('cx', ballX);
    };

    const drawLogo = () => {
      drawFigure(BRACE.hipY, BRACE.footA, BRACE.footB);
      place(centreHipX, centreHipX + BALL_DX * S, 1);
    };

    if (!play) {
      drawLogo();
      return;
    }

    let raf = 0;
    let start = 0;

    const draw = t => {
      if (t < PUSH_MS) {
        const covered = travel * labour(t / PUSH_MS);
        const hipX = startHipX + covered;
        const phase = covered / strideDistance;
        drawFigure(sample(HIP_Y, phase), sample(FOOT_PATH, phase), sample(FOOT_PATH, phase + 0.5));
        place(hipX, hipX + BALL_DX * S, 1);
      } else if (t < T_PLANT) {
        // He lets go and fades where he stood. The boulder has not moved yet —
        // it stays exactly where he left it.
        const q = clamp01((t - T_VANISH) / VANISH_MS);
        place(endHipX, ballLeft, 1 - easeOut(q));
      } else if (t < T_RETURN) {
        // He reappears at centre, already braced and planted, while the
        // boulder is still away. He is set before it arrives.
        const q = clamp01((t - T_PLANT) / PLANT_MS);
        drawFigure(BRACE.hipY, BRACE.footA, BRACE.footB);
        place(centreHipX, ballLeft, easeOut(q));
      } else {
        // It rolls back into him and he stops it dead. This is the logo.
        const q = clamp01((t - T_RETURN) / RETURN_MS);
        drawFigure(BRACE.hipY, BRACE.footA, BRACE.footB);
        place(centreHipX, ballLeft + (ballHome - ballLeft) * easeInOut(q), 1);
      }
    };

    const frame = now => {
      if (!start) start = now;
      const t = now - start;
      draw(t);
      if (t < TOTAL_MS) raf = requestAnimationFrame(frame);
      else drawLogo();
    };

    // Paint the opening frame synchronously. Everything else hangs off the
    // animation-frame loop, and if that first callback is ever delayed — a
    // backgrounded tab, a throttled renderer — the mark would otherwise sit
    // there invisible and unpositioned.
    draw(0);
    raf = requestAnimationFrame(frame);

    const skip = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      drawLogo();
    };
    window.addEventListener('click', skip);
    window.addEventListener('keydown', skip);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('click', skip);
      window.removeEventListener('keydown', skip);
    };
  }, [play, width]);

  const line = { stroke: 'currentColor', strokeLinecap: 'round', fill: 'none' };

  return (
    <div ref={boxRef} className="relative w-full text-vandyke" style={{ height: HEIGHT }} aria-hidden="true">
      <svg width="100%" height={HEIGHT} viewBox={`0 0 ${width || 1} ${HEIGHT}`}>
        <defs>
          {/* Roughens every edge so the linework reads as drawn rather than
              plotted — the sketch quality of the reference, not its density. */}
          <filter id="tj-sketch" x="-25%" y="-25%" width="150%" height="150%">
            <feTurbulence type="fractalNoise" baseFrequency="0.055" numOctaves="2" seed="7" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="1.6" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>

        <g filter="url(#tj-sketch)">
          <circle ref={ballRef} cx="0" cy={GROUND_Y + BALL_CY * S} r={BALL_R * S} fill="currentColor" />

          <g ref={manRef} opacity="0">
            {/* Far side of the body, set back */}
            <g opacity="0.45">
              <line ref={r.thighA} strokeWidth={THIGH_W} {...line} />
              <line ref={r.shinA} strokeWidth={SHIN_W} {...line} />
              <line ref={r.footA} strokeWidth={FOOT_W} {...line} />
              <line ref={r.armFar} strokeWidth={ARM_W} {...line} />
            </g>

            <line ref={r.torso} strokeWidth={TORSO_W} {...line} />
            <circle ref={r.head} r={HEAD_R} fill="currentColor" />

            {/* Near side, drawn last so it reads closest to the viewer */}
            <line ref={r.thighB} strokeWidth={THIGH_W} {...line} />
            <line ref={r.shinB} strokeWidth={SHIN_W} {...line} />
            <line ref={r.footB} strokeWidth={FOOT_W} {...line} />
            <line ref={r.armNear} strokeWidth={ARM_W} {...line} />
          </g>
        </g>
      </svg>
    </div>
  );
}
