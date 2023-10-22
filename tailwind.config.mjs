/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        blue: "#5005F2",
        black: "#182E59",
        purple1: "#D2BBF2",
        purple2: "#9D85F2",
        purple3: "#7E5EF2",
      },
    },
  },
  plugins: [],
};
