using System;
using System.Threading.Tasks;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;
        public AuthRepository(DataContext context)
        {
            _context = context;

        }
        public async Task<Perdorues> Kyqu(string perdoruesi, string fjalekalim)
        {
            var perdorues = await _context.Perdoruesit.Include(f => f.Fotot).FirstOrDefaultAsync(x => x.Perdoruesi == perdoruesi);

            if (perdorues == null)
                return null;

            if (!VerifikoFjalekalimHash(fjalekalim, perdorues.FjalekalimHash, perdorues.FjalekalimKryp))
                return null;
            
            return perdorues;
        }

        private bool VerifikoFjalekalimHash(string fjalekalim, byte[] fjalekalimHash, byte[] fjalekalimKryp)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(fjalekalimKryp))
            {
                var llogariturHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(fjalekalim));
                for (int i =0; i < llogariturHash.Length; i++)
                {
                    if (llogariturHash[i] != fjalekalimHash[i]) return false;
                }
                return true;
            }
        }

        public async Task<bool> PerdoruesEkziston(string perdoruesi)
        {
            if (await _context.Perdoruesit.AnyAsync(x=> x.Perdoruesi == perdoruesi))
                return true;

            return false;
        }

        public async Task<Perdorues> Regjistro(Perdorues perdorues, string fjalekalim)
        {
            byte[] fjalekalimHash, fjalekalimKryp;
            KrijoFjalekalimHash(fjalekalim, out fjalekalimHash, out fjalekalimKryp);
            perdorues.FjalekalimHash = fjalekalimHash;
            perdorues.FjalekalimKryp = fjalekalimKryp;
            
            await _context.Perdoruesit.AddAsync(perdorues);
            await _context.SaveChangesAsync();

            return perdorues;
        }

        private void KrijoFjalekalimHash(string fjalekalim, out byte[] fjalekalimHash, out byte[] fjalekalimKryp)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                fjalekalimKryp = hmac.Key;
                fjalekalimHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(fjalekalim));
            }
            
        }
    }
}