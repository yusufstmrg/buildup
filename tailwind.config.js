/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          navy: 'var(--bg-navy)',
          deep: 'var(--bg-deep)',
          surface: 'var(--bg-surface)',
          card: 'var(--bg-card)',
          border: 'var(--border)',
          borderLight: 'var(--border-light)',
          gold: 'var(--gold)',
          goldLight: 'var(--gold-light)',
          goldDark: 'var(--gold-dark)',
          textMain: 'var(--text-main)',
          textMuted: 'var(--text-muted)'
        }
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(212, 175, 55, 0.3)',
        'gold-sm': '0 0 10px rgba(212, 175, 55, 0.2)',
      }
    },
  },
  plugins: [],
}
