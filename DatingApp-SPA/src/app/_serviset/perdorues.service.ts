import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Perdorues } from '../_modelet/perdorues';
import { RezultatiFaqosur } from '../_modelet/faqosja';
import { map } from 'rxjs/operators';
import { Mesazh } from '../_modelet/mesazh';

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

  getPerdoruesit(faqja?, artikujPerFaqe?, perdoruesParametrat?, pelqimetParameter?): Observable<RezultatiFaqosur<Perdorues[]>> {
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

    if (pelqimetParameter === 'Pelqyesit') {
      params = params.append('pelqyesit', 'true');
    }

    if (pelqimetParameter === 'Pelqyerit') {
      params = params.append('pelqyerit', 'true');
    }

    return this.http.get<Perdorues[]>(this.bazeUrl + 'perdoruesit', { observe: 'response', params})
    .pipe(
      map(response => {
      rezultatiFaqosur.rezultati = response.body;
      if (response.headers.get('Pagination') != null) {
        rezultatiFaqosur.faqosja = JSON.parse(response.headers.get('Pagination'));
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

  dergoPelqim(id: number, marresId: number) {
    return this.http.post(this.bazeUrl + 'perdoruesit/' + id + '/pelqe/' + marresId, {});
  }

  merriMesazhet(id: number, faqja?, artikujPerFaqe?, mesazhKonteiner?) {
    const rezultatiFaqosur: RezultatiFaqosur<Mesazh[]> = new RezultatiFaqosur<Mesazh[]>();

    let params = new HttpParams();

    params = params.append('MesazhKonteiner', mesazhKonteiner);

    if (faqja != null && artikujPerFaqe != null) {
      params = params.append('faqjaNr', faqja);
      params = params.append('madhesiaFaqes', artikujPerFaqe);
    }

    return this.http.get<Mesazh[]>(this.bazeUrl + 'perdoruesit/' + id + '/mesazhet', {observe: 'response', params})
      .pipe(
        map(response => {
        rezultatiFaqosur.rezultati = response.body;
        if (response.headers.get('Pagination') !== null) {
          rezultatiFaqosur.faqosja = JSON.parse(response.headers.get('Pagination'));
        }

        return rezultatiFaqosur;
        })
      );
  }

  merrMesazhSekuence(id: number, marresId: number) {
    return this.http.get<Mesazh[]>(this.bazeUrl + 'perdoruesit/' + id + '/mesazhet/sekuence/' + marresId);
  }

  dergoMesazh(id: number, mesazh: Mesazh) {
    return this.http.post(this.bazeUrl + 'perdoruesit/' + id + '/mesazhet', mesazh);
  }

  fshijMesazh(id: number, perdoruesId: number) {
   return this.http.post(this.bazeUrl + 'perdoruesit/' + perdoruesId + '/mesazhet/' + id, {});
  }

  markoSiTeLexuar(perdoruesId: number, mesazhId: number) {
    this.http.post(this.bazeUrl + 'perdoruesit/' + perdoruesId + '/mesazhet/' + mesazhId + '/lexuar', {})
    .subscribe();
  }
}
