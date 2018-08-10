import path from 'path';
import os from 'os';
import HtmlWebpackPlugin from 'html-webpack-plugin';


export default ({
  entry: {
    index: './src/script/entry/index.js'
  },
  output: {
    chunkFilename: '[name].[chunkhash].c.js',
    chunkLoadTimeout: 5000,
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist', 'swagger')
  },

  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },

      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },

      {
        test: /\.(yml|yaml)$/,
        use: {
          loader: 'file-loader'
        }
      }

    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "Swagger API Doc Server",
      chunks: ['index'],
      template: './src/html/index.tpl.html'
    })
  ],

  parallelism: os.cpus().length
});
