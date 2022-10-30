import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import * as $ from 'jquery';

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


  constructor() { }

  ngOnInit() {
    
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

  ionViewWillEnter() {
    // Aqui se mostrara el loader y se ocultara provisionalmente hasta que se haga la peticion a la base de datos
    this.showSplash = true;
    this.message = 'Cargando datos...';
    this.tip = this.randomTip();
    $('#container').hide();
    $('#header').hide();
    $('#progressBar').hide();

    // Despues de 3 segundos el loader se ocultara
    setTimeout(() => {
      this.showSplash = false;
      $('#container').show();
      $('#header').show();
    }, 1000);
    
  }

  hola() {
    console.log('Fecha 1:', this.date );

    var dateFormat = this.date.split('T')[0]; 
    console.log('Fecha 2:', dateFormat);

    // El progress bar se mostrara mientras se hace la peticion de datos y se escondera cuando lleguen
    $('#progressBar').show();

    setTimeout(() => {
      $('#progressBar').hide();
    }, 3000);

  }

  accordion() {
    // $('#abajo').hide();
    // $('#arriba').show();
    $('#flechaAccordion').toggleClass('rotate');
    console.log('gira');
    
  }
  

  

}
