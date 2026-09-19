/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        avatar: {
          bg: "#f3f4f6",
          text: "#161616",
        },
      },
      fontFamily: {
        "plex-arabic": [
          "IBM Plex Sans Arabic",
          "Segoe UI",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
