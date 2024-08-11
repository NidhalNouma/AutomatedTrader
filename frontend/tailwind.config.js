/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
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
      white: colors.white,
      gray: colors.gray,
      green: colors.green,
      red: colors.red,
      blue: colors.blue,
      bg: "hsl(var(--bg-color) / <alpha-value>)",
      bgt: "hsl(var(--bg-2-color) / <alpha-value>)",

      title: "hsl(var(--title-color) / <alpha-value>)",
      text: "hsl(var(--text-color) / <alpha-value>)",

      light: "hsl(var(--text-light-color) / <alpha-value>)",
      dark: "hsl(var(--text-dark-color) / <alpha-value>)",

      long: "hsl(var(--long-color) / <alpha-value>)",
      short: "hsl(var(--short-color) / <alpha-value>)",
      profit: "hsl(var(--profit-color) / <alpha-value>)",
      loss: "hsl(var(--loss-color) / <alpha-value>)",
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/line-clamp")],

  daisyui: {
    themes: [
      {
        dark: {
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          primary: "#4731FF",
          secondary: "#6665DD",
          accent: "#9B9ECE",

          info: "#4878C8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          primary: "#4731FF",
          secondary: "#6665DD",
          accent: "#9B9ECE",

          // neutral: "#191D24",
          // "base-100": "#2A303C",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
    ],
  },
};
