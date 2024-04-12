using System.ComponentModel.DataAnnotations;

namespace WebAPI.Dtos
{
    public class NewsletterDto
    {
        [Required]
        public string FullName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public bool Subscribed { get; set; } = true;
    }
}