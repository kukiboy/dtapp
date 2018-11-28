using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Models;
using DatingApp.API.Ndihmesit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [Route("api/perdoruesit/{perdoruesId}/fotot")]
    [ApiController]
    public class FototController : ControllerBase
    {
        private readonly IDepoTakimesh _depo;
        private readonly IMapper _mapper;
        private readonly IOptions<ClaudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;

        public FototController(IDepoTakimesh depo, IMapper mapper,
        IOptions<ClaudinarySettings> cloudinaryConfig)
        {
            _cloudinaryConfig = cloudinaryConfig;
            _mapper = mapper;
            _depo = depo;

            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);
        }

        [HttpGet("{id}", Name = "GetFoto")]
        public async Task<IActionResult> GetFoto(int id)
        {
            var fotoNgaDepo = await _depo.GetFoto(id);
            var foto = _mapper.Map<FotoPerTeKthyerDto>(fotoNgaDepo);
            return Ok(foto);
             
        }

        [HttpPost]
        public async Task<IActionResult> ShtoFotoPerPerdoruesin(int perdoruesId,
            [FromForm]FotoPerTeKrijuarDto fotoPerTeKrijuarDto)
        {
            if (perdoruesId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var perdoruesNgaDepo = await _depo.GetPerdoruesin(perdoruesId);

            var skede = fotoPerTeKrijuarDto.File;

            var rezulltatiNgarkimit = new ImageUploadResult();

            if (skede.Length > 0)
            {
                using (var stream = skede.OpenReadStream())
                {
                    var parametratNgarkimit = new ImageUploadParams()
                    {
                        File = new FileDescription(skede.Name, stream),
                        Transformation = new Transformation()
                            .Width(500).Height(500).Crop("fill").Gravity("face")
                    };

                    rezulltatiNgarkimit = _cloudinary.Upload(parametratNgarkimit);
                }
            }

            fotoPerTeKrijuarDto.Url = rezulltatiNgarkimit.Uri.ToString();
            fotoPerTeKrijuarDto.PublikId = rezulltatiNgarkimit.PublicId;

            var foto = _mapper.Map<Foto>(fotoPerTeKrijuarDto);

            if (!perdoruesNgaDepo.Fotot.Any(p => p.aKryesor))
                foto.aKryesor = true;

            perdoruesNgaDepo.Fotot.Add(foto);


            if (await _depo.RuajGjitha())
            {
                var fotoPerTeKthyer = _mapper.Map<FotoPerTeKthyerDto>(foto);
                return CreatedAtRoute("GetFoto", new {id = foto.Id}, fotoPerTeKthyer);
            }

            return BadRequest("Nuk po mund te shtohet fotoja");
        }

        [HttpPost("{id}/cktKry")]
        public async Task<IActionResult> CktKryFoto(int perdoruesId, int id)
        {
            if (perdoruesId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var user = await _depo.GetPerdoruesin(perdoruesId);

            if(!user.Fotot.Any(f => f.Id == id))
                return Unauthorized();

            var fotoNgaDepo = await _depo.GetFoto(id);

            if (fotoNgaDepo.aKryesor)
                return BadRequest("Aktualisht eshte si foto kryesore!");

            var fotojaKryesoreAktuale = await _depo.GetFotonKryesoreNgaPerdoruesi(perdoruesId);
            fotojaKryesoreAktuale.aKryesor = false;

            fotoNgaDepo.aKryesor = true;

            if (await _depo.RuajGjitha())
                return NoContent();

            return BadRequest("Nuk po mund percaktohet si foto kryesore");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> FshijFoto(int perdoruesId, int id)
        {
            // a eshte kerkesen duke e bere perdoruesi i sakte
            if (perdoruesId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            // mere perdoruesin nga depo
            var user = await _depo.GetPerdoruesin(perdoruesId);

            // a eshte fotoja pjese e kolekcionit te ketij perdoruesit
            if (!user.Fotot.Any(f => f.Id == id))
                return Unauthorized();

            var fotoNgaDepo = await _depo.GetFoto(id);

            if (fotoNgaDepo.aKryesor)
                return BadRequest("Nuk mundesh me fshi foton kryesore!");

            if ( fotoNgaDepo.PublikId != null)
            {
                var fshijParametrat = new DeletionParams(fotoNgaDepo.PublikId);

                var result = _cloudinary.Destroy(fshijParametrat);

                if (result.Result == "ok")
                {
                    _depo.Fshij(fotoNgaDepo);
                }
            }

            if (fotoNgaDepo.PublikId == null)
            {
                _depo.Fshij(fotoNgaDepo);
            }

            if (await _depo.RuajGjitha())
                return Ok();

            return BadRequest("Deshtoj fshirja e fotos");
        }
        
}
}