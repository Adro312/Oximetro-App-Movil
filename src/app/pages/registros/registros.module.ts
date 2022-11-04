import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { RegistrosPageRoutingModule } from './registros-routing.module';

import { RegistrosPage } from './registros.page';
import { LoaderModule } from 'src/app/components/loader/loader.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrosPageRoutingModule,
    LoaderModule
  ],
  declarations: [RegistrosPage]
})
export class RegistrosPageModule {}
