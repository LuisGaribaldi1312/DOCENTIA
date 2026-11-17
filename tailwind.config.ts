import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Docentia Corporate Academic Navy (Confianza, Autoridad y Solidez)
        brand: {
          50: "#f0f4f8",
          100: "#d9e2ec",
          200: "#bcccdc",
          300: "#9fb3c8",
          400: "#829ab1",
          500: "#627d98",
          600: "#486581",
          700: "#334e68",
          800: "#243b53",
          900: "#0f2338",
          950: "#081320",
        },
        // Docentia Peaceful Teal / Sage (Paz, Crecimiento Pedagógico y Serenidad)
        serene: {
          50: "#f2f9f8",
          100: "#dcf0ee",
          200: "#b9e2df",
          300: "#89ccc8",
          400: "#4ea8a3",
          500: "#2d7f7b",
          600: "#226663",
          700: "#1d5351",
          800: "#1b4442",
          900: "#183938",
          950: "#0b2020",
        },
        // Warm Academic Amber (Acreditaciones, Prestigio y Alertas SOS)
        prestige: {
          50: "#fbf8ef",
          100: "#f6eed9",
          200: "#eddcb3",
          300: "#e1c385",
          400: "#d5a556",
          500: "#c7862f",
          600: "#b56c24",
          700: "#965120",
          800: "#7c4120",
          900: "#67371d",
        }
      },
      screens: {
        'xs': '475px',
        '3xl': '1920px',
      },
    },
  },
  plugins: [],
};
export default config;
