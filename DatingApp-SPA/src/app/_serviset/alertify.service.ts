import { Injectable } from '@angular/core';
declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

constructor() { }

konfirmim(titulli: string, mesazhi: string, okCallback: () => any) {

  alertify.confirm(titulli, mesazhi, function () {
    // alertify.success('Ke klikuar Po');
    okCallback();
  }, function () {
    // alertify.error('Ke klikuar Jo');
    }).set('labels', { ok: 'Po', cancel: 'Jo' });




  // alertify.confirm(title, mesazhi, function(e) {
  //   if (e) {
  //     okCallback();
  //   } else {
  //   }
  // });
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
