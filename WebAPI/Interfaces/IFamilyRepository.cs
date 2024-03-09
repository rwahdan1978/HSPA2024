using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IFamilyRepository
    {
        Task<IEnumerable<FamilyDocuments>> GetPhotosAllAsync();
        Task<FamilyDocuments> GetPhotoByIdAsync(string id);
        Task<FamilyDocuments> DeletePhoto(string publicId);
    }
}