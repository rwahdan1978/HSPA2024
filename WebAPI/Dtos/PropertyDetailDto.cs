using WebAPI.Models;

namespace WebAPI.Dtos
{
    public class PropertyDetailDto: PropertyListDto
    {
        public int CarpetArea { get; set; }
        public string Address { get; set; }
        public string Address2 { get; set; } //landmark in add property
        public int Building_Flat { get; set; }
        public int FloorNo { get; set; }
        public int TotalFloors { get; set; }
        public string MainEntrance { get; set; }
        public int Security { get; set; }
        public bool Gated { get; set; }
        public int Maintenance { get; set; }
        public int Age { get; set; }
        public string Description { get; set; }
        public string ContactName { get; set; }
        public string ContactNumber { get; set; }
        public string ContactNumber2 { get; set; }
        public string ContactEmail { get; set; }
        public string ContactCompany { get; set; }
        public string ContactCommission { get; set; }
        public string CompanyImage { get; set; }
        public string Theaddress { get; set; }
        public int Parking { get; set; }
        public int SwimmingPool { get; set; }
        public bool Mall { get; set; }
        public bool Zoo { get; set; }
        public bool FastFood { get; set; }
        public bool Beach { get; set; }
        public bool School { get; set; }
        public bool Mosque { get; set; }
        public ICollection<PhotoDto> Photos { get; set; }
    }
}