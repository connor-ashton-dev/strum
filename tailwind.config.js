/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "theme-green": "#6FCB9F",
        "theme-yellow": '#FFE28A',
        "theme-brown": "#666547",
        "theme-red": "#FB2E01"
      }
    },
  },
  plugins: [],
}
