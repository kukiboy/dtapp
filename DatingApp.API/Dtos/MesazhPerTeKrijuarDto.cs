using System;

namespace DatingApp.API.Dtos
{
    public class MesazhPerTeKrijuarDto
    {
        public int DerguesId { get; set; }
        public int MarresId { get; set; }
        public DateTime MesazhiDerguarMe { get; set; }
        public string Permbajtja { get; set; }
        public MesazhPerTeKrijuarDto()
        {
            MesazhiDerguarMe = DateTime.Now;
        }
    }
}