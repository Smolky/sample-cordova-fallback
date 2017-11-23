# Cómo desplegar Cordova WebApps para cargar una página
El presente documento debe de servir de guía para instalar el entorno de desarrollo de Apache Cordova y poder crear aplicaciones web que integren una página web. 

Los requisitos de este proyecto son:
- Poder abrir una página en un navegador de forma nativa
- Manejar el estado de conexión offline-online
- Poder salir de la aplicación al volver atrás
- Manejar hojas de estilo diferentes

## Instalación
Los pasos para instalar Apache Cordova en Windows se encuentran en el siguiente enlace:
https://evothings.com/doc/build/cordova-install-windows.html

Básicamente es ia instalación de nodejs, java y android-tools

Una vez instalado se pueden seguir los pasos aquí indicados, desde la consola de comandos https://evothings.com/doc/build/cordova-guide.html
```
cordova create DemoProject com.evothings.demoapp DemoApp
cd DemoProject
cordova platform add android
```

El resultado de ejecutar este proceso es la creación de una carpeta llamada DemoProject. Con la siguiente estructura de ficheros dentro

```
plugins/
www/
config.xml
```

La compilación de aplicaciones puede fallar debido a que hay que aceptar ciertos permisos. Para ello, seguir los pasos indicados aquí, con la respuesta de jxmallett
https://stackoverflow.com/questions/40383323/cant-accept-license-agreement-android-sdk-platform-24

## Plugins necesarios
Los plugins necesarios para hacer funcionar la aplicación son: `inappbrowser`, `whitelist` y `network information`.


La instalación de dichos plugins se realiza desde la consola de comandos

    > cordova plugin add cordova-plugin-inappbrowser
    > cordova plugin add cordova-plugin-whitelist
    > cordova plugin add cordova-plugin-network-information
    > cordova prepare

    

Una vez instalados, dentro del fichero config.xml es necesario añadir las directivas de seguridad
    <access origin="*" />
    <access origin="http://sepln2017.um.es" />

De esta manera estamos permitiendo que la web http://sepln2017.um.es y todos sus páginas internas se puedan abrir dentro del mismo navegador.

## Iconos
Los iconos de la app se pueden generar automáticamente a través de la siguiente herramienta. http://phonegap.appiq.software/

Es posible pasarle una imagen y el genera los archivos necesarios y el código para el config.xml

## Página web
En la carpeta `/www` encontramos la plantilla del proyecto

Básicamente se encarga de manejar los eventos del objeto `InAppBrowser`. 


### Estilos personalizados
Una vez carga la página, el siguiente código es inyectado dentro de la página

```javascript
ref.executeScript ({code: "(function() { document.getElementsByTagName ('body')[0].className = document.getElementsByTagName ('body')[0].className.concat (' state-iframe') })()"});
```

esto lo que hace es añadir una clase `state-iframe` al body de la página, por lo que luego podremos editar estilos, definiendo esta serie 
de reglas

```css
    body.state-iframe {
        ...
    }
```

También es posible añadir CSS directamente: https://stackoverflow.com/questions/24098838/phonegap-inappbrowser-insertcss-file
                    