FROM nginx

WORKDIR /app

RUN mkdir ./build

ADD ./build ./build

RUN rm /etc/nginx/conf.d/default.conf

RUN rm /etc/nginx/nginx.conf

COPY ./default.conf /etc/nginx/conf.d/

COPY ./nginx.conf /etc/nginx/

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]