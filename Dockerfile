FROM node:latest as build

ADD "." "/opt/tweezers.ui"

WORKDIR "/opt/tweezers.ui"

ENV PATH /opt/tweezers.ui/node_modules/.bin:$PATH

RUN npm i -g @angular/cli
RUN npm i

RUN ng build --output-path=/opt/docker/tweezers.ui


FROM nginx:alpine

COPY default.conf /etc/nginx/conf.d/

COPY --from=build /opt/docker/tweezers.ui /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]