import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {AuthGuardService} from './services/auth-guard.service';
import {RestService} from './services/rest.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ServiceInterceptor } from './services/interceptors/service.interceptor';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';

import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServiceInterceptor,
      multi: true
    },
    BarcodeScanner,
    Geolocation
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

