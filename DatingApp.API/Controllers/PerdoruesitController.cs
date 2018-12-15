using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Models;
using DatingApp.API.Ndihmesit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [ServiceFilter(typeof(LogAktivitetetPerdoruesit))]
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
        public async Task<IActionResult> GetPerdoruesit([FromQuery]PerdoruesParametrat perdoruesParametrat)
        {
            var perdoruesIdAktual = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var perdoruesNgaDepo = await _depo.GetPerdoruesin(perdoruesIdAktual);

            perdoruesParametrat.PerdoruesId = perdoruesIdAktual;

            if (string.IsNullOrEmpty(perdoruesParametrat.Gjinia))
            {
                perdoruesParametrat.Gjinia = perdoruesNgaDepo.Gjinia == "mashkull" ? "femer" : "mashkull";
            }

            var perdoruesit = await _depo.GetPerdoruesit(perdoruesParametrat);

            var perdoruesitPerReturn = _mapper.Map<IEnumerable<PerdoruesListPerDto>>(perdoruesit);

            Response.ShtoFaqosje(perdoruesit.FaqjaAktuale, perdoruesit.MadhesiaFaqes,
                perdoruesit.SasiaTotal, perdoruesit.TotalFaqe);
            
            return Ok(perdoruesitPerReturn); // perdoruesit);
        }

        [HttpGet("{id}", Name = "GetPerdorues")]
        public async Task<IActionResult> GetPerdoruesin(int id)
        {
            var perdoruesi = await _depo.GetPerdoruesin(id);
            
            var perdoruesPerReturn = _mapper.Map<PerdoruesDetajuarPerDto>(perdoruesi);

            return Ok(perdoruesPerReturn); // perdoruesi);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PerditesoPerdoruesin(int id, PerdoruesPerPerditesimDto perdoruesPerPerditesimDto)
        {            
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var perdoruesNgaDepo = await _depo.GetPerdoruesin(id);
            _mapper.Map(perdoruesPerPerditesimDto, perdoruesNgaDepo);

            if (await _depo.RuajGjitha())
                return NoContent();

            throw new Exception($"Ruajtja per " + this.GetPerdoruesin(id) + " me nr id: {id} deshtoi!");
        }

        [HttpPost("{id}/pelqe/{marresId}")]
        public async Task<IActionResult> PelqePerdoruesin(int id, int marresId)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var pelqe = await _depo.MerrPelqim(id, marresId);

            if (pelqe != null)
                return BadRequest("Ju e keni perlqyer me pare kete person");

            if (await _depo.GetPerdoruesin(marresId) == null)
                return NotFound();

            pelqe = new Pelqim
            {
                PelqyesId = id,
                PelqyerId = marresId
            };

            _depo.Shto<Pelqim>(pelqe);

            if (await _depo.RuajGjitha())
                return  Ok();

            return BadRequest("Pelqimi i personit deshtoj");
        }

    }
}