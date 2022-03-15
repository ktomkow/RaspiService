FROM node:lts as build

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . ./

CMD ["node", "main.js"]