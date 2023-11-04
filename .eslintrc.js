module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // Adicione regras específicas para os templates Vue
    'vue/html-indent': ['error', 2], // Indentação com 2 espaços para os templates Vue
    'vue/max-attributes-per-line': ['error', {
      singleline: 3, // Máximo de 3 atributos por linha em templates de uma única linha
      multiline: {
        max: 1, // Máximo de 1 atributo por linha em templates de várias linhas
        allowFirstLine: false
      }
    }]
    // Adicione outras regras específicas para templates Vue conforme necessário
  }
}
