/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  
  ],
  daisyui:{

    themes:[
      {
        mytheme:{
          'primary':'#65C3C8',
          'secondary':'#291334'
        }
      }

    ]
  },
  theme: {
    extend: {
      fontFamily: {
        Kaushan: ["Kaushan Script", "cursive"],
      },
    },
  },
  plugins: [require("daisyui","flowbite/plugin")],
};
