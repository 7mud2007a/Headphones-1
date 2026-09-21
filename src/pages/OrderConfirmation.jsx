import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import MagneticButton from '../components/MagneticButton.jsx';

export default function OrderConfirmation() {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return <Navigate to="/shop" replace />;
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center pt-24">
      <div className="container-px mx-auto w-full max-w-lg text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 16 }}
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-aura-gradient text-3xl text-white shadow-glow-md"
        >
          ✓
        </motion.div>

        <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">Order confirmed</h1>
        <p className="mt-3 text-ink-dim">
          Thanks for shopping with AURA. A confirmation has been sent to your email — your order is on its way.
        </p>

        <div className="mt-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 text-left">
          <div className="flex items-center justify-between text-sm">
            <span className="text-ink-dim">Order number</span>
            <span className="font-medium text-ink">{order.orderNumber}</span>
          </div>
          <div className="mt-3 space-y-2 border-t border-white/[0.08] pt-3">
            {order.items.map((item) => (
              <div key={item.key} className="flex items-center justify-between text-sm">
                <span className="text-ink-dim">
                  {item.name} · {item.colorName} × {item.qty}
                </span>
                <span className="text-ink">${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-white/[0.08] pt-3 font-display text-base font-semibold text-ink">
            <span>Total</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <MagneticButton to="/shop">Continue shopping</MagneticButton>
          <MagneticButton to="/" variant="secondary">
            Back to home
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}
