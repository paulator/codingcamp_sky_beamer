# BASE
FROM alpine
# RUN
RUN apk add nginx nodejs npm
# HTML files
ADD ./html /var/www/localhost/htdocs
# nodejs
ADD ./nodejs /var/www/localhost/nodejs
WORKDIR /var/www/localhost/nodejs
RUN npm install
# CONFIGUTATIONS
# nginx configuration
ADD ./nginx-alpine-ssl/config/default.conf /etc/nginx/http.d/default.conf
# keys and certs
ADD ./nginx-alpine-ssl/config/*.key /etc/ssl/private/
ADD ./nginx-alpine-ssl/config/*.crt /etc/ssl/certs/
WORKDIR /var/www/localhost/htdocs
# ENTRYPOINT
COPY ./nginx-alpine-ssl/entrypoint.sh /usr/local/bin
RUN chmod +x /usr/local/bin/entrypoint.sh
ENTRYPOINT ["/bin/sh", "/usr/local/bin/entrypoint.sh"]
# EXPOSE PORTS
EXPOSE 80
EXPOSE 443
# RUN COMMAND
CMD ["/bin/sh", "-c", "nginx -g 'daemon off;'; nginx -s reload;"]