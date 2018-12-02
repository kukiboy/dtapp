using System;
using System.Security.Claims;
using System.Threading.Tasks;
using DatingApp.API.Data;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;

namespace DatingApp.API.Ndihmesit
{
    public class LogAktivitetetPerdoruesit : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var resultContext = await next();

            var userId = int.Parse(resultContext.HttpContext.User
                 .FindFirst(ClaimTypes.NameIdentifier).Value);

            var depo = resultContext.HttpContext.RequestServices.GetService<IDepoTakimesh>();

            var perdoruesi = await depo.GetPerdoruesin(userId);
            perdoruesi.SeFundiAktiv = DateTime.Now;

            await depo.RuajGjitha();
        }
    }
}