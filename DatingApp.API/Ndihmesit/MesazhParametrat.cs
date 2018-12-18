namespace DatingApp.API.Ndihmesit
{
    public class MesazhParametrat
    {
        private const int MaksMadhesiaFaqes = 50;
        public int FaqjaNr { get; set; } = 1;
        private int madhesiaFaqes = 10;
        public int MadhesiaFaqes
        {
            get { return madhesiaFaqes; }
            set { madhesiaFaqes = (value > MaksMadhesiaFaqes) ? MaksMadhesiaFaqes : value; }
        }

        public int PerdoruesId { get; set; }
        public string MesazhKonteiner { get; set; } = "Palexuar";
        
    }
}