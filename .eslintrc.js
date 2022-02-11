module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'next/core-web-vitals',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'semi': [2, 'always'],
    'jsx-quotes': ['error', 'prefer-single'],
    'quotes': ['error', 'single'],
    'react/function-component-definition': [2, {
      'namedComponents': 'arrow-function',
      'unnamedComponents': 'arrow-function',
      },
    ],
    'react/jsx-filename-extension': ['error', {'extensions': ['.jsx', '.tsx'] }],
    'react/jsx-props-no-spreading': ['error', {
      'custom': 'ignore',
      'exceptions': [],
      },
    ],
    'object-curly-newline': ['error', {
      'ObjectExpression': { 'multiline': true },
      'ObjectPattern': { 'multiline': true },
      'ImportDeclaration': { 'multiline': true },
      'ImportDeclaration': { 'multiline': true },
      },
    ],
    'import/extensions': 'off',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-undef': 'off',
      },
    },
  ],
};
