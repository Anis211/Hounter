/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  mode: "jit",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  purge: [
    "./src/**/*.jsx",
    "./node_modules/@material-tailwind/react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lexend: "Lexend, sans-serif",
      },
    },
  },
});
