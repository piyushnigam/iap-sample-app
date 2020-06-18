FROM node:12.0-slim
COPY . .
RUN npm install
EXPOSE 50000
CMD [ "node", "server.js", "--port=50000"]

