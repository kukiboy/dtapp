export interface Faqosja {
  faqjaAktuale: number;
  artikujPerFaqe: number;
  totalArtikuj: number;
  totalFaqe: number;
}

export class RezultatiFaqosur<T> {
    rezultati: T;
    faqosja: Faqosja;
}
