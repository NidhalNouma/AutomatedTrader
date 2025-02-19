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

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        glass:
          "linear-gradient(rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01))",
        "glass-hover":
          "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))",
      },
      boxShadow: {
        glass: "0 4px 24px -1px rgba(0, 0, 0, 0.2)",
        "glass-hover": "0 8px 32px -1px rgba(0, 0, 0, 0.3)",
        "inner-light": "inset 0 1px 0 0 rgba(255, 255, 255, 0.05)",
      },
      animation: {
        "float-slow": "float-slow 6s ease-in-out infinite",
        "float-medium": "float-medium 5s ease-in-out infinite",
        "float-fast": "float-fast 4s ease-in-out infinite",
        "gradient-x": "gradient-x 15s ease infinite",

        "pulse-1": "pulsei 2s infinite",
      },
    },
  },
  plugins: [
    require("daisyui"),
    require("@tailwindcss/line-clamp"),
    function ({ addBase, theme }) {
      addBase({
        ":root": {
          "--clr-primary": theme("colors.primary"),
          "--clr-secondary": theme("colors.secondary"),
          "--clr-accent": theme("colors.accent"),
        },
      });
    },
  ],

  daisyui: {
    themes: [
      {
        dark: {
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          primary: "hsla(246, 100%, 60%, 1)",
          secondary: "hsla(246, 70%, 63%, 1)",
          accent: "hsla(198, 55%, 48%, 1)",

          info: "hsla(198, 93%, 40%, 1)",
          success: "hsla(150, 40%, 30%, 1)",
          warning: "hsla(43, 96%, 46%, 1)",
          error: "hsla(0, 91%, 51%, 1)",
        },
      },
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          primary: "hsla(246, 100%, 60%, 1)",
          secondary: "hsla(246, 70%, 63%, 1)",
          accent: "hsla(198, 85%, 68%, 1)",

          // neutral: "#191D24",
          // "base-100": "#2A303C",
          info: "hsla(198, 93%, 60%, 1)",
          success: "hsla(158, 64%, 52%, 1)",
          warning: "hsla(43, 96%, 56%, 1)",
          error: "hsla(0, 91%, 71%, 1)",
        },
      },
    ],
  },
};
