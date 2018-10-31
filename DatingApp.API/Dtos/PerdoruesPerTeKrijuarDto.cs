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
    }
}