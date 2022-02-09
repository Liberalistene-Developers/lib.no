module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard',
    'plugin:react/jsx-runtime',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      files: [ '**/*.es6' ],
      env: {
        es6: true,
      },
      globals: {
        log: 'readonly',
        resolve: 'readonly',
      },
      rules: {
        'import/no-absolute-path': 0,
      }
    }
  ]
}
