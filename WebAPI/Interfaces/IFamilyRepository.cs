using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IFamilyRepository
    {
        Task<IEnumerable<FamilyDocuments>> GetPhotosAllAsync();
    }
}