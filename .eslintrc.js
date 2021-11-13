module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'prettier',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:jest/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    parser: 'babel-eslint',
  },
  plugins: ['react', '@typescript-eslint', 'jest'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        singleQuote: true,
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 0,
    // '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/prop-types': 0,
    'jest/expect-expect': [
      'error',
      {
        assertFunctionNames: ['expect', 'expectSaga', 'testSaga'],
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['webpack.config.js'],
      rules: {
        '@typescript-eslint/no-var-requires': ['off'],
      },
    },
  ],
};
