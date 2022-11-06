import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import * as $ from 'jquery';
import { RestService } from '../../services/rest.service';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.page.html',
  styleUrls: ['./registros.page.scss'],
})
export class RegistrosPage implements OnInit {

  showSplash = false;
  message = '';
  tip = '';

  date = '';

  registros = [];

  ultimoRegistro = [];

  registroFecha = [];

  statusRegistro = '';

  promedios = {
    promedioTemp : 0,
    promedioOxy : 0,
    promedioBpm : 0
  }

  constructor(
    private restService: RestService,
  ) { }

  ngOnInit() {
    
  }
  // Función para mostrar datos curiosos al azar
  randomTip() {
    const tips = [
      'El hueso más grande es la pelvis o hueso de la cadera. De hecho, está formado por seis huesos firmemente unidos entre sí.',
      'El hueso más largo es el fémur, en el muslo. Constituye casi un cuarto de la altura total delcuerpo.',
      'El hueso más pequeño es el estribo, situado en el oído medio. Es un poco más grande que un grano de arroz.',
      'Las orejas y el extremo de la nariz no tienen huesos en su interior. Por eso pueden doblarse.',
      'Al producirse la muerte, el cartílago se descompone más rápidamente que el hueso. De ahí que los cráneos de los esqueletos no tengan nariz ni orejas.',
      'Hay aproximadamente 60 músculos en la cara.',
      'Sonreír es más fácil que fruncir el ceño.',
      'Para sonreír intervienen 20 músculos, mientras que para fruncir el ceño hacen falta más de 40.',
      'El músculo más pequeño del cuerpo es el estapedio, en el oído medio. Mide tan sólo 5 milímetros y es más fino que un hilo de algodón. Sirve para la audición.',
      'El músculo más grande del cuerpo es el glúteo máximo, en la nalga. Tira de la pierna hacia atrás con fuerza para caminar, correr y subir escaleras.',
      'Como promedio, el corazón late unas 3 mil millones de veces durante la vida de una persona.',
      'Cada segundo mueren en el cuerpo humano 2 millones de células sanguíneas y nace el mismo número de ellas.',
      'Dentro de una diminuta gota de sangre hay 5 millones de glóbulos rojos, 300,000 plaquetas y 10,000 glóbulos bancos.',
      'Un glóbulo rojo tarda aproximadamente 1 minuto en circular alrededor de todo el cuerpo.',
      'Los glóbulos rojos realizan aproximadamente 250,000 viajes alrededor del cuerpo antes de regresar a la médula ósea, donde nacieron, para morir.',
      'Los glóbulos rojos pueden vivir unos cuatro meses circulando por todo el cuerpo, alimentando a los 60 billones de células de otros tipos del cuerpo.',
      'El corazón bombea aproximadamente 2,000 galones de sangre por día.',
      'El cerebro tiene el aspecto de una nuez gigante y arrugada.',
      'El cerebro y la médula espinal están rodeados y protegidos por el fluido cerebroespinal.',
      'El cerebro es el órgano más grande del cuerpo humano.',
      'El cerebro pesa aproximadamente 3 libras.',
      'El cerebro contiene aproximadamente 100 mil millones de neuronas.',
      'Las lágrimas y la mucosidad contienen una enzima llamada lisozima, que descompone la pared celular de muchas bacterias.',
      'Un adulto ingiere aproximadamente 500 kilogramos de alimento al año.',
      'Cada día se producen 1.5 litros de saliva.',
      'El esófago mide aproximadamente 25 cm.',
      'El estómago tiene el tamaño de una pelota de golf.',
      'Los músculos se contraen en ondas para hacer avanzar los alimentos a lo largo del esófago. Esto significa que llegarían el estómago de una persona incluso aunque estuviera boca abajo.',
      'El estómago de una persona adulta puede contener aproximadamente 1.5 litros de alimento.',
      'El estómago contiene ácido clorhídrico, que ayuda a digerir los alimentos.',
      'El estómago tarda aproximadamente 4 horas en vaciarse.',
      'El intestino delgado mide aproximadamente 6 metros.',
      'Cada día fluyen a través del sistema digestivo 11.5 litros de: alimentos digeridos, agua y jugos digestivos, y sólo se pierden 100 ml. de fluido en las heces.',
      'Tenemos dos juegos de dientes.En la infancia nuestros 20 "dientes de leche" son sustituidos, a partir de los 6-7 años de edad, por los 32 dientes de adulto.',
      'En reposo, el cuerpo de un adulto inhala y exhala unos 6 litros de aire por minuto.',
      'El pulmón derecho es ligeramente más grande que el izquierdo.',
      'Los pelos de la nariz ayudan a limpiar el aire que respiramos, además de calentarlo.',
      'La velocidad más alta registrada para un estornudo es de 165 km/h.',
      'El área de los pulmones tiene aproximadamente el mismo tamaño que una cancha de tenis.',
      'Los capilares de los pulmones medirían 1.600 kilómetros si se colocaran uno detrás del otro.',
      'Perdemos medio litro de agua al día a través de la respiración. Es el vapor de agua que vemos cuando exhalamos aire sobre un cristal.',
      'Una persona en reposo respira normalmente de 12 a 15 veces por minuto.',
      'El ritmo de la respiración es más rápido en los niños y en las mujeres, que en los hombres.',
    ];
    const random = Math.floor(Math.random() * tips.length);
    return tips[random];
  }

