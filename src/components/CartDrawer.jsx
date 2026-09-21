import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '../context/CartContext.jsx';
import CartContents from './CartContents.jsx';

export default function CartDrawer() {
  const { isDrawerOpen, closeDrawer, totalCount } = useCart();

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeDrawer}
          />
          <motion.aside
            className="fixed right-0 top-0 z-[80] flex h-full w-full max-w-md flex-col bg-charcoal p-6 shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-label="Shopping cart"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-ink">
                Your cart {totalCount > 0 && <span className="text-ink-dim">({totalCount})</span>}
              </h2>
              <button
                type="button"
                onClick={closeDrawer}
                aria-label="Close cart"
                className="flex h-9 w-9 items-center justify-center rounded-full text-ink-dim transition-colors hover:bg-white/[0.06] hover:text-ink"
              >
                ✕
              </button>
            </div>
            <CartContents onContinueShopping={closeDrawer} />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
