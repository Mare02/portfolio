/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./components/**/*.{js,ts,tsx}", "./app/**/*.{js,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { ibmsans: ["IBM Plex Sans", "sans-serif"] },
      screens: { xs: "480px" },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
