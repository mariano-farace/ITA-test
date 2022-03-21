# Prueba técnica de Node.js

Este proyecto utiliza javascript, express y jest/supertest para que sea sencillo.
Eres libre de agregar cualquier dependencia que puedas necesitar.

Esta tarea está bastante cerca de lo que podría suceder en un entorno real y, como tal, nos gustaría que la trataras como una función que se pondrá en producción mañana.

Deberías poder completar esto en 90 minutos, pero si necesita un poco más de tiempo, ¡tampoco hay problema!

# Ejecución

Run `npm install` para instalar las dependencias
Run `npm run start` para iniciar el servidor
Run `npm run test` para lanzar los tests

# Tarea

Tenemos una base de datos (falsa) y queremos sincronizar a nuestros usuarios con usuarios externos.

La api tiene 2 endpoints:
`GET /users`
`GET /users/sync`

El segundo es el que tienes que implementar:

Busca todos los usuarios `it-academy` y sincronizalos con los guardados en la base de datos usando la API v3 de github: `https://api.github.com/search/users?q=it-academy`

Siempre que se llame a ese web-service final, debería sincronizar nuestra "base de datos" interna con los resultados de esa llamada, eso significa:

- Añadir nuevos usuarios que no estan guardados
- Actualizar la información que ha cambiado
- Eliminar usuarios que estan en nuestra BBDD pero que ya no estan en github.

Asumiremos que `login` es único en el sistema.

Realiza las modificaciones pendientes y mejoras oportunas, utiliza librerias externas si lo consideras pertinente.

# Solución

Crea un repositorio privado en github e invita a kevinmamaqi@gmail.com antes de la hora de cierre.

## Mucha Suerte!
