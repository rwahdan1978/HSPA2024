using System.ComponentModel.DataAnnotations;


namespace WebAPI.Models
{
    public class Newsletter
    {
        [Required]
        public int Id { get; set; }
       
        [Required]
        public string Email { get; set; }
        [Required]
        public bool Subscribed { get; set; } = true;
    }
}