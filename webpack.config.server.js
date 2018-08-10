import path from 'path';
import os from 'os';


export default ({
  mode: 'production',

  entry: {
    index: './server/index.js'
  },
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist', 'server')
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
  },

  target: 'node',
  node: {
    __dirname: true
  },

  parallelism: os.cpus().length
});
