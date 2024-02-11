using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ActionConstraints;
using WebAPI.Dtos;
using WebAPI.Interfaces;

namespace WebAPI.Controllers
{
    public class AccountController: BaseController
    {
        private readonly IunitOfWork uow;

        public AccountController(IunitOfWork uow)
        {
            this.uow = uow;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginReqDto loginReq)
        {
            var user = await uow.userRepository.Authenticate(loginReq.UserName, loginReq.Password);

            if (user == null)
            {
                return Unauthorized();
            }

            var loginRes = new LoginResDto();
            loginRes.UserName = user.Username;
            loginRes.Token = "Token will be generated!";
            return Ok(loginRes);
        }
    }
}