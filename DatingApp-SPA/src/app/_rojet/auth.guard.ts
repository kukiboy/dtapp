import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../_serviset/auth.service';
import { AlertifyService } from '../_serviset/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authServisi: AuthService,
    private ruteri: Router,
    private alertifaj: AlertifyService
  ) {}
  canActivate(): boolean {
    if (this.authServisi.iKyqur()) {

      return true;
    }

    this.alertifaj.gabim('Nuk e hap dot! <br/> Ske autorizim!');
    this.ruteri.navigate(['/ballina']);
    return false;
  }
}
