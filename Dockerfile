FROM node:18-alpine3.15
WORKDIR /home/node/app
COPY package*.json ./
RUN npm config set unsafe-perm true
RUN npm install
COPY . .


RUN npm run build
EXPOSE 80
CMD [ "node", "dist/server.js" ]
