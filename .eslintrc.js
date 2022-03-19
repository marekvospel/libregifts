
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'eslint-config-vospel/base',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
}