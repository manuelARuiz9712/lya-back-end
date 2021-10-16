# Lya Back-end test

_Back end project with nest.js_

## Comenzando 🚀

_Clona el repositorio con el siguiente comando_

```   
git clone https://github.com/manuelARuiz9712/lya-back-end
```


### Pre-requisitos 📋

_Para correr el proyecto necesitas tener node.js instalado y el motor de mongo db_


### Instalación 🔧


_Para instalar el proyecto en local siguie los siguientes pasos_


_ve a la raiz del proyecto y crea un archivo llamado .env y pega el siguiente contenido_

```
APP_TEST=1
APP_PORT=3500
JWT_SECRET=FJFJ486U384_
MQTT_URI=mqtt://mqtt.lyaelectronic.com:1883
NINJA_URI=https://catfact.ninja/
MONGO_DB=mongodb://localhost/lyatest
```

_Luego abre la carpeta principal del proyecto en una terminal y instala las dependencias con el siguiente comando

```
yarn install

```

## Ejecutando el proyecto ⚙️

_Para ejecutar el proyecto asegurate de que el puerto seteado en el archivo .env  variable APP_PORT este libre si no es asi cambialo
es probable que debas cambiar la conexion a mongo db si tienes una diferente en tu maquina_

_ejecuta el proyecto con el siguiete comando_

```
yarn start

```
_Si todo va bien deberias ver la siguiente salida_

```
[Nest] 4999  - 2021-10-16 11:10:33     LOG [NestFactory] Starting Nest application...
[Nest] 4999  - 2021-10-16 11:10:33     LOG [InstanceLoader] MongooseModule dependencies initialized +67ms
[Nest] 4999  - 2021-10-16 11:10:33     LOG [InstanceLoader] PassportModule dependencies initialized +0ms
[Nest] 4999  - 2021-10-16 11:10:33     LOG [InstanceLoader] HttpModule dependencies initialized +5ms
[Nest] 4999  - 2021-10-16 11:10:33     LOG [InstanceLoader] MongooseCoreModule dependencies initialized +1ms
[Nest] 4999  - 2021-10-16 11:10:33     LOG [InstanceLoader] JwtModule dependencies initialized +0ms
[Nest] 4999  - 2021-10-16 11:10:33     LOG [InstanceLoader] ConfigHostModule dependencies initialized +0ms
[Nest] 4999  - 2021-10-16 11:10:33     LOG [InstanceLoader] MongooseModule dependencies initialized +1ms
[Nest] 4999  - 2021-10-16 11:10:33     LOG [InstanceLoader] ConfigModule dependencies initialized +0ms
[Nest] 4999  - 2021-10-16 11:10:33     LOG [InstanceLoader] AppModule dependencies initialized +2ms
[Nest] 4999  - 2021-10-16 11:10:33     LOG [RoutesResolver] AuthController {/}: +187ms
[Nest] 4999  - 2021-10-16 11:10:33     LOG [RouterExplorer] Mapped {/authorization, POST} route +3ms
[Nest] 4999  - 2021-10-16 11:10:33     LOG [RouterExplorer] Mapped {/authorization, DELETE} route +0ms
[Nest] 4999  - 2021-10-16 11:10:33     LOG [RoutesResolver] UserController {/users}: +0ms
[Nest] 4999  - 2021-10-16 11:10:33     LOG [RouterExplorer] Mapped {/users/register, POST} route +1ms
[Nest] 4999  - 2021-10-16 11:10:33     LOG [RouterExplorer] Mapped {/users/:id, PUT} route +1ms
[Nest] 4999  - 2021-10-16 11:10:33     LOG [RouterExplorer] Mapped {/users/:id, DELETE} route +0ms
[Nest] 4999  - 2021-10-16 11:10:33     LOG [RouterExplorer] Mapped {/users/:id/active, PATCH} route +1ms
[Nest] 4999  - 2021-10-16 11:10:33     LOG [RouterExplorer] Mapped {/users/:id, GET} route +0ms
[Nest] 4999  - 2021-10-16 11:10:33     LOG [NestApplication] Nest application successfully started +2ms


```

_SI sale un error de conexion hacia mongo deberias hechale un vistazo al sting de conexion que se encuentra en _

## Construido con 🛠️


* [Nest.js](https://nestjs.com/) - Framework para desarrollo de la api
* [Mongose](https://mongoosejs.com/) - Manejo de mongo db 




