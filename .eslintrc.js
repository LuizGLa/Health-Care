module.exports = {
  root: true,
  env: {
    node: true,
    'vue/setup-compiler-macros': true
  },
  extends: [
    'plugin:vue/vue3-essential',
    // '@vue/standard',
    "eslint:recommended"
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  }
}