  // Función que se ejecuta al entrar a la screen
  ionViewWillEnter() {
    this.getAllData();
    $('#header').hide();
    $('#container').hide();
  }

  // Función para motrar el loader por que la llamada a la API es muy rapida y no alcanza a mostrarse
  loadingScreen() {
    // Aun falta hacer pruebas del tiempo de carga en movil, pero por ahora el loader durara 2 segundos
    this.showSplash = true;
    this.message = 'Cargando datos...';
    this.tip = this.randomTip();
    $('#container').hide();
    $('#header').hide();
    $('#progressBar').hide();

    // Despues de 2 segundos el loader se ocultara
    setTimeout(() => {
      this.showSplash = false;
      $('#container').show();
      $('#header').show();
    }, 2000);
  }

  // Función para obtener todos los registros
  async getAllData() {

    // Se llama a la función del loader
    this.loadingScreen();

    // Se llama a la función que obtiene el último registro
    this.getLatestRegister();

    this.restService.ejecutar_get('API/getAllData', {}).
    subscribe( resultado => {

      if (!resultado.data) {
        // Si no hay registros en la base de datos
        this.restService.mostrar_toast(
          'Error!',
          'danger',
          'Aún no hay lecturas registradas!',
          'bottom',
          1000
        );
      } else {
        // Si hay registros en la base de datos
        this.restService.mostrar_toast(
          'Éxito!',
          'success',
          'Datos cargados correctamente!',
          'top',
          1000
        );
      }
      
      this.registros = resultado.data;
      console.log('Todos los registros: ', resultado);

    }, error => {

      this.restService.mostrar_toast(
        'Falla de conexión!',
        'danger',
        'Error al cargar todos los datos!',
        'top',
        1000
      );

      console.log('Error al cargar todos los datos:', error);
    });
  }

  // Función para obtener el último registro
  async getLatestRegister() {
    
    this.restService.ejecutar_get('API/getLatestRegister', {}).
    subscribe( resultado => {

      if (!resultado.data) {
        this.restService.mostrar_toast(
          'Error!',
          'danger',
          'Aún no hay lecturas registradas!',
          'bottom',
          1000
        );
      } else {
        this.restService.mostrar_toast(
          'Éxito!',
          'success',
          'Última lectura cargada correctamente!',
          'top',
          1000
        );
      }

      this.ultimoRegistro = resultado.data;
      console.log('Ultimo Registro: ', resultado);
    }, error => {

      this.restService.mostrar_toast(
        'Falla de conexión!',
        'danger',
        'Error al cargar la última lectura!',
        'top',
        1000
      );

      console.log('Error al cargar el último dato registrado:', error);
    });
  }


