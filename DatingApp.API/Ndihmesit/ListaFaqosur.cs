using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Ndihmesit
{
    public class ListaFaqosur<T> : List<T>
    {
        public int FaqjaAktuale { get; set; }
        public int TotalFaqe { get; set; }
        public int MadhesiaFaqes { get; set; }
        public int SasiaTotal { get; set; }
        public ListaFaqosur(List<T> artikujt, int sasia, int faqjaNr, int madhesiaFaqes)
        {
            SasiaTotal = sasia;
            MadhesiaFaqes = madhesiaFaqes;
            FaqjaAktuale = faqjaNr;
            TotalFaqe = (int)Math.Ceiling( sasia / (double)madhesiaFaqes);
            this.AddRange(artikujt);
        }

        public static async Task<ListaFaqosur<T>> KrijoAsync(IQueryable<T> sourcei,
            int faqjaNr, int madhesiaFaqes)
        {
            var sasia = await sourcei.CountAsync();
            var artikujt = await sourcei.Skip((faqjaNr -1) * madhesiaFaqes).Take(madhesiaFaqes).ToListAsync();
            return new ListaFaqosur<T>(artikujt, sasia, faqjaNr, madhesiaFaqes);
        }
    }
}