import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  jwtHelpper = new JwtHelperService();
  tokenIDekoduar: any;

constructor(private http: HttpClient) { }

kyqu(model: any) {
  return this.http.post(this.baseUrl + 'kyqu', model)
  .pipe(
    map((response: any) => {
      const perdorues = response;
      if (perdorues) {
        localStorage.setItem('token', perdorues.token);
        this.tokenIDekoduar = this.jwtHelpper.decodeToken(perdorues.token);
        console.log(this.tokenIDekoduar);
      }
    })
  );
}

regjistro(model: any) {
  return this.http.post(this.baseUrl + 'Regjistro', model);
}

iKyqur() {
  const token = localStorage.getItem('token');
  return !this.jwtHelpper.isTokenExpired(token);
}

}
