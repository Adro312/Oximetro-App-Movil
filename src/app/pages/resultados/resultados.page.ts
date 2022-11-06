import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { LoadingController } from '@ionic/angular';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.page.html',
  styleUrls: ['./resultados.page.scss'],
})
export class ResultadosPage implements OnInit {

  resultados = [];
  temp: number = 0;

  showSplash = false;
  message = '';
  tip = '';

  constructor(
    private restService: RestService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.cargarDatos();
    $('#iconHappy').hide();
    $('#iconSad').hide();
  }

  async cargarDatos() {

    this.restService.ejecutar_get('API/getLatestRegister', {}).
    subscribe( resultado => {

      this.restService.mostrar_toast(
        'Éxito!',
        'success',
        'Se ha terminado de escanear!',
        'top',
        1000
      );

      this.resultados = resultado.data;

      let temp = parseInt(resultado.data.temperature);
      
      this.temp = temp;

      if (temp > 37) {
        $('#iconSad').show();
        $('#iconHappy').hide();
      } else {
        $('#iconSad').hide();
        $('#iconHappy').show();
      }

      console.log(resultado);
    }, error => {
      
      this.restService.mostrar_toast(
        'Falla de conexión!',
        'danger',
        'Error en el servidor!',
        'top',
        1000
      );

      console.log(error);
    });
  }

  sad() {
    Swal.fire({
      title: 'Precaución',
      text: `
        Favor de acudir con un medico.
        Tu temperatura esta por encima del promedio.
        Te recomendamos tomar agua y descansar.
        Si te duele la cabeza puedes tomar un paracetamol de 500mg o una aspirina.
      `,
      icon: 'info',
      confirmButtonColor: '#2dd36f',
      heightAuto: false
    });
  }

  happy() {
    Swal.fire({
      title: 'Todo bien',
      text: `
        Tus datos se encuentran dentro del rango normal.
        Te recomendamos seguir cuidandote.
        No olvides tomar agua y descansar.
      `,
      icon: 'info',
      confirmButtonColor: '#2dd36f',
      heightAuto: false
    });
  }

  infoSp02() {
    Swal.fire({
      title: 'Saturación de Óxigeno en la Sangre',
      text: 'Una lectura normal usualmente se encuentra entre 95 por ciento y 100 por ciento.',
      icon: 'info',
      confirmButtonColor: '#2dd36f',
      heightAuto: false
    });
  }

  infoBPM() {
    Swal.fire({
      title: 'Ritmo Cardiaco',
      text: 'El ritmo normal en reposo es de 60 a 100 pulsaciones por minuto.',
      icon: 'info',
      confirmButtonColor: '#2dd36f',
      heightAuto: false
    });
  }

  infoTemp() {
    Swal.fire({
      title: 'Temperatura',
      text: 'La temperatura corporal normal promedio aceptada es generalmente de 98.6°F (37°C).',
      icon: 'info',
      confirmButtonColor: '#2dd36f',
      heightAuto: false
    });
  }

  terminar() {

    this.restService.ejecutar_get('API/changeStatusDataSendTo0', {}).
    subscribe( resultado => {

      console.log(resultado);

      this.restService.ejecutar_get('API/changeStatusOxiDesconect', {}).
      subscribe( resultado => {

        console.log(resultado);


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

    this.router.navigate(['tabs/home']);
  }

  help() {
    Swal.fire({
      title: 'Información',
      text: `
        En esta sección se muestran los 
        datos obtenidos de los sensores.
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
