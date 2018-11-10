using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PerdoruesitController : ControllerBase
    {
        private readonly IDepoTakimesh _depo;
        private readonly IMapper _mapper;
        public PerdoruesitController(IDepoTakimesh depo, IMapper mapper)
        {
            _mapper = mapper;
            _depo = depo;

        }

        [HttpGet]
        public async Task<IActionResult> GetPerdoruesit()
        {
            var perdoruesit = await _depo.GetPerdoruesit();

            var perdoruesitPerReturn = _mapper.Map<IEnumerable<PerdoruesListPerDto>>(perdoruesit);
            
            return Ok(perdoruesitPerReturn); // perdoruesit);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPerdoruesin(int id)
        {
            var perdoruesi = await _depo.GetPerdoruesin(id);
            
            var perdoruesPerReturn = _mapper.Map<PerdoruesDetajuarPerDto>(perdoruesi);

            return Ok(perdoruesPerReturn); // perdoruesi);
        }

    }
}