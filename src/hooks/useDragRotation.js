import { useCallback, useRef } from 'react';

/**
 * Reusable inertial drag-rotation controller for a Three.js object.
 * Works with mouse AND touch, since React Three Fiber's pointer events
 * are unified Pointer Events under the hood.
 *
 * Usage inside an R3F component:
 *   const drag = useDragRotation();
 *   <group
 *     onPointerDown={drag.onPointerDown}
 *     onPointerMove={drag.onPointerMove}
 *     onPointerUp={drag.onPointerUp}
 *     onPointerLeave={drag.onPointerUp}
 *   />
 *   useFrame(() => { const r = drag.tick(); meshRef.current.rotation.y = baseY + r.y; });
 */
export function useDragRotation({ sensitivity = 0.009, damping = 0.94, verticalLimit = 0.5 } = {}) {
  const isDragging = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const rotation = useRef({ x: 0, y: 0 });

  const onPointerDown = useCallback((e) => {
    e.stopPropagation?.();
    isDragging.current = true;
    lastPointer.current = { x: e.clientX, y: e.clientY };
    velocity.current = { x: 0, y: 0 };
    if (e.target?.setPointerCapture && e.pointerId !== undefined) {
      try {
        e.target.setPointerCapture(e.pointerId);
      } catch (err) {
        // Some synthetic targets don't support capture — safe to ignore.
      }
    }
  }, []);

  const onPointerMove = useCallback(
    (e) => {
      if (!isDragging.current) return;
      const dx = e.clientX - lastPointer.current.x;
      const dy = e.clientY - lastPointer.current.y;
      lastPointer.current = { x: e.clientX, y: e.clientY };

      const vy = dx * sensitivity;
      const vx = dy * sensitivity;

      rotation.current.y += vy;
      rotation.current.x = Math.max(-verticalLimit, Math.min(verticalLimit, rotation.current.x + vx));
      velocity.current = { x: vx, y: vy };
    },
    [sensitivity, verticalLimit]
  );

  const onPointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  /** Call once per frame. Returns the current { x, y } rotation offset in radians. */
  const tick = useCallback(() => {
    if (!isDragging.current) {
      rotation.current.y += velocity.current.y;
      rotation.current.x = Math.max(-verticalLimit, Math.min(verticalLimit, rotation.current.x + velocity.current.x));
      velocity.current.x *= damping;
      velocity.current.y *= damping;
      if (Math.abs(velocity.current.x) < 0.00005) velocity.current.x = 0;
      if (Math.abs(velocity.current.y) < 0.00005) velocity.current.y = 0;
    }
    return rotation.current;
  }, [damping, verticalLimit]);

  return { onPointerDown, onPointerMove, onPointerUp, isDragging, velocity, tick };
}
