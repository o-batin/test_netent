const path = require("path");
const common = require("./webpack.common");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
    mode: "development",
    devtool: "inline-source-map",
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    devServer: {
        contentBase: path.resolve(__dirname, "dist")
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: "src/assets/", to: "assets/"
            }
        ], {
            copyUnmodified: true
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ]
});
