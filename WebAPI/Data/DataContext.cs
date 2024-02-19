using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

namespace WebAPI.Data
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options){}

        public DbSet<City> cities { get; set; }
        public DbSet<User> users { get; set; }
        public DbSet<Property> Properties { get; set; }
        public DbSet<PropertyType> propertyTypes { get; set; }
        public DbSet<FurnishingType> FurnishingTypes { get; set; }

    }
}