  async fecha() {

    // La fecha ingresada por el usuario la guardanmos en una variable y eliminamos la hora
    var dateFormat = this.date.split('T')[0]; 

    // El progress bar se mostrara mientras se hace la peticion de datos y se escondera cuando lleguen
    $('#progressBar').show();
    $('registroPorFechaContainer').hide();

    setTimeout(() => {
      $('#progressBar').hide();
      $('registroPorFechaContainer').show();
    }, 2000);

    this.restService.subida_ficheros_y_datos('API/getDataByDate', {date:dateFormat}).
    subscribe( resultado => {

      // Guardamos el mensaje del estatus para verificar si hay datos o no con la fecha ingresada
      this.statusRegistro = resultado.msg;
      this.registroFecha = resultado.data;

      if (!resultado.data) {
        this.restService.mostrar_toast(
          'Error!',
          'danger',
          'No hay lecturas registradas con la fecha seleccionada!',
          'bottom',
          1000
        );
      } else {
        this.restService.mostrar_toast(
          'Éxito!',
          'success',
          'Registros por fecha cargados correctamente!',
          'bottom',
          1000
        );
      }

      console.log('Registros por Fecha: ', resultado);
      
    }, error => {

      this.restService.mostrar_toast(
        'Falla de conexión!',
        'danger',
        'Error al cargar registros por fecha!',
        'bottom',
        1000
      );

      console.log('Error al cargar registros por la fecha seleccionada:', error);
    });

  }

  // Función para mostrar el promedio de los datos en el accordion
  accordionPromedios() {
    $('#flechaAccordion1').toggleClass('rotate');

    // Variables donde guardaremos los datos de los registros
    let numTemp = 0;
    let numOxy = 0;
    let numBpm = 0;

    let promTemp = 0;
    let promOxy = 0;
    let promBpm = 0;

    for(let i = 0; i < this.registroFecha.length; i++) {

      // Sumamos los datos de los registros
      let Temp = this.registroFecha[i].temperature;
      numTemp += parseInt(Temp, 10);
      let Oxy = this.registroFecha[i].oxygen;
      numOxy += parseInt(Oxy, 10);
      let Bpm = this.registroFecha[i].heart_rate;
      numBpm += parseInt(Bpm, 10);

      // Guardamos los datos sumados en una variable local
      promTemp = numTemp;
      promOxy = numOxy;
      promBpm = numBpm;

    }

    // Dividimos los datos sumados entre la cantidad de registros
    let numDatos = this.registroFecha.length;

    promTemp /= numDatos;
    promOxy /= numDatos;
    promBpm /= numDatos;

    // Convertimos los datos a decimales y los cortamos a al segundo decimal
    let promTempFixed = parseFloat(promTemp.toFixed(2));
    let promOxyFixed = parseFloat(promOxy.toFixed(2));
    let promBpmFixed = parseFloat(promBpm.toFixed(2));

    // Asignamos los datos a las variables globales
    this.promedios.promedioTemp = promTempFixed;
    this.promedios.promedioOxy = promOxyFixed;
    this.promedios.promedioBpm = promBpmFixed;
    
    console.log(this.promedios);
    
  }

  accordionAllData() {
    $('#flechaAccordion2').toggleClass('rotate');    
  }

  // Funciones para mostrar informacion cuando el usuario toque los iconos

  // Iconos de las secciones

  infoUltimoRegistro() {
    Swal.fire({
      title: 'Último Registro',
      text: 'Esta es la última lectura hecha por el usuario. No olvides hacer por lo menos un análisis diario para poder tomar precauciones.',
      icon: 'info',
      confirmButtonColor: '#2dd36f',
      heightAuto: false
    });
  }
  
  infoBuscarPorRegistro() {
    Swal.fire({
      title: 'Buscar Registro',
      text: 'Aquí puedes buscar lecturas por la fecha seleccionada. Se mostraran todos los registros hechos ese mismo día y un promedio de los datos.',
      icon: 'info',
      confirmButtonColor: '#2dd36f',
      heightAuto: false
    });
  }

  // Iconos del Header

  help() {
    Swal.fire({
      title: 'Información',
      text: `
        En esta sección se muestra la última lectura registrada, 
        puedes buscar registros por fecha, promedios de las lecturas 
        y finalmente todos los registros hechos por el usuario.
      `,
      icon: 'info',
      confirmButtonColor: '#2dd36f',
      heightAuto: false
    });
  }

  screenShoot() {
    Swal.fire({
      title: 'Screenshot',
      text: `
        Boton para tomar ss, favor de buscar
        una libreria que lo haga  :).
      `,
      icon: 'info',
      confirmButtonColor: '#2dd36f',
      heightAuto: false
    });
  }
  

}
