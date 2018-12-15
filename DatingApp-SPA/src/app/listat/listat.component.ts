import { Component, OnInit } from '@angular/core';
import { Perdorues } from '../_modelet/perdorues';
import { Faqosja, RezultatiFaqosur } from '../_modelet/faqosja';
import { AuthService } from '../_serviset/auth.service';
import { PerdoruesService } from '../_serviset/perdorues.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../_serviset/alertify.service';

@Component({
  selector: 'app-listat',
  templateUrl: './listat.component.html',
  styleUrls: ['./listat.component.css']
})
export class ListatComponent implements OnInit {
  perdoruesit: Perdorues[];
  faqosja: Faqosja;
  pelqimetParameter: string;

  constructor(private authServisi: AuthService,
              private perdoruesServisi: PerdoruesService,
              private ruti: ActivatedRoute,
              private alertifaj: AlertifyService) { }

  ngOnInit() {
    this.ruti.data.subscribe(data => {
      this.perdoruesit = data['perdoruesit'].rezultati;
      this.faqosja = data['perdoruesit'].faqosja;
    });
    this.pelqimetParameter = 'Pelqyesit';
  }

  ngarkoPerdoruesit() {
    this.perdoruesServisi.getPerdoruesit(this.faqosja.faqjaAktuale, this.faqosja.artikujPerFaqe, null, this.pelqimetParameter)
      .subscribe((res: RezultatiFaqosur<Perdorues[]>) => {
        this.perdoruesit = res.rezultati;
        this.faqosja = res.faqosja;
      }, error => {
        this.alertifaj.gabim(error);
      });
  }

  pageChanged(event: any): void {
    this.faqosja.faqjaAktuale = event.page;
    this.ngarkoPerdoruesit();
  }

}
