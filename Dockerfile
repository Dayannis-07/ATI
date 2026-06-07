FROM ubuntu

# evitamos que la instalación de Apache se quede pegada
ARG DEBIAN_FRONTEND=noninteractive

# actualizaciones
RUN apt-get update -y && \
    apt-get upgrade -y && \
    apt-get install -y nano net-tools apache2

# se copian los archivos
COPY ./ /var/www/html/

# usamos puerto 80
EXPOSE 80

# evita que el contenedor se apague
CMD ["apachectl", "-D", "FOREGROUND"]