import { AfterViewInit, Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { timer } from 'rxjs';
import { RestService } from './services/rest.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  showSplash = true;
  isLogo = true;
  constructor(
    private platform: Platform,
    private restService: RestService,
  ) {
    this.initializeApp();
  }

  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  initializeApp(): void {
    void this.platform.ready().then(() => {
      timer(3000).subscribe(() => (this.showSplash = false, this.isLogo = false));

      this.restService.ejecutar_get('API/changeStatusOxiDesconect', {}).subscribe(
        async (resultado) => {
          console.log(resultado.msg);
        },
        async (error) => {
          console.log("API NO CONCCETION");
        }
      );
    });
  }
}
