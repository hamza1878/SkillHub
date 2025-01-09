/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",

  ],
  theme: {
    extend: {
      boxShadow: {
        'text': '0 0 5px rgba(157, 254, 148, 0.4), 0 0 10px rgba(174, 37, 37, 0.3)',
      },
    },
  },

  plugins: [],
}
 
