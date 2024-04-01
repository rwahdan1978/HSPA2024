namespace WebAPI.Dtos
{
    public class LoginResDto
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string Token { get; set; }
        public string AccessToken { get; set; } = string.Empty;
        public string RefreshToken { get; set; } = string.Empty;
        public bool IsAdmin { get; set; }
    }
}