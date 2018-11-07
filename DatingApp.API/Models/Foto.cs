using System;

namespace DatingApp.API.Models
{
    public class Foto
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string Pershkrimi { get; set; }
        public DateTime DataEShtimit { get; set; }
        public bool aKryesor { get; set; }
        public Perdorues Perdorues { get; set; }
        public int PerdoruesId { get; set; }

    }
}