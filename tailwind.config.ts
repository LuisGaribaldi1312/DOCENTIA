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
        docentia: {
          50: "#f0f7ff",
          100: "#e0effe",
          200: "#b9ddfd",
          300: "#7cc0fb",
          400: "#36a0f7",
          500: "#0c83eb",
          600: "#0266c8",
          700: "#0351a2",
          800: "#074585",
          900: "#0c3b6f",
          950: "#082549",
        },
      },
    },
  },
  plugins: [],
};
export default config;
