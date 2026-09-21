# AURA — Premium 3D Headphones Store

A production-ready, cinematic 3D e-commerce experience for a premium wireless
headphones brand. Built with React, Vite, Three.js and React Three Fiber.

![AURA](public/favicon.svg)

## ✨ What's inside

- **Interactive 3D hero** — a fully procedural, PBR-shaded headphone model
  (no external 3D files needed) that idles, auto-rotates, and responds to
  drag (mouse + touch), mouse-parallax, and scroll.
- **Interactive product configurator** — switch between all 4 products,
  recolor them in real time with smooth color transitions, zoom with the
  scroll wheel / pinch, and swap between three procedural studio-lighting
  presets (Studio / Midnight / Sunset).
- **Full shop** — product grid, individual product pages with specs,
  features, a color + quantity selector, and a "you might also like" strip.
- **Cart** — a slide-over drawer and a full `/cart` page, both backed by the
  same context, persisted to `localStorage`.
- **Checkout** — customer + shipping forms, a mocked payment form (no real
  payment is processed), a live order summary, and an order-confirmation
  screen.
- **Technology / About / Contact pages**, a floating navbar that solidifies
  on scroll with a working client-side product search, a fully responsive
  mobile menu, magnetic buttons, scroll-reveal animations, and a custom
  cursor on desktop.
- Performance-conscious: routes and the 3D scene are code-split and
  lazy-loaded, 3D detail/particle count and pixel ratio scale down on
  mobile, and 3D object transforms are mutated via refs (not React state)
  every frame.

## 🧱 Tech stack

| Purpose            | Library                                  |
| ------------------ | ----------------------------------------- |
| Framework / bundler | React 18 + Vite 5                        |
| 3D rendering        | Three.js + @react-three/fiber + @react-three/drei |
| Animation           | Framer Motion                            |
| Routing             | React Router 6                           |
| Styling             | Tailwind CSS                             |
| State               | React Context + `useReducer` (cart), local component state elsewhere |

No 3D model files, textures, or external images are used — every visual
(the headphones, icons, particles, lighting) is generated procedurally in
code, so there's nothing to go missing or fail to load.

## 🚀 Getting started

You'll need **Node.js 18 or newer** installed.

```bash
npm install
```

```bash
npm run dev
```

This starts a local dev server (by default at `http://localhost:5173`) with
hot-reloading. Open it in your browser.

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

```bash
npm run preview
```

This serves the production build locally so you can sanity-check it before
deploying `dist/` anywhere (Netlify, Vercel, GitHub Pages, your own static
host, etc. all work — it's a static single-page app).

## 📁 Project structure

```
src/
  components/         Reusable UI (buttons, cards, cart drawer, navbar…)
    3d/               The procedural headphone model + the R3F <Scene>
  sections/           Larger composed page sections (Hero, ProductsGrid…)
  pages/              One file per route
  context/            CartContext (cart state + localStorage persistence)
  data/               Product catalog data
  hooks/              Reusable hooks (drag rotation, media queries…)
  styles/             Tailwind entry + global CSS
  App.jsx             Router + layout shell
  main.jsx            Entry point
```

## 🔧 Customizing

- **Products** — edit `src/data/products.js`. Every field there (price,
  specs, features, colorways, description) flows straight into the UI, so
  you can swap in your real catalog without touching any components.
- **Colors / fonts / brand tokens** — edit `tailwind.config.js` (the
  `violet` / `cyan` palette and `aura-gradient`) and the Google Fonts
  `<link>` in `index.html`.
- **The 3D model** — `src/components/3d/HeadphonesModel.jsx` builds the
  headphones out of primitive Three.js geometry (torus headband, cylinder
  ear cups, etc.), so you can tweak proportions/materials directly. If you'd
  rather use a real `.glb` model, drop it in `public/models/` and swap the
  primitives for a `useGLTF()` call from `@react-three/drei`.
- **Lighting presets** — `LIGHTING_PRESETS` in
  `src/components/3d/Scene.jsx`.

## 📝 Notes

- The checkout is a **front-end demo**: it validates required fields, shows
  a live order summary, and simulates placing an order — no real payment
  gateway or backend is wired up, and no card data is stored anywhere
  (that's stated on the checkout page too).
- The cart persists in the browser's `localStorage`, so it survives page
  refreshes but is local to that browser.
- This project was hand-built file by file in a sandboxed environment
  without package-registry access, so `npm install` / `npm run build` have
  not been executed end-to-end by the tool that generated it. Everything
  has been carefully reviewed for correctness, but if you hit an install or
  build issue, it's most likely a dependency version needing a small bump —
  run `npm install <package>@latest` for the affected package and re-run.

Enjoy! 🎧
