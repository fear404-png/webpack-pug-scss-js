const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtratPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerseWebpackPlugin = require("terser-webpack-plugin");

const PATHS = {
  // Path to main app dir
  src: path.join(__dirname, "/src"),
  // Path to Output dir
  dist: path.join(__dirname, "/dist"),
  // Path to Second Output dir (js/css/fonts etc folder)
  assets: "assets/",
};
const PAGES_DIR = `${PATHS.src}/pug/`;


const isDev = process.env.NODE_ENV === "development";
console.log("IS DEV: ", isDev);
const isProd = !isDev;

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: "all",
    },
  };

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetsPlugin(),
      new TerseWebpackPlugin(),
    ];
  }

  return config;
};

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: "development",

  entry: {
    main: "./index.js",
    analytics: "./analytics.js",
  },

  output: {
    filename: "[name].[contenthash]].js",
    path: path.resolve(__dirname, "dist"),
  },

  optimization: optimization(),

  devServer: {
    port: 1337,
    hot: isDev,
    overlay: true,
    open: true,
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: `${PAGES_DIR}index.pug`,
      filename: "./index.html",
      inject: true,
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [{ from: "icon.ico", to: "" }],
    }),
    new MiniCssExtratPlugin({
      filename: "[name].[contenthash]].css",
    }),
  ],

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtratPlugin.loader, "css-loader"],
      },

      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },

      {
        test: /\.pug$/,
        loader: "pug-loader",
      },

      {
        test: /\.(png|jpg|svg|gif)$/,
        use: "file-loader",
      },

      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ["file-loader"],
      },

      {
        test: /\.xml$/,
        use: "xml-loader",
      },

      {
        test: /\.csv$/,
        use: "csv-loader",
      },
    ],
  },
};
