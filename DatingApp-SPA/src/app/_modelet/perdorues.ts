import { Foto } from './foto';

export interface Perdorues {
  id: number;
  perdoruesi: string;
  njohurSi: string;
  mosha: number;
  gjinia: string;
  krijuarMe: Date;
  seFundiAktiv: Date;
  fotoUrl: string;
  qyteti: string;
  shteti: string;
  intereset?: string;
  prezantimi?: string;
  interesuarPer?: string;
  fotot?: Foto[];
}
