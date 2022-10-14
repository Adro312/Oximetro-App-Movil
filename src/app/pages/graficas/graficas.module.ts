import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GraficasPageRoutingModule } from './graficas-routing.module';

import { GraficasPage } from './graficas.page';

import { LoaderModule } from 'src/app/components/loader/loader.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GraficasPageRoutingModule,
    LoaderModule
  ],
  declarations: [GraficasPage]
})
export class GraficasPageModule {}
