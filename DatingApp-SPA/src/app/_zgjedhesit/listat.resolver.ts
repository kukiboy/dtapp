import { Injectable } from '@angular/core';
import { Perdorues } from '../_modelet/perdorues';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { PerdoruesService } from '../_serviset/perdorues.service';
import { AlertifyService } from '../_serviset/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ListatResolver implements Resolve<Perdorues[]> {
  faqjaNr = 1;
  madhesiaFaqes = 5;
  pelqimetParameter = 'Pelqyesit';

  constructor(
    private perdoruesService: PerdoruesService,
    private ruteri: Router,
    private alertifaj: AlertifyService
  ) {}

  resolve(ruti: ActivatedRouteSnapshot): Observable<Perdorues[]> {
    return this.perdoruesService
      .getPerdoruesit(this.faqjaNr, this.madhesiaFaqes, null, this.pelqimetParameter)
      .pipe(
        catchError(error => {
          this.alertifaj.gabim('Problem gjate leximit te te dhenave');
          this.ruteri.navigate(['/ballina']);
          return of(null);
        })
      );
  }
}
