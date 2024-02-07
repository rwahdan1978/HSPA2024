using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    using System.Data.Common;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using WebAPI.Data;
    using WebAPI.Models;

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
        public async Task<IActionResult> GetCities()
        {
            var cities = await dc.cities.ToListAsync();
            return Ok(cities);
        }

        // [HttpPost("add")]
        // [HttpPost("add/{cityName}")]
        // public async Task<IActionResult> AddCity(string cityName)
        // {
        //     City city = new City();
        //     city.Name = cityName;
        //     await dc.cities.AddAsync(city);
        //     await dc.SaveChangesAsync();
        //     return Ok(city);
        // }

        [HttpPost("post")]
        public async Task<IActionResult> AddCity(City city)
        {
            await dc.cities.AddAsync(city);
            await dc.SaveChangesAsync();
            return Ok(city);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteCity(int id)
        {
            var city = await dc.cities.FindAsync(id);
            dc.cities.Remove(city);
            await dc.SaveChangesAsync();
            return Ok(id);
        }

    }
}