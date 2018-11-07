using System.Threading.Tasks;
using DatingApp.API.Data;
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
        public PerdoruesitController(IDepoTakimesh depo)
        {
            _depo = depo;

        }

        [HttpGet]
        public async Task<IActionResult> GetPerdoruesit()
        {
            var perdoruesit = await _depo.GetPerdoruesit();
            return Ok(perdoruesit);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPerdoruesin(int id)
        {
            var perdoruesi = await _depo.GetPerdoruesin(id);
            return Ok(perdoruesi);
        }

    }
}