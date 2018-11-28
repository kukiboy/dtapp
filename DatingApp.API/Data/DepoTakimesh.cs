using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class DepoTakimesh : IDepoTakimesh
    {
        private readonly DataContext _context;
        public DepoTakimesh(DataContext context)
        {
            _context = context;

        }
        public void Fshij<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Foto> GetFoto(int id)
        {
            var foto = await _context.Fotot.FirstOrDefaultAsync(f => f.Id == id);
            return foto;
        }

        public async Task<Foto> GetFotonKryesoreNgaPerdoruesi(int perdoruesId)
        {
            return await _context.Fotot.Where(p => p.PerdoruesId == perdoruesId)
                .FirstOrDefaultAsync(f => f.aKryesor);
        }

        public async Task<Perdorues> GetPerdoruesin(int id)
        {
            var perdoruesi = await _context.Perdoruesit.Include(f => f.Fotot).FirstOrDefaultAsync(p => p.Id == id);
            return perdoruesi;
        }

        public async Task<IEnumerable<Perdorues>> GetPerdoruesit()
        {
            var perdoruesit = await _context.Perdoruesit.Include(f => f.Fotot).ToListAsync();
            return perdoruesit;
        }

        public async Task<bool> RuajGjitha()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Shto<T>(T entity) where T : class
        {
            _context.Add(entity);
        }
    }
}