/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#d35400",
        offWhite: "rgb(249 249 251)",
        customGray: "#777",
      },
    },
  },

  plugins: [],
};
