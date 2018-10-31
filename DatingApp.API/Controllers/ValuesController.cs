using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]   
    public class ValuesController : ControllerBase
    {
        private readonly DataContext _context;
        public ValuesController(DataContext context)
        {
            _context = context;

        }
        // GET api/values
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetVlerat() //ActionResult<IEnumerable<string>> Get()
        {
            var vlerat = await _context.Vlerat.ToListAsync();
            return Ok(vlerat);
            // throw new Exception("Ka problem diqka");
           // return new string[] { "value1", "value3" };
        }

        [AllowAnonymous]// GET api/values/5        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetVlera(int id) //ActionResult<string> Get(string id)
        {
            //return id.ToString();//"value";
            var vlera = await _context.Vlerat.FirstOrDefaultAsync(x => x.Id == id);
            return Ok(vlera);
        }

        // POST api/values
        [AllowAnonymous]
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
