import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_serviset/auth.service';
import { AlertifyService } from '../_serviset/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
  model: any = {};

  constructor(public authService: AuthService, private alertify: AlertifyService) {}

  ngOnInit() {}

  kyqu() {
    // console.log(this.model);
    this.authService.kyqu(this.model).subscribe(next => {
      this.alertify.sukses('Kyqur me sukses');
      // console.log('Kyqur me sukses');
    }, error => {
      this.alertify.gabim(error);
        // console.log(error);
        // 'Kyqja deshtoi'
    });
  }

  kyqur() {
    // const token = localStorage.getItem('token');
    // return !!token;
    return this.authService.iKyqur();

  }

  qkyqu() {
    localStorage.removeItem('token');
    this.alertify.mesazh('qkyqur me sukses');
    // console.log('qkyqur me sukses');
  }
}
