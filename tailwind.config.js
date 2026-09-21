/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#06060a',
        charcoal: '#0d0d13',
        surface: '#121218',
        'surface-2': '#1a1a22',
        'surface-border': 'rgba(255,255,255,0.08)',
        ink: '#f3f3f6',
        'ink-dim': '#9797a3',
        'ink-faint': '#5c5c68',
        violet: {
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
        },
        cyan: {
          400: '#5fd4ff',
          500: '#38bdf8',
          600: '#0ea5e9',
        },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        body: ['"Manrope"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'aura-gradient': 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 45%, #0ea5e9 100%)',
        'aura-radial': 'radial-gradient(circle at 50% 30%, rgba(139,92,246,0.25), transparent 60%)',
      },
      boxShadow: {
        'glow-sm': '0 0 24px rgba(139,92,246,0.25)',
        'glow-md': '0 0 48px rgba(139,92,246,0.28), 0 0 96px rgba(56,189,248,0.12)',
        'glow-cyan': '0 0 32px rgba(56,189,248,0.3)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: 0.4 },
          '50%': { opacity: 0.9 },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) both',
        'pulse-slow': 'pulse-slow 3.5s ease-in-out infinite',
        float: 'float 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
