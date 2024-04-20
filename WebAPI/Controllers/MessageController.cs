using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Dtos;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class MessageController : BaseController
    {
        private readonly IunitOfWork uow;
        private readonly IMapper mapper;

        public MessageController(IunitOfWork uow, IMapper mapper)
        {
            this.uow = uow;
            this.mapper = mapper;
        }

        //this is working in API, need to do it in frontend!

        //for subscribe
        // message/save
        [HttpPost("save")]
        [AllowAnonymous]
        
        public async Task<IActionResult> SaveNewsLetterSubscription(NewsletterDto newsletterDto)
        {
            var callRequest = mapper.Map<Newsletter>(newsletterDto);
            uow.messageRepository.AddMessage(callRequest);
            await uow.SaveAsync();
            return StatusCode(201);
        }

        //for un-subscribe
        // message/update/11
        [HttpPut("update/{id}")]
        [AllowAnonymous]
        
        public async Task<IActionResult> UpdateNewsLetterSubscription(NewsletterUpdateSubDto newsletterUpdateSubDto, int id)
        {
            if (id != newsletterUpdateSubDto.id)
                return BadRequest("Update is not allowed!");
             var messageFromDb = await uow.messageRepository.FindMessage(id);

             if (messageFromDb == null)
                return BadRequest("Update is not allowed!");

            mapper.Map(newsletterUpdateSubDto,messageFromDb);
            await uow.SaveAsync();
            return Ok(messageFromDb);

        }  
    }
}