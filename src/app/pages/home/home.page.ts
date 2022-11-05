import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  resultados = [];

  //Parametros del loading
  showSplash = false;
  message = '';
  tip = '';

  fechaRegistro: string;
  horaRegistro: string;

  latestTwoRegisters = [];
  
  // Creamos array con los meses del año
  meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  // Creamos array con los días de la semana
  dias_semana = ['Domingo', 'Lunes', 'martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  //Mensaje para el estado de los sensores
  stateSensors = '';

  constructor(
    private restService: RestService,
    private router: Router,
  ) {
    this.statusSensor();
    this.getLatestTwoRegister();
  }

  ngOnInit() {
    this.statusSensor();
    this.getLatestTwoRegister();
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

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

  // Funcion para motrar el loader por que la llamada a la API es muy rapida y no alcanza a mostrarse
  loadingScreen() {
    // Aun falta hacer pruebas del tiempo de carga en movil, pero por ahora el loader durara 2 segundos
    this.showSplash = true;
    this.message = 'Cargando datos...';
    this.tip = this.randomTip();
    $('#container').hide();
  }

  // Funciones que se ejecutaran al entrar a la screen
  ionViewWillEnter() {
    this.statusSensor();
    this.getLatestTwoRegister();
  }

  // Aquí se obtiene el status del Oximetro, si es 0 no te dejará darle click al boton de play
  statusSensor() {
      this.restService.ejecutar_get('API/getStatusOxi', {}).
      subscribe( resultado => {
  
        console.log('Status de la conexion a internet: ', resultado);
        
        if (resultado.oxi_internet_status == 0) {
          this.restService.mostrar_toast(
            'Fallo de conexión!',
            'danger',
            'El oxímetro no esta conectado a internet!',
            'top',
            1000
          );

          // Escondemos el boton de play y mostramos el boton y el mensaje de error
          $('#buttonPlay').hide();
          $('#buttonError').show();
          this.stateSensors = 'Revisar Conexión del Sensor!';

        } else {
          this.restService.mostrar_toast(
            'Éxito!',
            'success',
            'El oxímetro esta conectado!',
            'top',
            1000
          );

          // Escondemos el boton de error y mostramos el boton y mensaje de listo
          $('#buttonPlay').show();
          $('#buttonError').hide();
          this.stateSensors = 'Sensor Listo!';
        }
  
      }, error => {
  
        this.restService.mostrar_toast(
          'Falla de conexión!',
          'danger',
          'Error en el servidor!',
          'top',
          1000
        );
  
        console.log('Error en el servidor:', error);
      });
  }

  // Función para empezar a recibir los datos del oximetro, no se por que tantos get y change status, help!!
  comenzar() {
    let band = true;

    this.loadingScreen();

    this.restService.ejecutar_get('API/changeStatusApp', {}).
    subscribe( async resultado => {
      console.log(resultado);
    }, error => {
      this.showSplash = false;
      $('#container').show();
      this.restService.mostrar_toast(
        'Falla de conexión!',
        'danger',
        'Error en el servidor!',
        'top',
        1000
      );
      console.log('Error en el servidor:', error);
    });

    let dataSend = () => {
      this.restService.ejecutar_get('API/getStatusDataSend', {}).
      subscribe( async resultado2 => {
        console.log("Status: " + resultado2);
        if (resultado2 == 1){
          this.showSplash = false;
          $('#container').show();
          this.router.navigate(['resultados']);
        } else {
          await this.delay(5000);
          dataSend();
        }
      }, error => {
        this.restService.mostrar_toast(
          'Falla de conexión!',
          'danger',
          'Error en el servidor!',
          'top',
          1000
        );
        console.log('Error en el servidor:', error);
      });
    }

    dataSend();
  }

  // Función por si el usuario le da click al boton de error, se le mostrara una alerta con las opciones de reintentar la conexion o cancelar
  error() {
    Swal.fire({
      title: 'Precaución',
      text: 'Verifique la conexión a internet del sensor y vuelva a intentarlo.',
      icon: 'warning',
      confirmButtonColor: '#00acc8',
      confirmButtonText: 'Reintentar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#bdbbbc',
      heightAuto: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.statusSensor();
      }
    });
  }

  // Función para mostrar los dos ultimos registros de la base de datos
  async getLatestTwoRegister() {
    
    this.restService.ejecutar_get('API/getLatestTwoRegister', {}).
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
        
        // // Si hay registros en la base de datos
        // this.restService.mostrar_toast(
        //   'Éxito!',
        //   'success',
        //   'Últimas dos lecturas cargadas correctamente!',
        //   'top',
        //   1000
        // );
      
        // Guardamos los datos en una variable global
        this.latestTwoRegisters = resultado.data;
        
        // Hacemos un for dependiendo del tamaño del arreglo
        for (let i = 0; i < this.latestTwoRegisters.length; i++) {

          // Guardamos la fecha y hora en otras variables globales
          this.fechaRegistro = this.latestTwoRegisters[i].Date;
          this.horaRegistro = this.latestTwoRegisters[i].Hour;

          let fecha = this.fechaRegistro;
          // Convertimos la fecha a un formato que se pueda leer
          let fechaCompleta = new Date(fecha);

          // Separamos por dia, mes y año y sustituimos los valores por su version en español
          let fechaCompletaEsp = this.dias_semana[fechaCompleta.getDay() + 1] + ' ' + (fechaCompleta.getDate() + 1) + ' de ' + this.meses[fechaCompleta.getMonth()] + ' del ' + fechaCompleta.getFullYear();

          // Guardamos la fecha en una variable para saber si es AM o PM
          let horaAMPM = this.horaRegistro;

          if (horaAMPM >= '12:00:00') {
            horaAMPM = horaAMPM + ' PM';
          } else {
            horaAMPM = horaAMPM + ' AM';
          }

          // Guardamos la fecha y hora en la variable global junto con los registros de la base de datos
          this.latestTwoRegisters[i] = {
            fecha: fechaCompletaEsp,
            hora: horaAMPM,
            datos: resultado.data[i]
          }

        }
      }

      console.log('Ultimos dos registros: ', resultado.data);
    }, error => {
      console.log('Error en el servidor: ', error);
    });
  }
}
