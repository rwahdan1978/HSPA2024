using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    using System.Data.Common;
    using Microsoft.AspNetCore.Mvc;
    using WebAPI.Data;

    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly DataContext dc;

        public CityController(DataContext dc)
        {
            this.dc = dc;
        }

        [HttpGet]
        public IActionResult GetCities()
        {
            var cities = dc.cities.ToList();
            return Ok(cities);
        }
    }
}