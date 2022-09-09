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
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
    });
    await loading.present();

    this.restService.ejecutar_get('API/getAllData', {}).
    subscribe( resultado => {
      this.resultados = resultado;
      loading.dismiss();
      console.log(resultado);
    }, error => {
      loading.dismiss();
      console.log(error);
    });
  }

}
