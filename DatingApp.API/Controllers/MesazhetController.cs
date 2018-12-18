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
    [Route("api/perdoruesit/{perdoruesId}/[controller]")]
    [ApiController]
    public class MesazhetController : ControllerBase
    {
        private readonly IDepoTakimesh _depo;
        private readonly IMapper _mapper;

        public MesazhetController(IDepoTakimesh depo, IMapper mapper)
        {
            _depo = depo;
            _mapper = mapper;
        }

        [HttpGet("{id}", Name = "MerrMesazh")]
        public async Task<IActionResult> MerrMesazh(int perdoruesId, int id)
        {
            if (perdoruesId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var mesazhNgaDepo = await _depo.MerrMesazh(id);

            if (mesazhNgaDepo == null)
                return NotFound();

            return Ok(mesazhNgaDepo);
        }

        [HttpGet]
        public async Task<IActionResult> MerrMesazhetPerPerdoruesin(int perdoruesId,
            [FromQuery]MesazhParametrat mesazhParametrat)
        {
            if (perdoruesId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            mesazhParametrat.PerdoruesId = perdoruesId;

            var mesazhetNgaDepo = await _depo.MerrMesazhePerPerdoruesin(mesazhParametrat);

            var mesazhet = _mapper.Map<IEnumerable<MesazhPerReturnDto>>(mesazhetNgaDepo);

            Response.ShtoFaqosje(mesazhetNgaDepo.FaqjaAktuale, mesazhetNgaDepo.MadhesiaFaqes,
                mesazhetNgaDepo.SasiaTotal, mesazhetNgaDepo.TotalFaqe);

            return Ok(mesazhet);
        }

        [HttpGet("sekuence/{marresId}")]
        public async Task<IActionResult> MerrMesazhSekuence(int perdoruesId, int marresId)
        {
            if (perdoruesId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var mesazhetNgaDepo = await _depo.MerrSekuencaMesazhesh(perdoruesId, marresId);

            var mesazhSekuence = _mapper.Map<IEnumerable<MesazhPerReturnDto>>(mesazhetNgaDepo);
            
            return Ok(mesazhSekuence);
        }

        [HttpPost]
        public async Task<IActionResult> KrijoMesazh(int perdoruesId, MesazhPerTeKrijuarDto mesazhPerTeKrijuarDto)
        {
            var dergues = await _depo.GetPerdoruesin(perdoruesId);
            if (dergues.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            mesazhPerTeKrijuarDto.DerguesId = perdoruesId;

            var marresi = await _depo.GetPerdoruesin(mesazhPerTeKrijuarDto.MarresId);

            if (marresi == null)
                return BadRequest("Perdoruesi nuk u gjet");

            var mesazhi = _mapper.Map<Mesazh>(mesazhPerTeKrijuarDto);

            _depo.Shto(mesazhi);


            if (await _depo.RuajGjitha()) {
                var mesazhPerReturn = _mapper.Map<MesazhPerReturnDto>(mesazhi);

                return CreatedAtRoute("MerrMesazh", new {id = mesazhi.Id}, mesazhPerReturn);
            }

            throw new Exception("Krijimi i mesazhit deshtoj gjate ruajtjes");

        }

        [HttpPost("{id}")]
        public async Task<IActionResult> FshijMesazh(int id, int perdoruesId)
        {
            if (perdoruesId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var mesazhNgaDepo = await _depo.MerrMesazh(id);

            if (mesazhNgaDepo.DerguesId == perdoruesId)
                mesazhNgaDepo.DerguesiKaFshierMszh = true;
            
            if (mesazhNgaDepo.MarresId == perdoruesId)
                mesazhNgaDepo.MarresiKaFshierMszh = true;

            if (mesazhNgaDepo.DerguesiKaFshierMszh && mesazhNgaDepo.MarresiKaFshierMszh)
                _depo.Fshij(mesazhNgaDepo);

            if (await _depo.RuajGjitha())
                return NoContent();

            throw new Exception("Mesazhi nuk mund te fshihet");
        }

        [HttpPost("{id}/lexuar")]
        public async Task<IActionResult> MarkoMesazhinSiTeLexuar(int perdoruesId, int id)
        {
            if (perdoruesId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var mesazh = await _depo.MerrMesazh(id);

            if (mesazh.MarresId != perdoruesId)
                return Unauthorized();

            mesazh.ELexuar = true;
            mesazh.DataLeximit = DateTime.Now;

            await _depo.RuajGjitha();

            return NoContent();
        }
    }
}