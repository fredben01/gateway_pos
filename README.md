Gateway POS
============

Para ejecutar localmente debe seguir los siguientes pasos:

 1. Abrir la consola
 2. Ubicarse en la carpeta para clonar el repositorio
 3. Clonar repositorio (YOUR_USER: ponga su usuario de github)

~~~
git clone https://github.com/[YOUR_USER]/gateway_pos.git
~~~

 4. Ingresar a la carpeta del proyecto
 5. Crear la BD de Redis ejecute:
~~~
docker-compose up -d
~~~
 6. Renombre el archivo:
~~~
mv env.yaml.template env.yaml
~~~
 7. Edite el archivo env.yaml con un editor de texto (Para el ejemplo puede llenar con los siguientes datos)
~~~
development:
  PORT: 4000
  REDIS_HOST: "localhost"
  REDIS_PORT: "6379"
  REDIS_PASS: "todovale"
  REDIS_EXPIRATION: 60
  PK: dso0@^DG
  TOKEN_SECRET: Bskkeh#v@jdks%ZAodndwm65n3&ñsld^9
  TOKEN_EXPIRATION: 60
~~~
 8. Guardar y cerrar el archivo
 9. Instale typescript de manera global
~~~
npm i -g typescript
~~~
 10. En la consola dentro de la carpeta instalamos los paquetes de node (Se genera la carpeta node_modules)
~~~
npm install
~~~
 11. Para correr en desarrollo (Con nodemon)
~~~
npm run dev
~~~
 12.  Compilar para producción
~~~
npm run build
~~~
