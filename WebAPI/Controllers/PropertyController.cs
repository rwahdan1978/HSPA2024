

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;
using WebAPI.Interfaces;

namespace WebAPI.Controllers
{
    public class PropertyController: BaseController
    {
        private readonly IunitOfWork uow;

        public PropertyController(IunitOfWork uow)
        {
            this.uow = uow;
        }

        [AllowAnonymous]
        [HttpGet("type/{sellrent}")]
        public async Task<IActionResult> GetPropertyList(int sellRent)
        {
            var properties = await uow.PropertyRepository.GetPropertiesAsync(sellRent);
            return Ok(properties);
        }
    }
}