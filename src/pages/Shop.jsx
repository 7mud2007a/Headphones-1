import React from 'react';
import RevealOnScroll from '../components/RevealOnScroll.jsx';
import ProductsGrid from '../sections/ProductsGrid.jsx';

export default function Shop() {
  return (
    <div className="pt-32">
      <div className="container-px mx-auto max-w-6xl pb-4">
        <RevealOnScroll>
          <span className="eyebrow">Full catalog</span>
          <h1 className="mt-3 font-display text-4xl font-bold text-ink sm:text-5xl">Shop all headphones</h1>
          <p className="mt-3 max-w-lg text-ink-dim">
            Every AURA headset, built around the same obsession with sound quality and comfort — pick the one that
            fits how you listen.
          </p>
        </RevealOnScroll>
      </div>
      <ProductsGrid hideHeader />
    </div>
  );
}
