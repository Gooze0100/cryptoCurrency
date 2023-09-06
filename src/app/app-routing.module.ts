import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './default/default.component';
import { PageNotFoundComponent } from './default/page-not-found/page-not-found.component';
import { ChartComponent } from './main/chart/chart.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: 'chart/:currency',
        component: ChartComponent,
      },
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
