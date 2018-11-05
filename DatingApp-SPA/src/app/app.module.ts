import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_serviset/auth.service';
import { BallinaComponent } from './ballina/ballina.component';
import { RegjistrohuComponent } from './regjistrohu/regjistrohu.component';
import { ErrorInterceptorProvider } from './_serviset/error.interceptor';



@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      BallinaComponent,
      RegjistrohuComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
       BsDropdownModule.forRoot()
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider
   ],
   bootstrap: [AppComponent]
})
export class AppModule { }
