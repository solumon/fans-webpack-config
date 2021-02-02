module.exports = {
    mode: "development",
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
                use: ["style-loader","css-loader","less-loader"]
            }
        ]
    }
}
