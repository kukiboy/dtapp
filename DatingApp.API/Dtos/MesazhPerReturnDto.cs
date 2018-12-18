using System;

namespace DatingApp.API.Dtos
{
    public class MesazhPerReturnDto
    {
        public int Id { get; set; }
        public int DerguesId { get; set; }
        public string DerguesNjohurSi { get; set; }
        public string DerguesFotoUrl { get; set; }
        public int MarresId { get; set; }
        public string MarresNjohurSi { get; set; }
        public string MarresFotoUrl { get; set; }
        public string Permbajtja { get; set; }
        public bool ELexuar { get; set; }
        public DateTime? DataLeximit { get; set; }
        public DateTime MesazhiDerguarMe { get; set; }
    }
}