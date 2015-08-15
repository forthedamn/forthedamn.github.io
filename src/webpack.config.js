module.exports = {
    entry: './dep/react/react.js',
    output: {
        path: './',
        filename: 'react.js'
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
