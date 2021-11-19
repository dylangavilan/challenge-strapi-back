# challenge-strapi-back
### `npm-install`
Antes de iniciar debemos instalar las dependencias que se encuentran en el package.json con este comando
## `Como continuo?`
### `npm run develop`
Con ese comando podremos iniciar el servidor y realizar modificaciones desde el panel de usuario de Strapi
### `npm start`
De esta manera iniciaremos el servidor como un cliente solamente para utilizar las funcionalidades ya creadas, no podremos modificar el panel


### `Descripción`
Se creo una API Restful con NodeJS, strapi y mongo, en este mismo podremos acceder a los endpoints que nos provee Strapi, pero también tendremos endpoints personalizados en la carpeta api. Dentro de esta tendremos dos carpetas una llamada mascotas a la cual se le haran las peticiones para dar de alta una mascota: en este se manejan los datos que llegan desde el cliente, si es que nos llega una fecha exacta la pasa a años, si es nos llegan años o meses lo pasa a una fecha aproximada.
Y por otro lado raza el cual cree un endpoint el cual nos filtra a los perros por su raza, este mismo esta hecho con el fin de practicar el flujo de datos con strapi!
