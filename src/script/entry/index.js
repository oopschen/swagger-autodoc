import SwaggerUI from 'swagger-ui';
import 'swagger-ui/dist/swagger-ui.css'
import StandalonePreset from 'swagger-ui/dist/swagger-ui-standalone-preset.js'
import axios from 'axios';


const main = () => {
  axios.get('/api-doc-meta').
    then(response => {

    SwaggerUI({
      dom_id: '#body',
      deepLinking: true,
      urls: response.data,
      presets: [SwaggerUI.presets.apis, StandalonePreset],
      layout: 'StandaloneLayout'
    });

  });
};

main();
