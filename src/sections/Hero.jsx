import React, { Suspense, lazy, useRef } from 'react';
import { motion } from 'framer-motion';
import MagneticButton from '../components/MagneticButton.jsx';
import ScrollIndicator from '../components/ScrollIndicator.jsx';
import { InlineLoader } from '../components/Loader.jsx';
import { useScrollProgress } from '../hooks/useScrollProgress.js';

const Scene = lazy(() => import('../components/3d/Scene.jsx'));

export default function Hero() {
  const sectionRef = useRef(null);
  const scrollProgress = useScrollProgress(sectionRef);

  return (
    <section ref={sectionRef} className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-void">
      <div className="absolute inset-0">
        <Suspense fallback={<InlineLoader label="Loading the experience" />}>
          <Scene
            color="#1c1c22"
            accent="#8b5cf6"
            lightingPreset="studio"
            interactive
            autoRotateSpeed={0.12}
            enableSparkles
            parallax
            scrollProgress={scrollProgress}
            baseRotationY={0.5}
          />
        </Suspense>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-aura-radial" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Introducing AURA
        </motion.span>

        <motion.h1
          className="mt-4 max-w-3xl text-balance font-display text-5xl font-bold leading-[1.05] text-ink sm:text-6xl md:text-7xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Sound. <span className="bg-aura-gradient bg-clip-text text-transparent">Reimagined.</span>
        </motion.h1>

        <motion.p
          className="mt-5 max-w-md text-base text-ink-dim sm:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          Experience every detail with next-generation wireless audio.
        </motion.p>

        <motion.div
          className="mt-9 flex flex-col gap-3 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <MagneticButton to="/shop">Shop headphones</MagneticButton>
          <MagneticButton to="/technology" variant="secondary">
            Explore technology
          </MagneticButton>
        </motion.div>

        <p className="pointer-events-none mt-6 text-xs text-ink-faint">Drag to rotate · Scroll to explore</p>
      </div>

      <ScrollIndicator visible={scrollProgress < 0.15} />
    </section>
  );
}
