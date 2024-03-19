using System.ComponentModel.DataAnnotations;

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
        public string ImageId { get; set; }
        public string FolderName { get; set; }
    }
}
