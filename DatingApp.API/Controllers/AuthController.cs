using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        public AuthController(IAuthRepository repo, IConfiguration config, IMapper mapper)
        {
            _mapper = mapper;
            _config = config;
            _repo = repo;

        }

        [HttpPost("regjistro")]
        public async Task<IActionResult> Regjistro(PerdoruesPerTeKrijuarDto perdoruesPerTeKrijuarDto)
        {
            perdoruesPerTeKrijuarDto.Perdoruesi = perdoruesPerTeKrijuarDto.Perdoruesi.ToLower();

            if (await _repo.PerdoruesEkziston(perdoruesPerTeKrijuarDto.Perdoruesi))
                return BadRequest("Perdoruesi ekziston");

            // var perdoruesPerTeKrijuar =  new Perdorues
            // {
            //     Perdoruesi = perdoruesPerTeKrijuarDto.Perdoruesi
            // };

            var perdoruesPerTeKrijuar = _mapper.Map<Perdorues>(perdoruesPerTeKrijuarDto);

            var krijuarPerdoruesi = await _repo.Regjistro(perdoruesPerTeKrijuar, perdoruesPerTeKrijuarDto.Fjalekalimi);

            var perdoruesPerReturn = _mapper.Map<PerdoruesDetajuarPerDto>(krijuarPerdoruesi);

            return CreatedAtRoute("GetPerdorues", new {Controller = "Perdoruesit", id = krijuarPerdoruesi.Id}, perdoruesPerReturn);
        }

        [HttpPost("kyqu")]
        public async Task<IActionResult> Kyqu(PerdoruesPerTuKyqurDto perdoruesPerTuKyqurDto)
        {

            //throw new Exception("Sistemi po thot jo bbbb!");

            var perdoruesNgaRepo = await _repo.Kyqu(perdoruesPerTuKyqurDto.Perdoruesi.ToLower(), perdoruesPerTuKyqurDto.Fjalekalimi);

            if (perdoruesNgaRepo == null)
                return Unauthorized();

            var demet = new[]
            {
                        new Claim(ClaimTypes.NameIdentifier, perdoruesNgaRepo.Id.ToString()),
                        new Claim(ClaimTypes.Name, perdoruesNgaRepo.Perdoruesi)
                };

            var qelesi = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(_config.GetSection("AppSettings:Token").Value));

            var kreds = new SigningCredentials(qelesi, SecurityAlgorithms.HmacSha512Signature);

            var tokenPershkruesi = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(demet),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = kreds
            };

            var tokenHendler = new JwtSecurityTokenHandler();

            var token = tokenHendler.CreateToken(tokenPershkruesi);
            
            var perdoruesi = _mapper.Map<PerdoruesListPerDto>(perdoruesNgaRepo);

                return Ok(new
                {
                    token = tokenHendler.WriteToken(token),
                    perdoruesi
                });



        }

    }
}