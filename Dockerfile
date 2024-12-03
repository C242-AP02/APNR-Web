# Menggunakan image Node.js sebagai base image
FROM node:20

ENV NODE_ENV=production

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
