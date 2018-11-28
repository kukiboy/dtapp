import { Component, OnInit } from '@angular/core';
import { AuthService } from './_serviset/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Perdorues } from './_modelet/perdorues';
import { AlertifyService } from './_serviset/alertify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // title = 'app';
  jwtHelpper = new JwtHelperService();

  constructor(
    private authService: AuthService,
    private alertifaj: AlertifyService
    ) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    const perdoruesi: Perdorues = JSON.parse(localStorage.getItem('perdoruesi'));
    // console.dir(perdoruesi);
    if (token) {
      this.authService.tokenIDekoduar = this.jwtHelpper.decodeToken(token);
    }
    if (perdoruesi) {
      this.authService.perdoruesiAktual = perdoruesi;
      this.authService.ndryshoFotoAntarit(perdoruesi.fotoUrl);
      this.alertifaj.sukses('Foto profil freskuar');
    // tslint:disable-next-line:no-unused-expression
    }
  }
}
