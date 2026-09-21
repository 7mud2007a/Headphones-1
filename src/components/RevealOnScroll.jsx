import React from 'react';
import { motion } from 'framer-motion';

/**
 * A single, consistent scroll-reveal treatment used across the site
 * (technology cards, about section, product grid) so motion reads as
 * one deliberate system rather than scattered per-component effects.
 */
export default function RevealOnScroll({ children, delay = 0, y = 28, className = '', once = true }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
