const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    sources: false
                }
            },
            {
                test: /\.css$/i,
                exclude: /styles.css$/, // Se coloca el exclude porque si se ejecuta
                // este test, no va a ejecutar el test: '/styles.css$/'
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /styles.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ]
    },
    optimization: {},
    output: {
        clean: true

    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html', // Se puede cambiar el nombre del archivo.
            template: './src/index.html',
            title: 'iiifilomena App',
        }),
        new MiniCssExtractPlugin({
            //filename: '[name].[fullhash].css', // Se puede cambiar el nombre del archivo.
            filename: '[name].css', // Se puede cambiar el nombre del archivo.
            ignoreOrder: false,

        }),
        new CopyPlugin({
            patterns: [
                { from: './src/assets/', to: 'assets/' },
            ],
        }),

    ],
}