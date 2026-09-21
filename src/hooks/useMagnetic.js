import { useRef } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

/**
 * Gives an element a subtle "magnetic" pull toward the cursor on hover.
 * Spread `style` onto a motion.* element and wire up the two handlers.
 */
export function useMagnetic(strength = 0.3) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 14, mass: 0.25 });
  const springY = useSpring(y, { stiffness: 150, damping: 14, mass: 0.25 });

  const handlePointerMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { ref, style: { x: springX, y: springY }, handlePointerMove, handlePointerLeave };
}
