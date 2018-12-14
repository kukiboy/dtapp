import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Perdorues } from '../_modelet/perdorues';
import { RezultatiFaqosur } from '../_modelet/faqosja';
import { map } from 'rxjs/operators';

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

  constructor(private http: HttpClient) {}

  getPerdoruesit(faqja?, artikujPerFaqe?, perdoruesParametrat?): Observable<RezultatiFaqosur<Perdorues[]>> {
    const rezultatiFaqosur: RezultatiFaqosur<Perdorues[]> = new RezultatiFaqosur<Perdorues[]>();

    let params = new HttpParams();

    if (faqja != null && artikujPerFaqe != null) {
      params = params.append('faqjaNr', faqja);
      params = params.append('madhesiaFaqes', artikujPerFaqe);
    }

    if (perdoruesParametrat != null) {
      params = params.append('minMosha', perdoruesParametrat.minMosha);
      params = params.append('maksMosha', perdoruesParametrat.maksMosha);
      params = params.append('gjinia', perdoruesParametrat.gjinia);
      params = params.append('radhitSipas', perdoruesParametrat.radhitSipas);
    }

    return this.http.get<Perdorues[]>(this.bazeUrl + 'perdoruesit', { observe: 'response', params})
    .pipe(
      map(response => {
      rezultatiFaqosur.rezultati = response.body;
      if (response.headers.get('Pagination') != null) {
        rezultatiFaqosur.faqosja = JSON.parse(response.headers.get('Pagination'));
        // console.log(rezultatiFaqosur);
      }
      return rezultatiFaqosur;
      })
    ); // , httpOpcionet);
  }

  getPerdoruesin(id): Observable<Perdorues> {
    return this.http.get<Perdorues>(this.bazeUrl + 'perdoruesit/' + id); // , httpOpcionet);
  }

  perditesoPerdorues(id: number, perdorues: Perdorues) {
    return this.http.put(this.bazeUrl + 'perdoruesit/' + id, perdorues);
  }

  cktFotoKryesor(perdoruesId: number, id: number) {
    return this.http.post(
      this.bazeUrl + 'perdoruesit/' + perdoruesId + '/fotot/' + id + '/cktKry', {});
  }

  fshijFoto(perdoruesId: number, id: number) {
    return this.http.delete(
      this.bazeUrl + 'perdoruesit/' + perdoruesId + '/fotot/' + id
    );
  }
}
