const { type } = require('os')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

/**@type {import('webpack').Configuration}*/

/* Exportar modulo de configuración*/
module.exports = {
    /*punto de entrada */
    entry: './src/index.js',
    
    /*punto de salida*/
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    },

    /*Extenciones del proyecto*/
    resolve: {
        extensions: ['.js']
    },

    module: {
        rules: [
            {
                //usa cualquier extencion .mjs o .js
                test: /\.m?js$/,
                //excluye elementos de /node_modules
                exclude: /node_modules/,
                //especifica el loader
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                //usa archivos con extención css y .styl
                test: /\.css|.styl$/i,
                //especifica el loader
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'stylus-loader'
                ],
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './public/index.html',
            //archivo que comolacara en la carpeta de dist
            filename: './index.html'
        }),
        new MiniCssExtractPlugin(),
    ]
}