import SwaggerUI from 'swagger-ui';
import 'swagger-ui/dist/swagger-ui.css'
import StandalonePreset from 'swagger-ui/dist/swagger-ui-standalone-preset.js'

let apis = [];
DOC_APIS.forEach(api => {
  let name = api.replace(/\//ig, '-').replace(/\..+$/ig, '');
  let url = '/' + api;
  apis.push({name, url});
});

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
