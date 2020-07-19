module.exports = {
    entry: './main.js',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            ['@babel/plugin-transform-react-jsx',
                            {pragma: "create"}]
                        ]
                    }
                },
            }
        ]
    },
    // good to know:
    mode: "development",
    optimization: {
        minimize: false
    }
}