/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        primary: "#455A59",
        greenish: "#54BEB8",
        gray: "#999",
        white: "#FFFFFF",
      },

      boxShadow: {
        'bx': '3px 3px 10px 6px rgba(0, 0, 0, .06)',
      }
      
    },
  },
  plugins: [],
}
