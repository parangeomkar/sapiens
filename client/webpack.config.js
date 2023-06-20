const path = require("path");

module.exports = {
    mode: "development",
    entry: "./index.js",
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "main.js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: "babel-loader"
            }
        ]
    },
    devServer: {
        port: 3000,
        host: '0.0.0.0',
        static: ["./public", "./dist"],
        open: true,
        hot: true,
        historyApiFallback: true
    }
}