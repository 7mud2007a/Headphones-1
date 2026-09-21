import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FOOTER_LINKS = {
  Shop: [
    { label: 'AURA X1', to: '/product/aura-x1' },
    { label: 'AURA Pro', to: '/product/aura-pro' },
    { label: 'AURA Studio', to: '/product/aura-studio' },
    { label: 'AURA Air', to: '/product/aura-air' },
  ],
  Company: [
    { label: 'About', to: '/about' },
    { label: 'Technology', to: '/technology' },
    { label: 'Contact', to: '/contact' },
  ],
  Shop_: [
    { label: 'All headphones', to: '/shop' },
    { label: 'Your cart', to: '/cart' },
  ],
};

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail('');
  };

  return (
    <footer className="border-t border-white/[0.06] bg-charcoal">
      <div className="container-px mx-auto grid max-w-6xl gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold text-ink">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-aura-gradient text-sm">A</span>
            AURA
          </Link>
          <p className="mt-4 max-w-xs text-sm text-ink-dim">
            Premium wireless audio, engineered for people who notice the details.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-ink">Shop</h4>
          <ul className="mt-4 space-y-2.5">
            {FOOTER_LINKS.Shop.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-sm text-ink-dim transition-colors hover:text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-ink">Company</h4>
          <ul className="mt-4 space-y-2.5">
            {FOOTER_LINKS.Company.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-sm text-ink-dim transition-colors hover:text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-ink">Stay in the loop</h4>
          <p className="mt-4 text-sm text-ink-dim">Product news and early access. No spam.</p>
          {submitted ? (
            <p className="mt-3 text-sm text-violet-300">You're on the list.</p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="input-field"
              />
              <button
                type="submit"
                className="shrink-0 rounded-xl bg-aura-gradient px-4 text-sm font-semibold text-white transition-transform hover:scale-[1.03] active:scale-[0.97]"
              >
                Join
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="container-px mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-white/[0.06] py-6 text-xs text-ink-faint sm:flex-row">
        <p>© {new Date().getFullYear()} AURA Audio. All rights reserved.</p>
        <div className="flex gap-5">
          <span className="cursor-default">Privacy</span>
          <span className="cursor-default">Terms</span>
          <span className="cursor-default">Warranty</span>
        </div>
      </div>
    </footer>
  );
}
