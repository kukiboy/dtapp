using System;
using Microsoft.AspNetCore.Http;
namespace DatingApp.API.Dtos
{
    public class FotoPerTeKrijuarDto
    {
        public string Url { get; set; }
        public IFormFile File { get; set; }
        public string Pershkrimi { get; set; }
        public DateTime DtShtuarMe { get; set; }
        public string PublikId { get; set; }

        public FotoPerTeKrijuarDto()
        {
            DtShtuarMe = DateTime.Now;
        }
    }
}