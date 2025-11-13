const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,

  // Production optimizations
  productionSourceMap: false, // Disable source maps in production for smaller bundle

  // Configure webpack
  configureWebpack: {
    optimization: {
      // Enable tree shaking
      usedExports: true,
      sideEffects: false,

      // Split chunks strategy for better caching
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          // Vendor chunk for node_modules
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            priority: 10,
            chunks: "all",
          },
          // Common chunk for shared code
          common: {
            minChunks: 2,
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      },
    },
  },

  // Chain webpack for additional optimizations
  chainWebpack: (config) => {
    // Minify CSS more aggressively in production
    if (process.env.NODE_ENV === "production") {
      config.plugin("optimize-css").tap((args) => {
        if (args[0] && args[0].cssnanoOptions) {
          args[0].cssnanoOptions.preset = [
            "default",
            {
              discardComments: {
                removeAll: true,
              },
              normalizeWhitespace: true,
            },
          ];
        }
        return args;
      });
    }
  },
});
