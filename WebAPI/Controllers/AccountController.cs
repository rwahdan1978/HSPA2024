using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using WebAPI.Data;
using WebAPI.Dtos;
using WebAPI.Errors;
using WebAPI.Extensions;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class AccountController: BaseController
    {
        private readonly IunitOfWork uow;
        private readonly DataContext dataContext;
        private readonly IConfiguration configuration;

        public AccountController(IunitOfWork uow, IConfiguration configuration,
                                    DataContext dataContext)
        {
            this.dataContext = dataContext;
            this.uow = uow;
            this.configuration = configuration;
        }

        //need to work on this! it is getting new token
        [HttpPost("refreshtoken")]
        [Authorize] // unauthorized users won't get here without token
        public IActionResult getRefreshToken()
        {
            // var claim = HttpContext.User.Claims.First(c => c.Type == "Name");
            // var user = claim.Value;
            var user = User.Identity.Name;
            var myToken = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", string.Empty);
            var principal = GetPrincipalFromExpiredToken(myToken).ToString();
             
            return Ok(principal.ToString());
        }

         private ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration.GetSection("AppSettings:Key").Value));
            
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        IssuerSigningKey = key,
                        ValidateLifetime = false
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out SecurityToken securityToken);
            
            if (securityToken is not JwtSecurityToken jwtSecurityToken || 
            !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256Signature, StringComparison.CurrentCultureIgnoreCase))
                throw new SecurityTokenException("Invalid token");

            return principal;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginReqDto loginReq)
        {
            var user = await uow.userRepository.Authenticate(loginReq.UserName, loginReq.Password);
            ApiError apiError = new ApiError();

            if (user == null)
            {
                apiError.ErrorCode = Unauthorized().StatusCode;
                apiError.ErrorMessage = "Invalid username or password!";
                apiError.ErrorDetails = "This message appears when username or password is incorrent!";
                return Unauthorized(apiError);
            }

            var loginRes = new LoginResDto();
            loginRes.UserName = user.Username;
            loginRes.Token = CreateJWT(user);
            loginRes.AccessToken = loginRes.Token;
            loginRes.RefreshToken = CreateRefreshToken(); 
            user.RefreshToken = loginRes.RefreshToken;
            await dataContext.SaveChangesAsync();
            loginRes.IsAdmin = user.IsAdmin;
            loginRes.UserId = user.Id;
            return Ok(loginRes);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(LoginReqDto loginReq)
        {
            ApiError apiError = new ApiError();

            if(loginReq.UserName.IsEmpty() || 
                loginReq.Password.IsEmpty()) {
                    apiError.ErrorCode=BadRequest().StatusCode;
                    apiError.ErrorMessage="User name or password can not be blank";                    
                    return BadRequest(apiError);
            }                    

            if (await uow.userRepository.UserAlreadyExists(loginReq.UserName)) {
                apiError.ErrorCode=BadRequest().StatusCode;
                apiError.ErrorMessage="Test...User already exists, please try different user name";
                return BadRequest(apiError);
            }                

            uow.userRepository.Register(loginReq.UserName, loginReq.Password, loginReq.IsAdmin);
            await uow.SaveAsync();
            return StatusCode(201);
        }

        private string CreateJWT(User user)
        {
            var secretKey = configuration.GetSection("AppSettings:Key").Value;
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

            var claims = new Claim[] {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            };

            var signingCredentials = new SigningCredentials(
                                    key, SecurityAlgorithms.HmacSha256Signature);

            var tokenDescriptor = new SecurityTokenDescriptor{
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(10),
                SigningCredentials = signingCredentials
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            
            return tokenHandler.WriteToken(token);
        }

        private string CreateRefreshToken()
        {
            var tokenBytes = RandomNumberGenerator.GetBytes(64);
            var refreshToken = Convert.ToBase64String(tokenBytes);

            var tokenInUser = dataContext.users
            .Any(a => a.RefreshToken == refreshToken);

            if (tokenInUser)
            {
                return CreateRefreshToken();
            }
            return refreshToken;
        }

    }
}