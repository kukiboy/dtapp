import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { Perdorues } from '../_modelet/perdorues';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  jwtHelpper = new JwtHelperService();
  tokenIDekoduar: any;
  perdoruesiAktual: Perdorues;
  fotoUrl =  new BehaviorSubject<string>('../../assets/perdorues.png');
  aktualFotoUrl = this.fotoUrl.asObservable();

constructor(private http: HttpClient) { }

  ndryshoFotoAntarit(fotoUrl: string) {
  this.fotoUrl.next(fotoUrl);
}

kyqu(model: any) {
  return this.http.post(this.baseUrl + 'kyqu', model).pipe(
    map((response: any) => {
      const perdoruesi = response;
      if (perdoruesi) {
        localStorage.setItem('token', perdoruesi.token);
        localStorage.setItem('perdoruesi', JSON.stringify(perdoruesi.perdoruesi));
        this.tokenIDekoduar = this.jwtHelpper.decodeToken(perdoruesi.token);
        this.perdoruesiAktual = perdoruesi.perdoruesi;
        this.ndryshoFotoAntarit(this.perdoruesiAktual.fotoUrl);
      }
    })
  );
}

regjistro(perdoruesi: Perdorues) {
  return this.http.post(this.baseUrl + 'Regjistro', perdoruesi);
}

iKyqur() {
  const token = localStorage.getItem('token');
  return !this.jwtHelpper.isTokenExpired(token);
}

}
