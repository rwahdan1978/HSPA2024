using System.ComponentModel.DataAnnotations;

namespace WebAPI.Dtos
{
    public class NewsletterDto
    {
        public int id { get; set; }
        public string Email { get; set; }
        public bool Subscribed { get; set; } = true;
    }
}