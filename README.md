# movies-api

API construida en el desarrollo de la Escuela de Javascript en Platzi.
El proyecto consistía en construir una web app utilizando el patron bff. La web app  esta hecha con React, y utiliza una configuración custom
para lograr SSR. Esta app consume un proxy Server, el cual se conecta a nuestra movies-api.


movies-api, es una API REST que utiliza una clean arquitecture, basada en servicios.
Esta api se encarga de interactuar con una base de datos no relacional, en esta caso MONGO DB, para realizar un CRUD de usuarios, y películas.
Como librería para interactuar con MONGO DB, no estoy utilizando una librería de terceros como Mongoose, sino no que implemento una librería propia que contiene
los métodos básicos para hacer un crud e interactuar con el mongo driver.

Incorpora autorización utilizando OAUTH2.0 y esta preparada para ser consumida con dos roles, el de admin, y el de usuario.
este ultimo el que utiliza nuestro proxy server.

# Scripts: #

npm run dev: Arranca la api en modo dev.

npm start: Arranca la api en modo producción.

La carpeta scripts/mongo contiene scripts utiles para generar un Admin Rol y un Client Rol con sus respectivos scopes de autorización, además
cuenta con scripts para generar usuarios y películas con objetivos de testing.
