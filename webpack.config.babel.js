import 'path';
import baseconfig from './webpack.config.base.js';

let createConfig = config => ({
    ...config,
    name: "base"
});

export default createConfig(baseconfig);
