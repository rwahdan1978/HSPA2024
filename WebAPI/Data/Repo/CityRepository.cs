using Microsoft.EntityFrameworkCore;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Data.Repo
{
    public class CityRepository : ICityRepository
    {
        private readonly DataContext dc;

        public CityRepository(DataContext dc)
        {
            this.dc = dc;
        }
        public void AddCity(City city)
        {
            dc.cities.Add(city);
        }

        public void DeleteCity(int cityId)
        {
            var city = dc.cities.Find(cityId);
            dc.cities.Remove(city);
        }

        public async Task<City> FindCity(int id)
        {
            return await dc.cities.FindAsync(id);
        }

        public async Task<IEnumerable<City>> GetCitiesAsync()
        {
            return await dc.cities.ToListAsync();
        }
    }
}