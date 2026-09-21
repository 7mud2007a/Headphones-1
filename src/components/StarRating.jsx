import React from 'react';

function Star({ fill, gradientId }) {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
      <defs>
        <linearGradient id={gradientId}>
          <stop offset={`${fill * 100}%`} stopColor="#c9a8ff" />
          <stop offset={`${fill * 100}%`} stopColor="transparent" />
        </linearGradient>
      </defs>
      <path
        d="M10 1.5l2.55 5.17 5.7.83-4.13 4.02.97 5.68L10 14.5l-5.1 2.68.98-5.68L1.75 7.5l5.7-.83L10 1.5z"
        fill={fill > 0 ? `url(#${gradientId})` : 'none'}
        stroke="#726f85"
        strokeWidth="1"
      />
    </svg>
  );
}

export default function StarRating({ rating = 0, reviewCount, size = 'sm' }) {
  const uid = React.useId();
  const stars = [0, 1, 2, 3, 4].map((i) => Math.min(1, Math.max(0, rating - i)));

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {stars.map((fill, i) => (
          <Star key={i} fill={fill} gradientId={`star-${uid}-${i}`} />
        ))}
      </div>
      <span className={size === 'sm' ? 'text-xs text-ink-dim' : 'text-sm text-ink-dim'}>
        {rating.toFixed(1)}
        {typeof reviewCount === 'number' && ` (${reviewCount.toLocaleString()})`}
      </span>
    </div>
  );
}
