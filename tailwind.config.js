/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      height: {
        '95vh': '95vh',
        '90vh': '90vh',
        '80vh': '80vh',
        '75vh': '75vh',
        '70vh': '70vh',
        '65vh': '65vh',
        '60vh': '60vh',
        '55vh': '55vh',
        
      },
      width: {
        '95vw': '95vw',
        '90vw': '90vw',
        '80vw': '80vw',
        '75vw': '75vw',
        '70vw': '70vw',
        '65vw': '65vw',
        '60vw': '60vw',
        '55vw': '55vw',
        '50vw': '50vw',
        '45vw': '45vw',
        '40vw': '40vw',
        '35vw': '35vw',
        '30vw': '30vw',
      }

    },
  },
  plugins: [
    plugin(function({ addBase, theme }) {
      addBase({
        'h1': { fontSize: theme('fontSize.2xl') },
        'h2': { fontSize: theme('fontSize.xl') },
        'h3': { fontSize: theme('fontSize.lg') },
      })

    })
  ]
}