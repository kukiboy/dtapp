using System.Threading.Tasks;
using DatingApp.API.Models;

namespace DatingApp.API.Data
{
    public interface IAuthRepository
    {
         Task<Perdorues> Regjistro(Perdorues perdoruesi, string fjalekalimi);
         Task<Perdorues> Kyqu(string perdoruesi, string fjalekalimi);

         Task<bool> PerdoruesEkziston(string perdoruesi);
    }
}