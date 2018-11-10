using System;
using System.Collections.Generic;
using DatingApp.API.Models;

namespace DatingApp.API.Dtos
{
    public class PerdoruesDetajuarPerDto
    {
        public int Id { get; set; }
        public string Perdoruesi { get; set; }
        public string Gjinia { get; set; }
        public int Mosha { get; set; }
        public string NjohurSi { get; set; }
        public DateTime KrijuarMe { get; set; }
        public DateTime SeFundiAktiv { get; set; }
        public string Prezantimi { get; set; }
        public string InteresuarPer { get; set; }
        public string Intereset { get; set; }
        public string Qyteti { get; set; }
        public string Shteti { get; set; }
        public string FotoUrl { get; set; }
        public ICollection<FototDetajuarPerDto> Fotot { get; set; }
    }
}