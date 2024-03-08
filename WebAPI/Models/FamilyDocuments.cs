using System.ComponentModel.DataAnnotations;
using WebAPI.Controllers;

namespace WebAPI.Models
{
    public class FamilyDocuments
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string PublicId { get; set; }
        [Required]
        public string ImageUrl { get; set; }
        public string DisplayName { get; set; }
    }
}