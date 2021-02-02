const webpack = require("webpack");
const {merge} = require("webpack-merge");
const base = require("./webpack.base");

module.exports = merge(base, {
    mode: "development",
    plugins: [
      new webpack .HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: "./dist",
        hot: true,
        stats: "errors-only"
    },
    devtool: "cheap-source-map"
})
