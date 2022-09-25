/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./Components/**/*.{js,ts,jsx,tsx}",
    "./Features/**/*.{js,ts,jsx,tsx}",
    "node_modules/daisyui/dist/**/*.js",
  ],
  theme: {
    extend: {},
    colors: {
      primaryi: "rgb(39, 69, 235)",
      secondaryi: "rgb(174, 168, 216)",
      accenti: "rgb(28, 28, 31)",
      bg: "rgb(0, 0, 0)",
      bga: "rgb(52, 54, 59)",
      bgai: "rgb(66, 70, 79)",
      bgl: "rgb(0, 0, 50)",
      "text-h": "rgb(255, 255, 255)",
      "text-p": "rgb(101, 105, 114)",
    },
  },
  plugins: [require("daisyui")],
};
