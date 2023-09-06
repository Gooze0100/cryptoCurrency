import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultComponent } from './default/default.component';
import { PageNotFoundComponent } from './default/page-not-found/page-not-found.component';
import { InputComponent } from './menu/input/input.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CanvasJSAngularStockChartsModule } from '@canvasjs/angular-stockcharts/lib/angular-stockcharts.module';
import { ChartComponent } from './main/chart/chart.component';

@NgModule({
  declarations: [
    AppComponent,
    DefaultComponent,
    PageNotFoundComponent,
    InputComponent,
    ChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CanvasJSAngularStockChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
