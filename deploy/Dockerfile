FROM nginx:latest

RUN openssl dhparam -out /etc/nginx/dhparam.pem 2048

COPY . /etc/nginx/
