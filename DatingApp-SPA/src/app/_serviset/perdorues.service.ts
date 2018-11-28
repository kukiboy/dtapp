import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Perdorues } from '../_modelet/perdorues';

// eshte komentuar per shkak se tani nuk ka nevoj pas implementimit
// te tokenFurnitori dhe JwtModule tek app.module.ts
// const httpOpcionet = {
//   headers: new HttpHeaders({
//     'Authorization': 'Bearer ' + localStorage.getItem('token')
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class PerdoruesService {
  bazeUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPerdoruesit(): Observable<Perdorues[]> {
    return this.http.get<Perdorues[]>(this.bazeUrl + 'perdoruesit'); // , httpOpcionet);
  }

  getPerdoruesin(id): Observable<Perdorues> {
    return this.http.get<Perdorues>(this.bazeUrl + 'perdoruesit/' + id); // , httpOpcionet);
  }

  perditesoPerdorues(id: number, perdorues: Perdorues) {
    return this.http.put(this.bazeUrl + 'perdoruesit/' + id, perdorues);
  }

  cktFotoKryesor(perdoruesId: number, id: number) {
    return this.http.post(this.bazeUrl + 'perdoruesit/' + perdoruesId + '/fotot/' + id + '/cktKry', {});
  }

  fshijFoto(perdoruesId: number, id: number) {
    return this.http.delete(this.bazeUrl + 'perdoruesit/' + perdoruesId + '/fotot/' + id);
  }
}
