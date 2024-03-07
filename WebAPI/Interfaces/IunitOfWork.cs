using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Identity.Client;

namespace WebAPI.Interfaces
{
    public interface IunitOfWork
    {
        ICityRepository CityRepository {get;}
        IUserRepository userRepository {get;}
        IPropertyRepository PropertyRepository {get;}
        IPropertyTypeRepository PropertyTypeRepository {get;}
        IFurnishingTypeRepository FurnishingTypeRepository {get;} 
        IFamilyRepository familyRepository{get;}
        Task<bool> SaveAsync();
    }
}