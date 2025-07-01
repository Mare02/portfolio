/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        ibmsans: ['IBM Plex', 'sans-serif',],
      },
      screens: {
        'xs': '480px',
        // => @media (min-width: 480px) { ... }
      },
    },
  },
  plugins: [],
}

