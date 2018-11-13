import { Component, OnInit, Input } from '@angular/core';
import { Perdorues } from 'src/app/_modelet/perdorues';

@Component({
  selector: 'app-kartela-antarit',
  templateUrl: './kartela-antarit.component.html',
  styleUrls: ['./kartela-antarit.component.css']
})
export class KartelaAntaritComponent implements OnInit {
  @Input() perdorues: Perdorues;

  constructor() { }

  ngOnInit() {
  }

}
