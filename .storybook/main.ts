import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';
import webpack from 'webpack';
import postcss from 'postcss';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-docs',
    {
      name: '@storybook/addon-styling-webpack',
      options: {
        rules: [
          {
            test: /\.css$/,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: { importLoaders: 1 }
              },
              {
                loader: 'postcss-loader',
                options: {
                  implementation: postcss
                }
              }
            ]
          }
        ]
      }
    }
  ],

  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },

  staticDirs: ['../public'],

  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true)
    }
  },

  webpackFinal: async (config) => {
    // Add TypeScript path aliases
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': path.resolve(__dirname, '../src/main/resources/react4xp/components'),
      '@common': path.resolve(__dirname, '../src/main/resources/react4xp/components/common'),
      '@lib': path.resolve(__dirname, '../src/main/resources/lib')
    };

    // Add TypeScript loader for .ts and .tsx files
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('ts-loader'),
          options: {
            transpileOnly: true,
            configFile: path.resolve(__dirname, '../tsconfig.storybook.json')
          }
        }
      ],
      exclude: /node_modules/
    });

    config.resolve.extensions?.push('.ts', '.tsx');

    // Automatically import React in all components
    config.plugins = config.plugins || [];
    config.plugins.push(
      new webpack.ProvidePlugin({
        React: 'react'
      })
    );

    return config;
  }
};

export default config;
