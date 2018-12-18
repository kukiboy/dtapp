using System;

namespace DatingApp.API.Models
{
    public class Mesazh
    {
        public int Id { get; set; }
        public int DerguesId { get; set; }
        public Perdorues Dergues { get; set; }
        public int MarresId { get; set; }
        public Perdorues Marres { get; set; }
        public string Permbajtja { get; set; }
        public bool ELexuar { get; set; }
        public DateTime? DataLeximit { get; set; }
        public DateTime MesazhiDerguarMe { get; set; }
        public bool DerguesiKaFshierMszh { get; set; }
        public bool MarresiKaFshierMszh { get; set; }
    }
}