# ClientCloudDrive

Node 20
Angular 19.0.2.

## Funcionalidades

1. La aplicacion esta desarrollada en la ultima version de angular, lo que proporciona mayor seguridad y escalabilidad.
2. Se muestran alertas al usuario sobre los errores que comete.
3. El proyecto esta en un codepipeline de aws y se carga a un s3, cada vez que subimos cambios a la master se sincroniza el proyecto.
4. Se comunica con el servicio backend, lo cual protege la capa de negocio porque no esta expuesta desde el front end.
5. Se guarda la sesion el sessionStorage y tiene una duracion de 30 minutos.

## Requirements

1. Node.js 20 o superior

## Instalación y despliegue

El proyecto esta desplegado en la nube, asi que no hay que instalar nada

http://frontend-cloud-drive.s3-website-us-east-1.amazonaws.com

## Diagrama de arquitectura

<img src="https://recursosimagenes.s3.us-east-1.amazonaws.com/recursos/diagrama+de+arquitectura.jpg" width="800">

## Modelo entidad relacion


<img src="https://recursosimagenes.s3.us-east-1.amazonaws.com/recursos/modelo+entidad+relacion.png" width="600">