import React from 'react';
import RevealOnScroll from '../components/RevealOnScroll.jsx';
import AboutSection from '../sections/AboutSection.jsx';

const VALUES = [
  {
    title: 'Craft',
    description: 'Every hinge, seam and button is prototyped by hand before it ever reaches a production line.',
  },
  {
    title: 'Longevity',
    description: 'Replaceable ear cushions, cables and batteries — built to be repaired, not replaced.',
  },
  {
    title: 'Honesty',
    description: 'Real specs, real materials, real reviews. No inflated numbers, no marketing science.',
  },
];

export default function About() {
  return (
    <div>
      <div className="pt-8">
        <AboutSection />
      </div>

      <section className="relative w-full bg-charcoal py-24 md:py-32">
        <div className="container-px mx-auto max-w-6xl">
          <RevealOnScroll className="mb-14 max-w-xl">
            <span className="eyebrow">What we stand for</span>
            <h2 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">A short list of things we won't compromise on.</h2>
          </RevealOnScroll>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {VALUES.map((v, i) => (
              <RevealOnScroll key={v.title} delay={i * 0.1}>
                <div className="h-full rounded-2xl border border-white/[0.07] bg-white/[0.02] p-7">
                  <span className="font-display text-3xl font-bold text-transparent [-webkit-text-stroke:1px_theme(colors.violet.400)]">
                    0{i + 1}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-dim">{v.description}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
