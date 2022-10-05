FROM node:alpine AS build
WORKDIR /front-end

ARG REACT_APP_SERVER
ENV REACT_APP_SERVER=$REACT_APP_SERVER

COPY package.json .
RUN npm install

COPY . .
RUN npm run build


FROM nginx:alpine

COPY --from=build /front-end/build /usr/share/nginx/html
COPY ./deploy/default.conf.template /etc/nginx/conf.d/default.conf.template

CMD /bin/sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'
