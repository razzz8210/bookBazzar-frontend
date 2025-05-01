import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
};

export default config;
