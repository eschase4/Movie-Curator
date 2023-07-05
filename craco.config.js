const path = require('path');

module.exports = {
  webpack: {
    alias: {
      process: "process/browser",
    },
    plugins: [],
    configure: (webpackConfig, { env, paths }) => {
      const isProduction = env === 'production';
      const filename = isProduction
        ? 'static/js/[name].[contenthash:8].js'
        : 'static/js/[name].js';

      webpackConfig.output = {
        ...webpackConfig.output,
        filename,
        chunkFilename: filename,
        publicPath: '/',
      };

      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        path: require.resolve("path-browserify"),
        os: require.resolve("os-browserify/browser"),
        crypto: require.resolve("crypto-browserify"),
      };

      return webpackConfig;
    },
  },
};
