/---------------------------- Componente Loader ----------------------------/

El "Loader" es una versión en prueba y funciona como una página completa, 
los elementos principales son la animación del "spinner" y el nombre de 
la app que en este caso es "Oxi Care".

Los archivos estan guardados dentro de la carpeta "app" donde se creo una
nueva carpeta para los componentes llamada "components" y dentro esta la
carpeta "loader", la cual esta compuesta principalmente por el archivo 
html, scss y el loader.component.ts.

En el archivo loader.component.html como ya sabemos, esta compuesta por
las etiquetas que forman los elementos principales, algunos de ellos son:
  -Nombre de la app
  -Spinner
  -Mensaje de "cargando"
  -Logo
  -Algun consejo o dato importante

Por ahora esos son los unicos elementos, en cualquier momento puedes agregar
otro, en un momento te enseño como.

En el archivo loader.component.scss se escriben los estilos del html,
falta pulir algunos elementos pero funciona, se aceptan cambios si logras
reducir el número de lineas sin afectar el estilo definido.

En el archuvo loader.component.ts esta la magia jaja, aquí solo tienes que
declarar las variables que tienes en el html.  Fijate que en cada sección
del html hay un "*ngIf" con un nombre específico, depende del valor que reciba
si se mostrara en la pantalla o no. Ese nombre se declara en el "ts" como:

  @Input() isLoader = false;
  @Input() message: string;
  @Input() tip: string;
  @Input() isLogo = false;

Si el parametro recibe un valor booleano se inicializa en falso y si es
una cadena de caracteres como un texto que quieras mostrar sera un string.


Ahora, para usar este componente en alguna pagina primero tenemos que 
importarlo en el "module.ts", si vas al archivo "home.module.ts" veras 
un ejemplo de como se hace.

Después ya podemos declarar las variables a usar en el html y el ts de la 
pagina donde lo queremos ver.

En el archivo .html de la pagina usaremos la siguiente etiqueta: 
  <app-loader [isLoader]="showSplash" [message]="message" [tip]="tip" [isLogo]="isLogo"></app-loader>

Notese que las variables estan encerradas en "[]" y les asignamos un nombre
que usaremos en el archivo .ts.

En el archivo component.ts de la pagina se declaran las variables arriba
del constructor:

  showSplash = false;
  message = '';
  tip = '';
  isLogo = false;

Inicializamos las variables en "false" o "vacias" para despues ya poder
utilizaralas en cualquir función:

async comenzar() {

  this.showSplash = true;
  this.message = 'Analizando...';
  this.tip = 'Manten la calma y respira profundamente :)';
  isLogo = true;


La primer variable "showSplash" es el componente completo, este siempre
debera ir por defecto y cambiaremos su valor de "true" a "false"
dependiendo de la ocasión.

En la segunda variable "message" va el mensaje que queremos mostrar, por lo 
general solo sera para mensajes tipo "Cargando...", "Analizando...", 
tu me entiendes verdad?

La tercera variable "tip" como su nombre lo dice, podemos ingresar un
consejo, tampoco escribas una biblia jaja, y no es necesario mostrarlo siempre,
había pensado en tener un "array" con distintos tips/consejos y con una 
función mostrar un elemento de este "array" al azar, aun asi, este 
apartado solo es para llenar la pantalla cuando se sienta vacia.

La cuarta y última variable por ahora "isLogo", y si, es el logo de la
empresa, actualmente solo se muestra al iniciar la aplicación, ocupa la
parte inferior del componente y tiene un tamaño mediano por asi decirlo,
aun asi podeis hacer pruebas cambiando el tamaño a tu gusto.
Esta variable tambien recibe valores booleanos, para mostrarlo usa "true".



Y esto sería todo por ahora, una pequeña explicación del componente del
"Loader" y como puedes usarlo.


Una parte del código fue sacada de la siguiente página y lo demas fue hecho
por su servidor, el Ing. Uriel Loaiza.

Gracias.


Referencia:
https://kentwynn.com/frontend-lang/ionic/create-an-awesome-custom-loader-in-ionic-using-angular/kentwynn/03/07/2021/

