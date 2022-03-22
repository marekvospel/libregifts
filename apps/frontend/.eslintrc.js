
module.exports = {
  root: false,
  env: {
    'vue/setup-compiler-macros': true,
    browser: true,
  },
  extends: ['plugin:vue/vue3-essential', '@vue/typescript/recommended'],
  rules: {
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/ban-ts-comment': ['off'],
  },
}