module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
    jquery: true,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:fsd/all'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'fsd'
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts'],
      },
    },
  },
  rules: {
    'linebreak-style': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'func-names': 'off',
    'no-param-reassign': 'off'
  },
};
