# Qué contiene el proyecto
El presente proyecto contiene la integración de la plataforma IOHealth en una webapp. 

La aplicación consiste en una página de carga, situada en ```www/index.html````que espera a que se cargue la web embedida. Una vez está cargada, permite la interacción de la misma mediante un navegador embebido. Los ajustes de la aplicación embebida se ajustan aplicando una serie de recursos especiales para personalizar, tanto el diseño, como el funcionamiento.

Mientras la web esté en marcha, un proceso se encarga de monitorizar la red buscando si hay cambios en la conectividad del dispositivo. En el momento de ocurrir un cambio, la aplicación informa del suceso al usuario, permitiéndole volver a cargar la página en el momento que la conectividad se restablezca.

# Requerimientos
- Apache Cordova 7.0.0. 
- Plugins: dialogs, fcm, inappbrowser, network-information and whitelist
- Android: ^6.2.3


# Ficheros
Los ficheros públicos de la aplicación se encuentran en la carpeta ```www```

```
index.html. Contiene la página de carga

css
    config.json: Fichero con los iconos de Fontello. http://fontello.com/
    normalize.css: Capa de normalización de estilo entre distintos navegadores.
    main.css: Fichero de estilo para la página de carga 
    custom.css: Fichero de estilo específico para la web
    neosans.otf: Fuente NEOSans
    fonts/: Carpeta con distintas fuentes de letra usadas, incluyendo los iconos de fontello.
    
js/
    bootstrap.js: Código que carga la aplicación y gestiona los recursos externos
    custom.js: Scripts que personalizan el funcionamiento de la web en su versión embebida.
    notifications.js: Script que gestionan el sistema de notificaciones en su versión embebida.
    jquery.js: Versión de jQuery para la página de carga.

```


# Tutorial: Cómo cambiar la URL embebida
La página web embebida se encuentra alojada en la dirección en el fichero ```www/js/bootstrap.js```.

```
/* @var url String The URL of the web site */
var url = "http://iohealth.nimbeo.com/health";
```


# Sistema de notificaciones
El funcionamiento es el siguiente:
La web, en su fichera de salud, tiene una casilla que permite al usuario, de forma voluntario, suscribirse al sistema de notificaciones. Este sistema es independiente por dispositivo. Es decir, un mismo paciente, puede tener vinculados distintos dispositivos a su cuenta. Por poner un ejemplo, podría tener vinculadas las notificaciones con su tablet, pero no con su smartphone.

El sistema de notificaciones push se maneja desde el fichero ```www/js/notifications.js```


Actualmente, el sistema de notificaciones está vinculado a la cuenta de Firebase.
https://console.firebase.google.com/?hl=es-419

Si se desea, vincular con otra cuenta, tendría que crear otra cuenta y generar un nuevo fichero ```google-services.json``` y dejarlo en la carpeta raíz.

La documentación del plugin se encuentra aquí:
- https://github.com/fechanique/cordova-plugin-fcm

Servidor de prueba de notificaciones:
https://cordova-plugin-fcm.appspot.com/


NOTA: En caso de cambiar de cuenta, será necesario modificar la web, en el fichero controlador de reportes para especificar la nueva API KEY.



# Anexo A. Cómo desplegar Cordova WebApps para cargar una página
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
res/ Aquí van los iconos y recursos de la aplicación
plugins/ Aquí van los plugins de la aplicación
www/ Aquí va el código fuente de la aplicación
config.xml Fichero de configuración
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
    <access origin="http://iohealth.nimbeo.com" />

De esta manera estamos permitiendo que la web http://sepln2017.um.es y todos sus páginas internas se puedan abrir dentro del mismo navegador.

## Iconos
Los iconos de la app se pueden generar automáticamente a través de la siguiente herramienta. http://phonegap.appiq.software/

Es posible pasarle una imagen y el genera los archivos necesarios y el código para el config.xml

## Página web
En la carpeta `/www` encontramos la plantilla del proyecto

Básicamente se encarga de manejar los eventos del objeto `InAppBrowser`. Para decir qué página queremos cambiar tenemos que:

1. Cambiar la variable `url` dentro de `index.html`

```javascript
/* @var url String */
var url = "http://sepln2017.um.es";
```

2. Subir los iconos a la carpeta `/res`

3. Modificar el ficheo `config.xml` para establecer el título de la aplicación

```xml
    <name>IOHealth</name>
    <description>
        Plataforma IOHealth para la auto-gestión de la salud
    </description>
    ...
```

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


## Compilación
Para desplegar el proyecto, hay que usar el siguiente comando

```
    > cordova build android
```
    
El fichero generado estará dentro de la carpeta ```platforms\android\build\outputs\apk```