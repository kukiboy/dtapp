import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ballina',
  templateUrl: './ballina.component.html',
  styleUrls: ['./ballina.component.css']
})
export class BallinaComponent implements OnInit {
  modiRegjistrimit = false;
  // vlerat: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // this.getVlerat();
  }

  regjistrimi() {
    this.modiRegjistrimit = true;
    // this.modiRegjistrimit = !this.modiRegjistrimit;
  }

  // getVlerat() {
  //   this.http.get("http://localhost:5000/api/values/").subscribe(
  //     response => {
  //       this.vlerat = response;
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );
  // }

  anuloRegjistriminMode(modiRegjistrimit: boolean) {
    this.modiRegjistrimit = modiRegjistrimit;
  }
}
