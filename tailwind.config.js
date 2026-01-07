/** @type {import('tailwindcss').Config} */

module.exports = {
  // 1. ADD THIS LINE
  darkMode: "class", 
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primaryPurple: '#5B4DFF',
      }
    },
  },
  plugins: [],
};