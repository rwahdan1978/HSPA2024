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

        public async Task<FamilyDocuments> DeletePhoto(string imageId)
        {
            var photo = await dc.familyDocuments
            .Where(p => p.ImageId == imageId)
            .ExecuteDeleteAsync();
            return null;
        }

        public async Task<FamilyDocuments> GetPhotoByIdAsync(string id)
        {
            var photo = await dc.familyDocuments
            .Where(p => p.ImageId == id)
            .FirstOrDefaultAsync();
            return photo;
        }

        public async Task<IEnumerable<FamilyDocuments>> GetPhotosAllAsync()
        {
            var photos = await dc.familyDocuments
            .ToListAsync();
            return photos;
        }
    }
}