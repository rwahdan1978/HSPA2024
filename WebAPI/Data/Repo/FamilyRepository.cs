using Microsoft.EntityFrameworkCore;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Data.Repo
{
    public class FamilyRepository : IFamilyRepository
    {
        private readonly DataContext dc;

        public FamilyRepository(DataContext dc)
        {
            this.dc = dc;
        }

        public async Task<IEnumerable<FamilyDocuments>> GetPhotosAllAsync()
        {
            var photos = await dc.familyDocuments
            .ToListAsync();
            return photos;
        }
    }
}