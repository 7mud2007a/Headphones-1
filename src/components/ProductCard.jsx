import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import HeadphoneIcon from './HeadphoneIcon.jsx';
import StarRating from './StarRating.jsx';
import { useCart } from '../context/CartContext.jsx';
import { getColorway } from '../data/products.js';

export default function ProductCard({ product }) {
  const ref = useRef(null);
  const { addItem } = useCart();

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(y, [0, 1], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-8, 8]), { stiffness: 200, damping: 20 });

  const primaryColor = getColorway(product.colors[0]);

  const handlePointerMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const resetTilt = () => {
    x.set(0.5);
    y.set(0.5);
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    addItem(
      {
        key: `${product.id}-${primaryColor.id}`,
        productId: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        colorId: primaryColor.id,
        colorName: primaryColor.name,
        colorHex: primaryColor.hex,
        accent: primaryColor.accent,
      },
      1
    );
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent p-6"
    >
      {product.badge && (
        <span className="absolute left-5 top-5 z-10 rounded-full bg-white/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-ink backdrop-blur-md">
          {product.badge}
        </span>
      )}

      <Link to={`/product/${product.slug}`} className="relative mb-5 flex aspect-square items-center justify-center">
        <div
          className="absolute inset-6 rounded-full opacity-40 blur-2xl transition-opacity duration-500 group-hover:opacity-70"
          style={{ background: primaryColor.accent }}
        />
        <HeadphoneIcon color={primaryColor.accent} className="relative h-36 w-36 transition-transform duration-500 group-hover:scale-105" />
      </Link>

      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-lg font-semibold text-ink">{product.name}</h3>
            <p className="text-sm text-ink-dim">{product.shortDescription}</p>
          </div>
        </div>

        <StarRating rating={product.rating} reviewCount={product.reviewCount} />

        <div className="mt-1 flex items-baseline gap-2">
          <span className="font-display text-xl font-semibold text-ink">${product.price}</span>
          {product.compareAtPrice && (
            <span className="text-sm text-ink-faint line-through">${product.compareAtPrice}</span>
          )}
        </div>

        <div className="mt-4 flex items-center gap-2.5">
          <Link
            to={`/product/${product.slug}`}
            className="flex-1 rounded-full border border-white/15 px-4 py-2.5 text-center text-sm font-medium text-ink transition-colors duration-200 hover:bg-white/[0.06]"
          >
            View product
          </Link>
          <button
            type="button"
            onClick={handleQuickAdd}
            className="flex-1 rounded-full bg-aura-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-glow-sm transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Add to cart
          </button>
        </div>
      </div>
    </motion.div>
  );
}
