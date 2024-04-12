namespace WebAPI.Interfaces
{
    public interface IunitOfWork
    {
        ICityRepository CityRepository {get;}
        IMessageRepository messageRepository {get;}
        IUserRepository userRepository {get;}
        IPropertyRepository PropertyRepository {get;}
        IPropertyTypeRepository PropertyTypeRepository {get;}
        IFurnishingTypeRepository FurnishingTypeRepository {get;} 
        IFamilyRepository familyRepository{get;}
        Task<bool> SaveAsync();
    }
}