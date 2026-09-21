import React from 'react';
import ProductCard from '../components/ProductCard.jsx';
import RevealOnScroll from '../components/RevealOnScroll.jsx';
import MagneticButton from '../components/MagneticButton.jsx';
import { PRODUCTS } from '../data/products.js';

export default function ProductsGrid({ title = 'Featured collection', showViewAll = false, subtitle, hideHeader = false }) {
  return (
    <section className="relative w-full bg-void py-24 md:py-32">
      <div className="container-px mx-auto max-w-6xl">
        {!hideHeader && (
          <RevealOnScroll className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div className="max-w-lg">
              <span className="eyebrow">The lineup</span>
              <h2 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">{title}</h2>
              {subtitle && <p className="mt-3 text-ink-dim">{subtitle}</p>}
            </div>
            {showViewAll && (
              <MagneticButton to="/shop" variant="secondary">
                View all
              </MagneticButton>
            )}
          </RevealOnScroll>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((product, i) => (
            <RevealOnScroll key={product.id} delay={i * 0.08}>
              <ProductCard product={product} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
