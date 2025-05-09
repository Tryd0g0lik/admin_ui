const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const BundleTracker = require('webpack-bundle-tracker');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

// import ChunksWebpackPlugin from 'chunks-webpack-plugin';

module.exports = {
  mode: 'none',
  // entry: './src/index.ts',
  entry:
  {
    index: {
      import: './src/index.ts',
      dependOn: 'shared'
    },
    // https://webpack.js.org/guides/code-splitting/#entry-dependencies
    another: {
      import: './src/another-module.ts',
      dependOn: 'shared',

    },
    shared: 'lodash',
    // another: './src/another-module.js',
  },
  cache: false, // the cache is close

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'scripts/main-[id]-[fullhash].js',
    publicPath: '/admin_ui/',
    clean: true,

  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxSize: 200000,
    },
  },
  // https://webpack.js.org/guides/code-splitting/#entry-dependencies
  optimization: {
    runtimeChunk: 'single',
    // minimize: false,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false, // Удалите все комментарии
          },
        },
        extractComments: false, // Не сохранять комментарии в отдельный файл
      }),
    ],
  },
  performance: {
    maxAssetSize: 70000, // Set max asset size to 300 KiB
    maxEntrypointSize: 70000, // Set max entry point size to 300 KiB
    // hints: 'warning', // Can be 'error', 'warning', or false
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.(tsx|jsx|ts|js)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              configFile: path.resolve(__dirname, './babel.config.js'),
            }
          },
        ],
        exclude: [
          path.resolve(__dirname, "node_modules"),

        ]

      },

      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          'postcss-loader',

        ],

      },

    ]
  },

  plugins: [
    new Dotenv(),
    new CleanWebpackPlugin(), // the 'dist/' is cleans
    // new ChunksWebpackPlugin(
    //   { generateChunksFiles: false }
    // ),

    new BundleTracker({
      path: path.join(__dirname, '../bundles'),
      filename: 'webpack-stats.json'
    }),

    new HtmlWebpackPlugin({
      template: 'src/public/index.html',
      filename: "index.html"
    }),
    new HtmlWebpackPlugin({
      template: 'src/public/404.html',
      filename: "404.html"
    }),
    new webpack.SourceMapDevToolPlugin({
      test: /\.tsx?$/,
      filename: '[file].map.[query]',
      include: path.resolve(__dirname, '../bundles/maps'),
    }),

    new ESLintPlugin({
      files: 'src/',

    }),

    new MiniCssExtractPlugin({
      filename: 'output.css'
    }),
  ],
  watchOptions: {
    ignored: [
      "node_modules",
      "**/node_modules"
    ]
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'src'), // '../static'

    },


    watchFiles: [
      'src',

    ],
    hot: true, // Включение горячей перезагрузки
    liveReload: true, // Включение live-reload

    compress: true,
    historyApiFallback: true,
    host: "127.0.0.1"
    // open: true, // Автоматическое открытие браузера
    // port: 8080
  },

  resolve: {
    extensions: [".tsx", ".jsx", ".ts", ".js", ".svg"],
    plugins: [new TsconfigPathsPlugin(),],
    modules: [
      path.resolve(__dirname, "node_modules"),
    ],
    // fallback: {
    //   "buffer": require.resolve("buffer/"),
    //   "crypto": require.resolve("crypto-browserify"),
    //   "vm": require.resolve("vm-browserify"),
    //   "stream": require.resolve("stream-browserify")
    // },    
    alias: {
      // "@Service": path.resolve(__dirname, "src/services"),
      // "@Interfaces": path.resolve(__dirname, "src/interfaces.ts"),
    }
  },

};

