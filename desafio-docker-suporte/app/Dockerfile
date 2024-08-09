FROM node:18-slim

WORKDIR /usr/src

COPY package*.json ./
RUN npm install
WORKDIR /usr/src/app
COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]