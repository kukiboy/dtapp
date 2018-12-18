using System;
using System.Collections.Generic;

namespace DatingApp.API.Models
{
    public class Perdorues
    {
        public int Id { get; set; }
        public string Perdoruesi { get; set; }
        public byte[] FjalekalimHash { get; set; }
        public byte[] FjalekalimKryp { get; set; }

        public string Gjinia { get; set; }
        public DateTime DataELindjes { get; set; }
        public string NjohurSi { get; set; }
        public DateTime KrijuarMe { get; set; }
        public DateTime SeFundiAktiv { get; set; }
        public string Prezantimi { get; set; }
        public string InteresuarPer { get; set; }
        public string Intereset { get; set; }
        public string Qyteti { get; set; }
        public string Shteti { get; set; }
        public ICollection<Foto> Fotot { get; set; }
        public ICollection<Pelqim> Pelqyesit { get; set; }
        public ICollection<Pelqim> Pelqyerit { get; set; }
        public ICollection<Mesazh> MesazhetDerguara { get; set; }
        public ICollection<Mesazh> MesazhetPranuara { get; set; }

    }
}