import React, { Suspense, lazy, useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import ColorSelector from '../components/ColorSelector.jsx';
import QuantitySelector from '../components/QuantitySelector.jsx';
import StarRating from '../components/StarRating.jsx';
import HeadphoneIcon from '../components/HeadphoneIcon.jsx';
import RevealOnScroll from '../components/RevealOnScroll.jsx';
import MagneticButton from '../components/MagneticButton.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { InlineLoader } from '../components/Loader.jsx';
import { PRODUCTS, getColorway, getProductBySlug } from '../data/products.js';
import { useCart } from '../context/CartContext.jsx';

const Scene = lazy(() => import('../components/3d/Scene.jsx'));

const SPEC_ROWS = [
  ['driver', 'Driver'],
  ['battery', 'Battery life'],
  ['anc', 'Noise cancellation'],
  ['bluetooth', 'Bluetooth'],
  ['latency', 'Latency'],
  ['weight', 'Weight'],
  ['charging', 'Charging'],
  ['water', 'Water resistance'],
];

export default function ProductDetails() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  const { addItem } = useCart();

  const [colorId, setColorId] = useState(product?.colors[0]);
  const [qty, setQty] = useState(1);
  const [lighting, setLighting] = useState('studio');
  const [justAdded, setJustAdded] = useState(false);

  const related = useMemo(() => PRODUCTS.filter((p) => p.id !== product?.id).slice(0, 3), [product]);

  if (!product) {
    return <Navigate to="/shop" replace />;
  }

  const colorway = getColorway(colorId);

  const buildCartItem = () => ({
    key: `${product.id}-${colorway.id}`,
    productId: product.id,
    slug: product.slug,
    name: product.name,
    price: product.price,
    colorId: colorway.id,
    colorName: colorway.name,
    colorHex: colorway.hex,
    accent: colorway.accent,
  });

  const handleAddToCart = () => {
    addItem(buildCartItem(), qty);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <div className="pt-28">
      <div className="container-px mx-auto max-w-6xl">
        <nav className="mb-6 flex items-center gap-1.5 text-xs text-ink-faint">
          <Link to="/" className="hover:text-ink">
            Home
          </Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-ink">
            Shop
          </Link>
          <span>/</span>
          <span className="text-ink-dim">{product.name}</span>
        </nav>

        <div className="grid gap-12 pb-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="relative h-[420px] overflow-hidden rounded-[2rem] border border-white/[0.07] bg-gradient-to-b from-surface to-transparent sm:h-[500px]">
              <Suspense fallback={<InlineLoader label="Loading model" />}>
                <Scene
                  color={colorway.hex}
                  accent={colorway.accent}
                  lightingPreset={lighting}
                  interactive
                  enableZoom
                  enableSparkles
                  parallax
                  autoRotateSpeed={0.09}
                  baseRotationY={0.6}
                />
              </Suspense>
              <p className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 text-xs text-ink-faint">
                Drag to rotate · Scroll to zoom
              </p>
            </div>

            <div className="mt-4 flex gap-3">
              {['studio', 'midnight', 'sunset'].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setLighting(preset)}
                  className={`flex h-16 flex-1 items-center justify-center rounded-xl border text-xs font-medium capitalize transition-colors duration-200 ${
                    lighting === preset ? 'border-violet-500/60 bg-violet-500/10 text-ink' : 'border-white/10 text-ink-dim hover:text-ink'
                  }`}
                >
                  <HeadphoneIcon color={colorway.accent} className="mr-2 h-6 w-6" glow={false} />
                  {preset}
                </button>
              ))}
            </div>
          </div>

          <div>
            {product.badge && (
              <span className="mb-3 inline-block rounded-full bg-white/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-ink">
                {product.badge}
              </span>
            )}
            <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">{product.name}</h1>
            <p className="mt-1 text-ink-dim">{product.tagline}</p>

            <div className="mt-3">
              <StarRating rating={product.rating} reviewCount={product.reviewCount} size="md" />
            </div>

            <div className="mt-5 flex items-baseline gap-3">
              <span className="font-display text-3xl font-semibold text-ink">${product.price}</span>
              {product.compareAtPrice && (
                <span className="text-lg text-ink-faint line-through">${product.compareAtPrice}</span>
              )}
            </div>

            <p className="mt-6 max-w-lg leading-relaxed text-ink-dim">{product.description}</p>

            <div className="mt-7">
              <p className="mb-3 text-xs font-medium uppercase tracking-wide text-ink-faint">Color — {colorway.name}</p>
              <ColorSelector
                colors={product.colors.map((id) => getColorway(id))}
                activeId={colorway.id}
                onChange={setColorId}
                size="lg"
              />
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-wide text-ink-faint">Quantity</p>
                <QuantitySelector value={qty} onChange={setQty} />
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <MagneticButton onClick={handleAddToCart} variant="secondary" className="sm:flex-1">
                {justAdded ? 'Added ✓' : 'Add to cart'}
              </MagneticButton>
              <MagneticButton to="/checkout" onClick={() => addItem(buildCartItem(), qty, { openCart: false })} className="sm:flex-1">
                Buy now
              </MagneticButton>
            </div>

            <div className="mt-10 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
              <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-ink-dim">
                Technical specifications
              </h2>
              <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-3.5 sm:grid-cols-2">
                {SPEC_ROWS.map(([key, label]) => (
                  <div key={key} className="flex items-center justify-between border-b border-white/[0.05] pb-2.5 sm:border-none sm:pb-0">
                    <dt className="text-sm text-ink-faint">{label}</dt>
                    <dd className="text-sm font-medium text-ink">{product.specs[key]}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-8">
              <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-ink-dim">Features</h2>
              <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-ink-dim">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="pb-24">
            <RevealOnScroll className="mb-8">
              <h2 className="font-display text-2xl font-bold text-ink">You might also like</h2>
            </RevealOnScroll>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
