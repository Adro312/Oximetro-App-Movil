import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'graficas',
        loadChildren: () =>
          import('../../pages/graficas/graficas.module').then(
            (m) => m.GraficasPageModule
          ),
      },
      {
        path: 'configuracion',
        loadChildren: () =>
          import('../../pages/configuracion/configuracion.module').then(
            (m) => m.ConfiguracionPageModule
          ),
      },
      {
        path: 'home',
        loadChildren: () =>
          import('../../pages/home/home.module').then((m) => m.HomePageModule),
      },
    ],
  },
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
