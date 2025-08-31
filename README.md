# WebCodeFusion

### Integrantes

| Nombre        | Carnet        |
| ------------- | ------------- |
| Luis Mario Cabrera Torres              | 00002022               |
| Javier Alejandro González Rivas              | 00088022             |
| Jorge Eduardo Avalos Velasquez              | 00009322              |


# Usuarios de prueba
| Nombre        | correo        |
| ------------- |---------------|
| mkett0        | jpeel0@va.gov |
| wtootin1      | gmckinn1@about.com |
| ctring2       | fsimpkin2@mtv.com  |
| asmoote4      | lmullineux3@taobao.com |
| kheadland3    | lsprigg4@liveinternet.ru  |

# Guía de instalación

## npm install --global yarn
    Este comando instala Yarn globalmente en tu sistema. Yarn es un administrador de paquetes alternativo a npm (Node Package Manager). Puedes instalar paquetes de npm con Yarn y viceversa. La opción --global instala Yarn de manera que esté disponible en todo tu sistema, no solo en un proyecto específico.

## yarn add mongoose
    Agrega la biblioteca mongoose al proyecto. Mongoose es una biblioteca de ODM (Object-Document Mapping) para MongoDB y Node.js. Facilita la interacción con bases de datos MongoDB a través de JavaScript.

## yarn add axios
    Agrega la biblioteca axios al proyecto. Axios es una biblioteca que permite realizar solicitudes HTTP desde el navegador o Node.js. Es muy útil para realizar solicitudes a APIs desde tu aplicación.

## yarn add express
    Agrega la biblioteca express al proyecto. Express es un marco web para Node.js que simplifica el desarrollo de aplicaciones web y API. Facilita la creación de rutas, el manejo de middleware y la gestión de solicitudes y respuestas HTTP.

## yarn yarn add tailwindcss@^1
    Agrega la biblioteca tailwindcss al proyecto. Tailwind CSS es un marco de diseño utilitario para construir interfaces de usuario. La versión específica @^1 significa que se instalará la última versión compatible con la versión 1.x de Tailwind CSS. Puedes ajustar esta versión según tus necesidades.

# Manual de Usuario: WebCodeFusion
## Introducción
Bienvenido a WebCodeFusion, una plataforma diseñada para fomentar el desarrollo de habilidades informáticas, específicamente en el ámbito del diseño web. El propósito principal de esta iniciativa es atraer al público y facilitar la introducción al diseño web, un punto de partida común para muchos programadores.

## Acceso a la Aplicación
### 1. Ingreso a la Plataforma:

Acceda a la aplicación mediante el enlace proporcionado o mediante la búsqueda de "WebCodeFusion" en cualquier navegador web.

### 2. Registro:

Si aún no está registrado, complete el proceso de registro (SignUp) para obtener acceso a todas las funcionalidades de la plataforma.

### 3. Inicio de Sesión:

Una vez registrado, inicie sesión en la plataforma utilizando la sección de login.

## Exploración y Aprendizaje
### 1. Interfaz de Usuario:

Tras el inicio de sesión, se presentará la nueva versión de la página de inicio. Explore las diferentes secciones, y para comenzar a aprender, diríjase a la sección designada.

### 2. Aprendizaje de HTML y CSS:

Dentro de la sección "learn," familiarícese con las etiquetas de HTML y CSS, ya que serán fundamentales para los juegos posteriores.

### 3. Juegos de Codificación:

Progrese a través de los juegos, comenzando idealmente con el juego de HTML para comprender en profundidad el propósito de cada etiqueta. Posteriormente, avance al juego de CSS.

## Detalles Específicos de los Juegos
### 1. Juego de HTML:

    1. Inicio del Juego
    Cada nivel presenta un nuevo problema HTML. Tu tarea es resolverlo utilizando el editor de código.

    2. Botón de Ayuda: Supera Obstáculos con Confianza
    Si te sientes trabado, haz clic en el botón de ayuda para obtener un paso a paso detallado y superar el obstáculo.

    3. Editor de Código: Tu Lienzo Creativo
    Escribe las etiquetas HTML necesarias en el editor de código para resolver el problema. Si necesitas inspiración, utiliza el botón de ejemplo.

    4. Ejecutar y Limpiar: Perfecciona Tu Código
    Utiliza los botones "Ejecutar" y "Limpiar" para verificar y refinar tu código, asegurándote de que sea impecable.

    5. Verificación de Respuestas: ¡Demuestra tu Maestría!
    Haz clic en "Check" para verificar tu respuesta. Gana puntos y avanza al siguiente nivel si es correcta. Aprende de tus errores si es incorrecta.

    6. Puntuación y Desafíos
    El juego consta de 35 niveles, cada uno más desafiante. Gana puntos al resolver problemas y desbloquea niveles avanzados para demostrar tus habilidades HTML.

