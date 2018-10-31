import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:5000/api/auth/';

constructor(private http: HttpClient) { }

kyqu(model: any){
  return this.http.post(this.baseUrl + 'kyqu', model)
  .pipe(
    map((response: any) => {
      const perdorues = response;
      if (perdorues) {
        localStorage.setItem('token', perdorues.token);
      }
    })
  );
}

regjistro(model: any) {
  return this.http.post(this.baseUrl + 'Regjistro', model);
}

}
