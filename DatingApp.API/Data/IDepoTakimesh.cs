using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Models;

namespace DatingApp.API.Data
{
    public interface IDepoTakimesh
    {
         void Shto<T>(T entity) where T: class;
         void Fshij<T>(T entity) where T: class;

         Task<bool> RuajGjitha();

         Task<IEnumerable<Perdorues>> GetPerdoruesit();
         
         Task<Perdorues> GetPerdoruesin(int id);

    }
}