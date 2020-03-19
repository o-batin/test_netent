const path = require("path");
const common = require("./webpack.common");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
    mode: "production",
    devtool: "source-map",
    output: {
        filename: "[name].[contentHash].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {
                from: "src/assets/", to: "assets/"
            }
        ], {
            copyUnmodified: true
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            minify: true
        })
    ]
});
