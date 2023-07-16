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
    fontFamily: {
      // sans: ["Helvetica", "Arial", "sans-serif"],
    },
    extend: {
      keyframes: {
        pulsei: {
          "0%": {
            transform: "scale(1, 1)",
          },
          // "25%": {
          //   transform: "scale(1.2, 1.2)",
          // },
          "50%": {
            transform: "scale(1.4, 1.4)",
          },
          "100%": {
            transform: "scale(1, 1)",
          },
        },
      },
      animation: {
        "pulse-1": "pulsei 2s infinite",
      },
      backgroundImage: {
        // "gradient-radial": "radial-gradient(var(--gradient-color-stops))",
      },
    },
    colors: {
      gray: colors.gray,
      green: colors.green,
      red: colors.red,
      blue: colors.blue,
      // primaryi: "rgb(39, 69, 235)",
      // secondaryi: "rgb(174, 168, 216)",
      // accenti: "rgb(28, 28, 31)",
      // bg: "#000",
      bg: "#141414",
      bgt: "#060606",
      bga: "#272829",
      // bgai: "rgb(66, 70, 79)",
      // bgl: "rgb(0, 0, 50)",
      "text-h": "rgb(245, 239, 245)",
      // "text-p": "rgb(135, 135, 135)",
      "text-p": "hsl(200, 3%, 75%)",
      primary: "var(--color-primary)",
    },
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: [
      {
        dark: {
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          // primary: "rgb(39, 69, 235)",
          primary: "#4731FF",
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
