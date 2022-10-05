FROM node:alpine

WORKDIR /desafio-native-backend
ARG APP_PORT=3001

COPY package.json .
RUN npm install

COPY . .

EXPOSE $APP_PORT
CMD npm run prisma:migrate && npm run prisma:seed && npm start
