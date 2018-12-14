namespace DatingApp.API.Ndihmesit
{
    public class KokaFaqosjes
    {
        public int FaqjaAktuale { get; set; }
        public int ArtikujPerFaqe { get; set; }
        public int TotalArtikuj { get; set; }
        public int TotalFaqe { get; set; }

        public KokaFaqosjes(int faqjaAktuale, int artikujPerFaqe, int totalArtikuj, int totalFaqe)
        {
            this.FaqjaAktuale = faqjaAktuale;
            this.ArtikujPerFaqe = artikujPerFaqe;
            this.TotalArtikuj = totalArtikuj;
            this.TotalFaqe = totalFaqe;
        }
    }
}