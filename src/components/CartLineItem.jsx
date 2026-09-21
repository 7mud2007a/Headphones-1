import React from 'react';
import HeadphoneIcon from './HeadphoneIcon.jsx';
import QuantitySelector from './QuantitySelector.jsx';
import { useCart } from '../context/CartContext.jsx';

export default function CartLineItem({ item }) {
  const { updateQty, removeItem } = useCart();

  return (
    <div className="flex gap-4 border-b border-white/[0.06] py-5 last:border-none">
      <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/[0.04]">
        <HeadphoneIcon color={item.accent || '#8b5cf6'} className="h-14 w-14" glow={false} />
      </div>

      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-display text-sm font-semibold text-ink">{item.name}</p>
            <p className="text-xs text-ink-dim">{item.colorName}</p>
          </div>
          <p className="text-sm font-medium text-ink">${(item.price * item.qty).toFixed(2)}</p>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <QuantitySelector value={item.qty} onChange={(qty) => updateQty(item.key, qty)} compact />
          <button
            type="button"
            onClick={() => removeItem(item.key)}
            className="text-xs font-medium text-ink-faint underline-offset-2 transition-colors hover:text-ink hover:underline"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
