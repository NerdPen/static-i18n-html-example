const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base");

module.exports = merge(baseConfig, {
    mode: "development",
    devtool: "eval-cheap-module-source-map",
    target: "web",
    devServer: {
        port: 8080,
        contentBase: path.resolve(__dirname, "dist"),
    },
});
