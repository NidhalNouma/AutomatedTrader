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

  daisyui: {
    themes: [
      {
        dark: {
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          primary: "rgb(39, 69, 235)",
          secondary: "rgb(174, 168, 216)",
          accent: "rgb(28, 28, 31)",
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
