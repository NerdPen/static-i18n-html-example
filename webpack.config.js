const path = require("path");
const glob = require("glob");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const RemoveEmptyScriptsPlugin = require("webpack-remove-empty-scripts");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (env, argv) => {
    const isDev = argv.mode === "development";
    const getHtmlPlugins = () => {
        return glob
            .sync(path.join(__dirname, `${isDev ? "www" : "i18n"}/**/*.html`))
            .map((filepath) => {
                const htmlFileName = isDev
                    ? filepath.match(/www\/(.*)/)[1]
                    : filepath.match(/i18n\/(.*)/)[1];
                console.log("isDev", isDev, htmlFileName);
                return new HtmlWebpackPlugin({
                    filename: htmlFileName,
                    template: path.resolve(
                        __dirname,
                        isDev ? "www" : "i18n",
                        htmlFileName
                    ),
                    chunks: ["app", "styles"],
                });
            });
    };
    return {
        mode: argv.mode,
        devtool: isDev ? "eval-cheap-module-source-map" : "source-map",
        target: "web",
        devServer: {
            port: 8080,
            contentBase: path.resolve(__dirname, "dist"),
        },
        entry: {
            app: [path.resolve(__dirname, "www", "src", "App.ts")],
            styles: [path.resolve(__dirname, "www", "styles", "all.scss")],
        },
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "assets/js/[name].bundle.[fullhash:8].js",
        },
        resolve: {
            extensions: [".ejs", ".js", ".tsx", ".ts"],
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "babel-loader",
                        },
                    ],
                },
                {
                    test: /\.tsx?$/,
                    use: "ts-loader",
                    exclude: /node_modules/,
                },
                {
                    test: /\.ejs$/,
                    loader: "ejs-loader",
                    options: {
                        esModule: false,
                    },
                },
                {
                    test: /\.(s[ac]|c)ss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: "../../",
                            },
                        },
                        {
                            loader: "css-loader",
                        },
                        {
                            loader: "resolve-url-loader",
                        },
                        {
                            loader: "sass-loader",
                        },
                        "postcss-loader",
                    ],
                },
                {
                    test: /\.(png|jpg|gif|jpeg|svg)$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                context: path.resolve(__dirname, "www"),
                                name: "[path][name].[ext]",
                                esModule: false,
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new RemoveEmptyScriptsPlugin(),
            new MiniCssExtractPlugin({
                filename: "assets/css/[name].bundle.[fullhash:8].css",
            }),
            ...getHtmlPlugins(),
            new CopyWebpackPlugin({
                patterns: [{ from: "./www/assets", to: "assets" }],
            }),
        ],
    };
};
