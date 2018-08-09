import path from 'path';


export default ({
  entry: () => './src/script/entry',
  output: {
    chunkFilename: '[name].[chunkhash].c.js',
    chunkLoadTimeout: 5000,
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
});
