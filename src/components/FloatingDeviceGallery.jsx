import { useRef, useState } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import DeviceFrame, { DEVICES } from './DeviceFrame';
import FadeImage from './FadeImage';
import { EASE } from '../lib/motion';
import { IN_APP } from '../lib/navigation';
import useMediaQuery from '../lib/useMediaQuery';

// Slight tilt + parallax range per grid slot, cycled if there are more products than slots.
const LAYOUTS = [
  { rotate: -2, parallax: [0, 40] },
  { rotate: 2, parallax: [0, 30] },
  { rotate: -1.5, parallax: [0, 40] },
];

function FloatingDevice({ project, layout, scale, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], layout.parallax);

  // Picked once, so the devices drift out of step with each other but a
  // re-render never restarts a float midway.
  const [floatDuration] = useState(() => 5 + Math.random());

  const native = DEVICES[project.device];
  const boxWidth = native.width * scale;
  const boxHeight = native.height * scale;

  return (
    <div ref={ref} className="flex justify-center">
      {/* Parallax + hover — sized to the final scaled footprint */}
      <m.div
        style={{ y, width: boxWidth, height: boxHeight, transformOrigin: 'top' }}
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{
          opacity: { duration: 1, ease: EASE, delay: 0.2 + index * 0.12 },
          default: { type: 'spring', stiffness: 200, damping: 20 },
        }}
      >
        <Link
          to={`/work/${project.slug}`}
          state={IN_APP}
          aria-label={project.name}
          className="relative block h-full w-full"
        >
          {/* Idle float */}
          <m.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: floatDuration, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Center the native-sized frame on the scaled box, then shrink + tilt it */}
            <m.div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                x: '-50%',
                y: '-50%',
                rotate: layout.rotate,
                scale,
              }}
            >
              <DeviceFrame type={project.device}>
                <FadeImage
                  src={project.screen}
                  alt=""
                  delay={0.3 + index * 0.12}
                  loading="eager"
                  sizes={`${Math.ceil(boxWidth)}px`}
                  className="h-full w-full object-cover"
                />
              </DeviceFrame>
            </m.div>
          </m.div>
        </Link>
      </m.div>
    </div>
  );
}

export default function FloatingDeviceGallery({ projects }) {
  const scale = useMediaQuery('(min-width: 768px)') ? 0.45 : 0.28;

  return (
    <div className="relative overflow-hidden pb-40 pt-56">
      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 place-items-center gap-x-8 gap-y-32 px-8 md:grid-cols-2 md:gap-x-16 md:gap-y-40">
        {projects.map((project, i) => (
          <FloatingDevice
            key={project.slug}
            project={project}
            layout={LAYOUTS[i % LAYOUTS.length]}
            scale={scale}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}
