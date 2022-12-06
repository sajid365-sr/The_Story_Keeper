/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Kaushan: ["Kaushan Script", "cursive"],
      },
    },
  },
  plugins: [require("daisyui", "flowbite/plugin")],
};
