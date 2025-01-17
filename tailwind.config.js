/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",

  ],
  include: [
    "src/**/*.ts",
    "src/**/*.d.ts"  // Add this line
  ],
  theme: {
    extend: {
      spacing: {
        'a4-width': '210mm',
        'a4-height': '297mm',
      },
      boxShadow: {
        'text': '0 0 5px rgba(157, 254, 148, 0.4), 0 0 10px rgba(174, 37, 37, 0.3)',
      },
    },
  },

    safelist: [
      'border-blue-500',
      'border-red-500',
      'border-green-500',
      'border-yellow-500',
      'border-purple-500',
    ],
  

  plugins: [],
}
 
