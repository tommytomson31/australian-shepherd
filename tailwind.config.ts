import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8f6f3',
          100: '#efe9e0',
          200: '#ddd2c0',
          300: '#c8b49a',
          400: '#b59574',
          500: '#a67c52',
          600: '#8f6543',
          700: '#755138',
          800: '#614433',
          900: '#523b2e',
        },
        accent: {
          50: '#fdf8f1',
          100: '#f9eedc',
          200: '#f3dbb8',
          300: '#ebc28b',
          400: '#e2a35c',
          500: '#da8a3b',
          600: '#cc7230',
          700: '#a95829',
          800: '#884729',
          900: '#6e3c25',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        heading: ['Cormorant Garamond', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
