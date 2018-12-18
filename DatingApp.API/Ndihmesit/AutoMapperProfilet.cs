using System.Linq;
using AutoMapper;
using DatingApp.API.Dtos;
using DatingApp.API.Models;

namespace DatingApp.API.Ndihmesit
{
    public class AutoMapperProfilet : Profile
    {
        public AutoMapperProfilet()
        {
            CreateMap<Perdorues, PerdoruesListPerDto>()
                .ForMember(dest => dest.FotoUrl, opt => {
                    opt.MapFrom(src => src.Fotot.FirstOrDefault(f => f.aKryesor).Url);
                })
                .ForMember(dest => dest.Mosha, opt => {
                    opt.ResolveUsing(d => d.DataELindjes.KalkuloMoshen());
                });

            CreateMap<Perdorues, PerdoruesDetajuarPerDto>()
                .ForMember(dest => dest.FotoUrl, opt =>
                {
                    opt.MapFrom(src => src.Fotot.FirstOrDefault(f => f.aKryesor).Url);
                })
                .ForMember(dest => dest.Mosha, opt =>
                {
                    opt.ResolveUsing(d => d.DataELindjes.KalkuloMoshen());
                });
            CreateMap<Foto, FototDetajuarPerDto>();
            CreateMap<PerdoruesPerPerditesimDto, Perdorues>();
            CreateMap<Foto, FotoPerTeKthyerDto>();
            CreateMap<FotoPerTeKrijuarDto, Foto>();
            CreateMap<PerdoruesPerTeKrijuarDto, Perdorues>();
            CreateMap<MesazhPerTeKrijuarDto, Mesazh>().ReverseMap();
            CreateMap<Mesazh, MesazhPerReturnDto>()
                .ForMember(a => a.DerguesFotoUrl, opt => opt.MapFrom(p => p.Dergues.Fotot.FirstOrDefault(f => f.aKryesor).Url))
                .ForMember(a => a.MarresFotoUrl, opt => opt.MapFrom(p => p.Marres.Fotot.FirstOrDefault(f => f.aKryesor).Url));
            
        }
    }
}