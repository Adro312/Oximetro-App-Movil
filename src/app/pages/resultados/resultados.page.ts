import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { LoadingController } from '@ionic/angular';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.page.html',
  styleUrls: ['./resultados.page.scss'],
})
export class ResultadosPage implements OnInit {

  resultados = [];

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
  }

  async cargarDatos() {
    // const loading = await this.loadingCtrl.create({
    //   message: 'Cargando...',
    // });
    // await loading.present();

    this.showSplash = true;
    this.message = 'Cargando Datos...';
    this.tip = 'Sabias que la velocidad más alta registrada para un estornudo es de 165 km/h ?';

    this.restService.ejecutar_get('API/getAllData', {}).
    subscribe( resultado => {
      this.resultados = resultado;
      // loading.dismiss();

      this.showSplash = false;

      console.log(resultado);
    }, error => {
      // loading.dismiss();

      this.showSplash = false;

      console.log(error);
    });
  }

}
