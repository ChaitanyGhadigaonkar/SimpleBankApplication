/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00A9FF",
        hover: "#89CFF3",
      },
    },
  },
  plugins: [],
};
