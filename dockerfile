FROM node:24-alpine
WORKDIR /app
COPY --chown=node:node server.js ./
COPY --chown=node:node public ./public
USER node
EXPOSE 8081
CMD ["node", "server.js"]