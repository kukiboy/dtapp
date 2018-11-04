using Microsoft.AspNetCore.Http;

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
    }
}