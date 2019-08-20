import 'swagger-ui/dist/swagger-ui.css'
import axios from 'axios';

import('../swagger-ui.js')
  .then(({SwaggerUI, StandalonePreset}) => {

  axios.get('/api-doc-meta').
    then(response => {

    SwaggerUI({
      dom_id: '#body',
      deepLinking: true,
      urls: response.data,
      presets: [SwaggerUI.presets.apis, StandalonePreset],
      layout: 'StandaloneLayout',
      showCommonExtensions: true,
      showExtensions: true,
      defaultModelExpandDepth: 3
    });

  });

});
