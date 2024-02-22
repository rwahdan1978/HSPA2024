using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface  IPropertyRepository
    {
        Task<IEnumerable<Property>> GetPropertiesAsync(int sellRent);
        Task<IEnumerable<Property>> GetPropertiesAllAsync();
        Task<Property> GetPropertyDetailAsync(int id);
        void AddProperty(Property property);
        void DeleteProperty(int id);
    }
}