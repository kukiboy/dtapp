import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule, TabsModule, BsDatepickerModule, PaginationModule, ButtonsModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxGalleryModule } from 'ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';
import { TimeAgoPipe } from 'time-ago-pipe';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_serviset/auth.service';
import { BallinaComponent } from './ballina/ballina.component';
import { RegjistrohuComponent } from './regjistrohu/regjistrohu.component';
import { ErrorInterceptorProvider } from './_serviset/error.interceptor';
import { AlertifyService } from './_serviset/alertify.service';
import { AuthGuard } from './_rojet/auth.guard';
import { ListaAntareveComponent } from './antaret/lista-antareve/lista-antareve.component';
import { MesazhetComponent } from './mesazhet/mesazhet.component';
import { ListatComponent } from './listat/listat.component';
import { appRutet } from './routes';
import { PerdoruesService } from './_serviset/perdorues.service';
import { KartelaAntaritComponent } from './antaret/kartela-antarit/kartela-antarit.component';
import { DetajetAntaritComponent } from './antaret/detajet-antarit/detajet-antarit.component';
import { DetajetAntaritResolver } from './_zgjedhesit/detajet-antarit.resolver';
import { ListaAntareveResolver } from './_zgjedhesit/lista-antareve.resolver';
import { RedaktoAntarinComponent } from './antaret/redakto-antarin/redakto-antarin.component';
import { RedaktoAntarResolver } from './_zgjedhesit/redakto-antar.resolver';
import { ParandaloHumbjeShenimesh } from './_rojet/parandalo-humbje-ndryshimesh.guard';
import { FotoRedaktorComponent } from './antaret/foto-redaktor/foto-redaktor.component';
import { ListatResolver } from './_zgjedhesit/listat.resolver';

export function tokenFurnitori() {
    return localStorage.getItem('token');
}
@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      BallinaComponent,
      RegjistrohuComponent,
      ListaAntareveComponent,
      MesazhetComponent,
      ListatComponent,
      KartelaAntaritComponent,
      DetajetAntaritComponent,
      RedaktoAntarinComponent,
      FotoRedaktorComponent,
      TimeAgoPipe
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      BsDropdownModule.forRoot(),
      BsDatepickerModule.forRoot(),
      PaginationModule.forRoot(),
      TabsModule.forRoot(),
      ButtonsModule.forRoot(),
      RouterModule.forRoot(appRutet),
      NgxGalleryModule,
      FileUploadModule,
      JwtModule.forRoot({
          config: {
              tokenGetter: tokenFurnitori,
              whitelistedDomains: ['localhost:5000'],
              blacklistedRoutes: ['localhost:5000/api/auth']
          }
      })
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      AlertifyService,
      AuthGuard,
      PerdoruesService,
      DetajetAntaritResolver,
      ListaAntareveResolver,
      RedaktoAntarResolver,
      ParandaloHumbjeShenimesh,
      ListatResolver
   ],
  bootstrap: [AppComponent]
})
export class AppModule {}
