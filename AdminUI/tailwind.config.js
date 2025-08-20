/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'dodger-blue': 'rgb(var(--dodger-blue) / <alpha-value>)',
        'turquoise': 'rgb(var(--turquoise) / <alpha-value>)',
        'cloud-burst': 'rgb(var(--cloud-burst) / <alpha-value>)',
        'bright-turquoise': 'rgb(var(--bright-turquoise) / <alpha-value>)',
        'jacarta': 'rgb(var(--jacarta) / <alpha-value>)',
        'calypso': 'rgb(var(--calypso) / <alpha-value>)',
        'bay-of-many': 'rgb(var(--bay-of-many) / <alpha-value>)',
      },
    },
  },
  plugins: [],
}


