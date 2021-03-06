const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')

const dev = process.env.NODE_ENV === 'development'

module.exports = {
  plugins: [
    autoprefixer(),
    !dev && cssnano({
      present: 'default',
    }),
  ],
}
