import React from 'react';
import { motion } from 'framer-motion';

export default function ColorSelector({ colors, activeId, onChange, size = 'md' }) {
  const uid = React.useId();
  const dim = size === 'lg' ? 'h-11 w-11' : 'h-8 w-8';

  return (
    <div className="flex items-center gap-3" role="radiogroup" aria-label="Choose a color">
      {colors.map((c) => {
        const active = c.id === activeId;
        return (
          <button
            key={c.id}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={c.name}
            onClick={() => onChange(c.id)}
            className="group relative flex items-center justify-center"
          >
            <span
              className={`${dim} rounded-full border transition-all duration-300 ease-out-expo`}
              style={{
                backgroundColor: c.hex,
                borderColor: active ? c.accent : 'rgba(255,255,255,0.15)',
              }}
            />
            {active && (
              <motion.span
                layoutId={`color-ring-${uid}`}
                className="absolute -inset-1.5 rounded-full border-2"
                style={{ borderColor: c.accent }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-surface-2 px-2 py-1 text-[0.7rem] text-ink opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
              {c.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}
