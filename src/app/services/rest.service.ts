import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  url_api = 'http://localhost/Oximetro-API/';
  // url_api = 'http://192.168.1.111/Oximetro-API/';
  private httpClientFiles: HttpClient;

  constructor(
    private platform: Platform,
    private http: HttpClient,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private handler: HttpBackend
  ) {
    this.platform.ready().then(() => {
      this.httpClientFiles = new HttpClient(this.handler);
    });
  }

  ejecutar_post(_url: string, _datos: any) {
    return this.http.post<any>(this.url_api + _url, _datos);
  }
  ejecutar_put(_url: string, _datos: any) {
    return this.http.put<any>(this.url_api + _url, _datos);
  }
  ejecutar_get(_url: string, _params: any) {
    return this.http.get<any>(this.url_api + _url, { params: _params });
  }
  ejecutar_delete(_url: string, _params: any) {
    return this.http.delete<any>(this.url_api + _url, { params: _params });
  }
  subida_ficheros_y_datos(_url: string, _datos: any): Observable<any> {
    let encabezados = {};
    return this.httpClientFiles.post<any>(
      this.url_api + _url,
      _datos,
      encabezados
    );
  }

  //mensajes con toast
  async mostrar_toast(_titulo, _color, _mensaje, _posicion, _duracion) {
    const toast = await this.toastController.create({
      header: _titulo,
      message: _mensaje,
      position: _posicion,
      color: _color,
      duration: _duracion,
      buttons: [
        {
          icon: 'close-circle',
          role: 'cancel',
        },
      ],
    });
    toast.present();
  }
}
