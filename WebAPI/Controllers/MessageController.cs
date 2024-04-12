using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Data;
using WebAPI.Dtos;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class MessageController : BaseController
    {
        private readonly DataContext dc;
        private readonly IunitOfWork uow;
        private readonly IMapper mapper;

        public MessageController(DataContext dc, IunitOfWork uow, IMapper mapper)
        {
            this.dc = dc;
            this.uow = uow;
            this.mapper = mapper;
        }

        //this is working in API, need to do it in frontend!
        // Message/save/
        [HttpPost("save")]
        [Authorize]
        
        public async Task<IActionResult> SaveNewsLetterSubscription(NewsletterDto newsletterDto)
        {
            var callRequest = mapper.Map<Newsletter>(newsletterDto);

            uow.messageRepository.AddMessage(callRequest);
            await uow.SaveAsync();
            return StatusCode(201);
        }
    }
}