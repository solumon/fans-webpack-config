const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");
const glob = require("glob")

const setMPA = () => {
    const entry = {}
    const htmlWebpackPlugins = []
    const entryFiles = glob.sync(path.join(__dirname, "./src/mpa/*"))
    entryFiles.map(file => {
        const match = file.match(/src\/mpa\/(.*)\.js/)
        const page = match && match[1]
        entry[page] = file
        htmlWebpackPlugins.push(new HtmlWebpackPlugin({
            template: path.join(__dirname, `public/mpa/${page}.html`),
            filename: `html/${page}.html`,
            chunks: [page],
            inject: true,
            minify: {
                html5: true,
                collapseWhitespace: false,
                preserveLineBreaks: false,
                minifyCSS: false,
                minifyJS: false,
                removeComments: false
            }
        }))
    })
    return {
        entry,
        htmlWebpackPlugins
    }
}

const {entry, htmlWebpackPlugins} = setMPA()

module.exports = {
    /* 打包模式 development  production none */
    mode: "development",
    entry: entry,
    output: {
        filename: "js/[name].js",
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ["babel-loader"]
            },
            {
                test: /\.css$/,
                use: ["style-loader","css-loader"]
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "less-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins:() => {
                                require("autoprefixer")({
                                    browsers: ["last 2 version", ">1%", "iOS 8"]
                                })
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 10240
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ["file-loader"]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
    ].concat(htmlWebpackPlugins),
    devtool: "cheap-source-map"
}
