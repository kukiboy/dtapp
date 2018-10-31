import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_serviset/auth.service';

@Component({
  selector: 'app-regjistrohu',
  templateUrl: './regjistrohu.component.html',
  styleUrls: ['./regjistrohu.component.css']
})
export class RegjistrohuComponent implements OnInit {
  // @Input() vleratNgaBallina: any;
  @Output() anuloRegjistrimin = new EventEmitter();
  model: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  regjistrohu() {
    this.authService.regjistro(this.model).subscribe(() => {
      console.log('regjistrimi i sukseseshem');
    }, error => {
      console.log(error);
    });
    // console.log(this.model);
  }

  anulo() {
    this.anuloRegjistrimin.emit(false);
    console.log('Anuluar');
  }

}
