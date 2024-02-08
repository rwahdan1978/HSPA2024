using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Interfaces
{
    public interface IunitOfWork
    {
        ICityRepository CityRepository {get;}
        Task<bool> SaveAsync();
    }
}