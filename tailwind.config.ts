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
          // Override slate-500 with improved contrast (4.52:1)
          500: '#697990',
        },
        blue: {
          // Custom accessible blue shades
          DEFAULT: '#1a7aff',  // Primary blue for text (4.85:1 on dark bg)
          600: '#086efd',      // Darker blue for button backgrounds (4.51:1 with white text)
          hover: '#2375ef',    // Hover state with 4.64:1 contrast
        },
      },
    },
  },
  plugins: [],
};

export default config;
