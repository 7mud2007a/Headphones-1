import React from 'react';
import MagneticButton from '../components/MagneticButton.jsx';

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 pt-24 text-center">
      <span className="font-display text-7xl font-bold text-transparent [-webkit-text-stroke:1.5px_theme(colors.violet.400)]">
        404
      </span>
      <h1 className="mt-4 font-display text-2xl font-semibold text-ink">This page went quiet.</h1>
      <p className="mt-2 max-w-sm text-ink-dim">The page you're looking for doesn't exist or has moved.</p>
      <div className="mt-8 flex gap-3">
        <MagneticButton to="/">Back to home</MagneticButton>
        <MagneticButton to="/shop" variant="secondary">
          Shop headphones
        </MagneticButton>
      </div>
    </div>
  );
}
