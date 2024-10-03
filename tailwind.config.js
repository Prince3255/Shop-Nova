/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'jb': '330px',
      'bj': '365px',
      'vv': '400px',
      'vd': '460px', 
      'vs': '540px',
      'vp': '580px',
      'dj': '610px',
      'sm': '640px',
      'vm': '720px',
      'md': '768px',
      'vt': '780px',
      'ml': '880px',
      'ld': '940px',
      'll': '960px',
      'mg': '1040px',
      'lm': '1090px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}

