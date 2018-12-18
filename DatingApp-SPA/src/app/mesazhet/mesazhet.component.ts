import { Component, OnInit } from '@angular/core';
import { Mesazh } from '../_modelet/mesazh';
import { Faqosja, RezultatiFaqosur } from '../_modelet/faqosja';
import { PerdoruesService } from '../_serviset/perdorues.service';
import { AuthService } from '../_serviset/auth.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../_serviset/alertify.service';

@Component({
  selector: 'app-mesazhet',
  templateUrl: './mesazhet.component.html',
  styleUrls: ['./mesazhet.component.css']
})
export class MesazhetComponent implements OnInit {
  mesazhet: Mesazh[];
  faqosja: Faqosja;
  mesazhKonteiner = 'Palexuar';

  constructor(
      private perdoruesServisi: PerdoruesService,
      private authServisi: AuthService,
      private ruti: ActivatedRoute,
      private allertifaj: AlertifyService
      ) { }

  ngOnInit() {
    this.ruti.data.subscribe(data => {
      this.mesazhet = data['mesazhet'].rezultati;
      this.faqosja = data['mesazhet'].faqosja;
    });
  }

  ngarkoMesazhet() {
    this.perdoruesServisi.merriMesazhet(
        this.authServisi.tokenIDekoduar.nameid,
        this.faqosja.faqjaAktuale,
        this.faqosja.artikujPerFaqe,
        this.mesazhKonteiner).subscribe((res: RezultatiFaqosur<Mesazh[]>) => {
          this.mesazhet = res.rezultati;
          this.faqosja = res.faqosja;
        }, error => {
          this.allertifaj.gabim(error);
        });
  }

  fshijMesazh(id: number) {
    this.allertifaj.konfirmim('KUJDES!', 'A je i sigurt qe po don me fshi kete mesazh?', () => {
      this.perdoruesServisi.fshijMesazh(id, this.authServisi.tokenIDekoduar.nameid).subscribe(() => {
        this.mesazhet.splice(this.mesazhet.findIndex(m => m.id === id), 1);
        this.allertifaj.sukses('Mesazhi eshte fshier me sukses');
      }, gabimi => {
        this.allertifaj.gabim('Fshierja e mesazhit deshtoj');
      });
    });
  }

  pageChanged(event: any): void {
    this.faqosja.faqjaAktuale = event.page;
    this.ngarkoMesazhet();
  }


}
