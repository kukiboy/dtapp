import { Injectable } from '@angular/core';
declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

constructor() { }

konfirmim(mesazhi: string, okCallback: () => any) {
  alertify.konfirmim(mesazhi, function(e) {
    if (e) {
      okCallback();
    } else {}
  });
}

sukses(mesazhi: string) {
  alertify.success(mesazhi);
}

gabim(mesazhi: string) {
  alertify.error(mesazhi);
}

verejtje(mesazhi: string) {
  alertify.warning(mesazhi);
}

mesazh(mesazhi: string) {
  alertify.message(mesazhi);
}


}
