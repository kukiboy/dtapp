import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Foto } from '../../_modelet/foto';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../_serviset/auth.service';
import { PerdoruesService } from '../../_serviset/perdorues.service';
import { AlertifyService } from '../../_serviset/alertify.service';

@Component({
  selector: 'app-foto-redaktor',
  templateUrl: './foto-redaktor.component.html',
  styleUrls: ['./foto-redaktor.component.css']
})
export class FotoRedaktorComponent implements OnInit {
  @Input() fotot: Foto[];
  @Output() getAntarNdryshim = new EventEmitter<string>();
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  kryesorAktual: Foto;

  constructor(private authServisi: AuthService,
    private perdoruesServisi: PerdoruesService,
    private alertifaj: AlertifyService) { }

  ngOnInit() {
    this.inicoUploader();
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  inicoUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'perdoruesit/' + this.authServisi.tokenIDekoduar.nameid + '/fotot',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (skede) => {skede.withCredentials = false; };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Foto = JSON.parse(response);
        const foto = {
          id: res.id,
          url: res.url,
          dataEShtimit: res.dataEShtimit,
          pershkrimi: res.pershkrimi,
          aKryesor: res.aKryesor
        };
        this.fotot.push(foto);
        if (foto.aKryesor) {
          this.authServisi.ndryshoFotoAntarit(foto.url);
          this.authServisi.perdoruesiAktual.fotoUrl = foto.url;
          localStorage.setItem('perdoruesi', JSON.stringify(this.authServisi.perdoruesiAktual));
        }
      }
    };
  }

  cktKryesor(foto: Foto) {
    this.perdoruesServisi.cktFotoKryesor(this.authServisi.tokenIDekoduar.nameid, foto.id).subscribe(() => {
      this.kryesorAktual = this.fotot.filter(f => f.aKryesor === true)[0];
      this.kryesorAktual.aKryesor = false;
      foto.aKryesor = true;
      this.authServisi.ndryshoFotoAntarit(foto.url);
      this.authServisi.perdoruesiAktual.fotoUrl = foto.url;
      this.getAntarNdryshim.emit(foto.url);
      this.alertifaj.sukses('Eshte caktuar me sukses si foto kryesore');
      localStorage.setItem('perdoruesi', JSON.stringify(this.authServisi.perdoruesiAktual));
    }, error => {
      this.alertifaj.gabim(error);
    });
  }

  fshijFoto(id: number) {
    this.alertifaj.konfirmim('KUJDES: Konfirmim!', 'A je i sigurt qe po don me e fshi kete foto?', () => {
      this.perdoruesServisi.fshijFoto(this.authServisi.tokenIDekoduar.nameid, id).subscribe(() => {
        this.fotot.splice(this.fotot.findIndex(f => f.id === id), 1);
        this.alertifaj.sukses('Fotoja eshte fshire me suksese');
      }, error => {
        this.alertifaj.gabim('Fshirja e fotos deshtoj!');
      });
    });
  }

}
