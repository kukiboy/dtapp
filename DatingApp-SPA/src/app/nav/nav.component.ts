import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_serviset/auth.service';
import { AlertifyService } from '../_serviset/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
  model: any = {};

  constructor(
    public authService: AuthService,
    private alertify: AlertifyService,
    private ruteri: Router
    ) {}

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
    }, () => {
      this.ruteri.navigate(['/antaret']);
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
    this.ruteri.navigate(['/ballina']);
    // console.log('qkyqur me sukses');
  }
}
