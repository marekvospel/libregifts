module.exports = {
  purge: ['./src/**/*.svelte', './src/**/*.css'],
  jit: true,
  theme: {
    extend: {
      colors: {
        'db-blue': {
          light: '#0b668e',
          dark: '#0b3241',
        },
        'db-brown': {
          light: '#593c2a',
          dark: '#432b18',
        },
        'db-grey': {
          light: '#576b72',
          dark: '#3f4040',
        },
        'db-yellow': '#e4a500',
      }
    },
  },
  plugins: [],
}
