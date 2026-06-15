/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: '#FFD700',
        gold2: '#ffbf00',
        amber: '#f5a623',
        dark: '#0b0b0b',
        ink: '#161616',
        light: '#f7f7f7',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans: ['Sora', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        gold: '0 18px 60px -12px rgba(255,215,0,.28)',
        glass: '0 8px 32px rgba(0,0,0,.45)',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        shine: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        spinslow: {
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shine: 'shine 6s linear infinite',
        marquee: 'marquee 38s linear infinite',
        spinslow: 'spinslow 24s linear infinite',
      },
    },
  },
  plugins: [],
}
