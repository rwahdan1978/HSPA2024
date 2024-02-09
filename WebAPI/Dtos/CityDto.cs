using System.ComponentModel.DataAnnotations;

namespace WebAPI.Dtos
{
    public class CityDto
    {
        public int Id { get; set; }
        [Required (ErrorMessage ="Name is required!")]
        [StringLength(50,MinimumLength = 3, ErrorMessage="Wrong length, betweem 3 amd 50!")]
        [RegularExpression(".*[a-zA-Z]+.*", ErrorMessage ="You cannot have only numbers in the name field")]
        public string Name { get; set; }
        [Required]
        public string Country { get; set; }
    }
}