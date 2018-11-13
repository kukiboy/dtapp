import { Component, OnInit } from '@angular/core';
import { Perdorues } from '../../_modelet/perdorues';
import { PerdoruesService } from '../../_serviset/perdorues.service';
import { AlertifyService } from '../../_serviset/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lista-antareve',
  templateUrl: './lista-antareve.component.html',
  styleUrls: ['./lista-antareve.component.css']
})
export class ListaAntareveComponent implements OnInit {
  perdoruesit: Perdorues[];

  constructor(
    private perdoruesServisi: PerdoruesService,
    private alertifaj: AlertifyService,
    private ruti: ActivatedRoute
    ) { }

  ngOnInit() {
    // this.ngarkoPerdoruesit();
    this.ruti.data.subscribe(data => {
      this.perdoruesit = data['perdoruesit'];
    });
  }

  // ngarkoPerdoruesit() {
  //   this.perdoruesServisi.getPerdoruesit().subscribe((perdoruesit: Perdorues[]) => {
  //     this.perdoruesit = perdoruesit;
  //   }, error => {
  //     this.alertifaj.gabim(error);
  //   });
  // }
}
