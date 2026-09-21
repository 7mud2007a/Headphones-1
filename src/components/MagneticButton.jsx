import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useMagnetic } from '../hooks/useMagnetic.js';

const MotionLink = motion(Link);

/**
 * A button (or router Link, when `to` is passed) with a subtle magnetic
 * pull toward the cursor. Used for primary/secondary CTAs across the site.
 */
export default function MagneticButton({
  children,
  to,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  strength = 0.25,
  ...rest
}) {
  const magnet = useMagnetic(strength);
  const variantClass = variant === 'secondary' ? 'btn-secondary' : variant === 'ghost' ? 'btn-ghost' : 'btn-primary';
  const combinedClassName = `${variantClass} ${className}`;

  if (to) {
    return (
      <MotionLink
        to={to}
        ref={magnet.ref}
        style={magnet.style}
        onPointerMove={magnet.handlePointerMove}
        onPointerLeave={magnet.handlePointerLeave}
        onClick={onClick}
        className={combinedClassName}
        {...rest}
      >
        {children}
      </MotionLink>
    );
  }

  if (href) {
    return (
      <motion.a
        href={href}
        ref={magnet.ref}
        style={magnet.style}
        onPointerMove={magnet.handlePointerMove}
        onPointerLeave={magnet.handlePointerLeave}
        onClick={onClick}
        className={combinedClassName}
        {...rest}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      ref={magnet.ref}
      style={magnet.style}
      onPointerMove={magnet.handlePointerMove}
      onPointerLeave={magnet.handlePointerLeave}
      onClick={onClick}
      className={combinedClassName}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
