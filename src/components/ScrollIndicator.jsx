import React from 'react';
import { motion } from 'framer-motion';

export default function ScrollIndicator({ visible = true }) {
  return (
    <motion.div
      className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4 }}
    >
      <span className="text-[0.7rem] uppercase tracking-[0.2em] text-ink-faint">Scroll</span>
      <div className="flex h-9 w-6 items-start justify-center rounded-full border border-white/20 p-1.5">
        <motion.span
          className="h-1.5 w-1.5 rounded-full bg-violet-400"
          animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  );
}
