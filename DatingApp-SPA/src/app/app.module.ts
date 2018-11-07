import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_serviset/auth.service';
import { BallinaComponent } from './ballina/ballina.component';
import { RegjistrohuComponent } from './regjistrohu/regjistrohu.component';
import { ErrorInterceptorProvider } from './_serviset/error.interceptor';
import { AlertifyService } from './_serviset/alertify.service';
import { AuthGuard } from './_rojet/auth.guard';
import { ListaAntareveComponent } from './lista-antareve/lista-antareve.component';
import { MesazhetComponent } from './mesazhet/mesazhet.component';
import { ListatComponent } from './listat/listat.component';
import { appRutet } from './routes';



@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      BallinaComponent,
      RegjistrohuComponent,
      ListaAntareveComponent,
      MesazhetComponent,
      ListatComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      BsDropdownModule.forRoot(),
      RouterModule.forRoot(appRutet)
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      AlertifyService,
      AuthGuard
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
