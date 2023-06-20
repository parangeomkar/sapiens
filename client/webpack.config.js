const path = require("path");

module.exports = {
    mode: "production",
    entry: "./index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
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