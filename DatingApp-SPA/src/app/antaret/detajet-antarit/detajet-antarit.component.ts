import { Component, OnInit, ViewChild } from '@angular/core';
import { Perdorues } from 'src/app/_modelet/perdorues';
import { PerdoruesService } from 'src/app/_serviset/perdorues.service';
import { AlertifyService } from 'src/app/_serviset/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
  selector: 'app-detajet-antarit',
  templateUrl: './detajet-antarit.component.html',
  styleUrls: ['./detajet-antarit.component.css']
})
export class DetajetAntaritComponent implements OnInit {
  @ViewChild('antarTabs') antarTabs: TabsetComponent;
  perdorues: Perdorues;
  galleriOpcionet: NgxGalleryOptions[];
  galleriImazhet: NgxGalleryImage[];

  constructor(
    private perdoruesServisi: PerdoruesService,
    private alertifaj: AlertifyService,
    private ruti: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.ngarkoPerdoruesit();
    this.ruti.data.subscribe(data => {
      this.perdorues = data['perdorues'];
    });

    this.ruti.queryParams.subscribe(params => {
      const zgjedhurTab = params['tab'];
      this.antarTabs.tabs[zgjedhurTab > 0 ? zgjedhurTab : 0].active = true;
    });

    this.galleriOpcionet = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];
    this.galleriImazhet = this.merrImazhet();
  }

    merrImazhet() {
      const imazhUrls = [];
      for (let i = 0; i < this.perdorues.fotot.length; i++) {
        imazhUrls.push({
          small: this.perdorues.fotot[i].url,
          medium: this.perdorues.fotot[i].url,
          big: this.perdorues.fotot[i].url,
          description: this.perdorues.fotot[i].pershkrimi
        });
      }
      return imazhUrls;
    }

    zgjedhTab(tabId: number) {
      this.antarTabs.tabs[tabId].active = true;
    }

  // antaret/3
  // ngarkoPerdoruesit() {
  //   this.perdoruesServisi.getPerdoruesin(+this.ruti.snapshot.params['id']).subscribe((perdorues: Perdorues) => {
  //     this.perdorues = perdorues;
  //   }, error => {
  //     this.alertifaj.gabim(error);
  //   });
  // }
}
