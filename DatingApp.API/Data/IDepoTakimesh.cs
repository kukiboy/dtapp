using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Models;
using DatingApp.API.Ndihmesit;

namespace DatingApp.API.Data
{
    public interface IDepoTakimesh
    {
         void Shto<T>(T entity) where T: class;
         void Fshij<T>(T entity) where T: class;
         Task<bool> RuajGjitha();
         Task<ListaFaqosur<Perdorues>> GetPerdoruesit(PerdoruesParametrat perdoruesParametrat);         
         Task<Perdorues> GetPerdoruesin(int id);
         Task<Foto> GetFoto(int id);
         Task<Foto> GetFotonKryesoreNgaPerdoruesi(int perdoruesId);
         Task<Pelqim> MerrPelqim(int perdoruesId, int marresId);
    }
}