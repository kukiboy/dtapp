import { Injectable } from '@angular/core';
import { Perdorues } from '../_modelet/perdorues';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { PerdoruesService } from '../_serviset/perdorues.service';
import { AlertifyService } from '../_serviset/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_serviset/auth.service';

@Injectable()
export class RedaktoAntarResolver implements Resolve<Perdorues> {
    constructor(private perdoruesService: PerdoruesService,
        private ruteri: Router,
        private alertifaj: AlertifyService,
        private authServisi: AuthService) {}

    resolve(ruti: ActivatedRouteSnapshot): Observable<Perdorues> {
        return this.perdoruesService.getPerdoruesin(this.authServisi.tokenIDekoduar.nameid).pipe(
            catchError(error => {
                this.alertifaj.gabim('Problem gjate leximit te te dhenave');
                this.ruteri.navigate(['/antaret']);
                return of(null);
            })
        );
    }
}
