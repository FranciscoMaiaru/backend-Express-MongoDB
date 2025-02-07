Faltará el .env 
npm -i 
NPM RUN START
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Este backend fue diseñado para: 
.Simular y Procesar solicitudes HTTP 
.Conectarse a una base de datos MongoDB acceder y gestionar sus datos mediante consultas NoSQL

Esta aplicacion express, levanta un servidor con node hecho para utilizar las rutas con sus respectivos métodos HTTP,   se preparó para manejar una DB 'Banco' con colecciones Clientes-Cuentas-Transacciones.
Dichas consultas NoSQL se gestionan a través del uso de la libreria 'mongoose'. 

Para las solicitudes se preparan rutas, que conforman al menos un 'CRUD'. 
Se puede apreciar: 
-uso de express-validator
-uso de middlewares propios de validacion
-manejo de variables de entorno
-uso de 'Schema' de mongoose
-uso de libreria 'jsonwebtoken' para codificar informacion de un cliente en un logeo, dicha info se utiliza para dar 'acceso' a solicitudes privadas, mediante el uso del header 'authorization'
-Comunicacion con una API externa en una ruta



La aplicacion no cuenta con un frontend, y para testear se utilizó Postman.
