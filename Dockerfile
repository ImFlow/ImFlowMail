FROM node:16-alpine
WORKDIR /app
COPY package*.json .
RUN yarn install
COPY app.js .
COPY customers.js .
COPY .env .
CMD ["node", "app.js"]