FROM mysql:5.7.26
ENV MYSQL_ROOT_PASSWORD root
ENV MYSQL_DATABASE mydb
COPY db.sql /docker-entrypoint-initdb.d
EXPOSE 3306