import React from 'react';
import { motion } from 'framer-motion';

export function InlineLoader({ label = 'Loading experience' }) {
  return (
    <div className="flex h-full min-h-[320px] w-full flex-col items-center justify-center gap-4">
      <div className="relative h-10 w-10">
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-white/10 border-t-violet-500"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
      <span className="text-xs tracking-wide text-ink-faint">{label}</span>
    </div>
  );
}

export default function FullScreenLoader() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-void">
      <motion.div
        className="h-14 w-14 rounded-full border-2 border-white/10 border-t-violet-500"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      <span className="font-display text-sm tracking-[0.3em] text-ink-dim">AURA</span>
    </div>
  );
}
