/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/main/resources/**/*.{jsx,tsx,html,xml}',
    './src/main/resources/react4xp/**/*.{jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors (purple shades)
        primary: {
          100: '#696f88',
          300: '#5d5664',
          500: '#755275',
          700: '#4a104a',
        },
        // Secondary colors (gray shades)
        secondary: {
          100: '#f0f2f5',
          500: '#657683',
        },
        // Background colors
        background: {
          100: '#e5e5e5',
          300: '#efeaef',
          500: '#f8f6f8',
          700: '#fff',
        },
        // UI element colors
        header: {
          100: '#ede8ed',
        },
        subtext: {
          100: '#959AAF',
        },
        button: {
          100: '#fff',
        },
        warning: '#c20000',
        'purple-anchor': '#ffea00',
        'menu-bg': '#fff',
      },
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
      },
      fontSize: {
        // Base size
        base: ['16px', '1.5'],
        // Rich text
        'rich-text': ['18px', '22px'],
        // Headings - desktop
        'h1': ['50px', '60px'],
        'h2': ['45px', '54px'],
        'h3': ['38px', '46px'],
        // Headings - mobile (414px and below)
        'h1-mobile': ['45px', '54px'],
        'h2-mobile': ['38px', '46px'],
        'h3-mobile': ['31px', '38px'],
      },
      fontWeight: {
        'heading': '700',
        'heading-mobile': '800',
      },
      screens: {
        // Mobile-first breakpoint (replaces for_small_devices mixin)
        'mobile': {'max': '414px'},
      },
    },
  },
  plugins: [],
}
