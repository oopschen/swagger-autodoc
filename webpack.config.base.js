import path from 'path';
import os from 'os';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import walk from 'walk';
import {DefinePlugin} from 'webpack';


// list all contents in api-doc
let docs = [];
const BASE_DOC = path.join(__dirname, './api-doc');
let walkOpt = {
  listeners: {
    file: (root, fileStats, next) => {
      if (/.*\.(yml|yaml|json)$/ig.test(fileStats.name)) {
        docs.push(path.relative(BASE_DOC, path.join(root, fileStats.name)));
      }
      next();
    }
  }
}
walk.walkSync(BASE_DOC, walkOpt);
// end


export default ({
  entry: {
    index: './src/script/entry/index.js'
  },
  output: {
    chunkFilename: '[name].[chunkhash].c.js',
    chunkLoadTimeout: 5000,
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist')
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
    }),
    new DefinePlugin({
      DOC_APIS: JSON.stringify(docs)
    })
  ],

  parallelism: os.cpus().length
});
