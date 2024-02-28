namespace WebAPI.Dtos
{
    public class PropertyDto
    {
         public int SellRent { get; set; }
        public string ProjectName { get; set; }
        public string Name { get; set; }
        public int PropertyTypeId { get; set; }
        public int CityId { get; set; }
        public int BHK { get; set; }
        public int FurnishingTypeId { get; set; }
        public int Price { get; set; }
        public int BuiltArea { get; set; }
        public bool ReadyToMove { get; set; }
        public DateTime EstPossessionOn { get; set; }



        public int Bathroom { get; set; }
        public string FlatNumber { get; set; }
        public string VillaNumber { get; set; }


        public int CarpetArea { get; set; }
        public string Address { get; set; }
        public string Address2 { get; set; }
        public int FloorNo { get; set; }
        public int TotalFloors { get; set; }
        public string MainEntrance { get; set; }
        public int Security { get; set; } = 0;
        public bool Gated { get; set; }
        public int Maintenance { get; set; } = 0;
        public int Age { get; set; } = 0;
        public string Description { get; set; }
        public int ContactCommission { get; set; }
        public string ContactCompany { get; set; } 
        public string ContactName { get; set; }
        public string ContactNumber { get; set; }
        public string ContactNumber2 { get; set; } 
        public string ContactEmail { get; set; }
    }
}