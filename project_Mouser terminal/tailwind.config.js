/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cyber: {
          black: '#0a0f1c',
          blue: '#0d1829',
          accent: '#00fff9',
        },
      },
      fontFamily: {
        mono: ['Space Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};