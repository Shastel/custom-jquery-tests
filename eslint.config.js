const globals = require('globals');
const pluginJs = require('@eslint/js');

/** @type {import('eslint').Linter.Config[]} */

const loadConfig = async () => {
  const stylistic = await import('@stylistic/eslint-plugin');

  return [
    {
      plugins: {
        '@stylistic': stylistic.default,
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
};

module.exports = loadConfig();
