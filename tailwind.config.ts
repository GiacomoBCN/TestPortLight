import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Improved colors for WCAG AA compliance (4.5:1 minimum contrast ratio)
        slate: {
          // Warm secondary text (5.51:1 on white)
          500: '#75665B',
        },
        blue: {
          // Legacy "blue" slots now hold the warm accent set
          DEFAULT: '#F28C28',  // Orange for borders and fills
          600: '#1C1917',      // Warm black for button backgrounds (17.5:1 with white text)
          hover: '#2E2925',    // Button hover
        },
      },
    },
  },
  plugins: [],
};

export default config;
