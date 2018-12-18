import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { PerdoruesService } from '../_serviset/perdorues.service';
import { AlertifyService } from '../_serviset/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Mesazh } from '../_modelet/mesazh';
import { AuthService } from '../_serviset/auth.service';

@Injectable()
export class MesazhetResolver implements Resolve<Mesazh[]> {
  faqjaNr = 1;
  madhesiaFaqes = 5;
  mesazhKonteriner = 'Palexuar';

  constructor(
    private perdoruesService: PerdoruesService,
    private ruteri: Router,
    private authServisi: AuthService,
    private alertifaj: AlertifyService
  ) {}

  resolve(ruti: ActivatedRouteSnapshot): Observable<Mesazh[]> {
    // console.log(this.authServisi.tokenIDekoduar.nameid);
    // console.log(this.faqjaNr);
    // console.log(this.madhesiaFaqes);
    // console.log(this.mesazhKonteriner);
    return this.perdoruesService.merriMesazhet(
        this.authServisi.tokenIDekoduar.nameid,
        this.faqjaNr,
        this.madhesiaFaqes,
        this.mesazhKonteriner
        ).pipe(
      catchError(error => {
        this.alertifaj.gabim('Problem gjate leximit te mesazheve');
        this.alertifaj.gabim(error);
        this.ruteri.navigate(['/ballina']);
        return of(null);
      })
    );
  }
}
