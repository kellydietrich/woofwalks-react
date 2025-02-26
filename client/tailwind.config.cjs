/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", 
  "./src/**/*.{js,ts,jsx,tsx}",
  "node_modules/daisyui/dist/**/*.js",
  "node_modules/react-daisyui/dist/**/*.js"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "pastel"] // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"] 
  }
};
