import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import RevealOnScroll from '../components/RevealOnScroll.jsx';
import MagneticButton from '../components/MagneticButton.jsx';
import { useCart } from '../context/CartContext.jsx';

const SHIPPING_FLAT_RATE = 9;
const FREE_SHIPPING_THRESHOLD = 150;
const TAX_RATE = 0.08;

function Field({ label, className = '', ...props }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-xs font-medium text-ink-dim">{label}</span>
      <input {...props} className="input-field" />
    </label>
  );
}

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [placingOrder, setPlacingOrder] = useState(false);

  if (items.length === 0) {
    return <Navigate to="/shop" replace />;
  }

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT_RATE;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setPlacingOrder(true);

    const orderNumber = `AURA-${Date.now().toString(36).toUpperCase()}`;
    const orderSummary = {
      orderNumber,
      items,
      subtotal,
      shipping,
      tax,
      total,
    };

    setTimeout(() => {
      clearCart();
      navigate('/order-confirmation', { state: { order: orderSummary } });
    }, 700);
  };

  return (
    <div className="pt-32">
      <div className="container-px mx-auto max-w-6xl pb-24">
        <RevealOnScroll className="mb-10">
          <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">Checkout</h1>
        </RevealOnScroll>

        <form onSubmit={handlePlaceOrder} className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div className="space-y-10">
            <section>
              <h2 className="font-display text-lg font-semibold text-ink">Customer information</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field label="Full name" type="text" required placeholder="Jordan Lee" />
                <Field label="Email" type="email" required placeholder="jordan@email.com" />
                <Field label="Phone" type="tel" required placeholder="(555) 123-4567" />
              </div>
            </section>

            <section>
              <h2 className="font-display text-lg font-semibold text-ink">Shipping information</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field label="Address" type="text" required placeholder="123 Market Street" className="sm:col-span-2" />
                <Field label="City" type="text" required placeholder="San Francisco" />
                <Field label="State / Region" type="text" required placeholder="CA" />
                <Field label="ZIP / Postal code" type="text" required placeholder="94103" />
                <Field label="Country" type="text" required placeholder="United States" />
              </div>
            </section>

            <section>
              <h2 className="font-display text-lg font-semibold text-ink">Payment</h2>
              <p className="mt-1 text-xs text-ink-faint">
                This is a front-end demo — no real payment is processed and no card data is stored.
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field label="Name on card" type="text" required placeholder="Jordan Lee" className="sm:col-span-2" />
                <Field label="Card number" inputMode="numeric" required placeholder="4242 4242 4242 4242" className="sm:col-span-2" maxLength={19} />
                <Field label="Expiry (MM/YY)" type="text" required placeholder="12/29" maxLength={5} />
                <Field label="CVC" inputMode="numeric" required placeholder="123" maxLength={4} />
              </div>
            </section>
          </div>

          <div className="h-fit rounded-3xl border border-white/[0.07] bg-white/[0.02] p-6">
            <h2 className="font-display text-lg font-semibold text-ink">Order summary</h2>
            <div className="mt-4 max-h-72 space-y-4 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.key} className="flex items-center justify-between gap-3 text-sm">
                  <div>
                    <p className="font-medium text-ink">{item.name}</p>
                    <p className="text-xs text-ink-faint">
                      {item.colorName} · Qty {item.qty}
                    </p>
                  </div>
                  <span className="shrink-0 text-ink">${(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 space-y-2 border-t border-white/[0.08] pt-4 text-sm">
              <div className="flex justify-between text-ink-dim">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-ink-dim">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-ink-dim">
                <span>Estimated tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t border-white/[0.08] pt-3 font-display text-base font-semibold text-ink">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <MagneticButton type="submit" className="mt-6 w-full" disabled={placingOrder}>
              {placingOrder ? 'Placing order…' : 'Place order'}
            </MagneticButton>
          </div>
        </form>
      </div>
    </div>
  );
}
