import webpack from 'webpack';
import wmerge from 'webpack-merge';

import baseconfig from './webpack.config.base.js';


const DEV_CFG = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true
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
