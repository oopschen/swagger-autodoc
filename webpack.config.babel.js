import path from 'path';
import webpack from 'webpack';
import wmerge from 'webpack-merge';

import baseconfig from './webpack.config.base.js';

const DEV_CFG = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: [
      path.join(__dirname, './dist'),
      path.join(__dirname, './api-doc')
    ],
    hot: true,
    proxy: {'/api-doc-meta': {
      "target": `http://${process.env.PROJECT_BACKEND_HOST || "localhost:8082"}`,
      "changeOrigin": true,
      "secure":false
    }}
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};

const PROD_CFG = {
  mode: 'production'

};

let chooseCfg = () => {
  if  ("production" === process.env.NODE_ENV) {
    return PROD_CFG;
  }

  return DEV_CFG;
};

export default wmerge(baseconfig, chooseCfg());
