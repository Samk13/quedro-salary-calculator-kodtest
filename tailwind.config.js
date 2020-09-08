module.exports = {
  purge: [],
  theme: {
    minWidth: {
      '20': '200px'
    },
    fontFamily: {
      sans: ['roboto']
    }
  },
  variants: {},
  plugins: [require('tailwindcss'), require('autoprefixer')],
  // https://tailwindcss.com/docs/upcoming-changes
  future: {
    removeDeprecatedGapUtilities: true
  }
}
