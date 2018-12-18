import { Component, OnInit, Input } from '@angular/core';
import { Mesazh } from 'src/app/_modelet/mesazh';
import { PerdoruesService } from 'src/app/_serviset/perdorues.service';
import { AuthService } from 'src/app/_serviset/auth.service';
import { AlertifyService } from 'src/app/_serviset/alertify.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-mesazhet-antarit',
  templateUrl: './mesazhet-antarit.component.html',
  styleUrls: ['./mesazhet-antarit.component.css']
})
export class MesazhetAntaritComponent implements OnInit {
  @Input() marresId: number;
  mesazhet: Mesazh[];
  mesazhIRi: any = {};

  constructor(
    private perdoruesServisi: PerdoruesService,
    private authServisi: AuthService,
    private allertifaj: AlertifyService
    ) { }

  ngOnInit() {
    this.ngarkoMesazhet();
  }

  ngarkoMesazhet() {
    const perdoruesiAktualId = +this.authServisi.tokenIDekoduar.nameid;
    this.perdoruesServisi.merrMesazhSekuence(this.authServisi.tokenIDekoduar.nameid, this.marresId)
      .pipe(
        tap(mesazhet => {
          for (let i = 0; i < mesazhet.length; i++) {
            if (mesazhet[i].eLexuar === false && mesazhet[i].marresId === perdoruesiAktualId) {
              this.perdoruesServisi.markoSiTeLexuar(perdoruesiAktualId, mesazhet[i].id);
            }
          }
        })
      )
    .subscribe(mesazhet => {
      this.mesazhet = mesazhet;
    }, gabimi => {
      this.allertifaj.gabim(gabimi);
    });
  }

  dergoMesazh() {
    this.mesazhIRi.marresId = this.marresId;
    this.perdoruesServisi.dergoMesazh(
      this.authServisi.tokenIDekoduar.nameid,
      this.mesazhIRi).subscribe((mesazh: Mesazh) => {
        // debugger;
        this.mesazhet.unshift(mesazh);
        this.mesazhIRi.permbajtja = '';
      }, gabimi => {
        this.allertifaj.gabim(gabimi);
      });
  }

}
