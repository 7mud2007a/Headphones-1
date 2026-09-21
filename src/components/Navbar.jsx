import React, { useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useScrolled } from '../hooks/useScrolled.js';
import { useCart } from '../context/CartContext.jsx';
import { PRODUCTS } from '../data/products.js';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/technology', label: 'Technology' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

function SearchBox({ onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results = query.trim()
    ? PRODUCTS.filter((p) => p.name.toLowerCase().includes(query.trim().toLowerCase())).slice(0, 4)
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className="glass-strong absolute left-1/2 top-full mt-3 w-[min(92vw,420px)] -translate-x-1/2 rounded-2xl p-3"
    >
      <input
        ref={inputRef}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Escape' && onClose()}
        placeholder="Search AURA headphones…"
        className="input-field"
      />
      {results.length > 0 && (
        <ul className="mt-2 divide-y divide-white/[0.06]">
          {results.map((p) => (
            <li key={p.id}>
              <Link
                to={`/product/${p.slug}`}
                onClick={onClose}
                className="flex items-center justify-between gap-3 px-2 py-3 text-sm text-ink transition-colors hover:text-violet-300"
              >
                <span>{p.name}</span>
                <span className="text-ink-dim">${p.price}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {query.trim() && results.length === 0 && (
        <p className="px-2 py-3 text-sm text-ink-faint">No products match "{query}".</p>
      )}
    </motion.div>
  );
}

export default function Navbar() {
  const scrolled = useScrolled(24);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { totalCount, toggleDrawer } = useCart();

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4">
      <div
        className={`mx-auto mt-3 flex max-w-6xl items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 ease-out-expo md:mt-4 md:px-7 ${
          scrolled || mobileOpen ? 'glass-strong' : 'bg-transparent'
        }`}
      >
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold tracking-tight text-ink">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-aura-gradient text-sm">A</span>
          AURA
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive ? 'text-ink' : 'text-ink-dim hover:text-ink'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <div className="relative hidden sm:block">
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Search"
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink-dim transition-colors hover:bg-white/[0.06] hover:text-ink"
            >
              <SearchIcon />
            </button>
            <AnimatePresence>{searchOpen && <SearchBox onClose={() => setSearchOpen(false)} />}</AnimatePresence>
          </div>

          <button
            type="button"
            onClick={toggleDrawer}
            aria-label="Open cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink-dim transition-colors hover:bg-white/[0.06] hover:text-ink"
          >
            <CartIcon />
            {totalCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full bg-violet-500 px-1 text-[0.65rem] font-semibold text-white">
                {totalCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink-dim transition-colors hover:bg-white/[0.06] hover:text-ink lg:hidden"
          >
            <MenuIcon open={mobileOpen} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="glass-strong mt-2 overflow-hidden rounded-2xl lg:hidden"
          >
            <div className="flex flex-col p-3">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                      isActive ? 'bg-white/[0.06] text-ink' : 'text-ink-dim hover:text-ink'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="mt-1 border-t border-white/[0.08] pt-3">
                <SearchBoxMobile onNavigate={() => setMobileOpen(false)} />
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function SearchBoxMobile({ onNavigate }) {
  const [query, setQuery] = useState('');
  const results = query.trim()
    ? PRODUCTS.filter((p) => p.name.toLowerCase().includes(query.trim().toLowerCase())).slice(0, 4)
    : [];

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search AURA headphones…"
        className="input-field"
      />
      {results.length > 0 && (
        <ul className="mt-2 space-y-1">
          {results.map((p) => (
            <li key={p.id}>
              <Link
                to={`/product/${p.slug}`}
                onClick={onNavigate}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-ink hover:bg-white/[0.06]"
              >
                <span>{p.name}</span>
                <span className="text-ink-dim">${p.price}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" strokeLinecap="round" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 6h15l-1.5 9h-12z" strokeLinejoin="round" />
      <path d="M6 6 5 2H2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="20" r="1.4" />
      <circle cx="18" cy="20" r="1.4" />
    </svg>
  );
}

function MenuIcon({ open }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
    </svg>
  );
}
