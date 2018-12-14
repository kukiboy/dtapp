import { Component, OnInit } from '@angular/core';
import { Perdorues } from '../../_modelet/perdorues';
import { PerdoruesService } from '../../_serviset/perdorues.service';
import { AlertifyService } from '../../_serviset/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Faqosja, RezultatiFaqosur } from 'src/app/_modelet/faqosja';

@Component({
  selector: 'app-lista-antareve',
  templateUrl: './lista-antareve.component.html',
  styleUrls: ['./lista-antareve.component.css']
})
export class ListaAntareveComponent implements OnInit {
  perdoruesit: Perdorues[];
  perdoruesi: Perdorues = JSON.parse(localStorage.getItem('perdoruesi'));
  listaGjinive = [
    { value: 'mashkull', display: 'Meshkuj' },
    { value: 'femer', display: 'Femra' }
  ];

  perdoruesParametrat: any = {};
  faqosja: Faqosja;

  constructor(
    private perdoruesServisi: PerdoruesService,
    private alertifaj: AlertifyService,
    private ruti: ActivatedRoute
    ) { }

  ngOnInit() {
    this.ruti.data.subscribe(data => {
      this.perdoruesit = data['perdoruesit'].rezultati;
      this.faqosja = data['perdoruesit'].faqosja;
    });

    this.perdoruesParametrat.gjinia = this.perdoruesi.gjinia === 'femer' ? 'mashkull' : 'femer';
    this.perdoruesParametrat.minMosha = 18;
    this.perdoruesParametrat.maksMosha = 99;
    this.perdoruesParametrat.radhitSipas = 'seFundiAktiv';
  }

    pageChanged(event: any): void {
      this.faqosja.faqjaAktuale = event.page;
      this.ngarkoPerdoruesit();
    }

    resetoFiltrat() {
      this.perdoruesParametrat.gjinia = this.perdoruesi.gjinia === 'femer' ? 'mashkull' : 'femer';
      this.perdoruesParametrat.minMosha = 18;
      this.perdoruesParametrat.maksMosha = 99;
      this.ngarkoPerdoruesit();
    }

  ngarkoPerdoruesit() {
    this.perdoruesServisi.getPerdoruesit(this.faqosja.faqjaAktuale, this.faqosja.artikujPerFaqe, this.perdoruesParametrat)
      .subscribe( (res: RezultatiFaqosur<Perdorues[]>) => {
      this.perdoruesit = res.rezultati;
      this.faqosja = res.faqosja;
    }, error => {
      this.alertifaj.gabim(error);
    });
  }
}
