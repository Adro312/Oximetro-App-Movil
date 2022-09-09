import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { LoadingController } from '@ionic/angular';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
// import { $ } from 'protractor';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  resultados = [];

  constructor(
    private restService: RestService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {}

  finalizar() {
    $('#BotonComenzar').show();
    $('#MuestraResultados').hide();
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async comenzar() {
    const loading = await this.loadingCtrl.create({
      message: 'Analizando...',
    });
    await loading.present();

    $('#BotonComenzar').attr('disabled', true);

    this.restService.ejecutar_get('API/changeStatus', {}).subscribe(
      async (resultado) => {
        if (resultado.status === 'OK') {
          console.log('Esperando');
          await this.delay(10000);
          console.log('Listo');
          this.restService.ejecutar_get('API/getRegister', {}).subscribe(
            (resultadolastId) => {
              this.resultados = resultadolastId;
              loading.dismiss();
              this.restService.mostrar_toast(
                'Analisis completo!!',
                'success',
                'El analisis fue completado con exito',
                'top',
                4000
              );
              $('#BotonComenzar').attr('disabled', false);
              $('#MuestraResultados').show();
              $('#BotonComenzar').hide();
            },
            (error) => {
              loading.dismiss();
              console.log(error);
              this.restService.mostrar_toast(
                'Error',
                'danger',
                'No se encontro el ultimo registro',
                'top',
                4000
              );
            }
          );
        } else {
          $('#BotonComenzar').attr('disabled', false);
          loading.dismiss();
          this.restService.mostrar_toast(
            'Error',
            'danger',
            'No se pudo cambiar el estado',
            'top',
            4000
          );
        }
      },
      (error) => {
        loading.dismiss();
        console.log(error);
        this.restService.mostrar_toast(
          'Error',
          'danger',
          'API Conexion fallida',
          'top',
          4000
        );
      }
    );
  }
}
