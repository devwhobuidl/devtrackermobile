/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        crypto: {
          bg: "#0a0b10",
          card: "#151921",
          accent: "#00ffbd",
          priority: "#ff3e3e",
          muted: "#8b949e",
        }
      },
      fontFamily: {
        mono: ["SpaceMono"],
      }
    },
  },
  plugins: [],
}
