import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        "red-hat": ["Red Hat Text", ...defaultTheme.fontFamily.serif]
      },
      colors: {
        evergreen: "hsl(159, 69%, 38%)",
        terracota: "hsl(14, 86%, 42%)",
        "antique-rose": {
          50: "hsl(20, 50%, 98%)",
          100: "hsl(13, 31%, 94%)",
          300: "hsl(14, 25%, 72%)",
          400: "hsl(7, 20%, 60%)",
          500: "hsl(12, 20%, 44%)",
          900: "hsl(14, 65%, 9%)"
        }
      }
    }
  },
  plugins: []
};
