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
      primaryi: "rgb(50, 0, 250)",
      secondaryi: "rgb(174, 168, 216)",
      accenti: "rgb(32, 15, 45)",
      bg: "rgb(32, 34, 35)",
      bga: "rgb(52, 54, 59)",
      bgai: "rgb(66, 70, 79)",
      "text-h": "rgb(255, 255, 255)",
      "text-p": "rgb(101, 105, 114)",
    },
  },
  plugins: [require("daisyui")],
};
