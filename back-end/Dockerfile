FROM node:alpine

WORKDIR /desafio-native-backend
ARG APP_PORT=3001

COPY package.json .
RUN npm install

COPY . .

EXPOSE $APP_PORT
ENTRYPOINT npx prisma db push && npx prisma db pull && npx prisma generate && npm run dev