using System;

namespace DatingApp.API.Dtos
{
    public class PerdoruesListPerDto
    {
        public int Id { get; set; }
        public string Perdoruesi { get; set; }
        public string Gjinia { get; set; }
        public int Mosha { get; set; }
        public string NjohurSi { get; set; }
        public DateTime KrijuarMe { get; set; }
        public DateTime SeFundiAktiv { get; set; }
        public string Qyteti { get; set; }
        public string Shteti { get; set; }
        public string FotoUrl { get; set; }

    }
}