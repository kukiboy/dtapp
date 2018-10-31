import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_serviset/auth.service';
import { BallinaComponent } from './ballina/ballina.component';
import { RegjistrohuComponent } from './regjistrohu/regjistrohu.component';

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
      FormsModule
   ],
   providers: [
      AuthService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
