using System;

namespace DatingApp.API.Dtos
{
    public class FotoPerTeKthyerDto
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string Pershkrimi { get; set; }
        public DateTime DataEShtimit { get; set; }
        public bool aKryesor { get; set; }
        public string PublikId { get; set; }
    }
}