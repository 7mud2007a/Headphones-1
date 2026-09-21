import { useEffect, useRef, useState } from 'react';

/**
 * Tracks how far a section has scrolled through the viewport, as a 0 -> 1 progress value.
 * 0  = the section's top edge is at the bottom of the viewport (just entering)
 * 1  = the section's bottom edge has reached the top of the viewport (fully scrolled past)
 *
 * Uses a rAF-throttled scroll listener rather than firing on every scroll event.
 */
export function useScrollProgress(ref) {
  const [progress, setProgress] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const measure = () => {
      const rect = node.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const total = rect.height + viewportHeight;
      const traveled = viewportHeight - rect.top;
      const raw = traveled / total;
      setProgress(Math.min(1, Math.max(0, raw)));
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(measure);
      }
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ref]);

  return progress;
}

/**
 * Simple normalized mouse position tracker for parallax effects, from -1 to 1 on each axis,
 * relative to the center of the given element (or the window if no ref is passed).
 */
export function usePointerParallax(ref) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      const node = ref?.current;
      const rect = node ? node.getBoundingClientRect() : { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };
      const relX = (e.clientX - rect.left) / rect.width;
      const relY = (e.clientY - rect.top) / rect.height;
      setPos({ x: relX * 2 - 1, y: relY * 2 - 1 });
    };
    window.addEventListener('pointermove', handleMove, { passive: true });
    return () => window.removeEventListener('pointermove', handleMove);
  }, [ref]);

  return pos;
}
