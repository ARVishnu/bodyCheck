/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dodger-blue': 'var(--dodger-blue)',
        'turquoise': 'var(--turquoise)',
        'cloud-burst': 'var(--cloud-burst)',
        'bright-turquoise': 'var(--bright-turquoise)',
        'jacarta': 'var(--jacarta)',
        'calypso': 'var(--calypso)',
        'bay-of-many': 'var(--bay-of-many)',
      },
    },
  },
  plugins: [],
};
