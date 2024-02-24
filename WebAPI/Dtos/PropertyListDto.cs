using WebAPI.Models;

namespace WebAPI.Dtos
{
    public class PropertyListDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ProjectName { get; set; }
        public int SellRent { get; set; }
        public string PropertyType { get; set; }
        public bool Building_flat { get; set; }
        public bool Villa { get; set; }
        public string FurnishingType { get; set; }
        public int Price { get; set; }
        public int BHK { get; set; }
        public int Bathroom { get; set; }
        public int BuiltArea { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public bool ReadyToMove { get; set; }
        public DateTime EstPossessionOn { get; set; }
    }
}