module.exports = {
    entry: {
        head: './src/main.jsx'
    },
    output: {
        path: './',
        filename: 'main.min.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {test:/\.css$/, loader: 'style-loader!css-loader'},
            {test:/\.less$/, loader: 'style-loader!css-loader!less-loader'},
            {test: /\.js$/, loader: 'babel-loader'},
            {test: /\.jsx$/, loader: 'babel-loader!jsx-loader?harmony'}
        ]
    }
}
