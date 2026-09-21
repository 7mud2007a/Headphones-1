// Realistic placeholder catalog data.
// Swap these values out for real product content whenever it's ready —
// every field here is consumed directly by the UI, so the shape must stay the same.

export const COLORWAYS = [
  { id: 'midnight', name: 'Midnight Black', hex: '#1c1c22', accent: '#8b5cf6' },
  { id: 'arctic', name: 'Arctic White', hex: '#eceef2', accent: '#38bdf8' },
  { id: 'electric', name: 'Electric Purple', hex: '#6d28d9', accent: '#a78bfa' },
];

export const PRODUCTS = [
  {
    id: 'aura-x1',
    slug: 'aura-x1',
    name: 'AURA X1',
    tagline: 'The flagship. Redefined.',
    shortDescription: 'Flagship noise cancelling over-ears with adaptive spatial audio.',
    description:
      'AURA X1 is our flagship wireless headset, built around a 42mm driver array and a fully adaptive noise cancellation system that reshapes itself to your environment forty times a second. Every surface is machined aluminum and aerospace-grade composite, tuned to disappear the moment you put them on.',
    price: 399,
    compareAtPrice: 449,
    rating: 4.8,
    reviewCount: 1284,
    colors: ['midnight', 'arctic', 'electric'],
    badge: 'Best Seller',
    specs: {
      driver: '42mm Bio-Cellulose',
      battery: '40 hours (ANC on)',
      anc: 'Adaptive Pro, 4-mic array',
      bluetooth: 'Bluetooth 5.3, Multipoint',
      latency: '48ms Low-Latency Mode',
      weight: '278g',
      charging: 'USB-C, 10 min = 5 hours',
      water: 'IPX4 splash resistant',
    },
    features: [
      'Adaptive Active Noise Cancellation',
      'Spatial Audio with head tracking',
      '40-hour battery on a single charge',
      'Ultra-low latency gaming mode',
      'Multipoint pairing for two devices',
      'Plush memory-foam ear cushions',
    ],
  },
  {
    id: 'aura-pro',
    slug: 'aura-pro',
    name: 'AURA Pro',
    tagline: 'Precision for professionals.',
    shortDescription: 'Studio-tuned drivers with a balanced, reference-grade sound signature.',
    description:
      'AURA Pro is tuned for people who can hear the difference. A reference-flat frequency response, dual-mode ANC for studio and street, and a fold-flat hinge system built for people who live out of a backpack. This is the pair the engineers reach for first.',
    price: 329,
    compareAtPrice: null,
    rating: 4.7,
    reviewCount: 842,
    colors: ['midnight', 'arctic'],
    badge: null,
    specs: {
      driver: '40mm Titanium-coated',
      battery: '35 hours (ANC on)',
      anc: 'Dual-mode Adaptive',
      bluetooth: 'Bluetooth 5.3',
      latency: '65ms Standard Mode',
      weight: '265g',
      charging: 'USB-C, 10 min = 4 hours',
      water: 'IPX4 splash resistant',
    },
    features: [
      'Reference-flat studio tuning',
      'Fold-flat travel hinge system',
      '35-hour battery on a single charge',
      'Dual-mode noise cancellation',
      'Detachable 3.5mm analog cable',
      'Recycled aluminum yoke construction',
    ],
  },
  {
    id: 'aura-studio',
    slug: 'aura-studio',
    name: 'AURA Studio',
    tagline: 'Immersive by design.',
    shortDescription: 'Warm, room-filling sound with oversized 45mm drivers.',
    description:
      "AURA Studio leans into warmth and depth — oversized 45mm drivers, a deeper ear cup cavity, and a bass response tuned for people who feel their music as much as they hear it. It's the largest, most immersive headset in the AURA lineup.",
    price: 279,
    compareAtPrice: 309,
    rating: 4.6,
    reviewCount: 613,
    colors: ['midnight', 'electric'],
    badge: 'New',
    specs: {
      driver: '45mm Dynamic',
      battery: '30 hours (ANC on)',
      anc: 'Adaptive Standard',
      bluetooth: 'Bluetooth 5.2',
      latency: '70ms Standard Mode',
      weight: '292g',
      charging: 'USB-C, 10 min = 4 hours',
      water: 'Not water resistant',
    },
    features: [
      'Oversized 45mm dynamic drivers',
      'Deep-cavity ear cup design',
      '30-hour battery on a single charge',
      'Signature warm bass tuning',
      'Vegan leather headband wrap',
      'Ambient sound passthrough mode',
    ],
  },
  {
    id: 'aura-air',
    slug: 'aura-air',
    name: 'AURA Air',
    tagline: 'Featherweight freedom.',
    shortDescription: 'Our lightest headset yet, built for all-day, every-day wear.',
    description:
      'AURA Air strips away every unnecessary gram without cutting a single corner on sound. A featherweight suspension headband and breathable mesh cushions mean you forget you have them on — even six hours in.',
    price: 249,
    compareAtPrice: null,
    rating: 4.5,
    reviewCount: 401,
    colors: ['arctic', 'electric', 'midnight'],
    badge: null,
    specs: {
      driver: '38mm Bio-Cellulose',
      battery: '32 hours (ANC on)',
      anc: 'Adaptive Standard',
      bluetooth: 'Bluetooth 5.3',
      latency: '65ms Standard Mode',
      weight: '212g',
      charging: 'USB-C, 10 min = 5 hours',
      water: 'IPX4 splash resistant',
    },
    features: [
      'Featherweight 212g suspension design',
      'Breathable mesh ear cushions',
      '32-hour battery on a single charge',
      'Adaptive noise cancellation',
      'Wear-detection auto-pause',
      'Compact fold-flat carry case',
    ],
  },
];

export function getProductBySlug(slug) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getColorway(id) {
  return COLORWAYS.find((c) => c.id === id);
}
