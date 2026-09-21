import React from 'react';
import RevealOnScroll from '../components/RevealOnScroll.jsx';

function IconWave() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M2 12c1.5-4 3-4 4.5 0s3 4 4.5 0 3-4 4.5 0 3 4 4.5 0" />
    </svg>
  );
}
function IconOrbit() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="2.2" />
      <ellipse cx="12" cy="12" rx="9" ry="4" />
      <ellipse cx="12" cy="12" rx="4" ry="9" transform="rotate(45 12 12)" />
    </svg>
  );
}
function IconBattery() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="17" height="10" rx="2.5" />
      <path d="M21 10v4" />
      <path d="M6 10.5h4l-1.5 3H12" />
    </svg>
  );
}
function IconBluetooth() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 7l10 10-5 4V3l5 4L7 17" />
    </svg>
  );
}
function IconDriver() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function IconBolt() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />
    </svg>
  );
}

const FEATURES = [
  {
    icon: IconWave,
    title: 'Active Noise Cancellation',
    description: 'A 4-microphone adaptive array reshapes itself to your surroundings up to 40 times per second.',
  },
  {
    icon: IconOrbit,
    title: 'Spatial Audio',
    description: 'Head-tracked, three-dimensional sound that moves naturally as you turn your head.',
  },
  {
    icon: IconBattery,
    title: '40-Hour Battery',
    description: 'A full week of daily listening on one charge, even with noise cancellation switched on.',
  },
  {
    icon: IconBluetooth,
    title: 'Bluetooth 5.3',
    description: 'Rock-solid multipoint pairing across two devices with none of the usual dropouts.',
  },
  {
    icon: IconDriver,
    title: 'Premium Drivers',
    description: 'Bio-cellulose diaphragms tuned by ear, not just by measurement, for a natural, open sound.',
  },
  {
    icon: IconBolt,
    title: 'Ultra-Low Latency',
    description: 'A dedicated gaming mode drops latency to 48ms so sound and picture stay perfectly in sync.',
  },
];

export default function TechnologySection({ compact = false, hideHeader = false }) {
  const items = compact ? FEATURES.slice(0, 3) : FEATURES;

  return (
    <section className="relative w-full bg-charcoal py-24 md:py-32">
      <div className="container-px mx-auto max-w-6xl">
        {!hideHeader && (
          <RevealOnScroll className="mb-14 max-w-xl">
            <span className="eyebrow">Engineered inside</span>
            <h2 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">The technology behind the sound.</h2>
          </RevealOnScroll>
        )}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, title, description }, i) => (
            <RevealOnScroll key={title} delay={i * 0.07}>
              <div className="group h-full rounded-2xl border border-white/[0.07] bg-white/[0.02] p-7 transition-colors duration-300 hover:bg-white/[0.045]">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-aura-gradient text-white shadow-glow-sm transition-transform duration-300 group-hover:scale-110">
                  <Icon />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-dim">{description}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
