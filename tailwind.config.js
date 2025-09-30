import { defineConfig } from "tailwindcss";

export default defineConfig({
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        light: {
          DEFAULT: "#ffffff",
          hover: "#fcfcfd",
          active: "#f5f7f9",
          normal: "#f9f9fa",
          "normal-hover": "#f2f4f7",
          "normal-active": "#ebeef2",
          dark: "#f1f8f9",
        },

        dark: {
          lighter: "#b3b8bd",
          "light-hover": "#a3a8b0",
          "light-active": "#9196a0",
          normal: "#555d6d",
          "normal-hover": "#484f5d",
          "normal-active": "#3e4450",
          dark: "#12121c",
          "dark-hover": "#15171b",
          "dark-active": "#090a0c",
        },

        yellow: {
          light: "#fffde6",
          "light-hover": "#fffcd9",
          "light-active": "#fffab0",
          normal: "#ffee00",
          "normal-hover": "#e6d600",
          "normal-active": "#cbe000",
          dark: "#bfb300",
          "dark-hover": "#998100",
          "dark-active": "#736b00",
          darker: "#595300",
        },

        blue: {
          light: "#e9fefd",
          "light-hover": "#deecfc",
          "light-active": "#bbcffa",
          normal: "#2563eb",
          "normal-hover": "#2159d4",
          "normal-active": "#1e4fbc",
          dark: "#1c4ab0",
          "dark-hover": "#163b8d",
          "dark-active": "#11216a",
          darker: "#0d2352",
        },

        red: {
          light: "#fee7ef",
          "light-hover": "#fddbe7",
          "light-active": "#fbbace",
          normal: "#f30c60",
          "normal-hover": "#db0b56",
          "normal-active": "#c20a44",
          dark: "#b60348",
          "dark-hover": "#920730",
          "dark-active": "#6d052b",
          darker: "#550422",
        },

        purple: {
          50: "#efebfd",
          100: "#ceb0fa",
          200: "#b7b7f7",
          300: "#9654f4",
          400: "#8133f1",
          500: "#6200ee",
          600: "#5900d9",
          700: "#4600a9",
          800: "#360083",
          900: "#290064",
        },
      },

      fontFamily: {
        reddit: ['"Reddit Sans"', "ui-sans-serif", "system-ui"],
      },
      container: {
        center: true,
        padding: "1rem",
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1440px",
        },
      },
    },
  },
  plugins: [],
});
