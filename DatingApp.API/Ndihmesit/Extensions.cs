using System;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace DatingApp.API.Ndihmesit
{
    public static class Extensions
    {
        public static void ShtoApplicationError(this HttpResponse pergjigjja, string mesazhi)
        {
            pergjigjja.Headers.Add("Application-Error", mesazhi);
            pergjigjja.Headers.Add("Access-Control-Expose-Headers","Application-Error");
            pergjigjja.Headers.Add("Access-Control-Allow-Origin","*");
        }

        public static void ShtoFaqosje(this HttpResponse pergjigjja,
            int faqjaAktuale, int artikujPerFaqe, int totalArtikuj, int totalFaqe)
            {
                var kokaFaqosjes = new KokaFaqosjes(faqjaAktuale, artikujPerFaqe, totalArtikuj, totalFaqe);
                var camelCaseFormatuesi = new JsonSerializerSettings();
                camelCaseFormatuesi.ContractResolver = new CamelCasePropertyNamesContractResolver();
                pergjigjja.Headers.Add("Pagination",
                    JsonConvert.SerializeObject(kokaFaqosjes, camelCaseFormatuesi));
                pergjigjja.Headers.Add("Access-Control-Expose-Headers", "Pagination");
            }

        public static int KalkuloMoshen(this DateTime DataKoha)
        {
            var mosha = DateTime.Today.Year - DataKoha.Year;
            if (DataKoha.AddYears(mosha) > DateTime.Today)
                mosha--;

            return mosha;
        }
    }
}