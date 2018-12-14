namespace DatingApp.API.Ndihmesit
{
    public class PerdoruesParametrat
    {
        private const int MaksMadhesiaFaqes = 50;
        public int FaqjaNr { get; set; } = 1;
        private int madhesiaFaqes = 10;
        public int MadhesiaFaqes
        {
            get { return madhesiaFaqes;}
            set { madhesiaFaqes = (value > MaksMadhesiaFaqes) ? MaksMadhesiaFaqes : value;}
        }

        public int PerdoruesId { get; set; }
        public string Gjinia { get; set; }
        public int MinMosha { get; set; } = 18;
        public int MaksMosha { get; set; } = 99;
        public string RadhitSipas { get; set; }
        
    }
}