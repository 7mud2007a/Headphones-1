import React, { Suspense, lazy, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ColorSelector from '../components/ColorSelector.jsx';
import RevealOnScroll from '../components/RevealOnScroll.jsx';
import { InlineLoader } from '../components/Loader.jsx';
import { PRODUCTS, getColorway } from '../data/products.js';

const Scene = lazy(() => import('../components/3d/Scene.jsx'));

const LIGHTING_OPTIONS = [
  { id: 'studio', label: 'Studio' },
  { id: 'midnight', label: 'Midnight' },
  { id: 'sunset', label: 'Sunset' },
];

const SPEC_LABELS = {
  driver: 'Driver',
  battery: 'Battery life',
  anc: 'Noise cancellation',
  bluetooth: 'Bluetooth',
  latency: 'Latency',
  weight: 'Weight',
};

export default function InteractiveProduct() {
  const [productId, setProductId] = useState(PRODUCTS[0].id);
  const [lighting, setLighting] = useState('studio');

  const product = useMemo(() => PRODUCTS.find((p) => p.id === productId), [productId]);
  const [colorId, setColorId] = useState(product.colors[0]);

  const activeProduct = product;
  const activeColorId = activeProduct.colors.includes(colorId) ? colorId : activeProduct.colors[0];
  const colorway = getColorway(activeColorId);

  const handleProductChange = (id) => {
    const next = PRODUCTS.find((p) => p.id === id);
    setProductId(id);
    setColorId(next.colors[0]);
  };

  return (
    <section className="relative w-full bg-void py-24 md:py-32">
      <div className="container-px mx-auto max-w-6xl">
        <RevealOnScroll className="mb-14 max-w-xl">
          <span className="eyebrow">Interactive experience</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">Feel every detail before you buy.</h2>
          <p className="mt-3 text-ink-dim">
            Drag to rotate, scroll to zoom, and switch colorways in real time — this is exactly how it'll look on your
            desk.
          </p>
        </RevealOnScroll>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <RevealOnScroll delay={0.1} className="relative h-[420px] overflow-hidden rounded-[2rem] border border-white/[0.07] bg-gradient-to-b from-surface to-transparent sm:h-[480px]">
            <Suspense fallback={<InlineLoader label="Preparing model" />}>
              <Scene
                color={colorway.hex}
                accent={colorway.accent}
                lightingPreset={lighting}
                interactive
                enableZoom
                enableSparkles
                parallax
                autoRotateSpeed={0.1}
                baseRotationY={0.6}
              />
            </Suspense>
            <p className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 text-xs text-ink-faint">
              Drag to rotate · Scroll to zoom
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2} className="flex flex-col justify-center gap-8">
            <div className="flex flex-wrap gap-2">
              {PRODUCTS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleProductChange(p.id)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    p.id === activeProduct.id
                      ? 'border-violet-500/60 bg-violet-500/10 text-ink'
                      : 'border-white/10 text-ink-dim hover:text-ink'
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeProduct.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
              >
                <h3 className="font-display text-2xl font-semibold text-ink">{activeProduct.name}</h3>
                <p className="mt-1 text-ink-dim">{activeProduct.tagline}</p>

                <div className="mt-5">
                  <p className="mb-3 text-xs font-medium uppercase tracking-wide text-ink-faint">Color — {colorway.name}</p>
                  <ColorSelector
                    colors={activeProduct.colors.map((id) => getColorway(id))}
                    activeId={activeColorId}
                    onChange={setColorId}
                    size="lg"
                  />
                </div>

                <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-white/[0.08] pt-6">
                  {Object.entries(SPEC_LABELS).map(([key, label]) => (
                    <div key={key}>
                      <dt className="text-xs text-ink-faint">{label}</dt>
                      <dd className="mt-1 text-sm font-medium text-ink">{activeProduct.specs[key]}</dd>
                    </div>
                  ))}
                </dl>
              </motion.div>
            </AnimatePresence>

            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-wide text-ink-faint">Lighting</p>
              <div className="flex gap-2">
                {LIGHTING_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setLighting(opt.id)}
                    className={`rounded-full px-3.5 py-2 text-xs font-medium transition-colors duration-200 ${
                      lighting === opt.id ? 'bg-white/[0.1] text-ink' : 'text-ink-dim hover:text-ink'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
