using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
    public class User : BaseEntity
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public byte[] Password { get; set; }
        public byte[] PasswordKey { get; set; }
        public bool IsAdmin { get; set; }
        public string RefreshToken { get; set; }
        public DateTime RefreshTokenExpiryTime { get; set; }
    }
}