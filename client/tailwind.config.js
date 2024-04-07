/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    screens: {
      'sm': '570px',
      // => @media (min-width: 576px) { ... }

      'md': '930px',
      // => @media (min-width: 960px) { ... }

      // 'lg': '1440px',
      // => @media (min-width: 1440px) { ... } 
    },
    extend: {
      colors: {
        primary: "#90D26D",
        secondary: "#ed8900",
      },
      fontFamily: {
        'sans': ['Jost', 'sans-serif'],
        'Josefin': ['Josefin', 'sans-serif'],
        'Raleway': ['Raleway', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "3rem",
        },
      },
    },
  },
  plugins: [],
};
