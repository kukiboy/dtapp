import { Component, OnInit, Input } from '@angular/core';
import { Perdorues } from 'src/app/_modelet/perdorues';
import { AuthService } from 'src/app/_serviset/auth.service';
import { AlertifyService } from 'src/app/_serviset/alertify.service';
import { PerdoruesService } from 'src/app/_serviset/perdorues.service';

@Component({
  selector: 'app-kartela-antarit',
  templateUrl: './kartela-antarit.component.html',
  styleUrls: ['./kartela-antarit.component.css']
})
export class KartelaAntaritComponent implements OnInit {
  @Input() perdorues: Perdorues;

  constructor(private authServisi: AuthService,
              private perdoruesServisi: PerdoruesService,
              private alertifaj: AlertifyService) { }

  ngOnInit() {
  }

  dergoPelqimm(id: number) {
    this.perdoruesServisi.dergoPelqim(this.authServisi.tokenIDekoduar.nameid, id).subscribe(data => {
      this.alertifaj.sukses('Ju keni perlqyer: ' + this.perdorues.njohurSi);
    }, error => {
      this.alertifaj.gabim(error);
    });
  }

}
