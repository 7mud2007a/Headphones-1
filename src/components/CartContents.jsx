import React from 'react';
import { useNavigate } from 'react-router-dom';
import CartLineItem from './CartLineItem.jsx';
import MagneticButton from './MagneticButton.jsx';
import { useCart } from '../context/CartContext.jsx';

const FREE_SHIPPING_THRESHOLD = 150;

export default function CartContents({ onContinueShopping }) {
  const { items, subtotal } = useCart();
  const navigate = useNavigate();
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  if (items.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 py-16 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/[0.05]">
          <span className="text-2xl">🎧</span>
        </div>
        <div>
          <p className="font-display text-lg font-semibold text-ink">Your cart is empty</p>
          <p className="mt-1 text-sm text-ink-dim">Find your next favorite pair.</p>
        </div>
        <MagneticButton to="/shop" onClick={onContinueShopping} variant="secondary">
          Continue shopping
        </MagneticButton>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-1 overflow-y-auto px-1">
        {remainingForFreeShipping > 0 ? (
          <p className="mb-2 rounded-xl bg-white/[0.04] px-4 py-3 text-xs text-ink-dim">
            Add <span className="font-semibold text-ink">${remainingForFreeShipping.toFixed(2)}</span> more for free
            shipping.
          </p>
        ) : (
          <p className="mb-2 rounded-xl bg-violet-500/10 px-4 py-3 text-xs text-violet-300">
            You've unlocked free shipping.
          </p>
        )}
        {items.map((item) => (
          <CartLineItem key={item.key} item={item} />
        ))}
      </div>

      <div className="mt-4 space-y-4 border-t border-white/[0.08] pt-5">
        <div className="flex items-center justify-between text-sm text-ink-dim">
          <span>Subtotal</span>
          <span className="font-medium text-ink">${subtotal.toFixed(2)}</span>
        </div>
        <p className="text-xs text-ink-faint">Shipping and taxes calculated at checkout.</p>
        <div className="flex flex-col gap-2.5">
          <MagneticButton onClick={() => navigate('/checkout')} className="w-full">
            Proceed to checkout
          </MagneticButton>
          <MagneticButton to="/shop" onClick={onContinueShopping} variant="secondary" className="w-full">
            Continue shopping
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}
