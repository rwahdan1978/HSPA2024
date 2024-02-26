using WebAPI.Data.Repo;
using WebAPI.Interfaces;

namespace WebAPI.Data
{
    public class UnitOfWork : IunitOfWork
    {
        private readonly DataContext dc;

        public UnitOfWork(DataContext dc)
        {
            this.dc = dc;
        }
        public ICityRepository CityRepository => 
            new CityRepository(dc);

        public IUserRepository userRepository => 
            new UserRepository(dc);

        public IPropertyRepository PropertyRepository => 
            new PropertyRepository(dc);

        public IPropertyTypeRepository PropertyTypeRepository => 
            new PropertyTypeRepository(dc);

        public IFurnishingTypeRepository FurnishingTypeRepository => 
            new FurnishingTypeRepository(dc);

        public async Task<bool> SaveAsync()
        {
            return await dc.SaveChangesAsync() > 0;
        }
    }
}