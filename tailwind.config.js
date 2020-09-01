module.exports = {
  purge: [],
  theme: {
    minWidth: {
      '20': '200px'
    }
  },
  variants: {},
  plugins: [require('tailwindcss'), require('autoprefixer')],
  // https://tailwindcss.com/docs/upcoming-changes
  future: {
    removeDeprecatedGapUtilities: true
  }
}
