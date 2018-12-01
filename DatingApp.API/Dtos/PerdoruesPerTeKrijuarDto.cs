using System;
using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Dtos
{
    public class PerdoruesPerTeKrijuarDto
    {
        [Required]
        public string Perdoruesi { get; set; }

        [Required]
        [StringLength(8,MinimumLength = 4, ErrorMessage = "Duhet me shume se 3 karaktere")]
        public string Fjalekalimi { get; set; }

        [Required]
        public string Gjinia { get; set; }

        [Required]
        public string NjohurSi { get; set; }

        [Required]
        public DateTime DataELindjes { get; set; }

        [Required]
        public string Qyteti { get; set; }

        [Required]
        public string Shteti { get; set; }
        public DateTime KrijuarMe { get; set; }
        public DateTime SeFundiAktiv { get; set; }

        public PerdoruesPerTeKrijuarDto()
        {
            KrijuarMe = DateTime.Now;
            SeFundiAktiv = DateTime.Now;
        }
    }
}