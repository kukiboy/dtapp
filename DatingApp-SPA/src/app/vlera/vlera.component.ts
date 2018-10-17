import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-vlera',
  templateUrl: './vlera.component.html',
  styleUrls: ['./vlera.component.css']
})
export class VleraComponent implements OnInit {
  vlerat: any;

  constructor(private http: HttpClient) { }

  ngOnInit() { 
    this.getVlerat();
   }
  getVlerat() {
    this.http.get('http://localhost:5000/api/values/').subscribe(response => {
     this.vlerat = response;
   },
   error => {
     console.log(error);
   });
 }
}
