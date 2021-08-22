/**
 * Use this file to adjust the webpack config.
 *
 * Uncomment the overrideComponentWebpack property in react4xp.properties, and add this file there.
 */
const path = require('path');
const R = require('ramda');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {
 setEntry,
 addRule,
 addPlugin,
 appendExtensions,
 prependExtensions
} = require('./util/compose');
const env = require('./util/env');

const isProd = env.prod;
const isDev = env.dev;

const createDefaultCssLoaders = () => ([
  {loader: MiniCssExtractPlugin.loader, options: {publicPath: '../'}},
  {loader: 'css-loader', options: {sourceMap: !isProd, importLoaders: 1}},
  {loader: 'postcss-loader', options: {sourceMap: !isProd}},
]);

const createCssPlugin = () => (
  new MiniCssExtractPlugin({
    filename: './styles/bundle.css',
    chunkFilename: '[id].css',
  })
);

// SASS & SCSS
function addSassSupport(cfg) {
  const rule = {
    test: /\.(sass|scss)$/,
    use: [
      ...createDefaultCssLoaders(),
      {loader: 'sass-loader', options: {sourceMap: !isProd}},
    ]
  };

  const plugin = createCssPlugin();

  return R.pipe(
    addRule(rule),
    addPlugin(plugin),
    appendExtensions(['.sass', '.scss', '.css'])
  )(cfg);
}

module.exports = function(env, config) {
    // Makes symlinks under node_modules work, e.g. 'npm link' and possibly PNPM etc:
    config.resolve.symlinks = true;

    return R.pipe(
      addSassSupport,
    )(config);
};
