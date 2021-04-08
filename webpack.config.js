const { type } = require('os');
const path = require('path')

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
    }
}