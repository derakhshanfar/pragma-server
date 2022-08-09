module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['jest'],
  extends: ['eslint:recommended', 'prettier'],
  env: {
    es2021: true,
    node: true,
    'jest/globals': true,
  },
  rules: {
    'no-console': 'off',
  },
}
