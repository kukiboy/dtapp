import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_serviset/auth.service';
import { AlertifyService } from '../_serviset/alertify.service';

@Component({
  selector: 'app-regjistrohu',
  templateUrl: './regjistrohu.component.html',
  styleUrls: ['./regjistrohu.component.css']
})
export class RegjistrohuComponent implements OnInit {
  // @Input() vleratNgaBallina: any;
  @Output() anuloRegjistrimin = new EventEmitter();
  model: any = {};

  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  regjistrohu() {
    this.authService.regjistro(this.model).subscribe(() => {
      this.alertify.sukses('regjistrimi i sukseseshem');
      // console.log('regjistrimi i sukseseshem');
    }, error => {
      this.alertify.gabim(error);
      // console.log(error);
    });
    // console.log(this.model);
  }

  anulo() {
    this.anuloRegjistrimin.emit(false);
    // console.log('Anuluar');
  }

}
