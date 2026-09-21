import React from 'react';

export default function QuantitySelector({ value, onChange, min = 1, max = 10, compact = false }) {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));

  return (
    <div
      className={`inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] ${
        compact ? 'h-9' : 'h-12'
      }`}
    >
      <button
        type="button"
        onClick={dec}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className="flex h-full w-9 items-center justify-center text-lg text-ink-dim transition-colors hover:text-ink disabled:opacity-30"
      >
        &minus;
      </button>
      <span className="w-8 text-center text-sm font-medium tabular-nums text-ink">{value}</span>
      <button
        type="button"
        onClick={inc}
        disabled={value >= max}
        aria-label="Increase quantity"
        className="flex h-full w-9 items-center justify-center text-lg text-ink-dim transition-colors hover:text-ink disabled:opacity-30"
      >
        +
      </button>
    </div>
  );
}
