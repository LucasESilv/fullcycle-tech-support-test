FROM node:18-slim

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
RUN npm audit fix || true

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]