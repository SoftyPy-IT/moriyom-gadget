import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/theme");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1280px",
    },

    colors: {
      transparent: "transparent",
      current: "currentColor",

      white: "#FFFFFF",

      gray100: "#EEEEEE",
      gray200: "#ECECEC",
      gray300: "#C1C1C1",
      gray400: "#686868",
      gray500: "#282828",

      red: "#F05454",
      yellow: "#F5B461",
      green: "#9BDEAC",
      blue: "#66BFBF",
      lightgreen: "#F2FDFB",
      orange: "#ef4a23",
    },
    extend: {},
  },
  variants: {
    extend: {
      transform: ["group-hover"],
      scale: ["group-hover"],
      transitionDuration: ["group-hover"],
      letterSpacing: ["group-hover"],
      width: ["group-hover"],
      borderColor: ["group-hover"],
    },
    // divideColor: ['group-hover'],
  },
  plugins: [nextui()],
};
export default config;
