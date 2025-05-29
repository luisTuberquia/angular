# Gestor de suscripciones
![csharp-toolkit](https://img.shields.io/badge/Angular-Service-purple)
![csharp-toolkit](https://img.shields.io/badge/Clean-Architecture-blue)
![csharp-toolkit](https://img.shields.io/badge/LocalStorage-json-orange)

***
**Tabla de Contenido**
1. [Introducción](#id1)
2. [Levantando la Aplicación](#id2)
    * 2.1. [Pre-Requisitos](#id2.1)
    * 2.2. [Ejecutando la Aplicación](#id2.2)
    * 2.3. [Variables de Entorno](#id2.3)    
3. [Probando los servicios](#id3)
4. [Arquitectura de Aplicaciones](#id4)
    * 4.1. [Arquitectura Hexagonal](#id4.1)


## 1. Introducción
***
Este proyecto contiene la solución del reto técnico de desarrollo de software en satrack,
un modelo de suscripciones para una plataforma de streaming, construido en Angular, basado en una arquitectura Clean Architecture y un enfoque de diseño de software centrado en el dominio del negocio. [** DDD**](#id4) 

La distribución de módulos y paquetes del proyecto se basa en Clean Architecture

![Estructura Proyecto ](doc/Estructura_proyecto.png)

## 2. Levantando la Aplicación

La aplicación permite ejecutarse demanera local, clonandoce el proyecto, una vez clonando utilizaremos los siguientes comandos 

* npm install

luego para levantar el proyecto en un navegador 
* ng -serve -o

### 2.1. Pre-Requisitos
* Tener instalado [**Visual code**](https://code.visualstudio.com/).
* Tener instalado [**.node.js**](https://nodejs.org/es/download).
* instalar Angular cli 


### 3  Aplicación de principios solid

* Inversión dependencias (DIP) : Se aplica inversión de dependencias debido a que se están usando interfaces  para realizar abstracciones y no de implementaciones ejemplo IsubscriptionRepository.

* Abierto y Cerrado (OCP): los módulos están abiertos a que puedan extender dersen sin necesidad de ser modificados, ejemplo de aplicación en los casos de uso.


* principio de segregación de interfaces: la interfaz es pequeña y todas sus implementaciones son usadas, es decir no existen métodos o funciones innecesarias (IsubscriptionRepository)


* Responsabilidad única (SRP): cada clase tiene una única responsabilidad, y su implementación y cuya implementación de casos de uso fue realizado como lo sugiere el reto cancel-subscription.use-case, update-subscription.use-case, subscription.use-case


## 4. Patrones de diseño

* Patrón de repositorio: Se utiliza este patron de tipo estructural, el cual nos facilita en la abstracción de datos por medio de interfaz

* Strategy Pattern: Se implementa el (Patrón de estrategia) en las funciones calculatePayment o canBeCancelled, ya que estas permiten cambiar el comportamiento o realizar calculos dinamicos segun su plan de suscripción que se le envie por parametros. 

* Command Patther: la implementacion podemos apreciarla en los casos de uso, debido a que solo se enfocan en realizar una unica acción ya sea de cancelar, actualizar o uactualizar.


