import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import localeEsMX from '@angular/common/locales/es-MX';
import { registerLocaleData } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';


registerLocaleData(localeEsMX, 'es-MX');

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // DashboardModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [{provide: LOCALE_ID, useValue: 'es-MX'} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
