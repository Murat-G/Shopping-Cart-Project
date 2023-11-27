module.exports = {
    env: {
      browser: true,
      es6: true,
      node: true,
    },
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    plugins: ['react'],
    rules: {
      // Buraya ESLint kurallarınızı ekleyebilirsiniz.
    },
  };