using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IFamilyRepository
    {
        Task<IEnumerable<FamilyDocuments>> GetPhotosAllAsync();
        Task<FamilyDocuments> GetPhotoByIdAsync(int id);
        Task<FamilyDocuments> DeletePhoto(string publicId);
    }
}