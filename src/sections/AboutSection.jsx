import React, { Suspense, lazy } from 'react';
import RevealOnScroll from '../components/RevealOnScroll.jsx';
import MagneticButton from '../components/MagneticButton.jsx';
import { InlineLoader } from '../components/Loader.jsx';

const Scene = lazy(() => import('../components/3d/Scene.jsx'));

export default function AboutSection({ condensed = false }) {
  return (
    <section className="relative w-full overflow-hidden bg-void py-24 md:py-32">
      <div className="container-px mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
        <RevealOnScroll>
          <span className="eyebrow">Our story</span>
          <h2 className="mt-4 text-balance font-display text-4xl font-bold leading-[1.1] text-ink sm:text-5xl">
            Built by people who couldn't find headphones good enough.
          </h2>
          <p className="mt-6 max-w-md text-ink-dim">
            AURA started as a frustration: every pair we owned made us choose between comfort, sound and looking like
            we were wearing a construction headset. So a small team of acousticians and industrial designers set out
            to build the pair we actually wanted.
          </p>
          {!condensed && (
            <p className="mt-4 max-w-md text-ink-dim">
              Three years and eleven prototypes later, AURA is worn by people who care about how things sound, how
              they feel, and how long they last. No gimmicks — just the details done properly.
            </p>
          )}
          <div className="mt-8">
            <MagneticButton to="/about" variant="secondary">
              {condensed ? 'Read our story' : 'Our commitments'}
            </MagneticButton>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15} className="relative h-[320px] rounded-[2rem] border border-white/[0.06] bg-gradient-to-b from-surface to-transparent sm:h-[400px]">
          <Suspense fallback={<InlineLoader label="Loading" />}>
            <Scene
              color="#1c1c22"
              accent="#38bdf8"
              lightingPreset="midnight"
              interactive={false}
              autoRotateSpeed={0.2}
              enableZoom={false}
              enableSparkles
              parallax={false}
              baseRotationY={0.9}
              scale={0.92}
            />
          </Suspense>
        </RevealOnScroll>
      </div>
    </section>
  );
}
