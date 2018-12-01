import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_serviset/auth.service';
import { AlertifyService } from '../_serviset/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { Perdorues } from '../_modelet/perdorues';
import { Router } from '@angular/router';

@Component({
  selector: 'app-regjistrohu',
  templateUrl: './regjistrohu.component.html',
  styleUrls: ['./regjistrohu.component.css']
})
export class RegjistrohuComponent implements OnInit {
  @Output() anuloRegjistrimin = new EventEmitter();
  perdoruesi: Perdorues;
  formaRegjistrimit: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(
              private authServisi: AuthService,
              private ruteri: Router,
              private alertify: AlertifyService,
              private fb: FormBuilder
              ) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-red'
    },
    this.krijoFormeRegjistrimi();
  }

  krijoFormeRegjistrimi() {
    this.formaRegjistrimit = this.fb.group({
      gjinia: ['mashkull'],
      perdoruesi: ['', Validators.required],
      njohurSi: ['', Validators.required],
      dataELindjes: [null, Validators.required],
      qyteti: ['', Validators.required],
      shteti: ['', Validators.required],
      fjalekalimi: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      konfirmoFjalekalimin: ['', Validators.required]
    }, {validator: this.fjalekalimKrahasuesi});
  }

  fjalekalimKrahasuesi(g: FormGroup) {
    return g.get('fjalekalimi').value === g.get('konfirmoFjalekalimin').value ? null : {'mosperputhje': true};
  }

  regjistrohu() {
    if (this.formaRegjistrimit.valid) {
      this.perdoruesi = Object.assign({}, this.formaRegjistrimit.value);
      this.authServisi.regjistro(this.perdoruesi).subscribe(() => {
        this.alertify.sukses('Regjistrimi u be me sukses');
      }, error => {
        this.alertify.gabim(error);
      }, () => {
        this.authServisi.kyqu(this.perdoruesi).subscribe(() => {
          this.ruteri.navigate(['/antaret']);
        });
      });
    }
  }

  anulo() {
    this.anuloRegjistrimin.emit(false);
  }

}
