/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

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
      gray: colors.gray,
      green: colors.green,
      red: colors.red,
      blue: colors.blue,
      // primaryi: "rgb(39, 69, 235)",
      // secondaryi: "rgb(174, 168, 216)",
      // accenti: "rgb(28, 28, 31)",
      bgt: "#000",
      bg: "#050505",
      bga: "#2c2b31",
      // bgai: "rgb(66, 70, 79)",
      // bgl: "rgb(0, 0, 50)",
      "text-h": "rgb(255, 255, 255)",
      // "text-p": "rgb(135, 135, 135)",
      "text-p": "hsl(220, 13%, 69%)",
    },
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: [
      {
        dark: {
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          // primary: "rgb(39, 69, 235)",
          primary: "#473BF0",
          // secondary: "rgb(174, 168, 216)",
          secondary: "#6665DD",
          // accent: "rgb(28, 28, 31)",
          accent: "#9B9ECE",

          // neutral: "#3d4451",
          neutral: "#191D24",
          "base-100": "#2A303C",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
    ],
  },
};
