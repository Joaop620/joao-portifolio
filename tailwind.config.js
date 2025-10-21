/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html','./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: '#FFD700',
        gold2: '#ffbf00',
        dark: '#0b0b0b',
        light: '#f7f7f7',
        ink: '#161616'
      },
      boxShadow: {
        gold: '0 10px 30px rgba(255,215,0,.20)'
      }
    },
  },
  plugins: [],
}