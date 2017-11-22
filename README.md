# Cómo desplegar Cordova WebApps para cargar una página
## Instalación
Los pasos para instalar Apache Cordova en Windows se encuentran en el siguiente enlace:
https://evothings.com/doc/build/cordova-install-windows.html

Básicamente es ia instalación de nodejs, java y android-tools

Una vez instalado se pueden seguir los pasos aquí indicados, desde la consola de comandos https://evothings.com/doc/build/cordova-guide.html
```
cordova create DemoProject com.evothings.demoapp DemoApp
cd DemoProject
(delete files in www-folder, using file browser or command line)
(move or copy files from your project to www, using file browser or command line)
(add plugins using cordova plugin add)
cordova platform add android
```

La compilación de aplicaciones puede fallar debido a que hay que aceptar ciertos permisos. Para ello, seguir los pasos indicados aquí, con la respuesta de jxmallett
https://stackoverflow.com/questions/40383323/cant-accept-license-agreement-android-sdk-platform-24

## Plugins necesarios
Los plugins necesarios para hacer funcionar la aplicación son: inappbrowser y whitelist.

Una vez instalados, dentro del fichero config.xml es necesario añadir las directivas de seguridad
    <access origin="*" />
    <access origin="http://sepln2017.um.es" />

De esta manera estamos permitiendo que la web http://sepln2017.um.es y todos sus páginas internas se puedan abrir dentro del mismo navegador.

## Página web
En la carpeta /www es necesario añadir los archivos jquery.js y cordova.js. Es importante cargarlos de forma local porque los usaremos también en casos donde no haya internet.

Luego es necesario crear un fichero .html con el siguiente esqueleto
http://semantics.inf.um.es/joseagd/sample-cordova/index.txt

La manera de cargar los mensajes se pueden configurar desde el mismo CSS y HTML. Se recomienda usar uno sencillo, pero aquí se pueden encontrar diferentes ideas
https://codepen.io/tag/loading%20screen/

La aplicación de prueba se puede descargar aquí
https://semantics.inf.um.es/joseagd/sample-cordova/android-debug.apk




