import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_serviset/auth.service';

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})

export class NavComponent implements OnInit {
  model: any = {};

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  kyqu() {
    // console.log(this.model);
    this.authService.kyqu(this.model).subscribe(next => {
      console.log('Kyqur me sukses');
    }, error => {
        console.log('Kyqja deshtoi');
    });
  }

  kyqur() {
    const token = localStorage.getItem('token');
    return !!token;

  }

  qkyqu() {
    localStorage.removeItem('token');
    console.log('qkyqur me sukses');
  }
}
