import React from 'react';

/**
 * A clean, scalable line-art headphone glyph used on product cards and
 * lightweight surfaces where a full 3D canvas would be overkill.
 */
export default function HeadphoneIcon({ color = '#8b5cf6', className = '', glow = true }) {
  const gradientId = React.useId();

  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.95" />
          <stop offset="100%" stopColor={color} stopOpacity="0.55" />
        </linearGradient>
      </defs>
      {glow && <circle cx="100" cy="95" r="72" fill={color} opacity="0.12" />}
      <path
        d="M46 108V96a54 54 0 0 1 108 0v12"
        stroke={`url(#${gradientId})`}
        strokeWidth="7"
        strokeLinecap="round"
      />
      <rect x="32" y="100" width="26" height="46" rx="12" fill={`url(#${gradientId})`} />
      <rect x="142" y="100" width="26" height="46" rx="12" fill={`url(#${gradientId})`} />
      <rect x="38" y="108" width="14" height="30" rx="7" fill="#08080b" opacity="0.55" />
      <rect x="148" y="108" width="14" height="30" rx="7" fill="#08080b" opacity="0.55" />
      <path d="M78 150c8 6 16 9 22 9s14-3 22-9" stroke={color} strokeWidth="4" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}