### 2. Juego de CSS:

Al ingresar al juego de CSS, lea detenidamente los problemas, ya que proporcionan pistas cruciales. Tenga precaución con los espacios adicionales, ya que podrían afectar la evaluación del programa.

## Estructura del Proyecto

### 1. Organización y Componentes:
Esta sección describe la estructura del proyecto, detallando la organización de carpetas, archivos clave y otros aspectos relevantes.

## Conclusiones y Recomendaciones

### 1. Finalización y Puntos:

Al completar los juegos, sus puntos se calcularán automáticamente. Recuerde finalizar la sesión para conservar los avances.

### 2. Soporte y Contacto:

En caso de enfrentar problemas, consulte la sección de solución de problemas en este manual. Para asistencia adicional, comuníquese con nuestro equipo de soporte técnico.

    Apreciamos su participación en WebCodeFusion. ¡Disfrute de su experiencia de aprendizaje!

# Estructura del Proyecto

# Main
El componente Main representa la página principal de la aplicación. Proporciona una interfaz de usuario que varía según si el usuario está autenticado. Este componente es esencial para la navegación entre las secciones de aprendizaje y juego, así como para acceder a la autenticación.

## Funcionalidades
### 1. Navegación y Autenticación:

    El componente verifica la existencia de un token en el almacenamiento de sesión para determinar si el usuario está autenticado.
    Si el usuario está autenticado, se presentan enlaces de navegación a las secciones de aprendizaje y juego.
    Si el usuario no está autenticado, se presentan enlaces de navegación a las páginas de inicio de sesión y registro.

### 2. Enlaces de Navegación:

    Se utilizan componentes NavLink para proporcionar enlaces de navegación a diferentes secciones de la aplicación.
    La navegación depende del estado de autenticación del usuario.

## 3. Contenido Informativo:

    Se presenta información atractiva y motivadora sobre la plataforma, incluido un llamado a la acción para comenzar a aprender.
    
## Componentes Clave
### 1. Verificación de Autenticación:

    Se utiliza useEffect para verificar la existencia del token y actualizar el estado isLogged en consecuencia.

### 2. Navegación Diferenciada:

    Dependiendo del estado de autenticación, se presentan diferentes enlaces de navegación y llamadas a la acción.

### 3. Enlaces de Navegación:

    NavLink se utiliza para dirigir al usuario a diferentes secciones de la aplicación.

### 4. Contenido Informativo:

    Se presenta un título atractivo y un mensaje motivador para atraer a los usuarios a participar.

# Learn

El componente Learn es una interfaz de usuario de React diseñada para mostrar contenido educativo relacionado con HTML y CSS. Permite a los usuarios alternar entre las secciones de aprendizaje de HTML y CSS, presentando menús específicos para cada tecnología.

## Funcionalidades
### 1. Alternancia entre HTML y CSS:

    El componente presenta botones que permiten a los usuarios cambiar entre las secciones de aprendizaje de HTML y CSS.
    Al hacer clic en un botón, la sección activa cambia, mostrando el contenido específico correspondiente a HTML o CSS.

### 2. Menús Específicos para Cada Tecnología:

    Se utiliza el estado local section para realizar un seguimiento de la sección activa (HTML o CSS).
    Dependiendo de la sección activa, se renderiza el menú correspondiente (HtmlMenu o CssMenu).

### 3.Estilos Visuales:

    Los botones de alternancia de sección tienen estilos visuales que indican visualmente la sección activa.
    El contenido de aprendizaje se presenta de manera clara y estructurada para facilitar la comprensión.

## Componentes Clave

### 1. Alternancia de Sección:

    Botones que permiten al usuario cambiar entre las secciones de aprendizaje de HTML y CSS.
    Manejadores de eventos para actualizar el estado section al hacer clic en los botones.

### 2. Menús Específicos para Cada Tecnología:

    HtmlMenu: Menú que presenta contenido educativo relacionado con HTML.
    CssMenu: Menú que presenta contenido educativo relacionado con CSS.

### 3. Estilos Visuales:

    Estilos CSS para resaltar visualmente la sección activa y presentar el contenido de manera atractiva.

# Login

El componente LogIn es una interfaz de usuario de React diseñada para manejar el inicio de sesión de usuarios en una aplicación web. Utiliza formularios para recopilar credenciales y realiza la autenticación a través de servicios API. También gestiona la redirección según los roles del usuario.

## Funcionalidades

### 1. Formulario de Inicio de Sesión:

    El componente presenta un formulario con campos para nombre de usuario o correo electrónico y contraseña.
    Los usuarios ingresan sus credenciales y pueden enviar el formulario para iniciar sesión.

### 2. Manejo de Cambios en el Formulario:

    Los cambios en los campos del formulario se capturan y actualizan en el estado del componente.
    Se utiliza el estado local FormData para almacenar temporalmente los datos del formulario.

