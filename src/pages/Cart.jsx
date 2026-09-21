import React from 'react';
import RevealOnScroll from '../components/RevealOnScroll.jsx';
import CartContents from '../components/CartContents.jsx';

export default function Cart() {
  return (
    <div className="min-h-[70vh] pt-32">
      <div className="container-px mx-auto max-w-2xl pb-24">
        <RevealOnScroll className="mb-8">
          <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">Your cart</h1>
        </RevealOnScroll>
        <div className="flex min-h-[320px] flex-col rounded-3xl border border-white/[0.07] bg-white/[0.02] p-6">
          <CartContents />
        </div>
      </div>
    </div>
  );
}
