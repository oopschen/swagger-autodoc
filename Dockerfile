from node:8-alpine

ADD ./ /mnt/code
ADD ./entrypoint.sh /mnt/code/entrypoint.sh
WORKDIR /mnt/code
RUN mkdir /mnt/code/node_modules
RUN chown -R node:node /mnt/code
RUN chmod +x /mnt/code/entrypoint.sh
USER node
VOLUME /mnt/code/node_modules
ENTRYPOINT ["/mnt/code/entrypoint.sh"]
