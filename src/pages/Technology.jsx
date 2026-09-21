import React from 'react';
import RevealOnScroll from '../components/RevealOnScroll.jsx';
import TechnologySection from '../sections/TechnologySection.jsx';

export default function Technology() {
  return (
    <div className="pt-32">
      <div className="container-px mx-auto max-w-6xl pb-4">
        <RevealOnScroll className="max-w-2xl">
          <span className="eyebrow">Under the hood</span>
          <h1 className="mt-3 font-display text-4xl font-bold text-ink sm:text-5xl">
            Every detail, engineered on purpose.
          </h1>
          <p className="mt-4 text-ink-dim">
            None of this happened by accident. Every material, driver and algorithm inside an AURA headset was
            chosen — and usually rebuilt more than once — to get one thing right: how it actually sounds and feels
            on your head for eight hours straight.
          </p>
        </RevealOnScroll>
      </div>
      <TechnologySection hideHeader />
    </div>
  );
}
