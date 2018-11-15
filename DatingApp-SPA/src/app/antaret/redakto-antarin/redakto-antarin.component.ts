import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Perdorues } from 'src/app/_modelet/perdorues';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_serviset/alertify.service';
import { NgForm } from '@angular/forms';
import { PerdoruesService } from 'src/app/_serviset/perdorues.service';
import { AuthService } from 'src/app/_serviset/auth.service';

@Component({
  selector: 'app-redakto-antarin',
  templateUrl: './redakto-antarin.component.html',
  styleUrls: ['./redakto-antarin.component.css']
})
export class RedaktoAntarinComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  perdorues: Perdorues;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private ruti: ActivatedRoute,
    private alertifaj: AlertifyService,
    private perdoruesServisi: PerdoruesService,
    private authServisi: AuthService
  ) {}

  ngOnInit() {
    this.ruti.data.subscribe(data => {
      this.perdorues = data['perdorues'];
    });
  }

  perditesoPerdoruesin() {
    // console.log(this.perdorues);
    this.perdoruesServisi.perditesoPerdorues(this.authServisi.tokenIDekoduar.nameid, this.perdorues).subscribe(next => {
      this.alertifaj.sukses('Profili eshte perditesuar me sukses!');
      this.editForm.reset(this.perdorues);
    }, error => {
      this.alertifaj.gabim(error);
    }
    );
  }
}
