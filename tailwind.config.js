/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Barlow', 'sans-serif'],
      },
      colors: {
        vandyke: '#664228',
        paper: '#FAF8F5',
      },
      letterSpacing: {
        soft: '0.1em',
        luxe: '0.15em',
        loose: '0.2em',
      },
      transitionTimingFunction: {
        // Mirrors EASE in src/lib/motion.js.
        luxe: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
