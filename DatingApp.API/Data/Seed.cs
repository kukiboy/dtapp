using System.Collections.Generic;
using DatingApp.API.Models;
using Newtonsoft.Json;

namespace DatingApp.API.Data
{
    public class Seed
    {
        private readonly DataContext _context;
        public Seed(DataContext context)
        {
            _context = context;
        }

        public void SeedPerdoruesit()
        {
            var perdData = System.IO.File.ReadAllText("Data/PerdSeedData.json");
            var perdoruesit = JsonConvert.DeserializeObject<List<Perdorues>>(perdData);
            foreach (var perdorues in perdoruesit)
            {
                byte[] fjalekalimHash, fjalekalimKryp;
                KrijoFjalekalimHash("fjalekalim", out fjalekalimHash, out fjalekalimKryp);

                perdorues.FjalekalimHash = fjalekalimHash;
                perdorues.FjalekalimKryp = fjalekalimKryp;
                perdorues.Perdoruesi = perdorues.Perdoruesi.ToLower();

                _context.Perdoruesit.Add(perdorues);
            }

            _context.SaveChanges();
        }

        private void KrijoFjalekalimHash(string fjalekalim, out byte[] fjalekalimHash, out byte[] fjalekalimKryp)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                fjalekalimKryp = hmac.Key;
                fjalekalimHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(fjalekalim));
            }
        }
    }   
}