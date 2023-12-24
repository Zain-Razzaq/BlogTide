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
        customColor1: "#102C57",
        customColor2: "#EADBC8",
        customColor3: "#DAC0A3",
      },
    },
  },
  plugins: [],
};
