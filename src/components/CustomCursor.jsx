import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useIsTouchDevice, usePrefersReducedMotion } from '../hooks/useMediaQuery.js';

const INTERACTIVE_SELECTOR = 'a, button, input, textarea, [role="radio"], [role="button"]';

export default function CustomCursor() {
  const isTouch = useIsTouchDevice();
  const reducedMotion = usePrefersReducedMotion();
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    if (isTouch || reducedMotion) return undefined;

    const handleMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const handleOver = (e) => {
      setHovering(Boolean(e.target.closest?.(INTERACTIVE_SELECTOR)));
    };
    const handleLeaveWindow = () => setVisible(false);

    window.addEventListener('pointermove', handleMove, { passive: true });
    window.addEventListener('pointerover', handleOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleLeaveWindow);

    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerover', handleOver);
      document.documentElement.removeEventListener('mouseleave', handleLeaveWindow);
    };
  }, [isTouch, reducedMotion, visible, x, y]);

  if (isTouch || reducedMotion) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[200] mix-blend-difference"
      style={{ x: springX, y: springY, opacity: visible ? 1 : 0 }}
    >
      <motion.div
        className="rounded-full border border-white bg-white/20"
        animate={{
          width: hovering ? 44 : 18,
          height: hovering ? 44 : 18,
          x: hovering ? -22 : -9,
          y: hovering ? -22 : -9,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      />
    </motion.div>
  );
}
