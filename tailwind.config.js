/** @type {import('tailwindcss').Config} */
export default {
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
          navy: '#060D17',
          deep: '#04080F',
          surface: '#0B1726',
          card: '#102238',
          border: '#1E3550',
          borderLight: '#2A4A6F',
          gold: '#D4AF37',
          goldLight: '#F7E7A9',
          goldDark: '#9E7D20',
          silver: '#C5CBD3',
          silverLight: '#ECEFF4',
          emerald: '#10B981',
          danger: '#EF4444',
          warning: '#F59E0B',
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
