from node:8-alpine as build
ADD ./ /mnt/src
RUN cd /mnt/src && npm install && npm run release \
  && npm run release-server


from node:8-alpine
WORKDIR /var/lib/swagger-autodoc
ENV DOC_BASE=/var/lib/swagger-autodoc/apis
ENV WEB_BASE=/var/lib/swagger-autodoc/dist/swagger
RUN mkdir -p /var/lib/swagger-autodoc/dist /var/lib/swagger-autodoc/node_modules
COPY --from=build /mnt/src/dist/ /var/lib/swagger-autodoc/dist/
RUN chown -R node:node /var/lib/swagger-autodoc

USER node
ENTRYPOINT ["node"]
CMD ["./dist/server/server.js"]
