/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ["Orbitron", "sans-serif"],
        josefin: ["Josefin Sans", "sans-serif"],
        lora: ["Lora", "serif"],
      },
      colors: {
        customColor1: "#163020",
        customColor2: "#B6C4B6",
        customColor3: "#eee",
      },
    },
  },
  plugins: [],
};
