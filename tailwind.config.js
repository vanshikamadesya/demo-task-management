/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // ✅ Use "class" instead of "media"
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

