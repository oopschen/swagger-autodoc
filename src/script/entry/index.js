import SwaggerUI from 'swagger-ui';
import 'swagger-ui/dist/swagger-ui.css'
import StandalonePreset from 'swagger-ui/dist/swagger-ui-standalone-preset.js'

// TODO request apis
const main = () => {
  SwaggerUI({
    dom_id: '#body',
    deepLinking: true,
    urls: apis,
    presets: [SwaggerUI.presets.apis, StandalonePreset],
    layout: 'StandaloneLayout'
  });
};

main();
