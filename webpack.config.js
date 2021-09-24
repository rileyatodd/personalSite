'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const publicPath = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:8080/'
  : '/';

module.exports = env => {

  // let BUILD_ENV = Object.values(env || {})
  //         .map(s => s.split('='))
  //         .reduce((acc, [k, v]) => Object.assign(acc, {[k]: JSON.stringify(v)}), 
  //                 {})

  // console.log(BUILD_ENV)

  return {
    // You may want 'eval' instead if you prefer to see the compiled output in DevTools.
    // See the discussion in https://github.com/facebookincubator/create-react-app/issues/343.
    devtool: 'cheap-module-source-map',
    devServer: {
      hot: false,
      headers: {"Access-Control-Allow-Origin": "http://localhost:8080"},
      disableHostCheck: true,
      sockPort: 8080
    },
    entry: [
      path.resolve(__dirname, 'src/index.html')
    ],
    output: {
      path: path.resolve(__dirname, 'dist'),
      // Add /* filename */ comments to generated require()s in the output.
      pathinfo: true,
      // This does not produce a real file. It's just the virtual path that is
      // served by WebpackDevServer in development. This is the JS bundle
      // containing code from all our entry points, and the Webpack runtime.
      filename: 'static/js/bundle.js',
      // There are also additional JS chunk files if you use code splitting.
      chunkFilename: 'static/js/[name].chunk.js',
      // This is the URL that app is served from. We use "/" in development.
      publicPath: publicPath,
      // Point sourcemap entries to original disk location (format as URL on Windows)
      devtoolModuleFilenameTemplate: info =>
        path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
    },
    resolve: {
      alias: {
        src: path.resolve(__dirname, 'src/')
      },
      plugins: [],
    },
    module: {
      strictExportPresence: true,
      rules: [
        {
          // "oneOf" will traverse all following loaders until one will
          // match the requirements. When no loader matches it will fall
          // back to the "file" loader at the end of the loader list.
          oneOf: [
            // Process JS with Babel.
            {
              test: /\.(js|jsx|mjs)$/,
              include: path.resolve(__dirname, 'src'),
              loader: require.resolve('babel-loader'),
              options: {
                
                // This is a feature of `babel-loader` for webpack (not Babel itself).
                // It enables caching results in ./node_modules/.cache/babel-loader/
                // directory for faster rebuilds.
                cacheDirectory: true,
                presets: ['babel-preset-react-app']
              },
            },
            // { // run our styles through postcss
            //   test: /\.css$/,
            //   include: path.resolve(__dirname, 'src'),
            //   use: ['style-loader', 'postcss-loader']
            // },
            { // Don't modify styles imported from elsewhere
              test: /\.css$/,
              use: ['style-loader', 'css-loader']
            },
            {
              test: /\.html$/,
              use: ['file-loader', 'html-loader']
            },
            // "file" loader makes sure those assets get served by WebpackDevServer.
            // When you `import` an asset, you get its (virtual) filename.
            // In production, they would get copied to the `build` folder.
            // This loader doesn't use a "test" so it will catch all modules
            // that fall through the other loaders.
            {
              // Exclude `js` files to keep "css" loader working as it injects
              // it's runtime that would otherwise processed through "file" loader.
              // Also exclude `html` and `json` extensions so they get processed
              // by webpacks internal loaders.
              exclude: [/\.js$/, /\.mjs$/, /\.html$/, /\.json$/],
              loader: require.resolve('file-loader'),
              options: {
                name: 'static/media/[name].[hash:8].[ext]',
              },
            },
          ],
        },
        // ** STOP ** Are you adding a new loader?
        // Make sure to add the new loader(s) before the "file" loader.
      ],
    },
    plugins: [
      // Generates an `index.html` file with the <script> injected.
      // new HtmlWebpackPlugin({
      //   inject: true,
      //   template: path.resolve(__dirname, 'src/index.html'),
      //   publicPath: publicPath
      // }),
      // Add module names to factory functions so they appear in browser profiler.
      new webpack.NamedModulesPlugin(),
      // This is necessary to emit hot updates (currently CSS only):
      new webpack.HotModuleReplacementPlugin(),
      // Moment.js is an extremely popular library that bundles large locale files
      // by default due to how Webpack interprets its code. This is a practical
      // solution that requires the user to opt into importing specific locales.
      // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
      // You can remove this if you don't use Moment.js:
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      // new webpack.DefinePlugin({BUILD_ENV})
    ],
    // Some libraries import Node modules but don't use them in the browser.
    // Tell Webpack to provide empty mocks for them so importing them works.
    node: {
      dgram: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty',
    },
    // Turn off performance hints during development because we don't do any
    // splitting or minification in interest of speed. These warnings become
    // cumbersome.
    performance: {
      hints: false,
    },
  }
}