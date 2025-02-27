const globals = require('globals');
const pluginJs = require('@eslint/js');
const stylistic = require('@stylistic/eslint-plugin');

/** @type {import('eslint').Linter.Config[]} */
const config = [
  {
    plugins: {
      '@stylistic': stylistic,
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: 6,
      },
      globals: Object.assign({}, globals.browser, globals.node, globals.jest),
    },
    rules: {
      '@stylistic/indent': ['error', 2, { SwitchCase: 1 }],
      '@stylistic/semi': ['error', 'always'],
    },
  },
  pluginJs.configs.recommended,
];

module.exports = config;
