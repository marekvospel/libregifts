module.exports = {
  purge: ['./src/**/*.svelte', './src/**/*.css'],
  jit: true,
  darkMode: false,
  theme: {
    extend: {
      colors: {
        'db-blue': {
          light: '#0b668e',
          dark: '#0b3241',
        },
        'db-yellow': '#e4a500',
      }
    },
  },
  plugins: [],
}
