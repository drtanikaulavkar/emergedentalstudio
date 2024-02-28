const daisyui = require('daisyui');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    extend: {
      colors: {
        primary: {
          0: '#f2e7f3',
          100: '#a762ad',
          200: '#a15bab',
          300: '#9a55a9',
          400: '#934ea7',
          500: '#8441a4',
          600: '#7c3ba3',
          700: '#7335a2',
          800: '#6a30a0',
          900: '#602a9f',
        },
        gray: {
          100: '#f7fafc',
          200: '#edf2f7',
          300: '#e2e8f0',
          400: '#cbd5e0',
          500: '#a0aec0',
          600: '#718096',
          700: '#4a5568',
          800: '#2d3748',
          900: '#1a202c',
        },
        hero: {
          0: '#FFFFFF',
          1: '#87c3e3',
        },
      },
      lineHeight: {
        hero: '3.5rem',
      },
    },
  },
  plugins: [daisyui],
};
