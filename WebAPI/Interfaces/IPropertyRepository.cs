using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface  IPropertyRepository
    {
        Task<IEnumerable<Property>> GetPropertiesAsync(int sellRent);
        Task<IEnumerable<Property>> GetPropertiesAllAsync();
        Task<Property> GetPropertyDetailAsync(int id);
        Task<Property> GetPropertyByIdAsync(int id);
        void AddProperty(Property property);
        Task<Property> DeleteProperty(int id);
    }
}