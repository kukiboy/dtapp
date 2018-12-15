using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.Models;
using DatingApp.API.Ndihmesit;
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

        public async Task<ListaFaqosur<Perdorues>> GetPerdoruesit(PerdoruesParametrat perdoruesParametrat)
        {
            var perdoruesit = _context.Perdoruesit.Include(f => f.Fotot).OrderByDescending(p => p.SeFundiAktiv).AsQueryable();

            perdoruesit = perdoruesit.Where(p => p.Id != perdoruesParametrat.PerdoruesId);
            perdoruesit = perdoruesit.Where(p => p.Gjinia == perdoruesParametrat.Gjinia);

            if (perdoruesParametrat.Pelqyesit)
            {
                var perdoruesPelqyesit = await GetPelqimetPerdoruesit(perdoruesParametrat.PerdoruesId, perdoruesParametrat.Pelqyesit);
                perdoruesit = perdoruesit.Where(p => perdoruesPelqyesit.Contains(p.Id));
            }

            if (perdoruesParametrat.Pelqyerit)
            {
                var perdoruesPelqyerit = await GetPelqimetPerdoruesit(perdoruesParametrat.PerdoruesId, perdoruesParametrat.Pelqyesit);
                perdoruesit = perdoruesit.Where(p => perdoruesPelqyerit.Contains(p.Id));

            }



            if (perdoruesParametrat.MaksMosha != 18 || perdoruesParametrat.MaksMosha != 99)
            {
                var minDtLnd = DateTime.Today.AddYears(-perdoruesParametrat.MaksMosha - 1);
                var maksDtLnd = DateTime.Today.AddYears(-perdoruesParametrat.MinMosha);

                perdoruesit = perdoruesit.Where(p => p.DataELindjes >= minDtLnd && p.DataELindjes <= maksDtLnd);
            }

            if (!string.IsNullOrEmpty(perdoruesParametrat.RadhitSipas))
            {
                switch (perdoruesParametrat.RadhitSipas)
                {                    
                    case "krijuarMe":
                            perdoruesit = perdoruesit.OrderByDescending(p => p.KrijuarMe);
                            break;
                        default:
                            perdoruesit = perdoruesit.OrderByDescending(p => p.SeFundiAktiv);
                            break;
                }
            }

            return await ListaFaqosur<Perdorues>.KrijoAsync(perdoruesit, perdoruesParametrat.FaqjaNr, perdoruesParametrat.MadhesiaFaqes);
        }

        private async Task<IEnumerable<int>> GetPelqimetPerdoruesit(int id, bool pelqyesit)
        {
            var perdoruesi = await _context.Perdoruesit
                .Include(x => x.Pelqyesit)
                .Include(x => x.Pelqyerit)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (pelqyesit)
            {
                return perdoruesi.Pelqyesit
                .Where(p => p.PelqyerId == id)
                .Select(i => i.PelqyesId);
            }
            else
            {
                return perdoruesi.Pelqyerit
                .Where(p => p.PelqyesId == id)
                .Select(i => i.PelqyerId);
            }
        }

        public async Task<Pelqim> MerrPelqim(int perdoruesId, int marresId)
        {
            return await _context.Pelqimet.FirstOrDefaultAsync(p =>
                p.PelqyesId == perdoruesId && p.PelqyerId == marresId);
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