// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(// If ignores is used without any other keys in the configuration object,
// then the patterns act as global ignores.
{
  // An array of glob patterns indicating the files that the configuration
  // object should not apply to. If not specified, the configuration
  // object applies to all files matched by files.
  ignores: [
    'build/**/*.*',
    'bin/**/*.*',
    'src/jest/server/setupFile.ts',
    'tsup/*.*',
    'react4xp.config.js',
    'webpack.config.react4xp.js',
    '_old/**/*.*',
    'tailwind.config.js',
    'postcss.config.js',
    'temp-components-storage/**/*.*'
  ],
}, eslint.configs.recommended, ...tseslint.configs.recommended, {
  // An array of glob patterns indicating the files that the configuration
  // object should apply to. If not specified, the configuration object
  // applies to all files matched by any other configuration object.
  files: [
    './src/**/*.ts',
    './src/**/*.tsx'
  ],


  rules: {
    '@typescript-eslint/no-unused-vars': [
      "warn",
      {
        "argsIgnorePattern": "^_"
      }
    ]
  }
}, {
  files: ['**/*.tsx', '**/*.jsx'],
  plugins: {
    react,
    'react-hooks': reactHooks,
    'jsx-a11y': jsxA11y
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    ...react.configs.recommended.rules,
    ...reactHooks.configs.recommended.rules,
    'react/react-in-jsx-scope': 'off', // Not needed with webpack ProvidePlugin
    'react/prop-types': 'off' // Using TypeScript for prop validation
  }
}, storybook.configs["flat/recommended"]);
