import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { DeviceFrameset } from 'react-device-frameset';
import 'react-device-frameset/styles/marvel-devices.min.css';
import FadeImage from './FadeImage';

const DEVICE_NAMES = {
  iphone: 'iPhone X',
  ipad: 'iPad Mini',
  macbook: 'MacBook Pro',
};

// Native pixel size of each device frame (from react-device-frameset's marvel-devices.css).
const DEVICE_NATIVE_SIZE = {
  iphone: { width: 375, height: 812 },
  ipad: { width: 576, height: 768 },
  macbook: { width: 960, height: 600 },
};

// Slight tilt + parallax range per grid slot, cycled if there are more products than slots.
const LAYOUTS = [
  { rotate: -2, parallax: [0, 40] },
  { rotate: 2, parallax: [0, 30] },
  { rotate: -1.5, parallax: [0, 40] },
];

function useResponsiveScale() {
  const [scale, setScale] = useState(0.28);
  useEffect(() => {
    const update = () => setScale(window.innerWidth >= 768 ? 0.45 : 0.28);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return scale;
}

function FloatingDevice({ product, layout, onSelect, scale, index = 0 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], layout.parallax);

  const native = DEVICE_NATIVE_SIZE[product.deviceType];
  const boxWidth = native.width * scale;
  const boxHeight = native.height * scale;

  return (
    <div ref={ref} className="flex justify-center">
      {/* Parallax + click + hover — sized to the final scaled footprint */}
      <motion.div
        style={{ y, width: boxWidth, height: boxHeight, position: 'relative', transformOrigin: 'top' }}
        className="cursor-pointer"
        data-cursor="VIEW"
        onClick={() => onSelect(product)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{
          opacity: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 + index * 0.12 },
          default: { type: 'spring', stiffness: 200, damping: 20 },
        }}
      >
        {/* Idle float */}
        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{
            duration: 5 + Math.random(),
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {/* Center the native-sized frame on the scaled box, then shrink + tilt it */}
          <motion.div
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
            <DeviceFrameset device={DEVICE_NAMES[product.deviceType]}>
              <FadeImage
                src={product.profileImage}
                alt={product.name}
                delay={0.3 + index * 0.12}
                className="w-full h-full object-cover"
              />
            </DeviceFrameset>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function FloatingDeviceGallery({ products, onSelect }) {
  const scale = useResponsiveScale();

  return (
    <div className="relative overflow-hidden pt-56 pb-40">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-16 gap-y-32 md:gap-y-40 place-items-center max-w-screen-2xl mx-auto px-8">
        {products.map((product, i) => (
          <FloatingDevice
            key={product.id}
            product={product}
            layout={LAYOUTS[i % LAYOUTS.length]}
            onSelect={onSelect}
            scale={scale}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}
