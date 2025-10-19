//──────────────────────────────────────────────────────────────────────────────
// Use this file to adjust the webpack config.
//──────────────────────────────────────────────────────────────────────────────
// A template version of this, with upated properties and explanations,
//  can always be found in the react4xp NPM package:
//   node_modules/react4xp/examples/webpack.config.react4xp.js after installing,
//  or:
//   https://github.com/enonic/enonic-react4xp/blob/master/examples/webpack.config.react4xp.js
//──────────────────────────────────────────────────────────────────────────────
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const rspack = require('@rspack/core');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = function(env, config) {

	// Comment in and customize the lines below to improve incremental builds in
	// development mode. (see https://webpack.js.org/configuration/cache/)
	//
	// if (process.env.NODE_ENV === 'development') {
	// 	config.cache = {
	// 		type: 'filesystem'
	// 	}
	// }

	// This makes 'npm link' symlinks in node_modules work:
	config.resolve.symlinks = true;

	// Enable sourcemaps only in development for easier debugging
	config.devtool = process.env.NODE_ENV !== 'production' ? 'source-map' : false;

	// Add resolve alias for Enonic XP libraries and local paths to help rspack find them
	const path = require('path');
	config.resolve.alias = {
		...config.resolve.alias,
		'/lib/menu': path.resolve(__dirname, 'node_modules/@item-enonic-types/lib-menu/index.d.ts'),
		'/lib/xp/content': path.resolve(__dirname, 'node_modules/@enonic-types/lib-content/content.d.ts'),
		'/lib/xp/portal': path.resolve(__dirname, 'node_modules/@enonic-types/lib-portal/portal.d.ts'),
		'@common': path.resolve(__dirname, 'src/main/resources/react4xp/common'),
		'@utils': path.resolve(__dirname, 'src/main/resources/react4xp/utils'),
	};

	// Externalize server-side imports so they're not bundled in client code
	const existingExternals = config.externals || [];
	const externalsArray = Array.isArray(existingExternals) ? existingExternals : [existingExternals];

	config.externals = [
		...externalsArray,
		function({request}, callback) {
			// Externalize all /lib/* imports (server-side Enonic XP libraries)
			if (/^\/lib\//.test(request)) {
				return callback(null, 'commonjs ' + request);
			}
			// Externalize @enonic-types
			if (/^@enonic-types\//.test(request)) {
				return callback(null, 'commonjs ' + request);
			}
			// Externalize react-leaflet and leaflet - loaded dynamically via CDN
			if (request === 'react-leaflet' || request === 'leaflet') {
				return callback(null, 'root ' + request);
			}
			callback();
		}
	];

	config.module.rules = [
		...(config.module.rules || []),
		{
			test: /\.css$/i,
			use: [
				rspack.CssExtractRspackPlugin.loader,
				{
					loader: 'css-loader',
					options: {
						importLoaders: 1,
						modules: {auto: true},
						esModule: false
					}
				}
			]
		},
		{
			test: /\.(woff|woff2|eot|ttf|otf)$/i,
			type: 'asset/resource', // ends up as auxiliaryAssets in stats.components.json
		},
	]

	// Set up how the compiled assets are exported:
	config.plugins = [
		...(config.plugins || []),
		// new MiniCssExtractPlugin({
		// 	filename: '[name].[contenthash:9].css',
		// 	chunkFilename: '[id].[contenthash:9].css'
		// }),
		new rspack.CssExtractRspackPlugin({
			chunkFilename: '[id].[contenthash:9].css',
			filename: '[name].[contenthash:9].css',
		}),
	];

	// Add bundle analyzer when ANALYZE=true
	if (process.env.ANALYZE === 'true') {
		config.plugins.push(
			new BundleAnalyzerPlugin({
				analyzerMode: 'static',
				reportFilename: '../../../bundle-report.html',
				openAnalyzer: false,
				generateStatsFile: true,
				statsFilename: '../../../bundle-stats.json',
			})
		);
	}

	return config;
};