### 3. Autenticación y Redirección:

    Al enviar el formulario, se realiza una solicitud de inicio de sesión a través del servicio login.
    Si la autenticación es exitosa, se almacena el token de sesión y la información del usuario en el almacenamiento de sesión.
    Dependiendo de los roles del usuario, se redirige a la página de inicio del usuario o al panel de administración.

### 4. Gestión de Sesiones y Roles:

    Se utiliza sessionStorage para almacenar temporalmente el token, roles y nombre de usuario.
    Si el inicio de sesión es exitoso, se almacenan estos detalles para su uso en otras partes de la aplicación.

### 5. Gestión de Errores:

    Si la autenticación falla, se muestra un mensaje de error indicando que el nombre de usuario o la contraseña son incorrectos.
    
## Componentes Clave

### 1. Formulario de Inicio de Sesión:

    Campos para el nombre de usuario o correo electrónico y la contraseña.
    Manejadores de eventos para cambios en los campos y envío del formulario.

### 2. Manejo de Sesiones y Redirección:

    Almacenamiento y recuperación de detalles de sesión utilizando sessionStorage.
    Redirección a diferentes rutas según los roles del usuario.

### 3. Gestión de Errores:

    Mostrar un mensaje de error si la autenticación no es exitosa.

### 4. Llamadas a API:

    Utiliza servicios API, como login y findMe, para gestionar la autenticación y obtener información del usuario.

# sign up

El componente SignUp representa la página de registro de la aplicación. Proporciona un formulario para que los usuarios creen una nueva cuenta. Este readme proporcionará información sobre las funcionalidades clave y cómo utilizar este componente.

## Funcionalidades
### 1. Registro de Usuario:

    El componente permite a los usuarios ingresar un nombre de usuario, dirección de correo electrónico y contraseña para registrarse.
    Utiliza el servicio register del módulo api.services para enviar la solicitud de registro al servidor.

### 2. Manejo de Errores:

    Si hay errores durante el registro, se muestran mensajes detallados sobre los problemas encontrados.
    Si hay conflictos, como un nombre de usuario o correo electrónico ya existente, se informa al usuario sobre el conflicto.
    
### 3. Navegación:

    Después de un registro exitoso, se redirige automáticamente al usuario a la página de inicio de sesión (/login) después de un breve período.

### 4. Interfaz de Usuario Clara:

    El formulario y los mensajes de error están diseñados para proporcionar una experiencia de usuario clara y comprensible.

## Componentes Clave

### 1. Formulario de Registro:

    Los usuarios ingresan su información de registro, y la función handleChange actualiza el estado del formulario.

### 2. Manejo de Errores:

    Se utilizan los estados showErrors, arrayErrors, showConflict, y conflict para controlar la visibilidad de los mensajes de error.

### 3. Redirección Después del Registro:

    Después de un registro exitoso, el componente utiliza useNavigate para redirigir al usuario a la página de inicio de sesión.

### 4. Estilo y Diseño:

    El componente utiliza clases CSS para aplicar estilos y asegurar una presentación atractiva.

# CssGame

El componente CssGame es un componente React diseñado para una aplicación web centrada en enseñar y practicar estilos CSS. Proporciona un entorno similar a un juego donde los usuarios pueden resolver desafíos de estilización para elementos HTML.

## Funcionalidades

### 1. Desafíos basados en Niveles:

    El componente presenta desafíos de estilización basados en diferentes estructuras y elementos HTML.
    Cada nivel requiere que los usuarios apliquen estilos CSS para lograr un resultado visual específico.

### 2. Interacción del Usuario:

    Los usuarios pueden ingresar su código CSS para estilizar el código HTML proporcionado.
    El botón "Run" aplica el código CSS del usuario al HTML, mostrando el resultado en un iframe.

### 3. Sistema de Puntuación:

    Los usuarios ganan puntos por estilizar correctamente los elementos.
    Los puntos se muestran en la interfaz y se acumulan a medida que los usuarios avanzan de nivel.

### 4. Navegación:

    Los usuarios pueden navegar entre niveles utilizando los botones "Anterior" y "Siguiente".
    Un menú desplegable permite a los usuarios saltar a cualquier nivel.

### 5. Finalización del Juego:

    El componente reconoce cuando un usuario completa todos los niveles y proporciona la opción de finalizar el juego.
    Al completar el juego, el componente registra las respuestas del usuario y la puntuación final.
    
### 6. Autorización y Roles de Usuario:

    El componente verifica el estado de autenticación y el rol del usuario para determinar si tienen permiso para acceder al juego.
    Si no están autorizados, se muestra un mensaje de contenido bloqueado.

## Componentes Clave

### 1. Entrada de HTML y CSS:

    Los usuarios pueden ingresar código HTML y CSS en áreas de texto designadas.
    El código HTML está predefinido para cada nivel, y los usuarios deben estilizarlo usando CSS.

### 2. Controles de Navegación:

    Los botones "Anterior" y "Siguiente" permiten a los usuarios navegar entre niveles.
    Un menú desplegable les permite a los usuarios seleccionar un nivel específico.

### 3. Información de Puntuación:

    La puntuación actual del usuario se muestra en la interfaz.
    Se otorgan puntos por cada nivel estilizado correctamente.

### 4. Finalización y Guardado de Puntuación:

    Cuando el usuario completa todos los niveles, se presenta un botón de "Finalizar".
    Al finalizar, el componente intenta guardar la puntuación del usuario si han iniciado sesión.

### 5. Autorización y Contenido Bloqueado:

    El componente verifica si el usuario ha iniciado sesión y su rol para determinar el acceso.
    Los usuarios no autorizados ven un mensaje de contenido bloqueado con la opción de volver atrás.

# HtmlInterface

El componente HtmlInterface representa una interfaz de juego interactivo para aprender HTML en la aplicación HyperTextRace. Proporciona un entorno donde los usuarios pueden escribir código HTML y recibir retroalimentación sobre su precisión. Este readme proporcionará información sobre las funcionalidades clave y cómo utilizar este componente.

## Funcionalidades

### 1. Interfaz de Juego:

    Permite a los usuarios interactuar con un entorno de juego para escribir y ejecutar código HTML.
    Proporciona un área de código HTML donde los usuarios pueden escribir y ejecutar su código.

### 2. Niveles y Problemas:

    El juego consta de múltiples niveles, cada uno con un problema HTML específico para resolver.
    Los problemas incluyen descripciones, ejemplos y pistas para ayudar a los usuarios a comprender y resolver el desafío.

### 3. Verificación de Respuestas:

    Los usuarios pueden verificar sus respuestas haciendo clic en el botón "Check".
    Se proporciona retroalimentación inmediata sobre la precisión de la respuesta del usuario.

### 4. Ayuda y Pistas:

    Se ofrece una función de ayuda que proporciona pistas adicionales o explicaciones sobre el problema actual.

### 5. Puntuación y Finalización:

    Los usuarios ganan puntos al completar correctamente un problema, y la puntuación total se muestra en la interfaz.
    Al alcanzar el último nivel, los usuarios tienen la opción de finalizar el juego, lo que puede guardar sus puntos si están autenticados.

### 6. Control de Intentos:

    Los usuarios tienen un número limitado de intentos para resolver cada problema.
    Después de un número máximo de intentos, el juego se desactiva temporalmente para evitar abuso.

### 7. Interfaz Responsiva:

    El componente está diseñado para ser visualmente atractivo y fácil de usar en dispositivos de diferentes tamaños.
    
## Componentes Clave

### 1. Manejo de Estados:

    Utiliza varios estados para gestionar información crucial, como el nivel actual, código HTML ingresado, retroalimentación, puntuación y más.

### 2. Funciones Auxiliares:

    Diversas funciones auxiliares se utilizan para realizar acciones específicas, como la ejecución del código, el manejo de clics en botones y el cálculo de puntos.
### 3. Pistas y Ayuda:

    Proporciona un área para ver pistas adicionales o explicaciones cuando el usuario necesita ayuda.

### 4. Finalización y Puntuación:

    Permite a los usuarios finalizar el juego después de completar todos los niveles y guarda sus puntos si están autenticados.

### 5. Interfaz Responsiva:

    Se utilizan clases de diseño y estilos para asegurar una presentación visualmente atractiva y una experiencia de usuario fluida.

# URL API

# Rutas para consumir api

## URL BASE

http://localhost:3500/api/v1/

# Metodos POST

## Realizar registro

- http://localhost:3500/api/v1/auth/register

## Realizar log in

- http://localhost:3500/api/v1/auth/login

## Agregar nuevas tags

- http://localhost:3500/api/v1/tag

## Agregar nueva partida

- http://localhost:3500/api/v1/game/save

## Agregar atributo

- http://localhost:3500/api/v1/attribute

## Agregar propiedad

- http://localhost:3500/api/v1/property

# Metodos GET

## Obtener todas las etiquetas

- http://localhost:3500/api/v1/tag

## Obtener todas las partidas

- http://localhost:3500/api/v1/game/

## Obtener todos los atributos

- http://localhost:3500/api/v1/attribute

## Obtener por nombre de juego

- http://localhost:3500/api/v1/game/user/Game2

## Obtener por nombre de etiqueta

- http://localhost:3500/api/v1/tag/form

## Obtener por nombre de atributo

- http://localhost:3500/api/v1/attribute/rel

## Obtener todas las propiedades

- http://localhost:3500/api/v1/property

## Obtener propiedad por nombre

- http://localhost:3500/api/v1/property/color
